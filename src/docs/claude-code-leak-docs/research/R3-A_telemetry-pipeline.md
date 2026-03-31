# R3-A: 텔레메트리/애널리틱스 파이프라인 분석

## 소스: `src/services/analytics/` + `src/utils/telemetry/` + 소스 전체 grep

---

## 핵심 발견

### 1. 파이프라인 아키텍처 개요

Claude Code는 **4개의 독립 텔레메트리 파이프라인**을 운영한다.

```
logEvent() ─── (큐) ── attachAnalyticsSink() ─┬─ Datadog (DD Logs API)
                                               └─ 1P Event Logging (api.anthropic.com)

logOTelEvent() ─── (3P OTEL) ── 고객 엔드포인트 (OTLP/Prometheus)

BigQueryMetricsExporter ─── (OTEL MeterProvider) ── api.anthropic.com/api/claude_code/metrics
```

**설계 원칙**: `index.ts`는 **의존성 제로** — import cycle 방지를 위해 이벤트 큐만 보유하며, 실제 라우팅은 `sink.ts`에서 수행한다.

### 2. 이벤트 큐 & 싱크 패턴 (`index.ts`, L60–173)

```typescript
// 싱크 부착 전 이벤트는 큐에 쌓임
const eventQueue: QueuedEvent[] = []
let sink: AnalyticsSink | null = null

export function logEvent(eventName: string, metadata: LogEventMetadata): void {
  if (sink === null) {
    eventQueue.push({ eventName, metadata, async: false })
    return
  }
  sink.logEvent(eventName, metadata)
}

// 앱 시작 시 싱크 부착 → 큐 드레인 (queueMicrotask로 비동기 처리)
export function attachAnalyticsSink(newSink: AnalyticsSink): void {
  if (sink !== null) return  // 멱등성 보장
  sink = newSink
  // ...큐 드레인
}
```

**PII 보호 타입 시스템**: 문자열 메타데이터를 원천 차단하는 `never` 타입 마커 사용.

```typescript
// 문자열을 로깅하려면 반드시 이 타입으로 캐스팅해야 함
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = never
// PII 태그 칼럼용 (1P 전용, Datadog에는 전달 안 됨)
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED = never
```

`_PROTO_*` 접두사 키는 1P 전용 PII 칼럼으로 라우팅되며, `stripProtoFields()`가 Datadog 등 일반 접근 백엔드에 전달되기 전에 제거한다.

### 3. 싱크 라우팅 (`sink.ts`, L10–115)

```
logEventImpl(eventName, metadata)
  ├── shouldSampleEvent(eventName)      ← 샘플링 체크
  │     └── 0이면 드롭, 양수면 sample_rate 메타데이터 추가
  ├── shouldTrackDatadog()              ← Datadog 게이트 체크
  │     ├── isSinkKilled('datadog')     ← 킬스위치
  │     └── tengu_log_datadog_events    ← GrowthBook 피처 게이트
  │           └── trackDatadogEvent(name, stripProtoFields(metadata))
  └── logEventTo1P(name, metadata)      ← 1P (PII 키 포함 전달)
```

**싱크 킬스위치** (`sinkKillswitch.ts`): GrowthBook 동적 설정 `tengu_frond_boric`로 Datadog/1P 싱크를 개별 비활성화 가능.

```typescript
export type SinkName = 'datadog' | 'firstParty'

export function isSinkKilled(sink: SinkName): boolean {
  const config = getDynamicConfig_CACHED_MAY_BE_STALE<
    Partial<Record<SinkName, boolean>>
  >('tengu_frond_boric', {})
  return config?.[sink] === true
}
```

### 4. Datadog 백엔드 (`datadog.ts`, L1–308)

| 항목 | 값 |
|------|-----|
| 엔드포인트 | `https://http-intake.logs.us5.datadoghq.com/api/v2/logs` |
| 클라이언트 토큰 | `pubbbf48e6d78dae54bceaa4acf463299bf` |
| 플러시 주기 | 15초 (env override 가능) |
| 최대 배치 | 100 이벤트 |
| 네트워크 타임아웃 | 5초 |
| 환경 조건 | production 전용, firstParty API만 |

**허용 이벤트 화이트리스트** (37개):

```
chrome_bridge_*              (5개: connection, tool call 이벤트)
tengu_api_error              tengu_api_success
tengu_brief_mode_*           (2개)
tengu_cancel                 tengu_compact_failed
tengu_exit                   tengu_flicker
tengu_init                   tengu_model_fallback_triggered
tengu_oauth_*                (10개: 인증 흐름 이벤트)
tengu_query_error            tengu_session_file_read
tengu_started                tengu_tool_use_*  (5개)
tengu_uncaught_exception     tengu_unhandled_rejection
tengu_voice_*                (2개)
tengu_team_mem_*             (4개)
```

**카디널리티 제어**:

| 기법 | 설명 |
|------|------|
| userBucket | SHA256(userId) % 30 → 30개 버킷으로 고유 사용자 수 추정 |
| 모델명 정규화 | 외부 사용자: canonicalName이 MODEL_COSTS에 없으면 `'other'` |
| MCP 도구명 | `mcp__*` → `'mcp'` |
| 버전 축약 | `2.0.53-dev.20251124.t173302.sha526cc6a` → `2.0.53-dev.20251124` |

### 5. 1P 이벤트 로깅 (`firstPartyEventLogger.ts`, L1–450)

OpenTelemetry `LoggerProvider` + `BatchLogRecordProcessor` 기반이며, 커스텀 `FirstPartyEventLoggingExporter`로 내보낸다.

```
initialize1PEventLogging()
  ├── is1PEventLoggingEnabled()         ← isAnalyticsDisabled() 반전
  ├── getBatchConfig()                  ← GrowthBook 'tengu_1p_event_batch_config'
  │     └── scheduledDelayMillis, maxExportBatchSize, maxQueueSize, ...
  ├── FirstPartyEventLoggingExporter    ← /api/event_logging/batch 전송
  └── LoggerProvider                    ← scope: 'com.anthropic.claude_code.events'
```

**배치 설정** (GrowthBook `tengu_1p_event_batch_config`):

```typescript
type BatchConfig = {
  scheduledDelayMillis?: number  // 기본 10초
  maxExportBatchSize?: number    // 기본 200
  maxQueueSize?: number          // 기본 8192
  skipAuth?: boolean
  maxAttempts?: number           // 기본 8
  path?: string                  // 기본 '/api/event_logging/batch'
  baseUrl?: string               // 기본 'https://api.anthropic.com'
}
```

**이벤트 샘플링** (`tengu_event_sampling_config`):

```typescript
type EventSamplingConfig = {
  [eventName: string]: { sample_rate: number }  // 0-1
}
// sample_rate=0 → 전부 드롭, 1 → 전부 로깅, 0.5 → 50% 확률
// 선택된 이벤트에 sample_rate 메타데이터 자동 추가
```

### 6. 1P 이벤트 Exporter (`firstPartyEventLoggingExporter.ts`, L1–807)

| 항목 | 값 |
|------|-----|
| 엔드포인트 | `https://api.anthropic.com/api/event_logging/batch` |
| 타임아웃 | 10초 |
| 최대 배치 | 200 이벤트 |
| 배치 딜레이 | 100ms (배치 간) |
| 재시도 | 2차 백오프 (base 500ms * attempts^2, 최대 30초) |
| 최대 시도 | 8회 |

**디스크 기반 내구성**: 실패한 이벤트는 `~/.claude/telemetry/1p_failed_events.<sessionId>.<batchUuid>.json`에 JSONL로 저장. 다음 세션에서 자동 재시도.

**Proto 직렬화**: `ClaudeCodeInternalEvent.toJSON()` / `GrowthbookExperimentEvent.toJSON()`로 proto 형식 변환 후 전송. `additional_metadata`는 Base64 인코딩.

**인증 폴백**: 401 에러 시 인증 없이 재시도. OAuth 토큰 만료/profile scope 없음 시 인증 건너뜀.

### 7. 메타데이터 풍부화 (`metadata.ts`, L1–974)

모든 이벤트에 공통 메타데이터가 첨부된다.

```typescript
type EventMetadata = {
  model: string               // 현재 모델
  sessionId: string            // 세션 ID
  userType: string             // 'ant' | '' (외부)
  betas?: string               // 모델 베타 플래그
  envContext: EnvContext        // 플랫폼, 아키텍처, 터미널, CI, 버전 등
  isInteractive: string
  clientType: string
  processMetrics?: ProcessMetrics  // RSS, heap, CPU% 등
  agentId?: string             // 스웜/팀 에이전트 ID
  parentSessionId?: string
  agentType?: 'teammate' | 'subagent' | 'standalone'
  subscriptionType?: string    // max, pro, enterprise, team
  rh?: string                  // 레포 원격 URL SHA256 해시 (16자)
}
```

**EnvContext 상세 필드**:

| 카테고리 | 필드 |
|----------|------|
| 세션 | `sessionId`, `model`, `userType`, `clientType`, `isInteractive` |
| 환경 | `platform`, `platformRaw`, `arch`, `nodeVersion`, `terminal`, `version`, `buildTime` |
| CI/CD | `isCi`, `isGithubAction`, `isClaudeCodeAction`, `githubEventName` |
| 원격 | `isClaudeCodeRemote`, `remoteEnvironmentType`, `claudeCodeContainerId` |
| 에이전트 | `agentId`, `parentSessionId`, `agentType`, `teamName` |
| 인증 | `accountUuid`, `organizationUuid`, `subscriptionType` |
| 프로세스 | `uptime`, `rss`, `heapUsed`, `cpuPercent` |

**도구명 새니타이징**: MCP 도구명(`mcp__<server>__<tool>`)은 PII로 간주되어 `mcp_tool`로 치환. 예외: 공식 MCP 레지스트리 URL, claude.ai 프록시, 내장 MCP 서버, `OTEL_LOG_TOOL_DETAILS=1` 설정 시.

### 8. GrowthBook 피처 플래그 / A/B 테스트 (`growthbook.ts`, L1–1157)

```
GrowthBook 클라이언트 수명주기:
  getGrowthBookClient()        ← memoize, 싱글톤
    ├── remoteEval: true       ← 서버사이드 평가
    ├── cacheKeyAttributes: ['id', 'organizationUUID']
    └── apiHost: api.anthropic.com
  initializeGrowthBook()       ← 블로킹 초기화 (5초 타임아웃)
    └── processRemoteEvalPayload()  ← 응답 파싱 + 캐싱
         ├── remoteEvalFeatureValues (Map)  ← 인메모리 캐시
         ├── experimentDataByFeature (Map)  ← 실험 데이터
         └── syncRemoteEvalToDisk()        ← ~/.claude.json 영속화
```

**사용자 속성 (타게팅)**:

```typescript
type GrowthBookUserAttributes = {
  id: string               // deviceId
  sessionId: string
  deviceID: string
  platform: 'win32' | 'darwin' | 'linux'
  apiBaseUrlHost?: string  // 프록시 배포 (Epic, Marble 등) 식별
  organizationUUID?: string
  accountUUID?: string
  userType?: string        // 'ant' | 외부
  subscriptionType?: string
  rateLimitTier?: string
  firstTokenTime?: number
  email?: string
  appVersion?: string
  github?: GitHubActionsMetadata
}
```

**피처 값 접근 계층**:

| 함수 | 블로킹 | 용도 |
|------|--------|------|
| `getFeatureValue_CACHED_MAY_BE_STALE()` | No | 시작 크리티컬 경로, 동기 컨텍스트 |
| `getFeatureValue_DEPRECATED()` | Yes | 레거시 (비권장) |
| `getDynamicConfig_BLOCKS_ON_INIT()` | Yes | 동적 설정 (블로킹 필요 시) |
| `getDynamicConfig_CACHED_MAY_BE_STALE()` | No | 동적 설정 (캐시 우선) |
| `checkStatsigFeatureGate_CACHED_MAY_BE_STALE()` | No | Statsig→GrowthBook 마이그레이션 |
| `checkSecurityRestrictionGate()` | Conditional | 보안 게이트 (재초기화 대기) |
| `checkGate_CACHED_OR_BLOCKING()` | Conditional | 캐시 true→즉시, false→블로킹 페치 |

**오버라이드 우선순위**:

```
1. 환경변수 오버라이드 (CLAUDE_INTERNAL_FC_OVERRIDES, ant 전용)
2. 로컬 설정 오버라이드 (growthBookOverrides, ant 전용, /config Gates 탭)
3. 인메모리 remoteEvalFeatureValues (processRemoteEvalPayload 이후)
4. 디스크 캐시 (~/.claude.json → cachedGrowthBookFeatures)
5. 기본값 (defaultValue 파라미터)
```

**실험 노출 로깅**: 피처 접근 시 `experimentDataByFeature`에서 실험 정보 확인 후, `logGrowthBookExperimentTo1P()`로 노출 이벤트 전송. 세션 내 중복 방지(`loggedExposures` Set). init 전 접근은 `pendingExposures`에 저장 후 init 완료 시 일괄 로깅.

**주기적 리프레시**: ant = 20분, 외부 = 6시간. `refreshGrowthBookFeatures()`로 클라이언트 재생성 없이 경량 리프레시. 인증 변경 시 `refreshGrowthBookAfterAuthChange()`로 클라이언트 완전 재생성.

### 9. 주요 GrowthBook 피처 플래그 (`tengu_*` 코드네임)

코드베이스에서 발견된 피처 플래그:

| 피처 플래그 | 용도 |
|------------|------|
| `tengu_log_datadog_events` | Datadog 싱크 on/off |
| `tengu_frond_boric` | 싱크별 킬스위치 (datadog, firstParty) |
| `tengu_event_sampling_config` | 이벤트별 샘플링 설정 |
| `tengu_1p_event_batch_config` | 1P 배치 프로세서 설정 |
| `tengu_amber_quartz_disabled` | 음성 모드 비활성화 킬스위치 |
| `tengu_cobalt_frost` | Nova 3 음성 모델 활성화 |
| `tengu_onyx_plover` | Auto-dream 설정/임계값 |
| `tengu_coral_fern` | 메모리 디렉토리 활성화 |
| `tengu_herring_clock` | 팀 메모리 경로 |
| `tengu_passport_quail` | 메모리 추출 경로 |
| `tengu_session_memory` | 세션 메모리 활성화 |
| `tengu_sm_config` | 세션 메모리 설정 |
| `tengu_tide_elm` / `tengu_tern_alloy` / `tengu_timber_lark` | 팁 레지스트리 |
| `tengu_harbor` | MCP 채널 서버 허용리스트 |
| `tengu_enable_settings_sync_push` | 설정 동기화 업로드 |
| `tengu_strap_foyer` | 설정 동기화 다운로드 |
| `tengu_bramble_lintel` | 자동 메모리 추출 임계값 |
| `tengu_slate_thimble` | 메모리 경로 설정 |
| `tengu_trace_lantern` | 베타 트레이싱 허용 게이트 |

### 10. 3P OpenTelemetry 텔레메트리 (`utils/telemetry/instrumentation.ts`)

고객이 직접 제어하는 관측 가능성 계층. 1P 이벤트 로깅과 **완전히 분리**된다.

```
initializeTelemetry()
  ├── CLAUDE_CODE_ENABLE_TELEMETRY=1 필요
  ├── OTEL_METRICS_EXPORTER    → MeterProvider (otlp/console/prometheus)
  ├── OTEL_LOGS_EXPORTER       → LoggerProvider (otlp/console)
  ├── OTEL_TRACES_EXPORTER     → TracerProvider (otlp/console)
  ├── BigQueryMetricsExporter   → api.anthropic.com/api/claude_code/metrics
  │     └── 1P API 고객 + C4E/Teams만 활성
  └── Beta Tracing              → BETA_TRACING_ENDPOINT (별도 경로)
```

**3개 시그널 독립 제공**:

| 시그널 | 환경 변수 | 익스포터 | 프로토콜 |
|--------|-----------|----------|----------|
| Metrics | `OTEL_METRICS_EXPORTER` | otlp, console, prometheus | grpc, http/json, http/protobuf |
| Logs | `OTEL_LOGS_EXPORTER` | otlp, console | grpc, http/json, http/protobuf |
| Traces | `OTEL_TRACES_EXPORTER` | otlp, console | grpc, http/json, http/protobuf |

**Ant 빌드**: `ANT_OTEL_*` 변수가 `OTEL_*` 변수로 자동 복사되어 내부 텔레메트리 엔드포인트 사용.

**logOTelEvent()** (`events.ts`): 3P OTEL 이벤트 전용 함수. `claude_code.<eventName>` 형식으로 emit.

| OTel 이벤트 | 발생 위치 |
|-------------|----------|
| `api_request` | API 요청 완료 |
| `api_error` | API 에러 |
| `tool_decision` | 도구 권한 결정 |
| `tool_result` | 도구 실행 결과 |
| `user_prompt` | 사용자 입력 |
| `feedback_survey` | 피드백 설문 |
| `hook_execution_start/complete` | 후크 실행 |
| `system_prompt` | 시스템 프롬프트 (beta tracing) |

**사용자 프롬프트 레다크션**: `OTEL_LOG_USER_PROMPTS=1` 미설정 시 `<REDACTED>`로 치환.

### 11. 프라이버시 & 옵트아웃 메커니즘 (`privacyLevel.ts`, `config.ts`)

3단계 프라이버시 레벨:

```
default            →  모든 것 활성
no-telemetry       →  애널리틱스/텔레메트리 비활성 (Datadog, 1P, 피드백 설문)
essential-traffic  →  모든 비필수 네트워크 트래픽 비활성 (텔레메트리 + 자동 업데이트 등)
```

**환경 변수 매핑**:

| 환경 변수 | 효과 |
|----------|------|
| `DISABLE_TELEMETRY` | 프라이버시 레벨 → `no-telemetry` |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | 프라이버시 레벨 → `essential-traffic` |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | 3P OTEL 활성화 (기본 꺼짐) |
| `OTEL_LOG_USER_PROMPTS` | 사용자 프롬프트 로깅 (기본 꺼짐) |
| `OTEL_LOG_TOOL_DETAILS` | MCP 도구명/입력 상세 로깅 |

**`isAnalyticsDisabled()` 체크** (`config.ts`):

```typescript
export function isAnalyticsDisabled(): boolean {
  return (
    process.env.NODE_ENV === 'test' ||
    isEnvTruthy(process.env.CLAUDE_CODE_USE_BEDROCK) ||  // 3P 클라우드
    isEnvTruthy(process.env.CLAUDE_CODE_USE_VERTEX) ||   // 3P 클라우드
    isEnvTruthy(process.env.CLAUDE_CODE_USE_FOUNDRY) ||  // 3P 클라우드
    isTelemetryDisabled()                                // 프라이버시 레벨
  )
}
```

**계층적 비활성 요약**:

| 수준 | 대상 | 제어 |
|------|------|------|
| 전체 | 모든 텔레메트리 | `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` |
| 분석 | Datadog + 1P + GrowthBook | `DISABLE_TELEMETRY` |
| 3P 클라우드 | Bedrock/Vertex/Foundry 시 자동 비활성 | `CLAUDE_CODE_USE_BEDROCK` 등 |
| Datadog | Datadog만 | `tengu_log_datadog_events` 게이트 + `tengu_frond_boric` 킬스위치 |
| 1P | 1P만 | `tengu_frond_boric` 킬스위치 (`firstParty` 키) |
| 이벤트별 | 개별 이벤트 | `tengu_event_sampling_config` (샘플링률 0~1) |
| 고객 OTEL | 고객 설정 | `OTEL_METRICS_EXPORTER=none` 등 |

**피드백 설문 별도 제어** (`isFeedbackSurveyDisabled()`): 3P 프로바이더에서는 차단하지 않음 — 설문은 로컬 UI 프롬프트이며 전사 데이터 미포함. `DISABLE_TELEMETRY` 또는 테스트 환경에서만 비활성.

### 12. 이벤트 네이밍 컨벤션 & 주요 이벤트

모든 1P 이벤트는 `tengu_` 접두사를 사용한다 (코드네임).

| 카테고리 | 대표 이벤트 | 설명 |
|---------|-----------|------|
| 세션 | `tengu_started`, `tengu_exit`, `tengu_init` | 세션 시작/종료 |
| API | `tengu_api_error`, `tengu_api_success`, `tengu_api_retry` | API 호출 결과 |
| 도구 | `tengu_tool_use_success`, `tengu_tool_use_error`, `tengu_tool_use_cancelled` | 도구 실행 |
| 권한 | `tengu_tool_use_granted_in_prompt_*`, `tengu_tool_use_rejected_in_prompt` | 도구 권한 |
| OAuth | `tengu_oauth_success`, `tengu_oauth_error`, `tengu_oauth_token_refresh_*` | 인증 흐름 |
| MCP | `tengu_mcp_server_connection_*`, `tengu_mcp_tool_call_*` | MCP 서버 |
| 브릿지 | `tengu_bridge_started`, `tengu_bridge_session_*`, `tengu_bridge_repl_*` | IDE 브릿지 |
| 메모리 | `tengu_memdir_loaded`, `tengu_session_memory_*`, `tengu_team_mem_*` | 메모리 시스템 |
| 플러그인 | `tengu_plugin_enabled_cli`, `tengu_marketplace_*` | 플러그인/마켓플레이스 |
| 음성 | `tengu_voice_recording_started`, `tengu_voice_toggled` | 음성 입력 |
| 코디네이터 | `tengu_coordinator_mode_switched` | 코디네이터 모드 |
| 컴팩트 | `tengu_compact_failed`, `tengu_auto_compact_succeeded` | 히스토리 컴팩션 |
| 캐시 | `tengu_prompt_cache_break` | 프롬프트 캐시 브레이크 |
| 자동 업데이트 | `tengu_update_check`, `tengu_auto_updater_*` | 자동 업데이트 |

### 13. 초기화 시퀀스

```
main.tsx / init.ts 시작 순서:

1. enableConfigs()                          ← 설정 파일 로드
2. applySafeConfigEnvironmentVariables()    ← 신뢰 전 안전 env 적용
3. setupGracefulShutdown()
4. initialize1PEventLogging()               ← 1P OTel LoggerProvider 생성
   └── onGrowthBookRefresh → reinitialize1PEventLoggingIfConfigChanged
5. initSinks()                              ← initializeErrorLogSink + initializeAnalyticsSink
   └── attachAnalyticsSink → 큐 드레인
6. initializeAnalyticsGates()               ← Datadog 게이트 캐시 값 로드
7. initializeTelemetry()                    ← 3P OTEL (설정 시)
8. initializeGrowthBook()                   ← 피처 플래그 (비동기)
```

**종료 시퀀스**:
- `gracefulShutdown()` → `shutdownDatadog()` (배치 플러시) + `shutdown1PEventLogging()` (OTel 셧다운) + `flushTelemetry()` (3P OTEL)
- GrowthBook: `process.on('beforeExit/exit')` → `client.destroy()`

---

## 주목할 점

1. **4층 독립 파이프라인** — 1P, Datadog, BigQuery, 3P OTEL이 완전 분리. 1P가 프라이머리, Datadog은 알람용 서브셋 (37개 이벤트만)
2. **타입 시스템 PII 방어** — `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` 타입으로 문자열 로깅 시 개발자가 의도적으로 캐스팅 필수
3. **Statsig→GrowthBook 마이그레이션 중** — `checkStatsigFeatureGate_CACHED_MAY_BE_STALE`가 GrowthBook 구현으로 래핑됨, Statsig 캐시 fallback 유지
4. **실험 노출 추적** — A/B 실험 할당을 `GrowthbookExperimentEvent` proto로 1P에 로깅. 세션 내 중복 방지, init 전 접근은 `pendingExposures`에 저장
5. **실패 복원** — 1P 이벤트 전송 실패 시 `~/.claude/telemetry/`에 JSONL로 저장, 2차 백오프 재시도, 다음 세션에서 자동 복구
6. **싱크 킬스위치** — GrowthBook `tengu_frond_boric` 하나로 Datadog/1P를 실시간으로 개별 끌 수 있음 (인시던트 대응)
7. **Bedrock/Vertex/Foundry 사용자** — 모든 Anthropic 텔레메트리 자동 비활성. 3P 클라우드 사용자의 데이터는 Anthropic에 전송되지 않음
8. **GrowthBook 리프레시 신호** — `onGrowthBookRefresh()` 구독 패턴으로 1P 배치 설정 변경 시 파이프라인 자동 재구축

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `analytics_sink` | Analytics Sink (라우터) | engine | telemetry |
| `event_queue` | Event Queue (pre-sink) | engine | buffer |
| `datadog_backend` | Datadog Logs Backend | engine | sink |
| `first_party_logger` | 1P Event Logger (OTEL) | engine | sink |
| `first_party_exporter` | 1P Event Exporter | engine | transport |
| `growthbook_client` | GrowthBook Client | control | feature_flags |
| `otel_3p_telemetry` | 3P OTEL Telemetry | engine | observability |
| `bigquery_exporter` | BigQuery Metrics Exporter | engine | sink |
| `privacy_level` | Privacy Level Controller | control | privacy |
| `sink_killswitch` | Sink Killswitch | control | safety |
| `event_sampling` | Event Sampling | control | filtering |
| `metadata_enricher` | Metadata Enricher | engine | enrichment |
| `experiment_tracker` | Experiment Exposure Tracker | control | ab_testing |
| `disk_cache` | Disk Cache (~/.claude.json) | data | persistence |
| `failed_event_store` | Failed Event Store (~/.claude/telemetry/) | data | persistence |

### 새 엣지
| Source | Target | Type | Label |
|--------|--------|------|-------|
| `logEvent` → `event_queue` | queues | 싱크 부착 전 이벤트 큐잉 |
| `event_queue` → `analytics_sink` | drains | 싱크 부착 시 큐 드레인 |
| `analytics_sink` → `event_sampling` | filters | 샘플링 설정으로 필터링 |
| `analytics_sink` → `datadog_backend` | routes | 37개 허용 이벤트만 |
| `analytics_sink` → `first_party_logger` | routes | 전체 이벤트 (_PROTO_* 포함) |
| `first_party_logger` → `first_party_exporter` | batches | OTel BatchLogRecordProcessor |
| `first_party_exporter` → `failed_event_store` | persists | 실패 이벤트 디스크 저장 |
| `growthbook_client` → `event_sampling` | configures | tengu_event_sampling_config |
| `growthbook_client` → `sink_killswitch` | configures | tengu_frond_boric |
| `growthbook_client` → `datadog_backend` | gates | tengu_log_datadog_events |
| `growthbook_client` → `disk_cache` | syncs | 피처 값 디스크 캐싱 |
| `growthbook_client` → `experiment_tracker` | feeds | 실험 노출 데이터 |
| `experiment_tracker` → `first_party_logger` | logs | GrowthbookExperimentEvent |
| `privacy_level` → `analytics_sink` | disables | DISABLE_TELEMETRY |
| `privacy_level` → `growthbook_client` | disables | is1PEventLoggingEnabled 체크 |
| `metadata_enricher` → `datadog_backend` | enriches | 환경/세션 메타데이터 |
| `metadata_enricher` → `first_party_exporter` | enriches | to1PEventFormat 변환 |
| `sink_killswitch` → `datadog_backend` | kills | tengu_frond_boric.datadog |
| `sink_killswitch` → `first_party_exporter` | kills | tengu_frond_boric.firstParty |
| `otel_3p_telemetry` → `bigquery_exporter` | exports | API 고객 메트릭 |
| `logOTelEvent` → `otel_3p_telemetry` | emits | claude_code.* 이벤트 |

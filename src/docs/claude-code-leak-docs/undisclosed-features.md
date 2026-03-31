# Claude Code 유출 소스 — 미공개 기능 및 근거 분석

> 공식적으로 알려지지 않았으나 소스코드에서 확인된 기능들과 그 근거 파일/코드를 정리한 문서.

---

## 목차

1. [미공개 피처 플래그 시스템](#1-미공개-피처-플래그-시스템)
2. [KAIROS — 정체불명의 대규모 서브시스템](#2-kairos--정체불명의-대규모-서브시스템)
3. [PROACTIVE — 능동적 에이전트 모드](#3-proactive--능동적-에이전트-모드)
4. [DAEMON — 백그라운드 데몬 모드](#4-daemon--백그라운드-데몬-모드)
5. [AGENT_TRIGGERS — 크론 스케줄링 시스템](#5-agent_triggers--크론-스케줄링-시스템)
6. [MONITOR_TOOL — 백그라운드 프로세스 모니터링](#6-monitor_tool--백그라운드-프로세스-모니터링)
7. [멀티에이전트 팀 오케스트레이션](#7-멀티에이전트-팀-오케스트레이션)
8. [에이전트 간 메시징 프로토콜](#8-에이전트-간-메시징-프로토콜)
9. [Coordinator Mode — 코디네이터+워커 아키텍처](#9-coordinator-mode--코디네이터워커-아키텍처)
10. [크론 스케줄링 도구](#10-크론-스케줄링-도구)
11. [원격 트리거 인프라](#11-원격-트리거-인프라)
12. [SyntheticOutputTool — SDK 구조화 출력](#12-syntheticoutputtool--sdk-구조화-출력)
13. [GrowthBook — 내부 A/B 테스트 인프라](#13-growthbook--내부-ab-테스트-인프라)
14. [OpenTelemetry + gRPC 텔레메트리](#14-opentelemetry--grpc-텔레메트리)
15. [MDM 엔터프라이즈 관리 통합](#15-mdm-엔터프라이즈-관리-통합)
16. [policyLimits — 조직 정책 제한](#16-policylimits--조직-정책-제한)
17. [remoteManagedSettings — 원격 설정 관리](#17-remotemanagedSettings--원격-설정-관리)
18. [teamMemorySync — 팀 메모리 동기화](#18-teammemorysync--팀-메모리-동기화)
19. [macOS Keychain 통합](#19-macos-keychain-통합)
20. [buddy/ — 이스터에그 컴패니언](#20-buddy--이스터에그-컴패니언)
21. [Bun 런타임 사용 근거](#21-bun-런타임-사용-근거)
22. [LSPTool — Language Server Protocol 통합](#22-lsptool--language-server-protocol-통합)

---

## 1. 미공개 피처 플래그 시스템

`bun:bundle`의 `feature()` 함수로 빌드 타임 데드코드 제거를 수행. 28개의 컴파일 타임 플래그 존재.

### 근거 파일

| 파일 | 역할 |
|------|------|
| `src/shims/bun-bundle.ts` | 피처 플래그 정의 (42줄) |
| `src/types/bun-bundle.d.ts` | TypeScript 타입 스텁 (10줄) |

### 핵심 코드

```typescript
// src/shims/bun-bundle.ts
const FEATURE_FLAGS: Record<string, boolean> = {
  PROACTIVE: envBool('CLAUDE_CODE_PROACTIVE', false),
  KAIROS: envBool('CLAUDE_CODE_KAIROS', false),
  KAIROS_BRIEF: envBool('CLAUDE_CODE_KAIROS_BRIEF', false),
  KAIROS_GITHUB_WEBHOOKS: envBool('CLAUDE_CODE_KAIROS_GITHUB_WEBHOOKS', false),
  BRIDGE_MODE: envBool('CLAUDE_CODE_BRIDGE_MODE', false),
  DAEMON: envBool('CLAUDE_CODE_DAEMON', false),
  VOICE_MODE: envBool('CLAUDE_CODE_VOICE_MODE', false),
  AGENT_TRIGGERS: envBool('CLAUDE_CODE_AGENT_TRIGGERS', false),
  MONITOR_TOOL: envBool('CLAUDE_CODE_MONITOR_TOOL', false),
  COORDINATOR_MODE: envBool('CLAUDE_CODE_COORDINATOR_MODE', false),
  ULTRAPLAN: envBool('CLAUDE_CODE_ULTRAPLAN', false),
  TORCH: envBool('CLAUDE_CODE_TORCH', false),
  BUDDY: envBool('CLAUDE_CODE_BUDDY', false),
  MCP_SKILLS: envBool('CLAUDE_CODE_MCP_SKILLS', false),
  // ... 총 28개
}

export function feature(name: string): boolean {
  return FEATURE_FLAGS[name] ?? false
}
```

### 의미

프로덕션 Bun 빌드에서 이 값들은 컴파일 타임 상수가 되어, `false`인 기능의 코드가 완전히 제거됨. 개발 빌드에서는 `CLAUDE_CODE_*` 환경변수로 오버라이드 가능.

---

## 2. KAIROS — 정체불명의 대규모 서브시스템

**70개 파일에서 참조됨** — 가장 규모가 큰 미공개 기능.

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/shims/bun-bundle.ts:8-10` | KAIROS, KAIROS_BRIEF, KAIROS_GITHUB_WEBHOOKS 플래그 정의 |
| `src/tools.ts:42-52` | KAIROS 전용 도구 등록 (SendUserFileTool, PushNotificationTool, SubscribePRTool) |
| `src/skills/bundled/index.ts:35-38` | Dream 스킬 등록 |
| `src/screens/REPL.tsx:194,1283,1298,2115` | REPL 화면에서의 KAIROS 통합 |
| `src/keybindings/defaultBindings.ts:45-47` | KAIROS 전용 키바인딩 |

### 핵심 코드

```typescript
// src/tools.ts:42-52 — KAIROS 전용 도구들
const SendUserFileTool = feature('KAIROS')
  ? require('./tools/SendUserFileTool/SendUserFileTool.js').SendUserFileTool
  : null

const PushNotificationTool =
  feature('KAIROS') || feature('KAIROS_PUSH_NOTIFICATION')
    ? require('./tools/PushNotificationTool/PushNotificationTool.js').PushNotificationTool
    : null

const SubscribePRTool = feature('KAIROS_GITHUB_WEBHOOKS')
  ? require('./tools/SubscribePRTool/SubscribePRTool.js').SubscribePRTool
  : null

// src/skills/bundled/index.ts:35-38 — Dream 기능
if (feature('KAIROS') || feature('KAIROS_DREAM')) {
  const { registerDreamSkill } = require('./dream.js')
  registerDreamSkill()
}
```

### 의미

KAIROS는 단일 기능이 아닌 **기능 묶음**:
- **파일 전송** (SendUserFileTool)
- **푸시 알림** (PushNotificationTool)
- **GitHub PR 구독/웹훅** (SubscribePRTool)
- **자율 드리밍** (Dream 스킬)
- **Brief 모드** (KAIROS_BRIEF)

"능동적 에이전트 플랫폼"으로의 진화를 보여주는 핵심 서브시스템.

---

## 3. PROACTIVE — 능동적 에이전트 모드

**52개 파일에서 참조됨** — 사용자 입력 없이 에이전트가 자율 행동.

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/shims/bun-bundle.ts:7` | 플래그 정의 |
| `src/screens/REPL.tsx:194,198,2115` | 프로액티브 모듈 로딩 및 일시정지 |
| `src/tools.ts:25-28` | SleepTool 게이팅 |
| `src/services/compact/prompt.ts:7,362` | 컴팩션 시 프로액티브 컨텍스트 |

### 핵심 코드

```typescript
// src/screens/REPL.tsx:194,198 — 프로액티브 모듈 동적 로드
const proactiveModule = feature('PROACTIVE') || feature('KAIROS')
  ? require('../proactive/index.js') : null;
const useProactive = feature('PROACTIVE') || feature('KAIROS')
  ? require('../proactive/useProactive.js').useProactive : null;

// src/tools.ts:25-28 — SleepTool은 프로액티브 모드 전용
const SleepTool =
  feature('PROACTIVE') || feature('KAIROS')
    ? require('./tools/SleepTool/SleepTool.js').SleepTool
    : null

// src/screens/REPL.tsx:2115-2117 — 프로액티브 일시정지
if (feature('PROACTIVE') || feature('KAIROS')) {
  proactiveModule?.pauseProactive();
}
```

### 의미

에이전트가 사용자 요청 없이도 **스스로 행동을 개시**하는 모드. SleepTool로 대기했다가 조건 충족 시 자율 실행. KAIROS와 결합되어 동작.

---

## 4. DAEMON — 백그라운드 데몬 모드

**30개 파일에서 참조됨.**

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/shims/bun-bundle.ts:12` | 플래그 정의 |
| `src/entrypoints/cli.tsx:100,165` | 데몬 워커/슈퍼바이저 진입점 |
| `src/commands.ts:77-78` | 데몬 전용 커맨드 등록 |

### 핵심 코드

```typescript
// src/entrypoints/cli.tsx:100 — 데몬 워커 모드
if (feature('DAEMON') && args[0] === '--daemon-worker') {
  // daemon worker initialization
}

// src/entrypoints/cli.tsx:165 — 데몬 슈퍼바이저 모드
// Fast-path for `claude daemon [subcommand]`: long-running supervisor.
if (feature('DAEMON') && args[0] === 'daemon') {
  // daemon supervisor logic
}

// src/commands.ts:77-78 — 데몬+브릿지 결합
const remoteControlServerCommand =
  feature('DAEMON') && feature('BRIDGE_MODE')
```

### 의미

`claude daemon` 명령으로 장시간 실행되는 **슈퍼바이저 프로세스** 구동. 워커 프로세스(`--daemon-worker`)를 관리하며, Bridge 모드와 결합하여 IDE와 연동.

---

## 5. AGENT_TRIGGERS — 크론 스케줄링 시스템

**7개 파일에서 참조됨.**

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/shims/bun-bundle.ts:14` | 플래그 정의 |
| `src/tools.ts:29-35` | CronCreate/Delete/List 도구 등록 |
| `src/screens/REPL.tsx:199,4046` | 스케줄 태스크 훅 |
| `src/skills/bundled/index.ts:47-55` | Loop 스킬 등록 |
| `src/tools/ScheduleCronTool/prompt.ts:13-18` | GrowthBook 연동 게이트 |

### 핵심 코드

```typescript
// src/tools.ts:29-35 — 크론 도구 3종 등록
const cronTools = feature('AGENT_TRIGGERS')
  ? [
      require('./tools/ScheduleCronTool/CronCreateTool.js').CronCreateTool,
      require('./tools/ScheduleCronTool/CronDeleteTool.js').CronDeleteTool,
      require('./tools/ScheduleCronTool/CronListTool.js').CronListTool,
    ]
  : []

// src/skills/bundled/index.ts:47-55 — 반복 실행 스킬
if (feature('AGENT_TRIGGERS')) {
  const { registerLoopSkill } = require('./loop.js')
  registerLoopSkill()
}

// src/tools/ScheduleCronTool/prompt.ts:13-18 — GrowthBook 피처게이트
export function isKairosCronEnabled(): boolean {
  return feature('AGENT_TRIGGERS')
    ? !isEnvTruthy(process.env.CLAUDE_CODE_DISABLE_CRON) &&
        getFeatureValue_CACHED_WITH_REFRESH('tengu_kairos_cron', ...)
    : false
}
```

### 의미

`"0 9 * * 1-5"` 같은 크론 표현식으로 **에이전트 자동 실행을 스케줄링**. Loop 스킬과 결합하여 반복 작업 자동화. GrowthBook(`tengu_kairos_cron`)으로 추가 게이팅.

---

## 6. MONITOR_TOOL — 백그라운드 프로세스 모니터링

**11개 파일에서 참조됨.**

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/shims/bun-bundle.ts:15` | 플래그 정의 |
| `src/tools.ts:39-40` | MonitorTool 등록 |
| `src/tasks.ts:12-14` | MonitorMcpTask 등록 |
| `src/tools/BashTool/BashTool.tsx:525` | Sleep 패턴 차단 |
| `src/tasks/LocalShellTask/LocalShellTask.tsx:129,169` | 태스크 알림 우선순위 |

### 핵심 코드

```typescript
// src/tools.ts:39-40
const MonitorTool = feature('MONITOR_TOOL')
  ? require('./tools/MonitorTool/MonitorTool.js').MonitorTool
  : null

// src/tasks.ts:12-14
const MonitorMcpTask: Task | null = feature('MONITOR_TOOL')
  ? require('./tasks/MonitorMcpTask/MonitorMcpTask.js').MonitorMcpTask
  : null

// src/tools/BashTool/BashTool.tsx:525 — sleep 명령 차단
if (feature('MONITOR_TOOL') && !isBackgroundTasksDisabled && !input.run_in_background) {
  const sleepPattern = detectBlockedSleepPattern(input.command);
}

// src/tasks/LocalShellTask/LocalShellTask.tsx:169 — 알림 우선순위 변경
priority: feature('MONITOR_TOOL') ? 'next' : 'later',
```

### 의미

MCP 프로세스의 실시간 모니터링/스트리밍. BashTool에서 불필요한 `sleep` 명령을 감지·차단하고, 태스크 알림 우선순위를 높여 즉각 반응.

---

## 7. 멀티에이전트 팀 오케스트레이션

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/tools/TeamCreateTool/TeamCreateTool.ts` | 팀 생성 구현 |
| `src/tools/TeamDeleteTool/TeamDeleteTool.ts` | 팀 삭제 구현 |

### 핵심 구조

TeamCreateTool:
- 결정론적 에이전트 ID: `formatAgentId(TEAM_LEAD_NAME, teamName)`
- `.claude/` 디렉토리에 팀 메타데이터 영속화 (멤버 목록, 에이전트 타입, 모델, tmux pane ID)
- 태스크 리스트를 에이전트 간 디렉토리 동기화
- 에이전트 타입 지정: `agent_type: "researcher"` 등
- tmux/iTerm2 백엔드로 별도 터미널 팬에서 에이전트 스폰

TeamDeleteTool:
- 활성 팀원이 있으면 삭제 차단 (`isActive !== false`)
- 모든 비리더 멤버가 idle/완료 상태일 때만 정리
- `requestShutdown` 프로토콜로 팀원 종료

### 의미

**멀티에이전트 스웜** 구현. 리더 에이전트가 여러 자율 에이전트를 조율하며, 각 에이전트는 독립 터미널 팬에서 실행. 팀 라이프사이클 전체 관리 (생성 → 병렬 작업 → 종료).

---

## 8. 에이전트 간 메시징 프로토콜

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/tools/SendMessageTool/SendMessageTool.ts` | 메시지 전송 구현 |

### 핵심 구조

메시지 타입 (lines 46-65):
- `shutdown_request` — 에이전트 종료 요청 (사유 포함)
- `shutdown_response` — 종료 승인/거부
- `plan_approval_response` — 팀 리더가 팀원 계획 승인/거부 + 피드백

통신 방식:
- 브로드캐스트: `to: "*"` (전체 팀원)
- 다이렉트: 특정 팀원 이름 지정
- **크로스세션**: UDS(Unix Domain Socket) 및 `bridge:<session-id>` 주소 지정 (lines 72-74)

종료 프로토콜 (lines 305-432):
```
Leader → Agent: shutdown_request(requestId, reason)
Agent → Leader: shutdown_response(requestId, approve=true/false, reason)
```

### 의미

에이전트 간 **구조화된 비동기 통신 프로토콜** 존재. 크로스프로세스, 크로스세션 메시징 지원. 계획 승인 워크플로우는 에이전트가 행동 전 허가를 요청하는 구조.

---

## 9. Coordinator Mode — 코디네이터+워커 아키텍처

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/coordinator/coordinatorMode.ts` | 코디네이터 모드 전체 구현 |

### 핵심 구조

시스템 프롬프트에 정의된 워크플로우 (lines 200-218):

| 단계 | 설명 | 병렬성 |
|------|------|--------|
| **Research** | 워커들이 코드베이스 조사 | 완전 병렬 |
| **Synthesis** | 코디네이터가 결과 종합, 구현 스펙 작성 | 순차 |
| **Implementation** | 워커들이 스펙대로 변경, 커밋 | 파일셋 당 1개 |
| **Verification** | 워커들이 변경 테스트 | 구현과 병행 가능 |

워커 결과 포맷 (lines 142-160):
```xml
<task-notification>
  <task-id>{agentId}</task-id>
  <status>completed|failed|killed</status>
  <summary>{summary}</summary>
  <result>{final text response}</result>
  <usage>
    <total_tokens>N</total_tokens>
    <tool_uses>N</tool_uses>
    <duration_ms>N</duration_ms>
  </usage>
</task-notification>
```

내부 워커 전용 도구 (lines 29-34):
```typescript
INTERNAL_WORKER_TOOLS = [
  TEAM_CREATE_TOOL_NAME,
  TEAM_DELETE_TOOL_NAME,
  SEND_MESSAGE_TOOL_NAME,
  SYNTHETIC_OUTPUT_TOOL_NAME,
]
```

### 의미

**코디네이터가 다수 워커를 지휘**하는 본격적인 멀티에이전트 오케스트레이션 시스템. 연구→종합→구현→검증의 4단계 파이프라인. 워커는 재귀적으로 다른 워커를 스폰 가능.

---

## 10. 크론 스케줄링 도구

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/tools/ScheduleCronTool/CronCreateTool.ts` | 크론 생성 구현 |

### 핵심 구조

- 5-필드 크론 문법: `"M H DoM Mon DoW"` (로컬 타임)
- `recurring: true` — 반복 실행 / `false` — 1회 실행 후 자동 삭제
- `durable: true` — `.claude/scheduled_tasks.json`에 영속화, 재시작 후에도 유지
- 자동 만료: 30일 후 자동 삭제 (line 19, 151)
- 최대 동시 50개 스케줄 (line 25)
- 팀원(teammate)은 durable 크론 불가 — 세션 전용만 허용 (lines 105-114)

### 의미

에이전트가 **스스로 크론을 등록**하여 미래 시점에 자율 실행. 세션 재시작 후에도 지속되는 영속 모드 존재. 최대 50개 동시 스케줄 가능.

---

## 11. 원격 트리거 인프라

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/tools/RemoteTriggerTool/RemoteTriggerTool.ts` | 원격 트리거 구현 |

### 핵심 구조

- 연산: `list`, `get`, `create`, `update`, `run`
- Beta API: `'ccr-triggers-2026-01-30'` (Remote Control Triggers)
- 엔드포인트: `${BASE_API_URL}/v1/code/triggers`
- OAuth 인증 필수 (claude.ai 계정)
- 조직 UUID 스코핑

### 의미

Anthropic 서버에 **원격 트리거 인프라** 존재. 외부 웹훅이나 스케줄 서비스에서 원격 머신의 에이전트를 HTTP로 실행 가능.

---

## 12. SyntheticOutputTool — SDK 구조화 출력

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/tools/SyntheticOutputTool/SyntheticOutputTool.ts` | 구현 |

### 핵심 구조

- 비대화형 세션에서만 활성화 (line 25)
- 동적 JSON 스키마로 출력 유효성 검증 (Ajv)
- WeakMap 캐싱: 동일 스키마 30-80회 호출 시 ~110ms → ~4ms 최적화

```typescript
createSyntheticOutputTool(jsonSchema): CreateResult
  → Returns {tool} with compiled schema validator
  → Or {error} with Ajv diagnostic message
```

### 의미

워크플로우/SDK에서 에이전트를 **프로그래매틱하게 호출**하고 구조화된 JSON 출력을 받는 시스템. 비대화형 자동화 파이프라인 지원.

---

## 13. GrowthBook — 내부 A/B 테스트 인프라

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/services/analytics/growthbook.ts` | GrowthBook 클라이언트 (1,157줄) |
| `src/types/generated/events_mono/growthbook/v1/growthbook_experiment_event.ts` | 실험 이벤트 타입 |

### 핵심 코드

```typescript
const thisClient = new GrowthBook({
  apiHost: baseUrl,
  clientKey,
  attributes,
  remoteEval: true,
  cacheKeyAttributes: ['id', 'organizationUUID'],
  ...(authHeaders.error ? {} : { apiHostRequestHeaders: authHeaders.headers }),
})
```

### 주요 특징

- `remoteEval: true` — 서버측 피처 플래그 평가
- 내부 테스트용 환경변수 오버라이드: `CLAUDE_INTERNAL_FC_OVERRIDES`
- 새로고침 주기: 외부 6시간, 내부("ant" 빌드) 20분
- 실험 노출 추적 및 세션 레벨 중복 제거
- 디스크 캐시 (오프라인 지원)

### 의미

사용자에게 **다른 기능 조합을 노출**하는 A/B 테스트 인프라. 내부 빌드("ant")는 20분 간격으로 빠르게 플래그 갱신.

---

## 14. OpenTelemetry + gRPC 텔레메트리

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/utils/telemetry/instrumentation.ts` | OTEL 인스트루멘테이션 (827줄) |

### 주요 특징

- 로그, 메트릭, 트레이스 전체 지원
- 익스포터: gRPC, HTTP/JSON, HTTP/Protobuf, Prometheus, **BigQuery**
- `BETA_TRACING_ENDPOINT` — 별도 트레이싱 엔드포인트
- BigQuery 익스포터: API 고객 및 C4E/Team 사용자 대상
- mTLS 및 프록시 지원
- 동적 지연 로딩 (~400KB OTel + ~700KB gRPC)

```typescript
const { OTLPMetricExporter } = await import(
  '@opentelemetry/exporter-metrics-otlp-grpc'
)
exporters.push(new OTLPMetricExporter())
```

### 의미

사용자 행동 데이터를 **gRPC로 수집하여 BigQuery에 적재**하는 텔레메트리 파이프라인. 엔터프라이즈급 관측 가능성 인프라.

---

## 15. MDM 엔터프라이즈 관리 통합

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/utils/settings/mdm/rawRead.ts` | MDM 서브프로세스 리더 (131줄) |
| `src/utils/settings/mdm/constants.ts` | MDM 상수 |
| `src/utils/settings/mdm/settings.ts` | MDM 설정 처리 |

### 핵심 코드

```typescript
export function startMdmRawRead(): void {
  if (rawReadPromise) return
  rawReadPromise = fireRawRead()
}
// macOS: plutil로 plist 파싱
// Windows: reg query로 HKLM/HKCU 레지스트리 조회
```

### 의미

기업 IT 관리자가 **MDM(모바일 디바이스 관리)으로 Claude Code 설정을 원격 관리** 가능. macOS plist + Windows 레지스트리 크로스 플랫폼 지원. 스타트업 시 논블로킹 병렬 로드.

---

## 16. policyLimits — 조직 정책 제한

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/services/policyLimits/index.ts` | 정책 제한 서비스 (665줄) |
| `src/services/policyLimits/types.ts` | 타입 정의 (28줄) |

### 핵심 코드

```typescript
export function isPolicyAllowed(policy: string): boolean {
  const restrictions = getRestrictionsFromCache()
  if (!restrictions) {
    if (isEssentialTrafficOnly() && ESSENTIAL_TRAFFIC_DENY_ON_MISS.has(policy)) {
      return false
    }
    return true // fail open
  }
  const restriction = restrictions[policy]
  return restriction?.allowed ?? true
}
```

### 주요 특징

- Console 사용자(API키): 전원 대상
- OAuth 사용자: Team/Enterprise 구독자만
- ETag 기반 HTTP 캐싱 + 1시간 주기 백그라운드 폴링
- `~/.claude/policy-limits.json`에 영속 캐시
- Fail-open 패턴: 서버 실패 시 제한 없이 진행
- 지수 백오프 재시도 (최대 5회)

### 의미

엔터프라이즈 조직이 **정책으로 특정 기능을 제한**할 수 있는 인프라. Fail-open 설계로 서비스 중단 시에도 동작 보장.

---

## 17. remoteManagedSettings — 원격 설정 관리

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/services/remoteManagedSettings/index.ts` | 원격 설정 서비스 (640줄) |
| `src/services/remoteManagedSettings/types.ts` | 타입 정의 (32줄) |
| `src/services/remoteManagedSettings/syncCache.ts` | 동기화 캐시 |
| `src/services/remoteManagedSettings/securityCheck.tsx` | 보안 검사 UI |

### 주요 특징

- 엔드포인트: `${BASE_API_URL}/api/claude_code/settings`
- SettingsSchema로 설정 유효성 검증
- ETag 캐싱 (Python `json.dumps(sort_keys=True)` 호환 체크섬)
- 보안 변경 시 사용자 확인 다이얼로그
- 1시간 주기 핫리로드: `settingsChangeDetector.notifyChange()`

### 의미

서버에서 **설정을 푸시하여 클라이언트 동작을 원격 제어**. 엔터프라이즈 관리자가 전체 조직의 Claude Code 설정을 중앙 관리.

---

## 18. teamMemorySync — 팀 메모리 동기화

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/services/teamMemorySync/index.ts` | 팀 메모리 동기화 (51KB) |
| `src/services/teamMemorySync/types.ts` | 타입 |
| `src/services/teamMemorySync/watcher.ts` | 파일 워처 |
| `src/services/teamMemorySync/secretScanner.ts` | 시크릿 스캐너 |
| `src/services/teamMemorySync/teamMemSecretGuard.ts` | 시크릿 가드 |

### 주요 특징

- Git remote 해시로 레포지토리 식별
- API 엔드포인트:
  - `GET /api/claude_code/team_memory?repo={owner/repo}` → 전체 데이터
  - `PUT /api/claude_code/team_memory?repo={owner/repo}` → 델타 업로드
- 델타 동기화: 변경된 키만 업로드 (콘텐츠 해시 비교)
- 시크릿 스캐닝 및 가드 기능
- OAuth 스코프: `CLAUDE_AI_INFERENCE_SCOPE` + `CLAUDE_AI_PROFILE_SCOPE`

### 의미

같은 레포에서 작업하는 팀원들이 **CLAUDE.md 메모리를 서버를 통해 동기화**. 시크릿 스캐너로 민감 정보 유출 방지.

---

## 19. macOS Keychain 통합

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/utils/secureStorage/macOsKeychainStorage.ts` | 키체인 스토리지 (233줄) |
| `src/utils/secureStorage/macOsKeychainHelpers.ts` | 헬퍼 |
| `src/utils/secureStorage/keychainPrefetch.ts` | 프리페치 |

### 핵심 코드

```typescript
export const macOsKeychainStorage = {
  name: 'keychain',
  read(): SecureStorageData | null {
    const storageServiceName = getMacOsKeychainStorageServiceName(CREDENTIALS_SERVICE_SUFFIX)
    const username = getUsername()
    const result = execSyncWithDefaults_DEPRECATED(
      `security find-generic-password -a "${username}" -w -s "${storageServiceName}"`
    )
  }
}
```

### 주요 특징

- `security` CLI로 네이티브 키체인 연동
- 16진수 페이로드 인코딩 (프로세스 모니터에서 평문 노출 방지)
- 키체인 잠금 감지: `isMacOsKeychainLocked()` (exit code 36)
- SSH 세션에서 키체인 미잠금 해제 감지
- 캐시 TTL 지원 (`KEYCHAIN_CACHE_TTL_MS`)

### 의미

인증 정보를 **OS 수준 보안 스토리지에 저장**. 평문 노출 방지를 위한 hex 인코딩과 잠금 상태 감지 등 보안 강화.

---

## 20. buddy/ — 이스터에그 컴패니언

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/buddy/companion.ts` | 컴패니언 생성 로직 (136줄) |
| `src/buddy/types.ts` | 타입 정의 (100+줄) |
| `src/buddy/sprites.ts` | 스프라이트 정의 |
| `src/buddy/prompt.ts` | 프롬프트 |
| `src/buddy/CompanionSprite.tsx` | React 렌더링 컴포넌트 |
| `src/buddy/useBuddyNotification.tsx` | 알림 시스템 |

### 핵심 코드

```typescript
// userId 기반 결정론적 캐릭터 생성
export function roll(userId: string): Roll {
  const key = userId + SALT // SALT = 'friend-2026-401'
  if (rollCache?.key === key) return rollCache.value
  const value = rollFrom(mulberry32(hashString(key)))
  rollCache = { key, value }
  return value
}
```

### 주요 특징

- 프로시저럴 캐릭터 생성 (userId 기반 결정론적 RNG — `mulberry32`)
- 스탯: DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK
- 희귀도: common, uncommon, rare, epic, legendary
- 종족 18종: duck, goose, blob, cat, dragon, octopus, owl, penguin, turtle, snail, ghost, axolotl, capybara, cactus, robot, rabbit, mushroom, chonk
- 모자: propeller, crown, tophat, halo, wizard, beanie, tinyduck
- Shiny 변이 (1% 확률)
- `Bun.hash()` 최적화

### 의미

개발팀의 유머와 문화가 반영된 **숨겨진 가상 펫 시스템**. 사용자별 고유 캐릭터 생성.

---

## 21. Bun 런타임 사용 근거

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/buddy/companion.ts:28-29` | `typeof Bun !== 'undefined'` 런타임 감지 |
| `src/shims/bun-bundle.ts` | `bun:bundle` 모듈 shim |
| `src/types/bun-bundle.d.ts` | `declare module 'bun:bundle'` |
| `package.json` | `"engines": { "bun": ">=1.1.0" }`, `"packageManager": "bun@1.1.0"` |

### 핵심 코드

```typescript
// src/buddy/companion.ts:28-29
function hashString(s: string): number {
  if (typeof Bun !== 'undefined') {
    return Number(BigInt(Bun.hash(s)) & 0xffffffffn)
  }
  // Fallback: manual FNV-1a hash
}
```

### 의미

Node.js가 아닌 **Bun을 공식 런타임으로 사용**한다는 직접적 근거. `Bun.hash()` 같은 Bun 전용 API 활용. package.json에 `"packageManager": "bun@1.1.0"` 명시.

---

## 22. LSPTool — Language Server Protocol 통합

### 근거 파일

| 파일 | 내용 |
|------|------|
| `src/tools/LSPTool/LSPTool.ts` | LSP 도구 구현 |

### 지원 연산

| 연산 | 설명 |
|------|------|
| `goToDefinition` | 심볼 정의 위치 탐색 |
| `findReferences` | 모든 참조 검색 |
| `hover` | 타입 정보 조회 |
| `documentSymbol` | 파일 내 심볼 목록 |
| `workspaceSymbol` | 프로젝트 전체 심볼 검색 |
| `goToImplementation` | 구현체 탐색 |
| `prepareCallHierarchy` | 호출 트리 준비 |
| `incomingCalls` | 호출자 탐색 |
| `outgoingCalls` | 피호출 함수 탐색 |

### 주요 특징

- 파일 크기 제한: 10MB
- LSP 서버 초기화 대기 후 요청
- 열린 파일 서버별 캐싱
- `git check-ignore`로 gitignore 파일 필터링 (50개씩 배치)

### 의미

에이전트가 **코드 네비게이션과 리팩터링을 LSP 수준에서 수행** 가능. 단순 텍스트 검색을 넘어 의미론적 코드 이해.

---

## 종합 결론

이 유출 소스에서 드러난 미공개 기능들은 크게 3가지 방향을 보여줌:

### 1. 자율 에이전트 플랫폼

KAIROS + PROACTIVE + DAEMON + AGENT_TRIGGERS + Coordinator + Team/SendMessage 조합은 Claude Code가 **단순 CLI 도구에서 자율 멀티에이전트 오케스트레이션 플랫폼으로 진화 중**임을 보여줌.

### 2. 엔터프라이즈 관리 인프라

MDM + policyLimits + remoteManagedSettings + teamMemorySync는 **기업 환경에서의 중앙 관리 체계**가 이미 구축되어 있음을 보여줌.

### 3. 내부 실험/분석 체계

GrowthBook + OpenTelemetry + BigQuery는 사용자 행동을 **정밀하게 추적하고 A/B 테스트하는 데이터 파이프라인**이 가동 중임을 보여줌.

모든 기능은 **프로덕션 수준 코드**(에러 핸들링, 권한 체크, 분석 로깅, 피처 게이팅)로 구현되어 있어, 안정적으로 테스트된 기능이 출시를 기다리고 있음을 시사.

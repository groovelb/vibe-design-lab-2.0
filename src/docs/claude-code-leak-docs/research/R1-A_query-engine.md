# R1-A: QueryEngine 실행 루프 분석

## 파일: `src/QueryEngine.ts` (1,297줄)

---

## 핵심 발견

### 1. QueryEngine 클래스 구조 (L184–1177)

```
QueryEngine {
  config: QueryEngineConfig        // 도구, 명령, MCP, 모델, 예산 등
  mutableMessages: Message[]       // 대화 상태 (세션 간 유지)
  abortController: AbortController // 중단 제어
  permissionDenials: SDKPermissionDenial[]  // 거부 추적
  totalUsage: NonNullableUsage     // 토큰 사용량 누적
  readFileState: FileStateCache    // 파일 읽기 캐시
  discoveredSkillNames: Set        // 턴별 스킬 탐색 추적
}
```

**핵심 메서드**: `submitMessage()` — AsyncGenerator<SDKMessage>

### 2. 실행 파이프라인

```
submitMessage(prompt)
  ├── 1. fetchSystemPromptParts()     ← 시스템 프롬프트 조립
  │     └── getCoordinatorUserContext() ← COORDINATOR_MODE 시 추가
  ├── 2. asSystemPrompt([...parts])    ← 최종 시스템 프롬프트
  ├── 3. processUserInput()            ← 슬래시 커맨드 처리
  ├── 4. recordTranscript()            ← 세션 영속화
  ├── 5. query({                       ← 핵심 쿼리 루프 진입
  │       messages, systemPrompt,
  │       canUseTool, maxTurns,
  │       taskBudget, ...
  │     })
  │     └── for await (message of query)
  │           ├── assistant → 응답 수집 + yield
  │           ├── user → 턴 카운트 증가
  │           ├── stream_event → 토큰 사용량 추적
  │           ├── progress → 인라인 기록
  │           ├── attachment → 구조화 출력, max_turns 등
  │           ├── system → 컴팩트 경계, API 에러
  │           └── tool_use_summary → SDK 전달
  ├── 6. 중단 조건 체크
  │     ├── maxBudgetUsd 초과
  │     ├── maxTurns 도달
  │     └── structured output 재시도 한도
  └── 7. yield result (success/error)
```

### 3. Feature-Gated 조건부 임포트 (L110–128)

| 피처 플래그 | 임포트 대상 | 역할 |
|------------|------------|------|
| `COORDINATOR_MODE` | `coordinatorMode.js` | 코디네이터 컨텍스트 주입 |
| `HISTORY_SNIP` | `snipCompact.js`, `snipProjection.js` | 히스토리 스닙 압축 |

### 4. 권한 래핑 (L244–271)

```typescript
wrappedCanUseTool = async (tool, input, ...) => {
  const result = await canUseTool(...)
  if (result.behavior !== 'allow') {
    this.permissionDenials.push({
      tool_name, tool_use_id, tool_input
    })
  }
  return result
}
```
- 모든 도구 호출은 `canUseTool`을 거침
- 거부된 호출은 SDK 리포팅용으로 추적

### 5. 시스템 프롬프트 조립 (L286–325)

```typescript
// 1단계: 기본 프롬프트 파트 가져오기
const { defaultSystemPrompt, userContext, systemContext } =
  await fetchSystemPromptParts({tools, mainLoopModel, mcpClients, ...})

// 2단계: 코디네이터 컨텍스트 병합
const userContext = {
  ...baseUserContext,
  ...getCoordinatorUserContext(mcpClients, scratchpadDir)
}

// 3단계: 메모리 프롬프트 (SDK + 커스텀 프롬프트일 때)
const memoryMechanicsPrompt = (customPrompt && hasAutoMemPathOverride())
  ? await loadMemoryPrompt() : null

// 4단계: 최종 조립
const systemPrompt = asSystemPrompt([
  ...(customPrompt ? [customPrompt] : defaultSystemPrompt),
  ...(memoryMechanicsPrompt ? [...] : []),
  ...(appendSystemPrompt ? [...] : []),
])
```

### 6. 세션 영속화 전략

- **유저 메시지**: 쿼리 루프 진입 전 즉시 기록 (프로세스 킬 대비)
- **어시스턴트 메시지**: Fire-and-forget (성능 우선)
- **컴팩트 경계**: 즉시 기록 + 이전 메시지 GC
- **Bare 모드** (`--bare`): 기록은 하되 블로킹 안 함
- **EAGER_FLUSH**: cowork/데스크톱 앱에서 즉시 flush

### 7. 메시지 처리 루프 핵심 (L675–1049)

```
for await (message of query(...)):
  ├── tombstone → 스킵 (메시지 제거 신호)
  ├── assistant → mutableMessages에 push + yield 정규화
  ├── user → 턴 카운트++
  ├── stream_event:
  │     ├── message_start → 사용량 리셋
  │     ├── message_delta → 사용량 업데이트 + stop_reason 캡처
  │     └── message_stop → 총 사용량 누적
  ├── progress → 인라인 기록 (resume 정합성)
  ├── attachment:
  │     ├── structured_output → 캡처
  │     ├── max_turns_reached → error_max_turns 결과 yield + return
  │     └── queued_command → SDK user replay
  ├── system:
  │     ├── snip boundary → snipReplay 실행
  │     ├── compact_boundary → GC + SDK yield
  │     └── api_error → SDK api_retry yield
  └── tool_use_summary → SDK yield
```

### 8. ask() 편의 래퍼 (L1186–1295)

- QueryEngine을 일회용으로 생성하는 래퍼
- SDK/헤드리스 경로에서 사용
- HISTORY_SNIP 활성화 시 snipReplay 콜백 주입

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `query_engine` | QueryEngine | engine | execution |
| `submit_message` | submitMessage() | engine | execution |
| `message_loop` | Message Processing Loop | engine | execution |
| `session_persistence` | Session Persistence | engine | data |
| `permission_wrapper` | Permission Wrapper | control | security |
| `snip_compact` | History Snip | engine | memory |

### 새 엣지
| Source | Target | Type | Label |
|--------|--------|------|-------|
| `submit_message` → `system_prompt` | triggers | 시스템 프롬프트 조립 |
| `submit_message` → `query_loop` | triggers | 쿼리 루프 진입 |
| `message_loop` → `session_persistence` | feeds | 메시지 기록 |
| `permission_wrapper` → `message_loop` | gates | 도구 호출 필터링 |
| `coordinator_mode` → `submit_message` | injects | 컨텍스트 주입 |
| `snip_compact` → `message_loop` | manages | 컨텍스트 관리 |

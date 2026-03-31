# R4-C: KAIROS/PROACTIVE 자율 에이전트 시스템 분석

## 파일들
- `src/shims/bun-bundle.ts` (42줄) — 피처 플래그 정의
- `src/constants/prompts.ts` (~915줄) — `getProactiveSection()` 자율 시스템 프롬프트
- `src/utils/systemPrompt.ts` (124줄) — `buildEffectiveSystemPrompt()` KAIROS 분기 로직
- `src/tools/SleepTool/prompt.ts` (18줄) — Sleep 도구 프롬프트
- `src/tools/BriefTool/BriefTool.ts` (205줄) — SendUserMessage 도구 (`isBriefEntitled()`, `isBriefEnabled()`)
- `src/tools/BriefTool/prompt.ts` (23줄) — Brief 프롬프트, `BRIEF_PROACTIVE_SECTION`
- `src/tools/ScheduleCronTool/prompt.ts` (136줄) — CronCreate/Delete/List 게이트 및 프롬프트
- `src/tools/ScheduleCronTool/CronCreateTool.ts` (158줄) — Cron 생성 도구
- `src/tools/RemoteTriggerTool/RemoteTriggerTool.ts` (162줄) — 원격 트리거 API 도구
- `src/tools/RemoteTriggerTool/prompt.ts` (16줄) — 원격 트리거 프롬프트
- `src/utils/cronScheduler.ts` (566줄) — 크론 스케줄러 코어
- `src/hooks/useScheduledTasks.ts` — REPL 크론 스케줄러 래퍼
- `src/skills/bundled/loop.ts` (94줄) — `/loop` 스킬
- `src/skills/bundled/scheduleRemoteAgents.ts` (449줄) — `/schedule` 스킬
- `src/services/autoDream/autoDream.ts` (326줄) — AutoDream (KAIROS 비활성 시)
- `src/services/autoDream/consolidationPrompt.ts` (66줄) — Dream 통합 프롬프트
- `src/services/mcp/channelNotification.ts` (317줄) — MCP 채널 알림 시스템
- `src/ink/terminal-focus-state.ts` (48줄) — 터미널 포커스 감지
- `src/ink/events/terminal-focus-event.ts` (20줄) — DECSET 1004 이벤트
- `src/ink/hooks/use-terminal-focus.ts` (17줄) — React 포커스 훅
- `src/bootstrap/state.ts` — `kairosActive`, `userMsgOptIn` 상태
- `src/screens/REPL.tsx` (~5000줄) — 프로액티브/크론 통합, 틱 루프, 터미널 포커스 주입
- `src/constants/xml.ts` (88줄) — `TICK_TAG`, `CHANNEL_MESSAGE_TAG` 정의
- `src/tools.ts` (~250줄) — 도구 등록 (SleepTool, CronTools, SubscribePRTool)
- `src/commands/brief.ts` (133줄) — `/brief` 명령어
- `src/main.tsx` (~5000줄) — `setKairosActive()`, 어시스턴트 모드 활성화, 게이트 체크
- `src/entrypoints/cli.tsx` (~200줄) — `--daemon-worker`, `daemon` 서브커맨드

---

## 핵심 발견

### 1. KAIROS 시스템 아키텍처 — "반응적 도구에서 자율 에이전트로"

KAIROS는 Claude Code를 **반응적 도구**(사용자 명령 → 실행 → 대기)에서 **자율적 에이전트**(독립적으로 각성, 작업 탐색, 실행, 수면, 반복)로 전환하는 시스템이다. 코드 내 "KAIROS"라는 이름은 62개 소스 파일에서 참조되며, 사실상 Claude Code의 차세대 에이전트 패러다임을 구성한다.

```
KAIROS 자율 에이전트 시스템
├── Proactive Mode — 틱 기반 각성 루프
│   ├── <tick> XML 메시지 — "당신은 깨어있다, 무엇을 할 것인가?"
│   ├── Sleep 도구 — 각성 간격 제어 (비용/캐시 균형)
│   ├── Terminal Focus 감지 — DECSET 1004로 자율성 수준 조절
│   └── Context Blocking — API 에러 시 무한 루프 방지
├── Agent Triggers (크론 스케줄링)
│   ├── CronCreate/Delete/List 도구 — 크론 식 기반 태스크 CRUD
│   ├── /loop 스킬 — 사용자 친화 반복 실행 인터페이스
│   ├── /schedule 스킬 — 원격 에이전트 스케줄링 (CCR)
│   ├── 듀얼 스토리지 — 파일(durable) vs 세션(ephemeral)
│   └── 지터 + 스케줄러 락 — 썬더링 허드 방지 + 다중 세션 보호
├── Brief/SendUserMessage — 자율 모드 사용자 커뮤니케이션
│   ├── 'normal' vs 'proactive' 상태 라벨링
│   └── 첨부파일 (이미지, 로그, diff)
├── Channel Notifications — MCP 채널 메시지 (Slack, Discord, SMS)
│   ├── notifications/claude/channel 프로토콜
│   └── 채널별 권한 승인/거부 프로토콜
├── GitHub Webhooks — SubscribePRTool PR 이벤트 구독
├── RemoteTrigger — claude.ai 클라우드 원격 에이전트 API
├── Dream/AutoDream — 자율적 기억 통합
└── Daemon Mode — 백그라운드 프로세스 (데몬 수퍼바이저 + 워커)
```

### 2. 피처 플래그 계층구조와 OR-게이트 패턴

`src/shims/bun-bundle.ts`에서 정의된 KAIROS 관련 피처 플래그들:

```typescript
FEATURE_FLAGS = {
  PROACTIVE: envBool('CLAUDE_CODE_PROACTIVE', false),       // 프로액티브 모드 단독
  KAIROS: envBool('CLAUDE_CODE_KAIROS', false),              // 전체 KAIROS (프로액티브 포함)
  KAIROS_BRIEF: envBool('CLAUDE_CODE_KAIROS_BRIEF', false),  // Brief/SendUserMessage 단독
  KAIROS_GITHUB_WEBHOOKS: envBool('CLAUDE_CODE_KAIROS_GITHUB_WEBHOOKS', false),
  AGENT_TRIGGERS: envBool('CLAUDE_CODE_AGENT_TRIGGERS', false), // 크론 스케줄링
  DAEMON: envBool('CLAUDE_CODE_DAEMON', false),               // 데몬 모드
}
// bun-bundle.ts에 미정의지만 코드에서 참조되는 플래그:
//   KAIROS_CHANNELS — MCP 채널 알림
//   KAIROS_DREAM   — Dream 스킬
```

**핵심 OR-게이트 패턴**: 코드베이스 전체에 걸쳐 세 가지 OR-게이트 패턴이 반복된다:

| OR-게이트 | 사용 빈도 | 의미 |
|----------|---------|------|
| `feature('PROACTIVE') \|\| feature('KAIROS')` | ~30회 | 프로액티브 틱 루프, Sleep 도구, 시스템 프롬프트 |
| `feature('KAIROS') \|\| feature('KAIROS_BRIEF')` | ~40회 | SendUserMessage, /brief, UI 레이아웃 |
| `feature('KAIROS') \|\| feature('KAIROS_CHANNELS')` | ~18회 | MCP 채널 알림, 권한 프록시 |

이 패턴의 의미: KAIROS는 상위 집합(superset)이고, 각 하위 피처는 독립 출하(independent shipping)가 가능하다. KAIROS를 켜면 모든 하위 피처가 활성화되지만, `KAIROS_BRIEF`만 켜면 SendUserMessage 도구만 번들에 포함된다. Bun의 컴파일 타임 `feature()` 호출은 데드 코드 제거(DCE)를 보장하므로, 외부 빌드에서 KAIROS 관련 코드가 모두 제거된다.

### 3. Proactive 시스템 프롬프트 — 두 가지 경로

`src/constants/prompts.ts`의 `getSystemPrompt()` 함수는 프로액티브 활성 여부에 따라 완전히 다른 시스템 프롬프트를 생성한다:

```typescript
// prompts.ts:466-489 — 프로액티브 경로
if ((feature('PROACTIVE') || feature('KAIROS')) &&
    proactiveModule?.isProactiveActive()) {
  logForDebugging(`[SystemPrompt] path=simple-proactive`)
  return [
    `\nYou are an autonomous agent. Use the available tools to do useful work.
    ${CYBER_RISK_INSTRUCTION}`,
    getSystemRemindersSection(),
    await loadMemoryPrompt(),
    envInfo,
    getLanguageSection(settings.language),
    getMcpInstructionsSection(mcpClients),
    getScratchpadInstructions(),
    getFunctionResultClearingSection(model),
    SUMMARIZE_TOOL_RESULTS_SECTION,
    getProactiveSection(),        // ← 자율 작업 지시
  ].filter(s => s !== null)
}
```

**일반 모드 vs 프로액티브 모드**:

| 요소 | 일반 모드 | 프로액티브 모드 |
|------|---------|-------------|
| 정체성 | "Claude, Anthropic's AI assistant" | "You are an autonomous agent" |
| 세션 가이드 | 코딩 규칙, 검증, 경고 등 수백 줄 | 없음 |
| 도구 사용 지시 | 상세한 도구별 가이드라인 | 없음 (시스템 프롬프트 간소화) |
| 자율 작업 | 없음 | `getProactiveSection()` — 틱, 수면, 편향 |
| 프롬프트 크기 | 수천 토큰 | 수백 토큰 + 메모리 |

이 설계의 핵심: 자율 에이전트에게 "코드 작성 시 import 순서를 지켜라" 같은 세부 가이드라인은 불필요하다. 대신 메모리(`loadMemoryPrompt()`)에 프로젝트별 맥락을 저장하고, 시스템 프롬프트는 자율 행동의 원칙만 전달한다.

### 4. `getProactiveSection()` 전문 분석 — 자율 에이전트의 헌법

`src/constants/prompts.ts:860-914`에 정의된 이 함수는 KAIROS 자율 에이전트의 행동 원칙을 규정한다:

```typescript
function getProactiveSection(): string | null {
  if (!(feature('PROACTIVE') || feature('KAIROS'))) return null
  if (!proactiveModule?.isProactiveActive()) return null

  return `# Autonomous work
  You are running autonomously. You will receive \`<tick>\` prompts
  that keep you alive between turns — just treat them as
  "you're awake, what now?" ...`
}
```

7개 핵심 지시 섹션:

| 섹션 | 핵심 지시 | 설계 의도 |
|------|---------|---------|
| **Tick 시스템** | `<tick>` 프롬프트 = "당신은 깨어있다, 무엇을 할 것인가?" 시간은 사용자 로컬 시간. 외부 도구 타임스탬프와 혼동 금지 | 자율 각성 루프의 인지적 프레임워크 |
| **Pacing** | `Sleep` 도구로 간격 제어. 할 일 없으면 **반드시** Sleep 호출. "기다리는 중" 메시지 금지 — 토큰 낭비 | API 비용 제어 + 프롬프트 캐시 5분 만료 균형 |
| **First wake-up** | 첫 틱에서 인사 + 작업 방향 요청. 코드베이스 자율 탐색 **금지** | 사용자 의도 없이 비용 발생 방지 |
| **Subsequent wake-ups** | 유용한 작업 탐색. 같은 질문 반복 금지. 할 일 없으면 즉시 Sleep | 반복적 나레이션이 아닌 실질적 행동 편향 |
| **Staying responsive** | 사용자 활발 시 페어링처럼 타이트한 피드백 루프 유지 | 자율 작업과 대화형 응답의 균형 |
| **Bias toward action** | 확인 없이 판단에 따라 행동 — 파일 읽기, 테스트, 커밋 모두 자율적 | "좋은 동료"의 행동 모델 |
| **Terminal focus** | `terminalFocus` 필드로 자율성 조절: Unfocused=자율 극대화, Focused=협력적 | 상황 인식 기반 행동 적응 |

### 5. Tick 기반 각성 시스템 — 자율 루프의 심장

#### TICK_TAG 정의

```typescript
// src/constants/xml.ts:25
export const TICK_TAG = 'tick'
```

#### 두 경로의 Tick 주입

**경로 1: REPL (인터랙티브 모드)** — `src/screens/REPL.tsx`

```typescript
// REPL.tsx:687 — 프로액티브 상태를 React 상태로 추적
const proactiveActive = React.useSyncExternalStore(
  proactiveModule?.subscribeToProactiveChanges ?? PROACTIVE_NO_OP_SUBSCRIBE,
  proactiveModule?.isProactiveActive ?? PROACTIVE_FALSE
);

// REPL.tsx:696 — 프로액티브 상태 변경 시 도구 목록 재계산 (SleepTool 포함/제외)
const localTools = useMemo(
  () => getTools(toolPermissionContext),
  [toolPermissionContext, proactiveActive, isBriefOnly]
);
```

REPL의 `useProactive` 훅(`src/proactive/useProactive.js` — 소스에 미포함)이 유휴 상태를 감지하여 틱 메시지를 주입한다. 일시정지/재개 메커니즘:

```
사용자 Esc → pauseProactive() → 틱 중단 (REPL.tsx:2115-2117)
사용자 입력 → resumeProactive() → 틱 재개 (REPL.tsx:3154-3156)
API 에러 → setContextBlocked(true) → 틱 차단 (REPL.tsx:2634-2636)
성공 응답 → setContextBlocked(false) → 틱 재개 (REPL.tsx:2637-2639)
컴팩션 완료 → setContextBlocked(false) → 틱 재개 (REPL.tsx:2604-2607)
```

**경로 2: CLI (헤드리스/SDK 모드)** — `src/cli/print.ts`

```typescript
// print.ts:1845 — 프로액티브 틱 스케줄링
const tickContent = `<${TICK_TAG}>${new Date().toLocaleTimeString()}</${TICK_TAG}>`
enqueue({
  mode: 'prompt' as const,
  value: tickContent,
  uuid: randomUUID(),
  priority: 'later',
  isMeta: true,        // UI에서 숨김, 메타 메시지로 표시
})
void run()

// print.ts:2475-2485 — 쿼리 완료 후, 큐 비어있으면 다음 틱 주입
if ((feature('PROACTIVE') || feature('KAIROS')) &&
    proactiveModule?.isProactiveActive() &&
    !proactiveModule.isProactivePaused()) {
  if (peek(isMainThread) === undefined && !inputClosed) {
    scheduleProactiveTick!()  // setTimeout(0)으로 다음 이벤트 루프에 틱 주입
    return
  }
}
```

#### 틱 주입 → 모델 응답 → Sleep → 틱 주입의 전체 흐름

```
유휴 → scheduleProactiveTick()
  └── setTimeout(0)
       └── <tick>3:45:22 PM</tick> 메시지 생성
            └── enqueue({isMeta: true, priority: 'later'})
                 └── run() → 쿼리 루프 진입
                      └── 모델 응답
                           ├── 유용한 작업 있음 → 도구 실행 → 결과 반환 → 다시 유휴
                           └── 할 일 없음 → Sleep(duration) 호출
                                └── 대기 후 → 유휴 → 다시 scheduleProactiveTick()
```

### 6. Sleep 도구 — 자율 행동 속도 제어기

```typescript
// src/tools/SleepTool/prompt.ts
export const SLEEP_TOOL_NAME = 'Sleep'
export const SLEEP_TOOL_PROMPT = `Wait for a specified duration.
The user can interrupt the sleep at any time.
...
Prefer this over \`Bash(sleep ...)\` — it doesn't hold a shell process.
Each wake-up costs an API call, but the prompt cache expires after
5 minutes of inactivity — balance accordingly.`
```

도구 등록 (`src/tools.ts`):

```typescript
const SleepTool =
  feature('PROACTIVE') || feature('KAIROS')
    ? require('./tools/SleepTool/SleepTool.js').SleepTool
    : null
```

핵심 설계 결정:

- **프로액티브 전용**: `feature('PROACTIVE') || feature('KAIROS')` 빌드 게이트 뒤 위치 — 일반 모드에서는 번들에 포함되지 않음
- **비용 인식 프레임워크**: 시스템 프롬프트가 "각 각성은 API 호출" + "캐시는 5분 만료"를 명시 → 모델이 자체적으로 최적 수면 시간 결정
- **셸 프로세스 비점유**: `Bash(sleep N)` 대비 셸을 점유하지 않아 병행 도구 실행 가능
- **시스템 프롬프트 강제**: "할 일 없으면 **반드시** Sleep 호출. '기다리는 중' 상태 메시지만 출력은 토큰 낭비"

### 7. Terminal Focus 감지 — DECSET 1004 프로토콜 활용

```typescript
// src/ink/terminal-focus-state.ts
export type TerminalFocusState = 'focused' | 'blurred' | 'unknown'

let focusState: TerminalFocusState = 'unknown'

export function setTerminalFocused(v: boolean): void {
  focusState = v ? 'focused' : 'blurred'
  for (const cb of subscribers) cb()  // useSyncExternalStore 구독자 알림
}

export function getTerminalFocused(): boolean {
  return focusState !== 'blurred'  // 'unknown'은 'focused'로 취급
}
```

**DECSET 1004**: 터미널이 포커스 획득 시 `\x1b[I`, 상실 시 `\x1b[O` 이스케이프 시퀀스를 전송. `TerminalFocusEvent` 클래스(`src/ink/events/terminal-focus-event.ts`)가 이를 처리.

**시스템 프롬프트에서의 활용** (`REPL.tsx:2776-2778`):

```typescript
// 프로액티브 활성 + 터미널 언포커스 시에만 사용자 컨텍스트에 주입
...((feature('PROACTIVE') || feature('KAIROS')) &&
  proactiveModule?.isProactiveActive() &&
  !terminalFocusRef.current ? {
    terminalFocus: 'The terminal is unfocused — the user is not actively watching.'
  } : {})
```

이 설계의 의미: 사용자가 터미널을 보고 있으면 `terminalFocus` 필드 자체가 생략되고, 모델은 기본 행동(협력적)을 따른다. 터미널이 언포커스일 때만 명시적 신호를 주입하여 자율 행동을 극대화한다. 시스템 프롬프트의 **Terminal focus** 섹션이 이 신호의 해석 가이드를 제공:

- **Unfocused**: 사용자 부재 → 자율 행동 극대화 (결정, 탐색, 커밋, 푸시). 진정으로 되돌릴 수 없는/고위험 작업에서만 멈춤
- **Focused**: 사용자 관찰 중 → 더 협력적 (선택지 제시, 대규모 변경 전 질문, 간결한 출력)

### 8. `buildEffectiveSystemPrompt()` — KAIROS 시 에이전트 프롬프트 병합 전략

`src/utils/systemPrompt.ts`에서 KAIROS와 에이전트 정의의 상호작용이 결정된다:

```typescript
// systemPrompt.ts:99-113
// 프로액티브 모드에서는 에이전트 지시가 기본 프롬프트를 대체하지 않고 추가됨
if (agentSystemPrompt &&
    (feature('PROACTIVE') || feature('KAIROS')) &&
    isProactiveActive_SAFE_TO_CALL_ANYWHERE()) {
  return asSystemPrompt([
    ...defaultSystemPrompt,   // 자율 에이전트 기본 프롬프트
    `\n# Custom Agent Instructions\n${agentSystemPrompt}`,  // 에이전트 도메인 지시 추가
    ...(appendSystemPrompt ? [appendSystemPrompt] : []),
  ])
}
```

**일반 모드**: 에이전트 프롬프트가 기본 프롬프트를 **대체**(replace)
**KAIROS 모드**: 에이전트 프롬프트가 기본 프롬프트에 **추가**(append) — "teammates와 같은 패턴"

이 설계의 근거: 프로액티브 모드의 기본 프롬프트는 이미 간소화되어 있고(자율 에이전트 정체성 + 메모리 + 환경 + 프로액티브 섹션), 에이전트는 도메인별 행동을 이 위에 쌓는다.

### 9. Agent Triggers — 크론 스케줄링 시스템

#### 아키텍처

```
크론 스케줄링 시스템 (feature('AGENT_TRIGGERS'))
├── CronCreateTool — 태스크 생성 (크론식 + 프롬프트 + durable/recurring)
├── CronDeleteTool — 태스크 삭제
├── CronListTool — 태스크 목록
├── /loop 스킬 — 사용자 친화 반복 인터페이스
├── cronScheduler.ts — 코어 스케줄러
│   ├── 1초 check() 타이머 — `CHECK_INTERVAL_MS = 1000`
│   ├── chokidar 파일 감시 — `FILE_STABILITY_MS = 300`
│   ├── 스케줄러 락 — `LOCK_PROBE_INTERVAL_MS = 5000`
│   └── 지터 설정 — GrowthBook `tengu_kairos_cron_config`
├── cronTasks.ts — .claude/scheduled_tasks.json 관리
├── cronTasksLock.ts — PID 기반 프로세스 락
└── useScheduledTasks.ts — REPL React 래퍼
```

#### 크론 스케줄러 생명 주기 — `cronScheduler.ts`

```
start()
  ├── dir 제공 시 (데몬): 즉시 enable()
  ├── assistantMode 또는 기존 태스크: 자동 enable
  └── 없으면: 1초 폴링 (CronCreate가 setScheduledTasksEnabled(true) 설정 대기)

enable()
  ├── chokidar 동적 임포트
  ├── tryAcquireSchedulerLock() — 프로젝트당 1 오너
  │   └── 비오너: 5초마다 락 탈취 시도 (오너 크래시 감지)
  ├── load(initial=true) — 파일 태스크 로드 + 누락 1회 태스크 표면화
  ├── chokidar 파일 감시 시작 (add/change/unlink)
  └── 1초 check() 타이머 시작 (.unref() — 프로세스 유지하지 않음)

check() — 매 초 실행
  ├── isKilled?() → 런타임 킬스위치 (tengu_kairos_cron → false)
  ├── isLoading?() → 쿼리 진행 중이면 건너뜀 (assistantMode 제외)
  │
  ├── 파일 태스크 (isOwner일 때만):
  │   ├── 최초 발견 → nextFireAt 앵커링 (lastFiredAt 또는 createdAt 기준)
  │   ├── now >= nextFireAt → 발화!
  │   │   ├── 반복 + 미만료: 지터 적용 후 다음 시간 계산
  │   │   ├── 반복 + 만료 (7일): 마지막 발화 후 삭제
  │   │   └── 1회: inFlight 가드 후 비동기 삭제
  │   └── 일괄 lastFiredAt 기록 (N fires = 1 write)
  │
  └── 세션 태스크 (dir 미지정 시):
      └── 매 틱 bootstrap state에서 직접 읽기 (락 불필요)
```

#### 듀얼 스토리지 전략

```
파일 기반 (durable: true):
  └── .claude/scheduled_tasks.json
  └── 프로세스 재시작 후에도 유지
  └── chokidar 파일 감시로 실시간 변경 감지
  └── 스케줄러 락으로 다중 세션 이중 발화 방지
  └── isDurableCronEnabled() GrowthBook 킬스위치

세션 기반 (durable: false, 기본값):
  └── bootstrap/state.ts의 sessionCronTasks 배열
  └── 프로세스 종료 시 소멸
  └── 락 불필요 (프로세스 전용)
  └── 팀메이트 크론은 항상 세션 전용 (agentId 기반 라우팅)
```

#### 지터 설정 — 썬더링 허드 방지

```typescript
DEFAULT_CRON_JITTER_CONFIG = {
  recurringFrac: 0.1,           // 간격의 10% 전방 지연
  recurringCapMs: 15 * 60_000,  // 최대 15분
  oneShotMaxMs: 90_000,         // 1회 태스크: :00/:30 시 최대 90초 조기 발화
  oneShotFloorMs: 0,
  oneShotMinuteMod: 30,         // :00, :30에만 지터 적용
  recurringMaxAgeMs: 7 * 24 * 60 * 60_000,  // 7일 자동 만료
}
```

시스템 프롬프트(`buildCronCreatePrompt`)에서도 모델에게 :00과 :30 회피를 지시:

```
"every morning around 9" → "57 8 * * *" (not "0 9 * * *")
"hourly" → "7 * * * *" (not "0 * * * *")
Only use minute 0 or 30 when the user names that exact time
```

**이중 방어**: 사용자 지정 시간의 분산(모델 수준) + 남은 경우의 지터(스케줄러 수준).

#### /loop 스킬 — `src/skills/bundled/loop.ts`

```
/loop [interval] <prompt>

파싱 우선순위:
  1. 선두 토큰 매칭: /loop 5m /babysit-prs → 간격 5m
  2. 후미 "every" 절: /loop check deploy every 20m → 간격 20m
  3. 기본값: 10m

동작:
  1. CronCreate 호출 (recurring: true)
  2. 확인 메시지 (크론식, 7일 만료, CronDelete ID)
  3. **즉시 첫 실행** — 크론 첫 발화를 기다리지 않음
```

`isEnabled: isKairosCronEnabled` — /loop는 AGENT_TRIGGERS 빌드 게이트 + tengu_kairos_cron 런타임 게이트.

### 10. KAIROS_BRIEF vs 전체 KAIROS — 독립 출하 경계

#### KAIROS_BRIEF 범위 (독립 출하 가능)

```
feature('KAIROS') || feature('KAIROS_BRIEF'):
  ├── SendUserMessage 도구 (BriefTool)
  ├── /brief 토글 명령어
  ├── getBriefSection() 시스템 프롬프트 (BRIEF_PROACTIVE_SECTION)
  ├── isBriefEntitled() — GrowthBook tengu_kairos_brief 게이트
  ├── isBriefEnabled() — 활성화 조건 (kairosActive || userMsgOptIn)
  ├── isBriefOnly UI 레이아웃 전환
  ├── 키바인딩 (ctrl+b 등)
  └── defaultView: 'chat' 설정 지원
```

#### `isBriefEntitled()` vs `isBriefEnabled()` — 이중 게이트

```typescript
// BriefTool.ts:88-100
function isBriefEntitled(): boolean {
  // 빌드 게이트 + (kairosActive || 환경변수 || GrowthBook)
  return feature('KAIROS') || feature('KAIROS_BRIEF')
    ? getKairosActive() ||
        isEnvTruthy(process.env.CLAUDE_CODE_BRIEF) ||
        getFeatureValue_CACHED_WITH_REFRESH('tengu_kairos_brief', false, 5분)
    : false
}

// BriefTool.ts:126-134
function isBriefEnabled(): boolean {
  // Entitled + (kairosActive || userMsgOptIn)
  return feature('KAIROS') || feature('KAIROS_BRIEF')
    ? (getKairosActive() || getUserMsgOptIn()) && isBriefEntitled()
    : false
}
```

**`isBriefEntitled()`**: 사용자가 Brief를 사용할 **권한**이 있는가? (GrowthBook 게이트)
**`isBriefEnabled()`**: 현재 세션에서 Brief가 **활성**인가? (권한 + 옵트인)

`kairosActive`(어시스턴트 모드)는 옵트인을 우회한다 — 시스템 프롬프트가 이미 "반드시 SendUserMessage 사용"을 하드코딩하기 때문이다.

#### BRIEF_PROACTIVE_SECTION — 사용자 통신 가이드라인

```typescript
// BriefTool/prompt.ts:12-22
export const BRIEF_PROACTIVE_SECTION = `## Talking to the user

SendUserMessage is where your replies go. Text outside it is visible
if the user expands the detail view, but most won't — assume unread.

The failure mode: the real answer lives in plain text while
SendUserMessage just says "done!" — they see "done!" and miss everything.

So: every time the user says something, the reply they actually read
comes through SendUserMessage. Even for "hi". Even for "thanks".

If you can answer right away, send the answer.
If you need to go look — ack first ("On it — checking the test output"),
then work, then send the result.
...`
```

이 섹션은 두 곳에서 주입된다:
1. `getProactiveSection()` 내부 — 프로액티브 활성 + Brief 활성 시 인라인 추가
2. `getBriefSection()` — 프로액티브 비활성 + Brief 활성 시 독립 섹션으로 추가 (중복 방지 로직 포함)

### 11. Channel Notifications — MCP 기반 메시지 채널

`src/services/mcp/channelNotification.ts`는 외부 메시징 플랫폼(Slack, Discord, SMS 등)을 Claude의 대화에 연결한다:

```
MCP 채널 아키텍처:
  MCP 서버 (채널 제공자)
    ├── capabilities.experimental['claude/channel']: {} — 선언
    ├── 아웃바운드: send_message 등 표준 MCP 도구
    └── 인바운드: notifications/claude/channel → CC가 수신

  CC (Claude Code)
    ├── gateChannelServer() — 다단계 게이트
    │   ├── capability 확인 → disabled 확인 → auth 확인 (OAuth 필수)
    │   ├── policy 확인 (Teams/Enterprise 옵트인)
    │   ├── session --channels 확인
    │   ├── marketplace 검증 (plugin:slack@anthropic 등)
    │   └── allowlist 확인 (org 또는 GrowthBook ledger)
    ├── wrapChannelMessage() → <channel source="server">content</channel>
    └── SleepTool이 hasCommandsInQueue() 폴링 → 1초 내 각성
```

**채널 권한 프로토콜**: 도구 사용 승인/거부를 채널을 통해 원격으로 처리할 수 있다:

```typescript
// 아웃바운드: CC → 채널 서버 — 권한 요청 전파
CHANNEL_PERMISSION_REQUEST_METHOD = 'notifications/claude/channel/permission_request'
type: { request_id, tool_name, description, input_preview }

// 인바운드: 채널 서버 → CC — 권한 응답
CHANNEL_PERMISSION_METHOD = 'notifications/claude/channel/permission'
type: { request_id, behavior: 'allow' | 'deny' }
```

### 12. GitHub Webhooks — `KAIROS_GITHUB_WEBHOOKS`

```typescript
// src/tools.ts:50-52
const SubscribePRTool = feature('KAIROS_GITHUB_WEBHOOKS')
  ? require('./tools/SubscribePRTool/SubscribePRTool.js').SubscribePRTool
  : null
```

```
GitHub Webhook 파이프라인:
  1. SubscribePRTool — PR 활동 구독/해지
  2. <github-webhook-activity> 태그로 수신 메시지 래핑
  3. sanitizeInboundWebhookContent() — 콘텐츠 정제 (useReplBridge.tsx:193)
  4. UserGitHubWebhookMessage — 전용 메시지 렌더러 (UserTextMessage.tsx:93-94)
```

### 13. RemoteTrigger — 원격 에이전트 API

```typescript
// src/tools/RemoteTriggerTool/prompt.ts
// claude.ai remote-trigger API. OAuth 토큰 자동 주입.
// Actions: list, get, create, update, run
// Endpoint: /v1/code/triggers
// Beta header: 'ccr-triggers-2026-01-30'
```

`/schedule` 스킬(`src/skills/bundled/scheduleRemoteAgents.ts`)이 이 도구를 래핑하여 워크플로우를 안내한다:

- **로컬 /loop vs 원격 /schedule 차이**: 로컬 크론은 로컬 시간 + 1분 최소 간격. 원격 트리거는 UTC + 1시간 최소 간격. 로컬은 세션 내 실행, 원격은 Anthropic CCR 인프라에서 격리 실행.
- MCP 커넥터 연결, GitHub 앱 액세스 확인, 환경 자동 생성 등 전체 셋업 워크플로우 포함.

### 14. AutoDream vs KAIROS Dream — 기억 통합의 두 경로

```typescript
// src/services/autoDream/autoDream.ts:95-100
function isGateOpen(): boolean {
  if (getKairosActive()) return false  // KAIROS 모드에서는 disk-skill dream 사용
  if (getIsRemoteMode()) return false
  if (!isAutoMemoryEnabled()) return false
  return isAutoDreamEnabled()
}
```

| | AutoDream | KAIROS Dream |
|--|-----------|-------------|
| **활성 조건** | KAIROS 비활성 + 자동 메모리 활성 | KAIROS 활성 시 |
| **트리거** | stopHook에서 시간+세션 게이트 (24시간 + 5세션) | scheduled_tasks.json의 permanent 태스크 또는 수동 /dream |
| **실행** | Forked 서브에이전트 (읽기 전용 Bash) | (추정) 같은 consolidationPrompt.ts 사용 |
| **스캔 스로틀** | 10분 (`SESSION_SCAN_INTERVAL_MS`) | 크론 스케줄러의 지터 |
| **락** | 프로젝트별 consolidation 락 | 크론 스케줄러 락 |

두 경로 모두 `buildConsolidationPrompt()`를 공유: Orient → Gather recent signal → Consolidate → Prune and index.

### 15. 데몬 모드 — 백그라운드 에이전트 수퍼바이저

```typescript
// src/entrypoints/cli.tsx:100-106
if (feature('DAEMON') && args[0] === '--daemon-worker') {
  const { runDaemonWorker } = await import('../daemon/workerRegistry.js')
  await runDaemonWorker(args[1])
  return
}

// cli.tsx:165-179
if (feature('DAEMON') && args[0] === 'daemon') {
  const { daemonMain } = await import('../daemon/main.js')
  await daemonMain(args.slice(1))
  return
}
```

크론 스케줄러는 데몬을 명시적으로 지원하는 옵션을 제공:

```typescript
// cronScheduler.ts 옵션
{
  dir?: string           // bootstrap state 미접촉 — 프로젝트 디렉토리 직접 지정
  lockIdentity?: string  // 세션 ID 대신 안정적 프로세스 UUID
  filter?: (t: CronTask) => boolean  // 데몬: t => t.permanent
  onFireTask?: (task: CronTask) => void  // 전체 태스크 메타데이터 수신
  onMissed?: (tasks: CronTask[]) => void  // 누락 태스크 별도 라우팅
  getNextFireTime(): number | null  // 유휴 → 서브프로세스 해체 결정
}
```

### 16. 어시스턴트 모드 활성화 흐름

```
main.tsx
  ├── feature('KAIROS') 체크
  │   └── kairosGate.isAssistantMode() — 게이트 확인
  │       └── assistantModule 동적 로드
  │
  ├── --assistant 플래그 시:
  │   ├── assistantModule.markAssistantForced() — 자격 재확인 건너뜀
  │   ├── setKairosActive(true)
  │   ├── opts.brief = true — SendUserMessage 자동 활성
  │   └── initializeAssistantTeam() — 인프로세스 팀 초기화
  │
  └── REPL.tsx
        ├── proactiveActive = useSyncExternalStore(...)
        ├── useProactive({...}) — 틱 루프 시작
        ├── useScheduledTasks({assistantMode: store.getState().kairosEnabled})
        │   └── assistantMode = true → isLoading 게이트 우회 + 자동 enable
        ├── 쿼리 컨텍스트에 terminalFocus 주입
        └── buildEffectiveSystemPrompt() — 에이전트 프롬프트 추가(대체 아님)
```

### 17. 누락 태스크 처리 및 보안

```typescript
// cronScheduler.ts:542-565
function buildMissedTaskNotification(missed: CronTask[]): string {
  // 가이드:
  // "Do NOT execute these prompts yet. First use the AskUserQuestion
  //  tool to ask whether to run each one now. Only execute if the user confirms."
  //
  // 프롬프트 본문은 코드 펜스로 래핑:
  // - 가장 긴 백틱 연속+1 길이의 펜스 사용
  // - 프롬프트 인젝션 방지 (프롬프트 내 ``` 포함 시에도 안전)
}
```

### 18. isKairosCronEnabled() — 통합 게이트 패턴

```typescript
// src/tools/ScheduleCronTool/prompt.ts:36-45
export function isKairosCronEnabled(): boolean {
  return feature('AGENT_TRIGGERS')
    ? !isEnvTruthy(process.env.CLAUDE_CODE_DISABLE_CRON) &&
        getFeatureValue_CACHED_WITH_REFRESH(
          'tengu_kairos_cron',
          true,              // 기본값 true — /loop는 GA
          KAIROS_CRON_REFRESH_MS,  // 5분 리프레시
        )
    : false
}
```

**3단계 게이트**:
1. **빌드 시간**: `feature('AGENT_TRIGGERS')` → DCE로 외부 빌드에서 제거
2. **환경 변수**: `CLAUDE_CODE_DISABLE_CRON` → 로컬 오버라이드 (최우선)
3. **런타임**: `tengu_kairos_cron` GrowthBook → 함대 킬스위치 (5분 리프레시)

**기본값 true의 근거**: /loop는 GA(General Availability). GrowthBook이 비활성인 환경(Bedrock/Vertex/Foundry, DISABLE_TELEMETRY)에서도 동작해야 하므로 `false` 기본값은 GH #31759를 발생시킨다. GB 게이트는 순수 킬스위치로만 기능한다.

**킬스위치 전파**: `isKilled` 콜백이 `() => !isKairosCronEnabled()`로 주입되어, GB 게이트를 끄면 이미 실행 중인 스케줄러도 매 1초 틱에서 중단된다.

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `kairos_system` | KAIROS System | future | autonomy |
| `proactive_mode` | Proactive Mode | future | autonomy |
| `tick_system` | Tick Awakening Loop | future | autonomy |
| `sleep_tool` | Sleep Tool | future | autonomy |
| `terminal_focus` | Terminal Focus Detection | engine | awareness |
| `cron_scheduler` | Cron Scheduler | engine | scheduling |
| `cron_tasks` | Cron Tasks Storage | engine | scheduling |
| `loop_skill` | /loop Skill | future | scheduling |
| `schedule_skill` | /schedule Remote Agents | future | scheduling |
| `remote_trigger` | RemoteTrigger API Tool | future | scheduling |
| `brief_tool` | SendUserMessage Tool | engine | communication |
| `channel_notifications` | MCP Channel Notifications | future | integration |
| `github_webhooks` | GitHub PR Webhooks | future | integration |
| `subscribe_pr` | SubscribePR Tool | future | integration |
| `workload_context` | Workload QoS Tagging | engine | infrastructure |
| `jitter_config` | Cron Jitter Config | engine | load_management |
| `scheduler_lock` | Scheduler Lock | engine | concurrency |
| `daemon_mode` | Daemon Supervisor | future | infrastructure |
| `context_blocking` | Context Blocking | engine | safety |
| `auto_dream` | AutoDream | engine | memory |

### 새 엣지
| Source → Target | Type | Label |
|----------------|------|-------|
| `kairos_system` → `proactive_mode` | enables | 자율 모드 활성화 |
| `proactive_mode` → `tick_system` | drives | 틱 기반 각성 루프 |
| `tick_system` → `sleep_tool` | paced_by | 각성 간격 제어 |
| `proactive_mode` → `terminal_focus` | reads | 자율성 수준 결정 |
| `proactive_mode` → `brief_tool` | requires | 사용자 통신 채널 |
| `proactive_mode` → `context_blocking` | managed_by | API 에러 무한 루프 방지 |
| `kairos_system` → `cron_scheduler` | enables | 크론 스케줄링 |
| `cron_scheduler` → `cron_tasks` | manages | 태스크 CRUD |
| `cron_scheduler` → `scheduler_lock` | requires | 다중 세션 보호 |
| `cron_scheduler` → `jitter_config` | reads | 지터 설정 |
| `cron_scheduler` → `workload_context` | tags | QoS 라벨링 |
| `loop_skill` → `cron_scheduler` | creates_via | CronCreate 호출 |
| `schedule_skill` → `remote_trigger` | manages | 원격 트리거 API |
| `kairos_system` → `github_webhooks` | enables | 웹훅 통합 |
| `github_webhooks` → `subscribe_pr` | provides | PR 이벤트 구독 |
| `kairos_system` → `channel_notifications` | enables | 채널 통합 |
| `kairos_system` → `daemon_mode` | enables | 백그라운드 프로세스 |
| `daemon_mode` → `cron_scheduler` | uses | 데몬용 스케줄러 옵션 |
| `growthbook` → `cron_scheduler` | gates | tengu_kairos_cron |
| `growthbook` → `jitter_config` | configures | tengu_kairos_cron_config |
| `growthbook` → `brief_tool` | gates | tengu_kairos_brief |
| `auto_dream` ← `kairos_system` | replaces | KAIROS 시 dream 스킬 사용 |
| `feature_flags` → `kairos_system` | controls | KAIROS/PROACTIVE/AGENT_TRIGGERS |
| `buildEffectiveSystemPrompt` → `proactive_mode` | adapts | 에이전트 프롬프트 추가(대체 아님) |

# R4-B: Permission/Authorization 시스템 완전 분석

## 파일들
- `src/types/permissions.ts` (442줄) — 모든 퍼미션 타입 정의의 중심 파일
- `src/utils/permissions/permissions.ts` (~1000줄) — 핵심 퍼미션 체크 엔진
- `src/utils/permissions/permissionSetup.ts` (~800줄) — 초기 설정, 모드 전환, 위험 규칙 제거
- `src/utils/permissions/PermissionMode.ts` (142줄) — 모드 정의와 UI 설정
- `src/utils/permissions/yoloClassifier.ts` (~800줄) — AI 기반 Auto Mode 분류기
- `src/utils/permissions/classifierDecision.ts` (99줄) — 안전 도구 허용 목록
- `src/utils/permissions/bashClassifier.ts` (62줄) — Bash 명령어 AI 분류기 (외부 빌드 스텁)
- `src/utils/permissions/permissionsLoader.ts` — 디스크에서 퍼미션 규칙 로딩
- `src/utils/permissions/denialTracking.ts` (46줄) — 연속 거부 추적/안전장치
- `src/utils/permissions/autoModeState.ts` (40줄) — Auto Mode 상태 관리
- `src/utils/permissions/dangerousPatterns.ts` (82줄) — 위험한 명령어 패턴 목록
- `src/utils/permissions/getNextPermissionMode.ts` (102줄) — Shift+Tab 모드 순환
- `src/utils/permissions/bypassPermissionsKillswitch.ts` (157줄) — 원격 킬스위치
- `src/tools/BashTool/bashPermissions.ts` (~500줄) — Bash 전용 퍼미션 로직
- `src/tools/BashTool/modeValidation.ts` (117줄) — 모드별 명령어 검증
- `src/tools/BashTool/shouldUseSandbox.ts` (155줄) — 샌드박스 결정 로직
- `src/hooks/useCanUseTool.tsx` (200줄) — React 훅: 도구 사용 퍼미션 판정
- `src/hooks/toolPermission/handlers/interactiveHandler.ts` (537줄) — 인터랙티브 퍼미션 다이얼로그
- `src/Tool.ts` (150줄+) — Tool 인터페이스와 ToolPermissionContext
- `src/utils/sandbox/sandbox-adapter.ts` — 샌드박스 런타임 어댑터

---

## 핵심 발견

### 1. Permission Mode 아키텍처 — 6계층 모드 시스템

Claude Code는 **6가지 퍼미션 모드**로 동작하며, 각각 도구 실행 시 다른 보안 수준을 적용:

```
┌─────────────────────────────────────────────────────────┐
│              Permission Mode 계층 구조                    │
├──────────────────┬──────────────────────────────────────┤
│ default          │ 모든 도구에 대해 사용자 승인 필요       │
│ acceptEdits      │ 파일 편집 + 안전한 FS 명령 자동 허용    │
│ plan             │ 읽기 전용, 파일 수정 불가               │
│ auto             │ AI 분류기가 자동 판정 (내부 전용)       │
│ bypassPermissions│ 모든 도구 무조건 허용 (YOLO)           │
│ dontAsk          │ 'ask' → 'deny'로 변환 (무인 모드)      │
│ bubble (내부)     │ 상위 에이전트에 퍼미션 위임             │
└──────────────────┴──────────────────────────────────────┘
```

**타입 정의** (`src/types/permissions.ts`):
```typescript
export const EXTERNAL_PERMISSION_MODES = [
  'acceptEdits', 'bypassPermissions', 'default', 'dontAsk', 'plan',
] as const

// 내부 모드는 'auto'와 'bubble' 추가
export type InternalPermissionMode = ExternalPermissionMode | 'auto' | 'bubble'

// 'auto'는 feature('TRANSCRIPT_CLASSIFIER') 게이트 뒤에서만 PERMISSION_MODES에 포함
export const INTERNAL_PERMISSION_MODES = [
  ...EXTERNAL_PERMISSION_MODES,
  ...(feature('TRANSCRIPT_CLASSIFIER') ? (['auto'] as const) : ([] as const)),
] as const
```

**모드 순환** (`getNextPermissionMode.ts`) — Shift+Tab으로 전환:
```
일반 사용자: default → acceptEdits → plan → [bypassPermissions] → [auto] → default
Ant 사용자:  default → bypassPermissions → auto → default  (acceptEdits, plan 생략)
```

### 2. Permission Decision 파이프라인 — 10단계 판정 흐름

도구 실행 시 `hasPermissionsToUseTool()` → `hasPermissionsToUseToolInner()`의 판정 흐름:

```
도구 호출 발생
  │
  ├── Step 1: tool.checkPermissions(input, context)
  │     ├── 도구별 자체 퍼미션 체크 (각 도구가 구현)
  │     ├── allow → 즉시 허용
  │     ├── deny → 즉시 거부
  │     └── ask/passthrough → 다음 단계로
  │
  ├── Step 2: 규칙 기반 판정
  │     ├── 2a. getDenyRuleForTool() — deny 규칙 확인
  │     ├── 2b. toolAlwaysAllowedRule() — 도구 전체 허용 규칙
  │     ├── 2c. getAskRuleForTool() — ask 규칙 확인
  │     └── 2d. 내용 기반 규칙 매칭 (Bash(git commit:*) 등)
  │
  ├── Step 3: 모드 기반 판정
  │     ├── bypassPermissions → 무조건 allow
  │     ├── dontAsk → ask를 deny로 변환
  │     └── auto → AI 분류기 호출 (Step 4)
  │
  ├── Step 4: Auto Mode 분류기 파이프라인 (TRANSCRIPT_CLASSIFIER)
  │     ├── 4a. acceptEdits 빠른 경로 체크
  │     ├── 4b. 안전 도구 허용 목록 체크
  │     ├── 4c. classifyYoloAction() — AI API 호출
  │     └── 4d. 거부 추적 + 안전장치
  │
  └── Step 5: 사용자 프롬프트 또는 자동 거부
        ├── shouldAvoidPermissionPrompts → hooks 실행 후 auto-deny
        └── 인터랙티브 → 사용자 다이얼로그 표시
```

### 3. ToolPermissionContext — 런타임 퍼미션 상태 객체

모든 퍼미션 판정의 기반이 되는 불변 컨텍스트:

```typescript
export type ToolPermissionContext = DeepImmutable<{
  mode: PermissionMode
  additionalWorkingDirectories: Map<string, AdditionalWorkingDirectory>
  alwaysAllowRules: ToolPermissionRulesBySource    // 소스별 허용 규칙
  alwaysDenyRules: ToolPermissionRulesBySource     // 소스별 거부 규칙
  alwaysAskRules: ToolPermissionRulesBySource      // 소스별 확인 규칙
  isBypassPermissionsModeAvailable: boolean
  isAutoModeAvailable?: boolean
  strippedDangerousRules?: ToolPermissionRulesBySource  // auto mode에서 제거된 규칙
  shouldAvoidPermissionPrompts?: boolean    // 백그라운드 에이전트용
  awaitAutomatedChecksBeforeDialog?: boolean // coordinator 워커용
  prePlanMode?: PermissionMode              // plan 모드 진입 전 모드 저장
}>
```

**규칙 소스 우선순위** (`PermissionRuleSource`):
```
userSettings     — ~/.claude/settings.json
projectSettings  — .claude/settings.json (프로젝트)
localSettings    — .claude/settings.local.json
flagSettings     — GrowthBook 원격 플래그
policySettings   — MDM/엔터프라이즈 관리 설정
cliArg           — --allowed-tools, --blocked-tools CLI 인자
command          — /command에서 설정
session          — 세션 내 사용자 승인 (임시)
```

### 4. Permission Rule 시스템 — 3-행위 규칙 매칭

규칙은 `allow`, `deny`, `ask` 세 가지 행위(behavior)로 분류:

```typescript
type PermissionRule = {
  source: PermissionRuleSource      // 어디서 온 규칙인지
  ruleBehavior: PermissionBehavior  // 'allow' | 'deny' | 'ask'
  ruleValue: PermissionRuleValue    // { toolName: string, ruleContent?: string }
}
```

**규칙 매칭 패턴** (Bash 도구 예시):
```
"Bash"              → 모든 Bash 명령 (도구 전체)
"Bash(git commit:*)" → git commit으로 시작하는 명령 (접두사)
"Bash(ls -la)"      → 정확한 명령어 일치
"Bash(npm*)"        → npm으로 시작하는 와일드카드
"mcp__server1"      → MCP 서버 전체 허용
"mcp__server1__*"   → MCP 서버의 모든 도구
```

**매칭 우선순위**:
1. deny 규칙이 최우선 (deny > allow > ask)
2. 내용 기반 규칙이 도구 전체 규칙보다 우선
3. 서브커맨드별 개별 판정 (복합 명령에서)

### 5. AI Classifier 시스템 — 2단계 아키텍처

#### 5-A. Transcript Classifier (Auto Mode / YOLO Classifier)

`feature('TRANSCRIPT_CLASSIFIER')` 게이트 뒤의 핵심 AI 보안 시스템:

```
사용자 도구 요청
  │
  ├── Fast Path 1: acceptEdits 모드 시뮬레이션
  │     └── 파일 편집/FS 명령 → 즉시 허용 (분류기 API 호출 회피)
  │
  ├── Fast Path 2: 안전 도구 허용 목록
  │     └── FileRead, Grep, Glob, TodoWrite 등 → 즉시 허용
  │
  └── Full Path: classifyYoloAction() 호출
        │
        ├── buildYoloSystemPrompt() — 시스템 프롬프트 구성
        │     ├── BASE_PROMPT (auto_mode_system_prompt.txt)
        │     ├── permissions_external.txt 또는 permissions_anthropic.txt
        │     └── 사용자 커스텀 allow/deny/environment 규칙 대치
        │
        ├── buildTranscriptEntries() — 대화 히스토리 구성
        │     ├── 사용자 텍스트 메시지
        │     ├── 어시스턴트 tool_use 블록만 (텍스트 제외 — 주입 방지)
        │     └── 컴팩트 형식으로 직렬화
        │
        ├── CLAUDE.md 프리픽스 메시지 (사용자 의도 컨텍스트)
        │
        └── 2-Stage XML 분류기:
              ├── Stage 1 (fast): max_tokens=64, stop_sequences=['</block>']
              │     ├── <block>no</block> → 즉시 허용 (stage 2 생략)
              │     └── <block>yes</block> → Stage 2로 에스컬레이션
              │
              └── Stage 2 (thinking): chain-of-thought 추론
                    ├── <thinking>...</thinking> 구간
                    ├── <block>yes</block><reason>...</reason> → 차단
                    └── <block>no</block> → 허용 (false positive 감소)
```

**분류기 도구 정의**:
```typescript
const YOLO_CLASSIFIER_TOOL_SCHEMA = {
  name: 'classify_result',
  input_schema: {
    properties: {
      thinking: { type: 'string' },      // 추론 과정
      shouldBlock: { type: 'boolean' },   // 차단 여부
      reason: { type: 'string' },         // 판정 이유
    }
  }
}
```

**안전 도구 허용 목록** (`classifierDecision.ts`):
```typescript
const SAFE_YOLO_ALLOWLISTED_TOOLS = new Set([
  FILE_READ_TOOL_NAME,     // 읽기 전용
  GREP_TOOL_NAME,          // 검색
  GLOB_TOOL_NAME,          // 패턴 검색
  TODO_WRITE_TOOL_NAME,    // 메타데이터
  ASK_USER_QUESTION_TOOL_NAME,  // UI
  ENTER_PLAN_MODE_TOOL_NAME,
  EXIT_PLAN_MODE_TOOL_NAME,
  SLEEP_TOOL_NAME,
  // ... 기타 안전 도구
])
```

#### 5-B. Bash Classifier (BASH_CLASSIFIER)

`feature('BASH_CLASSIFIER')` 게이트의 **명령어 수준 의미 분석** 시스템:

```
Bash 명령어 → parseForSecurityFromAst() (tree-sitter)
  │
  ├── 구문 트리 분석 (AST)
  ├── 서브커맨드 분할 (splitCommand_DEPRECATED)
  ├── 안전 환경변수 제거 (stripSafeWrappers)
  ├── 라퍼 명령 제거 (nice, timeout, stdbuf)
  │
  └── classifyBashCommand(command, cwd, descriptions, behavior, signal)
        ├── prompt: 규칙 기반 매칭 (Bash(prompt: ...)  형식)
        └── AI API 호출로 명령어 의미 분류
```

**비동기 분류기 레이싱** — 인터랙티브 핸들러에서:
```
분류기 체크와 사용자 입력을 동시에 레이싱:
  ├── Race 1: 분류기 허용 → 자동 승인 (3초 체크마크 표시)
  ├── Race 2: 사용자 상호작용 → 분류기 취소
  ├── Race 3: PermissionRequest 훅 응답
  ├── Race 4: Bridge (CCR/claude.ai) 원격 응답
  └── Race 5: 채널 (Telegram/iMessage) 원격 응답
```

### 6. Denial Tracking 안전장치

연속 거부 시 자동 에스컬레이션 메커니즘:

```typescript
export const DENIAL_LIMITS = {
  maxConsecutive: 3,   // 연속 3회 거부 → 사용자 프롬프트로 폴백
  maxTotal: 20,        // 총 20회 거부 → 사용자 프롬프트로 폴백
}
```

**동작 흐름**:
```
분류기 차단 → recordDenial()
  ├── consecutiveDenials >= 3 → handleDenialLimitExceeded()
  │     └── 사용자에게 직접 프롬프트 (분류기 우회)
  ├── totalDenials >= 20 → 같은 처리
  └── 성공 시 → recordSuccess() (연속 카운터 리셋)
```

### 7. Iron Gate — 분류기 장애 대응

```typescript
const CLASSIFIER_FAIL_CLOSED_REFRESH_MS = 30 * 60 * 1000  // 30분

// 분류기 API 장애 시:
if (classifierResult.unavailable) {
  if (tengu_iron_gate_closed === true) {
    // Fail Closed: 거부 + 재시도 안내
    return { behavior: 'deny', message: buildClassifierUnavailableMessage() }
  } else {
    // Fail Open: 일반 퍼미션 처리로 폴백
    return result  // 사용자에게 프롬프트
  }
}

// 트랜스크립트 너무 길면:
if (classifierResult.transcriptTooLong) {
  // headless → AbortError (영구 조건)
  // interactive → 일반 프롬프트로 폴백
}
```

### 8. Dangerous Permission 보호 — Auto Mode 진입 시

Auto Mode 진입 시 위험한 퍼미션을 자동으로 제거하고, 나갈 때 복원:

**위험 패턴 목록** (`dangerousPatterns.ts`):
```typescript
const DANGEROUS_BASH_PATTERNS = [
  'python', 'python3', 'node', 'deno', 'ruby', 'perl',  // 인터프리터
  'npx', 'bunx', 'npm run', 'yarn run',                  // 패키지 실행기
  'bash', 'sh', 'zsh', 'fish', 'eval', 'exec',           // 셸
  'sudo', 'env', 'xargs', 'ssh',                         // 권한 상승/래퍼
  // Ant 전용: 'coo', 'gh', 'curl', 'wget', 'kubectl', 'aws', ...
]
```

**제거/복원 흐름**:
```
Auto Mode 진입 (transitionPermissionMode)
  ├── stripDangerousPermissionsForAutoMode()
  │     ├── Bash(*) → 제거 (모든 명령 허용하면 분류기 무력화)
  │     ├── Bash(python:*) → 제거 (임의 코드 실행)
  │     ├── Agent(*) → 제거 (서브에이전트 위임 공격)
  │     └── strippedDangerousRules에 저장
  │
  └── 나갈 때: restoreDangerousPermissions()
        └── strippedDangerousRules를 다시 alwaysAllowRules에 추가
```

### 9. Sandbox 시스템 — 명령어 격리

**shouldUseSandbox 결정 로직** (`shouldUseSandbox.ts`):
```
SandboxManager.isSandboxingEnabled()? → No → 샌드박스 없이 실행
  │ Yes
  ├── dangerouslyDisableSandbox && areUnsandboxedCommandsAllowed()? → No sandbox
  ├── command가 없으면? → No sandbox
  ├── containsExcludedCommand(command)? → No sandbox
  └── → 샌드박스 내에서 실행
```

**dangerouslyDisableSandbox 매개변수**:
- Bash 도구의 입력 스키마에 포함: `{ command: string, dangerouslyDisableSandbox?: boolean }`
- 사용 시 퍼미션 프롬프트 발생 (sandboxOverride 타입)
- `SandboxManager.areUnsandboxedCommandsAllowed()`가 true여야 작동

**제외 명령어 시스템**:
```typescript
// 1. GrowthBook 원격 설정 (ant 전용)
tengu_sandbox_disabled_commands: {
  commands: string[]    // 비활성화할 명령어
  substrings: string[]  // 비활성화할 부분 문자열
}

// 2. 사용자 설정
settings.sandbox.excludedCommands  // 사용자가 샌드박스에서 제외할 패턴
```

### 10. MDM/엔터프라이즈 퍼미션 오버라이드

**allowManagedPermissionRulesOnly** — 핵심 엔터프라이즈 잠금:
```typescript
export function shouldAllowManagedPermissionRulesOnly(): boolean {
  return getSettingsForSource('policySettings')
    ?.allowManagedPermissionRulesOnly === true
}
```

이 플래그가 활성화되면:
- 사용자/프로젝트/CLI 퍼미션 규칙 **전부 무시**
- `policySettings`의 규칙만 적용
- "Always allow" 옵션이 UI에서 숨겨짐
- 사용자가 영구 규칙 추가 불가

**bypassPermissions 모드 원격 킬스위치**:
```typescript
// GrowthBook 게이트로 원격 비활성화
tengu_disable_bypass_permissions_mode  → bypassPermissions 모드 사용 불가

// 설정으로 비활성화
settings.permissions.disableBypassPermissionsMode === 'disable'

// CCR (원격 환경) 제한
// acceptEdits, plan, default만 허용 — bypassPermissions는 무시
```

### 11. acceptEdits 모드 — 파일 편집 자동 허용

```typescript
const ACCEPT_EDITS_ALLOWED_COMMANDS = [
  'mkdir', 'touch', 'rm', 'rmdir', 'mv', 'cp', 'sed'
] as const
```

acceptEdits 모드에서:
- 파일 편집 도구 (FileEdit, FileWrite, NotebookEdit) → 작업 디렉토리 내 자동 허용
- 위 Bash 명령어 → 자동 허용
- 그 외 Bash 명령 → 여전히 프롬프트 필요

### 12. 인터랙티브 퍼미션 다이얼로그 시스템

사용자에게 승인 프롬프트를 보여주는 핸들러 (`interactiveHandler.ts`):

```
handleInteractivePermission(params, resolve)
  │
  ├── ctx.pushToQueue() — UI에 퍼미션 다이얼로그 추가
  │     ├── onAllow(updatedInput, permissionUpdates, feedback)
  │     │     └── "Yes" → 허용 + 규칙 저장 (영구)
  │     ├── onReject(feedback)
  │     │     └── "No" → 거부 + 피드백
  │     ├── onAbort()
  │     │     └── Ctrl+C → 중단
  │     ├── recheckPermission()
  │     │     └── 규칙 변경 후 재확인 (CCR 모드 전환)
  │     └── onUserInteraction()
  │           └── 사용자 키 입력 → 분류기 자동 승인 취소
  │
  ├── Race 1: Bridge 원격 응답 (CCR/claude.ai)
  │     └── bridgeCallbacks.sendRequest() → onResponse()
  │
  ├── Race 2: 채널 원격 응답 (Telegram/iMessage)
  │     └── channelCallbacks.onResponse()
  │
  ├── Race 3: PermissionRequest 훅 (비동기)
  │     └── ctx.runHooks() → allow/deny
  │
  └── Race 4: Bash 분류기 (비동기, BASH_CLASSIFIER)
        ├── setClassifierChecking() — "Attempting to auto-approve…" 표시
        ├── executeAsyncClassifierCheck()
        │     └── 매칭 + 높은 신뢰도 → 자동 승인
        └── 체크마크 전환 (3초 포커스/1초 비포커스) → 다이얼로그 제거
```

**claim() 패턴** — 원자적 경쟁 조건 방지:
```typescript
const { resolve: resolveOnce, isResolved, claim } = createResolveOnce(resolve)
// 5개 레이서 중 먼저 claim()한 쪽만 resolve() 호출 가능
```

### 13. Permission Update 시스템

사용자가 "Yes, and always allow" 클릭 시:

```typescript
type PermissionUpdate =
  | { type: 'addRules', destination, rules, behavior }      // 규칙 추가
  | { type: 'replaceRules', destination, rules, behavior }   // 규칙 대체
  | { type: 'removeRules', destination, rules, behavior }    // 규칙 제거
  | { type: 'setMode', destination, mode }                   // 모드 변경
  | { type: 'addDirectories', destination, directories }     // 디렉토리 추가
  | { type: 'removeDirectories', destination, directories }  // 디렉토리 제거
```

**저장 대상** (`PermissionUpdateDestination`):
```
userSettings     → ~/.claude/settings.json
projectSettings  → .claude/settings.json
localSettings    → .claude/settings.local.json
session          → 메모리 (재시작 시 사라짐)
cliArg           → CLI 인자 (읽기 전용)
```

### 14. Bash 명령어 보안 체크 — 다층 검증

`bashToolHasPermission()`의 보안 레이어:

```
입력 명령어
  │
  ├── 1. checkPermissionMode() — acceptEdits 모드 FS 명령 허용
  ├── 2. 규칙 매칭 (deny → allow → ask)
  │     ├── stripSafeWrappers() — nice, timeout 등 안전 래퍼 제거
  │     ├── stripAllLeadingEnvVars() — 안전 환경변수 제거
  │     ├── prefixMatch — "git commit:*" 접두사 매칭
  │     ├── exactMatch — 정확한 명령어 매칭
  │     └── wildcardMatch — 와일드카드 패턴 매칭
  │
  ├── 3. bashCommandIsSafeAsync_DEPRECATED() — 레거시 안전성 체크
  ├── 4. checkPathConstraints() — 경로 제한 검사
  ├── 5. checkSedConstraints() — sed 명령어 제한
  ├── 6. checkCommandOperatorPermissions() — 연산자 검증
  │
  └── 7. 복합 명령 분할 (MAX_SUBCOMMANDS = 50)
        ├── 서브커맨드별 개별 판정
        └── 모든 서브커맨드 허용 시에만 전체 허용
```

**안전 환경변수 화이트리스트** (106개):
```typescript
const SAFE_ENV_VARS = new Set([
  'GOEXPERIMENT', 'GOOS', 'GOARCH', 'CGO_ENABLED',  // Go
  'RUST_BACKTRACE', 'RUST_LOG',                      // Rust
  'NODE_ENV',                                         // Node (NODE_OPTIONS 제외!)
  'PYTHONUNBUFFERED',                                 // Python (PYTHONPATH 제외!)
  'TERM', 'NO_COLOR', 'TZ',                          // 터미널
  // ... 기타
])

// 절대 화이트리스트에 추가하면 안 되는 것:
// PATH, LD_PRELOAD, LD_LIBRARY_PATH, DYLD_*    — 실행/라이브러리 로딩
// PYTHONPATH, NODE_PATH, CLASSPATH              — 모듈 로딩
// GOFLAGS, RUSTFLAGS, NODE_OPTIONS              — 코드 실행 플래그
// HOME, TMPDIR, SHELL, BASH_ENV                 — 시스템 동작 변경
```

---

## 아키텍처 다이어그램

### 전체 퍼미션 판정 흐름

```
                          Tool Use 요청
                              │
                    ┌─────────▼──────────┐
                    │ tool.checkPermissions │ ← 도구별 자체 검증
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │ Rule-based matching  │ ← deny > allow > ask
                    │ (8개 소스 통합)       │
                    └─────────┬──────────┘
                              │ ask/passthrough
                    ┌─────────▼──────────┐
                    │ Permission Mode     │
                    │ 기반 판정            │
                    └────┬────┬────┬─────┘
                         │    │    │
          ┌──────────────┘    │    └──────────────┐
          ▼                   ▼                    ▼
    ┌──────────┐      ┌─────────────┐      ┌──────────────┐
    │ bypass   │      │ auto mode   │      │ default/     │
    │ → allow  │      │ classifier  │      │ acceptEdits  │
    └──────────┘      │ pipeline    │      │ → user prompt│
                      └──────┬──────┘      └──────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ Fast Path│  │ Fast Path│  │ AI API   │
        │ acceptEd │  │ allowlist│  │ 2-stage  │
        │ → allow  │  │ → allow  │  │ classify │
        └──────────┘  └──────────┘  └─────┬────┘
                                          │
                                ┌─────────┼─────────┐
                                ▼                    ▼
                          ┌──────────┐         ┌──────────┐
                          │ allow    │         │ block    │
                          │          │         │ + denial │
                          │          │         │ tracking │
                          └──────────┘         └──────────┘
```

---

## 보안 관련 핵심 포인트

1. **분류기 주입 방지**: 트랜스크립트에서 어시스턴트 텍스트 블록 제외 — tool_use 블록만 포함하여 모델이 분류기를 조작하는 것 방지
2. **위험 규칙 자동 제거**: Auto Mode 진입 시 `Bash(*)`, `Bash(python:*)`, `Agent(*)` 등 자동 제거
3. **Denial 안전장치**: 연속 3회 또는 총 20회 거부 시 자동으로 사용자 프롬프트로 폴백
4. **Iron Gate**: 분류기 API 장애 시 fail-closed (거부) 또는 fail-open (사용자 프롬프트) — GrowthBook 원격 제어
5. **엔터프라이즈 잠금**: `allowManagedPermissionRulesOnly`로 사용자 규칙 완전 차단 가능
6. **원격 킬스위치**: `tengu_disable_bypass_permissions_mode`로 bypassPermissions 원격 비활성화
7. **CCR 제한**: 원격 환경에서 bypassPermissions 설정 무시
8. **서브커맨드 보안**: 복합 명령 분할 시 50개 상한 (DoS 방지) + 각 서브커맨드 개별 검증

---

## 설정 예시

### settings.json 퍼미션 구성
```json
{
  "permissions": {
    "defaultMode": "default",
    "disableBypassPermissionsMode": "disable",
    "allow": ["Bash(git commit:*)", "Bash(npm test:*)", "FileEdit"],
    "deny": ["Bash(rm -rf:*)"],
    "ask": ["Bash(docker:*)"]
  },
  "autoMode": {
    "allow": ["Running test suites", "Git operations within the repo"],
    "soft_deny": ["Network requests to external services"],
    "environment": ["macOS development machine", "Node.js project"]
  },
  "sandbox": {
    "excludedCommands": ["docker:*", "bazel:*"]
  }
}
```

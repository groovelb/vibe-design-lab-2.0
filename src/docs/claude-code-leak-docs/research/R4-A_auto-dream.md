# R4-A: AutoDream (자율 기억 통합) 시스템 분석

## 파일들
- `src/services/autoDream/autoDream.ts` (326줄)
- `src/services/autoDream/config.ts` (22줄)
- `src/services/autoDream/consolidationLock.ts` (141줄)
- `src/services/autoDream/consolidationPrompt.ts` (66줄)
- `src/tasks/DreamTask/DreamTask.ts` (159줄)
- `src/query/stopHooks.ts` (475줄) — 통합 지점

---

## 핵심 발견

### 1. AutoDream 아키텍처 — "클로드가 꿈을 꾼다"

AutoDream은 **백그라운드 메모리 통합 시스템**. 사용자가 충분히 많은 세션을 쌓으면, 클로드가 자동으로 "꿈"을 꾸며 과거 대화에서 중요한 정보를 정리하고 메모리 파일에 통합함.

### 2. 실행 파이프라인

```
매 턴 종료 (stopHooks.ts:155)
  └── executeAutoDream(context, appendSystemMessage)
       └── runner(context, appendSystemMessage)  [initAutoDream에서 설정]
            │
            ├── Gate 1: 활성화 체크 (isGateOpen)
            │     ├── KAIROS active? → skip (디스크 스킬 사용)
            │     ├── Remote mode? → skip
            │     ├── AutoMemory enabled? → 필수
            │     └── AutoDream enabled? → 설정 or GrowthBook
            │
            ├── Gate 2: 시간 게이트
            │     └── lastConsolidatedAt로부터 ≥ minHours (기본 24시간)
            │
            ├── Gate 3: 스캔 쓰로틀
            │     └── 마지막 세션 스캔으로부터 ≥ 10분
            │
            ├── Gate 4: 세션 게이트
            │     └── 마지막 통합 이후 세션 수 ≥ minSessions (기본 5)
            │
            ├── Gate 5: 락 획득
            │     └── tryAcquireConsolidationLock() — PID 기반 파일 락
            │
            └── 실행: runForkedAgent({
                   promptMessages: [consolidation prompt],
                   canUseTool: createAutoMemCanUseTool(memoryRoot),
                   querySource: 'auto_dream',
                   forkLabel: 'auto_dream',
                   skipTranscript: true,
                   onMessage: makeDreamProgressWatcher(...)
                 })
```

### 3. 게이트 순서 설계 — "가장 싼 것부터"

```
비용 순서:
  1. 활성화 체크 (메모리 내 불리언) → 0ms
  2. 시간 게이트 (1 stat 호출) → ~1ms
  3. 스캔 쓰로틀 (메모리 내 타임스탬프) → 0ms
  4. 세션 게이트 (디렉토리 스캔) → ~10ms
  5. 락 획득 (stat + read + write + verify) → ~5ms
```

### 4. Consolidation Prompt — 4단계 "꿈" 프로세스

```markdown
# Dream: Memory Consolidation

## Phase 1 — Orient (방향 잡기)
- 메모리 디렉토리 ls
- MEMORY.md 인덱스 읽기
- 기존 토픽 파일 훑기
- logs/ sessions/ 서브디렉토리 확인

## Phase 2 — Gather recent signal (최근 신호 수집)
- 일일 로그 확인 (logs/YYYY/MM/YYYY-MM-DD.md)
- 현실과 불일치하는 기존 기억 찾기
- 트랜스크립트 grep (좁은 검색어로)
  "Don't exhaustively read transcripts"

## Phase 3 — Consolidate (통합)
- 새 정보를 기존 토픽 파일에 병합
- 상대 날짜 → 절대 날짜 변환
- 모순된 사실 삭제/수정

## Phase 4 — Prune and index (정리 및 인덱스)
- MEMORY.md를 MAX_ENTRYPOINT_LINES 이하로 유지
- 항목당 ~150자, 전체 ~25KB 이내
- 부실/잘못된 포인터 제거
- 모순 해결
```

### 5. 도구 제약 — 읽기 전용

```typescript
const extra = `
**Tool constraints for this run:** Bash is restricted to read-only commands
(ls, find, grep, cat, stat, wc, head, tail, and similar).
Anything that writes, redirects to a file, or modifies state will be denied.`
```

- Dream 에이전트는 **메모리 파일만 Edit/Write 가능**
- Bash는 읽기 전용 (ls, grep, cat 등만 허용)
- `createAutoMemCanUseTool(memoryRoot)`로 도구 필터링

### 6. DreamTask — 백그라운드 태스크 UI

```typescript
type DreamTaskState = {
  type: 'dream'
  phase: 'starting' | 'updating'  // Edit/Write 발생 시 전환
  sessionsReviewing: number
  filesTouched: string[]           // Edit/Write 된 경로 추적
  turns: DreamTurn[]               // 최대 30턴 보관
  priorMtime: number               // 롤백용 타임스탬프
}
```

- Shift+Down 다이얼로그에서 "dreaming" 상태로 표시
- 킬 가능: AbortController + 락 롤백

### 7. 통합 락 — 파일 기반 동시성 제어

```
.consolidate-lock 파일:
  - 내용: PID 번호
  - mtime: lastConsolidatedAt 타임스탬프
  - 위치: getAutoMemPath()/.consolidate-lock

락 프로토콜:
  1. stat + read → PID + mtime 확인
  2. 1시간 이내 + PID 살아있음 → 차단
  3. 죽은 PID 또는 부재 → 탈취
  4. write(PID) → re-read → PID 일치 확인 (경쟁 방지)
  5. 실패 시: rollback(priorMtime) → utimes로 되감기
```

### 8. 설정 체계

```typescript
// config.ts — 2단계 오버라이드
function isAutoDreamEnabled(): boolean {
  const setting = getInitialSettings().autoDreamEnabled  // 1. 사용자 설정
  if (setting !== undefined) return setting
  const gb = getFeatureValue_CACHED_MAY_BE_STALE(       // 2. GrowthBook
    'tengu_onyx_plover', null
  )
  return gb?.enabled === true
}

// autoDream.ts — 스케줄링 노브
const DEFAULTS = {
  minHours: 24,      // 최소 24시간 간격
  minSessions: 5,    // 최소 5세션 누적
}
// GrowthBook 'tengu_onyx_plover'에서 원격 오버라이드 가능
```

### 9. stopHooks.ts 통합 (L134–157)

```typescript
// --bare 모드가 아닐 때만 실행
if (!isBareMode()) {
  // 프롬프트 제안
  void executePromptSuggestion(stopHookContext)

  // 메모리 추출 (EXTRACT_MEMORIES 플래그)
  if (feature('EXTRACT_MEMORIES') && !agentId && isExtractModeActive()) {
    void extractMemoriesModule.executeExtractMemories(...)
  }

  // AutoDream (메인 스레드만)
  if (!toolUseContext.agentId) {
    void executeAutoDream(stopHookContext, appendSystemMessage)
  }
}
```

**턴 종료 시 3중 백그라운드 작업**:
1. 프롬프트 제안 (PromptSuggestion)
2. 메모리 추출 (ExtractMemories)
3. 자동 꿈 (AutoDream)

### 10. 텔레메트리 이벤트

| 이벤트 | 시점 | 데이터 |
|--------|------|--------|
| `tengu_auto_dream_fired` | 꿈 시작 | hours_since, sessions_since |
| `tengu_auto_dream_completed` | 꿈 완료 | cache_read, cache_created, output, sessions_reviewed |
| `tengu_auto_dream_failed` | 꿈 실패 | (없음) |
| `tengu_auto_dream_toggled` | UI 토글 | enabled |

### 11. KAIROS와의 관계

```typescript
function isGateOpen(): boolean {
  if (getKairosActive()) return false  // KAIROS는 디스크 스킬 dream 사용
  ...
}
```

- KAIROS 활성 시 AutoDream은 비활성 → 대신 `/dream` 스킬 사용
- Dream 스킬은 `skills/bundled/dream.js` — KAIROS || KAIROS_DREAM 플래그 뒤
- 스킬 파일은 유출 소스에 **존재하지 않음** (require-gated)

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `auto_dream` | AutoDream | future | autonomy |
| `dream_prompt` | Dream Consolidation Prompt | future | autonomy |
| `dream_task` | DreamTask UI | engine | tasks |
| `consolidation_lock` | Consolidation Lock | engine | concurrency |
| `extract_memories` | ExtractMemories | engine | memory |
| `stop_hooks` | Stop Hooks Pipeline | engine | lifecycle |
| `prompt_suggestion` | PromptSuggestion | engine | ux |

### 새 엣지
| Source → Target | Type | Label |
|----------------|------|-------|
| `stop_hooks` → `auto_dream` | triggers | 턴 종료 시 실행 |
| `stop_hooks` → `extract_memories` | triggers | 턴 종료 시 실행 |
| `stop_hooks` → `prompt_suggestion` | triggers | 턴 종료 시 실행 |
| `auto_dream` → `dream_prompt` | uses | 통합 프롬프트 생성 |
| `auto_dream` → `consolidation_lock` | requires | 동시성 제어 |
| `auto_dream` → `forked_agent` | spawns | 백그라운드 에이전트 |
| `auto_dream` → `dream_task` | registers | UI 태스크 등록 |
| `growthbook` → `auto_dream` | gates | tengu_onyx_plover |
| `kairos_flag` → `auto_dream` | disables | KAIROS 시 비활성 |
| `auto_dream` → `memdir` | writes | 메모리 파일 통합 |

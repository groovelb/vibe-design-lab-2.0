# R3-C: 데이터/메모리 생명주기 및 컨텍스트 관리 분석

## 분석 대상 파일 (핵심)

| 파일 | 줄 수 | 역할 |
|------|-------|------|
| `src/memdir/memdir.ts` | 507 | 메모리 디렉토리 프롬프트 빌드, MEMORY.md 로딩 |
| `src/memdir/memoryTypes.ts` | 272 | 4-타입 메모리 분류 체계 (user/feedback/project/reference) |
| `src/memdir/paths.ts` | 279 | 자동 메모리 경로 해석, 보안 검증 |
| `src/memdir/findRelevantMemories.ts` | 142 | Sonnet 기반 관련 메모리 선별 (최대 5개) |
| `src/memdir/memoryScan.ts` | 95 | 메모리 파일 스캔, frontmatter 파싱 |
| `src/memdir/memoryAge.ts` | 54 | 메모리 신선도 계산 및 경고 |
| `src/memdir/teamMemPaths.ts` | 293 | 팀 메모리 경로 + 심볼릭 링크 방어 |
| `src/memdir/teamMemPrompts.ts` | 101 | private+team 결합 프롬프트 |
| `src/utils/claudemd.ts` | ~1500 | CLAUDE.md 계층적 로딩, @include 지시어 |
| `src/services/compact/compact.ts` | ~1700 | 전체 컴팩션 (legacy) |
| `src/services/compact/autoCompact.ts` | 352 | 자동 컴팩션 트리거 및 실행 |
| `src/services/compact/microCompact.ts` | 531 | 마이크로 컴팩션 (도구 결과 정리) |
| `src/services/compact/sessionMemoryCompact.ts` | 631 | 세션 메모리 기반 컴팩션 |
| `src/services/compact/prompt.ts` | 375 | 컴팩션 프롬프트 템플릿 |
| `src/services/extractMemories/extractMemories.ts` | 617 | 백그라운드 메모리 추출 에이전트 |
| `src/services/extractMemories/prompts.ts` | 155 | 추출 에이전트 프롬프트 |
| `src/services/SessionMemory/sessionMemory.ts` | ~300 | 세션 메모리 자동 추출 |
| `src/services/SessionMemory/prompts.ts` | ~150 | 세션 메모리 템플릿 및 업데이트 프롬프트 |
| `src/utils/sessionStorage.ts` | ~4500 | 세션 트랜스크립트 영속화 (JSONL) |
| `src/utils/toolResultStorage.ts` | ~100 | 대용량 도구 결과 디스크 영속화 |

---

## 핵심 발견

### 1. 전체 데이터 생명주기

```
사용자 입력
  │
  ├── 1. CLAUDE.md 로딩 (시스템 프롬프트)
  │     └── Managed → User → Project → Local → AutoMem(MEMORY.md) → TeamMem
  │
  ├── 2. 메모리 회상 (findRelevantMemories)
  │     └── Sonnet sideQuery → 최대 5개 topic 파일 선별 → 컨텍스트 주입
  │
  ├── 3. 쿼리 실행 (query loop)
  │     ├── 도구 사용 → 결과 누적 (mutableMessages)
  │     ├── microCompact → 오래된 도구 결과 정리
  │     └── autoCompact → 컨텍스트 한도 도달 시 요약 압축
  │
  ├── 4. 트랜스크립트 기록 (recordTranscript)
  │     └── JSONL 파일로 증분 기록
  │
  ├── 5. 턴 종료 후 백그라운드 작업
  │     ├── extractMemories → 대화에서 기억 추출 → 파일 저장
  │     └── sessionMemory → 세션 노트 업데이트
  │
  └── 6. 다음 세션에서 회상
        ├── MEMORY.md (인덱스) → 시스템 프롬프트에 자동 포함
        └── topic 파일 → findRelevantMemories로 선별 주입
```

---

### 2. CLAUDE.md 로딩 계층 및 우선순위

**파일**: `src/utils/claudemd.ts` (L1-26 주석, L790-989 getMemoryFiles)

로딩 순서 (뒤에 로딩될수록 높은 우선순위):

```
1. Managed  (/etc/claude-code/CLAUDE.md)        ← 엔터프라이즈 전역 정책
   + /etc/claude-code/.claude/rules/*.md

2. User     (~/.claude/CLAUDE.md)                ← 개인 전역 설정
   + ~/.claude/rules/*.md

3. Project  (CLAUDE.md, .claude/CLAUDE.md)       ← 프로젝트별 (git 커밋)
   + .claude/rules/*.md
   [root → CWD 순으로 디렉토리 트리 순회]

4. Local    (CLAUDE.local.md)                    ← 프로젝트별 (gitignore)
   [root → CWD 순으로 디렉토리 트리 순회]

5. AutoMem  (~/.claude/projects/<slug>/memory/MEMORY.md) ← 자동 메모리 인덱스
6. TeamMem  (~/.claude/projects/<slug>/memory/team/MEMORY.md) ← 팀 메모리 인덱스
```

**주요 메커니즘**:
- `@include` 지시어: `@./path`, `@~/path`, `@/absolute/path` 문법으로 외부 파일 포함
- 최대 include 깊이: `MAX_INCLUDE_DEPTH = 5`
- HTML 주석 제거: `<!-- ... -->` 블록 자동 스트립
- frontmatter `paths:` 필드로 특정 파일/글로브에만 적용 (조건부 규칙)
- 최대 파일 크기: `MAX_MEMORY_CHARACTER_COUNT = 40000` (권장)
- `claudeMdExcludes` 설정: User/Project/Local 파일 제외 패턴

**보안 제약**:
- `projectSettings`의 `autoMemoryDirectory`는 무시 (악성 레포가 `~/.ssh`로 메모리 디렉토리 리디렉션 방지)
- `isSettingSourceEnabled` 게이트로 Project/Local/User 설정 소스별 활성화 제어

---

### 3. 메모리 디렉토리 시스템 (memdir)

**파일**: `src/memdir/memdir.ts`, `src/memdir/paths.ts`

#### 3.1 경로 해석 우선순위

```
getAutoMemPath() 해석 순서:
  1. CLAUDE_COWORK_MEMORY_PATH_OVERRIDE 환경변수 (Cowork용 전체 경로 오버라이드)
  2. settings.json의 autoMemoryDirectory (policy/flag/local/user, 보안 필터링)
  3. <memoryBase>/projects/<sanitized-git-root>/memory/
     memoryBase = CLAUDE_CODE_REMOTE_MEMORY_DIR || ~/.claude
```

#### 3.2 메모리 타입 분류 (4-타입 체계)

**파일**: `src/memdir/memoryTypes.ts`

| 타입 | 설명 | scope (팀 모드) |
|------|------|-----------------|
| `user` | 사용자 역할, 목표, 전문성 | always private |
| `feedback` | 작업 방식 교정/확인 지침 | default private, 프로젝트 컨벤션이면 team |
| `project` | 진행 중인 작업, 목표, 버그, 인시던트 | bias toward team |
| `reference` | 외부 시스템 포인터 (Linear, Grafana 등) | usually team |

#### 3.3 메모리 파일 구조

```markdown
---
name: {{메모리 이름}}
description: {{한 줄 설명 -- 향후 관련성 판단에 사용}}
type: {{user, feedback, project, reference}}
---

{{메모리 내용 -- feedback/project는 규칙 → Why → How to apply 구조}}
```

#### 3.4 MEMORY.md 인덱스 제한

**파일**: `src/memdir/memdir.ts` (L34-103)

```typescript
export const MAX_ENTRYPOINT_LINES = 200
export const MAX_ENTRYPOINT_BYTES = 25_000  // ~125 chars/line at 200 lines
```

`truncateEntrypointContent()` 함수가 강제:
1. **줄 수 제한**: 200줄 초과 시 `slice(0, 200)`으로 잘라냄
2. **바이트 제한**: 25KB 초과 시 마지막 줄바꿈 경계에서 절단
3. **경고 추가**: 절단 발생 시 WARNING 메시지 자동 추가
   - `"WARNING: MEMORY.md is {count} lines (limit: 200). Only part of it was loaded."`

인덱스 포맷 가이드:
- 한 줄, ~150자 이하: `- [Title](file.md) -- one-line hook`
- frontmatter 없음
- 내용 직접 작성 금지 (포인터 전용)

#### 3.5 메모리 활성화 조건

```
isAutoMemoryEnabled() 우선순위 체인:
  1. CLAUDE_CODE_DISABLE_AUTO_MEMORY=1  → OFF
  2. CLAUDE_CODE_SIMPLE (--bare)        → OFF
  3. CCR (원격) + no MEMORY_DIR         → OFF
  4. settings.json autoMemoryEnabled    → 값 그대로
  5. 기본값: ON
```

---

### 4. 메모리 회상 파이프라인 (findRelevantMemories)

**파일**: `src/memdir/findRelevantMemories.ts`, `src/memdir/memoryScan.ts`

```
쿼리 입력
  │
  ├── 1. scanMemoryFiles(memoryDir)
  │     ├── readdir(recursive=true) → .md 파일 목록
  │     ├── MEMORY.md 제외
  │     ├── frontmatter 파싱 (상위 30줄만)
  │     ├── mtime 기준 최신순 정렬
  │     └── 최대 200개 파일 (MAX_MEMORY_FILES)
  │
  ├── 2. alreadySurfaced 필터링 (이전 턴에서 이미 표시된 파일 제외)
  │
  ├── 3. selectRelevantMemories (Sonnet sideQuery)
  │     ├── 시스템 프롬프트: SELECT_MEMORIES_SYSTEM_PROMPT
  │     ├── 입력: 쿼리 + 메모리 목록 매니페스트
  │     ├── 최근 사용 도구 리스트 → 해당 도구 참조 문서 제외
  │     ├── JSON schema 출력: { selected_memories: string[] }
  │     └── 최대 5개 선별
  │
  └── 4. 결과: { path, mtimeMs }[] → 메인 모델 컨텍스트에 주입
```

**신선도 시스템** (`memoryAge.ts`):
- 0일: "today" → 경고 없음
- 1일: "yesterday" → 경고 없음
- 2일+: `"{d} days ago"` → 검증 경고 추가
  - `"This memory is {d} days old. Memories are point-in-time observations..."`

---

### 5. 컨텍스트 컴팩션 전략

4개의 독립적 컴팩션 메커니즘이 계층적으로 작동:

#### 5.1 Microcompact (도구 결과 정리)

**파일**: `src/services/compact/microCompact.ts`

3가지 경로:

**A. Time-based Microcompact (시간 기반)**
```
evaluateTimeBasedTrigger():
  조건: 마지막 assistant 메시지 이후 N분 경과 (GrowthBook 설정)
  동작: 오래된 도구 결과 content를 '[Old tool result content cleared]'로 교체
  특징: 로컬 메시지 내용 직접 변경 (캐시 cold 상태이므로)
```

**B. Cached Microcompact (cache_edits API)**
```
feature('CACHED_MICROCOMPACT') && ant-only:
  조건: 등록된 도구 결과가 triggerThreshold 초과
  동작: cache_edits 블록 생성 → API 요청 시 첨부
  특징: 로컬 메시지 변경 없음 (서버 캐시에서만 삭제)
  상태: pendingCacheEdits → pinnedEdits
```

**대상 도구 (COMPACTABLE_TOOLS)**:
```
FileRead, Bash/PowerShell, Grep, Glob, WebSearch, WebFetch, FileEdit, FileWrite
```

#### 5.2 Session Memory Compact (세션 메모리 기반)

**파일**: `src/services/compact/sessionMemoryCompact.ts`

```
trySessionMemoryCompaction():
  조건: tengu_session_memory + tengu_sm_compact 플래그 모두 활성
  동작:
    1. waitForSessionMemoryExtraction() (진행 중인 추출 완료 대기)
    2. getSessionMemoryContent() (세션 노트 파일 읽기)
    3. 빈 템플릿이면 → null (legacy 컴팩션으로 폴백)
    4. calculateMessagesToKeepIndex() → 보존할 메시지 범위 계산
       - minTokens: 10,000
       - minTextBlockMessages: 5
       - maxTokens: 40,000
    5. adjustIndexToPreserveAPIInvariants() → tool_use/tool_result 쌍 보호
    6. 세션 메모리 내용을 요약으로 사용 (LLM 호출 없음!)
```

**핵심 장점**: API 호출 없이 컴팩션 수행 (세션 노트가 이미 요약 역할)

#### 5.3 Legacy Compact (전통 LLM 요약)

**파일**: `src/services/compact/compact.ts`

```
compactConversation():
  1. 이전 compact boundary 이후 메시지만 대상
  2. 이미지 → [image] 텍스트 마커로 교체
  3. 재주입 대상 어태치먼트 제거
  4. Partial compact 지원:
     - 'from': 최근 N개 메시지만 요약 (나머지 유지)
     - 'up_to': 오래된 메시지만 요약 (최근 유지, 캐시 히트 활용)
  5. queryModelWithStreaming() → 요약 생성
  6. 프롬프트: 9-섹션 구조화 요약
     - Primary Request, Key Technical Concepts, Files/Code, Errors/Fixes,
       Problem Solving, All User Messages, Pending Tasks, Current Work, Next Step
  7. <analysis> 스크래치패드 → 제거 후 <summary>만 보존
  8. Prompt-too-long 재시도: 최대 3회, 가장 오래된 API 라운드 그룹 제거
  9. Post-compact cleanup:
     - microcompact 상태 리셋
     - context collapse 리셋
     - getUserContext 캐시 클리어
     - 시스템 프롬프트 섹션 클리어
     - 분류기 승인 클리어
```

#### 5.4 Auto Compact (자동 트리거)

**파일**: `src/services/compact/autoCompact.ts`

```
autoCompactIfNeeded():
  트리거 조건:
    tokenCount >= effectiveContextWindow - 13,000 (AUTOCOMPACT_BUFFER_TOKENS)

  제외 조건:
    - querySource가 'session_memory' 또는 'compact' (순환 방지)
    - REACTIVE_COMPACT 모드 (tengu_cobalt_raccoon) → 사전 억제, API 413만 대응
    - CONTEXT_COLLAPSE 활성 → collapse가 컨텍스트 관리 (90% commit / 95% blocking)
    - MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES = 3 → 서킷 브레이커

  실행 순서:
    1. trySessionMemoryCompaction() (우선 시도, API 호출 없음)
    2. compactConversation() (SM 실패 시 legacy 폴백)
```

**컨텍스트 윈도우 계산**:
```typescript
effectiveContextWindow = contextWindow - min(maxOutputTokens, 20,000)
autoCompactThreshold = effectiveContextWindow - 13,000
warningThreshold = threshold - 20,000
blockingLimit = effectiveContextWindow - 3,000
```

---

### 6. 메모리 추출 파이프라인 (extractMemories)

**파일**: `src/services/extractMemories/extractMemories.ts`

```
initExtractMemories() → executeExtractMemories()
  │
  ├── 진입 조건:
  │   ├── 메인 에이전트만 (subagent 제외)
  │   ├── tengu_passport_quail 플래그 활성
  │   ├── isAutoMemoryEnabled() = true
  │   ├── 원격 모드 아님
  │   └── 턴 간격: tengu_bramble_lintel (기본 1턴마다)
  │
  ├── 상호 배제: hasMemoryWritesSince()
  │   └── 메인 에이전트가 이미 메모리 파일을 작성했으면 → 스킵 + 커서 전진
  │
  ├── 동시성 제어:
  │   ├── inProgress 플래그 → 중복 실행 방지
  │   └── pendingContext → 실행 중 도착한 컨텍스트를 저장, 완료 후 trailing run
  │
  ├── 실행:
  │   ├── scanMemoryFiles() → 기존 메모리 매니페스트 생성
  │   ├── buildExtractAutoOnlyPrompt() / buildExtractCombinedPrompt()
  │   ├── runForkedAgent() → 메인 대화의 perfect fork
  │   │   ├── canUseTool: Read/Grep/Glob + 읽기전용 Bash + 메모리 디렉토리 Write/Edit
  │   │   ├── maxTurns: 5
  │   │   ├── skipTranscript: true (메인 스레드와 경합 방지)
  │   │   └── querySource: 'extract_memories'
  │   └── extractWrittenPaths() → 작성된 파일 목록 추출
  │
  └── 결과 알림: appendSystemMessage(createMemorySavedMessage())
```

**핵심 설계**: 메인 에이전트의 프롬프트 캐시를 공유하는 "perfect fork" 패턴
- 도구 목록 변경 불가 (캐시 키의 일부)
- REPL 모드에서는 REPL을 통해 원시 도구 호출

**추출 프롬프트 핵심 지침** (`prompts.ts`):
- 최근 ~N개 메시지에서만 메모리 추출
- 검증을 위한 코드 탐색 금지 (소스 grep/git 사용 금지)
- 효율적 전략: 턴 1에서 모든 Read 병렬 → 턴 2에서 모든 Write/Edit 병렬
- 중복 확인: 기존 메모리 매니페스트 사전 주입

---

### 7. 세션 메모리 (Session Memory)

**파일**: `src/services/SessionMemory/sessionMemory.ts`, `prompts.ts`

#### 7.1 세션 노트 템플릿

```markdown
# Session Title
# Current State
# Task specification
# Files and Functions
# Workflow
# Errors & Corrections
# Codebase and System Documentation
# Learnings
# Key results
# Worklog
```

각 섹션 제목과 이탤릭 설명은 불변 구조 (Edit 시 수정 금지)

#### 7.2 업데이트 트리거

```
shouldExtractMemory():
  1. 초기화 임계값: 토큰 수가 설정값 이상 (최초 1회)
  2. 업데이트 임계값: 마지막 추출 이후 토큰 성장량 + 도구 호출 수
  3. 메인 에이전트만 (subagent 제외)
```

#### 7.3 실행 메커니즘

- `runForkedAgent()` 사용 (extractMemories와 동일 패턴)
- Edit 도구로 세션 노트 파일 업데이트
- `setLastSummarizedMessageId()` → 컴팩션 시 어디까지 요약됐는지 추적

#### 7.4 제한

```typescript
MAX_SECTION_LENGTH = 2000           // 섹션당 최대 토큰/단어
MAX_TOTAL_SESSION_MEMORY_TOKENS = 12000  // 전체 세션 메모리 토큰
```

---

### 8. 세션 트랜스크립트 영속화

**파일**: `src/utils/sessionStorage.ts`

#### 8.1 저장 위치

```
~/.claude/projects/<sanitized-cwd>/<sessionId>.jsonl     ← 메인 트랜스크립트
~/.claude/projects/<sanitized-cwd>/<sessionId>/subagents/agent-<agentId>.jsonl  ← 서브에이전트
~/.claude/projects/<sanitized-cwd>/<sessionId>/remote-agents/  ← 원격 에이전트 메타데이터
```

#### 8.2 JSONL 엔트리 구조

```typescript
type TranscriptMessage = {
  parentUuid: UUID | null        // 체인 연결 (compact boundary는 null)
  logicalParentUuid?: UUID       // compact boundary의 논리적 부모
  isSidechain: boolean           // 서브에이전트 체인 여부
  promptId?: string              // 사용자 프롬프트 ID
  agentId?: string               // 에이전트 ID
  userType: string               // 사용자 유형
  entrypoint: string             // 진입점
  cwd: string                    // 작업 디렉토리
  sessionId: string              // 세션 ID
  version: string                // 버전
  gitBranch?: string             // git 브랜치
  slug?: string                  // 세션 슬러그
  ...message                     // 원본 메시지 (user/assistant/system/attachment)
}
```

#### 8.3 recordTranscript 메커니즘

```
recordTranscript(messages):
  1. cleanMessagesForLogging() → 로깅용 메시지 정제
  2. getSessionMessages(sessionId) → 이미 기록된 UUID 셋 조회
  3. 중복 필터링: messageSet에 없는 메시지만 newMessages로
  4. insertMessageChain(newMessages):
     - materializeSessionFile() (첫 user/assistant 메시지에서)
     - parentUuid 체인 구축
     - compact boundary는 parentUuid=null (체인 단절)
     - appendEntry() → JSONL 추가
  5. 반환: 마지막 기록된 체인 참여자의 UUID
```

**체인 참여자 규칙**: `progress` 타입만 제외 (user/assistant/attachment/system 모두 참여)

#### 8.4 최대 읽기 크기

```typescript
MAX_TRANSCRIPT_READ_BYTES = 50 * 1024 * 1024  // 50MB (OOM 방지)
```

---

### 9. 도구 결과 저장소 (toolResultStorage)

**파일**: `src/utils/toolResultStorage.ts`

```
대형 도구 결과 처리:
  1. 임계값 판단: getPersistenceThreshold(toolName, declaredMax)
     - GrowthBook 오버라이드 (tengu_satin_quoll): 도구별 커스텀 임계값
     - 기본: min(declaredMaxResultSizeChars, DEFAULT_MAX_RESULT_SIZE_CHARS=50000)
  2. 초과 시: 디스크에 영속화
     - 경로: <projectDir>/<sessionId>/tool-results/<filename>
     - 메시지에는 <persisted-output> 태그 + 프리뷰만 남김
  3. 정리 메시지: '[Old tool result content cleared]' (TOOL_RESULT_CLEARED_MESSAGE)
```

---

### 10. Context Collapse (컨텍스트 붕괴)

**파일**: `src/services/contextCollapse/index.js` (feature-gated)

autoCompact.ts에서 발견된 설계 의도:

```
Context Collapse가 활성화되면:
  - autoCompact 비활성 (shouldAutoCompact → false)
  - 90% 지점: commit-start (컨텍스트 저장 시작)
  - 95% 지점: blocking-spawn (새 에이전트 스폰 차단)
  - Collapse IS the context management system
  - Reactive compact만 413 폴백으로 유지
  - 환경변수 오버라이드: CLAUDE_CONTEXT_COLLAPSE
```

---

### 11. 어시스턴트 모드 (KAIROS) 데일리 로그

**파일**: `src/memdir/memdir.ts` (L327-370)

```
feature('KAIROS') && getKairosActive():
  - MEMORY.md를 라이브 인덱스로 유지하지 않음
  - 대신 일별 로그 파일에 append-only 기록:
    <autoMemPath>/logs/YYYY/MM/YYYY-MM-DD.md
  - 각 엔트리: 타임스탬프 달린 짧은 bullet
  - 별도 야간 프로세스 (/dream 스킬)가 로그를 MEMORY.md + topic 파일로 증류
  - 날짜 변경 시: date_change 어태치먼트로 모델에 알림
```

---

### 12. 팀 메모리 시스템 (TEAMMEM)

**파일**: `src/memdir/teamMemPaths.ts`, `src/memdir/teamMemPrompts.ts`

```
구조:
  private: ~/.claude/projects/<slug>/memory/          ← 개인 메모리
  team:    ~/.claude/projects/<slug>/memory/team/     ← 팀 공유 메모리

활성화 조건: isAutoMemoryEnabled() && tengu_herring_clock

보안:
  - PathTraversalError 클래스로 경로 검증
  - sanitizePathKey(): null byte, URL 인코딩, 유니코드 정규화, 백슬래시 차단
  - validateTeamMemWritePath(): resolve() + realpath() 이중 검증
  - realpathDeepestExisting(): 심볼릭 링크 탈출 방지
  - 댕글링 심볼릭 링크 탐지: lstat()로 구별
```

---

### 13. 저장 안 되어야 할 것들 (What NOT to Save)

```
- 코드 패턴, 컨벤션, 아키텍처, 파일 경로, 프로젝트 구조
  (grep/git/CLAUDE.md로 도출 가능)
- git 히스토리, 최근 변경, who-changed-what
  (git log / git blame이 권위 소스)
- 디버깅 솔루션, 수정 레시피
  (코드에 수정이, 커밋 메시지에 컨텍스트가 있음)
- CLAUDE.md에 이미 문서화된 내용
- 임시 태스크 상세: 진행 중 작업, 임시 상태, 현재 대화 컨텍스트

명시적 저장 요청에도 적용:
  "PR 목록 저장해줘" → "뭐가 놀랍거나 비자명했는지" 물어봐야 함
```

---

### 14. 메모리 신뢰도 관리 (Before Recommending from Memory)

**파일**: `src/memdir/memoryTypes.ts` (L240-256)

```
메모리가 특정 함수/파일/플래그를 언급하면:
  - 파일 경로 → 파일 존재 확인
  - 함수/플래그 → grep으로 검색
  - 사용자가 행동에 옮기려 할 때 → 먼저 검증

"메모리에 X가 있다" ≠ "X가 지금 존재한다"

레포 상태 요약 메모리:
  - 시간에 동결된 스냅샷
  - 최근/현재 상태 질문 → git log / 코드 읽기 우선
```

---

## 데이터 흐름 종합 다이어그램

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          세션 시작                                      │
│  CLAUDE.md 계층 로딩 → 시스템 프롬프트                                   │
│  MEMORY.md (인덱스) → 시스템 프롬프트에 자동 포함                        │
│  세션 메모리 (이전 세션에서 생성) → 컴팩션 시 요약으로 활용               │
└────────────────────┬────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       쿼리 루프 (매 턴)                                 │
│                                                                         │
│  1. findRelevantMemories() ─── Sonnet sideQuery ──→ topic 파일 주입     │
│                                                                         │
│  2. API 호출 (messages + system prompt)                                 │
│     └── microCompact 적용: 오래된 도구 결과 정리                         │
│                                                                         │
│  3. 도구 실행 → 결과 누적                                              │
│     └── 대형 결과 → toolResultStorage (디스크 영속화)                    │
│                                                                         │
│  4. autoCompact 체크                                                   │
│     └── 임계값 초과 시:                                                 │
│         ├── Session Memory Compact (API 호출 없음, 세션 노트 활용)      │
│         └── Legacy Compact (LLM 요약 생성)                              │
│                                                                         │
│  5. recordTranscript() → JSONL 증분 기록                               │
└────────────────────┬────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     턴 종료 후 백그라운드                                │
│                                                                         │
│  extractMemories (forked agent):                                        │
│    대화에서 기억 추출 → ~/.claude/projects/<slug>/memory/ 에 저장         │
│    ├── topic 파일 (user_role.md, feedback_testing.md 등)                │
│    └── MEMORY.md 인덱스 업데이트                                        │
│                                                                         │
│  sessionMemory (forked agent):                                          │
│    세션 노트 파일 업데이트 → ~/.claude/session-memory/                   │
│    └── 구조화된 9-섹션 마크다운                                          │
└────────────────────┬────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       다음 세션                                         │
│                                                                         │
│  MEMORY.md → 자동 로딩 (시스템 프롬프트)                                 │
│  topic 파일 → findRelevantMemories()가 Sonnet으로 선별                   │
│  세션 노트 → 컴팩션 시 요약으로 재활용                                   │
│  트랜스크립트 → --resume 시 JSONL에서 복원                               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 핵심 상수 요약

| 상수 | 값 | 위치 |
|------|-----|------|
| `MAX_ENTRYPOINT_LINES` | 200 | memdir.ts:35 |
| `MAX_ENTRYPOINT_BYTES` | 25,000 | memdir.ts:38 |
| `MAX_MEMORY_FILES` | 200 | memoryScan.ts:21 |
| `MAX_MEMORY_CHARACTER_COUNT` | 40,000 | claudemd.ts:92 |
| `MAX_INCLUDE_DEPTH` | 5 | claudemd.ts:537 |
| `AUTOCOMPACT_BUFFER_TOKENS` | 13,000 | autoCompact.ts:62 |
| `WARNING_THRESHOLD_BUFFER_TOKENS` | 20,000 | autoCompact.ts:63 |
| `MANUAL_COMPACT_BUFFER_TOKENS` | 3,000 | autoCompact.ts:65 |
| `MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES` | 3 | autoCompact.ts:70 |
| `MAX_OUTPUT_TOKENS_FOR_SUMMARY` | 20,000 | autoCompact.ts:29 |
| `SM_minTokens` | 10,000 | sessionMemoryCompact.ts:58 |
| `SM_minTextBlockMessages` | 5 | sessionMemoryCompact.ts:59 |
| `SM_maxTokens` | 40,000 | sessionMemoryCompact.ts:60 |
| `MAX_SECTION_LENGTH` | 2,000 | SessionMemory/prompts.ts:8 |
| `MAX_TOTAL_SESSION_MEMORY_TOKENS` | 12,000 | SessionMemory/prompts.ts:9 |
| `MAX_TRANSCRIPT_READ_BYTES` | 50MB | sessionStorage.ts:229 |
| `DEFAULT_MAX_RESULT_SIZE_CHARS` | 50,000 | toolLimits.ts |
| `extractMemories maxTurns` | 5 | extractMemories.ts:427 |
| `findRelevantMemories 최대 선별` | 5 | findRelevantMemories.ts:21 |

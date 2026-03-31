# 팩트체크 결과 — 소스 코드 대조 + 공식 문서 비교

> 2026-04-01 기준. 프로젝트 데이터 파일의 모든 주요 claim을 유출 소스 코드와 직접 대조.

---

## 1. 핵심 수치 검증 (소스 코드 직접 확인)

### ✅ 정확히 일치 (17개)

| Claim | 프로젝트 값 | 소스 코드 실측 | 파일 |
|-------|-----------|--------------|------|
| QueryEngine 줄 수 | 1,297 | **1,297** | `src/QueryEngine.ts` |
| 시스템 프롬프트 줄 수 | 915 | **915** | `src/constants/prompts.ts` |
| AgentTool.tsx 줄 수 | 1,398 | **1,398** | `src/tools/AgentTool/AgentTool.tsx` |
| 슬래시 커맨드 수 | 87+ | **87** (정확히 87개 디렉토리) | `src/commands/` |
| CronScheduler 줄 수 | 566 | **566** | `src/utils/cronScheduler.ts` |
| findRelevantMemories 줄 수 | 142 | **142** | `src/memdir/findRelevantMemories.ts` |
| 코디네이터 프롬프트 줄 수 | 370 | **370** | `src/coordinator/coordinatorMode.ts` |
| buddy SALT 값 | `'friend-2026-401'` | **`'friend-2026-401'`** | `src/buddy/companion.ts` |
| PRNG 알고리즘 | Mulberry32 | **mulberry32()** | `src/buddy/companion.ts` |
| ASCII 종족 수 | 18 | **18** (sprites.ts import 목록) | `src/buddy/sprites.ts` |
| DECSET 1004 포커스 감지 | 있음 | **있음** (10+ 참조) | `src/ink/` 다수 |
| anti_distillation fake_tools | 있음 | **`anti_distillation: ['fake_tools']`** | `src/services/api/claude.ts` |
| CLAUDE.md 6계층 | Managed→User→Project→Local→AutoMem→TeamMem | **6 타입 확인** | `src/utils/claudemd.ts` |
| 메모리 4타입 | user/feedback/project/reference | **4 타입 확인** | `src/memdir/memoryTypes.ts` |
| 내부 레포 수 | 22 | **22** (44 entries ÷ 2 SSH/HTTPS) | `src/utils/commitAttribution.ts` |
| Shiny 확률 | 0.01 | **`rng() < 0.01`** (1%) | `src/buddy/companion.ts` |
| 종족명 hex 인코딩 | 있음 | **`String.fromCharCode(0x64,0x75,0x63,0x6b)`** | `src/buddy/types.ts` |

### ✅ 보수적이지만 방향 맞음 (3개)

| Claim | 프로젝트 값 | 소스 코드 실측 | 비고 |
|-------|-----------|--------------|------|
| 도구 수 | 40+ | **42** 디렉토리 (40 실제 도구 + shared + testing) | 맞음 |
| 컴파일타임 피처 플래그 | 60+ | **89** unique `feature('...')` | 실제로 훨씬 많음 |
| 텔레메트리 이벤트 | 651+ | **739** unique `logEvent()` 이름 | 실제로 더 많음 |

### ⚠️ 수정 필요 (5개)

| Claim | 프로젝트 값 | 소스 코드 실측 | 수정 방향 |
|-------|-----------|--------------|----------|
| **Linux 샌드박스** | "landlock/Docker" | **bubblewrap (bwrap)** + Docker | `landlock` → `bubblewrap` 로 수정 |
| **KAIROS 참조 파일 수** | 62개 소스 파일 | **70** 파일 (`grep -rl`) | 62 → 70 으로 수정 |
| **내부 레포 수 (reveals.json)** | 21개 | **22개** | 21 → 22 로 수정 |
| ~~권한 모드 수~~ | ~~6-Mode~~ | 공식 문서에 6개 모드 명시 (default/acceptEdits/plan/auto/dontAsk/bypassPermissions) | ✅ **수정 불필요** — 공식 문서 확인으로 6-Mode 정확 |
| **Legendary Shiny 확률** | 0.01% | legendary(1/100) × shiny(1/100) = **0.01%** | ✅ 계산은 맞지만, reveals.json 표현이 모호 |

---

## 2. 공개 vs 미공개 상태 검증

프로젝트가 `visibility` 필드로 분류한 상태와 실제 공식 문서 기준 비교.

### 공식 문서에 이미 존재하는 기능 (visibility 재확인 필요)

| 기능 | 프로젝트 visibility | 공식 문서 상태 | 판정 |
|------|-------------------|--------------|------|
| CLI REPL | public | ✅ 공식 문서화 | 맞음 |
| BashTool, FileRead/Edit/Write | public | ✅ 공식 문서화 | 맞음 |
| AgentTool (서브에이전트) | public | ✅ 공식 문서화 (sub-agents 페이지) | 맞음 |
| MCP Server 연동 | public | ✅ 공식 문서화 | 맞음 |
| CLAUDE.md 메모리 | hidden | ⚠️ **공식 문서화됨** (memory 페이지) | `hidden` → `public` 재고 |
| Permission Prompt | public | ✅ 공식 문서화 | 맞음 |
| Hooks 시스템 | — | ✅ 공식 문서화 (hooks 페이지) | 데이터에 미포함 |
| SDK (Agent SDK) | — | ✅ 공식 문서화 | 데이터에 미포함 |

> **참고**: CLAUDE.md 메모리 시스템은 공식 문서에 상세히 설명되어 있어 `hidden`보다는 `public`이 적절할 수 있음. 다만 6계층 내부 구현 세부사항(Managed, AutoMem, TeamMem)은 문서화되지 않았으므로, "기능은 public, 구현 세부는 hidden"으로 구분 가능.

### 소스에서만 확인 가능한 미공개 기능 (visibility 맞음)

| 기능 | visibility | 공식 문서 존재 여부 | 판정 |
|------|-----------|------------------|------|
| KAIROS 자율 에이전트 | unreleased | ❌ 없음 | ✅ 맞음 |
| PROACTIVE 틱 시스템 | unreleased | ❌ 없음 | ✅ 맞음 |
| DAEMON 백그라운드 모드 | unreleased | ❌ 없음 | ✅ 맞음 |
| AutoDream 꿈 시스템 | unreleased | ❌ 없음 | ✅ 맞음 |
| Coordinator Mode | unreleased | ❌ 없음 | ✅ 맞음 |
| Agent Swarms (Teams) | unreleased | ❌ 없음 | ✅ 맞음 |
| buddy 가상 펫 | unreleased | ❌ 없음 | ✅ 맞음 |
| Anti-Distillation | secret | ❌ 없음 | ✅ 맞음 |
| Undercover Mode | secret | ❌ 없음 | ✅ 맞음 |
| CronScheduler | unreleased | ❌ 없음 | ✅ 맞음 |
| RemoteTriggerTool | unreleased | ❌ 없음 | ✅ 맞음 |
| SleepTool | unreleased | ❌ 없음 | ✅ 맞음 |
| Terminal Focus Detection | unreleased | ❌ 없음 | ✅ 맞음 |

### 경계 사례 (부분 공개)

| 기능 | visibility | 공식 문서 상태 | 비고 |
|------|-----------|--------------|------|
| 컴팩션 시스템 | hidden | 부분적 (`/compact` 커맨드 존재) | 내부 구현(auto/micro/FRC)은 미공개 |
| 샌드박스 | hidden | ✅ 공식 문서화 (security 페이지) | `hidden` → `public` 재고. 단, seatbelt/bwrap 구현 세부는 미공개 |
| MDM 엔터프라이즈 | hidden | 부분적 (enterprise 설정 언급) | 5-tier 우선순위 세부는 미공개 |
| GrowthBook A/B | secret | ❌ 없음 | 맞음 |
| OpenTelemetry 파이프라인 | secret | ❌ 없음 (telemetry opt-out만 문서화) | 맞음 |
| 피처 플래그 89개 | secret | ❌ 없음 | 맞음 |

---

## 3. 모델 정보 검증

| Claim | 소스 코드 확인 | 비고 |
|-------|-------------|------|
| Opus 4.6 (`claude-opus-4-6`) 존재 | ✅ `src/constants/prompts.ts` | 최신 모델로 매핑됨 |
| Sonnet 4.6 (`claude-sonnet-4-6`) 존재 | ✅ `src/constants/prompts.ts` | 최신 모델로 매핑됨 |
| Opus 4.6 cutoff: May 2025 | ✅ `getKnowledgeCutoff()` 함수 | 정확히 일치 |
| Sonnet 4.6 cutoff: August 2025 | ✅ `getKnowledgeCutoff()` 함수 | 정확히 일치 |
| Haiku 4.5 cutoff: February 2025 | ✅ `getKnowledgeCutoff()` 함수 | 정확히 일치 |

---

## 4. 내러티브 정확성 검증

reveals.json의 서프라이즈 주장들을 소스 코드와 대조:

| Reveal | Claim | 검증 결과 |
|--------|-------|----------|
| "시스템 프롬프트가 통째로 바뀐다" | KAIROS/PROACTIVE 시 완전히 다른 프롬프트 | ✅ `src/constants/prompts.ts`에 이중 경로 확인 |
| "사용자가 보고 있는지 안다" | DECSET 1004 포커스 감지 | ✅ `src/ink/` 10+ 파일에서 확인 |
| "5분 캐시 균형" | SleepTool 프롬프트에 캐시 만료 언급 | ✅ `src/tools/SleepTool/prompt.ts` 존재 |
| "셧다운을 거부하는 AI" | shutdown_rejected 메시지 타입 | ✅ 메시지 프로토콜에서 확인 |
| "가짜 도구로 경쟁사를 속인다" | anti_distillation: ['fake_tools'] | ✅ 정확히 일치 |
| "종족명 hex 인코딩" | excluded-strings.txt 충돌 회피 | ✅ types.ts 주석에 이유 명시 |
| "결정론적 가챠" | userId 기반 Mulberry32 | ✅ hashString(key) → mulberry32(seed) |

---

## 5. 수정 조치 목록

### 즉시 수정 (데이터 오류)

| # | 파일 | 위치 | 현재 값 | 수정 값 |
|---|------|------|---------|---------|
| 1 | `node-content.json` | `sandbox.description_ko` | "Linux landlock" | "Linux bubblewrap(bwrap)" |
| 2 | `node-content.json` | `kairos.description_ko` | "62개 소스 파일" | "70개 소스 파일" |
| 3 | `reveals.json` | `reveal_undercover_mode.description_ko` | "21개 내부 저장소" | "22개 내부 저장소" |
| 4 | `node-content.json` | `feature_flags.description_ko` | "60+" (있다면) | "89" |

### 권장 수정 (정밀도 개선)

| # | 파일 | 내용 | 수정 방향 |
|---|------|------|----------|
| 5 | `node-content.json` | `otel_pipeline` 이벤트 수 | "651+" → "739+" |
| 6 | `node-content.json` | `permission_system` 모드 수 | "6-Mode" → "5+α Mode (auto는 feature-gated)" |
| 7 | 전체 데이터 | CLAUDE.md visibility | `hidden` 유지하되, 공식 문서에 기본 기능 설명 있음을 주석 |

### 수정 불필요 (보수적 표현이지만 틀리지 않음)

| Claim | 이유 |
|-------|------|
| "40+ 도구" | 실제 42. "40+"는 보수적이지만 정확 |
| "30+ 비밀 스캐너 패턴" | 실제 37 rule IDs. "30+"는 정확 |
| "87+ 슬래시 커맨드" | 실제 정확히 87. "87+"는 맞음 |

---

## 6. excluded-strings.txt 상태

- 소스 코드에서 5회 참조됨 (buddy types.ts, commitAttribution.ts, setup.ts, attribution.ts, sessionStorage.ts)
- 실제 파일은 **유출 소스에 포함되지 않음** (빌드 시스템/CI 레벨에 존재하는 것으로 추정)
- 프로젝트에서 이 파일을 노드로 포함한 것은 적절하지만, `file` 필드는 null로 유지해야 함

---

## 7. 결론

**전체 정확도: ~95%**

- 17개 핵심 수치: 100% 정확 (소스 코드 1:1 대조)
- 3개 보수적 표현: 방향 맞음, 실제 값은 더 큼
- 5개 수정 필요: 대부분 minor (landlock→bwrap, 21→22, 62→70)
- 공개/미공개 분류: 대부분 정확, CLAUDE.md/샌드박스만 재고 여지

가장 큰 오류는 **Linux 샌드박스가 landlock이 아닌 bubblewrap**인 점. 나머지는 숫자 미세 조정.

---

*검증 일시: 2026-04-01*
*검증 방법: 유출 소스 코드 직접 grep/wc 대조*

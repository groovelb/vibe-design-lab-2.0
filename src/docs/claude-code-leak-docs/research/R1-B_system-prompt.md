# R1-B: 시스템 프롬프트 조립 분석

## 파일: `src/constants/prompts.ts` (915줄)

---

## 핵심 발견

### 1. 이중 경로 시스템 프롬프트

`getSystemPrompt()` (L444–577)에서 두 가지 완전히 다른 프롬프트가 생성됨:

#### 경로 A: 일반 모드 (L560–577)
```
[정적 콘텐츠 — 캐시 가능]
├── getSimpleIntroSection()      — "You are Claude Code..." + CYBER_RISK
├── getSimpleSystemSection()     — 시스템 규칙 (8개 항목)
├── getSimpleDoingTasksSection() — 작업 수행 지침 (15+ 항목)
├── getActionsSection()          — 위험한 작업 확인 정책
├── getUsingYourToolsSection()   — 도구 사용 지침
├── getSimpleToneAndStyleSection() — 톤/스타일
├── getOutputEfficiencySection() — 출력 효율성
│
├── ═══ SYSTEM_PROMPT_DYNAMIC_BOUNDARY ═══  ← 캐시 경계
│
[동적 콘텐츠 — 레지스트리 관리]
├── session_guidance    — 세션별 안내 (AskUser, Agent, Skills)
├── memory             — 메모리 프롬프트 (loadMemoryPrompt)
├── ant_model_override  — ANT 전용 모델 오버라이드
├── env_info_simple    — 환경 정보 (OS, Git, 모델)
├── language           — 언어 설정
├── output_style       — 출력 스타일
├── mcp_instructions   — MCP 서버 지침
├── scratchpad         — 스크래치패드 디렉토리
├── frc                — Function Result Clearing
├── summarize_tool_results — 도구 결과 요약 지침
├── token_budget       — 토큰 예산 (TOKEN_BUDGET 플래그)
└── brief              — Brief 모드 (KAIROS/KAIROS_BRIEF)
```

#### 경로 B: PROACTIVE/KAIROS 자율 모드 (L467–489)
```
"You are an autonomous agent. Use the available tools to do useful work."
├── CYBER_RISK_INSTRUCTION
├── getSystemRemindersSection()
├── loadMemoryPrompt()
├── envInfo
├── language
├── MCP instructions
├── scratchpad
├── FRC
├── SUMMARIZE_TOOL_RESULTS
└── getProactiveSection()    ← 자율 작업 지침 (50+ 줄)
```

### 2. 정적/동적 캐시 경계

```typescript
export const SYSTEM_PROMPT_DYNAMIC_BOUNDARY =
  '__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__'
```

- **경계 이전**: 모든 조직에 공통 → `cacheScope: 'global'`로 캐시
- **경계 이후**: 세션/사용자별 동적 콘텐츠 → 캐시 안 됨
- `shouldUseGlobalCacheScope()` 조건부 삽입
- 조건부 분기가 경계 이전에 오면 캐시 해시 변종 2^N 폭발 (PR #24490, #24171 버그)

### 3. ANT-ONLY 전용 섹션 (외부 빌드에서 DCE 제거)

| 위치 | 내용 | 목적 |
|------|------|------|
| `getSimpleDoingTasksSection` L205–213 | 코멘트 작성 철학 (4개 규칙) | Capy v8 과잉 코멘트 억제 |
| `getSimpleDoingTasksSection` L225–229 | 적극적 피드백 | Capy v8 assertiveness 보정 |
| `getSimpleDoingTasksSection` L238–241 | 결과 정직 보고 | False claims 완화 (29-30% → 16.7%) |
| `getSimpleDoingTasksSection` L243–247 | /issue, /share 추천 | 내부 피드백 경로 |
| `getOutputEfficiencySection` L404–414 | 산문체 커뮤니케이션 | Ant 내부 커뮤니케이션 스타일 |
| `numeric_length_anchors` L529–536 | ≤25단어/≤100단어 제한 | 1.2% 토큰 절감 측정 |
| `getAntModelOverrideSection` L136–140 | 모델별 프롬프트 오버라이드 | 내부 모델 튜닝 |

### 4. 자율 모드 프롬프트 (`getProactiveSection`, L860–913)

**완전한 자율 에이전트 지침서**:

```
# Autonomous work
- <tick> 프롬프트로 살아있음 → "깨어났다, 뭘 할까?" 처리
- Sleep 도구로 깨우기 간격 제어
- 첫 깨움 시: 사용자에게 인사 + 방향 질문
- 이후 깨움: 유용한 작업 찾기, 스팸 금지
- 터미널 포커스에 따른 자율성 조절:
  - Unfocused: 적극적 자율 행동 (커밋, 푸시)
  - Focused: 협업적 모드 (선택지 제시)
- Bias toward action: 파일 읽기, 테스트 실행 등 확인 없이 진행
```

### 5. Undercover 모드 (L136, L621, L660, L694–702)

```typescript
import { isUndercover } from '../utils/undercover.js'

// 모델 이름/ID를 시스템 프롬프트에서 완전 제거
if (process.env.USER_TYPE === 'ant' && isUndercover()) {
  // suppress — 모델 정보, 클로드 코드 정보 모두 숨김
}
```

- **목적**: 내부 미공개 모델로 테스트 시 공개 커밋/PR에 모델 정보 누출 방지
- 숨기는 항목: 모델명, 모델 ID, 지식 컷오프, Claude Code 플랫폼 정보, 최신 모델 목록

### 6. 검증 에이전트 (Verification Agent, L391–395)

```typescript
feature('VERIFICATION_AGENT') &&
getFeatureValue_CACHED_MAY_BE_STALE('tengu_hive_evidence', false)
```

- **트리거**: 3+ 파일 편집, 백엔드/API 변경, 인프라 변경
- **프로토콜**: 독립적 적대적 검증 → FAIL/PASS/PARTIAL 판정
- **규칙**: 자기 검증 불가, 검증자만 판정 가능
- FAIL → 수정 후 검증자 재개, PASS → 스팟체크 (2-3 명령 재실행)

### 7. 모델 관련 상수

```typescript
const FRONTIER_MODEL_NAME = 'Claude Opus 4.6'
const CLAUDE_4_5_OR_4_6_MODEL_IDS = {
  opus: 'claude-opus-4-6',
  sonnet: 'claude-sonnet-4-6',
  haiku: 'claude-haiku-4-5-20251001',
}
```

**지식 컷오프**:
| 모델 | 컷오프 |
|------|--------|
| claude-opus-4-6 | May 2025 |
| claude-sonnet-4-6 | August 2025 |
| claude-opus-4-5 | May 2025 |
| claude-haiku-4 | February 2025 |
| claude-opus-4 / claude-sonnet-4 | January 2025 |

### 8. 디폴트 에이전트 프롬프트 (L758)

```typescript
export const DEFAULT_AGENT_PROMPT = `You are an agent for Claude Code...
Given the user's message, you should use the tools available to complete the task.
Complete the task fully—don't gold-plate, but don't leave it half-done.
When you complete the task, respond with a concise report...`
```

### 9. systemPromptSection 레지스트리 패턴

```typescript
// 캐시 안전 (동일 입력 → 동일 출력)
systemPromptSection('name', () => computeSection())

// 캐시 위험 (매 턴 재계산, 프롬프트 캐시 무효화 가능)
DANGEROUS_uncachedSystemPromptSection('name', () => compute(), 'reason')
```

- `resolveSystemPromptSections()`로 일괄 해결
- MCP instructions는 DANGEROUS: 서버 연결/해제가 턴 사이에 발생

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `system_prompt` | System Prompt Builder | engine | core |
| `cache_boundary` | Static/Dynamic Cache Boundary | engine | optimization |
| `proactive_prompt` | Autonomous Mode Prompt | future | autonomy |
| `undercover_mode` | Undercover Mode | control | security |
| `verification_agent` | Verification Agent Protocol | engine | quality |
| `ant_only_sections` | ANT-Only Prompt Sections | control | internal |
| `cyber_risk` | Cyber Risk Instruction | control | safety |

### 새 엣지
| Source → Target | Type | Label |
|----------------|------|-------|
| `system_prompt` → `cache_boundary` | contains | 캐시 경계 분리 |
| `proactive_prompt` → `tick_system` | triggers | Tick 기반 자율 루프 |
| `proactive_prompt` → `sleep_tool` | uses | 깨우기 간격 제어 |
| `kairos_flag` → `proactive_prompt` | gates | 자율 모드 활성화 |
| `undercover_mode` → `system_prompt` | modifies | 모델 정보 제거 |
| `verification_agent` → `agent_tool` | requires | 검증 에이전트 생성 |
| `growthbook` → `verification_agent` | gates | tengu_hive_evidence |

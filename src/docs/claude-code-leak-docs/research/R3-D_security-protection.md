# R3-D: 보안 및 보호 시스템 분석

## 파일들
- `src/utils/undercover.ts` (90줄)
- `src/utils/attribution.ts` (394줄)
- `src/utils/commitAttribution.ts` (963줄)
- `src/constants/cyberRiskInstruction.ts` (25줄)
- `src/services/teamMemorySync/secretScanner.ts` (326줄)
- `src/utils/betas.ts` (436줄)
- `src/services/api/claude.ts` (L301-313)

---

## 핵심 발견

### 1. Undercover 모드 — "클로드의 위장 작전"

```typescript
// undercover.ts — 공개 저장소 작업 시 신원 은폐
export function isUndercover(): boolean {
  if (process.env.USER_TYPE === 'ant') {
    if (isEnvTruthy(process.env.CLAUDE_CODE_UNDERCOVER)) return true
    // Auto: 내부 허용 목록에 확인된 경우만 OFF, 나머지 전부 ON
    return getRepoClassCached() !== 'internal'
  }
  return false
}
```

**설계 철학**: "안전 기본값은 ON" — 내부 저장소임을 확실히 확인하지 못하면 항상 위장 모드 유지.

**숨기는 항목들**:
- 내부 모델 코드네임 (Capybara, Tengu 등 동물 이름)
- 미공개 모델 버전 번호 (opus-4-7, sonnet-4-8 등)
- 내부 저장소/프로젝트 이름 (claude-cli-internal 등)
- 내부 도구명, Slack 채널, 단축 링크 (go/cc 등)
- "Claude Code" 언급 또는 AI라는 힌트
- Co-Authored-By 라인 및 모든 귀속 정보

**위장 지침서** (getUndercoverInstructions):
```
GOOD: "Fix race condition in file watcher initialization"
BAD:  "Fix bug found while testing with Claude Capybara"
BAD:  "1-shotted by claude-opus-4-6"
```

- **강제 OFF 불가** — `CLAUDE_CODE_UNDERCOVER=1`로 강제 ON만 가능
- 외부 빌드에서는 모든 함수가 trivial return으로 DCE 제거

### 2. 커밋 귀속 추적 시스템 (Commit Attribution)

```typescript
// commitAttribution.ts — 파일별 Claude vs Human 기여도 추적
export type AttributionState = {
  fileStates: Map<string, FileAttributionState>
  sessionBaselines: Map<string, { contentHash: string; mtime: number }>
  surface: string              // cli, vscode, jetbrains 등
  startingHeadSha: string | null
  promptCount: number
  promptCountAtLastCommit: number
  permissionPromptCount: number
  escapeCount: number          // ESC 키 횟수 (권한 거부)
}
```

**작동 방식**:
1. 세션 시작 시 파일 기준선(baseline) 해시 저장
2. Edit/Write 도구 호출 시마다 `trackFileModification()` — 변경 문자 수 누적
3. 커밋 시 `calculateCommitAttribution()` — Claude % 계산
4. PR 설명에 자동 삽입: `"🤖 Generated with Claude Code (93% 3-shotted by claude-opus-4-5)"`

**문자 기여도 계산** (prefix/suffix 매칭):
```typescript
// 공통 prefix + suffix를 찾아 실제 변경 영역만 측정
let prefixEnd = 0
while (prefixEnd < minLen && old[prefixEnd] === new[prefixEnd]) prefixEnd++
let suffixLen = 0
while (suffixLen < minLen - prefixEnd && old[old.length-1-suffixLen] === new[new.length-1-suffixLen]) suffixLen++
claudeContribution = Math.max(oldChangedLen, newChangedLen)
```

### 3. 내부 저장소 허용 목록 — Anthropic의 비밀 프로젝트들

```typescript
const INTERNAL_MODEL_REPOS = [
  'anthropics/claude-cli-internal',   // CLI 내부 개발
  'anthropics/anthropic',             // 메인 모노레포
  'anthropics/apps',                  // 앱 프론트엔드
  'anthropics/casino',                // Casino 프로젝트 (미상)
  'anthropics/dbt',                   // 데이터 변환
  'anthropics/dotfiles',              // 개발 환경 설정
  'anthropics/terraform-config',      // 인프라 설정
  'anthropics/hex-export',            // Hex 익스포트
  'anthropics/feedback-v2',           // 피드백 시스템 v2
  'anthropics/labs',                  // 실험실 프로젝트
  'anthropics/argo-rollouts',         // Argo 배포
  'anthropics/starling-configs',      // Starling 설정
  'anthropics/ts-tools',              // TypeScript 도구
  'anthropics/ts-capsules',           // TypeScript 캡슐
  'anthropics/feldspar-testing',      // Feldspar 테스트
  'anthropics/trellis',               // Trellis 시스템
  'anthropics/claude-for-hiring',     // 채용용 클로드
  'anthropics/forge-web',             // Forge 웹
  'anthropics/infra-manifests',       // 인프라 매니페스트
  'anthropics/mycro_manifests',       // Mycro 매니페스트
  'anthropics/mycro_configs',         // Mycro 설정
  'anthropics/mobile-apps',           // 모바일 앱
]
```

**중요**: 이것은 조직 전체 허용이 아님 — `anthropics` 조직에 공개 저장소가 있기 때문에 (claude-code, sandbox-runtime 등), 확인된 비공개 저장소만 개별 등록.

### 4. Anti-Distillation — 지식 증류 방지

```typescript
// services/api/claude.ts L301-312
// Anti-distillation: fake_tools opt-in for 1P CLI only
if (
  feature('ANTI_DISTILLATION_CC')
    ? process.env.CLAUDE_CODE_ENTRYPOINT === 'cli' &&
      shouldIncludeFirstPartyOnlyBetas() &&
      getFeatureValue_CACHED_MAY_BE_STALE(
        'tengu_anti_distill_fake_tool_injection', false
      )
    : false
) {
  result.anti_distillation = ['fake_tools']
}
```

**메커니즘**: API 요청에 `anti_distillation: ['fake_tools']` 파라미터 전송
- **fake_tools**: 서버가 가짜 도구 정의를 주입하여 응답 패턴을 오염 → 응답을 수집해 다른 모델 훈련에 사용하려는 시도를 방해
- `ANTI_DISTILLATION_CC` 피처 플래그 + `tengu_anti_distill_fake_tool_injection` GrowthBook 실험으로 이중 게이팅
- 1P (Anthropic 직접 API) CLI에서만 활성화

### 5. Connector Text 요약 — 또 다른 Anti-Distillation 층

```typescript
// betas.ts L279-298 — 서버측 anti-distillation
// POC: server-side connector-text summarization (anti-distillation).
// API가 도구 호출 사이의 어시스턴트 텍스트를 버퍼링하고 요약하여,
// 서명이 포함된 요약본을 반환 — 원본은 다음 턴에서 복원 가능.
// thinking 블록과 동일한 메커니즘.
if (
  SUMMARIZE_CONNECTOR_TEXT_BETA_HEADER &&
  process.env.USER_TYPE === 'ant' &&
  includeFirstPartyOnlyBetas
) {
  betaHeaders.push(SUMMARIZE_CONNECTOR_TEXT_BETA_HEADER)
}
```

- 도구 호출 사이의 어시스턴트 응답 텍스트를 **요약본으로 교체**
- 서명 포함 → 다음 턴에서 원본 복원 가능
- 목적: 응답 텍스트 수집 → 훈련 데이터 사용 방지
- ant-only, firstParty-only (Bedrock/Vertex 제외)

### 6. Secret Scanner — 팀 메모리 시크릿 스캐닝

```typescript
// secretScanner.ts — gitleaks 기반 클라이언트측 시크릿 스캐너
const SECRET_RULES: SecretRule[] = [
  // Cloud: AWS, GCP, Azure AD, DigitalOcean
  // AI APIs: Anthropic, OpenAI, HuggingFace
  // VCS: GitHub (PAT, fine-grained, app, OAuth, refresh), GitLab
  // Communication: Slack (bot, user, app), Twilio, SendGrid
  // Dev: NPM, PyPI, Databricks, HashiCorp, Pulumi, Postman
  // Observability: Grafana (3종), Sentry (2종)
  // Payment: Stripe, Shopify
  // Crypto: Private keys (PEM)
]
```

**특징**:
- **30개+ 시크릿 패턴** (gitleaks 기반, MIT 라이선스)
- 팀 메모리 업로드 **전에** 클라이언트에서 스캔 → 시크릿이 서버에 도달하지 않음
- 매칭된 텍스트 값 자체는 **절대 로그/표시 안 함** — 규칙 ID만 반환
- `redactSecrets()`: 인라인 [REDACTED] 치환
- Anthropic API 키 접두사 `sk-ant-api`는 런타임에 조합 — 번들에 리터럴로 노출 방지:
  ```typescript
  const ANT_KEY_PFX = ['sk', 'ant', 'api'].join('-')
  ```

### 7. excluded-strings.txt — 빌드 시크릿 검증

코드 전체에서 `excluded-strings.txt` 참조가 반복 등장:
```
// "excluded-strings check" — 빌드 출력에서 특정 문자열이 검출되면 실패
// 내부 코드네임, 내부 기능명이 외부 번들에 누출되는 것을 방지
```

**영향받는 코드 패턴들**:
- Buddy 종족 이름 → hex charcode로 인코딩 (모델 코드네임 충돌)
- Anthropic API 키 접두사 → runtime join()으로 조합
- bash_classifier → feature() 게이트로 DCE
- attributionTrailer → dynamic import 뒤에 격리
- CONTEXT_COLLAPSE → feature() 게이트로 DCE

### 8. CYBER_RISK_INSTRUCTION — 보안 행동 경계

```typescript
// cyberRiskInstruction.ts — Safeguards 팀 소유
// "DO NOT MODIFY WITHOUT SAFEGUARDS TEAM REVIEW"
// 담당: David Forsythe, Kyla Guru

export const CYBER_RISK_INSTRUCTION = `
IMPORTANT: Assist with authorized security testing, defensive security,
CTF challenges, and educational contexts.
Refuse: destructive techniques, DoS, mass targeting, supply chain compromise,
detection evasion for malicious purposes.
Dual-use: require clear authorization context.
`
```

- **모든 시스템 프롬프트에 포함** (일반 모드 + 자율 모드 모두)
- Safeguards 팀의 명시적 승인 없이 수정 불가
- 변경 시 평가 프로세스 필수

### 9. 모델 이름 세탁 (sanitizeModelName)

```typescript
export function sanitizeModelName(shortName: string): string {
  if (shortName.includes('opus-4-6')) return 'claude-opus-4-6'
  if (shortName.includes('opus-4-5')) return 'claude-opus-4-5'
  // ... 공개 모델명으로 매핑
  return 'claude'  // 미지 모델은 제네릭 이름
}
```

- 내부 모델 변형명 → 공개 등가물로 변환
- 미인식 모델은 `'claude'`로 폴백 (코드네임 유출 방지)
- PR 귀속에서: 미공개 모델은 `'Claude Opus 4.6'`으로 하드코딩 폴백

### 10. Enhanced PR Attribution — N-shotted 통계

```typescript
// attribution.ts — PR 귀속에 AI 기여도 상세 표시
const summary = `🤖 Generated with Claude Code (${claudePercent}% ${promptCount}-shotted by ${shortModelName}${memSuffix})`
// 예: "🤖 Generated with Claude Code (93% 3-shotted by claude-opus-4-5, 2 memories recalled)"
```

**측정 항목**:
- Claude 기여 백분율 (문자 단위 변경량)
- N-shotted: 사용자가 보낸 프롬프트 수
- 메모리 접근 횟수 (memories recalled)
- 서피스별 분석 (cli/vscode/jetbrains)
- 내부 저장소에서만 트레일러 라인 추가 (squash-merge 생존용)

### 11. Auto Mode 모델 지원 — AI 기반 권한 자동 승인

```typescript
export function modelSupportsAutoMode(model: string): boolean {
  if (feature('TRANSCRIPT_CLASSIFIER')) {
    // 외부: firstParty-only (PI probes가 Bedrock/Vertex에 미구현)
    // GrowthBook: tengu_auto_mode_config.allowModels로 강제 활성화
    // ant: denylist (claude-3-, claude-*-4 계열 차단)
    // 외부: claude-(opus|sonnet)-4-6 만 허용
    return /^claude-(opus|sonnet)-4-6/.test(m)
  }
  return false
}
```

- **TRANSCRIPT_CLASSIFIER** 피처 플래그 뒤에서 AI가 도구 사용 안전성 자동 판단
- GrowthBook `tengu_auto_mode_config`로 모델별 원격 제어
- 외부 빌드: Claude Opus 4.6, Sonnet 4.6만 지원

---

## 보안 계층 요약

```
Layer 5: 빌드 타임 보호
  ├── excluded-strings.txt → 금지 문자열 빌드 검증
  ├── Dead Code Elimination → feature(false) 코드 완전 제거
  └── hex encoding → 종족 이름 난독화

Layer 4: API 수준 보호
  ├── anti_distillation: ['fake_tools'] → 디스틸레이션 방지
  ├── connector text summarization → 응답 텍스트 요약 교체
  └── beta headers → 기능 게이팅

Layer 3: 런타임 보호
  ├── Undercover Mode → 공개 저장소 신원 은폐
  ├── sanitizeModelName → 모델 코드네임 세탁
  └── Secret Scanner → 30+ 시크릿 패턴 클라이언트 스캔

Layer 2: 행동 제어
  ├── CYBER_RISK_INSTRUCTION → 공격 행동 제한
  ├── TRANSCRIPT_CLASSIFIER → AI 권한 자동 판단
  └── Verification Agent → 적대적 코드 검증

Layer 1: 감사 추적
  ├── Commit Attribution → 파일별 Claude/Human % 기록
  ├── N-shotted 통계 → 프롬프트 수, 메모리 접근 수
  └── Attribution Trailers → git note 기반 상세 추적
```

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `undercover_mode` | Undercover Mode | control | security |
| `commit_attribution` | Commit Attribution System | engine | tracking |
| `anti_distillation` | Anti-Distillation | control | security |
| `secret_scanner` | Secret Scanner | engine | security |
| `cyber_risk` | CYBER_RISK_INSTRUCTION | control | safety |
| `model_sanitizer` | Model Name Sanitizer | control | security |
| `excluded_strings` | excluded-strings.txt | control | build |
| `connector_summarize` | Connector Text Summarization | control | security |
| `internal_repos` | Internal Repo Allowlist | control | security |
| `auto_mode` | Auto Mode (AI Permissions) | future | security |

### 새 엣지
| Source → Target | Type | Label |
|----------------|------|-------|
| `undercover_mode` → `commit_attribution` | suppresses | 공개 저장소 귀속 제거 |
| `undercover_mode` → `system_prompt` | modifies | 모델 정보 제거 |
| `internal_repos` → `undercover_mode` | controls | 내부 저장소면 OFF |
| `anti_distillation` → `api_client` | injects | fake_tools 파라미터 |
| `connector_summarize` → `api_client` | injects | 응답 텍스트 요약 |
| `secret_scanner` → `team_memory` | guards | 업로드 전 시크릿 스캔 |
| `cyber_risk` → `system_prompt` | included_in | 모든 프롬프트에 포함 |
| `model_sanitizer` → `commit_attribution` | sanitizes | 코드네임 → 공개명 |
| `excluded_strings` → `build_pipeline` | validates | 빌드 출력 문자열 검증 |
| `growthbook` → `anti_distillation` | gates | tengu_anti_distill_* |
| `growthbook` → `auto_mode` | configures | tengu_auto_mode_config |
| `feature_flags` → `auto_mode` | gates | TRANSCRIPT_CLASSIFIER |

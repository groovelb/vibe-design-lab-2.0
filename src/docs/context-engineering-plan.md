# Context Engineering 개편 계획

> 작성: 2026-03-30
> 기준: Anthropic 공식 가이드 + Boris Cherny 권장사항
> 상태: Phase A+B 완료 / Phase C 미적용

## 결과

| 지표 | Before | After (A+B) | Phase C 적용 시 |
|------|--------|-------------|----------------|
| 항상 로드 | 217줄 / 8.4KB | **107줄** | ~87줄 |
| 조건부 로드 | nextjs만 (무력화) | **nextjs + project-directory + design-system (106줄)** | 동일 |
| Hook 강제 | 0개 | 0개 | 1개 (Grid2 차단) |
| 중복 | 3건 | **0건** | 0건 |

## Phase A: 즉시 적용 (중복 제거 + paths 정상화)

### A-1. CLAUDE.md "작업 전 확인" 섹션 삭제
- **이유**: ux-architecture.md가 이미 동일 지시를 담당
- **절감**: -3줄

### A-2. CLAUDE.md에서 nextjs.md `@` import 제거
- **이유**: nextjs.md에 `paths: ["app/**/*"]` 있으나, `@` import가 매 세션 무조건 인라인하여 무력화
- **방법**: `@.claude/rules/nextjs.md` 행 제거. nextjs.md는 `paths`로 조건부 로드
- **절감**: app 파일 미작업 세션에서 -23줄

### A-3. code-convention.md Props 예시 압축
- **이유**: 11줄 코드 블록 → 기존 코드베이스에서 패턴 학습 가능
- **방법**: 한 줄 패턴 요약 + 핵심 규칙만 유지
- **절감**: -8줄

## Phase B: paths 확대

### B-1. project-directory.md에 paths 추가
```yaml
paths:
  - "src/components/**/*"
  - "src/stories/**/*"
```
- **이유**: 텍소노미 매핑, Storybook prefix는 컴포넌트/스토리 작업 시에만 필요
- **CLAUDE.md에서 `@` 제거 필수** (A-2와 동일 패턴)

### B-2. design-system.md에 paths 추가
```yaml
paths:
  - "src/components/**/*"
  - "src/common/**/*"
```
- **이유**: 토큰/스타일링 규칙은 UI 컴포넌트 작업 시에만 필요
- **CLAUDE.md에서 `@` 제거 필수**

### B-3. CLAUDE.md `@` import 정리
- paths가 있는 파일은 `@` import에서 제거
- 항상 로드 파일만 `@`로 유지

## Phase C: Hook 도입 (Grid2 차단)

### C-1. mui-grid-usage.md → Hook 전환
- **현재**: 20줄 룰 파일로 advisory 관리
- **변경**: settings.json의 PreToolUse hook으로 deterministic 강제
- **효과**: 위반 확률 0%, 룰 파일 20줄 절감

```json
// .claude/settings.json (hooks 섹션)
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "! grep -r \"from '@mui/material/Grid2'\" --include='*.jsx' --include='*.tsx' src/ 2>/dev/null"
      }
    ]
  }
}
```

## 건드리지 않는 것

| 파일 | 이유 |
|------|------|
| project-summary.md (8줄) | 핵심 정체성, 가볍고 범용 |
| ux-architecture.md (21줄) | 문서 라우팅 테이블, 모든 작업에 필수 |
| code-convention.md API 키 섹션 | 프로젝트 특화 (GEMINI_API_KEY, .env.local) |
| 스킬 구조 전체 | 온디맨드 로딩 잘 활용 중 |

## 적용 이력

| Phase | 상태 | 일자 |
|-------|------|------|
| A (중복 제거 + paths 정상화) | 완료 | 2026-03-30 |
| B (paths 확대) | 완료 | 2026-03-30 |
| C (Hook 도입) | 미적용 — 빌드 안전성 필요 시 적용 | - |

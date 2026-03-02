# Vibe Design Labs — Starter Kit

디자이너를 위한 바이브 코딩 교육 플랫폼. 커뮤니티·챌린지 중심 피어 학습으로 도구가 바뀌어도 유효한 디자인 언어 체계를 습득하게 한다.

**기술 스택:** Next.js 16 + React 19 + MUI 7 + Storybook 10 + Supabase + Mux

YOU MUST 코드 작업 전 관련 규칙을 확인하고, 위반 가능성이 있으면 먼저 사용자에게 알려라.
YOU MUST NOT 명시적 허용 없이 규칙을 위반하는 코드를 작성하지 마라.
사용자 요청이 규칙과 충돌하면 구체적 충돌 내용을 알리고, 명시적 예외 허용 전까지 진행 금지.

## 규칙 원본

### CRITICAL (절대 위반 불가)
@.claude/rules/project-summary.md
@.claude/rules/mui-grid-usage.md

### MUST (반드시 준수)
@.claude/rules/code-convention.md
@.claude/rules/design-system.md
@.claude/rules/project-directory.md
@.claude/rules/nextjs.md
@.claude/rules/ux-architecture.md

## 작업 전 확인

모든 구현 작업 시작 전 `.claude/rules/ux-architecture.md`의 문서 참조 지도를 확인하고, 작업 성격에 해당하는 `src/docs/ux/` 문서를 읽은 뒤 작업한다.

## Common Commands

```bash
pnpm dev              # Next.js 개발 서버
pnpm storybook        # Storybook 실행 (포트 6006)
pnpm build            # Next.js 프로덕션 빌드
pnpm build-storybook  # Storybook 정적 빌드
pnpm lint             # ESLint 검사
```

## Workflow

- 컴포넌트 작업 (생성/수정/삭제/스토리) → `component-work` Skill 사용
- 룰 수정/추가/삭제 → `rule-visualization` Skill 사용
- 리팩토링 → `component-work` Skill의 `resources/refactoring-guide.md` 참조
- SVG 일러스트 생성 → `isometric-illustration` Skill 사용

## 병렬 작업 규칙

- `run_in_background: true` 사용 금지 (알려진 버그: 세션 멈춤)
- 병렬 실행이 필요하면 하나의 메시지에서 여러 Task를 동시 호출하라
- 빌드 검증(pnpm build-storybook, pnpm build)은 사용자가 명시적으로 요청할 때만 실행하라

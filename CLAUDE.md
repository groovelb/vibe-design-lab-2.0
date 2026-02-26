# Project Rules

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

## 병렬 작업 규칙

- `run_in_background: true` 사용 금지 (알려진 버그: 세션 멈춤)
- 병렬 실행이 필요하면 하나의 메시지에서 여러 Task를 동시 호출하라
- 빌드 검증(pnpm build-storybook, pnpm build)은 사용자가 명시적으로 요청할 때만 실행하라

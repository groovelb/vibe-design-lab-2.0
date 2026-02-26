# Project Directory Rules (MUST)

새로운 컴포넌트를 추가할 때는 아래 텍소노미 분류를 따른다.
상세 분류 기준: `.claude/skills/component-work/resources/taxonomy-v0.4.md`

## 핵심 디렉토리

- `src/components/{category}/` — 텍소노미 기반 컴포넌트 (스토리 co-locate)
- `src/components/templates/` — 다수 컴포넌트 조합 템플릿
- `src/components/storybookDocumentation/` — Storybook 문서 유틸 컴포넌트
- `src/stories/` — 문서 전용 스토리 (style, overview, page, template)
- `src/common/ui/` — 공통 UI 요소

## 텍소노미 카테고리 → 디렉토리 매핑

| # | 카테고리 | 디렉토리 |
|---|---------|----------|
| 1 | Typography | `typography/` |
| 2 | Container | `container/` |
| 3 | Card | `card/` |
| 4 | Media | `media/` |
| 5 | Data Display | `data-display/` |
| 6 | In-page Navigation | `in-page-navigation/` |
| 7 | Input & Control | `input/` |
| 8 | Layout | `layout/` |
| 9 | Overlay & Feedback | `overlay-feedback/` |
| 10 | Navigation (Global) | `navigation/` |
| 11 | KineticTypography | `kinetic-typography/` |
| 12 | Scroll | `scroll/` |
| 13 | ContentTransition | `content-transition/` |
| 14 | Motion | `motion/` |
| 15 | DynamicColor | `dynamic-color/` |

## Storybook title prefix

| prefix | 설명 |
|--------|------|
| `Style/` | 디자인 토큰 문서 |
| `Component/{#}. {Category}/` | 컴포넌트 (#1~#10) |
| `Interactive/{#}. {Category}/` | 인터랙티브 패턴 (#11~#15) |
| `Common/` | 유틸리티 컴포넌트 |
| `Template/` | 템플릿 |
| `Page/` | 페이지 |

## 새 컴포넌트 추가 시

1. 텍소노미 카테고리 확인 → 해당 디렉토리에 생성
2. 스토리: 같은 디렉토리에 `ComponentName.stories.jsx`로 co-locate
3. 스토리 title은 위 prefix 매핑 사용

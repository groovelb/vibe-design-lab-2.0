---
paths:
  - "app/**/*"
---

# Next.js Rules (MUST)

**"서버가 콘텐츠를 소유하고, 클라이언트가 움직임을 소유한다."**

## 'use client' 배치 규칙

- `'use client'`는 트리 끝단(leaf)에만 배치
- **page.jsx에는 절대 `'use client'` 사용 금지**
- layout.jsx는 서버 컴포넌트 유지 (ThemeRegistry는 `providers.jsx`로 분리)
- MUI를 import하는 모든 컴포넌트 파일에 `'use client'` 필수
- `@mui/material-nextjs/v15-appRouter`의 `AppRouterCacheProvider`로 SSR 호환

## 애니메이션 규칙

- **허용**: `transform`, `opacity`, `filter`
- **금지**: `width`, `height`, `margin`, `top`, `left` 애니메이션 (CLS 유발)
- 애니메이션 초기 상태에서 `opacity: 0` 사용 **금지** → `opacity: 0.01` 사용
- `prefers-reduced-motion` 필수 대응

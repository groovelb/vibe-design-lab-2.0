# Code Convention (MUST)

## 파일/네이밍

- 컴포넌트 파일명은 PascalCase (예: `PhiSplit.jsx`)
- `'use client'` 배치 → `nextjs.md` 참조

## Props 주석 규칙

컴포넌트 함수 선언부 위에 JSDoc으로 props 문서화. 형식: `@param {type} name - 설명 [Required/Optional]`
- boolean props는 `is`/`has`, 함수형 props는 `on`으로 시작
- 기존 컴포넌트의 JSDoc 패턴을 따를 것

## API 키 / 시크릿 규칙 (CRITICAL)

- API 키, 시크릿, 토큰 등 민감 정보를 **코드에 직접 하드코딩 절대 금지**
- 반드시 `.env.local` 환경변수를 통해 참조할 것 (`process.env.GEMINI_API_KEY`)
- fallback 값으로 실제 키를 넣는 것도 금지 (`|| 'AIza...'`)
- 환경변수 미설정 시 명확한 에러 메시지와 함께 즉시 종료

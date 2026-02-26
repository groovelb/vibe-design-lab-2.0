# Code Convention (MUST)

## 파일/네이밍

- 컴포넌트 파일명은 PascalCase (예: `PhiSplit.jsx`)
- `'use client'` 배치 → `nextjs.md` 참조

## Props 주석 규칙

컴포넌트 함수 선언부 위에 아래 형식으로 props를 문서화한다:

```jsx
/**
 * Button 컴포넌트
 *
 * @param {string} label - 버튼 텍스트 [Required]
 * @param {function} onClick - 클릭 핸들러 [Optional]
 * @param {boolean} isActive - 활성화 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <Button label="확인" onClick={handleClick} />
 */
function Button({ label, onClick, isActive = true }) { ... }
```

- boolean props는 `is`/`has`, 함수형 props는 `on`으로 시작
- [Required] / [Optional] 구분 명시

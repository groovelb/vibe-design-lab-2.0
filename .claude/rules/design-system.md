# Design System (MUST)

## 1. 기존 컴포넌트 재활용 (CRITICAL)

새 컴포넌트를 만들기 전에 반드시 기존 컴포넌트로 대체 가능한지 확인하고 최대한 재활용해라.

## 2. 디자인 토큰 사용 (CRITICAL)

임의의 색상값, 폰트 크기, 간격을 직접 지정하지 말고 theme 토큰을 참조할 것.

```jsx
sx={{ color: 'primary.main', p: 2, gap: 1 }}
<Typography variant="h1">제목</Typography>
```

- 아이콘: lucide-react 우선 사용 (`src/components/style/Icons.stories.jsx` 참고)

## 3. 스타일링

- 모든 스타일은 MUI의 `sx` prop 사용
- 기존 기능에 영향을 주지 않도록 변경 범위를 최소화

---
paths:
  - "**/*.jsx"
---

# MUI Grid Import 규칙 (CRITICAL)

```jsx
// WRONG - 절대 사용 금지
import Grid from '@mui/material/Grid2';

// CORRECT - 이것만 사용
import Grid from '@mui/material/Grid';

// MUI v7: size prop으로 반응형 크기 지정
<Grid container spacing={2}>
  <Grid size={{ xs: 6, md: 8 }}>내용</Grid>
  <Grid size={{ xs: 6, md: 4 }}>내용</Grid>
</Grid>
```

# UX Architecture (MUST)

## 핵심 원칙

- 문서에 정의되지 않은 판단이 필요하면 구현 전에 먼저 질문한다
- 컴포넌트 신규 제작 전 design-system-optimization 문서의 컴포넌트 리스트를 먼저 확인한다
- 상수 텍스트는 임의로 작성하지 않고 contents 문서를 참조한다

## 문서 참조 지도

작업 성격을 파악하고 해당하는 문서를 읽은 뒤 작업한다.
두 가지 이상 해당하면 모두 읽는다.

| 작업 성격 | 읽어야 할 문서 |
|-----------|---------------|
| 서비스 방향, 기능 범위, Non-goal 판단 | `src/docs/ux/project-summary.md` |
| 화면 구조, 플로우, IA, 인터랙션 | `src/docs/ux/ux-flow.md` |
| 컴포넌트, 스타일, 토큰, 비주얼 | `src/docs/ux/design-system-optimization.md` |
| 데이터 모델, API, 상태 관리, 라이브러리 | `src/docs/ux/technical.md` |
| 텍스트, 메시지, 이미지, 미디어 | `src/docs/ux/contents.md` |
| 프레젠테이션 슬라이드 시스템 | `src/docs/ux/presentation-system.md` |

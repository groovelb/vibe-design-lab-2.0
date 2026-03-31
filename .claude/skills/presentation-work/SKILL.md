# Presentation Work Skill

> 프레젠테이션 데이터(덱/슬라이드) 및 프레젠테이션 컴포넌트의 생성·수정·삭제 워크플로우

## 활성화 조건

| 의도 | 트리거 예시 |
|------|-----------|
| 슬라이드 추가 | "슬라이드 추가해줘", "새 슬라이드", "이 내용으로 슬라이드 만들어" |
| 슬라이드 수정 | "S1-P-A-3 수정", "이 슬라이드 내용 바꿔", "이미지 교체" |
| 슬라이드 삭제 | "이 슬라이드 삭제", "제거해줘" |
| 덱 생성 | "S2 만들어", "새 프레젠테이션" |
| 프레젠테이션 컴포넌트 | "프레젠테이션 컴포넌트 만들어", "SlideXxx 수정" |

---

## 금지 규칙 (CRITICAL)

1. **파일 삭제 금지** — 이동 요청에 삭제로 대응하지 않는다. 이동 확인 후 원본 삭제
2. **요청 범위 외 변경 금지** — alias export, 추가 정리, "ついでに" 개선 하지 않는다
3. **ChapterTitle 보존** — Part의 0번(또는 첫 번째) 슬라이드가 ChapterTitle이면, 명시적 지시 없이 수정·삭제 금지
4. **인접 슬라이드 불변** — 특정 슬라이드 수정 시 해당 슬라이드만 건드린다. 전후 슬라이드는 절대 변경하지 않는다
5. **토큰 전용** — `presentationTokens`만 사용. MUI theme 참조 금지. 하드코딩 px 금지
6. **스크롤 금지** — 한 슬라이드에 콘텐츠가 넘치면 줄인다. overflow 발생시키지 않는다
7. **언어 톤: ~합니다/~입니다** — 슬라이드 텍스트는 강의 발표체를 사용한다. `~한다/~이다` (문어체) 금지, `~합니다/~입니다/~이죠/~거든요` (발표체) 사용.
   - ✗ "이런 대표성 있는 언어를 조합해서 우리의 의도를 AI에게 전달해야 한다. 단어 하나에 담긴 맥락이 AI의 해석 품질을 결정한다."
   - ✓ "이런 대표성 있는 언어를 조합해서 우리의 의도를 AI에게 전달해야 합니다. 단어 하나에 담긴 맥락이 AI의 해석 품질을 결정하기 때문이죠."

---

## 워크플로우

### 의도 분기

```
├── 슬라이드 추가/수정/삭제 → 데이터 워크플로우
├── 덱 생성 (s2.jsx 등) → 덱 생성 워크플로우
├── 프레젠테이션 컴포넌트 생성/수정 → 컴포넌트 워크플로우
└── 이미지 추가 → 이미지 워크플로우
```

---

### 데이터 워크플로우 (슬라이드 추가/수정/삭제)

1. **resources/component-catalog.md** Read — 사용 가능한 컴포넌트 확인
2. **resources/slide-patterns.md** Read — 슬라이드 구성 패턴 참조
3. **resources/id-naming-rules.md** Read — ID 규칙 확인
4. 대상 덱 파일 Read (`src/data/presentations/s*.jsx`)
5. **작업 실행**
   - 추가: 삽입 위치의 Part 내에서 순번 확인 → 새 슬라이드 추가 → 뒤따르는 ID 재번호
   - 수정: 해당 슬라이드의 render만 수정
   - 삭제: 슬라이드 제거 → 뒤따르는 ID 재번호
6. **검증** (MUST)
   - grep으로 해당 Part 내 ID 중복 확인
   - 미사용 import 정리 (사용되는 컴포넌트만 import)
   - Placeholder 잔재 확인

### 덱 생성 워크플로우

1. **resources/data-file-template.md** Read — 보일러플레이트 참조
2. **resources/component-catalog.md** Read
3. 새 파일 생성 (`src/data/presentations/s{n}.jsx`)
4. `src/data/presentations/index.js` 배럴 export 추가
5. 덱 데모 스토리 생성 (`src/stories/page/PresentationS{n}.stories.jsx`)

### 컴포넌트 워크플로우

1. **resources/component-catalog.md** Read — 기존 것으로 커버 가능한지 확인
   - 커버 가능하면 기존 컴포넌트 사용 권유, 신규 생성 안 함
   - Box + 반복 패턴이 2회 이상 등장해야 신규 컴포넌트 정당화
2. `src/styles/themes/presentation.js` Read — 토큰 확인
3. 구현
   - 컴포넌트: `src/components/presentation/{layers|elements}/Slide{Name}.jsx`
   - 스토리: 같은 디렉토리에 co-locate
   - `'use client'` 디렉티브 필수
   - JSDoc props 문서화 필수
4. 등록 (MUST)
   - `src/components/presentation/index.js` 배럴 export 추가
   - **resources/component-catalog.md** 업데이트
   - `src/docs/ux/presentation-system.md` 문서 동기화

### 이미지 워크플로우

1. 이미지를 `public/presentations/`에 복사
2. 덱 파일에서 `SlideImage` import 확인
3. `<SlideImage src="/presentations/{filename}" alt="..." />` 로 참조
4. Placeholder.Box가 있었다면 제거

---

## Resources

| 파일 | 용도 | 언제 Read |
|------|------|----------|
| `component-catalog.md` | 프레젠테이션 컴포넌트 전체 목록 + props | 모든 작업 시 (필수) |
| `slide-patterns.md` | 자주 쓰이는 슬라이드 구성 패턴 | 슬라이드 추가/수정 시 |
| `id-naming-rules.md` | ID 규칙 + 재번호 절차 | 슬라이드 추가/삭제 시 |
| `data-file-template.md` | 새 덱 파일 boilerplate | 덱 생성 시 |

---

## 콘텐츠 밀도 가이드

스크롤이 없으므로 한 슬라이드에 넣을 수 있는 양에 물리적 한계가 있다.

| 레이아웃 | 안전 상한 |
|---------|----------|
| HSplit 2컬럼 | 각 컬럼 DescList 4항목, List 5~6항목 |
| HSplit 3컬럼 | 각 컬럼 TypoStack headline+body 1세트 |
| Grid 2×2 | 4셀, 각 셀 TypoStack headline+body |
| Grid 3×? | 3컬럼은 한 행만 안전 |
| Message | 1~2문장 |
| ChapterTitle | toc 6~7항목 |

넘치면 슬라이드를 나눈다. 억지로 우겨넣지 않는다.

# Experiment: Claude Code 해부 — UX 설계 문서

> `/experiment/claude-code` 인터랙티브 스토리텔링 페이지의 UX 설계, 컴포넌트 전략, 데이터 아키텍처를 정의한다.
> 작성일: 2026-04-01

---

## 1. 페이지 정의

### 한 문장
AI 코딩 도구 소스 코드 512K LOC 유출 분석을, 스크롤-드리븐 빙산 다이브로 체험하는 인터랙티브 스토리텔링.

### Experiment 페이지 내 위치
```
/experiment                      ← 갤러리 (카드 1개 추가)
/experiment/claude-code          ← 이 문서의 대상 페이지
```

### 핵심 메타포
**빙산 다이브** — 스크롤이 수심이다. 내려갈수록 어두워지고, 더 깊은 시스템이 드러난다.

| 수심 | 계층 | 명도 | 내러티브 |
|------|------|------|----------|
| 수면 위 | Prologue | `vdl-50` bg | 유출 사건 |
| 수면선 | — | monoline 1px 수평선 | 경계 |
| 얕은 물 | L1 Surface, Act 1 | `vdl-900` bg | 터미널의 동반자 |
| 중간 | L2 Engine, Act 2 | `vdl-900` bg, `vdl-800` accent | 1,297줄의 심장 |
| 깊은 물 | L3 Control, Act 3 | `vdl-950` bg, `vdl-800` accent | 보이지 않는 눈 |
| 심해 | L4 Future, Act 4–5 | `vdl-950` bg | 군단 + 자율 |
| 해저 | Epilogue | `vdl-950` → `vdl-900` bg | buddy/ |

---

## 2. 내러티브 구조 — 8개 섹션

### § 0. PROLOGUE — 유출

**목적:** 진입점. 밝은 배경에서 시작, 수면선을 넘어 다크로 전환.

| 요소 | 컴포넌트 | 내용 |
|------|----------|------|
| 날짜 | `Typography` display | `2026. 3. 31.` |
| 헤드라인 | `Typography` h1 | 512,000줄이 세상에 드러났다 |
| 본문 | `Typography` body1 | npm 소스맵 파일 하나. 프로덕션 빌드에서 제거했어야 할 것이 남아 있었다. |
| 수면선 | `IcebergWaterline` (신규) | monoline 1px 수평선. 스크롤 시 이 선을 지나면 배경 반전 |
| 스크롤 유도 | 아이콘 또는 미니멀 화살표 | ↓ |

**배경 전환:** `vdl-50` (밝은) → `vdl-950` (어두운). 수면선 기준.

**레이아웃:** 풀 뷰포트 높이. 수직 중앙 정렬. `SectionContainer` 사용.

---

### § 1. ACT 1 — 터미널의 동반자

**목적:** 독자가 아는 것 확인. 안전한 영역.

| 요소 | 컴포넌트 | 내용 |
|------|----------|------|
| 오버라인 | `Typography` overline | Act 1 · Surface |
| 태그라인 | `Typography` h2 | 터미널에 글자를 치면, 무엇이 일어날까요? |
| 도구 리스트 | `IcebergNodeList` (신규) | 11개 공개 도구 — monoline 불릿, 라벨+한 줄 설명 |
| 숫자 콜아웃 | `DataCallout` (신규) | `11` 공개 도구 · `87+` 슬래시 커맨드 |
| 트랜지션 | `Typography` body1, 단독 | "하지만 이게 전부가 아니었습니다" |

---

### § 2. ACT 2 — 1,297줄의 심장

**목적:** 첫 번째 놀라움. 엔진 내부 해부.

| 요소 | 컴포넌트 | 내용 |
|------|----------|------|
| 태그라인 | `Typography` h2 | 1,297줄의 코드가 당신의 한 줄을 기다리고 있었습니다 |
| 흐름도 | `MonolineDiagram` (신규) | QueryEngine 실행 루프: 입력 → API → 도구 루프 → 출력. SVG monoline |
| 숫자 콜아웃 | `DataCallout` ×3 | `1,297` 줄 QueryEngine / `915` 줄 시스템 프롬프트 / `40+` 도구 |
| 코드 블록 | `Typography` codeBlock | `async *submitMessage()` 시그니처 |
| 미니 그래프 | `IcebergMiniGraph` (신규) | L2 엔진 도메인 노드 7개 + 연결선. graph-data.json 부분 렌더 |
| Reveal | `RevealCard` (신규) | "6계층 기억 체계" — CLAUDE.md 계층 다이어그램 |

---

### § 3. ACT 3 — 보이지 않는 눈

**목적:** 긴장감. 관찰/제어 시스템 폭로.

| 요소 | 컴포넌트 | 내용 |
|------|----------|------|
| 태그라인 | `Typography` h2 | 당신이 Claude를 사용하는 동안, Claude도 당신을 보고 있었습니다 |
| 데이터 그리드 | `DataCallout` ×3, `LineGrid` | `651+` 추적 이벤트 / `60+` 피처 플래그 / `30+` 보안 패턴 |
| 순환 다이어그램 | `MonolineDiagram` | 사용자→OTEL→BigQuery→GrowthBook→Feature Flags→사용자. 순환 화살표 |
| 미니 그래프 | `IcebergMiniGraph` | L3 감시/보안 도메인 노드 + 연결선 |
| Reveal ×2 | `RevealCard` | "가짜 도구로 경쟁사를 속인다" + "Undercover 모드" |
| 트랜지션 | `Typography` body1 | "관찰만 하는 게 아닙니다. 군단이 깨어나고 있습니다." |

---

### § 4. ACT 4 — 깨어나는 군단

**목적:** 클라이맥스 진입. 멀티에이전트 시스템.

| 요소 | 컴포넌트 | 내용 |
|------|----------|------|
| 태그라인 | `Typography` h2 | 하나의 Claude는 시작일 뿐이었습니다 |
| 시퀀스 다이어그램 | `MonolineDiagram` | Coordinator→Team Lead→Workers. 수직 타임라인 |
| 코드 인용 | `QuotedContainer` | `shutdown_rejected — "아직 작업 중입니다"` |
| 미니 그래프 | `IcebergMiniGraph` | L4 군단 도메인 노드 + 연결선 |
| Reveal | `RevealCard` | "tmux 창에서 뛰는 AI 군단" |
| 트랜지션 | `Typography` body1 | "군단은 명령을 기다립니다. 만약 스스로 깨어난다면?" |

---

### § 5. ACT 5 — 잠들지 않는 코드

**목적:** 절정. 자율 에이전트 진화.

| 요소 | 컴포넌트 | 내용 |
|------|----------|------|
| 태그라인 | `Typography` h2 | 내일, Claude는 당신이 부르기 전에 먼저 일어날 것입니다 |
| 진화 축 | `MonolineDiagram` | 수평 타임라인: 수동→예약→반응→능동→상주→자율 |
| 인용 블록 | `QuotedContainer` | "You are an autonomous agent." |
| 미니 그래프 | `IcebergMiniGraph` | L4 자율 도메인 노드 + 연결선 |
| Reveal ×2 | `RevealCard` | "5분 캐시 균형" + "사용자가 보고 있는지 안다" |
| 트랜지션 | `Typography` body1 | "512,000줄 속에는 한 가지 더 숨겨진 것이 있습니다." |

---

### § 6. EPILOGUE — buddy/

**목적:** 감성적 해소. 여운.

| 요소 | 컴포넌트 | 내용 |
|------|----------|------|
| 태그라인 | `Typography` h2 | 512,000줄 속에서, 개발자들은 친구를 만들고 있었습니다 |
| ASCII 갤러리 | `AsciiGallery` (신규) | 18종 monospace 코드 블록 그리드 |
| 코드 인용 | `Typography` code | `SALT = 'friend-2026-401'` |
| 본문 | `Typography` body1 | friend + 2026 + 401. 모든 buddy의 DNA에 'friend'가 새겨져 있다. |

---

### § 7. OUTRO — 클로징

**목적:** 전체 요약 + 갤러리 복귀.

| 요소 | 컴포넌트 | 내용 |
|------|----------|------|
| 태그라인 | `Typography` h3 | 당신이 채팅하는 동안, 그 아래에서는 — |
| 숫자 요약 | `DataCallout` 그리드 | 512K LOC / 90 시스템 / 11 도메인 / 21 서프라이즈 |
| CTA | `CourseCTABlock` 또는 링크 | ← 실험 갤러리로 돌아가기 |

---

## 3. 컴포넌트 전략

### 3.1 재활용 (As-Is)

기존 컴포넌트를 props 변경 없이 그대로 사용.

| 컴포넌트 | 경로 | 사용 위치 | 용법 |
|----------|------|-----------|------|
| `SectionContainer` | `container/` | 모든 섹션 래퍼 | `isFullWidth` 조합 |
| `PageContainer` | `layout/` | 페이지 최상위 래퍼 | children |
| `Typography` | MUI | 모든 텍스트 | variant + sx |
| `Divider` | MUI | 섹션 구분, 트랜지션 앞뒤 | `borderColor="divider"` |
| `QuotedContainer` | `typography/` | Act 4 코드 인용, Act 5 프롬프트 인용 | `position="inside"`, `quoteSize="md"` |
| `FadeTransition` | `motion/` | Reveal 진입, 섹션 텍스트 진입 | `isTriggerOnView`, `direction="up"` |
| `useInView` | `hooks/` | 현재 Act 감지, 스크롤 트리거 | `trigger: 'center'`, `isOnce: true` |
| `LineGrid` | `layout/` | 숫자 콜아웃 3열 배치 | `container`, responsive gap |
| `SplitScreen` | `layout/` | Reveal 내부 2열 레이아웃 | `ratio="50:50"`, `stackAt="sm"` |
| `GridBackground` | `dynamic-color/` | Prologue 배경 패턴 (선택적) | `variant="dot"`, 낮은 opacity |
| `StickyScrollContainer` | `scroll/` | 미니 그래프 고정 + 스크롤 연동 (선택적) | `scrollLength={2}` |

### 3.2 확장 (기존 컴포넌트 + 새 variant/props)

| 컴포넌트 | 현재 상태 | 필요한 확장 | 변경 규모 |
|----------|-----------|-------------|-----------|
| `CardContainer` | variant: outlined/elevation/ghost/filled/editorial | 신규 variant `reveal` 추가 — 초기 `opacity: 0.01`, 트리거 시 드러남. 강조선(좌측 1px accent) | sx 오버라이드로 대체 가능. variant 추가는 선택 |
| `SectionTitle` | headline + subtitle | `overline` prop 추가 (Act 번호 표시) | 작음. `overline` 1줄 추가 |

### 3.3 신규 제작

#### 3.3.1 `IcebergSection` — 빙산 섹션 래퍼

**카테고리:** `container/`
**역할:** 각 Act의 배경색, 명도, 트랜지션을 관리하는 섹션 래퍼.

| Prop | 타입 | 설명 |
|------|------|------|
| `depth` | `'surface' \| 'shallow' \| 'mid' \| 'deep' \| 'abyss'` | 빙산 수심 → 배경 명도 매핑 |
| `act` | `number \| 'prologue' \| 'epilogue'` | 내러티브 위치 |
| `transition` | `string` | 섹션 하단 트랜지션 텍스트 (없으면 미표시) |
| `children` | `node` | 섹션 내용 |
| `sx` | `object` | 추가 스타일 |

**명도 매핑:**
```
surface:  { bg: 'vdl-50',  text: 'vdl-950' }   ← Prologue (밝은)
shallow:  { bg: 'vdl-900', text: 'vdl-100' }   ← Act 1
mid:      { bg: 'vdl-900', text: 'vdl-100' }   ← Act 2
deep:     { bg: 'vdl-950', text: 'vdl-100' }   ← Act 3
abyss:    { bg: 'vdl-950', text: 'vdl-200' }   ← Act 4, 5, Epilogue
```

**내부 구조:**
```jsx
<Box sx={{ bgcolor, color, minHeight: '100vh', py: 12 }}>
  <SectionContainer>
    {/* overline: Act N · Layer */}
    {children}
    {/* transition text + divider */}
    {transition && (
      <FadeTransition isTriggerOnView direction="up">
        <Divider />
        <Typography variant="body1">{transition}</Typography>
      </FadeTransition>
    )}
  </SectionContainer>
</Box>
```

---

#### 3.3.2 `DataCallout` — 숫자 강조 블록

**카테고리:** `data-display/`
**역할:** 핵심 수치를 display 사이즈로 보여주고 캡션으로 설명.

| Prop | 타입 | 설명 |
|------|------|------|
| `value` | `string` | 표시할 숫자 또는 텍스트 (예: `"1,297"`, `"40+"`) |
| `caption` | `string` | 숫자 아래 캡션 (예: `"줄 QueryEngine"`) |
| `variant` | `'default' \| 'accent'` | accent: `text.secondary` → `vdl-200` 강조 |
| `sx` | `object` | 추가 스타일 |

**내부 구조:**
```jsx
<Box sx={{ textAlign: 'center' }}>
  <Typography variant="display" sx={{ color: variant === 'accent' ? 'secondary.main' : 'text.primary' }}>
    {value}
  </Typography>
  <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
    {caption}
  </Typography>
</Box>
```

**사용 예시:**
```jsx
<LineGrid container gap={4}>
  <DataCallout value="1,297" caption="줄 QueryEngine" />
  <DataCallout value="915" caption="줄 시스템 프롬프트" />
  <DataCallout value="40+" caption="도구" />
</LineGrid>
```

---

#### 3.3.3 `RevealCard` — 서프라이즈 공개 카드

**카테고리:** `card/`
**역할:** 스크롤 진입 시 드러나는 발견 포인트. reveals.json의 개별 항목 렌더.

| Prop | 타입 | 설명 |
|------|------|------|
| `title` | `string` | Reveal 제목 (예: "가짜 도구로 경쟁사를 속인다") |
| `description` | `string` | Reveal 설명 |
| `quote` | `string` | 핵심 인용구 (코드/수치) |
| `surpriseLevel` | `number` | 1–5 강도 → 시각적 강조 정도 |
| `sx` | `object` | 추가 스타일 |

**내부 구조:**
```jsx
<FadeTransition isTriggerOnView direction="up" delay={200}>
  <CardContainer variant="outlined" sx={{ borderLeft: '1px solid', borderLeftColor: 'text.secondary' }}>
    <Typography variant="overline" sx={{ color: 'text.secondary' }}>Discovery</Typography>
    <Typography variant="h4" sx={{ color: 'text.primary', mt: 1 }}>{title}</Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>{description}</Typography>
    {quote && (
      <Typography variant="code" sx={{ color: 'text.primary', mt: 2, display: 'block' }}>
        {quote}
      </Typography>
    )}
  </CardContainer>
</FadeTransition>
```

**surpriseLevel 시각 매핑:**
```
1–2: borderLeftColor = vdl-700  (미세)
3:   borderLeftColor = vdl-500  (보통)
4:   borderLeftColor = vdl-200  (강조)
5:   borderLeftColor = vdl-100  (최대)
```

---

#### 3.3.4 `MonolineDiagram` — 1px SVG 다이어그램

**카테고리:** `data-display/`
**역할:** monoline 스타일의 흐름도/타임라인/순환도. 재사용 가능한 SVG 래퍼.

| Prop | 타입 | 설명 |
|------|------|------|
| `variant` | `'flow' \| 'cycle' \| 'timeline' \| 'tree'` | 다이어그램 유형 |
| `nodes` | `Array<{ id, label, x?, y? }>` | 노드 목록 |
| `edges` | `Array<{ source, target, type? }>` | 연결선 목록 |
| `direction` | `'horizontal' \| 'vertical'` | 축 방향 |
| `isAnimated` | `boolean` | 스크롤 진입 시 draw 애니메이션 |
| `sx` | `object` | 추가 스타일 |

**스타일 규칙:**
- stroke: `var(--vdl-600)` (기본), `var(--vdl-200)` (강조)
- strokeWidth: `1px` (monoline.weight)
- strokeLinecap: `round`
- strokeLinejoin: `round`
- 노드: 원(r=4) + 라벨(IBM Plex Mono, 12px)
- 엣지 대시 패턴: 실선(실행), `4 4`(구성), `8 4`(제어)
- 화살표: 작은 삼각형 marker (4px)

**사용 다이어그램 목록 (3종):**

| Act | variant | 내용 |
|-----|---------|------|
| Act 2 | `flow` | QueryEngine 루프: 입력→API→도구루프→출력→(반복) |
| Act 3 | `cycle` | 감시 순환: 사용자→OTEL→BigQuery→GrowthBook→Flags→사용자 |
| Act 5 | `timeline` | 진화 축: 수동→예약→반응→능동→상주→자율 |

**Fallback (모바일):** `sm` 이하에서 다이어그램 대신 `ordered list` 텍스트로 대체.

---

#### 3.3.5 `IcebergMiniGraph` — 노드 관계 미니 그래프

**카테고리:** `data-display/`
**역할:** graph-data.json의 부분 집합을 렌더하는 미니 노드 그래프. 각 Act에 해당하는 도메인 노드만 표시.

| Prop | 타입 | 설명 |
|------|------|------|
| `nodes` | `Array<{ id, label, layer, category }>` | 표시할 노드 (acts.json의 highlight_nodes로 필터) |
| `edges` | `Array<{ source, target, type }>` | 해당 노드 간 연결선 |
| `domainColor` | `string` | 도메인 명도 (vdl 토큰 — 유채색 아님) |
| `isAnimated` | `boolean` | 스크롤 진입 시 노드 순차 등장 |
| `onNodeClick` | `function` | 노드 클릭 → 상세 팝업 (Phase 2) |
| `sx` | `object` | 추가 스타일 |

**시각 규칙:**
- 캔버스: `RatioContainer` ratio `16/9`로 비율 고정
- 노드: monoline 원(r=6) + 라벨 하단
- 엣지: monoline 1px, 곡선 (quadratic bezier)
- 배치: force-directed 아님. **사전 계산된 좌표** (data에 포함)
- 색상: 전부 achromatic — 노드 stroke `vdl-400`, 강조 노드 `vdl-200`

**유채색 금지.** domains.json의 `#4CAF50` 등은 무시. 명도 차이만 사용:
```
L1 노드 stroke: vdl-200  (밝음)
L2 노드 stroke: vdl-400
L3 노드 stroke: vdl-500
L4 노드 stroke: vdl-600  (어두움)
```

**모바일:** 노드 수 절반으로 축소 (highlight_nodes 상위 3–4개만).

---

#### 3.3.6 `IcebergWaterline` — 수면선

**카테고리:** `common/ui/` 또는 인라인 SVG
**역할:** Prologue 하단의 수면선 시각 요소. 스크롤 기준점.

| Prop | 타입 | 설명 |
|------|------|------|
| `sx` | `object` | 추가 스타일 |

**구현:**
- 단순 `Divider` + 미세한 CSS `transform` 애니메이션
- 또는 SVG 1px 수평선 + 작은 wave path
- `prefers-reduced-motion` 시 정지

---

#### 3.3.7 `AsciiGallery` — buddy 18종 갤러리

**카테고리:** `data-display/`
**역할:** 18종 ASCII 생명체를 monospace 그리드로 배치.

| Prop | 타입 | 설명 |
|------|------|------|
| `species` | `Array<{ id, name, ascii, rarity }>` | 18종 데이터 |
| `columns` | `number` | 열 수 (기본: 6, sm: 3, xs: 2) |
| `sx` | `object` | 추가 스타일 |

**구현:**
```jsx
<Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 2 }}>
  {species.map(s => (
    <Box key={s.id} sx={{ textAlign: 'center' }}>
      <Typography variant="codeBlock" sx={{ fontSize: '1.5rem', lineHeight: 1.2 }}>
        {s.ascii}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
        {s.name}
      </Typography>
    </Box>
  ))}
</Box>
```

---

## 4. 데이터 아키텍처

### 4.1 소스 데이터

모든 텍스트는 JSON 또는 data 파일에서 가져온다. 하드코딩 금지.

| 파일 | 위치 | 용도 |
|------|------|------|
| `acts.json` | `src/docs/claude-code-leak-docs/data/` | Act 제목, 태그라인, 트랜지션, highlight_nodes |
| `reveals.json` | 〃 | 21개 서프라이즈 포인트 |
| `graph-data.json` | 〃 | 90 노드, 95 엣지 (미니 그래프용) |
| `node-content.json` | 〃 | 노드별 한국어 설명, surprise, children |
| `domains.json` | 〃 | 11 도메인 정의 (색상은 무시, 라벨만 사용) |
| `edge-styles.json` | 〃 | 엣지 타입 → 대시 패턴 매핑 |

### 4.2 가공 데이터 파일 (신규)

| 파일 | 위치 | 역할 |
|------|------|------|
| `claudeCodeExperimentData.js` | `src/data/` | acts.json + reveals.json + 미니 그래프 좌표를 import/가공하여 컴포넌트에 전달하는 중간 레이어 |
| `buddySpecies.js` | `src/data/` | 18종 ASCII 스프라이트 + 이름 + 희귀도 데이터 |

### 4.3 데이터 흐름

```
[JSON 원본] ──import──→ [claudeCodeExperimentData.js] ──props──→ [page.jsx 서버 컴포넌트]
                                                                       │
                                                                  props 전달
                                                                       │
                                                              [클라이언트 컴포넌트들]
```

**page.jsx는 서버 컴포넌트.** JSON import와 데이터 가공은 서버에서. 클라이언트 컴포넌트는 가공된 props만 받는다.

---

## 5. 반응형 전략

| 요소 | Desktop (md+) | Mobile (xs–sm) |
|------|---------------|----------------|
| `DataCallout` 그리드 | 3열 (`LineGrid`) | 1열 스택 |
| `MonolineDiagram` | SVG 원본 | 대체 텍스트 리스트 (ordered list) |
| `IcebergMiniGraph` | 7–13개 노드 | 3–4개 주요 노드만 |
| `AsciiGallery` | 6열 | 2열 |
| `RevealCard` | 좌측 border accent + 넉넉한 패딩 | 풀 너비, 축소 패딩 |
| 섹션 간격 | `py: 12` (96px) | `py: 8` (64px) |
| `QuotedContainer` | `position="inside"` | `position="inside"` |

---

## 6. 인터랙션 설계

| 인터랙션 | 구현 | 컴포넌트 |
|----------|------|----------|
| 섹션 진입 시 텍스트 페이드업 | `FadeTransition isTriggerOnView` | 기존 |
| Reveal 카드 등장 | `FadeTransition isTriggerOnView delay={200}` | 기존 + RevealCard |
| 현재 Act 감지 | `useInView trigger="center"` per section | 기존 |
| 수면선 배경 전환 | CSS `background-color` transition (0.6s) | IcebergSection depth |
| 다이어그램 draw | SVG `stroke-dashoffset` 애니메이션 | MonolineDiagram |
| 미니 그래프 노드 순차 등장 | `transition-delay` per node (50ms interval) | IcebergMiniGraph |

**금지 애니메이션 (nextjs.md):**
- `width`, `height`, `margin`, `top`, `left` 변경 금지
- 초기 `opacity: 0` 금지 → `opacity: 0.01` 사용
- `prefers-reduced-motion` 필수 대응

---

## 7. 접근성

| 항목 | 대응 |
|------|------|
| 키보드 내비게이션 | 각 섹션에 `id` anchor, 키보드 포커스 가능 |
| 스크린 리더 | SVG 다이어그램에 `aria-label` + 숨긴 텍스트 대체 설명 |
| 색상 대비 | achromatic이므로 명도 대비만 확인. WCAG AA 기준 |
| 모션 감소 | `prefers-reduced-motion: reduce` → 모든 애니메이션 즉시 완료 |
| 다이어그램 대체 | 모바일 텍스트 리스트가 곧 접근성 대체 콘텐츠 |

---

## 8. 구현 순서

| Phase | 범위 | 컴포넌트 | 산출물 |
|-------|------|----------|--------|
| **1** | 8개 섹션 정적 타이포그래피 | `IcebergSection`, `DataCallout`, 기존 Typography/Divider | 스크롤 가능한 풀 내러티브 텍스트 |
| **2** | Reveal 카드 + 인터랙션 | `RevealCard`, FadeTransition 연결 | 21개 중 선별 8개 Reveal |
| **3** | Monoline 다이어그램 3종 | `MonolineDiagram` (flow, cycle, timeline) | Act 2, 3, 5 다이어그램 |
| **4** | 미니 그래프 | `IcebergMiniGraph` | Act별 도메인 노드 그래프 |
| **5** | Epilogue 갤러리 | `AsciiGallery` | buddy 18종 |
| **6** | 폴리시 | 수면선 애니메이션, 배경 전환 미세 조정, 모바일 QA | 최종 |

---

## 9. 파일 구조 (예상)

```
app/experiment/claude-code/
└── page.jsx                         ← 서버 컴포넌트

src/components/
├── container/
│   └── IcebergSection.jsx           ← 신규
├── data-display/
│   ├── DataCallout.jsx              ← 신규
│   ├── MonolineDiagram.jsx          ← 신규
│   ├── IcebergMiniGraph.jsx         ← 신규
│   └── AsciiGallery.jsx             ← 신규
└── card/
    └── RevealCard.jsx               ← 신규

src/data/
├── claudeCodeExperimentData.js      ← 신규 (데이터 가공 레이어)
└── buddySpecies.js                  ← 신규

src/stories/
├── Page/ExperimentClaudeCode.stories.jsx
└── Component/
    ├── DataCallout.stories.jsx
    ├── RevealCard.stories.jsx
    ├── MonolineDiagram.stories.jsx
    └── IcebergMiniGraph.stories.jsx
```

---

## 10. 이 문서의 의존 문서

| 참조 | 경로 | 참조 이유 |
|------|------|-----------|
| 빙산 세계관 원본 | `src/docs/claude-code-leak-docs/project-summary.md` | 전체 데이터 구조, 구현 가이드 |
| 5막 내러티브 | `src/docs/claude-code-leak-docs/storytelling-blueprint.md` | Act별 상세 내용 |
| 택소노미 | `src/docs/claude-code-leak-docs/taxonomy.md` | 도메인/노드 정의 |
| 디자인 시스템 | `src/docs/ux/design-system-optimization.md` | 토큰, 컴포넌트 규격 |
| 브랜드 톤 | `src/docs/ux/project-summary.md` | 톤 5축 (주도·정밀·절제·독립·본질) |
| 콘텐츠 규칙 | `src/docs/ux/contents.md` | 메시지 톤, 한글/영문 규칙 |

---

*v1.0 | 기반: claude-code-leak-docs 전체, design-system-optimization v1.1, project-summary v2.0*

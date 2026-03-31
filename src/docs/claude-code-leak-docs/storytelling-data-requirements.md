# 스토리텔링에 필요한 Raw Data 정의

> 인터랙티브 빙산 시각화를 실제로 구현하려면, 어떤 데이터가 어떤 형태로 필요한가?
> 현재 가진 것과 없는 것을 명확히 구분한다.

---

## 1. 스토리텔링의 5가지 순간

시각화를 사용하는 사람이 경험하는 순간별로 필요한 데이터가 다르다.

```
순간 ①  착지      — 빙산을 처음 본다. 수면 위/아래를 인식한다.
순간 ②  잠수      — 레이어를 내려가며 점점 깊은 곳을 탐험한다.
순간 ③  발견      — 노드를 클릭한다. 상세 패널이 열린다.
순간 ④  연결      — 엣지를 따라 다른 노드로 이동한다. 관계를 파악한다.
순간 ⑤  놀라움    — "이런 것까지?" 하는 반전 포인트를 만난다.
```

---

## 2. 순간별 필요 데이터

### 순간 ① 착지 — "빙산이 보인다"

**필요 데이터: 레이어 정의 + 도메인 그룹**

```jsonc
// 현재 graph-data.json에 있는 것
"layers": {
  "L1": { "name": "Surface", "color": "#4CAF50" }
  // ...
}

// 없는 것 ❌
// - 각 레이어의 한국어 태그라인
// - 도메인(11개) 그룹핑
// - 레이어 내 노드 수 카운트
// - 수면선 위치 정보
```

**필요 데이터셋: `layers`**
```jsonc
{
  "id": "L1",
  "name": "Surface",
  "name_ko": "표면",
  "tagline": "당신이 알고 있는 것",
  "color": "#4CAF50",
  "depth": 0,          // 시각적 Y위치 (0=수면)
  "node_count": 11,
  "domains": ["surface"]
}
```

**필요 데이터셋: `domains`**
```jsonc
{
  "id": "engine",
  "name_ko": "엔진",
  "layer": "L2",
  "color": "#2196F3",
  "icon": "⚙️",        // 또는 SVG path
  "description": "QueryEngine, 시스템 프롬프트, 도구 조립, 부팅",
  "node_ids": ["query_engine", "system_prompt", "tool_registry", ...]
}
```

> **현재 상태**: `layers` 부분적 존재 (color/name만). `domains` 없음. → taxonomy.md에 텍스트로만 정의되어 있고 machine-readable JSON은 없다.

---

### 순간 ② 잠수 — "레이어를 내려간다"

**필요 데이터: 내러티브 흐름 (Act 구조)**

```jsonc
// 없는 것 ❌ — 전부
{
  "acts": [
    {
      "id": 1,
      "title": "터미널의 동반자",
      "title_en": "Terminal Companion",
      "tagline": "터미널에 글자를 치면, 무엇이 일어날까요?",
      "layers": ["L1"],
      "domains": ["surface"],
      "highlight_nodes": ["cli_repl", "file_tools", "bash_tool", "agent_tool"],
      "transition": "하지만 이게 전부가 아니었습니다",
      "report": "reports/report-1_anatomy.md"
    },
    {
      "id": 2,
      "title": "1,297줄의 심장",
      "tagline": "1,297줄의 코드가 당신의 한 줄을 기다리고 있었습니다",
      "layers": ["L2"],
      "domains": ["engine", "memory", "runtime"],
      "highlight_nodes": ["query_engine", "system_prompt", "tool_registry", "compact_service"],
      "transition": "엔진은 완벽했습니다. 그런데 누가 이 엔진을 관찰하고 있을까요?",
      "report": "reports/report-1_anatomy.md"
    },
    // ...Act 3, 4, 5, Epilogue
  ]
}
```

> **현재 상태**: storytelling-blueprint.md에 텍스트로 존재하지만 **구조화된 JSON은 없다.** graph-data.json의 노드에 `act` 필드가 있어서 어떤 노드가 어떤 Act에 속하는지는 알 수 있지만, Act 자체의 메타데이터(태그라인, 전환 문구, 하이라이트 노드)는 없다.

---

### 순간 ③ 발견 — "노드를 클릭한다"

**필요 데이터: 노드 상세 정보**

이것이 **가장 치명적인 공백**이다. 현재 노드 데이터:

```jsonc
// 현재 있는 것 (6개 필드)
{
  "id": "query_engine",
  "label": "QueryEngine (1,297 lines)",
  "layer": "L2",
  "category": "engine",
  "act": 2,
  "file": "src/QueryEngine.ts"     // ← 5개 노드에만 있음
}

// 클릭 시 보여줘야 하는 것 ❌ — 전부 없음
{
  "id": "query_engine",
  "label": "QueryEngine",
  "subtitle": "1,297줄",
  "layer": "L2",
  "domain": "engine",              // ❌ category≠domain 명확하지 않음
  "act": 2,
  "file": "src/QueryEngine.ts",
  "lines": 1297,                   // ❌ 정수형 줄 수

  // --- 여기서부터 전부 없음 ---
  "description_ko": "핵심 실행 엔진. async generator 패턴으로 사용자 질문을 API 호출과 도구 루프를 통해 답변으로 변환한다.",
  "surprise": "1,297줄 — 46K줄로 알려졌지만 실제 핵심 클래스는 이것뿐이다.",
  "visibility": "hidden",          // public|hidden|secret|unreleased
  "details": [                     // Tier 2 자녀 목록
    { "id": "submit_message", "label": "submitMessage()", "description": "async generator 메인 루프" },
    { "id": "message_loop", "label": "Message Loop", "description": "7개 메시지 타입 분기" }
  ],
  "report_section": "reports/report-1_anatomy.md#12-심장부",
  "research_source": "research/R1-A_query-engine.md"
}
```

> **현재 상태**: 90개 노드 중 `description`, `surprise`, `visibility`, `details`, `report_section` 등이 **하나도 없다.** graph-data.json은 순수 토폴로지(위상) 데이터일 뿐, 스토리텔링 콘텐츠가 전혀 없다.

---

### 순간 ④ 연결 — "엣지를 따라간다"

**필요 데이터: 엣지 스타일 매핑**

```jsonc
// 현재 있는 것
{
  "source": "feature_flags",
  "target": "kairos",
  "type": "gates",
  "label": "KAIROS flag",
  "act": 5
}

// 없는 것 ❌
{
  // ...위 필드들 +
  "style": {                       // ❌ 시각 스타일
    "stroke": "#F44336",
    "dash": "8,4",
    "arrow": "lock",
    "width": 2
  },
  "description_ko": "KAIROS 피처 플래그가 false이면 이 시스템의 코드 자체가 빌드에서 제거된다"
}
```

또한 **엣지 type이 40+종으로 과도하게 분산**되어 있다:
```
gates: 12, triggers: 8, contains: 6, uses: 6, includes: 5, feeds: 5
... 나머지 34종은 각 1~3개 — 의미 있는 시각적 구분이 불가능
```

> **현재 상태**: 엣지 type→시각 스타일 매핑이 없다. type이 40+종이라 렌더링하려면 먼저 **상위 카테고리로 통합**해야 한다.

**엣지 타입 정규화 (필요 작업)**:

| 상위 타입 | 하위 타입 (현재) | 시각 스타일 |
|-----------|----------------|------------|
| `flow` (실행 흐름) | triggers, invokes, schedules, autonomously_triggers | 실선 녹색 → |
| `data` (데이터 흐름) | feeds, writes, reads, reads_writes, loads, exports_to | 파선 주황 → |
| `structure` (구조) | contains, includes, merges | 점선 회색 ◇ |
| `control` (제어) | gates, restricts, configures, controls, enforces, overridden_by | 이중선 빨강 🔒 |
| `dependency` (의존) | requires, uses, powers, enables | 실선 파랑 ○ |
| `security` (보안) | guards, sanitizes, validates, suppresses, injects | 점선 빨강 🛡 |
| `lifecycle` (생명주기) | creates, lifecycle, spawns, activates, disables | 순환 회색 ↻ |
| `modification` (변경) | modifies, builds, updates, renders, generates | 실선 보라 △ |

---

### 순간 ⑤ 놀라움 — "이런 것까지?"

**필요 데이터: 반전 포인트 정의**

```jsonc
// 없는 것 ❌ — 전부
{
  "reveals": [
    {
      "act": 2,
      "node": "query_engine",
      "type": "correction",        // 기존 인식 교정
      "before": "46,000줄의 거대한 엔진",
      "after": "실제로는 1,297줄. 나머지는 도구와 서비스다.",
      "impact": "critical"
    },
    {
      "act": 3,
      "node": "undercover_mode",
      "type": "discovery",          // 존재 자체가 놀라움
      "text": "공개 저장소에서 Claude Code는 자신이 AI라는 사실을 숨긴다.",
      "impact": "high"
    },
    {
      "act": 3,
      "node": "anti_distillation",
      "type": "discovery",
      "text": "API 응답에 가짜 도구(fake_tools)를 주입해 경쟁사의 모델 학습을 방해한다.",
      "impact": "critical"
    },
    {
      "act": 4,
      "node": "pane_backend",
      "type": "discovery",
      "text": "AI 에이전트가 tmux 세션을 열어 자기 자신의 복제본을 실행한다.",
      "impact": "high"
    },
    {
      "act": 5,
      "node": "terminal_focus",     // Tier 2 노드도 대상
      "type": "discovery",
      "text": "Claude는 당신이 터미널을 보고 있는지 아닌지를 감지한다 (DECSET 1004).",
      "impact": "critical"
    },
    {
      "act": 5,
      "node": "sleep_tool",
      "type": "engineering",        // 엔지니어링 정교함
      "text": "SleepTool은 정확히 5분 간격으로 깨어난다 — API 프롬프트 캐시 만료 시간에 맞춘 것.",
      "impact": "high"
    },
    {
      "act": "epilogue",
      "node": "gacha_rng",
      "type": "emotional",          // 감성적 반전
      "text": "SALT = 'friend-2026-401'. 당신의 버디는 'friend'라는 단어로부터 태어났다.",
      "impact": "critical"
    }
  ]
}
```

> **현재 상태**: 리포트에 "놀라운 포인트" 콜아웃이 텍스트로 존재하지만, **구조화된 reveal 데이터는 없다.**

---

## 3. 현재 보유 vs 필요 매트릭스

| 데이터셋 | 필요 이유 | 현재 상태 | 형태 |
|----------|-----------|-----------|------|
| **A. 레이어 정의** | 빙산 구역 렌더링 | ⚠️ 부분 | JSON (color/name만, tagline/depth 없음) |
| **B. 도메인 정의** | 노드 그룹핑, 색상 | ❌ 없음 | taxonomy.md에 텍스트만 |
| **C. 노드 토폴로지** | 그래프 구조 | ✅ 있음 | graph-data.json (90개) |
| **D. 노드 설명/내러티브** | 클릭 시 상세 패널 | ❌ 없음 | research/*.md에 산재 |
| **E. 노드 Tier 2 자녀** | 드릴다운 | ❌ 없음 | taxonomy.md에 테이블만 |
| **F. 엣지 토폴로지** | 관계선 렌더링 | ✅ 있음 | graph-data.json (95개) |
| **G. 엣지 스타일 매핑** | 선 색상/유형 | ❌ 없음 | blueprint.md에 텍스트만 |
| **H. 엣지 타입 정규화** | 40+종→8종 통합 | ❌ 없음 | — |
| **I. Act 구조** | 내러티브 흐름 | ❌ 없음 | blueprint.md에 텍스트만 |
| **J. 반전 포인트** | 놀라움 순간 | ❌ 없음 | reports/*.md에 산재 |
| **K. 엣지 설명** | 엣지 호버 설명 | ⚠️ 부분 | label 필드는 있지만 영문/간략 |

---

## 4. 필요한 최종 데이터 파일 설계

### 4.1 파일 구조

```
docs/data/
├── graph-data.json          ← 현재. 토폴로지만. 리팩토링 필요
│
├── 필요한 파일들:
├── domains.json             ← 11개 도메인 정의 (B)
├── acts.json                ← 6개 Act 구조 (I)
├── reveals.json             ← 반전 포인트 목록 (J)
├── edge-styles.json         ← 엣지 타입→스타일 매핑 (G, H)
└── node-content.json        ← 90개 노드의 설명/내러티브/자녀 (D, E)
```

### 4.2 각 파일의 스키마

#### `domains.json` — 11개 도메인
```jsonc
[
  {
    "id": "engine",
    "name_ko": "엔진",
    "name_en": "Engine",
    "layer": "L2",
    "color": "#2196F3",
    "description": "QueryEngine, 시스템 프롬프트, 도구 조립, 부팅",
    "node_ids": ["query_engine", "system_prompt", "tool_registry", "..."]
  }
]
```

#### `acts.json` — 내러티브 흐름
```jsonc
[
  {
    "act": 1,
    "title_ko": "터미널의 동반자",
    "tagline": "터미널에 글자를 치면, 무엇이 일어날까요?",
    "layers": ["L1"],
    "domains": ["surface"],
    "highlight_nodes": ["cli_repl", "bash_tool", "agent_tool"],
    "transition": "하지만 이게 전부가 아니었습니다",
    "report_path": "reports/report-1_anatomy.md"
  }
]
```

#### `reveals.json` — 반전 포인트
```jsonc
[
  {
    "act": 3,
    "node_id": "undercover_mode",
    "type": "discovery",
    "text_ko": "공개 저장소에서 Claude Code는 자신이 AI라는 사실을 숨긴다.",
    "impact": "critical"
  }
]
```

#### `edge-styles.json` — 엣지 스타일
```jsonc
{
  "type_groups": {
    "flow":      { "types": ["triggers","invokes","schedules","autonomously_triggers"],
                   "stroke": "#4CAF50", "dash": null, "arrow": "triangle", "width": 2 },
    "data":      { "types": ["feeds","writes","reads","reads_writes","loads"],
                   "stroke": "#FF9800", "dash": "6,3", "arrow": "triangle", "width": 1.5 },
    "structure": { "types": ["contains","includes","merges"],
                   "stroke": "#9E9E9E", "dash": "3,3", "arrow": "diamond", "width": 1 },
    "control":   { "types": ["gates","restricts","configures","controls","enforces","overridden_by"],
                   "stroke": "#F44336", "dash": null, "arrow": "lock", "width": 2.5 },
    "dependency":{ "types": ["requires","uses","powers","enables"],
                   "stroke": "#2196F3", "dash": null, "arrow": "circle", "width": 1.5 },
    "security":  { "types": ["guards","sanitizes","validates","suppresses","injects"],
                   "stroke": "#E91E63", "dash": "4,4", "arrow": "shield", "width": 1.5 },
    "lifecycle": { "types": ["creates","lifecycle","spawns","activates","disables"],
                   "stroke": "#607D8B", "dash": null, "arrow": "cycle", "width": 1 },
    "modify":    { "types": ["modifies","builds","updates","renders","generates"],
                   "stroke": "#9C27B0", "dash": null, "arrow": "triangle", "width": 1.5 }
  }
}
```

#### `node-content.json` — 노드별 콘텐츠 (가장 큰 작업)
```jsonc
{
  "query_engine": {
    "subtitle": "1,297줄",
    "description_ko": "핵심 실행 엔진. async generator 패턴의 submitMessage()가 사용자 질문을 API 호출 → 도구 루프 → 응답 스트리밍으로 변환한다. 5-gate 예산 시스템으로 토큰/비용/시간을 제어.",
    "surprise": "46K줄로 알려졌지만 실제 핵심 클래스는 1,297줄. 나머지는 도구와 서비스.",
    "visibility": "hidden",
    "file": "src/QueryEngine.ts",
    "lines": 1297,
    "research": "research/R1-A_query-engine.md",
    "report_section": "reports/report-1_anatomy.md#12-심장부",
    "children": [
      { "id": "submit_message", "label": "submitMessage()", "desc": "async generator 메인 루프" },
      { "id": "message_loop", "label": "Message Loop", "desc": "7개 메시지 타입 분기" },
      { "id": "session_persistence", "label": "Session Persistence", "desc": "crash-safe JSONL 저장" }
    ]
  },
  "undercover_mode": {
    "subtitle": "Identity Hiding",
    "description_ko": "공개 저장소에서 자동 활성화. 커밋 메시지와 PR에서 AI가 생성했다는 흔적을 모두 제거. 22개 Anthropic 내부 저장소에서만 비활성화.",
    "surprise": "사용자가 끌 수 있는 옵션이 없다 — 공개 저장소에서는 무조건 켜진다.",
    "visibility": "secret",
    "file": "src/utils/undercover.ts",
    "lines": 90,
    "research": "research/R3-D_security-protection.md",
    "report_section": "reports/report-2_watchtower.md#25-방패",
    "children": []
  }
  // ... 90개 노드 전부
}
```

---

## 5. graph-data.json은 어떻게 되나?

### 현재 역할 (토폴로지 전용)
```
graph-data.json = 노드 ID/좌표 + 엣지 연결
                  → 그래프의 "뼈대"
                  → 시각화 렌더러가 위치/연결을 그리는 데 사용
```

### 두 가지 선택지

**Option A: graph-data.json을 fat하게 확장**

모든 데이터를 한 파일에 넣는다. 파일이 커지지만 단일 fetch로 모든 데이터를 가져올 수 있다.

```
장점: 구현 단순 — fetch 1회
단점: 파일 크기 비대 (90 노드 × 300자 설명 = ~100KB+)
      콘텐츠 수정 시 전체 JSON 재로드
```

**Option B: graph-data.json은 뼈대 유지, 살은 별도 파일** (추천)

```
graph-data.json  — 토폴로지만 (현재 ~23KB)
node-content.json — 노드별 설명/내러티브/자녀 (~80KB 예상)
domains.json     — 도메인 정의 (~2KB)
acts.json        — 내러티브 흐름 (~3KB)
reveals.json     — 반전 포인트 (~3KB)
edge-styles.json — 시각 스타일 (~2KB)

장점: 관심사 분리 — 토폴로지/콘텐츠/스타일 독립 수정
      graph-data.json은 시각화 엔진만, node-content.json은 콘텐츠팀만 수정
단점: fetch 여러 번 (Promise.all로 해소 가능)
```

### 추천: Option B

```
시각화 엔진이 읽는 것:
  graph-data.json   → 노드 배치, 엣지 연결
  edge-styles.json  → 엣지 렌더링 스타일
  domains.json      → 영역 그룹핑, 색상

콘텐츠 엔진이 읽는 것:
  node-content.json → 클릭 시 상세 패널
  acts.json         → 가이드 투어 흐름
  reveals.json      → 놀라움 순간 트리거
```

---

## 6. 작업량 추정

| 데이터셋 | 작업 내용 | 소스 | 난이도 |
|----------|-----------|------|--------|
| `domains.json` | taxonomy.md §2 → JSON 변환 | taxonomy.md | 쉬움 (11항목 변환) |
| `acts.json` | blueprint 5막 구조 → JSON | storytelling-blueprint.md | 쉬움 (6항목 구성) |
| `edge-styles.json` | 40+ 타입 → 8개 그룹 정규화 | blueprint §4.3 + 이 문서 §2.④ | 중간 (매핑 설계) |
| `reveals.json` | 5개 리포트에서 "놀라운 포인트" 추출 | reports/*.md | 중간 (15~20개 추출) |
| `node-content.json` | **90개 노드 각각에 설명/서프라이즈/자녀 작성** | research/*.md + taxonomy.md | **가장 큰 작업** |
| `graph-data.json` 리팩토링 | domain 필드 추가, metadata 보강 | 현재 파일 + domains.json | 쉬움 (필드 추가) |

### 핵심 병목: `node-content.json`

90개 노드 × (description + surprise + children) = **수동 작성이 필요한 콘텐츠 작업**.
다만 15개 리서치 문서와 taxonomy.md에 대부분의 원재료가 있으므로, **추출+재구성** 작업이다.

---

## 7. 요약

```
현재 가진 것:
  ✅ 토폴로지 (90 노드, 95 엣지)          → graph-data.json
  ✅ 원재료 (15 리서치 + 5 리포트)          → research/*.md, reports/*.md
  ✅ 택소노미 구조 (3계위, 260개 개념)       → taxonomy.md

없는 것:
  ❌ 노드별 한국어 설명/서프라이즈/자녀       → node-content.json 필요
  ❌ 도메인 정의 (machine-readable)          → domains.json 필요
  ❌ 내러티브 흐름 구조                       → acts.json 필요
  ❌ 반전 포인트 목록                         → reveals.json 필요
  ❌ 엣지 타입 정규화 + 스타일 매핑            → edge-styles.json 필요

한마디:
  graph-data.json은 "뼈"만 있고 "살"이 없다.
  스토리텔링에는 살이 필요하다.
```

---

*마지막 갱신: 2026-04-01*

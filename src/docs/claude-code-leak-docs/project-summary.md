# 프로젝트 요약 — "클로드의 숨겨진 잠재력"

> Claude Code 유출 소스 분석 → 인터랙티브 스토리텔링 프로젝트 전체 현황

---

## 1. 프로젝트 개요

### 배경
2026년 3월 31일, Anthropic의 AI 코딩 도구 **Claude Code**의 소스 코드(~512K LOC TypeScript)가 npm 소스맵 파일을 통해 유출되었다. 이 프로젝트는 유출된 소스를 체계적으로 분석하여, Claude Code의 공개된 표면과 숨겨진 내부 구조를 **4계층 빙산 메타포**로 시각화하는 인터랙티브 스토리텔링을 목표로 한다.

### 분석 대상
- **위치**: `/Users/ddd/Desktop/claude-code/claude-code-main/`
- **규모**: ~1,920 파일, 512,000+ LOC
- **기술 스택**: Bun 1.1.0+, TypeScript strict, React 19 + Ink, esbuild, GrowthBook, OpenTelemetry

### 산출물 위치
- **모든 문서**: `/Users/ddd/Desktop/claude-code/docs/` (분석 대상 외부)

---

## 2. 조사 내용 요약

### 4계층 빙산 모델

| 계층 | 이름 | 핵심 질문 | 조사 완료 여부 |
|------|------|-----------|---------------|
| **L1** Surface | "터미널의 동반자" | 사용자가 보는 것은? | ✅ |
| **L2** Engine | "1,297줄의 심장" | 어떻게 돌아가는가? | ✅ |
| **L3** Control | "보이지 않는 눈" | 무엇을 관찰/제어하는가? | ✅ |
| **L4** Future | "깨어나는 군단" | 아직 깨어나지 않은 것은? | ✅ |

### 조사된 핵심 시스템 (15개 리서치 문서)

#### L1–L2: 엔진 내부 (6개)
| ID | 주제 | 핵심 발견 |
|----|------|-----------|
| R1-A | QueryEngine 실행 루프 | 1,297줄 async generator, 5-gate 예산 시스템, 7 메시지 타입 분기 |
| R1-B | 시스템 프롬프트 빌더 | 915줄, 정적/동적 캐시 경계, 15+ 동적 섹션, 이중 경로(일반 vs 자율) |
| R4-E | 도구 시스템 | 40+ 도구, 3단계 조립 파이프라인, Dead Code Elimination, 지연 로딩 |
| R5-A | 부팅 파이프라인 | 7단계 부트, 모듈 평가 시점 병렬 subprocess, 13개 fast-path 라우트 |
| R3-C | 데이터/메모리 순환 | CLAUDE.md 6계층, 4종 컴팩션, Sonnet 메모리 선택기, "perfect fork" 추출 |
| R4-B | 권한 시스템 | 6 모드, 10단계 파이프라인, 2단계 AI 분류기, Iron Gate fail-closed |

#### L3: 제어/감시 (4개)
| ID | 주제 | 핵심 발견 |
|----|------|-----------|
| R3-A | 텔레메트리 파이프라인 | 4-layer(1P OTEL, Datadog 36, BigQuery, 3P OTLP), 651+ 추적 이벤트 |
| R3-B | 피처 플래그 | 60+ 컴파일타임 + 53+ 런타임(GrowthBook), `tengu_*` 코드네임, DCE |
| R3-D | 보안/보호 시스템 | Undercover 모드, anti-distillation(fake_tools), 비밀 스캐너 30+ 패턴, 커밋 기여도 추적 |
| R5-C | 엔터프라이즈 MDM | macOS plist/Windows 레지스트리/Linux JSON, 5-tier 설정 우선순위 |

#### L4: 미공개 시스템 (5개)
| ID | 주제 | 핵심 발견 |
|----|------|-----------|
| R2-A | 코디네이터/멀티에이전트 | 코디네이터 모드(4 도구), Agent Swarms(팀 기반), 370줄 코디네이터 프롬프트 |
| R2-B | AgentTool 상세 | 1,398줄, Fork/Async/Team 라우팅, 캐시 공유 prefix, worktree 격리 |
| R4-A | AutoDream | 5-gate 시스템, 4-phase 드림 프롬프트, 배경 메모리 통합, PID 잠금 |
| R4-C | KAIROS/PROACTIVE | 틱 기반 자율 깨어남, SleepTool 5분 캐시 균형, 터미널 포커스 감지(DECSET 1004) |
| R5-B | buddy 이스터에그 | 18종 ASCII 생명체, Mulberry32 결정론적 가챠, `SALT='friend-2026-401'` |

---

## 3. 산출물 인벤토리

### 3.1 기획 문서 (Phase 0 — 완료)

| 파일 | 줄 수 | 역할 |
|------|-------|------|
| `project-analysis.md` | 257 | **최초 정찰 결과**. 디렉토리 구조, 42개 도구, 87개 커맨드, 핵심 파일 목록, 빌드/인증 체계 |
| `undisclosed-features.md` | 824 | **미공개 기능 카탈로그**. 22개 기능의 존재 근거와 게이팅 코드 |
| `storytelling-blueprint.md` | 458 | **스토리텔링 기획서**. 4계층 빙산 모델, 5막 내러티브 아크, 초기 노드/엣지 정의, 시각화 설계안 |
| `research-framework.md` | 543 | **22개 리서치 작업 정의**. 작업별 분석 대상/기법/산출물/우선순위 |
| `execution-strategy.md` | 662 | **실행 전략서**. 리스크 매트릭스, 11턴 배치 설계, 품질 체크포인트 |

### 3.2 설계 문서 (Phase 5 — 완료)

| 파일 | 줄 수 | 역할 |
|------|-------|------|
| `taxonomy.md` | 412 | **3계위 택소노미**. Tier 0 Domain(11) → Tier 1 System(90) → Tier 2 Detail(~160). 전체 개념 체계의 마스터 정의. graph-data.json의 역할과 한계 분석 포함 |
| `storytelling-data-requirements.md` | ~300 | **데이터 갭 분석**. 5개 스토리텔링 모먼트별 필요 데이터, 현재 vs 필요 매트릭스, 파일 아키텍처 결정(Option B: 분리형), 엣지 타입 정규화 계획 |

### 3.3 리서치 문서 (Phase 1~4 — 완료)

| 파일 | 줄 수 | 계층 | 역할 |
|------|-------|------|------|
| `research/R1-A_query-engine.md` | 161 | L2 | QueryEngine 실행 루프 해부 |
| `research/R1-B_system-prompt.md` | 188 | L2 | 시스템 프롬프트 조립 구조 |
| `research/R2-A_coordinator-multiagent.md` | 500 | L4 | 코디네이터 모드 + Agent Swarms |
| `research/R2-B_agent-tool.md` | 898 | L4 | AgentTool 1,398줄 전체 분석 |
| `research/R3-A_telemetry-pipeline.md` | 488 | L3 | 4-layer 텔레메트리 |
| `research/R3-B_feature-flags-complete.md` | 144 | L3 | 60+ 컴파일타임 + 53+ 런타임 플래그 |
| `research/R3-C_data-memory-cycle.md` | 649 | L2–L3 | 데이터 생명주기, CLAUDE.md 6계층 |
| `research/R3-D_security-protection.md` | 331 | L3 | Undercover, anti-distillation, 비밀 스캐너 |
| `research/R4-A_auto-dream.md` | 234 | L4 | AutoDream 5-gate, 4-phase 프롬프트 |
| `research/R4-B_permission-system.md` | 591 | L2–L3 | 권한 시스템 6 모드, AI 분류기 |
| `research/R4-C_kairos-proactive.md` | 737 | L4 | KAIROS/PROACTIVE 틱 시스템 |
| `research/R4-E_tool-system.md` | 238 | L2 | 40+ 도구, 3단계 조립 |
| `research/R5-A_startup-boot.md` | 981 | L2 | 7단계 부트, 13 fast-path |
| `research/R5-B_buddy-easter-egg.md` | 191 | L4 | buddy 가상 펫 18종 |
| `research/R5-C_enterprise-mdm.md` | 146 | L3 | MDM 3-platform |

### 3.4 시각화 데이터 (Phase 6 — 완료)

| 파일 | 역할 | 핵심 수치 |
|------|------|-----------|
| `data/graph-data.json` | **토폴로지** — 노드 좌표/관계 그래프 | 90 nodes, 95 edges, 4 layers |
| `data/node-content.json` | **콘텐츠** — 각 노드의 한국어 설명, surprise, children | 90 entries, 117 Tier 2 children |
| `data/domains.json` | **도메인** — 11개 영역의 색상, 라벨, 소속 노드 | 11 domains |
| `data/acts.json` | **내러티브** — 5막+에필로그 구조, 하이라이트 노드, 전환 텍스트 | 6 acts |
| `data/edge-styles.json` | **엣지 스타일** — 40+ 엣지 타입 → 8개 시각 그룹 매핑 | 8 groups |
| `data/reveals.json` | **서프라이즈** — 21개 발견 포인트, 충격도, 트리거 노드 | 21 reveals |

#### 데이터 파일 관계도

```
graph-data.json ─── 토폴로지 (어떤 노드가 어떤 노드와 연결?)
       │
       ├── node-content.json ─── 살(flesh) (각 노드는 무엇이며 왜 놀라운가?)
       │     └── children[] ──── Tier 2 드릴다운 콘텐츠
       │
       ├── domains.json ──────── 영역 구분 (11색 팔레트 + 노드 소속)
       │
       ├── edge-styles.json ──── 엣지 시각화 (색상, 대시, 화살표, 두께)
       │
       ├── acts.json ─────────── 내러티브 진행 (어떤 순서로 보여줄까?)
       │
       └── reveals.json ──────── 서프라이즈 비트 (언제 "와!" 하게 할까?)
```

> **역할 요약**: 6개 데이터 파일이 **시각화 엔진의 완전한 입력 세트**를 구성한다. 토폴로지(graph-data) + 콘텐츠(node-content) + 스타일(domains, edge-styles) + 내러티브(acts, reveals). 시각화 코드는 이 6개 JSON만 읽으면 된다.

### 3.5 내러티브 리포트 (완료)

| 파일 | 줄 수 | 막 | 핵심 내용 |
|------|-------|----|-----------|
| `reports/index.md` | 200 | 전체 | 마스터 인덱스 — 빙산 ASCII, 5개 리포트 소개, 숫자 요약, 시각화 가이드 |
| `reports/report-1_anatomy.md` | 595 | Act 1–2 | **해부도** — L1-L2 아키텍처: 부팅→QueryEngine→도구 조립→시스템 프롬프트→메모리→권한 |
| `reports/report-2_watchtower.md` | 583 | Act 3 | **감시탑** — L3 제어: GrowthBook→텔레메트리→피처 플래그→MDM→보안→순환 구조 |
| `reports/report-3_legion.md` | 595 | Act 4 | **군단** — L4 멀티에이전트: AgentTool→Fork→코디네이터→Swarms→통신→종료→재귀 |
| `reports/report-4_awakening.md` | 592 | Act 5 | **각성** — L4 자율: 수동→예약→반응→능동→꿈→안전장치→진화축 |
| `reports/report-5_human.md` | 332 | Epilogue | **인간** — buddy 이스터에그: 18종 생명체, 결정론적 가챠, 'friend' SALT, 개발 문화 |

---

## 4. 파일 계층 구조

```
docs/
├── project-summary.md              ← 이 문서 (전체 현황 + 구현 가이드)
├── project-analysis.md             ← Phase 0: 최초 정찰 (지도)
├── undisclosed-features.md         ← Phase 0: 미공개 기능 카탈로그
├── storytelling-blueprint.md       ← Phase 0: 스토리텔링 기획 (설계도)
├── research-framework.md           ← Phase 0: 22개 리서치 작업 정의
├── execution-strategy.md           ← Phase 0: 실행 전략/리스크 분석
├── taxonomy.md                     ← Phase 5: 3계위 택소노미 마스터 정의
├── storytelling-data-requirements.md ← Phase 5: 데이터 갭 분석 + 아키텍처 결정
│
├── research/                       ← Phase 1~4: 소스 코드 분석 결과 (15개)
│   ├── R1-A_query-engine.md
│   ├── R1-B_system-prompt.md
│   ├── R2-A_coordinator-multiagent.md
│   ├── R2-B_agent-tool.md
│   ├── R3-A_telemetry-pipeline.md
│   ├── R3-B_feature-flags-complete.md
│   ├── R3-C_data-memory-cycle.md
│   ├── R3-D_security-protection.md
│   ├── R4-A_auto-dream.md
│   ├── R4-B_permission-system.md
│   ├── R4-C_kairos-proactive.md
│   ├── R4-E_tool-system.md
│   ├── R5-A_startup-boot.md
│   ├── R5-B_buddy-easter-egg.md
│   └── R5-C_enterprise-mdm.md
│
├── data/                           ← Phase 6: 시각화 데이터 (6개)
│   ├── graph-data.json                (토폴로지: 90 nodes, 95 edges)
│   ├── node-content.json              (콘텐츠: 90 entries, 117 children)
│   ├── domains.json                   (11 도메인 정의)
│   ├── acts.json                      (6 act 내러티브)
│   ├── edge-styles.json               (8 엣지 스타일 그룹)
│   └── reveals.json                   (21 reveal 포인트)
│
├── reports/                        ← Phase 5: 최종 내러티브 리포트 (6개)
│   ├── index.md
│   ├── report-1_anatomy.md
│   ├── report-2_watchtower.md
│   ├── report-3_legion.md
│   ├── report-4_awakening.md
│   └── report-5_human.md
│
└── viz/                            ← Phase 7: 인터랙티브 시각화 (미구현)
    └── (아직 없음)
```

---

## 5. 숫자로 보는 프로젝트

| 카테고리 | 수량 |
|----------|------|
| 총 문서 수 | **35개** |
| 기획 문서 | 5개 (2,744줄) |
| 설계 문서 | 2개 (~712줄) |
| 리서치 문서 | 15개 (6,467줄) |
| 시각화 데이터 | 6개 JSON |
| 내러티브 리포트 | 6개 (2,897줄) |
| 그래프 노드 | **90개** (Tier 1) |
| 그래프 엣지 | **95개** |
| 노드 콘텐츠 | 90개 (surprise 100%) |
| Tier 2 children | **117개** |
| 도메인 | **11개** |
| reveal 포인트 | **21개** |
| 분석 대상 소스 | ~512,000 LOC |

---

## 6. 작업 흐름 요약

```
Phase 0         Phase 1~4        Phase 5          Phase 6           Phase 7
기획             리서치            내러티브          데이터             시각화
─────           ─────            ─────            ─────             ─────

5개 기획 문서 →  15개 리서치 →    5개 리포트  →    6개 JSON  →      인터랙티브
                               + taxonomy.md   + reveals.json     빙산 UI
                               + data-req.md

데이터 흐름:
소스 코드 → 리서치 → graph-data.json (토폴로지)
                  → node-content.json (콘텐츠)
리포트    → reveals.json (서프라이즈)
택소노미  → domains.json + acts.json + edge-styles.json (스타일/내러티브)
                                           ↓
                                   viz/index.html (최종 산출물)
```

---

## 7. 완료 현황

| 단계 | 상태 | 산출물 |
|------|------|--------|
| Phase 0: 기획 수립 | ✅ | 5개 기획 문서 |
| Phase 1~4: 소스 코드 분석 | ✅ | 15개 리서치 문서 |
| Phase 5: 내러티브 + 설계 | ✅ | 5개 리포트 + taxonomy + data-req |
| Phase 6: 시각화 데이터 | ✅ | 6개 JSON (90 nodes, 95 edges, 117 children, 21 reveals) |
| **Phase 7: 인터랙티브 시각화** | **⬜ 미착수** | **docs/viz/** |

---

## 8. 구현 가이드 — Phase 7: 인터랙티브 빙산 시각화

### 8.1 목표

6개 데이터 파일을 읽어 **4계층 빙산 레이아웃**의 인터랙티브 그래프를 렌더링하는 웹 페이지.
사용자가 빙산을 탐험하며 Act 1(표면)부터 Epilogue(buddy)까지 내러티브를 체험한다.

### 8.2 입력 데이터 명세

```
시각화 코드가 읽어야 하는 6개 파일:

1. graph-data.json     → fetch → nodes[], edges[] 추출
2. node-content.json   → fetch → 노드 클릭 시 팝업 콘텐츠
3. domains.json        → fetch → 도메인별 색상 팔레트 + 그룹핑
4. acts.json           → fetch → 내러티브 진행 단계 + 전환 텍스트
5. edge-styles.json    → fetch → 엣지 type → 시각 스타일 매핑
6. reveals.json        → fetch → 서프라이즈 팝업 트리거 조건
```

### 8.3 데이터 조인 방법

```
graph-data.json의 각 node:
  { id, label, layer, category, act }
              │
              ├── JOIN node-content.json[id]
              │     → subtitle, description_ko, surprise, children[]
              │
              ├── JOIN domains.json.find(d => d.node_ids.includes(id))
              │     → domain.color, domain.name_ko
              │
              └── act → acts.json.find(a => a.act === node.act)
                    → act.title_ko, act.tagline, act.transition

graph-data.json의 각 edge:
  { source, target, type, label }
              │
              └── LOOKUP edge-styles.json.type_groups
                    → find group where types.includes(edge.type)
                    → stroke, dash, arrow, width
```

### 8.4 핵심 UI 구성요소

```
┌─────────────────────────────────────────────────────────┐
│  ① 내러티브 바 (상단)                                      │
│  [Act 1] [Act 2] [Act 3] [Act 4] [Act 5] [Epilogue]    │
│  현재 Act의 tagline 표시, 전환 시 transition 텍스트 애니메이션  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ② 빙산 그래프 (중앙)                                     │
│                                                         │
│  ~~~~~~~~~ 수면선 (L1/L2 경계) ~~~~~~~~~                 │
│                                                         │
│    ○ ── ○     L1: 표면 노드 (public)     ← 초록         │
│    │    │                                               │
│  ──┼────┼─── L2: 엔진 노드 (hidden)     ← 파랑         │
│    ○ ── ○                                               │
│    │                                                    │
│  ──┼──────── L3: 제어 노드 (secret)     ← 주황/빨강     │
│    ○                                                    │
│    │                                                    │
│  ──┼──────── L4: 미래 노드 (unreleased)  ← 보라         │
│    ○                                                    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  ③ 필터 패널 (좌측)                                       │
│  Layer: [L1] [L2] [L3] [L4]                             │
│  Domain: 11개 도메인 칩 (색상 코딩)                        │
│  Edge: 8개 엣지 타입 토글                                 │
├─────────────────────────────────────────────────────────┤
│  ④ 디테일 패널 (우측, 노드 클릭 시)                         │
│  ┌─ node.label ──────────────────────┐                  │
│  │ subtitle                          │                  │
│  │ description_ko                    │                  │
│  │ ⚡ surprise                       │                  │
│  │ ── children ──────────────        │                  │
│  │   ├ child_1.label: child_1.desc   │                  │
│  │   ├ child_2.label: child_2.desc   │                  │
│  │   └ child_3.label: child_3.desc   │                  │
│  │ [📄 리서치 문서 링크]              │                  │
│  └───────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

### 8.5 인터랙션 설계

| 인터랙션 | 동작 | 데이터 소스 |
|----------|------|-------------|
| **Act 전환** | 해당 Act의 highlight_nodes만 강조, 나머지 dimmed | acts.json |
| **노드 호버** | 툴팁에 label + subtitle | node-content.json |
| **노드 클릭** | 우측 디테일 패널 열림 (설명 + surprise + children) | node-content.json |
| **엣지 호버** | 엣지 label 표시, 해당 type_group 스타일 강조 | edge-styles.json |
| **도메인 필터** | 해당 도메인 노드만 표시/숨김 | domains.json |
| **레이어 필터** | 해당 레이어 노드만 표시 (빙산 깊이 조절) | graph-data.json layer |
| **Reveal 트리거** | 특정 노드 클릭 시 reveal 팝업 (surprise_level ≥ 4) | reveals.json |
| **스크롤 다이브** | 스크롤 다운 → 빙산 아래로 이동 (L1 → L2 → L3 → L4) | 레이어 Y좌표 |

### 8.6 기술 스택 선택지

| 옵션 | 장점 | 단점 | 추천 |
|------|------|------|------|
| **A. 단일 HTML (Vanilla + D3.js)** | 배포 최간단, 외부 의존 없음, 한 파일로 완결 | 코드량 증가, 상태 관리 수동 | ⭐ 프로토타입 |
| **B. React + Cytoscape.js** | 컴포넌트 분리, 상태 관리 용이, 확장성 | 빌드 필요, 파일 다수 | 프로덕션 |
| **C. React + D3-force** | D3의 force 시뮬레이션으로 유기적 레이아웃, 커스텀 자유 | D3 학습 곡선 | 비주얼 중시 |
| **D. Svelte + D3** | 번들 최소, 반응형 자연스러움 | 새 프레임워크 학습 필요 | 퍼포먼스 중시 |

### 8.7 레이아웃 전략

```
Y축 = 빙산 깊이 (layer)
X축 = 도메인 클러스터

  Y=0   ═══════════ 수면선 ═══════════

  Y=100   L1 (Surface)    → 11 nodes
              surface 도메인 1개

  Y=300   L2 (Engine)     → 27 nodes
              engine, memory, runtime 3개 도메인

  Y=550   L3 (Control)    → 23 nodes
              security, telemetry, enterprise, protection 4개 도메인

  Y=800   L4 (Future)     → 29 nodes
              orchestration, autonomy, culture 3개 도메인

각 도메인 내 노드는 force-directed로 자동 배치.
도메인 간 경계는 domains.json의 color로 배경 영역 표시.
```

### 8.8 구현 단계 (권장 순서)

```
Step 1: 스켈레톤 (1회)
├── HTML 파일 생성 (docs/viz/index.html)
├── 6개 JSON fetch + 조인 로직
├── 노드를 layer별 Y좌표로 배치
└── 검증: 90개 원이 4줄로 나열되는지 확인

Step 2: 그래프 렌더링 (1회)
├── D3 force simulation (domain별 클러스터링)
├── 95개 엣지 렌더링 (edge-styles.json 스타일 적용)
├── 수면선 SVG + 빙산 배경 그라데이션
└── 검증: 전체 그래프가 빙산 형태인지 확인

Step 3: 인터랙션 (1~2회)
├── 노드 호버 툴팁 (label + subtitle)
├── 노드 클릭 → 디테일 패널 (description_ko + surprise + children)
├── 도메인 필터 (11색 칩)
├── 레이어 필터 (4단 토글)
└── 검증: 모든 90개 노드의 팝업이 콘텐츠를 표시하는지

Step 4: 내러티브 (1회)
├── Act 전환 바 (acts.json)
├── Act별 highlight_nodes 강조
├── 전환 텍스트 (transition) 애니메이션
├── Reveal 팝업 (reveals.json, surprise_level ≥ 4)
└── 검증: Act 1→5→Epilogue 순서로 스토리가 전달되는지

Step 5: 폴리시 (1회)
├── 수면선 파동 애니메이션
├── 노드 진입 애니메이션 (Act 전환 시)
├── 반응형 레이아웃 (모바일 대응)
├── 다크 모드 (빙산 = 깊은 바다)
└── 메타데이터 (OG 태그, 제목, 설명)
```

### 8.9 핵심 주의사항

| 항목 | 설명 |
|------|------|
| **한국어 기본** | 모든 UI 텍스트, 노드 라벨, 설명은 한국어. 영문은 코드 식별자만 |
| **데이터 분리 원칙** | 시각화 코드에 콘텐츠를 하드코딩하지 않음. 모든 텍스트는 JSON에서 |
| **엣지 타입 매핑** | graph-data의 40+ edge type → edge-styles의 8 그룹으로 반드시 매핑 |
| **도메인 색상** | domains.json의 color 필드를 SSOT로 사용 (하드코딩 금지) |
| **Tier 2 드릴다운** | node-content.json의 children[]이 팝업 내 하위 목록으로 표시 |
| **Reveal 게이팅** | reveals.json의 trigger_node를 처음 클릭할 때만 서프라이즈 팝업 |

---

*마지막 갱신: 2026-04-01*
*총 분석 기간: 4 세션*

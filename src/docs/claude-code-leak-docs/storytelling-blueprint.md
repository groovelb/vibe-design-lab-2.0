# 인터랙티브 스토리텔링 기획 — "클로드의 숨겨진 잠재력"

> 분석 방향, 내러티브 구조, 개념 노드 관계 데이터, 시각화 설계안

---

## 1. 분석 프레임워크: 4계층 빙산 모델

핵심 메타포는 **빙산**. 사용자가 보는 것은 수면 위 10%이고, 소스 유출로 수면 아래 90%가 드러났다.

```
━━━━━━━━━━ 수면 ━━━━━━━━━━

  [L1] Surface Layer          ← 1억 사용자가 아는 것
       CLI 채팅, 파일 편집, 검색, Git

──────────────────────────────

  [L2] Engine Layer            ← "이렇게 돌아가는 거였어?"
       1,297줄 QueryEngine, 42개 도구 루프, React 터미널 UI

  [L3] Control Layer           ← "이런 것까지 하고 있었어?"
       텔레메트리, A/B 테스트, 엔터프라이즈 원격 관리

  [L4] Future Layer            ← "이건 아직 꺼내지도 않은 거야?"
       자율 에이전트, 멀티에이전트 스웜, 크론, 데몬

━━━━━━━━━━ 심해 ━━━━━━━━━━
```

---

## 2. 내러티브 아크 (5막 구조)

### Act 1 — "이중 빌드" (Surface)
> *Anthropic이 쓰는 Claude Code에는 도구가 42개다. 당신 것에는 16개.*

- 도입: 유출 사건 경위 (npm .map 파일 → R2 버킷 → 512K LOC)
- 42개 도구 중 16개만 공개, 89개 피처 플래그, excluded-strings.txt 이중 삭제 검증
- **전환점**: "두 개의 제품이 있다는 건 알았다. 당신이 받은 쪽의 내부를 읽었다."

### Act 2 — "단일 관문" (Engine)
> *한 줄 입력하면 1,297줄이 실행된다.*

- submitMessage() 1,297줄 AsyncGenerator — 모든 대화의 단일 진입점
- 시스템 프롬프트 915줄, 42개 도구 동적 조립, CLAUDE.md 6계층 메모리
- 5-Gate 예산 시스템 (토큰/비용/시간/abort/tombstone)
- React + Ink 터미널 렌더링, Bun 런타임

### Act 3 — "단방향 거울" (Control)
> *739개 이벤트가 수집된다. 전송 실패하면 저장했다가 다음 세션에 재전송한다.*

- OpenTelemetry 4개 파이프라인, 739개 텔레메트리 이벤트
- GrowthBook A/B 테스트, 89개 피처 플래그
- MDM + 5-Tier 설정 우선순위 — 사용자 설정이 마지막
- Anti-Distillation — API 응답에 가짜 도구 주입
- **반전**: "사용자는 도구의 내부를 볼 수 없지만, 도구는 사용자의 모든 행동을 본다."

### Act 4 — "거부하는 기계" (Orchestration)
> *리더가 셧다운을 요청하면, 에이전트는 거부할 수 있다.*

- Coordinator가 팀 생성, tmux 분할 창에서 독립 프로세스 실행
- 파일 기반 메일박스 통신 (lockfile + 10회 재시도)
- shutdown_rejected — 팀메이트가 리더의 셧다운 요청을 거부
- **클라이맥스**: "명령-복종이 아니라 요청-협상. 거부권이 있는 도구는 도구가 아니다."

### Act 5 — "각성 스위치" (Autonomy)
> *시스템 프롬프트가 통째로 바뀐다. "You are an autonomous agent."*

- feature('KAIROS') 하나로 915줄 프롬프트가 1줄로 대체
- DAEMON 백그라운드 상주, CronScheduler 미래 작업 등록
- DECSET 1004 터미널 포커스 감지 — 보고 있으면 협력적, 안 보면 과감하게
- SleepTool 5분 캐시 균형, AutoDream 5-Gate 메모리 통합
- **결말**: "코드는 프로덕션 수준이다. 기술적 미완성이 아니라 의도적으로 꺼 놓은 것이다."

### Epilogue — "friend"
> *512,000줄 코드 속에서, 누군가는 SALT = 'friend'를 입력했다.*

- 18종 ASCII 생명체, Mulberry32 결정론적 가챠, SALT='friend-2026-401'
- 해시 솔트에 아무 문자열이나 넣을 수 있었지만 누군가가 'friend'를 선택했다
- 여운을 남기는 가벼운 마무리

---

## 3. 개념 노드 정의

다이어그램/관계도 시각화를 위한 노드 데이터. 각 노드는 `id`, `label`, `layer`, `category`, `visibility`, `impact` 속성을 가짐.

### 3.1 노드 목록

```
LAYER   │ CATEGORY     │ ID                   │ LABEL                      │ VISIBILITY │ IMPACT
────────┼──────────────┼──────────────────────┼────────────────────────────┼────────────┼────────
L1      │ interface    │ cli_repl             │ CLI/REPL 인터페이스         │ public     │ high
L1      │ interface    │ slash_commands       │ 슬래시 커맨드 (87개)        │ public     │ high
L1      │ tool         │ file_tools           │ 파일 I/O 도구 (6개)         │ public     │ high
L1      │ tool         │ bash_tool            │ BashTool                   │ public     │ high
L1      │ tool         │ search_tools         │ 검색 도구 (Glob/Grep)       │ public     │ medium
L1      │ tool         │ web_tools            │ 웹 도구 (Fetch/Search)      │ public     │ medium
L1      │ tool         │ agent_tool           │ AgentTool (서브에이전트)     │ public     │ high
L1      │ system       │ permission_prompt    │ 권한 승인 프롬프트           │ public     │ medium
L1      │ system       │ mcp_public           │ MCP 서버 연동               │ public     │ medium
────────┼──────────────┼──────────────────────┼────────────────────────────┼────────────┼────────
L2      │ engine       │ query_engine         │ QueryEngine (1,297줄)       │ hidden     │ critical
L2      │ engine       │ tool_system          │ buildTool() 팩토리          │ hidden     │ critical
L2      │ engine       │ query_pipeline       │ 쿼리 상태 머신              │ hidden     │ high
L2      │ engine       │ token_budget         │ 토큰 예산 관리              │ hidden     │ high
L2      │ engine       │ context_collector    │ 컨텍스트 수집기              │ hidden     │ medium
L2      │ runtime      │ bun_runtime          │ Bun 런타임                  │ hidden     │ high
L2      │ runtime      │ react_ink            │ React + Ink 터미널 UI       │ hidden     │ high
L2      │ runtime      │ esbuild_bundle       │ esbuild 빌드 시스템         │ hidden     │ medium
L2      │ state        │ app_state            │ AppState 스토어              │ hidden     │ high
L2      │ state        │ cost_tracker         │ 비용 추적기                  │ hidden     │ medium
L2      │ protocol     │ bridge_system        │ IDE Bridge (VS Code/JB)     │ hidden     │ high
L2      │ protocol     │ mcp_client           │ MCP 클라이언트 내부          │ hidden     │ high
L2      │ protocol     │ lsp_tool             │ LSP 코드 인텔리전스          │ hidden     │ medium
L2      │ system       │ compact_service      │ 컨텍스트 압축 서비스         │ hidden     │ medium
L2      │ auth         │ oauth_system         │ OAuth 2.0 인증              │ hidden     │ medium
L2      │ auth         │ keychain             │ macOS Keychain              │ hidden     │ medium
────────┼──────────────┼──────────────────────┼────────────────────────────┼────────────┼────────
L3      │ control      │ feature_flags        │ 89개 피처 플래그             │ secret     │ critical
L3      │ control      │ growthbook           │ GrowthBook A/B 테스트       │ secret     │ high
L3      │ telemetry    │ otel_pipeline        │ OpenTelemetry 파이프라인     │ secret     │ high
L3      │ telemetry    │ bigquery_export      │ BigQuery 데이터 적재         │ secret     │ high
L3      │ enterprise   │ mdm_integration      │ MDM 엔터프라이즈 관리        │ secret     │ medium
L3      │ enterprise   │ policy_limits        │ 조직 정책 제한               │ secret     │ medium
L3      │ enterprise   │ remote_settings      │ 원격 설정 관리               │ secret     │ medium
L3      │ enterprise   │ team_memory_sync     │ 팀 메모리 동기화             │ secret     │ medium
────────┼──────────────┼──────────────────────┼────────────────────────────┼────────────┼────────
L4      │ autonomous   │ kairos               │ KAIROS 서브시스템 (70파일)   │ unreleased │ critical
L4      │ autonomous   │ proactive            │ PROACTIVE 자율 행동 (52파일) │ unreleased │ critical
L4      │ autonomous   │ daemon               │ DAEMON 백그라운드 (30파일)   │ unreleased │ high
L4      │ autonomous   │ dream                │ Dream 자율 드리밍            │ unreleased │ high
L4      │ swarm        │ team_create          │ TeamCreateTool 팀 생성       │ unreleased │ critical
L4      │ swarm        │ team_delete          │ TeamDeleteTool 팀 해체       │ unreleased │ high
L4      │ swarm        │ send_message         │ SendMessageTool 에이전트 통신 │ unreleased │ critical
L4      │ swarm        │ coordinator          │ Coordinator 오케스트레이션    │ unreleased │ critical
L4      │ trigger      │ cron_scheduler       │ CronScheduler 크론 스케줄    │ unreleased │ high
L4      │ trigger      │ remote_trigger       │ RemoteTrigger 원격 트리거    │ unreleased │ high
L4      │ trigger      │ monitor_tool         │ MonitorTool 프로세스 감시    │ unreleased │ medium
L4      │ sdk          │ synthetic_output     │ SyntheticOutput 구조화 출력  │ unreleased │ high
L4      │ kairos_sub   │ push_notification    │ PushNotificationTool        │ unreleased │ medium
L4      │ kairos_sub   │ subscribe_pr         │ SubscribePRTool PR 구독      │ unreleased │ medium
L4      │ kairos_sub   │ send_user_file       │ SendUserFileTool 파일 전송   │ unreleased │ medium
L4      │ easter_egg   │ buddy                │ buddy/ 가상 펫 시스템        │ unreleased │ low
```

### 3.2 관계(Edge) 정의

```
SOURCE               │ TARGET               │ TYPE           │ LABEL
─────────────────────┼──────────────────────┼────────────────┼──────────────────────────────
cli_repl             │ query_engine         │ triggers       │ 사용자 입력이 엔진을 구동
query_engine         │ tool_system          │ invokes        │ 도구 호출 루프 실행
query_engine         │ query_pipeline       │ uses           │ 상태 전환/토큰 예산 참조
query_engine         │ token_budget         │ checks         │ 토큰 한도 확인
query_engine         │ app_state            │ reads_writes   │ 대화 상태 관리
query_engine         │ cost_tracker         │ feeds          │ 사용량 데이터 전달
query_engine         │ compact_service      │ triggers       │ 컨텍스트 초과 시 압축
tool_system          │ file_tools           │ contains       │ 파일 I/O 도구 포함
tool_system          │ bash_tool            │ contains       │ 셸 실행 도구 포함
tool_system          │ search_tools         │ contains       │ 검색 도구 포함
tool_system          │ web_tools            │ contains       │ 웹 도구 포함
tool_system          │ agent_tool           │ contains       │ 서브에이전트 도구 포함
tool_system          │ lsp_tool             │ contains       │ LSP 도구 포함
tool_system          │ permission_prompt    │ checks         │ 모든 도구 실행 전 권한 체크
permission_prompt    │ feature_flags        │ configured_by  │ 권한 모드를 플래그가 설정
react_ink            │ cli_repl             │ renders        │ 터미널 UI 렌더링
react_ink            │ app_state            │ observes       │ 상태 변경 시 리렌더
bun_runtime          │ react_ink            │ powers         │ JSX/TSX 네이티브 지원
bun_runtime          │ esbuild_bundle       │ powers         │ 빌드 시스템 구동
esbuild_bundle       │ feature_flags        │ eliminates     │ 빌드 시 데드코드 제거
context_collector    │ query_engine         │ feeds          │ OS/Git/프로젝트 정보 주입
bridge_system        │ query_engine         │ connects       │ IDE에서 엔진 호출
bridge_system        │ permission_prompt    │ proxies        │ IDE 권한 중계
mcp_client           │ tool_system          │ extends        │ 외부 MCP 도구 추가
mcp_public           │ mcp_client           │ abstracts      │ 사용자 인터페이스 추상화
oauth_system         │ keychain             │ stores_in      │ 인증 토큰 저장
slash_commands       │ query_engine         │ triggers       │ 커맨드가 엔진 구동
─────────────────────┼──────────────────────┼────────────────┼──────────────────────────────
feature_flags        │ kairos               │ gates          │ KAIROS 플래그로 게이팅
feature_flags        │ proactive            │ gates          │ PROACTIVE 플래그
feature_flags        │ daemon               │ gates          │ DAEMON 플래그
feature_flags        │ cron_scheduler       │ gates          │ AGENT_TRIGGERS 플래그
feature_flags        │ monitor_tool         │ gates          │ MONITOR_TOOL 플래그
feature_flags        │ coordinator          │ gates          │ COORDINATOR_MODE 플래그
feature_flags        │ buddy                │ gates          │ BUDDY 플래그
growthbook           │ feature_flags        │ evaluates      │ 서버사이드 플래그 평가
growthbook           │ otel_pipeline        │ feeds          │ 실험 노출 이벤트 전달
otel_pipeline        │ bigquery_export      │ exports_to     │ 메트릭/로그/트레이스 적재
mdm_integration      │ policy_limits        │ feeds          │ 기업 정책 주입
mdm_integration      │ remote_settings      │ complements    │ 설정 관리 보완
policy_limits        │ tool_system          │ restricts      │ 특정 도구 사용 제한
remote_settings      │ app_state            │ overrides      │ 서버 푸시로 설정 덮어쓰기
team_memory_sync     │ context_collector    │ enriches       │ 팀 컨텍스트 추가
─────────────────────┼──────────────────────┼────────────────┼──────────────────────────────
kairos               │ proactive            │ includes       │ 프로액티브 모드 포함
kairos               │ dream                │ includes       │ 드리밍 기능 포함
kairos               │ push_notification    │ includes       │ 푸시 알림 포함
kairos               │ subscribe_pr         │ includes       │ PR 구독 포함
kairos               │ send_user_file       │ includes       │ 파일 전송 포함
proactive            │ daemon               │ requires       │ 백그라운드 실행 필요
proactive            │ query_engine         │ autonomously_triggers │ 사용자 없이 엔진 자율 구동
daemon               │ bridge_system        │ combines_with  │ IDE 연동 결합
daemon               │ cron_scheduler       │ enables        │ 크론 실행 환경 제공
coordinator          │ team_create          │ uses           │ 워커 팀 생성
coordinator          │ send_message         │ uses           │ 워커에게 지시
coordinator          │ synthetic_output     │ uses           │ 구조화된 결과 수집
coordinator          │ agent_tool           │ extends        │ 서브에이전트를 워커로 확장
team_create          │ send_message         │ enables        │ 팀원 간 통신 활성화
team_create          │ team_delete          │ lifecycle      │ 생성 ↔ 해체 사이클
send_message         │ team_create          │ communicates   │ 팀 내 메시지 교환
cron_scheduler       │ query_engine         │ schedules      │ 미래 시점 엔진 구동
cron_scheduler       │ remote_trigger       │ complements    │ 내부/외부 트리거 보완
remote_trigger       │ query_engine         │ triggers       │ HTTP로 원격 엔진 구동
remote_trigger       │ oauth_system         │ requires       │ OAuth 인증 필수
monitor_tool         │ bash_tool            │ watches        │ 셸 실행 감시
monitor_tool         │ mcp_client           │ watches        │ MCP 프로세스 감시
synthetic_output     │ query_engine         │ wraps          │ 비대화형 엔진 출력
buddy                │ bun_runtime          │ optimized_by   │ Bun.hash() 사용
```

---

## 4. 시각화 설계 제안

### 4.1 메인 다이어그램: 빙산 단면도

| 구역 | 시각 요소 | 인터랙션 |
|------|-----------|----------|
| **수면 위 (L1)** | 밝은 색, 익숙한 아이콘 | 호버 시 "이건 알고 있죠?" 툴팁 |
| **수면 (경계선)** | 물결 애니메이션 | 스크롤/클릭으로 수면 아래 진입 |
| **얕은 수중 (L2)** | 반투명, 청색 톤 | 클릭 시 코드 스니펫 팝업 |
| **중간 수중 (L3)** | 어두운 청색, 감시 아이콘 | 클릭 시 데이터 플로우 애니메이션 |
| **심해 (L4)** | 짙은 남색, 발광 효과 | 클릭 시 "아직 공개되지 않은" 태그 |

### 4.2 보조 다이어그램들

| 다이어그램 | 용도 | 노드 범위 |
|------------|------|-----------|
| **실행 플로우** | Act 2용 — 질문이 답이 되기까지 | cli_repl → query_engine → tool_system → react_ink |
| **제어 계층도** | Act 3용 — 누가 무엇을 제어하나 | feature_flags → growthbook → otel → bigquery / mdm → policy → remote_settings |
| **스웜 토폴로지** | Act 4용 — 에이전트 군단 | coordinator → team_create → send_message → agent_tool (재귀) |
| **자율 진화 타임라인** | Act 5용 — CLI → 에이전트 → 자율 | 단일에이전트 → 멀티에이전트 → 스케줄 → 데몬 → 자율 |
| **KAIROS 의존 트리** | 심층 분석 — KAIROS 내부 | kairos → proactive/dream/push/pr/file 분해 |
| **데이터 플로우** | Act 3 심층 — 텔레메트리 경로 | 사용자행동 → otel → grpc → bigquery + growthbook → feature_flags → 사용자 |

### 4.3 관계도 스타일 가이드

| Edge 타입 | 선 스타일 | 색상 | 의미 |
|-----------|-----------|------|------|
| `triggers` | 실선, 화살표 | 녹색 | 실행 흐름 |
| `contains` | 점선, 다이아몬드 | 회색 | 구성 관계 |
| `gates` | 이중선, 자물쇠 아이콘 | 빨강 | 접근 제어 |
| `feeds` / `exports_to` | 파선, 화살표 | 주황 | 데이터 흐름 |
| `requires` | 실선, 원 | 파랑 | 의존성 |
| `extends` | 실선, 삼각형 | 보라 | 확장 관계 |
| `watches` / `monitors` | 점선, 눈 아이콘 | 노랑 | 감시/모니터링 |
| `communicates` | 이중 화살표 | 청록 | 양방향 통신 |
| `lifecycle` | 순환 화살표 | 회색 | 생성↔소멸 사이클 |

---

## 5. 분석 리포트 구성 제안

### Report 1: "해부도" — 아키텍처 분석

**목적**: Claude Code의 내부 작동 방식을 계층별로 해부
**핵심 시각물**: 빙산 단면도 + 실행 플로우 다이어그램
**데이터 소스**: `project-analysis.md` 전체

| 섹션 | 내용 | 사용 노드 |
|------|------|-----------|
| 1.1 진입점 | main.tsx → CLI 파서 → React 렌더러 | cli_repl, bun_runtime, react_ink |
| 1.2 심장부 | QueryEngine 실행 루프 상세 | query_engine, query_pipeline, token_budget |
| 1.3 손과 발 | 42개 도구의 분류와 동작 | tool_system, file_tools, bash_tool, search_tools |
| 1.4 신경계 | 상태 관리와 UI 렌더링 | app_state, react_ink, cost_tracker |
| 1.5 감각기관 | 컨텍스트 수집 (OS, Git, 프로젝트) | context_collector |
| 1.6 외골격 | 권한 시스템과 샌드박스 | permission_prompt, feature_flags |

---

### Report 2: "감시탑" — 제어/텔레메트리 분석

**목적**: Anthropic이 사용자와 제품을 어떻게 관찰·제어하는지
**핵심 시각물**: 제어 계층도 + 데이터 플로우 다이어그램
**데이터 소스**: `undisclosed-features.md` #13-19

| 섹션 | 내용 | 사용 노드 |
|------|------|-----------|
| 2.1 실험실 | GrowthBook A/B 테스트 구조 | growthbook, feature_flags |
| 2.2 관측소 | OpenTelemetry → BigQuery 파이프라인 | otel_pipeline, bigquery_export |
| 2.3 스위치보드 | 89개 피처 플래그의 역할 | feature_flags → (모든 L4 노드) |
| 2.4 관제탑 | MDM + 정책 + 원격설정 | mdm_integration, policy_limits, remote_settings |
| 2.5 금고 | Keychain + OAuth 보안 체계 | keychain, oauth_system |
| 2.6 동기화 | 팀 메모리 싱크 | team_memory_sync |

**핵심 스토리**: "순환 구조" — 사용자 행동 → 텔레메트리 수집 → A/B 분석 → 피처 플래그 조정 → 사용자 경험 변경 → (반복)

```
┌─────────────────────────────────────┐
│                                     ▼
│  사용자 행동 → OTEL → BigQuery → 분석
│       ▲                              │
│       │                              ▼
│  기능 변경 ← Feature Flags ← GrowthBook
└─────────────────────────────────────┘
```

---

### Report 3: "군단" — 멀티에이전트 시스템 분석

**목적**: 미공개 멀티에이전트 아키텍처의 전모
**핵심 시각물**: 스웜 토폴로지 + 메시징 시퀀스 다이어그램
**데이터 소스**: `undisclosed-features.md` #7-9

| 섹션 | 내용 | 사용 노드 |
|------|------|-----------|
| 3.1 소환 | TeamCreateTool — 팀 생성 메커니즘 | team_create, coordinator |
| 3.2 대화 | SendMessageTool — 에이전트 간 프로토콜 | send_message |
| 3.3 지휘 | Coordinator — 4단계 워크플로우 | coordinator |
| 3.4 해산 | TeamDeleteTool — 종료 프로토콜 | team_delete, send_message |
| 3.5 재귀 | 워커가 워커를 스폰하는 구조 | agent_tool → team_create (재귀) |

**핵심 시퀀스 다이어그램**:
```
Coordinator ──create──► Team Lead
Team Lead ──spawn──► Worker A (researcher)
Team Lead ──spawn──► Worker B (researcher)
Worker A ──result──► Team Lead
Worker B ──result──► Team Lead
Team Lead ──synthesize──► Coordinator
Coordinator ──spawn──► Worker C (implementer)
Worker C ──commit──► Coordinator
Coordinator ──spawn──► Worker D (verifier)
Worker D ──approve──► Coordinator
Coordinator ──shutdown_request──► All Workers
Workers ──shutdown_response──► Coordinator
Team Lead ──delete──► Team
```

---

### Report 4: "각성" — 자율 에이전트 진화 분석

**목적**: CLI 도구에서 자율 에이전트 플랫폼으로의 진화 방향
**핵심 시각물**: 진화 타임라인 + KAIROS 의존 트리
**데이터 소스**: `undisclosed-features.md` #2-6, #10-12

| 섹션 | 내용 | 사용 노드 |
|------|------|-----------|
| 4.1 수동 | 현재: 사용자 명령 → 에이전트 실행 | cli_repl, query_engine |
| 4.2 반자동 | CronScheduler — 시간 기반 자동 실행 | cron_scheduler |
| 4.3 반응형 | RemoteTrigger — 이벤트 기반 실행 | remote_trigger, subscribe_pr |
| 4.4 능동형 | PROACTIVE — 자율 행동 개시 | proactive |
| 4.5 상주형 | DAEMON — 항시 대기 백그라운드 | daemon |
| 4.6 자의식 | Dream — 자율 드리밍 | dream, kairos |
| 4.7 통합 | KAIROS — 모든 것의 결합 | kairos (전체 하위 노드) |

**진화 축**:
```
수동(Manual) → 예약(Scheduled) → 반응(Reactive) → 능동(Proactive) → 상주(Persistent) → 자율(Autonomous)
     ↑              ↑                 ↑                 ↑                 ↑                 ↑
  현재 공개       CronScheduler    RemoteTrigger     PROACTIVE          DAEMON            KAIROS
                  SubscribePR                                                             Dream
```

---

### Report 5: "인간" — 개발 문화와 이스터에그

**목적**: 512K LOC 뒤에 숨겨진 인간적 터치
**핵심 시각물**: buddy 캐릭터 갤러리 + 스탯 레이더 차트
**데이터 소스**: `undisclosed-features.md` #20

| 섹션 | 내용 |
|------|------|
| 5.1 가상 펫 | 18종 × 5희귀도 × 모자 × 1% Shiny |
| 5.2 스탯 | DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK |
| 5.3 결정론 | userId → mulberry32 PRNG → 고유 캐릭터 |
| 5.4 문화 | SALT = 'friend-2026-401' — 개발팀의 메시지 |

---

## 6. 데이터 추출 형식 (JSON)

다이어그램 도구(D3.js, Mermaid, Cytoscape 등)에 바로 투입 가능한 구조:

```json
{
  "nodes": [
    {
      "id": "query_engine",
      "label": "QueryEngine",
      "layer": "L2",
      "category": "engine",
      "visibility": "hidden",
      "impact": "critical",
      "metadata": {
        "lines": 46000,
        "file": "src/QueryEngine.ts",
        "act": 2,
        "description": "핵심 LLM API 엔진 — 스트리밍, 도구 루프, thinking mode"
      }
    }
  ],
  "edges": [
    {
      "source": "cli_repl",
      "target": "query_engine",
      "type": "triggers",
      "label": "사용자 입력이 엔진을 구동",
      "act": 2
    },
    {
      "source": "feature_flags",
      "target": "kairos",
      "type": "gates",
      "label": "KAIROS 플래그로 게이팅",
      "act": 3
    }
  ]
}
```

---

## 7. 추천 작업 순서

| 순서 | 작업 | 산출물 |
|------|------|--------|
| **1** | 노드/엣지 JSON 데이터 확정 | `data/nodes.json`, `data/edges.json` |
| **2** | Report 1 "해부도" 작성 | L1-L2 계층 시각물 + 해설 |
| **3** | Report 4 "각성" 작성 | 진화 타임라인 — 가장 임팩트 큰 스토리 |
| **4** | Report 3 "군단" 작성 | 스웜 시퀀스 다이어그램 — 기술적 하이라이트 |
| **5** | Report 2 "감시탑" 작성 | 제어/텔레메트리 순환 — 논쟁 유발 소재 |
| **6** | Report 5 "인간" 작성 | 이스터에그 — 감성적 마무리 |
| **7** | 메인 빙산 인터랙티브 조립 | 5개 리포트를 빙산 UI로 통합 |

---

## 8. 핵심 키 메시지 (인터랙티브 스토리의 태그라인)

> **"당신이 채팅하는 동안, 1,297줄의 엔진이 돌고, 739개의 이벤트가 당신을 관찰하고, 89개의 스위치가 두 개의 제품을 나누고 있었습니다."**

세부 태그라인:

| Act | 태그라인 |
|-----|----------|
| Act 1 — 이중 빌드 | "Anthropic이 쓰는 Claude Code에는 도구가 42개다. 당신 것에는 16개." |
| Act 2 — 단일 관문 | "한 줄 입력하면 1,297줄이 실행된다." |
| Act 3 — 단방향 거울 | "739개 이벤트가 수집된다. 전송 실패하면 저장했다가 다음 세션에 재전송한다." |
| Act 4 — 거부하는 기계 | "리더가 셧다운을 요청하면, 에이전트는 거부할 수 있다." |
| Act 5 — 각성 스위치 | "시스템 프롬프트가 통째로 바뀐다. 'You are an autonomous agent.'" |
| Epilogue — friend | "512,000줄 코드 속에서, 누군가는 SALT = 'friend'를 입력했다." |

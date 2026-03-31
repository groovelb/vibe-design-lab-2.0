# R5-A: 스타트업/부트 시퀀스 완전 분석

## 파일들
- `src/entrypoints/cli.tsx` (~300줄) — 최초 진입점, 빠른 경로 분기
- `src/main.tsx` (~4500줄) — 핵심 부트 오케스트레이터
- `src/entrypoints/init.ts` (~340줄) — 설정/네트워크/텔레메트리 초기화
- `src/bootstrap/state.ts` (~500줄) — 전역 상태 스토어
- `src/setup.ts` (~300줄) — 세션 설정 (worktree, UDS, git)
- `src/interactiveHelpers.tsx` (~300줄) — 셋업 스크린 시퀀스
- `src/replLauncher.tsx` (~23줄) — React/Ink 앱 마운트
- `src/ink.ts` (~87줄) — Ink 루트 생성 + ThemeProvider 래핑
- `src/entrypoints/mcp.ts` (~197줄) — MCP 서버 엔트리포인트
- `src/utils/startupProfiler.ts` — 스타트업 성능 프로파일링
- `src/utils/settings/mdm/rawRead.ts` — MDM 서브프로세스 병렬 발사
- `src/utils/secureStorage/keychainPrefetch.ts` — macOS 키체인 병렬 프리페치
- `src/services/analytics/growthbook.ts` — 피처 플래그 초기화
- `src/commands.ts` — 슬래시 커맨드 레지스트리

---

## 핵심 발견

### 1. 전체 부트 시퀀스 타임라인

Claude Code의 부트 시퀀스는 **7단계**로 구성되며, 극도로 최적화된 병렬 전략을 사용한다:

```
[Phase 0] cli.tsx 진입        ─── 빠른 경로 분기 (0~5ms)
[Phase 1] main.tsx 모듈 평가  ─── 병렬 서브프로세스 발사 + import (~135ms)
[Phase 2] Commander 등록      ─── CLI 옵션/서브커맨드 빌드
[Phase 3] preAction 훅        ─── MDM 대기 + init() + 마이그레이션
[Phase 4] action 핸들러       ─── 권한/도구/MCP/setup() 병렬화
[Phase 5] 셋업 스크린         ─── 신뢰/온보딩/OAuth 다이얼로그
[Phase 6] REPL 마운트         ─── React/Ink 앱 렌더 + 지연 프리페치
```

### 2. Phase 0: 최초 진입점 (cli.tsx)

`cli.tsx`는 **부트스트래핑 엔트리포인트**로, 무거운 `main.tsx` 로딩 전에 빠른 경로를 분기한다. 모든 import는 동적(`await import()`)이며, 각 경로는 필요한 모듈만 로드한다:

```typescript
// src/entrypoints/cli.tsx
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  // 빠른 경로 1: --version — 모듈 로딩 제로
  if (args[0] === '--version') {
    console.log(`${MACRO.VERSION} (Claude Code)`);
    return;
  }

  // 빠른 경로 2~12: 특수 모드 분기 (각각 동적 import)
  // ...

  // 빠른 경로에 해당하지 않으면 → 전체 CLI 로드
  startCapturingEarlyInput();        // 타이핑 캡처 시작
  const { main: cliMain } = await import('../main.js');  // ~135ms
  await cliMain();
}
void main();
```

**빠른 경로 전체 목록:**

| # | 조건 | 대상 모듈 | 설명 |
|---|------|----------|------|
| 1 | `--version` / `-v` / `-V` | 없음 (제로 import) | 빌드 타임 `MACRO.VERSION` 출력 |
| 2 | `--dump-system-prompt` | `config`, `model`, `prompts` | 시스템 프롬프트 추출 (ant-only) |
| 3 | `--claude-in-chrome-mcp` | `claudeInChrome/mcpServer` | Chrome MCP 서버 |
| 4 | `--chrome-native-host` | `claudeInChrome/chromeNativeHost` | Chrome Native Host |
| 5 | `--computer-use-mcp` | `computerUse/mcpServer` | Computer Use MCP (CHICAGO_MCP) |
| 6 | `--daemon-worker` | `daemon/workerRegistry` | 데몬 워커 (DAEMON) |
| 7 | `remote-control` / `bridge` | `bridge/bridgeMain` | 리모트 컨트롤 (BRIDGE_MODE) |
| 8 | `daemon` | `daemon/main` | 데몬 서브커맨드 (DAEMON) |
| 9 | `ps`/`logs`/`attach`/`kill`/`--bg` | `cli/bg` | 백그라운드 세션 (BG_SESSIONS) |
| 10 | `new`/`list`/`reply` | `cli/handlers/templateJobs` | 템플릿 (TEMPLATES) |
| 11 | `environment-runner` | `environment-runner/main` | BYOC 러너 |
| 12 | `self-hosted-runner` | `self-hosted-runner/main` | 셀프 호스팅 러너 |
| 13 | `--worktree --tmux` | `utils/worktree` | tmux worktree 전환 |

**환경 사전 설정** (cli.tsx 최상단, import 전 실행):
```typescript
// corepack auto-pinning 방지
process.env.COREPACK_ENABLE_AUTO_PIN = '0';

// CCR 환경에서 힙 크기 확대 (16GB 컨테이너)
if (process.env.CLAUDE_CODE_REMOTE === 'true') {
  process.env.NODE_OPTIONS = '--max-old-space-size=8192';
}

// Ablation baseline (내부 실험용, feature() DCE)
if (feature('ABLATION_BASELINE') && process.env.CLAUDE_CODE_ABLATION_BASELINE) {
  for (const k of ['CLAUDE_CODE_SIMPLE', 'CLAUDE_CODE_DISABLE_THINKING', ...]) {
    process.env[k] ??= '1';
  }
}
```

### 3. Phase 1: 모듈 평가 시 병렬 서브프로세스 발사

`main.tsx`의 **최상단 import 사이에** 3개의 사이드이펙트가 실행된다. 이것이 Claude Code 스타트업의 핵심 최적화다:

```typescript
// src/main.tsx (줄 1~20)

// 1. 프로파일 체크포인트 기록
import { profileCheckpoint } from './utils/startupProfiler.js';
profileCheckpoint('main_tsx_entry');

// 2. MDM 서브프로세스 발사 (plutil/reg query — ~135ms 걸리는 import와 병렬)
import { startMdmRawRead } from './utils/settings/mdm/rawRead.js';
startMdmRawRead();

// 3. macOS 키체인 프리페치 발사 (OAuth + 레거시 API 키 — 2개 병렬)
import { startKeychainPrefetch } from './utils/secureStorage/keychainPrefetch.js';
startKeychainPrefetch();

// ... 나머지 ~130개 import 문 (~135ms) ...

profileCheckpoint('main_tsx_imports_loaded');
```

**병렬화 전략 상세:**

| 서브프로세스 | 플랫폼 | 소요시간 | 병렬 대상 |
|---|---|---|---|
| `plutil` (plist → JSON) | macOS | ~30ms | import 평가 |
| `reg query` (HKLM/HKCU) | Windows | ~30ms | import 평가 |
| `security find-generic-password` (OAuth) | macOS | ~32ms | import 평가 |
| `security find-generic-password` (API key) | macOS | ~33ms | import 평가 |

**MDM rawRead 상세** (`rawRead.ts`):
```typescript
export function fireRawRead(): Promise<RawReadResult> {
  if (process.platform === 'darwin') {
    // macOS: 각 plist 경로에 대해 plutil 병렬 spawn
    const allResults = await Promise.all(
      getMacOSPlistPaths().map(path =>
        execFilePromise(PLUTIL_PATH, [...PLUTIL_ARGS_PREFIX, path])
      )
    );
    return { plistStdouts: allResults, hklmStdout: null, hkcuStdout: null };
  }
  if (process.platform === 'win32') {
    // Windows: HKLM + HKCU 레지스트리 병렬 쿼리
    const [hklm, hkcu] = await Promise.all([
      execFilePromise('reg', ['query', WINDOWS_REGISTRY_KEY_PATH_HKLM, ...]),
      execFilePromise('reg', ['query', WINDOWS_REGISTRY_KEY_PATH_HKCU, ...]),
    ]);
    return { plistStdouts: null, hklmStdout: hklm.stdout, hkcuStdout: hkcu.stdout };
  }
  return { plistStdouts: null, hklmStdout: null, hkcuStdout: null };  // Linux: MDM 없음
}
```

**키체인 프리페치 상세** (`keychainPrefetch.ts`):
```typescript
export function startKeychainPrefetch(): void {
  if (process.platform !== 'darwin' || isBareMode()) return;

  // 2개 키체인 항목을 동시에 읽기 (각각 ~32ms)
  const oauthSpawn = spawnSecurity(
    getMacOsKeychainStorageServiceName() + CREDENTIALS_SERVICE_SUFFIX
  );
  const legacySpawn = spawnSecurity(getMacOsKeychainStorageServiceName());

  prefetchPromise = Promise.all([oauthSpawn, legacySpawn])
    .then(([oauthResult, legacyResult]) => {
      // OAuth 결과 → primeKeychainCacheFromPrefetch()로 캐시 주입
      primeKeychainCacheFromPrefetch(oauthResult.stdout, oauthResult.timedOut);
      // 레거시 API 키 → legacyApiKeyPrefetch에 저장
      if (!legacyResult.timedOut) {
        legacyApiKeyPrefetch = { stdout: legacyResult.stdout };
      }
    });
}
```

기존에는 `applySafeConfigEnvironmentVariables()` 안에서 **순차적 동기 spawn**으로 ~65ms가 소요되었으나, 이 프리페치 패턴으로 **0ms** (import과 완전 병렬).

### 4. Phase 1.5: main() 함수 — 사전 결정

`main()`은 Commander 파싱 전에 전역 상태를 결정한다:

```typescript
export async function main() {
  // 1. 보안: Windows PATH hijack 방지
  process.env.NoDefaultCurrentDirectoryInExePath = '1';

  // 2. 경고 핸들러 + SIGINT/exit 핸들러 등록
  initializeWarningHandler();
  process.on('exit', () => resetCursor());
  process.on('SIGINT', () => { /* print 모드 제외 */ process.exit(0) });

  // 3. [DIRECT_CONNECT] cc:// URL argv 재작성
  // 4. [LODESTONE] --handle-uri 딥링크 처리
  // 5. [KAIROS] assistant 서브커맨드 argv 재작성
  // 6. [SSH_REMOTE] ssh 서브커맨드 argv 재작성

  // 7. isNonInteractive 조기 결정 (init() 전)
  const isNonInteractive = hasPrintFlag || hasInitOnlyFlag || hasSdkUrl || !process.stdout.isTTY;
  setIsInteractive(!isNonInteractive);

  // 8. 클라이언트 타입 결정
  const clientType = (() => {
    if (process.env.CLAUDE_CODE_ENTRYPOINT === 'sdk-ts') return 'sdk-typescript';
    if (process.env.CLAUDE_CODE_ENTRYPOINT === 'sdk-py') return 'sdk-python';
    if (process.env.CLAUDE_CODE_ENTRYPOINT === 'claude-vscode') return 'claude-vscode';
    if (process.env.CLAUDE_CODE_ENTRYPOINT === 'claude-desktop') return 'claude-desktop';
    if (process.env.CLAUDE_CODE_ENTRYPOINT === 'local-agent') return 'local-agent';
    if (process.env.CLAUDE_CODE_ENTRYPOINT === 'remote' || hasSessionToken) return 'remote';
    if (process.env.GITHUB_ACTIONS) return 'github-action';
    return 'cli';
  })();

  // 9. 설정 조기 로드 (eagerLoadSettings)
  // 10. await run() — Commander 등록 + 실행
}
```

**보안 차단: 디버거 감지** (Phase 1 모듈 평가 시):
```typescript
if ("external" !== 'ant' && isBeingDebugged()) {
  process.exit(1);  // 외부 빌드에서 디버거 연결 차단
}
```
- Node.js `--inspect`/`--debug` 플래그 감지
- `NODE_OPTIONS`의 inspect 플래그 감지
- `inspector.url()` 활성 여부 확인

### 5. Phase 2: Commander CLI 구조

`run()` 함수에서 Commander 프로그램을 빌드한다:

```typescript
async function run(): Promise<CommanderCommand> {
  const program = new CommanderCommand()
    .configureHelp(createSortedHelpConfig())
    .enablePositionalOptions();

  // preAction 훅 — 모든 커맨드 실행 전 초기화
  program.hook('preAction', async (thisCommand) => {
    await Promise.all([ensureMdmSettingsLoaded(), ensureKeychainPrefetchCompleted()]);
    await init();
    initSinks();
    runMigrations();
    void loadRemoteManagedSettings();
    void loadPolicyLimits();
  });

  // 메인 커맨드 (인터랙티브/비인터랙티브)
  program.name('claude')
    .argument('[prompt]')
    .option('-p, --print', ...)
    .option('-c, --continue', ...)
    .option('-r, --resume', ...)
    .option('--model <model>', ...)
    .option('--mcp-config <configs...>', ...)
    .option('--permission-mode <mode>', ...)
    .option('--dangerously-skip-permissions', ...)
    .action(async (prompt, options) => { /* Phase 4 */ });
}
```

**서브커맨드 트리:**

```
claude                          ── 메인 (인터랙티브 REPL / -p 헤드리스)
├── mcp                         ── MCP 서버 관리
│   ├── serve                   ── MCP 서버 시작
│   ├── add                     ── MCP 서버 추가 (interactive wizard)
│   ├── add-json <name> <json>  ── JSON으로 추가
│   ├── add-from-claude-desktop ── Claude Desktop에서 임포트
│   ├── remove <name>           ── 제거
│   ├── list                    ── 목록
│   ├── get <name>              ── 상세 조회
│   ├── reset-project-choices   ── 프로젝트 승인 리셋
│   └── xaa-idp-login           ── XAA IDP 로그인 (조건부)
├── auth                        ── 인증 관리
│   ├── login                   ── 로그인 (--email, --sso, --console, --claudeai)
│   ├── status                  ── 상태 확인 (--json, --text)
│   └── logout                  ── 로그아웃
├── plugin                      ── 플러그인 관리
│   ├── validate <path>
│   ├── list                    ── (--json, --available)
│   ├── install <plugin>
│   ├── uninstall <plugin>
│   ├── enable <plugin>
│   ├── disable [plugin]
│   ├── update <plugin>
│   └── marketplace             ── 마켓플레이스 관리
│       ├── add <source>
│       ├── list
│       ├── remove <name>
│       └── update [name]
├── server                      ── CC 세션 서버 (DIRECT_CONNECT)
├── open <cc-url>               ── CC 서버 연결 (DIRECT_CONNECT)
├── doctor                      ── 상태 진단 (auto-updater 포함)
├── update / upgrade            ── 업데이트 확인 + 설치
├── install [target]            ── 네이티브 빌드 설치
├── setup-token                 ── 인증 토큰 설정
├── agents                      ── 에이전트 목록
├── completion <shell>          ── 쉘 자동완성
├── auto-mode                   ── 오토 모드 설정 (TRANSCRIPT_CLASSIFIER)
│   ├── defaults
│   ├── config
│   └── critique
├── remote-control              ── 리모트 컨트롤 (BRIDGE_MODE)
├── assistant [sessionId]       ── 어시스턴트 모드 (KAIROS)
└── [ANT-ONLY]
    ├── up                      ── 로컬 dev 환경 초기화
    ├── log                     ── 대화 로그 관리
    ├── error                   ── 에러 로그 조회
    ├── export                  ── 대화 내보내기
    └── task                    ── 태스크 관리
        ├── create / list / get / update / dir
```

**인쇄 모드 최적화**: `-p` 플래그가 있으면 **서브커맨드 등록을 완전히 건너뛴다** (~65ms 절약):
```typescript
const isPrintMode = process.argv.includes('-p');
if (isPrintMode && !isCcUrl) {
  await program.parseAsync(process.argv);
  return program;  // 서브커맨드 등록 건너뜀
}
```

### 6. Phase 3: preAction 훅 — 초기화 체인

모든 커맨드(서브커맨드 포함) 실행 전에 `preAction` 훅이 실행된다:

```
preAction 시퀀스:
  │
  ├─ [1] await Promise.all([
  │      ensureMdmSettingsLoaded(),      ← Phase 1의 MDM 서브프로세스 완료 대기
  │      ensureKeychainPrefetchCompleted() ← Phase 1의 키체인 완료 대기
  │  ])                                   (거의 즉시 — 이미 병렬 실행됨)
  │
  ├─ [2] await init()                    ← 핵심 초기화 (memoized)
  │      ├─ enableConfigs()              ← 설정 시스템 활성화
  │      ├─ applySafeConfigEnvironmentVariables()  ← 안전한 환경변수만
  │      ├─ applyExtraCACertsFromConfig()          ← TLS 인증서 (BoringSSL 전)
  │      ├─ setupGracefulShutdown()      ← 종료 핸들러
  │      ├─ void Promise.all([           ← 1P 이벤트 + GrowthBook 연동 (비동기)
  │      │    initialize1PEventLogging(),
  │      │    growthbook.onGrowthBookRefresh(reinitialize)
  │      │ ])
  │      ├─ void populateOAuthAccountInfoIfNeeded() ← VSCode ext OAuth 보완
  │      ├─ void initJetBrainsDetection()   ← IDE 감지 (비동기 캐시)
  │      ├─ void detectCurrentRepository()  ← GitHub 저장소 감지 (gitDiff PR)
  │      ├─ initializeRemoteManagedSettingsLoadingPromise() ← 원격 설정 로드 시작
  │      ├─ initializePolicyLimitsLoadingPromise()          ← 정책 제한 로드 시작
  │      ├─ recordFirstStartTime()
  │      ├─ configureGlobalMTLS()        ← mTLS 설정 (동기)
  │      ├─ configureGlobalAgents()      ← HTTP 프록시 설정 (동기)
  │      ├─ preconnectAnthropicApi()     ← API TCP+TLS 핸드셰이크 시작 (~100-200ms overlap)
  │      ├─ [CCR] initUpstreamProxy()    ← 업스트림 프록시 (CONNECT relay)
  │      ├─ setShellIfWindows()
  │      ├─ registerCleanup(shutdownLspServerManager)
  │      ├─ registerCleanup(cleanupSessionTeams)  ← 스웜 팀 정리
  │      └─ ensureScratchpadDir()        ← scratchpad 디렉토리 (isScratchpadEnabled)
  │
  ├─ [3] initSinks()                    ← 분석 이벤트 싱크 등록 (logEvent 큐 드레인)
  │
  ├─ [4] setInlinePlugins(pluginDir)    ← --plugin-dir 전파
  │
  ├─ [5] runMigrations()               ← 설정 마이그레이션 (v11)
  │      ├─ migrateAutoUpdatesToSettings()
  │      ├─ migrateBypassPermissionsAcceptedToSettings()
  │      ├─ migrateEnableAllProjectMcpServersToSettings()
  │      ├─ resetProToOpusDefault()
  │      ├─ migrateSonnet1mToSonnet45()
  │      ├─ migrateLegacyOpusToCurrent()
  │      ├─ migrateSonnet45ToSonnet46()
  │      ├─ migrateOpusToOpus1m()
  │      ├─ migrateReplBridgeEnabledToRemoteControlAtStartup()
  │      ├─ resetAutoModeOptInForDefaultOffer()   (TRANSCRIPT_CLASSIFIER)
  │      └─ migrateFennecToOpus()                  (ant-only)
  │
  ├─ [6] void loadRemoteManagedSettings()  ← 엔터프라이즈 원격 설정 (비차단)
  ├─ [7] void loadPolicyLimits()           ← 정책 제한 (비차단)
  └─ [8] void uploadUserSettingsInBackground()  ← 설정 동기화 (UPLOAD_USER_SETTINGS)
```

**init() 함수의 핵심 특성:**
- `memoize()`로 감싸져 있어 **1회만 실행**
- `ConfigParseError` 시 인터랙티브 다이얼로그 표시 (`<InvalidConfigDialog />`)
- 헤드리스(non-interactive) 모드에서는 stderr 출력 + `gracefulShutdownSync(1)`
- 네트워크 설정 (mTLS, 프록시)이 **API preconnect 전에** 완료됨 — preconnect가 올바른 transport 사용
- **비동기 작업은 void로 발사** — init() 자체를 차단하지 않음
- `preconnectAnthropicApi()`는 프록시/mTLS/unix/cloud-provider 환경에서는 건너뜀 (SDK dispatcher와 풀 불일치)

### 7. Phase 4: 메인 액션 핸들러 — 병렬 초기화 전략

```
action() 핸들러 시퀀스:
  │
  ├─ [1] 옵션 파싱 및 검증
  │      ├─ --bare → CLAUDE_CODE_SIMPLE=1
  │      ├─ isNonInteractive 판별 (--print, --init-only, --sdk-url, !TTY)
  │      ├─ KAIROS 어시스턴트 모드 활성화 체크
  │      │    └─ kairosEnabled = assistantModule.isAssistantForced() || kairosGate.isKairosEnabled()
  │      ├─ 팀메이트 옵션 추출 (--agent-id, --agent-name, --team-name)
  │      ├─ MCP 설정 파싱 (--mcp-config: JSON 문자열 또는 파일 경로)
  │      ├─ Claude in Chrome 설정 (--chrome / --no-chrome)
  │      ├─ 권한 모드 결정 (initialPermissionModeFromCLI)
  │      └─ 채널 플래그 파싱 (--channels, --dangerously-load-development-channels)
  │
  ├─ [2] 도구 권한 초기화
  │      └─ initializeToolPermissionContext({
  │           allowedToolsCli, disallowedToolsCli, baseToolsCli,
  │           permissionMode, allowDangerouslySkipPermissions, addDirs
  │         })
  │         → toolPermissionContext + warnings + dangerousPermissions
  │
  ├─ [3] MCP 설정 조기 로드 (파일 읽기만, 실행 없음)
  │      ├─ claudeaiConfigPromise = fetchClaudeAIMcpConfigsIfEligible()   (-p && !bare)
  │      └─ mcpConfigPromise = getClaudeCodeMcpConfigs(dynamicMcpConfig)  (auto-discovery)
  │
  ├─ [4] setup() + commands/agents 병렬 로드
  │      ├─ initBuiltinPlugins()          ← 인메모리 등록 (<1ms)
  │      ├─ initBundledSkills()           ← 인메모리 등록 (<1ms)
  │      ├─ ┌── setupPromise = setup(...)        ~28ms (UDS 소켓 바인딩)
  │      │  ├── commandsPromise = getCommands()   파일 읽기 (병렬)
  │      │  └── agentDefsPromise = getAgentDefs() 파일 읽기 (병렬)
  │      └─ await setupPromise  (commands/agents는 나중에 join)
  │
  ├─ [5] 모델 결정
  │      ├─ [ant + cold cache] await initializeGrowthBook()  ← 모델 alias 해결
  │      ├─ userSpecifiedModel = options.model === 'default' ? getDefaultMainLoopModel() : options.model
  │      └─ setInitialMainLoopModel(resolvedInitialModel)
  │
  ├─ [6] await Promise.all([commandsPromise, agentDefsPromise])
  │      └─ commands + agents 조인 (setup과 병렬로 이미 시작)
  │
  ├─ [7] [인터랙티브] Ink 루트 생성 + 셋업 스크린
  │      ├─ installAsciicastRecorder()     (ant-only)
  │      ├─ createRoot(renderOptions)      ← Ink 인스턴스 생성
  │      ├─ logEvent('tengu_timer', ...)   ← 스타트업 시간 측정
  │      ├─ showSetupScreens() → Phase 5
  │      └─ initializeLspServerManager()   ← 신뢰 확립 후
  │
  ├─ [8] 스타트업 프리페치 (신뢰 후)
  │      ├─ checkQuotaStatus()
  │      ├─ fetchBootstrapData()
  │      ├─ prefetchPassesEligibility()
  │      ├─ prefetchFastModeStatus()
  │      └─ initializeVersionedPlugins()   ← 플러그인 V1→V2 마이그레이션
  │
  ├─ [9] MCP 서버 연결 (신뢰 확립 후)
  │      ├─ [인터랙티브] prefetchAllMcpResources(regularMcpConfigs)
  │      │   └─ MCP는 REPL 렌더를 차단하지 않음 (비동기 population)
  │      ├─ [헤드리스] await connectMcpBatch(configs)
  │      │   └─ 단일 턴이므로 연결 대기 필요
  │      ├─ claudeai MCP 연결 (5초 타임아웃, 중복 제거)
  │      └─ hooksPromise = processSessionStartHooks('startup')
  │
  └─ [10] 분기: 헤드리스(-p) → runHeadless() / 인터랙티브 → Phase 6
```

**setup() 함수 상세** (`setup.ts`):
```typescript
export async function setup(cwd, permissionMode, ...) {
  // 1. Node.js 버전 확인 (>= 18)
  // 2. 커스텀 세션 ID 설정
  // 3. [UDS_INBOX] UDS 메시징 서버 시작 (Unix domain socket ~20ms)
  //    └─ $CLAUDE_CODE_MESSAGING_SOCKET 환경변수 내보내기
  // 4. [에이전트 스웜] 팀메이트 모드 스냅샷 (bare가 아닐 때)
  // 5. [인터랙티브] 터미널 백업 복원 (iTerm2/Apple Terminal)
  // 6. setCwd(cwd)  ← 이후 모든 cwd 의존 코드의 기반
  // 7. captureHooksConfigSnapshot()  ← setCwd 후
  // 8. initializeFileChangedWatcher(cwd)
  // 9. [--worktree] worktree 생성/전환 + tmux 세션
  // 10. [!bare] initSessionMemory()  ← 동기, 훅 등록만
  // 11. [CONTEXT_COLLAPSE] initContextCollapse()
  // 12. void lockCurrentVersion()  ← auto-delete 방지
}
```

### 8. Phase 5: 셋업 스크린 시퀀스 (인터랙티브 전용)

`showSetupScreens()`는 **차단 다이얼로그 체인**으로, 각 단계에서 사용자 상호작용을 기다릴 수 있다:

```
showSetupScreens():
  │
  ├─ [1] 온보딩 (첫 실행 시)
  │      └─ <Onboarding onDone={completeOnboarding} />
  │
  ├─ [2] 신뢰 다이얼로그 (CLAUBBIT 아닌 경우)
  │      ├─ checkHasTrustDialogAccepted() → 이미 신뢰됨 → 건너뜀 (fast-path)
  │      └─ <TrustDialog commands={commands} onDone={done} />
  │
  ├─ [3] GrowthBook 재초기화 (신뢰 후)
  │      ├─ setSessionTrustAccepted(true)
  │      ├─ resetGrowthBook()       ← 기존 클라이언트 제거
  │      └─ void initializeGrowthBook()  ← auth 헤더와 함께 재생성
  │
  ├─ [4] 시스템 컨텍스트 프리페치 (신뢰 후 안전)
  │      └─ void getSystemContext()  ← git status/log/branch (훅 통한 코드 실행 가능)
  │
  ├─ [5] MCP .mcp.json 서버 승인
  │      └─ handleMcpjsonServerApprovals(root)
  │
  ├─ [6] CLAUDE.md 외부 include 경고
  │      └─ <ClaudeMdExternalIncludesDialog />
  │
  ├─ [7] GitHub 리포 경로 매핑 (신뢰 후)
  │      └─ void updateGithubRepoPathMapping()
  │
  ├─ [8] 환경변수 전체 적용
  │      └─ applyConfigEnvironmentVariables()
  │      (위험한 변수 포함 — LD_PRELOAD, PATH 등, 신뢰 후에만)
  │
  ├─ [9] 텔레메트리 초기화 (지연 — 첫 렌더 방해 방지)
  │      └─ setImmediate(() => initializeTelemetryAfterTrust())
  │
  ├─ [10] Grove 정책 다이얼로그 (자격 있는 경우)
  │       └─ <GroveDialog /> — escape → gracefulShutdownSync(0)
  │
  ├─ [11] 커스텀 API 키 승인 (ANTHROPIC_API_KEY 환경변수 감지)
  │       └─ <ApproveApiKey customApiKeyTruncated={...} />
  │
  ├─ [12] 위험한 권한 모드 경고
  │       └─ <BypassPermissionsModeDialog />
  │
  ├─ [13] 오토 모드 동의 (TRANSCRIPT_CLASSIFIER)
  │       └─ <AutoModeOptInDialog /> — decline → gracefulShutdownSync(1)
  │
  ├─ [14] 개발 채널 확인 (KAIROS/KAIROS_CHANNELS)
  │       ├─ checkGate_CACHED_OR_BLOCKING('tengu_harbor')
  │       └─ <DevChannelsDialog channels={devChannels} />
  │
  └─ [15] Chrome 온보딩 (첫 Claude in Chrome 사용 시)
         └─ <ClaudeInChromeOnboarding />
```

**보안 게이트**: `showSetupScreens()` 전에는 git 명령이 실행되지 않는다 (훅을 통한 코드 실행 방지). `prefetchSystemContextIfSafe()`는 신뢰가 확립되지 않은 인터랙티브 세션에서 건너뛴다.

**온보딩 후 서비스 새로고침** (신규 로그인 시):
```
void refreshRemoteManagedSettings()
void refreshPolicyLimits()
resetUserCache()
refreshGrowthBookAfterAuthChange()
void enrollTrustedDevice()  ← 리모트 컨트롤용
```

### 9. Phase 6: REPL 마운트 및 지연 프리페치

```typescript
// src/replLauncher.tsx
export async function launchRepl(root, appProps, replProps, renderAndRun) {
  const { App } = await import('./components/App.js');  // 동적 import
  const { REPL } = await import('./screens/REPL.js');   // 동적 import
  await renderAndRun(root, <App {...appProps}><REPL {...replProps} /></App>);
}

// src/interactiveHelpers.tsx
export async function renderAndRun(root, element) {
  root.render(element);            // React/Ink 렌더
  startDeferredPrefetches();       // 지연 프리페치 시작
  await root.waitUntilExit();      // 사용자가 종료할 때까지 대기
  await gracefulShutdown(0);
}
```

**Ink 루트 생성** (`ink.ts`):
```typescript
export async function createRoot(options?: RenderOptions): Promise<Root> {
  const root = await inkCreateRoot(options);
  return {
    ...root,
    render: node => root.render(withTheme(node)),  // ThemeProvider 자동 래핑
  };
}
```

**지연 프리페치** (`startDeferredPrefetches()`) — 첫 렌더 **이후** 실행:
```typescript
export function startDeferredPrefetches(): void {
  // --bare 또는 벤치마크 모드에서는 전부 건너뜀
  if (isEnvTruthy(process.env.CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER) || isBareMode()) return;

  // 프로세스 생성 프리페치 (사용자가 타이핑하는 동안 실행)
  void initUser();                          // 사용자 정보
  void getUserContext();                    // CLAUDE.md 파일 탐색
  prefetchSystemContextIfSafe();            // git status/log (신뢰 확인)
  void getRelevantTips();                   // 팁 로드
  void prefetchAwsCredentialsAndBedRockInfoIfSafe();  // AWS Bedrock
  void prefetchGcpCredentialsIfSafe();                 // GCP Vertex
  void countFilesRoundedRg(getCwd(), AbortSignal.timeout(3000), []);

  // 분석 및 피처 플래그
  void initializeAnalyticsGates();
  void prefetchOfficialMcpUrls();           // MCP 레지스트리
  void refreshModelCapabilities();

  // 파일 변경 감지기 (init()에서 지연됨 — 첫 렌더 차단 방지)
  void settingsChangeDetector.initialize();
  void skillChangeDetector.initialize();     // bare가 아닐 때만

  // [ant-only] 이벤트 루프 지연 감지기 (>500ms 블로킹 로깅)
  void import('./utils/eventLoopStallDetector.js')
    .then(m => m.startEventLoopStallDetector());
}
```

### 10. 인증/OAuth 초기화 경로

인증은 **여러 지점에서** 단계적으로 처리된다:

```
인증 초기화 타임라인:
  │
  [Phase 1] startKeychainPrefetch()
  │         ├─ OAuth 토큰 읽기 (macOS keychain, 비동기, ~32ms)
  │         │   └─ 서비스 이름: "Claude Code-credentials"
  │         └─ 레거시 API 키 읽기 (macOS keychain, 비동기, ~33ms)
  │             └─ 서비스 이름: "Claude Code"
  │
  [Phase 3] init()
  │         ├─ applySafeConfigEnvironmentVariables()
  │         │   └─ isRemoteManagedSettingsEligible() → 키체인 캐시 사용
  │         └─ void populateOAuthAccountInfoIfNeeded()
  │
  [Phase 5] showSetupScreens()
  │         ├─ 온보딩에서 로그인 → refreshGrowthBookAfterAuthChange()
  │         ├─ 커스텀 API 키 승인 → <ApproveApiKey />
  │         └─ 신뢰 확립 → GrowthBook에 auth 헤더 포함
  │
  [Phase 5+] 원격 설정 후
            └─ initializeTelemetryAfterTrust()
                ├─ isEligibleForRemoteManagedSettings() → 원격 설정 대기
                │   └─ applyConfigEnvironmentVariables() (원격 설정 포함)
                └─ doInitializeTelemetry() → setMeterState()
```

**인증 유형별 처리:**
- **API 키**: `ANTHROPIC_API_KEY` 환경변수 또는 `apiKeyHelper` 설정
- **OAuth**: macOS 키체인 → `Claude Code-credentials` 서비스 이름
- **Bedrock**: `CLAUDE_CODE_USE_BEDROCK` → `prefetchAwsCredentialsAndBedRockInfoIfSafe()`
- **Vertex**: `CLAUDE_CODE_USE_VERTEX` → `prefetchGcpCredentialsIfSafe()`
- **mTLS**: `configureGlobalMTLS()` → `CLAUDE_CODE_CLIENT_CERT`

### 11. GrowthBook (피처 플래그) 초기화 전략

GrowthBook 초기화는 **다단계**이며, 보안과 성능을 모두 고려한다:

```
GrowthBook 라이프사이클:
  │
  [Phase 1] 디스크 캐시 로드 (모듈 평가 시)
  │         └─ getGlobalConfig().cachedGrowthBookFeatures
  │             → getFeatureValue_CACHED_MAY_BE_STALE()가 즉시 참조
  │
  [Phase 5] 신뢰 후 초기화
  │         ├─ resetGrowthBook()       ← 기존 클라이언트 파괴
  │         └─ initializeGrowthBook()  ← auth 헤더 포함 재생성
  │             ├─ GrowthBook({ clientKey, remoteEval: true })
  │             ├─ client.init({ timeout: 5000 })  ← 서버 응답 대기
  │             └─ setupPeriodicGrowthBookRefresh() ← 주기적 새로고침
  │
  [런타임] 피처 값 읽기
            ├─ getFeatureValue_CACHED_MAY_BE_STALE(key, fallback)
            │   → 인메모리 페이로드 → 디스크 캐시 → fallback (블로킹 없음)
            ├─ checkGate_CACHED_OR_BLOCKING(gateName)
            │   → 캐시 hit → 즉시 반환 / 캐시 miss → init 대기 (최대 5초)
            └─ onGrowthBookRefresh(callback)
                → 피처 변경 시 콜백 (e.g., 1P 이벤트 재초기화)
```

**refreshGrowthBookAfterAuthChange()**: 로그인/로그아웃 시 클라이언트를 재생성하여 새로운 사용자 속성으로 피처 플래그 재평가.

### 12. 텔레메트리 초기화

```
텔레메트리 계층:
  │
  ├─ 1P 이벤트 로깅 (init() 내, 비동기)
  │   └─ initialize1PEventLogging()
  │       └─ LoggerProvider 생성 (OpenTelemetry sdk-logs)
  │       └─ onGrowthBookRefresh → reinitialize1PEventLoggingIfConfigChanged
  │
  ├─ Statsig (logEvent 호출)
  │   └─ initSinks() → 이벤트 큐 드레인 시작
  │
  └─ 3P OTLP 텔레메트리 (initializeTelemetryAfterTrust)
      └─ doInitializeTelemetry()
          ├─ telemetryInitialized 가드 (이중 초기화 방지)
          └─ setMeterState()
              └─ lazy import('instrumentation.js')  ← ~400KB 지연 로드
                  └─ initializeTelemetry()
                      └─ meter + createAttributedCounter
                          └─ getSessionCounter()?.add(1)
```

**지연 로드 전략**: OpenTelemetry (~400KB) + protobuf는 `initializeTelemetry()` 시점에만 동적 import. gRPC exporters (~700KB via @grpc/grpc-js)는 instrumentation.ts 내에서 추가 지연 로드.

**SDK/headless 특수 경로**:
```typescript
if (getIsNonInteractiveSession() && isBetaTracingEnabled()) {
  // Eager init — tracer가 첫 쿼리 전 준비되어야 함
  void doInitializeTelemetry();
}
// 이후 원격 설정 로드 → applyConfigEnvironmentVariables → 본 초기화
```

### 13. MCP 서버 엔트리포인트 (`entrypoints/mcp.ts`)

`claude mcp serve` 커맨드는 Claude Code를 MCP 서버로 노출한다:

```typescript
export async function startMCPServer(cwd, debug, verbose) {
  setCwd(cwd);
  const server = new Server(
    { name: 'claude/tengu', version: MACRO.VERSION },
    { capabilities: { tools: {} } }
  );

  // ListTools: getTools() → zodToJsonSchema 변환
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = getTools(getEmptyToolPermissionContext());
    return { tools: tools.map(tool => ({
      ...tool,
      description: await tool.prompt(...),
      inputSchema: zodToJsonSchema(tool.inputSchema),
      outputSchema: tool.outputSchema ? zodToJsonSchema(tool.outputSchema) : undefined,
    })) };
  });

  // CallTool: 도구 실행 (권한 검사 포함)
  server.setRequestHandler(CallToolRequestSchema, async ({ params }) => {
    const tool = findToolByName(tools, params.name);
    const result = await tool.call(params.arguments, toolUseContext, hasPermissionsToUseTool, ...);
    return { content: [{ type: 'text', text: stringify(result) }] };
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
```

### 14. 설정 로딩 순서

```
설정 로딩 순서 (높은 우선순위 → 낮은):
  │
  [0] --settings / --setting-sources (CLI 플래그, eagerLoadSettings)
  [1] Remote Managed Settings (API 서버)
  [2] MDM/plist/레지스트리 (관리자 정책)
  [3] managed-settings.json (파일 기반 정책)
  [4] 프로젝트 .claude/settings.json
  [5] 로컬 .claude/settings.local.json
  [6] 사용자 ~/.claude/settings.json
  [7] 기본값
  │
  로딩 시점:
  ├─ [Phase 1] startMdmRawRead() → [2][3] 서브프로세스 발사
  ├─ [Phase 2] eagerLoadSettings() → [0] CLI 플래그 파싱
  ├─ [Phase 3] enableConfigs() → [4][5][6][7] 파일 시스템 읽기
  ├─ [Phase 3] applySafeConfigEnvironmentVariables() → 안전한 환경변수
  ├─ [Phase 5] applyConfigEnvironmentVariables() → 위험한 환경변수 (신뢰 후)
  └─ [Phase 5+] loadRemoteManagedSettings() → [1] API 호출 (비차단, hot-reload)
```

### 15. 크리티컬 경로 분석

**인터랙티브 모드 크리티컬 경로** (첫 렌더까지):
```
cli.tsx entry
  → [병렬] MDM 서브프로세스 + 키체인 프리페치 + import 평가 (~135ms)
    → ensureMdmSettingsLoaded + ensureKeychainPrefetchCompleted (~0ms 추가)
      → init() (~50-80ms)
        → clientType 결정 + eagerLoadSettings
          → setup() + commands/agents (~28ms 병렬)
            → createRoot() (~10ms)
              → showSetupScreens() (0ms~무한 — 사용자 상호작용)
                → initializeLspServerManager()
                  → REPL 마운트 + startDeferredPrefetches()
```

**헤드리스 모드 (-p) 크리티컬 경로:**
```
cli.tsx entry
  → import main.tsx (~135ms, 서브프로세스 병렬)
    → preAction (~50-80ms init)
      → setup() (~28ms)
        → 서브커맨드 등록 건너뜀 (isPrintMode fast-path)
          → MCP 연결 대기 (await connectMcpBatch)
            → runHeadless() → print.ts
```

**성능 측정 체크포인트 순서** (startupProfiler):
```
cli_entry
main_tsx_entry
main_tsx_imports_loaded
main_function_start
main_warning_handler_initialized
main_client_type_determined
eagerLoadSettings_start / eagerLoadSettings_end
main_before_run
run_function_start
run_commander_initialized
preAction_start
preAction_after_mdm
  init_function_start
  init_configs_enabled
  init_safe_env_vars_applied
  init_after_graceful_shutdown
  init_after_1p_event_logging
  init_after_oauth_populate
  init_after_jetbrains_detection
  init_after_remote_settings_check
  init_network_configured
  init_function_end
preAction_after_init
preAction_after_sinks
preAction_after_migrations
preAction_after_remote_settings
preAction_after_settings_sync
action_handler_start
action_after_input_prompt
action_tools_loaded
action_before_setup
setup_before_prefetch
action_after_setup
action_commands_loaded
action_mcp_configs_loaded
action_after_plugins_init
before_connectMcp / after_connectMcp
run_main_options_built
run_before_parse / run_after_parse
main_after_run
cli_after_main_complete
```

### 16. 에러 처리 전략

```
부트 에러 처리 계층:
  │
  ├─ cli.tsx: 빠른 경로 실패 → process.exit(1)
  │   └─ bridge auth 실패 → exitWithError(BRIDGE_LOGIN_ERROR)
  │
  ├─ init():
  │   ├─ ConfigParseError → <InvalidConfigDialog /> (인터랙티브)
  │   │                   → stderr + gracefulShutdownSync(1) (헤드리스/non-interactive)
  │   ├─ 업스트림 프록시 실패 → logForDebugging + 계속 (fail-open)
  │   └─ 기타 에러 → rethrow
  │
  ├─ action():
  │   ├─ 디버거 감지 → process.exit(1) (보안, 외부 빌드만)
  │   ├─ 검증 실패 (--mcp-config, --session-id, etc.) → stderr + process.exit(1)
  │   ├─ org 검증 실패 (validateForceLoginOrg) → exitWithError(message)
  │   ├─ GrowthBook 실패 → 조용히 계속 (graceful degradation)
  │   ├─ MCP 연결 실패 → logForDebugging + 조용히 계속 (다음 턴에 재시도)
  │   ├─ resume 실패 → exitWithError(root, message)
  │   └─ gracefulShutdown 시작됨 → 조기 반환 (process.exitCode 체크)
  │
  ├─ showSetupScreens():
  │   ├─ 신뢰 거부 → gracefulShutdown() (process 내)
  │   ├─ Grove 정책 거부 → gracefulShutdownSync(0)
  │   ├─ 오토 모드 거부 → gracefulShutdownSync(1)
  │   └─ 설정 검증 에러 → <InvalidSettingsDialog /> (MCP 에러 제외)
  │
  └─ 전역:
      ├─ SIGINT → process.exit(0) (print 모드는 자체 핸들러)
      ├─ exit → resetCursor() (커서 복원)
      └─ gracefulShutdown → registerCleanup 콜백 실행
          ├─ shutdownLspServerManager
          ├─ cleanupSessionTeams (스웜 팀)
          └─ logForDiagnosticsNoPII('exited')
```

### 17. --bare 모드 (최소 모드)

`--bare` 플래그는 성능에 민감한 스크립팅 시나리오를 위한 최소 모드를 활성화한다. cli.tsx와 action 핸들러 양쪽에서 설정된다:

```
--bare가 건너뛰는 것들:
  ├─ 키체인 프리페치 (startKeychainPrefetch → isBareMode() 체크)
  ├─ CLAUDE.md 자동 탐색
  ├─ 스킬/훅
  ├─ LSP 서버 관리
  ├─ 플러그인 동기화 + 버전 관리
  ├─ 커밋 어트리뷰션
  ├─ 오토 메모리
  ├─ 지연 프리페치 전체 (startDeferredPrefetches → early return)
  ├─ 자동 발견 MCP (.mcp.json, 사용자 설정, 플러그인)
  ├─ claude.ai 프록시 서버 (Datadog, Gmail, Slack 등 — 각 6-14s)
  ├─ UDS 메시징 서버
  ├─ 팀메이트 스냅샷
  ├─ 쿼터 상태 / 패스 / 부트스트랩 / 빠른 모드 프리페치
  ├─ 예제 커맨드 새로고침
  └─ 이벤트 루프 지연 감지기

  --bare에서도 작동하는 것들:
  ├─ --system-prompt[-file], --append-system-prompt[-file]
  ├─ --add-dir (CLAUDE.md 디렉토리 명시 지정)
  ├─ --mcp-config (명시적 MCP만)
  ├─ --settings, --agents, --plugin-dir
  ├─ ANTHROPIC_API_KEY 또는 apiKeyHelper (OAuth/키체인 불가)
  └─ 스킬 (/skill-name 형태는 여전히 해결)
```

### 18. 헤드리스 vs 인터랙티브 분기점

```
isNonInteractiveSession 결정:
  ├─ -p / --print → true
  ├─ --init-only → true
  ├─ --sdk-url → true (자동으로 stream-json + verbose + print)
  └─ !process.stdout.isTTY → true

인터랙티브 전용 경로:
  ├─ createRoot() + showSetupScreens()
  ├─ Ink TUI 렌더링
  ├─ startDeferredPrefetches() (첫 렌더 후)
  ├─ 터미널 백업 복원 (iTerm2/Apple Terminal)
  ├─ 예제 커맨드 새로고침
  └─ 온보딩/신뢰 다이얼로그

헤드리스 전용 경로:
  ├─ applyConfigEnvironmentVariables() (신뢰 암묵적)
  ├─ initializeTelemetryAfterTrust() (즉시)
  ├─ await connectMcpBatch() (MCP 연결 대기)
  ├─ createStore(headlessInitialState)
  ├─ runHeadless() → print.ts
  └─ --no-session-persistence 지원
```

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `cli_entrypoint` | CLI Entrypoint (cli.tsx) | entry | bootstrap |
| `main_orchestrator` | Main Boot Orchestrator (main.tsx) | engine | bootstrap |
| `init_system` | Init System (init.ts) | engine | bootstrap |
| `bootstrap_state` | Global Bootstrap State | core | state |
| `setup_system` | Session Setup (setup.ts) | engine | bootstrap |
| `commander_program` | Commander CLI Program | surface | cli |
| `preaction_hook` | PreAction Initialization Hook | engine | bootstrap |
| `setup_screens` | Setup Screen Sequence | surface | ui |
| `repl_launcher` | REPL Launcher (React/Ink) | surface | ui |
| `deferred_prefetches` | Deferred Prefetch System | engine | perf |
| `startup_profiler` | Startup Profiler | engine | perf |
| `keychain_prefetch` | Keychain Prefetch | engine | auth |
| `mdm_raw_read` | MDM Raw Read | engine | config |
| `growthbook_init` | GrowthBook Initialization | engine | flags |
| `telemetry_init` | Telemetry Initialization | engine | telemetry |
| `migration_system` | Settings Migration System | engine | config |
| `mcp_entrypoint` | MCP Server Entrypoint | entry | mcp |

### 새 엣지
| From | To | Type | Label |
|------|-----|------|-------|
| `cli_entrypoint` | `main_orchestrator` | triggers | loads full CLI (dynamic import) |
| `main_orchestrator` | `mdm_raw_read` | triggers | startMdmRawRead() (parallel with imports) |
| `main_orchestrator` | `keychain_prefetch` | triggers | startKeychainPrefetch() (parallel with imports) |
| `main_orchestrator` | `commander_program` | creates | new CommanderCommand() |
| `commander_program` | `preaction_hook` | triggers | hook('preAction') |
| `preaction_hook` | `mdm_raw_read` | awaits | ensureMdmSettingsLoaded() |
| `preaction_hook` | `keychain_prefetch` | awaits | ensureKeychainPrefetchCompleted() |
| `preaction_hook` | `init_system` | blocks | await init() |
| `preaction_hook` | `migration_system` | triggers | runMigrations() |
| `init_system` | `bootstrap_state` | writes | enableConfigs() + environment vars |
| `init_system` | `growthbook_init` | triggers | 1P event logging + onRefresh |
| `init_system` | `telemetry_init` | prepares | network config before telemetry |
| `setup_screens` | `growthbook_init` | triggers | resetGrowthBook() after trust |
| `setup_screens` | `telemetry_init` | triggers | setImmediate(initializeTelemetryAfterTrust) |
| `setup_system` | `bootstrap_state` | writes | setCwd() + hooks snapshot |
| `repl_launcher` | `deferred_prefetches` | triggers | startDeferredPrefetches() after render |
| `setup_system` | `repl_launcher` | precedes | setup() before REPL mount |
| `commander_program` | `mcp_entrypoint` | routes | 'mcp serve' subcommand |
| `cli_entrypoint` | `mcp_entrypoint` | routes | --claude-in-chrome-mcp fast path |

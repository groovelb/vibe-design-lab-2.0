# R5-C: 엔터프라이즈 MDM 인프라 분석

## 파일들
- `src/utils/settings/mdm/constants.ts` (82줄)
- `src/utils/settings/mdm/settings.ts` (317줄)
- `src/utils/settings/mdm/rawRead.ts` (132줄)
- `src/services/remoteManagedSettings/syncCache.ts` (113줄)

---

## 핵심 발견

### 1. 3-Tier 엔터프라이즈 설정 관리

Claude Code는 **엔터프라이즈 IT 관리 시스템**이 이미 내장되어 있음:

```
설정 우선순위 (높은 → 낮은):
  1. Remote Managed Settings (API 서버에서 가져옴)
  2. MDM 프로필 (HKLM/plist — 관리자 전용)
  3. managed-settings.json (파일 기반)
  4. HKCU (Windows 사용자 레지스트리)
  5. 로컬 settings.json (사용자 설정)
```

### 2. 플랫폼별 MDM 구현

#### macOS — Preference Domain
```typescript
const MACOS_PREFERENCE_DOMAIN = 'com.anthropic.claudecode'

// plist 경로 우선순위:
// 1. /Library/Managed Preferences/<username>/com.anthropic.claudecode.plist
// 2. /Library/Managed Preferences/com.anthropic.claudecode.plist
// 3. ~/Library/Preferences/com.anthropic.claudecode.plist (ant-only)
```
- **Jamf, Mosyle** 등 macOS MDM 솔루션과 직접 연동
- `plutil`로 plist → JSON 변환

#### Windows — Registry Policy
```typescript
const WINDOWS_REGISTRY_KEY_PATH_HKLM = 'HKLM\\SOFTWARE\\Policies\\ClaudeCode'
const WINDOWS_REGISTRY_KEY_PATH_HKCU = 'HKCU\\SOFTWARE\\Policies\\ClaudeCode'
const WINDOWS_REGISTRY_VALUE_NAME = 'Settings'
```
- `reg query`로 레지스트리 읽기
- HKLM (관리자) > HKCU (사용자) 우선순위
- WOW64 공유 키 목록에 위치 (32/64bit 호환)
- **Active Directory GPO**로 배포 가능

#### Linux
- `/etc/claude-code/managed-settings.json` 파일 기반
- drop-in 디렉토리 지원: `managed-settings.d/*.json`

### 3. 스타트업 시 병렬 MDM 로드

```typescript
// main.tsx 모듈 평가 시 즉시 서브프로세스 실행
export function startMdmRawRead(): void {
  rawReadPromise = fireRawRead()
}

// fireRawRead — 플랫폼별 병렬 실행
async function fireRawRead(): Promise<RawReadResult> {
  if (process.platform === 'darwin') {
    // 모든 plist 경로를 병렬로 plutil 실행
    const allResults = await Promise.all(plistPaths.map(...))
    // First source wins
  }
  if (process.platform === 'win32') {
    // HKLM + HKCU 병렬 reg query
    const [hklm, hkcu] = await Promise.all([...])
  }
}
```

- **모듈 로드와 병렬로** MDM 서브프로세스 실행 (성능 최적화)
- 5000ms 타임아웃
- 존재하지 않는 plist는 existsSync로 빠른 스킵

### 4. Remote Managed Settings — API 기반 원격 관리

```typescript
// 적격성 체크
export function isRemoteManagedSettingsEligible(): boolean {
  // 1. 1P Anthropic API만
  // 2. firstParty base URL만
  // 3. cowork(로컬 에이전트) 제외
  // 4. OAuth: Enterprise/Team 구독 또는 외부 주입 토큰
  // 5. Console: API 키 있으면 적격
}
```

- **Enterprise/Team 구독 사용자**에게 API를 통해 설정 동기화
- 서버가 빈 설정 반환하면 graceful fallback
- 30분 주기 폴링 (changeDetector.ts)

### 5. "First Source Wins" 정책

```typescript
function consumeRawReadResult(raw: RawReadResult) {
  // 1. macOS plist → 있으면 즉시 반환
  // 2. Windows HKLM → 있으면 즉시 반환
  // 3. managed-settings.json → 있으면 HKCU 스킵
  // 4. Windows HKCU → 최하위 폴백
}
```

- 가장 높은 우선순위 소스가 모든 정책 설정을 제공
- 부분 병합 없음 — 전부 아니면 전무

### 6. 관리 가능한 설정 항목 (SettingsSchema)

MDM으로 관리할 수 있는 설정:
- API 키, 인증 설정
- 권한 규칙 (allowedTools, blockedTools)
- 모델 제한
- 기능 활성화/비활성화
- `autoDreamEnabled` 포함
- 와일드카드 권한 규칙

### 7. 보안 아키텍처

- MDM 설정은 **관리자 권한으로만 쓰기 가능** (HKLM, /Library/Managed Preferences/)
- 사용자가 MDM 설정을 오버라이드할 수 없음
- 유효하지 않은 권한 규칙은 자동 필터링 (나쁜 규칙 1개가 전체를 무효화하지 않음)
- 변경 감지기가 30분마다 MDM 변경 폴링

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `mdm_system` | MDM Settings System | control | enterprise |
| `remote_managed` | Remote Managed Settings | control | enterprise |
| `settings_pipeline` | Settings Priority Pipeline | engine | config |

### 새 엣지
| Source → Target | Type | Label |
|----------------|------|-------|
| `mdm_system` → `settings_pipeline` | feeds | 플랫폼별 MDM 읽기 |
| `remote_managed` → `settings_pipeline` | feeds | API 원격 설정 |
| `settings_pipeline` → `permissions` | configures | 권한 정책 적용 |
| `oauth` → `remote_managed` | authenticates | Enterprise/Team 인증 |

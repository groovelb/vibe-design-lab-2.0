# R5-B: Buddy 컴패니언 시스템 (이스터에그) 분석

## 파일: `src/buddy/` (6파일)

---

## 핵심 발견: 가챠 기반 가상 펫 시스템

### 1. 개요 — "클로드 코드 안에 숨겨진 다마고치"

Claude Code에는 **완전한 가챠(뽑기) 기반 가상 펫 시스템**이 숨겨져 있다. 사용자 ID를 시드로 결정론적 PRNG가 고유한 컴패니언을 생성하며, 레어리티, 종족, 눈, 모자, 스탯까지 갖춘 수집형 캐릭터 시스템이다.

### 2. 출시 타이밍

```typescript
// 티저 윈도우: 2026년 4월 1-7일 (만우절 시작!)
export function isBuddyTeaserWindow(): boolean {
  const d = new Date()
  return d.getFullYear() === 2026 && d.getMonth() === 3 && d.getDate() <= 7
}

// 본격 출시: 2026년 4월 이후 영구
export function isBuddyLive(): boolean {
  const d = new Date()
  return d.getFullYear() > 2026 || (d.getFullYear() === 2026 && d.getMonth() >= 3)
}
```

- **만우절 이벤트**로 계획된 기능 (2026-04-01)
- 티저 기간(4/1-7): 레인보우 `/buddy` 알림 표시
- 이후 영구 활성화
- 피처 플래그: `BUDDY`

### 3. 18종의 ASCII 아트 캐릭터

| 종족 | ASCII 예시 | 특징 |
|------|-----------|------|
| `duck` | `<(· )___` | 꽥꽥 오리 |
| `goose` | `(·>` | 거위 (목 길다) |
| `blob` | `( · · )` | 젤리 블롭 |
| `cat` | `=·ω·=` | 고양이 |
| `dragon` | `<·~·>` | 드래곤 (불꽃) |
| `octopus` | `~(··)~` | 문어 (촉수) |
| `owl` | `(·)(·)` | 올빼미 |
| `penguin` | `(·>)` | 펭귄 |
| `turtle` | `[·_·]` | 거북이 (등껍질) |
| `snail` | `·(@)` | 달팽이 |
| `ghost` | `/··\` | 유령 |
| `axolotl` | `}·.·{` | 아홀로틀 |
| `capybara` | `(·oo·)` | 카피바라 |
| `cactus` | `\|· ·\|` | 선인장 |
| `robot` | `[··]` | 로봇 |
| `rabbit` | `(·..·)` | 토끼 |
| `mushroom` | `\|· ·\|` | 버섯 |
| `chonk` | `(·.·)` | 통통이 |

각 종족당 **3프레임 애니메이션** (idle fidget), 5줄×12칸 ASCII 아트.

### 4. 눈 종류

```typescript
export const EYES = ['·', '✦', '×', '◉', '@', '°'] as const
```

### 5. 모자 시스템 (레어리티 연동)

```typescript
export const HATS = ['none', 'crown', 'tophat', 'propeller', 'halo', 'wizard', 'beanie', 'tinyduck'] as const
```

| 모자 | ASCII |
|------|-------|
| none | (없음) |
| crown | `\^^^/` |
| tophat | `[___]` |
| propeller | `-+-` |
| halo | `( )` |
| wizard | `/^\` |
| beanie | `(___)` |
| tinyduck | `,>` |

- **Common 등급은 모자 없음** → 모자 = 희귀 증거

### 6. 레어리티 가챠 시스템

```typescript
export const RARITY_WEIGHTS = {
  common: 60,     // ★     — 60%
  uncommon: 25,   // ★★    — 25%
  rare: 10,       // ★★★   — 10%
  epic: 4,        // ★★★★  — 4%
  legendary: 1,   // ★★★★★ — 1%
}

// Shiny 확률: 1%
shiny: rng() < 0.01
```

### 7. 스탯 시스템

```typescript
export const STAT_NAMES = ['DEBUGGING', 'PATIENCE', 'CHAOS', 'WISDOM', 'SNARK'] as const
```

스탯 생성 규칙:
- 레어리티별 바닥값(floor): common 5, uncommon 15, rare 25, epic 35, legendary 50
- **Peak stat** 1개: floor + 50 + rand(30) → 최대 100
- **Dump stat** 1개: floor - 10 + rand(15) → 최소 1
- 나머지: floor + rand(40)

### 8. 결정론적 생성 — "사용자마다 고유한 한 마리"

```typescript
const SALT = 'friend-2026-401'

export function roll(userId: string): Roll {
  const key = userId + SALT
  return rollFrom(mulberry32(hashString(key)))
}
```

- **Mulberry32 PRNG** 사용 (시드 기반 결정론적)
- userId + salt → hash → PRNG seed
- 같은 사용자 = 항상 같은 컴패니언
- **Bones(외형)는 매번 재생성**, Soul(이름/성격)만 저장
  → 종족 이름 변경/배열 수정에도 기존 컴패니언 파괴 안 됨
  → 사용자가 config를 조작해 legendary를 조작할 수 없음

### 9. Soul 생성 — 모델이 이름 + 성격 부여

```typescript
export type CompanionSoul = {
  name: string       // 모델이 생성
  personality: string // 모델이 생성
}

export type StoredCompanion = CompanionSoul & { hatchedAt: number }
```

### 10. 시스템 프롬프트 연동

```typescript
companionIntroText(name, species):
  "A small ${species} named ${name} sits beside the user's input box
   and occasionally comments in a speech bubble.
   You're not ${name} — it's a separate watcher."
```

- 컴패니언이 사용자 입력 옆에 표시
- 사용자가 이름으로 부르면 말풍선으로 답변
- 모델(Claude)은 컴패니언이 아님 — 별도 관찰자

### 11. 종족 이름 난독화

```typescript
// "One species name collides with a model-codename canary in excluded-strings.txt"
const c = String.fromCharCode
export const duck = c(0x64,0x75,0x63,0x6b) as 'duck'
```

- **모든 종족 이름이 hex charcode로 인코딩**
- 이유: 모델 코드네임이 종족 이름과 겹침 (excluded-strings.txt 검사 우회)
- 빌드 출력에서 문자열이 검출되면 안 되는 보안 조치

### 12. UI 통합

- **CompanionSprite.tsx**: 500ms 틱 애니메이션, 키스트로크별 PromptInput 갱신
- **useBuddyNotification.tsx**: 스타트업 시 레인보우 `/buddy` 티저
- **BackgroundTasksDialog**: 미래 통합 지점

---

## 스토리텔링 관련 노드/엣지

### 새 노드
| ID | Label | Layer | Category |
|----|-------|-------|----------|
| `buddy_system` | Buddy Companion System | future | easter-egg |
| `gacha_rng` | Deterministic Gacha RNG | future | mechanics |
| `ascii_sprites` | ASCII Sprite Engine | future | ui |
| `companion_soul` | AI Soul Generation | future | ai |

### 새 엣지
| Source → Target | Type | Label |
|----------------|------|-------|
| `buddy_flag` → `buddy_system` | gates | BUDDY 피처 플래그 |
| `buddy_system` → `gacha_rng` | uses | Mulberry32 PRNG |
| `buddy_system` → `ascii_sprites` | renders | 18종 3프레임 |
| `buddy_system` → `companion_soul` | generates | 이름/성격 생성 |
| `buddy_system` → `system_prompt` | injects | 컴패니언 소개 |
| `user_id` → `gacha_rng` | seeds | 결정론적 생성 |

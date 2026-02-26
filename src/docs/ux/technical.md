# Technical — Vibe Design Labs

> ux-flow가 요구한 경험을 실제로 구현하기 위한 기술 판단.
> 작성일: 2026-02-26

---

## 1. 아키텍처 개요

```
┌─ Client ──────────────────────────────────────────────┐
│  Next.js 16 App Router                                │
│  ├── Server Components (페이지, 레이아웃, 정적 데이터)   │
│  ├── Client Components (인터랙션, 실시간 댓글, 비디오)   │
│  └── Server Actions (데이터 쓰기)                      │
└───────────────────────────────────────────────────────┘
         │                          │
         ▼                          ▼
┌─ BaaS ─────────┐      ┌─ External ──────────┐
│  Supabase       │      │  Mux (Video Stream)  │
│  ├── PostgreSQL │      │  Discord (링크/API)   │
│  ├── Auth       │      │  외부 결제 링크       │
│  ├── Realtime   │      │  GA4                 │
│  └── Storage    │      └─────────────────────┘
└─────────────────┘
         │
         ▼
┌─ Deploy ────────┐
│  Vercel          │
└─────────────────┘
```

---

## 2. 추가 라이브러리

기존 스택(Next.js 16, React 19, MUI 7, Framer Motion, Three.js)은 유지. 최소한만 추가.

| 패키지 | 이유 | Phase |
|--------|------|-------|
| `@supabase/supabase-js` | DB, Auth, Realtime, Storage 단일 클라이언트 | 1 |
| `@supabase/ssr` | Next.js App Router 쿠키 기반 세션 | 1 |
| `@mux/mux-player-react` | 영상 플레이어. HLS 적응형 스트리밍, signed URL 콘텐츠 보호 | 1 |
| `@mux/mux-node` | 서버 사이드 Mux API (signed token 생성, 영상 업로드) | 1 |

**추가하지 않는 것과 이유:**

| 패키지 | 불필요한 이유 |
|--------|-------------|
| next-auth | Supabase Auth가 대체. 별도 인증 라이브러리 불필요 |
| prisma | Supabase JS client가 쿼리 담당. ORM 레이어 불필요 |
| react-query / swr | Server Components가 데이터 페칭 담당. 실시간은 Supabase Realtime |
| zustand / redux | 전역 상태 최소. React context + Server Components로 충분 |
| video.js / react-player | Mux Player가 대체. 별도 플레이어 불필요 |

**서체:** 모두 `next/font/google`로 로딩 (패키지 불필요).
- 브랜드: IBM Plex Sans — 로고, 태그라인, 브랜드 강조
- 프로덕트/헤딩: SUIT — 본문, UI, h1~h6 (한글 최적화)
- 코드: IBM Plex Mono — 키워드, 토큰명, 인라인 코드

---

## 3. 백엔드: Supabase

### 3.1 선택 이유

| 요구사항 | Supabase 대응 |
|---------|-------------|
| 관계형 데이터 (Course → Chapter → Comment) | PostgreSQL |
| 타임라인 댓글 실시간 동기화 | Realtime (Postgres Changes) |
| 멤버 인증 + 수강 권한 | Auth + RLS |
| 멤버 결과물 이미지 업로드 | Storage |
| Next.js App Router SSR 호환 | @supabase/ssr |
| 운영 부담 최소화 | Managed, 서버 관리 없음 |

### 3.2 프로젝트 구성

```
src/
  lib/
    supabase/
      client.js          # 브라우저 클라이언트 (createBrowserClient)
      server.js          # Server Component/Action 클라이언트 (createServerClient)
      middleware.js       # 세션 갱신 미들웨어
  middleware.js           # Next.js middleware → Supabase 세션 refresh
```

### 3.3 환경 변수

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # Server Action에서만 사용

MUX_TOKEN_ID=                     # Mux API 인증
MUX_TOKEN_SECRET=                 # Mux API 인증
MUX_SIGNING_KEY=                  # Signed URL 발급용
MUX_SIGNING_KEY_PRIVATE=          # Signed URL 발급용
```

---

## 4. 데이터 모델

### 4.1 ER 다이어그램

```
profiles ─────┐
  │            │
  │ 1:N        │ 1:N
  ▼            ▼
enrollments  chapter_comments
  │              │
  │ N:1          │ N:1         profiles 1:N ──► challenge_submissions
  ▼              ▼                                    │
courses ──1:N──► chapters                             │ 1:N
  │                │                                  ▼
  │ 1:N            │ 1:N                       peer_feedbacks
  ▼                ▼
testimonials   chapter_markers

dictionary_categories (self-ref tree) ──1:N──► dictionary_entries

experiments (self-contained)
```

### 4.2 스키마

**인증/프로필:**

```sql
profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id),
  name        text,
  role        text DEFAULT 'member',  -- 'member' | 'admin' | 'instructor'
  persona     text,                    -- '캔버스 디자이너' | '샌드위치 PM' | '파이프라인 개발자'
  avatar_url  text,
  created_at  timestamptz DEFAULT now()
)
```

**코스 시스템:**

```sql
courses (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             text UNIQUE NOT NULL,
  title            text NOT NULL,
  subtitle         text,
  description      text,
  target_audience  text,
  duration         text,          -- '8주'
  price            text,          -- '150~250만원'
  cohort_status    text,          -- 'recruiting' | 'ongoing' | 'upcoming'
  cohort_number    integer,
  payment_url      text,
  created_at       timestamptz DEFAULT now()
)

chapters (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id              uuid REFERENCES courses(id) ON DELETE CASCADE,
  "order"                integer NOT NULL,
  slug                   text NOT NULL,
  title                  text NOT NULL,
  description            text,
  mux_playback_id        text,          -- Mux playback ID
  mux_asset_id           text,          -- Mux asset ID (관리용)
  video_duration         integer,       -- 초
  challenge_title        text,
  challenge_description  text,
  created_at             timestamptz DEFAULT now(),
  UNIQUE(course_id, slug)
)

chapter_markers (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id   uuid REFERENCES chapters(id) ON DELETE CASCADE,
  time_seconds integer NOT NULL,
  label        text NOT NULL,
  "order"      integer NOT NULL
)
```

**수강/진도:**

```sql
enrollments (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid REFERENCES auth.users(id),
  course_id     uuid REFERENCES courses(id),
  cohort_number integer,
  enrolled_at   timestamptz DEFAULT now(),
  completed_at  timestamptz,
  UNIQUE(user_id, course_id)
)

chapter_progress (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid REFERENCES auth.users(id),
  chapter_id          uuid REFERENCES chapters(id),
  last_video_position integer DEFAULT 0,   -- 초
  is_completed        boolean DEFAULT false,
  completed_at        timestamptz,
  UNIQUE(user_id, chapter_id)
)
```

**타임라인 댓글:**

```sql
chapter_comments (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id      uuid REFERENCES chapters(id) ON DELETE CASCADE,
  user_id         uuid REFERENCES auth.users(id),
  content         text NOT NULL,
  video_timestamp integer,          -- 초. NULL = 일반 댓글
  parent_id       uuid REFERENCES chapter_comments(id),  -- 대댓글
  created_at      timestamptz DEFAULT now()
)
```

**챌린지/피드백:**

```sql
challenge_submissions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id       uuid REFERENCES chapters(id) ON DELETE CASCADE,
  user_id          uuid REFERENCES auth.users(id),
  content          text,
  result_url       text,
  result_image_url text,
  created_at       timestamptz DEFAULT now()
)

peer_feedbacks (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES challenge_submissions(id) ON DELETE CASCADE,
  user_id       uuid REFERENCES auth.users(id),
  content       text NOT NULL,
  created_at    timestamptz DEFAULT now()
)
```

**소셜 프루프 (관리자 큐레이션):**

```sql
testimonials (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id        uuid REFERENCES courses(id),
  member_name      text NOT NULL,
  member_role      text,
  member_persona   text,
  quote            text NOT NULL,
  quote_short      text,
  result_url       text,
  result_image_url text,
  is_featured      boolean DEFAULT false,   -- Landing용
  created_at       timestamptz DEFAULT now()
)

community_activities (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type            text NOT NULL,    -- 'question' | 'challenge' | 'feedback'
  content_preview text NOT NULL,
  member_name     text NOT NULL,
  source_url      text,
  created_at      timestamptz DEFAULT now()
)
```

**Dictionary:**

```sql
dictionary_categories (
  id        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name      text NOT NULL,
  "order"   integer NOT NULL,
  parent_id uuid REFERENCES dictionary_categories(id)
)

dictionary_entries (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id   uuid REFERENCES dictionary_categories(id),
  term          text NOT NULL,
  description   text,
  related_terms text[],
  created_at    timestamptz DEFAULT now()
)
```

**Experiment:**

```sql
experiments (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             text UNIQUE NOT NULL,
  title            text NOT NULL,
  description      text,
  thumbnail_url    text,
  before_prompt    text,
  before_result_url text,
  after_prompt     text,
  after_result_url text,
  explanation      text,
  created_at       timestamptz DEFAULT now()
)
```

### 4.3 RLS (Row Level Security)

| 테이블 | 읽기 | 쓰기 |
|--------|------|------|
| courses, testimonials, community_activities, dictionary_*, experiments | 공개 | admin만 |
| chapters (메타데이터) | 공개 | admin만 |
| chapters (video_url) | 해당 코스 수강생만 | admin만 |
| chapter_comments | 해당 코스 수강생 | 본인 작성만 |
| challenge_submissions | 해당 코스 수강생 | 본인 작성만 |
| peer_feedbacks | 해당 코스 수강생 | 본인 작성만 |
| enrollments | 본인만 | admin만 |
| chapter_progress | 본인만 | 본인만 |
| profiles | 공개 (이름, 아바타) | 본인만 |

---

## 5. 코스 학습 시스템

### 5.1 라우트 구조

```
app/
  course/
    page.jsx                        # 코스 목록 (공개)
    [slug]/
      page.jsx                      # 코스 상세 (공개, 전환 페이지)
      [chapterSlug]/
        page.jsx                    # 챕터 학습 (수강생 전용)
```

**Course Detail** = 공개 전환 페이지 (누구나 접근)
**Chapter Learning** = 수강생 전용 학습 페이지 (enrollment 필요)

### 5.2 영상 스트리밍 + 챕터 구분

Mux Player로 HLS 적응형 스트리밍 + signed URL 콘텐츠 보호 + 자체 챕터 마커 UI.

```
┌─────────────────────────────────────────────────┐
│  Mux Player (@mux/mux-player-react)              │
│  ┌─────────────────────────────────────────────┐ │
│  │                                             │ │
│  │              영상 영역                       │ │
│  │         HLS 적응형 비트레이트                 │ │
│  └─────────────────────────────────────────────┘ │
│  ▶ ════●══════════════════════════════════ 12:34  │
│        ▲    ▲         ▲              ▲           │
│        M1   M2        M3             M4          │ ← chapter_markers
└─────────────────────────────────────────────────┘

┌─ Chapter Markers ──────────────────┐
│ ● 0:00  인트로                      │
│ ● 2:30  핵심 개념                   │  ← 클릭 시 해당 시점으로 seek
│ ● 7:15  실습                       │
│ ● 10:00 챌린지 설명                 │
└────────────────────────────────────┘
```

**콘텐츠 보호 (Signed URL):**

유료 콘텐츠이므로 Mux signed playback token으로 URL 공유 방지.

```js
// Server Action — 수강생 검증 후 signed token 발급
import Mux from '@mux/mux-node';

export async function getPlaybackToken(chapterId) {
  // 1. Supabase에서 수강 여부 확인 (enrollment RLS)
  // 2. chapter의 mux_playback_id 조회
  // 3. signed token 발급 (24시간 만료)
  const token = await mux.jwt.signPlaybackId(playbackId, {
    type: 'video',
    expiration: '24h',
  });
  return token;
}
```

**플레이어 구현:**

```jsx
import MuxPlayer from '@mux/mux-player-react';

<MuxPlayer
  playbackId={chapter.mux_playback_id}
  tokens={{ playback: signedToken }}
  onTimeUpdate={(e) => setCurrentTime(Math.floor(e.target.currentTime))}
  startTime={chapter_progress.last_video_position}  // 이어보기
/>
```

**챕터 마커 seek:**

```js
// MuxPlayer ref로 시점 이동
const playerRef = useRef(null);
const seekTo = (seconds) => {
  playerRef.current.currentTime = seconds;
};
```

**진도 저장:** `chapter_progress.last_video_position`에 주기적으로 저장 (10초 간격 debounce). `startTime` prop으로 이어보기.

**영상 업로드 (관리자):** Mux Direct Upload API → `mux_asset_id` + `mux_playback_id` 저장. 관리자 페이지 또는 Mux Dashboard에서 업로드.

### 5.3 타임라인 댓글

영상 타임스탬프에 연결된 댓글 시스템. Supabase Realtime으로 실시간 동기화.

```
┌─ Timeline Comments ─────────────────────────────────────┐
│                                                         │
│  [타임라인순] [최신순]                     ← 정렬 전환     │
│                                                         │
│  ┌─ 2:30 ──────────────────────────────────────────┐    │
│  │ 김디자인 · 2:30                                  │    │
│  │ "이 부분에서 토큰 매핑이 헷갈리는데,               │    │
│  │  spacing 기준이 8px 배수인 건가요?"               │    │
│  │                              [답글 2] [좋아요 5] │    │
│  └──────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─ 7:20 ──────────────────────────────────────────┐    │
│  │ 박개발 · 7:20                                    │    │
│  │ "실습 따라하다가 sx prop에서 theme 참조하는 방법    │    │
│  │  알게 됐습니다. palette.primary.main 이렇게!"     │    │
│  └──────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─ 댓글 입력 ──────────── 현재 시점: 7:20 ──────┐      │
│  │ 댓글을 입력하세요...        [⏱ 시점 첨부] [전송] │      │
│  └──────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

**핵심 동작:**

| 동작 | 구현 |
|------|------|
| 댓글 작성 시 현재 재생 시점 자동 첨부 | `video_timestamp = currentTime` (선택적 — 체크박스로 시점 첨부 토글) |
| 타임스탬프 뱃지 클릭 → 영상 이동 | `playerRef.current.currentTime = comment.video_timestamp` |
| 타임라인순 정렬 | `ORDER BY video_timestamp ASC NULLS LAST` |
| 실시간 새 댓글 표시 | Supabase Realtime `postgres_changes` 구독 |
| 대댓글 | `parent_id` 참조. 1depth만 허용 |

**Supabase Realtime 구독:**

```js
supabase
  .channel('chapter-comments')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'chapter_comments',
    filter: `chapter_id=eq.${chapterId}`
  }, (payload) => {
    setComments(prev => [...prev, payload.new]);
  })
  .subscribe();
```

### 5.4 챕터 학습 페이지 전체 레이아웃

```
┌─ GNB ──────────────────────────────────────────────────┐

┌─ 좌측 (영상 + 댓글) ────────┐  ┌─ 우측 (네비 + 챌린지) ─┐
│                              │  │                        │
│  [Mux Player]                │  │  Chapter Navigation    │
│  [Chapter Markers]           │  │  ├── ✓ Ch.1 인트로     │
│                              │  │  ├── ● Ch.2 토큰 기초  │ ← 현재
│  ─────────────────           │  │  ├── ○ Ch.3 컴포넌트   │
│                              │  │  └── ○ Ch.4 실전       │
│  [Timeline Comments]         │  │                        │
│  ├── 타임라인순 / 최신순     │  │  ─────────────────     │
│  ├── 댓글 리스트             │  │                        │
│  └── 댓글 입력               │  │  Challenge             │
│                              │  │  "이번 챕터의 결과물을  │
│                              │  │   공유하세요"           │
│                              │  │  [제출하기]             │
│                              │  │                        │
│                              │  │  Peer Submissions      │
│                              │  │  ├── 김디자인 결과물    │
│                              │  │  └── 박개발 결과물      │
└──────────────────────────────┘  └────────────────────────┘

모바일: 상하 스택 (영상 → 탭 전환: 댓글 | 챕터목록 | 챌린지)
```

---

## 6. 토큰 구현

design-system-optimization §2에서 받은 사양의 구현 방법.

### 6.1 Theme 파일 구조 변경

```
src/styles/themes/
  default.js        → primitives.js   # violet-gray 원시값
                    → semantics.js    # 시멘틱 토큰 정의
                    → theme.js        # createTheme (colorSchemes + cssVariables)
                    → index.js        # export
```

### 6.2 Primitive 토큰 → CSS Custom Properties

```js
// primitives.js
export const violetGray = {
  950: 'hsl(260, 6%, 8%)',
  900: 'hsl(260, 5%, 12%)',
  800: 'hsl(260, 5%, 18%)',
  700: 'hsl(260, 4%, 28%)',
  // ... 300-500 중간 단계
  200: 'hsl(260, 4%, 82%)',
  100: 'hsl(260, 3%, 90%)',
  50:  'hsl(260, 3%, 96%)',
};
```

### 6.3 MUI v7 colorSchemes 적용

```js
// theme.js
import { createTheme } from '@mui/material/styles';
import { violetGray } from './primitives';

export const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: {
      palette: {
        background: { default: violetGray[950], paper: violetGray[900] },
        text: { primary: violetGray[50], secondary: violetGray[200], disabled: violetGray[700] },
        divider: violetGray[800],
        action: { hover: violetGray[800] },
      },
    },
    light: {
      palette: {
        background: { default: violetGray[50], paper: '#ffffff' },
        text: { primary: violetGray[950], secondary: violetGray[700], disabled: violetGray[200] },
        divider: violetGray[100],
        action: { hover: violetGray[100] },
      },
    },
  },
  defaultColorScheme: 'dark',
  shape: { borderRadius: 0 },
  spacing: 8,
  typography: {
    fontFamily: 'var(--font-suit)',          // 프로덕트/본문 기본
    h1: { fontFamily: 'var(--font-suit)', fontWeight: 800 },
    h2: { fontFamily: 'var(--font-suit)', fontWeight: 800 },
    // display: IBM Plex Sans (브랜드)
    // code, codeBlock: IBM Plex Mono
  },
  // elevation → 다크: bg 단계, 라이트: shadow
});
```

### 6.4 서체 설정

```js
// app/fonts.js — 기존 Outfit + Pretendard 대체
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// 브랜드 (로고, 태그라인, display)
export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-brand',
  weight: ['400', '500', '600', '700'],
});

// 프로덕트/헤딩 (본문, UI, h1~h6)
export const suit = localFont({
  src: '../public/fonts/SUIT-Variable.woff2',
  variable: '--font-suit',
});

// 코드 (키워드, 토큰명, 인라인 코드)
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});
```

### 6.5 Breakpoint 변경

```js
breakpoints: {
  values: { xs: 0, sm: 768, md: 900, lg: 1200, xl: 1440 },
},
```

---

## 7. 인증

### 7.1 플로우

```
[수강 신청 CTA 클릭]
    │
    ├── 미로그인 → [Supabase Auth UI] → 이메일/소셜 로그인 → [프로필 설정] → [결제 페이지]
    │
    └── 로그인 상태 → [결제 페이지 (외부)]
                          │
                          ▼ (결제 완료 후 webhook 또는 수동)
                     [enrollments 레코드 생성]
                          │
                          ▼
                     [Chapter Learning 접근 가능]
```

### 7.2 미들웨어

```js
// middleware.js
// 보호 경로: /course/[slug]/[chapterSlug]
// 확인: Supabase 세션 존재 + enrollments 레코드 존재
// 미인증 → /login 리다이렉트
// 미수강 → /course/[slug] (상세 페이지)로 리다이렉트
```

### 7.3 Phase 1 인증 방식

- **이메일 + 비밀번호** (기본)
- **Google OAuth** (선택)
- Phase 2에서 Discord OAuth 추가 검토 (커뮤니티 연동)

---

## 8. API 설계

Next.js Server Actions 기본. Route Handler는 외부 webhook 수신 시만 사용.

### 8.1 Server Actions

| Action | 설명 | 권한 |
|--------|------|------|
| `submitComment(chapterId, content, videoTimestamp)` | 타임라인 댓글 작성 | 수강생 |
| `deleteComment(commentId)` | 본인 댓글 삭제 | 본인 |
| `submitChallenge(chapterId, content, resultUrl)` | 챌린지 제출 | 수강생 |
| `submitFeedback(submissionId, content)` | 피어 피드백 | 수강생 |
| `updateProgress(chapterId, position, isCompleted)` | 진도 저장 | 본인 |
| `updateProfile(name, persona, avatarUrl)` | 프로필 수정 | 본인 |

### 8.2 Route Handlers

| Route | 설명 |
|-------|------|
| `POST /api/webhooks/payment` | 외부 결제 완료 webhook → enrollment 생성 |

### 8.3 데이터 페칭 패턴

| 페이지 | 패턴 | 이유 |
|--------|------|------|
| Landing, Course, Story | Server Component + 정적 데이터 | 변경 드묾. ISR 또는 빌드 시 생성 |
| Course Detail | Server Component + Supabase 쿼리 | 코호트 상태 등 준동적 |
| Chapter Learning | Server Component (초기 데이터) + Client (실시간 댓글) | 영상/댓글이 동적 |
| Dictionary | Server Component + Supabase 쿼리 | 트리 데이터 서버에서 조립 |
| Experiment | Server Component + Supabase 쿼리 | 준정적 |

---

## 9. 상태 관리

| 상태 | 위치 | 방법 |
|------|------|------|
| 사용자 세션 | 서버 (쿠키) | Supabase Auth + middleware |
| 코스/챕터 데이터 | 서버 | Server Component에서 fetch |
| 비디오 재생 시점 | 클라이언트 | React state + Mux Player onTimeUpdate |
| 타임라인 댓글 | 클라이언트 | React state + Supabase Realtime 구독 |
| 아코디언/트리 펼침 | 클라이언트 | React state (로컬) |
| Floating CTA 표시 | 클라이언트 | IntersectionObserver |
| 챕터 진도 | 서버 + 클라이언트 | 서버에서 초기 로드, 클라이언트에서 debounce 업데이트 |

**전역 상태 관리 라이브러리 불필요.** Server Components가 대부분의 데이터를 서버에서 주입하고, 클라이언트 상태는 컴포넌트 로컬 + Supabase Realtime으로 해결.

---

## 10. 외부 연동

| 연동 | Phase 1 | Phase 2 |
|------|---------|---------|
| **Mux** | HLS 스트리밍 + signed URL 콘텐츠 보호 + 챕터 마커 | 영상 분석 대시보드, 시청 히트맵 |
| **Discord** | 초대 링크 제공 | API 연동 — 채널 활동 스냅샷, 멤버 동기화 |
| **결제** | 외부 결제 페이지 링크 + webhook | 자체 결제 검토 |
| **GA4** | `next/script`로 삽입. 핵심 이벤트 아래 참조 | 커스텀 대시보드 |
| **SNS 메타** | Open Graph + Twitter Card (`generateMetadata`) | — |

### GA4 핵심 이벤트

| 이벤트 | 트리거 |
|--------|-------|
| `landing_section_view` | Landing 각 섹션 스크롤 도달 (IntersectionObserver) |
| `course_detail_enter` | Course Detail 진입 (소스: Landing shortcut / Course) |
| `cta_click` | 수강 신청 CTA 클릭 |
| `chapter_start` | 챕터 영상 재생 시작 |
| `chapter_complete` | 챕터 완료 표시 |
| `comment_submit` | 타임라인 댓글 작성 |
| `challenge_submit` | 챌린지 제출 |

---

## 11. 배포

| 항목 | 선택 | 이유 |
|------|------|------|
| **호스팅** | Vercel | Next.js 네이티브. Server Components, Server Actions, ISR 지원 |
| **DB** | Supabase (managed) | 서버 관리 불필요 |
| **도메인** | Vercel DNS 또는 외부 DNS | — |
| **환경 분리** | Preview (PR별) + Production | Vercel 기본 제공 |

---

## 12. 기술 제약

| 제약 | 이유 |
|------|------|
| 자체 인코딩/CDN 안 함 | Mux가 인코딩 + HLS + CDN 전담. 자체 미디어 서버 구축 안 함 |
| 자체 결제 안 함 | Phase 1 Non-goal. 외부 결제 링크 |
| 실시간 채팅 안 함 | Non-goal. Discord가 담당. 플랫폼은 비동기 댓글 |
| AI 자동 피드백 안 함 | Non-goal. 피드백은 프랙티셔너와 동료가 담당 |
| 다국어 안 함 | Phase 1은 한국어만 |
| 타임라인 댓글 대댓글 1depth만 | 복잡도 제한. 깊은 토론은 Discord |

---

## 13. 구현 우선순위

### Phase 1A — 토큰 + 인프라

| 순서 | 항목 |
|------|------|
| 1 | Supabase 프로젝트 생성 + 스키마 마이그레이션 |
| 2 | 시멘틱 토큰 쌍 (primitives + colorSchemes + 타이포 + breakpoint) |
| 3 | Supabase Auth + 미들웨어 + 보호 경로 |
| 4 | 모노스페이스 서체 추가 |

### Phase 1B — 코스 시스템

| 순서 | 항목 |
|------|------|
| 5 | Course / Course Detail 페이지 (공개, 전환용) |
| 6 | Mux Player + signed URL + 챕터 마커 UI |
| 7 | Chapter Learning 페이지 + 진도 저장 |
| 8 | 타임라인 댓글 (Supabase Realtime) |
| 9 | 챌린지 제출 + 피어 피드백 |

### Phase 1C — 콘텐츠 페이지

| 순서 | 항목 |
|------|------|
| 10 | Landing (전환 퍼널) |
| 11 | Dictionary (Taxonomy Tree) |
| 12 | Experiment (Before/After) |
| 13 | Brand Story |
| 14 | GA4 이벤트 트래킹 |

### Phase 2

- 결제 webhook 자동화
- Discord API 연동
- Mux 영상 분석 (시청 히트맵, 이탈 구간)
- Dictionary Wiki Entry 개별 페이지

---

## 14. 다음 단계 핸드오프

| 받는 문서 | 넘기는 것 |
|----------|----------|
| **contents** | 데이터 엔티티별 콘텐츠 규격 (텍스트 길이, 이미지 비율, 영상 길이). 타임라인 댓글 UX 문구. 에러/빈 상태 메시지 정책 |

---

*v1.0 | 기반: ux-flow v1.1, design-system-optimization v1.1, project-summary v2.0*

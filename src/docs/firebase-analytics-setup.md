# Firebase Analytics 설치 계획

## 프로젝트 정보

| 항목 | 값 |
|------|-----|
| Firebase 프로젝트 | vibe-design-lab |
| Measurement ID | G-Z32BDEVV2R |
| 대상 도메인 | vibedesignlab.net |
| 이전 상태 | 동일 도메인의 다른 레포에서 제거 후 이 레포로 이전 |

---

## Phase 0: 환경변수·보안 점검

### 점검 항목

| # | 항목 | 상태 | 비고 |
|---|------|------|------|
| 1 | `.gitignore`에 `.env` / `.env.*` 포함 | OK | line 11-12에 등록됨 |
| 2 | `.env.local` 존재 | OK | GEMINI_API_KEY 이미 사용 중 |
| 3 | `NEXT_PUBLIC_` 접두사 사용 | 필요 | Firebase SDK는 클라이언트에서 실행 → 브라우저 번들에 포함되어야 함 |
| 4 | Firebase apiKey 노출 위험도 | 낮음 | Firebase apiKey는 프로젝트 식별자로 설계됨. 보안은 Firebase Console의 Security Rules와 App Check에서 담당 |
| 5 | `lib/` 디렉토리 | 미존재 | 신규 생성 필요 |

### 권장 보안 조치 (Firebase Console)

- **App Check** 활성화 — reCAPTCHA Enterprise 연동으로 비인가 클라이언트 차단
- **HTTP Referrer 제한** — Google Cloud Console > API 제한에서 `vibedesignlab.net/*`만 허용
- **Analytics 데이터 보존** 기간 설정 확인 (기본 14개월)

---

## Phase 1: 패키지 설치

```bash
pnpm add firebase
```

---

## Phase 2: 환경변수 등록

`.env.local`에 추가:

```env
# Firebase Analytics
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAeGpTUrSXRdJX-iJzU9oACkfIWlkn_vnA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=vibe-design-lab.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=vibe-design-lab
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=vibe-design-lab.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=982315383219
NEXT_PUBLIC_FIREBASE_APP_ID=1:982315383219:web:08117c11471051ff3633c6
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-Z32BDEVV2R
```

---

## Phase 3: Firebase 초기화 모듈

`lib/firebase.js` 생성:

- `initializeApp()` — 싱글턴 패턴으로 중복 초기화 방지
- `getAnalytics()` — `typeof window !== 'undefined'` 가드 (SSR 환경 방어)
- 환경변수 미설정 시 명확한 에러 메시지 출력 (code-convention 준수)

---

## Phase 4: Analytics 클라이언트 컴포넌트

`app/FirebaseAnalytics.jsx` 생성:

- `'use client'` 디렉티브
- `useEffect`에서 analytics 인스턴스 초기화
- UI 렌더링 없음 (`return null`)
- `process.env.NODE_ENV === 'production'` 조건으로 개발 환경 제외 가능

---

## Phase 5: layout.jsx에 삽입

```jsx
// app/layout.jsx (서버 컴포넌트 유지)
import FirebaseAnalytics from './FirebaseAnalytics';

export default function RootLayout({ children }) {
  return (
    <html lang="ko" ...>
      <body>
        <FirebaseAnalytics />
        <InitColorSchemeScript ... />
        <ThemeRegistry>
          <SiteShell>{children}</SiteShell>
        </ThemeRegistry>
      </body>
    </html>
  );
}
```

---

## 작업 순서 요약

```
Phase 0  환경변수·보안 점검 ← 현재 완료
Phase 1  pnpm add firebase
Phase 2  .env.local 환경변수 추가
Phase 3  lib/firebase.js 초기화 모듈
Phase 4  app/FirebaseAnalytics.jsx 클라이언트 컴포넌트
Phase 5  layout.jsx에 컴포넌트 삽입
```

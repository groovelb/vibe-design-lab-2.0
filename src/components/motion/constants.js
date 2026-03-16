/** 같은 행 내 좌→우 컬럼 간 stagger 딜레이 (ms) */
export const COL_STAGGER = 120;

/** Construct 비주얼 선행 시간 — 텍스트가 Construct 확장 후 등장하도록 하는 딜레이 (ms) */
export const VISUAL_LEAD = 300;

/* ── Construct 시스템 ── */

/** Construct 앵커 크기 (px) */
export const ANCHOR_SIZE = 6;
/** Construct 이징 — 극단적 로그 커브: 폭발적 시작 + 긴 감속 꼬리 */
export const SPRING = 'cubic-bezier(0, 0.95, 0.05, 1)';
/** Construct 이징 — 부드러운 페이드용 */
export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
/** Construct 단계별 타이밍 (ms) */
export const T = { tag: 80, scatter: 250, settle: 40, reveal: 150 };

/* ── ConstructCursor 시스템 ── */

/** ConstructCursor 크기 (px) — 타이핑 커서로 사용되는 ■ */
export const CURSOR_SIZE = 6;
/** ConstructCursor Y 점프 최대 범위 (lineHeight 비율) */
export const CURSOR_Y_RANGE = 0.25;

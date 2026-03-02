'use client';

/**
 * Philosophy SVG Illustrations
 *
 * VDL 세 가지 신념의 아이소메트릭 일러스트.
 * FIG 0.5 — 구현은 언어를 따른다 (주형/캐스팅)
 * FIG 0.6 — 언어는 경험을 함축한다 (수렴)
 * FIG 0.7 — 감각도 쪼개면 로직이다 (익스플로디드 뷰)
 */

/**
 * FIG 0.5 — 구현은 언어를 따른다
 * 주형/캐스팅: 동일한 두 프리즘이 수직 정렬.
 * 상단(언어=틀)에 컨텐츠 라인, 하단(구현=캐스트)은 빈 동일 형태.
 * "언어가 곧 구현의 형태를 결정한다"
 *
 * @param {object} props - SVG props passthrough [Optional]
 *
 * Example usage:
 * <ImplementationIllustration />
 */
export const ImplementationIllustration = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" fill="none" viewBox="0 0 280 280" { ...props }>
    {/* Top — HERO (언어 = 주형, 컨텐츠 라인 보유) */}
    <g filter="url(#fig05_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-200)" strokeWidth="0.5" strokeLinejoin="round" d="M140 27l38 19v60l-38 19l-38-19v-60z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M102 46l38 19l38-19" />
      <path stroke="var(--vdl-700)" strokeLinecap="round" strokeWidth="0.5" d="M148 76l18 9M148 85l10 5" />
    </g>
    {/* Bottom — 구현 = 캐스트 (동일 형태, 컨텐츠 없음) */}
    <g filter="url(#fig05_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-200)" strokeWidth="0.5" strokeLinejoin="round" d="M140 155l38 19v60l-38 19l-38-19v-60z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M102 174l38 19l38-19" />
    </g>
    <defs>
      <filter id="fig05_s" x="-24" y="-24" width="328" height="328" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="6" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.031 0 0 0 0 0.035 0 0 0 0 0.039 0 0 0 0.6 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

/**
 * FIG 0.6 — 언어는 경험을 함축한다
 * 방사 확장: 중앙 대형 프리즘에서 외곽 소형 프리즘으로 높이가 감소하며 확장
 *
 * @param {object} props - SVG props passthrough [Optional]
 *
 * Example usage:
 * <LanguageIllustration />
 */
export const LanguageIllustration = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="280" height="270" fill="none" viewBox="0 0 280 270" { ...props }>
    {/* R1 NE (back, active) */}
    <g filter="url(#fig06_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-200)" strokeWidth="0.5" strokeLinejoin="round" d="M200 50l20 10v38l-20 10l-20-10v-38z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M180 60l20 10l20-10" />
    </g>
    {/* R6 NW (back, active) */}
    <g filter="url(#fig06_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-200)" strokeWidth="0.5" strokeLinejoin="round" d="M85 55l20 10v35l-20 10l-20-10v-35z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M65 65l20 10l20-10" />
    </g>
    {/* Center — HERO */}
    <g filter="url(#fig06_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-200)" strokeWidth="0.5" strokeLinejoin="round" d="M140 52l38 19v80l-38 19l-38-19v-80z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M102 71l38 19l38-19" />
      <path stroke="var(--vdl-700)" strokeLinecap="round" strokeWidth="0.5" d="M148 120l18 9" />
    </g>
    {/* R2 E (subtle) */}
    <g filter="url(#fig06_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-700)" strokeWidth="0.5" strokeLinejoin="round" d="M210 120l16 8v28l-16 8l-16-8v-28z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M194 128l16 8l16-8" />
    </g>
    {/* R5 W (subtle) */}
    <g filter="url(#fig06_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-700)" strokeWidth="0.5" strokeLinejoin="round" d="M72 128l16 8v26l-16 8l-16-8v-26z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M56 136l16 8l16-8" />
    </g>
    {/* R3 SE (subtle) */}
    <g filter="url(#fig06_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-700)" strokeWidth="0.5" strokeLinejoin="round" d="M182 185l14 7v18l-14 7l-14-7v-18z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M168 192l14 7l14-7" />
    </g>
    {/* R4 SW (subtle) */}
    <g filter="url(#fig06_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-700)" strokeWidth="0.5" strokeLinejoin="round" d="M82 188l14 7v18l-14 7l-14-7v-18z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M68 195l14 7l14-7" />
    </g>
    <defs>
      <filter id="fig06_s" x="-16" y="-16" width="312" height="302" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset />
        <feGaussianBlur stdDeviation="8" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.031 0 0 0 0 0.035 0 0 0 0 0.039 0 0 0 1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

/**
 * FIG 0.7 — 감각도 쪼개면 로직이다
 * 수직 피라미드: 하단(완성된 결과물)에서 상단(원자적 토큰)으로 분해되는 프리즘 적층
 *
 * @param {object} props - SVG props passthrough [Optional]
 *
 * Example usage:
 * <DesignIllustration />
 */
export const DesignIllustration = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="270" height="280" fill="none" viewBox="0 0 270 280" { ...props }>
    {/* P5 (top, smallest, subtle) */}
    <g filter="url(#fig07_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-700)" strokeWidth="0.5" strokeLinejoin="round" d="M135 8l16 8v8l-16 8l-16-8v-8z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M119 16l16 8l16-8" />
    </g>
    {/* P4 (subtle) */}
    <g filter="url(#fig07_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-700)" strokeWidth="0.5" strokeLinejoin="round" d="M135 34l22 11v13l-22 11l-22-11v-13z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M113 45l22 11l22-11" />
    </g>
    {/* P3 (default) */}
    <g filter="url(#fig07_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-600)" strokeWidth="0.5" strokeLinejoin="round" d="M135 71l29 14.5v20l-29 14.5l-29-14.5v-20z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M106 85.5l29 14.5l29-14.5" />
    </g>
    {/* P2 (active) */}
    <g filter="url(#fig07_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-200)" strokeWidth="0.5" strokeLinejoin="round" d="M135 122l37 18.5v30l-37 18.5l-37-18.5v-30z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M98 140.5l37 18.5l37-18.5" />
    </g>
    {/* P1 — HERO (bottom, largest) */}
    <g filter="url(#fig07_s)">
      <path fill="var(--vdl-950)" stroke="var(--vdl-200)" strokeWidth="0.5" strokeLinejoin="round" d="M135 191l46 23v42l-46 23l-46-23v-42z" />
      <path stroke="var(--vdl-800)" strokeLinecap="round" strokeWidth="0.5" d="M89 214l46 23l46-23" />
      <path stroke="var(--vdl-700)" strokeLinecap="round" strokeWidth="0.5" d="M143 240l22 11M143 248l12 6" />
    </g>
    <defs>
      <filter id="fig07_s" x="-16" y="-16" width="302" height="312" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset />
        <feGaussianBlur stdDeviation="8" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.031 0 0 0 0 0.035 0 0 0 0 0.039 0 0 0 1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

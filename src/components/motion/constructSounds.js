/**
 * Construct Sound System
 *
 * click 1종만 사용. 콘텐츠 등장 직전 시선 유도용 단발 신호.
 * Detuned dual-sine + bandpass 공명. 차갑고 정밀한 디지털 톤.
 *
 * 재생 규칙:
 * - AreaConstruct: tag phase (■ 등장)에서 1회
 * - ConstructBlock: sweep start에서 1회
 * - 한 Construct당 1회만, 뷰포트 진입 시만
 * - 동시 다발 금지: 300ms 이내 중복 재생 차단
 */

let _ctx = null;
let _lastPlayTime = 0;
let _warmed = false;

const DEBOUNCE_MS = 300;

function getCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

/**
 * 첫 사용자 제스처에서 AudioContext를 미리 활성화.
 * 이후 setTimeout/IntersectionObserver에서 호출해도 재생 가능.
 */
function warmUp() {
  if (_warmed) return;
  _warmed = true;
  getCtx();
  ['click', 'touchstart', 'keydown'].forEach((evt) =>
    document.removeEventListener(evt, warmUp, { capture: true }),
  );
}

if (typeof document !== 'undefined') {
  ['click', 'touchstart', 'keydown'].forEach((evt) =>
    document.addEventListener(evt, warmUp, { capture: true, once: false, passive: true }),
  );
}

/**
 * click — 차가운 핑. 900Hz detuned sine, bandpass 1200Hz, 45ms decay.
 */
function click() {
  const ctx = getCtx();
  const t = ctx.currentTime;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1200;
  filter.Q.value = 2;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, t);
  master.gain.linearRampToValueAtTime(0.1, t + 0.008);
  master.gain.exponentialRampToValueAtTime(0.001, t + 0.053);

  filter.connect(master).connect(ctx.destination);

  [-3, 3].forEach((d) => {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = 900;
    o.detune.value = d;
    o.connect(filter);
    o.start(t);
    o.stop(t + 0.06);
  });
}

/**
 * Construct 시작 사운드 재생
 *
 * 300ms 디바운스 적용 — 동시 다발 Construct에서 첫 번째만 재생.
 * prefers-reduced-motion 시 무음.
 */
export function playConstructClick() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const now = performance.now();
  if (now - _lastPlayTime < DEBOUNCE_MS) return;
  _lastPlayTime = now;

  click();
}

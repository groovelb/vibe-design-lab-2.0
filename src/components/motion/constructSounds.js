/**
 * Construct Sound System
 *
 * SND (snd.dev) 기반 UI 효과음.
 * 한 동작에 한 번, 최소한의 사운드.
 */

import Snd from 'snd-lib';

let _snd = null;
let _ready = false;

/**
 * SND 인스턴스 초기화 (lazy, 1회)
 * 첫 호출 시 에셋 로드 → 이후 즉시 재생.
 */
async function ensureReady() {
  if (_ready) return _snd;
  if (!_snd) {
    _snd = new Snd();
    await _snd.load(Snd.KITS.SND01);
    _ready = true;
  }
  return _snd;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * AreaConstruct phase 사운드
 *
 * tag → tap, scatter → button, done → toggle
 *
 * @param {'tag'|'scatter'|'reveal'|'done'} phase [Required]
 */
export async function playAreaConstructSound(phase) {
  if (prefersReducedMotion()) return;
  const snd = await ensureReady();
  switch (phase) {
    case 'tag': snd.play(Snd.SOUNDS.TAP); break;
    case 'scatter': snd.play(Snd.SOUNDS.BUTTON); break;
    case 'done': snd.play(Snd.SOUNDS.TOGGLE); break;
  }
}

/**
 * ConstructBlock 이벤트 사운드
 *
 * start → tap, complete → button
 *
 * @param {'start'|'complete'} event [Required]
 */
export async function playConstructBlockSound(event) {
  if (prefersReducedMotion()) return;
  const snd = await ensureReady();
  switch (event) {
    case 'start': snd.play(Snd.SOUNDS.TAP); break;
    case 'complete': snd.play(Snd.SOUNDS.BUTTON); break;
  }
}

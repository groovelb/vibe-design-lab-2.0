/**
 * Isometric Grid Coordinate System
 *
 * 3개 VP 일러스트가 공유하는 아이소메트릭 좌표계 유틸리티.
 * 각도: ~26.57° (atan(1/2), 2:1 dimetric projection)
 * 단위: u = 8px screen space
 */

const UNIT = 8;

/** 소수점 2자리 반올림 */
function r(n) {
  return Math.round(n * 100) / 100;
}

// ── 좌표 변환 ──

/**
 * 아이소메트릭 (ix, iy, iz) → 스크린 (sx, sy)
 *
 * @param {number} ix - X축 (우하 대각) [Required]
 * @param {number} iy - Y축 (좌하 대각) [Required]
 * @param {number} iz - Z축 (수직 상승) [Optional, 기본값: 0]
 * @param {object} origin - 원점 {x, y} [Optional]
 * @returns {{ x: number, y: number }}
 */
function isoToScreen(ix, iy, iz = 0, origin) {
  return {
    x: origin.x + (ix - iy) * UNIT,
    y: origin.y + (ix + iy) * (UNIT / 2) - iz * UNIT,
  };
}

// ── Prism (base-center) ──

/**
 * Prism SVG path — (ix,iy,iz)는 바닥면 중심
 *
 * @param {number} ix - X 위치 [Required]
 * @param {number} iy - Y 위치 [Required]
 * @param {number} iz - Z 위치 [Required]
 * @param {number} w - 반폭 (iso 단위) [Required]
 * @param {number} h - 높이 (iso 단위) [Required]
 * @param {object} origin - 원점 [Required]
 * @returns {object}
 */
function prism(ix, iy, iz, w, h, origin) {
  const hd = w * UNIT;
  const bh = h * UNIT;
  const base = isoToScreen(ix, iy, iz, origin);
  const cx = base.x;
  const topY = base.y - hd / 2 - bh;

  const outline = `M${r(cx)} ${r(topY)} l${r(hd)} ${r(hd / 2)} v${r(bh)} l${r(-hd)} ${r(hd / 2)} l${r(-hd)} ${r(-hd / 2)} v${r(-bh)} z`;
  const vLine = `M${r(cx - hd)} ${r(topY + hd / 2)} l${r(hd)} ${r(hd / 2)} l${r(hd)} ${r(-hd / 2)}`;

  return { outline, vLine, hd, bh, cx, topY,
    top: { x: cx, y: topY },
    topCenter: { x: cx, y: topY + hd / 2 },
    center: { x: cx, y: topY + hd / 2 + bh / 2 },
    baseCenter: base,
    bottom: { x: cx, y: topY + hd + bh },
    rightMid: { x: cx + hd, y: topY + hd / 2 + bh / 2 },
    leftMid: { x: cx - hd, y: topY + hd / 2 + bh / 2 },
  };
}

// ── 우측면 좌표계 ──
// t: 수직 (0=바디상단, 1=바디하단)
// s: 수평 (0=앞쪽 가장자리, 1=뒤쪽 가장자리)

/**
 * @param {object} p - prism() 결과 [Required]
 * @param {number} t - 수직 비율 0~1 [Required]
 * @param {number} s - 수평 비율 0~1 [Required]
 * @returns {{ x: number, y: number }}
 */
function rfp(p, t, s) {
  return {
    x: r(p.cx + s * p.hd),
    y: r(p.topY + p.hd + p.bh * t - s * p.hd / 2),
  };
}

/** 우측면 수평선 */
function rfLine(p, t, s1, s2) {
  const a = rfp(p, t, s1);
  const b = rfp(p, t, s2);
  return `M${a.x} ${a.y} L${b.x} ${b.y}`;
}

/** 우측면 사각형 */
function rfRect(p, t1, s1, t2, s2) {
  const tl = rfp(p, t1, s1);
  const tr = rfp(p, t1, s2);
  const br = rfp(p, t2, s2);
  const bl = rfp(p, t2, s1);
  return `M${tl.x} ${tl.y} L${tr.x} ${tr.y} L${br.x} ${br.y} L${bl.x} ${bl.y} z`;
}

// ── 상면(Top Face) 좌표계 ──
// u: iso-X 방향 (0=top vertex 쪽, 1=right vertex 쪽)
// v: iso-Y 방향 (0=top vertex 쪽, 1=left vertex 쪽)

/**
 * @param {object} p - prism() 결과 [Required]
 * @param {number} u - iso-X 비율 0~1 [Required]
 * @param {number} v - iso-Y 비율 0~1 [Required]
 * @returns {{ x: number, y: number }}
 */
function tfp(p, u, v) {
  return {
    x: r(p.cx + (u - v) * p.hd),
    y: r(p.topY + (u + v) * p.hd / 2),
  };
}

/** 상면 직선 */
function tfLine(p, u1, v1, u2, v2) {
  const a = tfp(p, u1, v1);
  const b = tfp(p, u2, v2);
  return `M${a.x} ${a.y} L${b.x} ${b.y}`;
}

/** 상면 사각형 */
function tfRect(p, u1, v1, u2, v2) {
  const tl = tfp(p, u1, v1);
  const tr = tfp(p, u2, v1);
  const br = tfp(p, u2, v2);
  const bl = tfp(p, u1, v2);
  return `M${tl.x} ${tl.y} L${tr.x} ${tr.y} L${br.x} ${br.y} L${bl.x} ${bl.y} z`;
}

// ── 어노테이션 ──

/**
 * Naming Line (파트 → 레이블 연결)
 *
 * @param {number} fromX - screen X [Required]
 * @param {number} fromY - screen Y [Required]
 * @param {number} length - 수평 길이 [Required]
 * @param {'left'|'right'} dir - 방향 [Optional, 기본값: 'right']
 * @returns {{ line: string, dot: {cx,cy}, labelAnchor: {x,y} }}
 */
function namingLine(fromX, fromY, length, dir = 'right') {
  const sign = dir === 'right' ? 1 : -1;
  const endX = fromX + length * sign;
  return {
    line: `M${r(fromX)} ${r(fromY)} L${r(endX)} ${r(fromY)}`,
    dot: { cx: r(fromX), cy: r(fromY) },
    labelAnchor: { x: r(endX + 4 * sign), y: r(fromY) },
  };
}

/**
 * Dimension Line (치수 표기)
 */
function dimensionLine(x1, y1, x2, y2, offset = 6) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = (-dy / len) * offset;
  const ny = (dx / len) * offset;
  const ox1 = x1 + nx; const oy1 = y1 + ny;
  const ox2 = x2 + nx; const oy2 = y2 + ny;
  const tl = 3;
  const tx = (-ny / offset) * tl;
  const ty = (nx / offset) * tl;
  return {
    line: `M${r(ox1)} ${r(oy1)} L${r(ox2)} ${r(oy2)}`,
    ticks: [
      `M${r(ox1 - tx)} ${r(oy1 - ty)} L${r(ox1 + tx)} ${r(oy1 + ty)}`,
      `M${r(ox2 - tx)} ${r(oy2 - ty)} L${r(ox2 + tx)} ${r(oy2 + ty)}`,
    ],
    midpoint: { x: r((ox1 + ox2) / 2), y: r((oy1 + oy2) / 2) },
  };
}

/** 바닥면 그리드 */
function floorGrid(rangeX, rangeY, step, origin) {
  const xLines = [];
  const yLines = [];
  for (let ix = -rangeX; ix <= rangeX; ix += step) {
    const a = isoToScreen(ix, -rangeY, 0, origin);
    const b = isoToScreen(ix, rangeY, 0, origin);
    xLines.push(`M${r(a.x)} ${r(a.y)} L${r(b.x)} ${r(b.y)}`);
  }
  for (let iy = -rangeY; iy <= rangeY; iy += step) {
    const a = isoToScreen(-rangeX, iy, 0, origin);
    const b = isoToScreen(rangeX, iy, 0, origin);
    yLines.push(`M${r(a.x)} ${r(a.y)} L${r(b.x)} ${r(b.y)}`);
  }
  return { xLines, yLines };
}

export {
  UNIT, r,
  isoToScreen,
  prism,
  rfp, rfLine, rfRect,
  tfp, tfLine, tfRect,
  namingLine,
  dimensionLine,
  floorGrid,
};

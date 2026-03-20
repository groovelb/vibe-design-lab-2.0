/**
 * Clean bezier curve generators for SVG paths
 *
 * Produces orderly, architectural curves — not wavy/organic.
 * Uses SVG cubic bezier (C command) for perfectly smooth results.
 */

/**
 * Clean bezier with long straight runs + tight turn at the y-transition.
 *
 * Shape:
 *   A ─────────────╮
 *                   │  ← tight curve (high curvature, short segment)
 *                   ╰─────────────── B
 *
 * straightRatio: how much of the total dx is straight (0.7 = 70% straight, 30% curve)
 * The curve section is a short cubic bezier connecting the two horizontal runs.
 */
export function cleanBezier(x1, y1, x2, y2, { straightRatio = 0.7 } = {}) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (Math.abs(dy) < 2) {
    // Nearly horizontal — straight line
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  // Split the horizontal distance: long straight on each side, tight curve in between
  const straightLen = dx * straightRatio * 0.5;
  const bendX1 = x1 + straightLen;            // end of first straight
  const bendX2 = x2 - straightLen;            // start of second straight
  const bendW = bendX2 - bendX1;              // width of the curve zone

  return [
    `M ${x1} ${y1}`,
    `L ${bendX1} ${y1}`,                       // long straight run at y1
    `C ${bendX1 + bendW * 0.5} ${y1},`,        // control 1: ease out horizontally
    `  ${bendX2 - bendW * 0.5} ${y2},`,        // control 2: ease in horizontally
    `  ${bendX2} ${y2}`,                        // end of curve at y2
    `L ${x2} ${y2}`,                            // long straight run at y2
  ].join(' ');
}

/**
 * Stepped bezier: horizontal line → smooth turn → horizontal line into target.
 * Like a circuit-board trace with rounded corners.
 *
 * A ────── ╮
 *          │  (smooth bezier turn)
 *          ╰────── B
 */
export function steppedBezier(x1, y1, x2, y2, { midRatio = 0.55, radius = 0.12 } = {}) {
  const mx = x1 + (x2 - x1) * midRatio;
  const r = Math.min(Math.abs(y2 - y1) * radius, Math.abs(x2 - x1) * 0.15);
  const dir = y2 > y1 ? 1 : -1;

  if (Math.abs(y2 - y1) < 2) {
    // Nearly horizontal — just a straight line
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  return [
    `M ${x1} ${y1}`,
    `L ${mx - r} ${y1}`,
    `C ${mx} ${y1}, ${mx} ${y1}, ${mx} ${y1 + dir * r}`,
    `L ${mx} ${y2 - dir * r}`,
    `C ${mx} ${y2}, ${mx} ${y2}, ${mx + r} ${y2}`,
    `L ${x2} ${y2}`,
  ].join(' ');
}

/**
 * Lissajous curve (closed loop, for decorative orbit rings)
 *
 * x(t) = cx + rx * sin(a * 2π * t + δ)
 * y(t) = cy + ry * sin(b * 2π * t)
 */
export function lissajousPath(cx, cy, rx, ry, { a = 3, b = 2, delta = Math.PI / 2 } = {}) {
  const steps = 120;
  const parts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = (cx + rx * Math.sin(a * 2 * Math.PI * t + delta)).toFixed(2);
    const y = (cy + ry * Math.sin(b * 2 * Math.PI * t)).toFixed(2);
    parts.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }
  return parts.join(' ');
}

/**
 * Rose curve (rhodonea) — r = cos(k * θ)
 */
export function rosePath(cx, cy, radius, { petals = 5 } = {}) {
  const k = petals;
  const steps = 200;
  const parts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const theta = 2 * Math.PI * t;
    const r = radius * Math.cos(k * theta);
    const x = (cx + r * Math.cos(theta)).toFixed(2);
    const y = (cy + r * Math.sin(theta)).toFixed(2);
    parts.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }
  return parts.join(' ');
}

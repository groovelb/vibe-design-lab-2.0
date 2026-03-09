'use client';

import {
  UNIT, isoToScreen, prism, floorGrid, namingLine, r,
} from './isometricGrid';

/**
 * Isometric Grid Reference — 좌표계 검증용
 *
 * @param {object} props - SVG props passthrough [Optional]
 */

const W = 280;
const H = 280;
const O = { x: 140, y: 190 };

export const IsometricGridReference = (props) => {
  const floor = floorGrid(8, 8, 2, O);
  const axisO = isoToScreen(0, 0, 0, O);
  const axisX = isoToScreen(9, 0, 0, O);
  const axisY = isoToScreen(0, 9, 0, O);
  const axisZ = isoToScreen(0, 0, 10, O);
  const demo = prism(2, 2, 0, 2.5, 3, O);
  const nl = namingLine(demo.rightMid.x + 2, demo.rightMid.y, 36);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={W} height={H} fill="none" viewBox={`0 0 ${W} ${H}`} {...props}>
      <g stroke="var(--vdl-800)" strokeWidth="0.25" opacity="0.4">
        {floor.xLines.map((d, i) => <path key={`fx${i}`} d={d} />)}
        {floor.yLines.map((d, i) => <path key={`fy${i}`} d={d} />)}
      </g>
      <g strokeWidth="0.5" strokeLinecap="round">
        <path d={`M${r(axisO.x)} ${r(axisO.y)} L${r(axisX.x)} ${r(axisX.y)}`} stroke="var(--vdl-600)" />
        <path d={`M${r(axisO.x)} ${r(axisO.y)} L${r(axisY.x)} ${r(axisY.y)}`} stroke="var(--vdl-600)" />
        <path d={`M${r(axisO.x)} ${r(axisO.y)} L${r(axisZ.x)} ${r(axisZ.y)}`} stroke="var(--vdl-600)" />
      </g>
      <text x={r(axisX.x + 4)} y={r(axisX.y)} fill="var(--vdl-600)" fontSize="7" fontFamily="monospace" dominantBaseline="middle">X</text>
      <text x={r(axisY.x - 10)} y={r(axisY.y)} fill="var(--vdl-600)" fontSize="7" fontFamily="monospace" dominantBaseline="middle">Y</text>
      <text x={r(axisZ.x + 4)} y={r(axisZ.y)} fill="var(--vdl-600)" fontSize="7" fontFamily="monospace" dominantBaseline="middle">Z</text>
      <circle cx={r(axisO.x)} cy={r(axisO.y)} r="2" fill="var(--vdl-200)" />
      <path d={demo.outline} fill="var(--vdl-950)" stroke="var(--vdl-200)" strokeWidth="0.5" strokeLinejoin="round" />
      <path d={demo.vLine} stroke="var(--vdl-800)" strokeWidth="0.5" strokeLinecap="round" />
      <circle cx={nl.dot.cx} cy={nl.dot.cy} r={1.5} fill="var(--vdl-200)" />
      <path d={nl.line} stroke="var(--vdl-200)" strokeWidth="0.5" />
      <text x={nl.labelAnchor.x} y={nl.labelAnchor.y} fill="var(--vdl-200)" fontSize="6" fontFamily="monospace" dominantBaseline="middle">Prism(2,2,0)</text>
      <text x="8" y="12" fill="var(--vdl-700)" fontSize="6" fontFamily="monospace">origin: ({O.x},{O.y}) · unit: {UNIT}px</text>
    </svg>
  );
};

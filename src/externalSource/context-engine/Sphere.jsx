import { useRef, useEffect, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { generateSpherePoints, projectPoint, zSort } from './math';
import { SPHERE, COLORS } from './constants';

/**
 * 3D rotating sphere with square nodes
 * - No labels, no glow rings — clean and minimal
 * - GSAP drives 60s continuous Y-axis rotation
 * - Z-sorted SVG rects updated via direct DOM manipulation
 * - Relevant nodes pulse opacity independently
 */
export default function Sphere({
  pointCount = 120,
  rotationDuration = 60,
  accentColor = COLORS.green,
}) {
  const groupRef = useRef(null);
  const nodesRef = useRef([]);
  const rotationRef = useRef({ value: 0 });

  // Generate points once
  const points = useMemo(() => generateSpherePoints(pointCount, 0.25), [pointCount]);

  // Render frame: project, sort, update DOM
  const renderFrame = useCallback(() => {
    const angle = rotationRef.current.value;
    const projected = points.map(p => ({
      ...p,
      ...projectPoint(p, angle, SPHERE.cx, SPHERE.cy, SPHERE.r),
    }));
    const sorted = zSort(projected);

    sorted.forEach((p, drawIndex) => {
      const node = nodesRef.current[drawIndex];
      if (!node) return;

      const s = p.size * 1.4; // square side length
      node.setAttribute('x', p.sx - s / 2);
      node.setAttribute('y', p.sy - s / 2);
      node.setAttribute('width', s);
      node.setAttribute('height', s);
      node.setAttribute('fill', p.isRelevant ? accentColor : COLORS.muted);
      node.setAttribute('opacity', p.isRelevant ? p.opacity : p.opacity * 0.25);
    });
  }, [points, accentColor]);

  // GSAP rotation + render loop
  useEffect(() => {
    const tl = gsap.to(rotationRef.current, {
      value: Math.PI * 2,
      duration: rotationDuration,
      ease: 'none',
      repeat: -1,
      onUpdate: renderFrame,
    });

    return () => tl.kill();
  }, [rotationDuration, renderFrame]);

  const setNodeRef = useCallback((el, i) => {
    nodesRef.current[i] = el;
  }, []);

  return (
    <g ref={groupRef}>
      {/* Main orbit ring */}
      <circle cx={SPHERE.cx} cy={SPHERE.cy} r={SPHERE.r}
        fill="none" stroke={COLORS.muted} strokeWidth={0.5} opacity={0.06} />

      {/* Square nodes (z-sorted by renderFrame) */}
      {points.map((_, i) => (
        <rect key={i}
          ref={el => setNodeRef(el, i)}
          x={SPHERE.cx} y={SPHERE.cy}
          width={4} height={4} rx={0.5}
          fill={COLORS.muted} opacity={0}
        />
      ))}
    </g>
  );
}

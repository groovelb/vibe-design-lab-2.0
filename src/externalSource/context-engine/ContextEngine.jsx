import { useRef, useEffect, useState, forwardRef } from 'react';
import Sphere from './Sphere';
import InputStreams from './InputStreams';
import OutputChannels from './OutputChannels';
import FloatingNodes from './FloatingNodes';
import { VIEW, COLORS, SPHERE as SP } from './constants';

/**
 * Context Engine Visualization
 *
 * Self-contained interactive SVG component.
 * Drop into any React project with: import ContextEngine from './context-engine/ContextEngine'
 *
 * Dependencies: react, gsap
 *
 * SVG 1600×500:
 *   Left:   6 input streams with bezier curves
 *   Center: 3D rotating sphere (120 golden-spiral square nodes)
 *   Right:  4 output channels with bezier curves
 *
 * Mobile (<1024px): FloatingNodes fallback (25 DOM divs with physics)
 */

const ContextEngine = forwardRef(function ContextEngine({
  className,
  accentColor = COLORS.green,
  stats = { sources: 4456, relevant: 682 },
}, ref) {
  const svgRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  // Responsive: switch between SVG and FloatingNodes
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const handler = (e) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // IO-based pause for SVG animation
  useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!svgRef.current) return;
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const progressWidth = stats.sources > 0
    ? Math.round((stats.relevant / stats.sources) * 160)
    : 24;

  return (
    <div ref={ref} className={className || ''} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Desktop: SVG visualization */}
      {isDesktop ? (
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block' }}
        >
          {/* Input streams (left) */}
          <InputStreams accentColor={accentColor} />

          {/* 3D Sphere (center) */}
          <Sphere accentColor={accentColor} />

          {/* Output channels (right) */}
          <OutputChannels accentColor={accentColor} />

          {/* Statistics bar (bottom center) */}
          <g opacity={0.4}>
            <text x={SP.cx - 80} y={SP.cy + SP.r + 50}
              fill={COLORS.muted} fontSize={9}
              fontFamily="'IBM Plex Mono', monospace">
              {stats.sources.toLocaleString()} sources
            </text>
            <text x={SP.cx + 10} y={SP.cy + SP.r + 50}
              fill={COLORS.muted} fontSize={9}
              fontFamily="'IBM Plex Mono', monospace">
              →
            </text>
            <text x={SP.cx + 25} y={SP.cy + SP.r + 50}
              fill={accentColor} fontSize={9}
              fontFamily="'IBM Plex Mono', monospace" fontWeight={600}>
              {stats.relevant.toLocaleString()} relevant
            </text>

            {/* Progress bar */}
            <rect x={SP.cx - 80} y={SP.cy + SP.r + 58}
              width={160} height={3} rx={1.5}
              fill={COLORS.border} />
            <rect x={SP.cx - 80} y={SP.cy + SP.r + 58}
              width={progressWidth} height={3} rx={1.5}
              fill={accentColor} opacity={0.8} />
          </g>

          {/* Figure caption */}
          <text x={VIEW.w - 30} y={VIEW.h - 20} textAnchor="end"
            fill={COLORS.muted} fontSize={8}
            fontFamily="'IBM Plex Mono', monospace" opacity={0.25}>
            Fig. 1.1
          </text>
        </svg>
      ) : (
        /* Mobile: FloatingNodes fallback */
        <FloatingNodes accentColor={accentColor} />
      )}
    </div>
  );
});

export default ContextEngine;

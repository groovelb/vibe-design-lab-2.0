import { INPUT_STREAMS, SPHERE, COLORS, LAYOUT } from './constants';
import { cleanBezier } from './curves';

/**
 * Left panel: 6 input streams with clean cubic bezier curves
 *
 * Each stream: label → status dots → smooth bezier arc → sphere edge
 * Curves leave the label horizontally, arc cleanly into the sphere center.
 */
export default function InputStreams({ accentColor = COLORS.green }) {
  const { inputLabelX, inputDotsX, inputPathStartX } = LAYOUT;
  const sphereEdgeX = SPHERE.cx - SPHERE.r;

  return (
    <g>
      {/* Section label */}
      <text x={inputLabelX} y={55} fill={COLORS.muted}
        fontSize={9} fontFamily="'IBM Plex Mono', monospace"
        letterSpacing="0.08em" opacity={0.5}>
        REALTIME RAW CONTEXT
      </text>

      {INPUT_STREAMS.map((stream, i) => {
        const { label, y } = stream;

        // Long straight runs + tight bezier turn where y changes
        const path = cleanBezier(
          inputPathStartX, y,
          sphereEdgeX, SPHERE.cy,
          { straightRatio: 0.7 }
        );

        return (
          <g key={i}>
            {/* Stream label */}
            <text x={inputLabelX} y={y + 4} fill={COLORS.muted}
              fontSize={10} fontFamily="'IBM Plex Mono', monospace" opacity={0.4}>
              {label}
            </text>

            {/* Status indicator squares */}
            {[0, 1, 2, 3].map(d => (
              <rect key={d}
                x={inputDotsX + d * 12 - 2.5} y={y - 2.5}
                width={5} height={5} rx={0.5}
                fill={accentColor}
                opacity={0.12 + d * 0.06}
              />
            ))}

            {/* Guide path (clean bezier, subtle) */}
            <path d={path} fill="none" stroke={accentColor}
              strokeWidth={0.6} opacity={0.07} />

            {/* Animated particle (square) */}
            <rect x={-3} y={-3} width={6} height={6} rx={1} fill={accentColor}>
              <animateMotion
                dur="3.5s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
                keySplines="0.4 0 0.2 1"
                calcMode="spline"
                rotate="auto"
                path={path}
              />
              <animate
                attributeName="opacity"
                values="0;0.8;0.5;0"
                keyTimes="0;0.08;0.6;1"
                dur="3.5s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </rect>

            {/* Second particle (smaller square) */}
            <rect x={-2} y={-2} width={4} height={4} rx={0.5} fill={accentColor}>
              <animateMotion
                dur="3.5s"
                begin={`${i * 0.4 + 1.7}s`}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
                keySplines="0.4 0 0.2 1"
                calcMode="spline"
                rotate="auto"
                path={path}
              />
              <animate
                attributeName="opacity"
                values="0;0.5;0.3;0"
                keyTimes="0;0.1;0.6;1"
                dur="3.5s"
                begin={`${i * 0.4 + 1.7}s`}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        );
      })}
    </g>
  );
}

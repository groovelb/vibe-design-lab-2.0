import { OUTPUT_CHANNELS, SPHERE, COLORS, LAYOUT } from './constants';
import { cleanBezier } from './curves';

/**
 * Right panel: 4 output channels with clean cubic bezier curves
 *
 * Each channel: sphere edge → smooth bezier arc → endpoint
 * Curves leave sphere horizontally, arc into endpoint horizontally.
 */
export default function OutputChannels({ accentColor = COLORS.green }) {
  const sphereEdgeX = SPHERE.cx + SPHERE.r;
  const { outputEndX, outputLabelX } = LAYOUT;

  return (
    <g>
      {/* Section label */}
      <text x={outputLabelX} y={55} fill={COLORS.muted}
        fontSize={9} fontFamily="'IBM Plex Mono', monospace"
        letterSpacing="0.08em" opacity={0.5}>
        CURATED CONTEXT
      </text>

      {OUTPUT_CHANNELS.map((channel, i) => {
        const { label, y } = channel;

        // Long straight runs + tight bezier turn where y changes
        const path = cleanBezier(
          sphereEdgeX, SPHERE.cy,
          outputEndX, y,
          { straightRatio: 0.7 }
        );

        return (
          <g key={i}>
            {/* Guide path (clean bezier, subtle) */}
            <path d={path} fill="none" stroke={accentColor}
              strokeWidth={0.6} opacity={0.07} />

            {/* Animated particle (square) */}
            <rect x={-3} y={-3} width={6} height={6} rx={1} fill={accentColor}>
              <animateMotion
                dur="3s"
                begin={`${i * 0.55}s`}
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
                values="0;0.7;0.6;0"
                keyTimes="0;0.12;0.7;1"
                dur="3s"
                begin={`${i * 0.55}s`}
                repeatCount="indefinite"
              />
            </rect>

            {/* Second particle (smaller square) */}
            <rect x={-2} y={-2} width={4} height={4} rx={0.5} fill={accentColor}>
              <animateMotion
                dur="3s"
                begin={`${i * 0.55 + 1.5}s`}
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
                values="0;0.4;0.3;0"
                keyTimes="0;0.1;0.65;1"
                dur="3s"
                begin={`${i * 0.55 + 1.5}s`}
                repeatCount="indefinite"
              />
            </rect>

            {/* Endpoint square (pulsing) */}
            <rect x={outputEndX - 5} y={y - 5} width={10} height={10} rx={1}
              fill={accentColor} opacity={0.7}>
              <animate
                attributeName="opacity"
                values="0.7;0.95;0.7"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </rect>
            {/* Endpoint glow */}
            <rect x={outputEndX - 12} y={y - 12} width={24} height={24} rx={2}
              fill={accentColor} opacity={0.06}>
              <animate
                attributeName="opacity"
                values="0.04;0.1;0.04"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </rect>

            {/* Channel label */}
            <text x={outputLabelX + 18} y={y + 4} fill={COLORS.muted}
              fontSize={10} fontFamily="'IBM Plex Mono', monospace" opacity={0.6}>
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

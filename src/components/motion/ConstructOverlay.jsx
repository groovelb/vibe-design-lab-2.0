'use client';
import Box from '@mui/material/Box';
import { ANCHOR_SIZE, SPRING, EASE_OUT, T } from './constants';

const TAG_W = ANCHOR_SIZE;
const TAG_H = ANCHOR_SIZE;

/**
 * ConstructOverlay 컴포넌트
 *
 * Construct 시스템의 공유 비주얼 프리미티브.
 * 4개의 앵커(꼭지점)와 4개의 엣지(변)로 바운딩 박스 애니메이션을 표현한다.
 * phase와 size만 받는 순수 프레젠테이션 컴포넌트.
 *
 * @param {string} phase - 'idle'|'tag'|'scatter'|'reveal'|'done' [Required]
 * @param {{ w: number, h: number }} size - 컨테이너 크기 [Required]
 *
 * Example usage:
 * <ConstructOverlay phase={phase} size={size} />
 */
function ConstructOverlay({ phase, size }) {
  const { w, h } = size;
  const isVisible = phase !== 'idle';
  const isExpanded = phase === 'scatter';
  const isExiting = phase === 'reveal' || phase === 'done';

  const AH = ANCHOR_SIZE / 2;
  const rX = w > 0 ? TAG_W / w : 0;
  const rY = h > 0 ? TAG_H / h : 0;
  const offX = w - TAG_W;
  const offY = h - TAG_H;

  const anchors =
    w > 0
      ? [
          { x: -AH, y: -AH, tx: -AH, ty: -AH },
          { x: TAG_W - AH, y: -AH, tx: w - AH, ty: -AH },
          { x: -AH, y: TAG_H - AH, tx: -AH, ty: h - AH },
          { x: TAG_W - AH, y: TAG_H - AH, tx: w - AH, ty: h - AH },
        ]
      : [];

  const edgeTransition = isExiting
    ? `transform ${T.reveal}ms ${EASE_OUT}`
    : `transform ${T.scatter}ms ${SPRING}, opacity ${T.tag}ms ${EASE_OUT}`;

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        '@media (prefers-reduced-motion: reduce)': { display: 'none' },
      }}
    >
      {/* 상변 */}
      <Box
        sx={{
          position: 'absolute',
          top: '-0.25px',
          left: 0,
          right: 0,
          height: '0.5px',
          backgroundColor: 'primary.main',
          transformOrigin: 'left',
          transform: isExpanded
            ? 'scaleX(1)'
            : phase === 'tag'
              ? `scaleX(${rX})`
              : 'scaleX(0)',
          opacity: isVisible ? 1 : 0.01,
          transition: edgeTransition,
          willChange: 'transform',
        }}
      />
      {/* 좌변 */}
      <Box
        sx={{
          position: 'absolute',
          left: '-0.25px',
          top: 0,
          bottom: 0,
          width: '0.5px',
          backgroundColor: 'primary.main',
          transformOrigin: 'top',
          transform: isExpanded
            ? 'scaleY(1)'
            : phase === 'tag'
              ? `scaleY(${rY})`
              : 'scaleY(0)',
          opacity: isVisible ? 1 : 0.01,
          transition: edgeTransition,
          willChange: 'transform',
        }}
      />
      {/* 하변 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-0.25px',
          left: 0,
          right: 0,
          height: '0.5px',
          backgroundColor: 'primary.main',
          transformOrigin: 'left',
          transform: isExpanded
            ? 'translateY(0px) scaleX(1)'
            : phase === 'tag'
              ? `translateY(${-offY}px) scaleX(${rX})`
              : isExiting
                ? 'translateY(0px) scaleX(0)'
                : `translateY(${-offY}px) scaleX(0)`,
          opacity: isVisible ? 1 : 0.01,
          transition: edgeTransition,
          willChange: 'transform',
        }}
      />
      {/* 우변 */}
      <Box
        sx={{
          position: 'absolute',
          right: '-0.25px',
          top: 0,
          bottom: 0,
          width: '0.5px',
          backgroundColor: 'primary.main',
          transformOrigin: 'top',
          transform: isExpanded
            ? 'translateX(0px) scaleY(1)'
            : phase === 'tag'
              ? `translateX(${-offX}px) scaleY(${rY})`
              : isExiting
                ? 'translateX(0px) scaleY(0)'
                : `translateX(${-offX}px) scaleY(0)`,
          opacity: isVisible ? 1 : 0.01,
          transition: edgeTransition,
          willChange: 'transform',
        }}
      />

      {/* 앵커 — 엣지 수축 완료 후 페이드아웃 */}
      {anchors.map((a, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: ANCHOR_SIZE,
            height: ANCHOR_SIZE,
            backgroundColor: 'primary.main',
            transform:
              isExpanded || isExiting
                ? `translate3d(${a.tx}px, ${a.ty}px, 0)`
                : `translate3d(${a.x}px, ${a.y}px, 0)`,
            opacity: isExiting ? 0 : isVisible ? 1 : 0.01,
            transition: isExiting
              ? `opacity 150ms ${EASE_OUT} ${T.reveal}ms`
              : `transform ${T.scatter}ms ${SPRING}, opacity ${T.tag}ms ${EASE_OUT}`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </Box>
  );
}

export { ConstructOverlay };

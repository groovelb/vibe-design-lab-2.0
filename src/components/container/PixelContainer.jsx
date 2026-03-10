'use client';
import { forwardRef, useRef, useEffect, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

/** linear */
const linear = (t) => t;

/**
 * PixelContainer 컴포넌트
 *
 * 배경이 픽셀 단위로 한쪽 방향에서부터 채워지는 키 비쥬얼 컨테이너.
 * 뷰포트 진입 시 픽셀이 순차적으로 나타나며, 각 픽셀은 약간의 랜덤 오프셋으로
 * 자연스러운 디지털 질감을 만든다.
 *
 * @param {string} direction - 픽셀이 채워지는 시작 방향 ('left' | 'right' | 'top' | 'bottom') [Optional, 기본값: 'left']
 * @param {number} pixelSize - 각 픽셀의 크기 (px) [Optional, 기본값: 8]
 * @param {string} color - 픽셀 색상 (MUI 테마 토큰 또는 CSS 색상) [Optional, 기본값: 'text.primary']
 * @param {number} progress - 채움 진행률 (0~1). 미지정 시 뷰포트 진입 기반 자동 [Optional]
 * @param {boolean} isTriggerOnView - 뷰포트 진입 시 애니메이션 트리거 여부 [Optional, 기본값: true]
 * @param {number} duration - 애니메이션 지속 시간 (ms) [Optional, 기본값: 1500]
 * @param {number} delay - 애니메이션 시작 지연 시간 (ms) [Optional, 기본값: 0]
 * @param {boolean} isShimmering - 픽셀 반짝임 효과 활성화 여부 [Optional, 기본값: false]
 * @param {ReactNode} children - 컨테이너 내부 콘텐츠 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <PixelContainer direction="left" pixelSize={8} color="text.primary">
 *   <Typography variant="h1">Content</Typography>
 * </PixelContainer>
 */
const PixelContainer = forwardRef(function PixelContainer({
  direction = 'left',
  pixelSize = 8,
  color = 'text.primary',
  progress: controlledProgress,
  isTriggerOnView = true,
  duration = 1500,
  delay = 0,
  isShimmering = false,
  children,
  sx,
  ...props
}, ref) {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pixelsRef = useRef(null);
  const gridKeyRef = useRef('');
  const progressRef = useRef(0);

  /** MUI 테마 토큰을 CSS 색상으로 변환 */
  const resolvedColor = useMemo(() => {
    const parts = color.split('.');
    let resolved = theme.palette;
    for (const part of parts) {
      resolved = resolved?.[part];
    }
    return typeof resolved === 'string' ? resolved : color;
  }, [color, theme.palette]);

  /** 픽셀 그리드 생성 — 방향에 따른 threshold + 랜덤 오프셋 */
  const generatePixels = useCallback((cols, rows) => {
    const pixels = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let baseProgress;
        switch (direction) {
          case 'left': baseProgress = x / cols; break;
          case 'right': baseProgress = 1 - x / cols; break;
          case 'top': baseProgress = y / rows; break;
          case 'bottom': baseProgress = 1 - y / rows; break;
          default: baseProgress = x / cols;
        }
        const randomOffset = (Math.random() - 0.5) * 0.2;
        pixels.push({
          x, y,
          threshold: Math.max(0, Math.min(1, baseProgress + randomOffset)),
          shimmerPhase: Math.random() * Math.PI * 2,
          shimmerSpeed: 1.5 + Math.random() * 3,
        });
      }
    }
    return pixels;
  }, [direction]);

  /** Canvas 드로잉 */
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const cols = Math.ceil(width / pixelSize);
    const rows = Math.ceil(height / pixelSize);
    const key = `${cols}-${rows}-${direction}`;

    if (gridKeyRef.current !== key) {
      pixelsRef.current = generatePixels(cols, rows);
      gridKeyRef.current = key;
    }

    ctx.clearRect(0, 0, width, height);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const p = prefersReducedMotion ? 1 : progressRef.current;

    ctx.fillStyle = resolvedColor;
    for (const pixel of pixelsRef.current) {
      if (p >= pixel.threshold) {
        ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
      }
    }
  }, [pixelSize, resolvedColor, generatePixels, direction]);

  /** controlled progress 변경 시 캔버스 갱신 */
  useEffect(() => {
    if (controlledProgress !== undefined) {
      progressRef.current = controlledProgress;
      drawCanvas();
    }
  }, [controlledProgress, drawCanvas]);

  /** 뷰포트 진입 시 애니메이션 */
  useEffect(() => {
    if (controlledProgress !== undefined || !isTriggerOnView) return;
    const container = containerRef.current;
    if (!container) return;

    let rafId;
    let delayId;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startAnimation = () => {
            const startTime = performance.now();
            const animate = (now) => {
              const elapsed = now - startTime;
              const t = Math.min(1, elapsed / duration);
              progressRef.current = linear(t);
              drawCanvas();
              if (t < 1) {
                rafId = requestAnimationFrame(animate);
              }
            };
            rafId = requestAnimationFrame(animate);
          };
          if (delay > 0) {
            delayId = setTimeout(startAnimation, delay);
          } else {
            startAnimation();
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (delayId) clearTimeout(delayId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [controlledProgress, isTriggerOnView, duration, delay, drawCanvas]);

  /** hover 시 progress 0.9~1 왕복 애니메이션 */
  useEffect(() => {
    if (!isShimmering) return;

    let rafId;
    const animate = (now) => {
      const time = now * 0.001;
      progressRef.current = 0.95 + 0.05 * Math.sin(time * 6);
      drawCanvas();
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      progressRef.current = 1;
      drawCanvas();
    };
  }, [isShimmering, drawCanvas]);

  /** 초기 드로잉 (controlled mode) */
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  /** 리사이즈 시 그리드 무효화 + 리드로우 */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => {
      gridKeyRef.current = '';
      drawCanvas();
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [drawCanvas]);

  /** ref 병합 */
  const setRefs = useCallback((node) => {
    containerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  }, [ref]);

  return (
    <Box
      ref={setRefs}
      sx={{ position: 'relative', overflow: 'hidden', ...sx }}
      {...props}
    >
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Box>
  );
});

export { PixelContainer };

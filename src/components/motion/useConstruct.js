'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { T } from './constants';

/**
 * useConstruct 훅
 *
 * Construct 시스템의 공유 상태 머신.
 * phase 전이(idle → tag → scatter → reveal → done),
 * 컨테이너 크기 측정, 뷰포트 감지를 캡슐화한다.
 *
 * @param {object} options
 * @param {boolean} options.isTriggerOnView - 뷰포트 진입 시 트리거 [Optional, 기본값: true]
 * @param {number} options.delay - 시작 지연 ms [Optional, 기본값: 0]
 * @param {number|'center'} options.trigger - useInView trigger [Optional, 기본값: 'center']
 *
 * @returns {{ phase: string, handleRef: function, size: { w: number, h: number } }}
 *
 * Example usage:
 * const { phase, handleRef, size } = useConstruct({ isTriggerOnView: true, delay: 120 });
 */
export function useConstruct({ isTriggerOnView = true, delay = 0, trigger = 'center' } = {}) {
  const innerRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [phase, setPhase] = useState('idle');

  const [inViewRef, isInView] = useInView({
    trigger,
    delay,
    isEnabled: isTriggerOnView,
  });

  const handleRef = useCallback(
    (el) => {
      innerRef.current = el;
      inViewRef(el);
    },
    [inViewRef],
  );

  /** 컨테이너 크기 측정 */
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /** 뷰포트 진입 또는 즉시 시작 */
  useEffect(() => {
    if (!isTriggerOnView) {
      if (phase === 'idle') {
        const t = setTimeout(() => setPhase('tag'), delay);
        return () => clearTimeout(t);
      }
      return;
    }
    if (isInView && phase === 'idle') setPhase('tag');
  }, [isTriggerOnView, isInView, delay, phase]);

  /** 단계 전이 */
  useEffect(() => {
    let t;
    switch (phase) {
      case 'tag':
        t = setTimeout(() => setPhase('scatter'), T.tag);
        break;
      case 'scatter':
        t = setTimeout(() => setPhase('reveal'), T.scatter + T.settle);
        break;
      case 'reveal':
        t = setTimeout(() => setPhase('done'), T.reveal + 150);
        break;
    }
    return () => clearTimeout(t);
  }, [phase]);

  return { phase, handleRef, size };
}

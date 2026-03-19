'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

// ============================================================
// Shared Observer Registry
// 동일 옵션(threshold + rootMargin)의 요소를 하나의 Observer로 관찰.
// 개별 Observer 난립에 의한 콜백 폭주 + 메인 스레드 경합을 방지한다.
// ============================================================

const sharedObservers = new Map();

function getKey(threshold, rootMargin) {
  return `${threshold}|${rootMargin}`;
}

function subscribeElement(element, options, callback) {
  const key = getKey(options.threshold, options.rootMargin);

  if (!sharedObservers.has(key)) {
    const callbacks = new Map();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        callbacks.get(entry.target)?.(entry);
      }
    }, options);
    sharedObservers.set(key, { observer, callbacks });
  }

  const { observer, callbacks } = sharedObservers.get(key);
  callbacks.set(element, callback);
  observer.observe(element);

  return () => {
    observer.unobserve(element);
    callbacks.delete(element);
    if (callbacks.size === 0) {
      observer.disconnect();
      sharedObservers.delete(key);
    }
  };
}

// ============================================================
// useInView Hook
// ============================================================

/**
 * useInView 커스텀 훅
 *
 * IntersectionObserver 기반으로 요소의 뷰포트 진입을 감지한다.
 * 단발(once) 또는 지속(continuous) 모드를 지원하며,
 * 트리거 위치(threshold/center)와 지연(delay)을 설정할 수 있다.
 *
 * @param {object} options - 설정 옵션
 * @param {number|'center'} options.trigger - 감지 기준 [Optional, 기본값: 0.1]
 *   - number (0~1): IntersectionObserver threshold 직접 지정
 *   - 'center': 뷰포트 중심 도달 시 트리거 (rootMargin 자동 설정)
 * @param {boolean} options.isOnce - 최초 진입 시 감지 후 disconnect [Optional, 기본값: true]
 * @param {number} options.delay - 감지 후 상태 변경까지 지연 ms [Optional, 기본값: 0]
 * @param {boolean} options.isEnabled - 훅 활성화 여부 [Optional, 기본값: true]
 * @param {string} options.rootMargin - rootMargin 직접 지정 [Optional]
 *
 * @returns {[function, boolean]} [ref, isInView]
 *   - ref: 감지할 요소에 연결할 콜백 ref
 *   - isInView: 요소가 뷰포트에 진입했는지 여부
 *
 * Example usage:
 * const [ref, isInView] = useInView();
 * const [ref, isInView] = useInView({ trigger: 'center' });
 * const [ref, isInView] = useInView({ trigger: 0.3, delay: 200 });
 * const [ref, isInView] = useInView({ isOnce: false });
 */
export function useInView({
  trigger = 0.1,
  isOnce = true,
  delay = 0,
  isEnabled = true,
  rootMargin: customRootMargin,
} = {}) {
  const [element, setElement] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const delayRef = useRef(null);
  const unsubscribeRef = useRef(null);

  const ref = useCallback((node) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!isEnabled || !element) return;

    const options =
      trigger === 'center'
        ? { rootMargin: customRootMargin ?? '-50% 0px -50% 0px', threshold: 0 }
        : { rootMargin: customRootMargin ?? '0px', threshold: trigger };

    const unsubscribe = subscribeElement(element, options, (entry) => {
      const entering = entry.isIntersecting;

      if (isOnce) {
        if (entering) {
          if (delay > 0) {
            delayRef.current = setTimeout(() => setIsInView(true), delay);
          } else {
            setIsInView(true);
          }
          unsubscribeRef.current?.();
          unsubscribeRef.current = null;
        }
      } else {
        if (entering) {
          if (delay > 0) {
            clearTimeout(delayRef.current);
            delayRef.current = setTimeout(() => setIsInView(true), delay);
          } else {
            setIsInView(true);
          }
        } else {
          clearTimeout(delayRef.current);
          setIsInView(false);
        }
      }
    });

    unsubscribeRef.current = unsubscribe;

    return () => {
      unsubscribe();
      unsubscribeRef.current = null;
      clearTimeout(delayRef.current);
    };
  }, [element, isEnabled, trigger, isOnce, delay, customRootMargin]);

  return [ref, isInView];
}

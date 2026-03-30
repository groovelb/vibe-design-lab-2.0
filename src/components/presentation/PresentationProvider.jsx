'use client';
import { createContext, useContext, useMemo } from 'react';
import { presentationTokens } from '../../styles/themes/presentation';

const PresentationContext = createContext(null);

/**
 * PresentationProvider 컴포넌트
 *
 * 프레젠테이션 토큰과 슬라이드 상태를 하위 컴포넌트에 제공하는 context provider.
 *
 * @param {ReactNode} children - 하위 컴포넌트 [Required]
 * @param {object} tokens - 토큰 오버라이드 [Optional]
 *
 * Example usage:
 * <PresentationProvider>
 *   <SlideMaster>...</SlideMaster>
 * </PresentationProvider>
 */
function PresentationProvider({ children, tokens }) {
  const value = useMemo(
    () => ({
      tokens: tokens ? { ...presentationTokens, ...tokens } : presentationTokens,
    }),
    [tokens],
  );

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
}

/**
 * usePresentation 훅
 *
 * PresentationProvider context에 접근. Provider 외부에서 호출 시 기본 토큰 반환.
 */
function usePresentation() {
  const ctx = useContext(PresentationContext);
  return ctx || { tokens: presentationTokens };
}

export { PresentationProvider, usePresentation };

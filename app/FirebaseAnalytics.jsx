'use client';

import { useEffect } from 'react';
import { getFirebaseAnalytics } from '../lib/firebase';

/**
 * FirebaseAnalytics
 *
 * 클라이언트 사이드에서 Firebase Analytics를 초기화하는 컴포넌트.
 * UI를 렌더링하지 않으며, layout.jsx에서 한 번만 마운트된다.
 */
function FirebaseAnalytics() {
  useEffect(() => {
    getFirebaseAnalytics();
  }, []);

  return null;
}

export { FirebaseAnalytics };
export default FirebaseAnalytics;

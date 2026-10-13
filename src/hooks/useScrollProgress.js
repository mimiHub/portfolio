import { useEffect, useState } from 'react';

/**
 * 문서 전체 스크롤 진행률(0~1)과 스크롤 여부를 반환.
 * requestAnimationFrame으로 감싸 프레임당 1번만 setState → 불필요한 리렌더 방지(throttle 효과).
 * passive: true → 스크롤을 막지 않겠다고 브라우저에 알려 스크롤 성능 향상.
 */
export default function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, scrolled: false });

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setState({ progress: max > 0 ? y / max : 0, scrolled: y > 8 });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return state;
}

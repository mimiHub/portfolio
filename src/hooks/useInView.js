import { useEffect, useRef, useState } from 'react';

/**
 * 요소가 뷰포트에 들어왔는지 알려주는 훅.
 * scroll 이벤트 + getBoundingClientRect 대신 IntersectionObserver를 쓰는 이유:
 * 브라우저가 비동기로 교차 여부를 계산해 주므로 스크롤마다 레이아웃을 강제로 다시 계산하지 않는다(성능).
 *
 * @param {{ once?: boolean, threshold?: number, rootMargin?: string }} options
 * @returns {[React.RefObject, boolean]}
 */
export default function useInView({ once = true, threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target); // 한 번 보였으면 더 볼 필요 없음
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect(); // 언마운트 시 정리 (StrictMode 이중 실행에도 안전)
  }, [once, threshold, rootMargin]);

  return [ref, inView];
}

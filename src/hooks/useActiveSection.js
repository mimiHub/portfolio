import { useEffect, useState } from 'react';

/**
 * 스크롤 스파이: 지금 화면 중앙에 걸친 섹션의 id를 반환.
 * rootMargin '-50% 0px -50% 0px' = 화면 정중앙의 가로선 하나만 관측 영역으로 사용.
 * 그 선에 닿아 있는 섹션이 곧 '현재 섹션'.
 */
export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // ids 배열은 매 렌더 새로 만들어지므로 문자열로 바꿔 의존성 비교
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')]);

  return activeId;
}

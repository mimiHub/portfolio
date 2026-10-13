import useInView from '@/hooks/useInView';
import styles from './Reveal.module.css';

/**
 * 스크롤해서 보일 때 아래→위로 떠오르는 래퍼.
 * - as: 렌더링할 태그(기본 div) — 시맨틱을 해치지 않도록 li, section 등으로 바꿀 수 있게
 * - delay: ms 단위. CSS 변수로 넘겨서 transition-delay에 사용 → 순차(stagger) 등장 연출
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.visible : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

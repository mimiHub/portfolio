import { useRef } from 'react';
import { Tag } from '@/components/common';
import ProjectThumb from './ProjectThumb';
import styles from './ProjectCard.module.css';

const MAX_TILT = 6; // 최대 기울기(deg)

export default function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);

  /**
   * 3D 틸트: 카드 안에서 마우스 위치를 -0.5 ~ 0.5로 정규화 → 회전 각도로 변환.
   * Hero 스포트라이트와 같은 원리로, state 대신 CSS 변수를 직접 갱신한다.
   * 터치 기기(pointerType !== 'mouse')에서는 동작하지 않게 막음.
   */
  const handleMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = cardRef.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${-py * MAX_TILT}deg`);
    el.style.setProperty('--ry', `${px * MAX_TILT}deg`);
    el.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    // 카드 전체가 클릭 영역이지만, 실제 상호작용 요소는 <button> 하나 → 키보드·스크린리더 모두 자연스럽게 동작
    <article
      ref={cardRef}
      className={styles.card}
      style={{ '--accent': project.accent }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div className={styles.media}>
        <ProjectThumb project={project} />
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className="mono">{String(index + 1).padStart(2, '0')}</span>
          <span className="mono">{project.period}</span>
        </div>

        <h3 className={styles.title}>
          <button type="button" className={styles.trigger} onClick={onOpen} aria-haspopup="dialog">
            {project.title}
          </button>
        </h3>
        <p className={styles.subtitle}>{project.subtitle}</p>

        <ul className={styles.stack} aria-label="사용 기술">
          {project.stack.slice(0, 4).map((s) => (
            <li key={s}><Tag variant="line">{s}</Tag></li>
          ))}
          {project.stack.length > 4 && <li><Tag variant="line">+{project.stack.length - 4}</Tag></li>}
        </ul>

        <span className={styles.more} aria-hidden="true">
          자세히 보기 <span className={styles.arrow}>→</span>
        </span>
      </div>
    </article>
  );
}

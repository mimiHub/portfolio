import styles from './ProjectThumb.module.css';

/**
 * 썸네일: 이미지가 있으면 이미지, 없으면 프로젝트 accent 색으로 만든 대체 그래픽.
 * 실제 스크린샷을 넣기 전까지도 레이아웃이 깨지지 않도록 aspect-ratio로 공간을 미리 확보.
 */
export default function ProjectThumb({ project, large = false }) {
  if (project.thumbnail) {
    return (
      <img
        className={styles.img}
        src={project.thumbnail}
        alt={`${project.title} 화면`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div className={`${styles.fallback} ${large ? styles.large : ''}`} aria-hidden="true">
      <div className={styles.window}>
        <div className={styles.bar}><i /><i /><i /></div>
        <div className={styles.screen}>
          <span className={styles.word}>{project.title}</span>
          <span className={styles.lineA} />
          <span className={styles.lineB} />
        </div>
      </div>
    </div>
  );
}

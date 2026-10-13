import Reveal from '../Reveal/Reveal';
import styles from './SectionTitle.module.css';

/**
 * 섹션 머리말. 번호 라벨 + 큰 제목 + 보조 문구.
 * id를 받으면 h2에 연결 → section의 aria-labelledby로 스크린리더가 섹션 이름을 읽음.
 */
export default function SectionTitle({ index, eyebrow, title, desc, id, inverse = false }) {
  return (
    <header className={`${styles.head} ${inverse ? styles.inverse : ''}`}>
      <Reveal className={styles.eyebrow}>
        <span className="mono">{index}</span>
        <span className={styles.bar} aria-hidden="true" />
        <span className="mono">{eyebrow}</span>
      </Reveal>
      <Reveal as="h2" id={id} className={styles.title} delay={80}>
        {title}
      </Reveal>
      {desc && (
        <Reveal as="p" className={styles.desc} delay={160}>
          {desc}
        </Reveal>
      )}
    </header>
  );
}

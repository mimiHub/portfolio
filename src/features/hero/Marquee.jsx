import styles from './Marquee.module.css';

/**
 * 무한 흐르는 기술 스택 띠.
 * 원리: 같은 목록을 2번 이어 붙이고, 전체를 -50%만큼 이동 → 끝나는 순간 처음과 똑같은 모양이라 끊김이 없다.
 * 두 번째 목록은 장식용 복제이므로 aria-hidden.
 */
export default function Marquee({ items }) {
  const list = (hidden) => (
    <ul className={styles.list} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
          <span className={styles.star} aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}

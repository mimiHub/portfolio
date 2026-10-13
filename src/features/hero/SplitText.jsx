import styles from './SplitText.module.css';

/**
 * 글자를 한 글자씩 <span>으로 나눠 순서대로 올라오게 하는 컴포넌트.
 * - 스크린리더가 "B, u, i, l..." 로 끊어 읽지 않도록:
 *   원문은 .sr-only 텍스트로 한 번만 제공하고, 쪼갠 글자 묶음은 aria-hidden 처리.
 * - 각 글자의 지연시간은 CSS 변수 --d 로 넘겨 JS 타이머 없이 CSS만으로 애니메이션.
 */
export default function SplitText({ text, startDelay = 0, step = 35, className = '' }) {
  return (
    <span className={`${styles.wrap} ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {[...text].map((char, i) => (
          <span key={i} className={styles.mask}>
            <span className={styles.char} style={{ '--d': `${startDelay + i * step}ms` }}>
              {char === ' ' ? ' ' : char}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

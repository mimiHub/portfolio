import styles from './Tag.module.css';

/** 기술 스택 등을 보여주는 작은 라벨. variant로 모양만 바꾸고 구조는 하나로 유지 */
export default function Tag({ children, variant = 'line' }) {
  return <span className={`${styles.tag} ${styles[variant]}`}>{children}</span>;
}

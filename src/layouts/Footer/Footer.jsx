import { PROFILE } from '@/data/profile';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className="mono">© {new Date().getFullYear()} {PROFILE.nameEn}</p>
        <p className="mono">Built with React + Vite</p>
        <a href="#top" className={`mono ${styles.top}`}>Back to top ↑</a>
      </div>
    </footer>
  );
}

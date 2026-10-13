import { useEffect, useState } from 'react';
import { useActiveSection, useScrollProgress } from '@/hooks';
import { PROFILE } from '@/data/profile';
import styles from './Header.module.css';

export default function Header({ items }) {
  const { progress, scrolled } = useScrollProgress();
  const activeId = useActiveSection(items.map((i) => i.id));
  const [menuOpen, setMenuOpen] = useState(false);

  // 모바일 메뉴가 열려 있을 때 ESC로 닫기 + 뒤 배경 스크롤 잠금
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo} aria-label="맨 위로">
          <span className={styles.logoMark} aria-hidden="true">M</span>
          <span className="mono">{PROFILE.nameEn}</span>
        </a>

        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          aria-expanded={menuOpen}
          aria-controls="gnb"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span />
        </button>

        <nav id="gnb" className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="주요 메뉴">
          <ul className={styles.list}>
            {items.map((item, i) => (
              <li key={item.id} style={{ '--i': i }}>
                <a
                  href={`#${item.id}`}
                  className={`${styles.link} ${activeId === item.id ? styles.active : ''}`}
                  aria-current={activeId === item.id ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={`mono ${styles.num}`}>0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* scaleX로 진행률 표현: width를 바꾸면 매 프레임 레이아웃 재계산, transform은 합성만 */}
      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}

import { useRef } from 'react';
import { PROFILE } from '@/data/profile';
import { SKILL_GROUPS } from '@/data/skills';
import SplitText from './SplitText';
import Marquee from './Marquee';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef = useRef(null);

  /**
   * 마우스를 따라오는 스포트라이트.
   * state로 좌표를 관리하면 마우스가 움직일 때마다 리렌더 → 버벅임.
   * 대신 DOM의 CSS 변수만 직접 바꿔서 React 렌더링을 거치지 않게 한다.
   */
  const handlePointerMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const allSkills = SKILL_GROUPS.flatMap((g) => g.items.map((i) => i.name));

  return (
    <section id="top" ref={sectionRef} className={styles.hero} onPointerMove={handlePointerMove} aria-label="소개">
      <div className={styles.spotlight} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={`mono ${styles.kicker}`}>
          <span className={styles.dot} aria-hidden="true" />
          {PROFILE.role} · {PROFILE.careerYears}년차
        </p>

        <h1 className={styles.title}>
          <SplitText text="Building" className={styles.line} />
          <span className={styles.line}>
            <SplitText text="interfaces" startDelay={240} />{' '}
            <span className={`serif ${styles.accentWord}`}>
              <SplitText text="with care." startDelay={520} />
            </span>
          </span>
        </h1>

        <div className={styles.bottom}>
          <p className={styles.intro}>{PROFILE.intro}</p>

          <dl className={styles.stats}>
            <div>
              <dt className="mono">Experience</dt>
              <dd>{PROFILE.careerYears}<small>yrs</small></dd>
            </div>
            {/* 개수(03) 대신 '무엇으로 일하는지' — 선별한 작업물 수가 경력 전체로 오해되지 않게 */}
            <div>
              <dt className="mono">Focus</dt>
              <dd className={styles.ddText}>React<br />Next.js</dd>
            </div>
          </dl>
        </div>

        <a href="#skills" className={styles.scrollCue}>
          <span className="mono">Scroll</span>
          <span className={styles.cueLine} aria-hidden="true" />
        </a>
      </div>

      <Marquee items={allSkills} />
    </section>
  );
}

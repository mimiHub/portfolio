import { useState } from 'react';
import { Reveal, SectionTitle } from '@/components/common';
import { LEVELS, SKILL_GROUPS } from '@/data/skills';
import styles from './Skills.module.css';

export default function Skills() {
  // null = 전체 보기. 특정 레벨을 고르면 해당 항목만 강조하고 나머지는 흐리게(숨기지 않음 → 레이아웃 흔들림 없음)
  const [level, setLevel] = useState(null);

  const toggle = (key) => setLevel((prev) => (prev === key ? null : key));

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionTitle
          id="skills-title"
          index="01"
          eyebrow="Tech Stack"
          title={<>Tools I <span className="serif">build</span> with</>}
          desc="퍼센트 대신, 각 기술을 실제로 어떻게 써 왔는지로 정리했습니다. 아래 기준을 눌러 강조해 보세요."
        />

        <Reveal className={styles.legend} role="group" aria-label="숙련도로 강조하기">
          {Object.entries(LEVELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`${styles.chip} ${styles[`chip_${key}`]}`}
              aria-pressed={level === key}
              onClick={() => toggle(key)}
            >
              <span className={styles.chipDot} aria-hidden="true" />
              {label}
            </button>
          ))}
        </Reveal>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.id} className={styles.group} delay={gi * 120}>
              <div className={styles.groupHead}>
                <span className={`mono ${styles.groupNum}`}>0{gi + 1}</span>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <p className={styles.groupDesc}>{group.desc}</p>
              </div>

              <ul className={styles.list}>
                {group.items.map((item) => {
                  const dimmed = level && level !== item.level;
                  return (
                    <li
                      key={item.name}
                      className={`${styles.item} ${dimmed ? styles.dimmed : ''}`}
                      data-level={item.level}
                    >
                      <span className={styles.name}>{item.name}</span>
                      <span className={styles.note}>{item.note}</span>
                      <span className={`mono ${styles.badge}`}>{LEVELS[item.level]}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

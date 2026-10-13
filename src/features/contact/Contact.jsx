import { useEffect, useState } from 'react';
import { Reveal, SectionTitle } from '@/components/common';
import { PROFILE } from '@/data/profile';
import styles from './Contact.module.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
    } catch {
      // 클립보드 권한이 없는 환경(http 등)에서는 메일 앱으로 대체
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  // 2초 후 '복사됨' 표시 해제. copied가 바뀔 때마다 이전 타이머는 cleanup으로 제거
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <section id="contact" className={`section ${styles.contact}`} aria-labelledby="contact-title">
      <div className="container">
        <SectionTitle
          id="contact-title"
          index="03"
          eyebrow="Contact"
          title={<>Let&rsquo;s <span className="serif">work</span> together</>}
          desc="새로운 기회와 협업 제안을 기다리고 있습니다. 편하게 연락 주세요."
          inverse
        />

        <Reveal className={styles.mailRow}>
          <a href={`mailto:${PROFILE.email}`} className={styles.mail}>
            <span className={styles.mailText}>{PROFILE.email}</span>
            <span className={styles.mailArrow} aria-hidden="true">↗</span>
          </a>
        </Reveal>

        <Reveal className={styles.actions} delay={120}>
          <button type="button" className={styles.copy} onClick={copyEmail}>
            {copied ? '복사 완료 ✓' : '이메일 주소 복사'}
          </button>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className={styles.ghost}>
            GitHub ↗
          </a>
        </Reveal>

        {/* aria-live: 화면을 보지 않는 사용자에게도 '복사됨' 상태 변화를 읽어 줌 */}
        <p className="sr-only" aria-live="polite">{copied ? '이메일 주소가 복사되었습니다.' : ''}</p>
      </div>
    </section>
  );
}

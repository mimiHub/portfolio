import { useEffect, useRef } from 'react';
import { Tag } from '@/components/common';
import ProjectThumb from './ProjectThumb';
import styles from './ProjectModal.module.css';

/**
 * 네이티브 <dialog> + showModal() 을 쓰는 이유:
 *  - 포커스 가두기(focus trap), ESC 닫기, 뒤 콘텐츠 비활성화(inert)를 브라우저가 기본 제공
 *  - 닫히면 열기 전 버튼으로 포커스가 자동 복귀
 *  직접 div로 만들면 이걸 전부 JS로 구현해야 한다.
 */
export default function ProjectModal({ project: p, open, onClose }) {
  const dialogRef = useRef(null);

  // open(상태) → dialog(DOM) 동기화. 선언형 React 상태를 명령형 DOM API에 연결하는 전형적인 effect 용도
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // ESC·닫기 버튼 등 어떤 방식으로 닫혀도 'close' 이벤트는 한 번 발생 → 여기서 상태 정리
  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  // 배경(backdrop) 클릭 시 닫기: 클릭 대상이 dialog 자신이면 바깥 영역을 누른 것
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) dialogRef.current.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={handleClose}
      onClick={handleBackdropClick}
      aria-labelledby="project-modal-title"
      style={p ? { '--accent': p.accent } : undefined}
    >
      {p && (
        <div className={styles.panel}>
          <button type="button" className={styles.close} onClick={() => dialogRef.current.close()} aria-label="닫기">
            <span aria-hidden="true">×</span>
          </button>

          <div className={styles.media}>
            <ProjectThumb project={p} large />
          </div>

          <div className={styles.content}>
            {/* 헤더: 왼쪽 = 제목 묶음 / 오른쪽 = 링크 버튼 (space-between) */}
            <div className={styles.head}>
              <div className={styles.headText}>
                <p className={`mono ${styles.period}`}>{[p.type && `${p.type} 프로젝트`, p.period, p.role].filter(Boolean).join(' · ')}</p>
                <h3 id="project-modal-title" className={styles.title}>{p.title}</h3>
                <p className={styles.subtitle}>{p.subtitle}</p>
              </div>

              {p.links?.length > 0 && (
                <ul className={styles.links} aria-label="프로젝트 링크">
                  {p.links.map((link, i) => (
                    <li key={link.url}>
                      {/* 첫 번째 링크만 강조(primary), 나머지는 보조(ghost) — 시선이 갈 곳을 하나로 */}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={i === 0 ? styles.linkPrimary : styles.linkGhost}
                      >
                        {link.label} ↗
                        <span className="sr-only">(새 창)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 안내문은 링크 바로 아래 — 버튼을 누르기 전에 읽히도록 */}
            {p.note && (
              <p className={styles.note}>
                <span aria-hidden="true">ⓘ</span> {p.note}
              </p>
            )}

            <p className={styles.summary}>{p.summary}</p>

            <h4 className={`mono ${styles.label}`}>Key Points</h4>
            <ol className={styles.highlights}>
              {p.highlights.map((h) => <li key={h}>{h}</li>)}
            </ol>

            <h4 className={`mono ${styles.label}`}>Stack</h4>
            <ul className={styles.stack}>
              {p.stack.map((s) => <li key={s}><Tag variant="accent">{s}</Tag></li>)}
            </ul>
          </div>
        </div>
      )}
    </dialog>
  );
}

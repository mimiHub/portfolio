import { useMemo, useState } from 'react';
import { Reveal, SectionTitle } from '@/components/common';
import { PROJECT_FILTERS, PROJECTS } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  // '무엇을 보여줄지(selected)'와 '열려 있는지(open)'를 분리 →
  // 닫힐 때 selected를 지우지 않으므로 닫히는 순간 내용이 깜빡 사라지지 않음
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const openProject = (project) => {
    setSelected(project);
    setOpen(true);
  };

  // filter가 바뀔 때만 다시 계산 (파생 데이터는 state로 따로 두지 않는다)
  const visible = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter))),
    [filter]
  );

  return (
    <section id="projects" className={`section ${styles.projects}`} aria-labelledby="projects-title">
      <div className="container">
        <SectionTitle
          id="projects-title"
          index="02"
          eyebrow="Selected Works"
          title={<>Things I&rsquo;ve <span className="serif">shipped</span></>}
          desc="카드를 눌러 프로젝트에서 무엇을 고민했고 어떻게 풀었는지 확인하세요."
          inverse
        />

        <Reveal className={styles.filters} role="toolbar" aria-label="프로젝트 필터">
          {PROJECT_FILTERS.map((f) => {
            const count = f === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(f)).length;
            return (
              <button
                key={f}
                type="button"
                className={styles.filter}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
                <sup className="mono">{count}</sup>
              </button>
            );
          })}
        </Reveal>

        {/* key={filter}: 필터가 바뀌면 목록을 새로 마운트 → 등장 애니메이션이 다시 실행됨 */}
        <ul className={styles.list} key={filter}>
          {visible.map((project, i) => (
            <li key={project.id} className={styles.listItem} style={{ '--i': i }}>
              <ProjectCard project={project} index={PROJECTS.indexOf(project)} onOpen={() => openProject(project)} />
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={selected} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

/**
 * 숙련도를 %(퍼센트 바)로 표시하지 않는 이유:
 * "CSS 90%"는 기준이 모호해 면접관이 신뢰하지 않음. 대신 '어떻게 써 왔는지'를 3단계로 표현.
 *  - main : 주력 — 실무에서 매일 쓰고 설명할 수 있음
 *  - work : 실무 — 실제 프로젝트에 적용해 봄
 *  - tool : 도구 — 협업/배포에 사용
 */
export const LEVELS = {
  main: '주력',
  work: '실무 적용',
  tool: '협업·도구',
};

export const SKILL_GROUPS = [
  {
    id: 'markup',
    title: 'Markup & Style',
    desc: '시맨틱 마크업과 유지보수하기 쉬운 스타일 구조',
    items: [
      { name: 'HTML5', level: 'main', note: '시맨틱 태그 · 웹 접근성' },
      { name: 'CSS3', level: 'main', note: 'Flex/Grid · 애니메이션' },
      { name: 'CSS Modules', level: 'main', note: '컴포넌트 단위 스타일 격리' },
      { name: 'Design Tokens', level: 'main', note: 'tone scale + semantic alias' },
      { name: 'Responsive', level: 'main', note: 'PC/태블릿/모바일 분기 설계' },
      { name: 'Tailwind CSS', level: 'work', note: '공통 config 패키지 운영' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    desc: '재사용 가능한 컴포넌트와 상태 흐름 설계',
    items: [
      { name: 'JavaScript', level: 'main', note: 'ES6+ · DOM' },
      { name: 'React', level: 'work', note: '공통 컴포넌트 라이브러리 구축' },
      { name: 'TypeScript', level: 'work', note: 'props 타입 설계' },
      { name: 'Next.js', level: 'work', note: 'App Router 서비스 운영' },
      { name: 'Recharts', level: 'work', note: '데이터 시각화 패널' },
    ],
  },
  {
    id: 'tooling',
    title: 'Tooling & Collab',
    desc: '빌드·배포·협업 환경',
    items: [
      { name: 'Vite', level: 'work', note: 'React 프로젝트 셋업' },
      { name: 'Turborepo · pnpm', level: 'work', note: '모노레포 멀티 앱' },
      { name: 'Git', level: 'tool', note: '브랜치 전략 · 멀티 remote' },
      { name: 'Figma', level: 'work', note: 'UI 디자인 · Figma MCP 연동' },
      { name: 'Vercel', level: 'tool', note: '정적 사이트 배포' },
      { name: 'AWS CodeCommit', level: 'tool', note: '팀 저장소' },
    ],
  },
];

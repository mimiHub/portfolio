/**
 * 작업물 데이터.
 * 화면(JSX)과 내용(데이터)을 분리하면, 프로젝트를 추가할 때 컴포넌트는 건드리지 않고
 * 이 배열에 객체 하나만 추가하면 된다.
 *
 * type : 프로젝트 성격 — '외주' | '사내' (카드·모달에 배지로 표시)
 *
 * TODO 표시는 직접 채워야 하는 정보입니다 (기간, 기여도, 링크, 썸네일).
 * 썸네일: public/images/projects/{id}.webp 에 넣고 thumbnail 경로를 지정하세요.
 *
 * links: [{ label, url }] 배열 — 링크 개수가 프로젝트마다 다르므로(모노레포 앱 3개 등) 고정 키 대신 배열
 * note : 링크를 열어도 정상 동작하지 않는 이유 등 보는 사람에게 미리 알려줄 안내 (선택)
 */
export const PROJECT_FILTERS = ['All', 'React', 'Next.js', 'Publishing'];

export const PROJECTS = [
  {
    id: 'patchat',
    title: 'Patchat',
    subtitle: '특허 검색 AI 채팅 서비스',
    type: '사내',
    period: '2026', // TODO: 2026.06 – 2026.0X
    role: 'UI 설계 · 프론트엔드 개발', // TODO: 기여도
    tags: ['React'],
    stack: ['React', 'Vite', 'CSS Modules', 'vite-plugin-pages', 'Recharts'],
    accent: '#3d5afe',
    thumbnail: null,
    summary:
      'AI와 대화하며 특허를 검색하고, 결과를 차트·분류 트리·갤러리 패널로 탐색하는 웹 앱. 이전 회사에서 진행한 서비스를 React로 처음부터 설계·구현한 프로젝트입니다.',
    highlights: [
      'features/ · components/common/ · layouts/ 로 나눈 기능 단위 폴더 구조',
      'Button·Input·Card·Tab·Popup 등 공통 컴포넌트 라이브러리와 /components-guide 페이지 구축',
      '문자열 key → 컴포넌트 매핑으로 사이드 패널 콘텐츠를 교체하는 구조 설계',
      'tone scale(100–900) + semantic alias 디자인 토큰, PC/태블릿/모바일 전 구간 반응형',
      'StrictMode 이중 실행으로 인한 중복 처리 이슈를 ref 기반 가드로 해결',
    ],
    links: [{ label: '사이트 보기', url: 'https://patchat.vercel.app/' }],
  },
  {
    id: 'chinguya',
    title: '친구야',
    subtitle: '여행 예약 서비스 (고객·여행사·관리자)', // TODO: 서비스 설명 확인
    type: '외주',
    period: '2026', // TODO
    role: 'UI 디자인 · 프론트엔드 개발', // TODO: 기여도(%) 확인
    tags: ['Next.js'],
    stack: ['Figma', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Turborepo', 'pnpm'],
    accent: '#00a86b',
    thumbnail: null,
    summary:
      'UI 디자인부터 프론트엔드 개발까지 직접 맡은 외주 프로젝트. 고객·여행사·관리자 세 개의 앱과 공용 패키지(ui, tailwind-config, types, api-client)를 Turborepo 모노레포로 운영. 현재 서비스 오픈 후 안정화 단계입니다.',
    highlights: [
      '고객·여행사·관리자 3개 앱의 UI 디자인을 직접 설계하고, 디자인 그대로 컴포넌트로 구현',
      'apps/customer · agency · admin 3개 앱이 공용 ui 패키지를 공유하는 모노레포 구조',
      '공용 Button 컴포넌트를 props(href, fullWidth, className)로 확장해 재사용',
      '“작은 단일 UI는 네이티브 요소로” 같은 컴포넌트 사용 기준을 팀 컨벤션으로 정리',
      '스프린트 브랜치 기반 협업 · 오픈 후 버그 안정화 진행',
    ],
    links: [
      { label: '고객 앱', url: 'https://chinguya-customer.vercel.app/' },
      { label: '여행사 앱', url: 'https://chinguya-agency-x6g6.vercel.app/' },
      { label: '관리자 앱', url: 'https://chinguya-admin.vercel.app/' },
    ],
    note: '현재 백엔드 서버가 연결되지 않아 데이터가 표시되지 않습니다. 화면 구성 위주로 확인해 주세요.',
  },
  {
    id: 'yamaguchi',
    title: 'Yamaguchi 1Day Bus',
    subtitle: '야마구치 1일 버스투어 예약 사이트',
    type: '외주',
    period: '2026', // TODO
    role: '퍼블리싱 · 프론트엔드', // TODO
    tags: ['React', 'Publishing'],
    stack: ['React', 'Vite', 'CSS Modules', 'Vercel', 'AWS CodeCommit'],
    accent: '#e2a400',
    thumbnail: null,
    summary:
      '1280px 고정폭 PC 사이트. 배경은 화면 끝까지, 콘텐츠는 1280px 안에 두는 full-bleed 레이아웃으로 넓은 모니터에서도 안정적으로 보이도록 구성했습니다.',
    highlights: [
      'Full-bleed 배경 + contained 콘텐츠 패턴으로 Nav·Hero 구성',
      '코스 페이지의 메인 이미지 + 썸네일 갤러리 인터랙션',
      'AWS CodeCommit(팀) · GitHub(개인) 멀티 remote, feature 브랜치 → main 머지 워크플로',
      '반응형을 검토·구현한 뒤 요구사항에 맞춰 고정폭으로 되돌린 의사결정 경험',
    ],
    links: [{ label: '사이트 보기', url: 'https://yamaguchi-one.vercel.app' }],
  },
];

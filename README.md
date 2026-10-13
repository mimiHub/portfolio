# Mijeong Ko — Portfolio

Vite + React 로 만든 1페이지 포트폴리오. 기술 스택과 작업물을 한 화면 흐름에서 보여줍니다.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 생성 → Vercel에 그대로 배포 가능
```

## 폴더 구조

```
src/
├─ data/            ← 내용(텍스트·프로젝트·스킬). 수정은 대부분 여기서
│  ├─ profile.js
│  ├─ skills.js
│  ├─ projects.js
│  └─ nav.js
├─ styles/
│  ├─ variables.css ← 디자인 토큰 (tone scale → semantic alias)
│  └─ common.css    ← reset + 유틸리티 + reduced-motion
├─ hooks/           ← 인터랙션 로직 (화면과 분리)
│  ├─ useInView.js          IntersectionObserver 등장 감지
│  ├─ useActiveSection.js   스크롤 스파이 (현재 메뉴 표시)
│  └─ useScrollProgress.js  상단 진행 바
├─ components/common/  Reveal · SectionTitle · Tag
├─ layouts/            Header · Footer
└─ features/           hero · skills · projects · contact (섹션 단위)
```

**원칙: 데이터와 화면을 분리한다.** 프로젝트를 추가할 때 JSX는 건드리지 않고 `data/projects.js` 배열에 객체 하나만 추가하면 카드·필터 개수·모달이 자동으로 반영됩니다.

## 직접 채워야 할 것 (`TODO` 검색)

- `data/profile.js` — GitHub 주소
- `data/projects.js` — 기간, 역할/기여도, 친구야 서비스 설명, 링크
- 썸네일 — `public/images/projects/patchat.webp` 등에 넣고 `thumbnail: '/images/projects/patchat.webp'` 지정 (없으면 accent 색 대체 그래픽 표시)

## 인터랙션과 사용한 개념

| 인터랙션 | 핵심 개념 |
|---|---|
| Hero 글자 순차 등장 | 글자별 `<span>` + CSS 변수 `--d` 로 지연 → JS 타이머 없이 CSS 애니메이션 |
| 마우스 따라오는 빛 / 카드 3D 틸트 | **state 대신 CSS 변수를 DOM에 직접 설정** → 마우스 이동마다 리렌더하지 않음 |
| 스크롤 등장(Reveal) | `IntersectionObserver` — scroll 이벤트보다 가볍고, `once`면 관측 해제 |
| 현재 메뉴 강조 | `rootMargin: '-50% 0px -50% 0px'` 로 화면 중앙선만 관측하는 스크롤 스파이 |
| 상단 진행 바 | `requestAnimationFrame` 으로 프레임당 1회 갱신, `scaleX` 로 표현(레이아웃 재계산 없음) |
| 기술 스택 무한 띠 | 같은 목록 2벌 + `translateX(-50%)` 루프, hover 시 정지 |
| 프로젝트 필터 | 파생 데이터는 `useMemo`, `key={filter}` 로 목록 재마운트 → 등장 애니메이션 재실행 |
| 상세 모달 | 네이티브 `<dialog>` + `showModal()` → 포커스 가두기·ESC·포커스 복귀를 브라우저가 처리 |
| 카드 전체 클릭 | stretched link: 실제 버튼은 제목 하나, `::before` 로 클릭 영역만 카드 전체로 확장 |

## 접근성

- 애니메이션은 `transform`/`opacity` 만 사용, `prefers-reduced-motion` 설정 시 모두 꺼짐
- 쪼갠 글자는 `aria-hidden`, 원문은 `.sr-only` 로 한 번만 읽힘
- 필터·스킬 강조 버튼은 `aria-pressed`, 현재 메뉴는 `aria-current`, 복사 완료는 `aria-live` 로 안내
- 키보드 포커스는 `:focus-visible` 로만 표시

## 브레이크포인트

`1279px`(노트북: 프로젝트 2열) · `1023px`(태블릿: 햄버거 메뉴, 스킬 1열) · `767px`(모바일: 프로젝트 1열)

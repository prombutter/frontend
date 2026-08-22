@AGENTS.md

# Prombutter FE

Figma 「프롬버터」 디자인을 옮긴 프론트엔드. Next.js(App Router) + TypeScript.

- Jira 프로젝트: PB (https://prombutter.atlassian.net)
- Figma 파일: `CMxbScTqJOOYcrteLkuCXW` (프롬버터)

## 구조

```
app/                        라우트만 둔다. 재사용 컴포넌트는 components/로 뺀다.
  layout.tsx                루트 레이아웃
  page.tsx                  / → /onboarding 리다이렉트
  onboarding/page.tsx       온보딩 3단계 (client, step 상태)
  login/page.tsx · signup/page.tsx
  globals.css               styles/*.css를 모으는 진입점
  (workspace)/
    layout.tsx              LNB + 콘텐츠 패널 셸
    dashboard/page.tsx
    parts/page.tsx · parts/new/page.tsx
    prompts/page.tsx · prompts/new/page.tsx
    trash/page.tsx
components/
  layout/                   Lnb · ExtensionBanner (client)
  settings/ · states/       DangerZone(모달) · ErrorState · Toast
  auth/                     AuthCard (로그인·회원가입 공통 셸)
  onboarding/               일러스트 3종 (Figma 도형 좌표를 그대로 옮김)
  ui/                       PageHeader · SearchBar · ListHeader · ViewSwitch · Tag · CodeBlock · Field
  cards/                    BasicCard · PartCard · PromptCard
styles/
  tokens.css                Figma 변수 → CSS 커스텀 프로퍼티, 폰트 정의
  base.css                  리셋 + 타이포 스케일 유틸(.t-h1 …)
  components.css            화면 컴포넌트 클래스
lib/mock-data.ts            시안용 더미 데이터 (API 연동 시 삭제)
app/screens/page.tsx        전체 화면 인덱스 (시안 리뷰용)
types/index.ts              공용 타입
public/assets/              Figma에서 내보낸 아이콘·로고·차트
```

`components/ui`와 `components/cards`는 배럴(`index.ts`)로 내보낸다.
import는 `@/components/ui`, `@/lib/mock-data`처럼 `@/` 별칭을 쓴다.

## 규칙

**디자인 토큰** — 값의 출처는 `styles/tokens.css` 하나다. `app/globals.css`의 `@theme inline`이
그 변수를 Tailwind에 연결하므로, 토큰만 고치면 `bg-navy-900` 같은 유틸리티까지 함께 따라온다.
Tailwind 임의 값(`bg-[#1a1b2f]`)으로 색을 새로 박지 않는다.
Figma 변수명과 1:1로 맞춰 두었으므로(`navy/900` → `--navy-900`) 하드코딩한 hex를
새로 추가하지 않는다. 값이 바뀌면 변수 정의만 고친다.

**스타일링 — 지금은 두 층이 공존한다 (이행 중)**

- **새로 쓰는 코드는 `components/ds`의 공통 컴포넌트 + Tailwind 유틸리티만 쓴다.**
  Button · TextField · Card · Chip · Toast · Modal · Spinner가 여기 있다.
  카탈로그는 `/design-system`에서 볼 수 있다.
- `styles/components.css`의 전역 클래스(`.card`, `.part-card`, `.btn--primary` …)는
  PB-43 이전에 만든 화면들이 쓰고 있는 **레거시**다. 새 화면에서 쓰지 않는다.
  화면을 하나씩 ds 컴포넌트로 옮기면서 이 파일을 줄여 나간다.
- `components/ui`도 같은 이유로 레거시다. `components/ds`가 대체한다.
- Tailwind는 preflight(리셋)를 뺀 채 theme·utilities 레이어만 들여온다.
  `styles/base.css`가 이미 리셋을 갖고 있어 두 번 적용하면 기존 화면이 틀어지기 때문이다.

**서버/클라이언트 경계** — `"use client"`는 상호작용이 있는 컴포넌트에만 붙인다.
페이지는 서버 컴포넌트로 두고 인터랙션 조각만 클라이언트로 내린다.

**에셋** — 아이콘·이미지는 직접 그리지 않고 Figma에서 내보낸 파일을 `public/assets/`에
커밋해 쓴다. Figma MCP가 주는 `figma.com/api/mcp/asset/...` URL은 7일 뒤 만료되므로
소스에 남기지 않는다. SVG는 `next.config.ts`의 `dangerouslyAllowSVG`로 허용해 둔 상태다
(전부 자체 커밋 에셋이라 외부 입력이 없다).

**반응형** — 데스크톱(1920px 기준) 전용. 별도 요청이 없으면 모바일 대응은 하지 않는다.

**폰트** — 본문은 Pretendard(CDN), 제목·LNB는 `MonaS12`(픽셀 폰트). MonaS12는 웹폰트
파일이 없어 로컬 설치 시에만 적용되고 없으면 모노스페이스로 대체된다.

## Figma 작업 시

디자인을 코드로 옮길 때는 `/figma-design-to-code` 스킬을 먼저 로드하고
`get_design_context`로 원본을 확인한다. 스크린샷만 보고 추정해서 만들지 않는다.

## 검증

변경 후 아래를 돌린다. 포맷은 Prettier가 담당하므로 ESLint에 포맷 규칙을 추가하지 않는다.

```bash
npm run format      # Prettier 정리
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run build
```

## 커밋

- Jira 키를 제목 앞에 붙인다: `PB-41 프로젝트 세팅`
- main 브랜치에 직접 커밋하지 않고 작업 브랜치를 판다.

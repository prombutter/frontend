# Prombutter FE

Figma 「프롬버터」 디자인을 옮긴 프론트엔드입니다. Next.js(App Router) + TypeScript.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
```

Node 20.9 이상이 필요합니다.

빌드·검증:

```bash
npm run format      # Prettier 정리 (format:check로 확인만)
npm run lint        # ESLint (lint:fix로 자동 수정)
npm run typecheck   # tsc --noEmit
npm run build
```

## 라우트

전체 목록은 `/screens`에서 확인할 수 있습니다. (34개 화면)

| 그룹         | 경로                                                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| 메인 플로우  | `/onboarding` → `/signup` → `/login` → `/dashboard`                                                                                    |
| 워크스페이스 | `/parts`, `/parts/new`, `/prompts`, `/prompts/new`, `/trash`, `/settings`, `/settings/google`                                          |
| 온보딩 완료  | `/onboarding/ready`, `/onboarding/extension`                                                                                           |
| Auth 상태    | `/login/error`, `/signup/error`, `/signup/sent`, `/reset`, `/reset/sent`, `/reset/new`, `/link/expired`, `/link/used`, `/link/invalid` |
| 빈 상태      | `/empty/parts`, `/empty/prompts`, `/empty/prompts-no-parts`, `/empty/search`, `/empty/add-part`, `/empty/ext-widget`                   |
| 공통 상태    | `/error/403`, `/error/404`, `/offline`, `/states/toast`, `/states/loading`                                                             |

## 구조

- `app/` — 라우트. `(workspace)/layout.tsx`가 LNB + 콘텐츠 패널 공용 셸
- `components/layout` — LNB, 상단 배너
- `components/auth` — 로그인·회원가입 공통 카드
- `components/onboarding` — 온보딩 일러스트(Figma 도형을 좌표로 옮긴 스켈레톤)
- `components/ui` — PageHeader, SearchBar, ListHeader, ViewSwitch, Tag, CodeBlock
- `components/cards` — BasicCard, PartCard, PromptCard
- `styles/` — `tokens.css`(Figma 변수), `base.css`(리셋·타이포), `components.css`
- `lib/mock-data.ts` — 시안용 더미 데이터
- `types/` — 공용 타입
- `public/assets/` — Figma에서 내보낸 아이콘·로고·차트

화면 플로우는 **온보딩 → 회원가입 → 로그인 → 대시보드** 순으로 클릭해서 넘어갑니다.
인증 로직은 없고 버튼이 다음 화면으로 이동만 시키는 시안 상태입니다.
데이터도 Figma 시안의 더미 값이며 API 연동은 들어가 있지 않습니다.
작업 규칙은 [CLAUDE.md](CLAUDE.md)를 참고하세요.

## 참고

- Figma: https://www.figma.com/design/CMxbScTqJOOYcrteLkuCXW/프롬버터
- Jira: https://prombutter.atlassian.net/browse/PB-41
## 운영 API 연결

프론트와 기존 Python API는 각각 Vercel에 배포하고 DB·OAuth 인증은 Supabase를 사용한다.

Vercel 프론트 프로젝트의 NEXT_PUBLIC_API_BASE_URL에는 배포된 Python API의 HTTPS 오리진을 등록한다. 경로·쿼리·사용자 인증정보가 없는 API 주소여야 한다. 운영 빌드는 이 값이 없거나 유효하지 않으면 중단한다. 로컬 개발에서는 /api 프록시가 localhost:8000으로 연결된다.

API 요청에는 쿠키가 포함된다. API 프로젝트는 프론트 오리진을 CORS에 허용하고 운영 쿠키를 Secure=true, SameSite=none으로 설정한다. API를 먼저 배포한 뒤 실제 API 주소로 프론트를 빌드한다.

현재 로그인 화면은 실제 인증 호출이 없고 파츠 API는 임시 workspace ID를 사용한다. 이 연결 작업은 별도 미완료 항목이며 빌드 성공을 로그인·데이터 연동 완료로 보고하지 않는다.

변경 후 lint, build, typecheck를 확인한다. build와 typecheck는 순서대로 실행한다.

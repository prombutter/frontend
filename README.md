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

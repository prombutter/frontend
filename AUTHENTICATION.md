# 실제 로그인과 확장 인증

로그인과 회원가입은 `NEXT_PUBLIC_API_BASE_URL`의 `/auth/login`, `/auth/signup`을 호출한다. 응답 뒤 `/auth/me`의 계정 ID를 확인한 경우에만 대시보드로 이동한다. 인증은 백엔드의 HttpOnly 쿠키를 사용하며 토큰을 프론트 저장소에 복사하지 않는다.

Google 로그인은 백엔드의 `/auth/oauth/google/redirect`를 거친다. 프론트의 `/auth/callback`에서 쿠키 인증을 확인한다. 백엔드의 OAuth 허용 주소와 Supabase 및 Google 설정은 실제 운영 주소와 맞아야 한다.

파츠 API는 기존 `/api/v1` 경로를 사용한다. 워크스페이스를 생략하면 `/workspaces`에서 현재 계정의 ID를 조회한다. 임시 전체 0 UUID는 사용하지 않는다. 대시보드와 프롬프트 화면의 기존 시안 데이터는 별도 연동 대상이다.

로그인 결과 `web_login_result`는 브라우저 `localStorage`의 `prombutter.authEvents`에 최대 50건 저장한다. UTC 시각, 요청 ID, 결과와 원인 코드, 소요 시간만 기록한다. 이메일, 비밀번호, 쿠키와 토큰은 기록하지 않는다. 저장소 실패는 `storage_failed`로 알리고 인증 결과는 유지한다. 백엔드의 이메일 로그인 결과는 기존 `login_attempts`에도 저장된다.

Chrome 확장의 API 주소와 `host_permissions`는 같은 운영 백엔드를 가리켜야 한다. 설치본을 `chrome://extensions`에서 새로고침하고 Gemini 등 사용하는 페이지도 새로고침한다. 개발자 로그인은 명시적으로 활성화한 로컬 API에서만 사용할 수 있다.

확인 명령: `node --test tests/auth.test.mjs`, `npm run lint`, `npm run build`, 빌드 후 `npm run typecheck`, `node i18n-check.mjs locales --base ko`.

빌드와 모의 네트워크 검증만으로 실제 Chrome 쿠키 전달이나 Google 계정의 로그인 완료를 판정하지 않는다.

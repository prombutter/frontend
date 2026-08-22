import Link from "next/link";

/** 만들어둔 화면을 한눈에 보는 인덱스. Figma 섹션 단위로 묶었다. */
const GROUPS = [
  {
    title: "디자인 시스템",
    items: [["/design-system", "공통 컴포넌트 카탈로그 (PB-43)"]],
  },
  {
    title: "메인 플로우",
    items: [
      ["/onboarding", "온보딩 3단계"],
      ["/signup", "회원가입"],
      ["/login", "로그인"],
      ["/dashboard", "대시보드"],
    ],
  },
  {
    title: "워크스페이스",
    items: [
      ["/parts", "파츠 목록"],
      ["/parts/new", "파츠 생성"],
      ["/prompts", "프롬프트 목록"],
      ["/prompts/new", "프롬프트 생성"],
      ["/trash", "휴지통"],
      ["/settings", "설정 — 이메일 계정"],
      ["/settings/google", "설정 — Google 계정"],
    ],
  },
  {
    title: "온보딩 완료",
    items: [
      ["/onboarding/ready", "워크스페이스 준비 완료"],
      ["/onboarding/extension", "확장 프로그램 설치 안내"],
    ],
  },
  {
    title: "Auth 상태",
    items: [
      ["/login/error", "로그인 — 보안 확인(CAPTCHA)"],
      ["/signup/error", "회원가입 — 유효성 실패"],
      ["/signup/sent", "인증 메일 발송"],
      ["/reset", "비밀번호 재설정 — 이메일 입력"],
      ["/reset/sent", "재설정 링크 발송"],
      ["/reset/new", "새 비밀번호 입력"],
      ["/link/expired", "링크 만료"],
      ["/link/used", "이미 사용된 링크"],
      ["/link/invalid", "유효하지 않은 링크"],
    ],
  },
  {
    title: "빈 상태",
    items: [
      ["/empty/parts", "파츠 없음"],
      ["/empty/prompts", "프롬프트 없음 (파츠 있음)"],
      ["/empty/prompts-no-parts", "프롬프트 없음 (파츠도 없음)"],
      ["/empty/search", "검색 결과 없음"],
      ["/empty/add-part", "파츠 추가 패널 비어 있음"],
      ["/empty/ext-widget", "확장 위젯 즐겨찾기 없음"],
    ],
  },
  {
    title: "공통 상태",
    items: [
      ["/error/403", "403 권한 없음"],
      ["/error/404", "404 페이지 없음"],
      ["/offline", "네트워크 연결 실패"],
      ["/states/toast", "토스트 3종 + 표시 규칙"],
      ["/states/loading", "스켈레톤 · 진행바 · 스피너"],
    ],
  },
];

export default function ScreensPage() {
  return (
    <div className="screens">
      <h1 className="t-h1">Prombutter 화면 목록</h1>
      <p className="screens__lead">
        Figma 시안을 옮긴 화면 {GROUPS.reduce((n, g) => n + g.items.length, 0)}종입니다.
      </p>

      {GROUPS.map((group) => (
        <section className="screens__group" key={group.title}>
          <h2>{group.title}</h2>
          <ul>
            {group.items.map(([href, label]) => (
              <li key={href}>
                <Link href={href}>
                  <span className="screens__label">{label}</span>
                  <span className="screens__path">{href}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

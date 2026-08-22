import Image from "next/image";

/**
 * 로그인·회원가입·안내 화면 공통 카드 셸.
 * 로고 → (상태 아이콘) → 제목 → 본문 → 하단 링크 순서.
 */
export function AuthCard({
  title,
  desc,
  icon,
  status = false,
  children,
  links,
}: {
  title: string;
  /** 여러 줄이면 배열로 넘긴다. */
  desc: string | string[];
  /** 로고 아래 상태 아이콘 (메일 발송·링크 오류 안내용) */
  icon?: React.ReactNode;
  /** 안내형 카드: 제목이 22px로 작아지고 위 여백이 줄어든다 */
  status?: boolean;
  children?: React.ReactNode;
  links?: React.ReactNode;
}) {
  const lines = Array.isArray(desc) ? desc : [desc];

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <Image
          className="auth-card__logo"
          src="/assets/logo-dark.svg"
          alt="Prombutter"
          width={206}
          height={31}
          priority
        />
        {icon}
        <div className={`auth-title${status ? " auth-title--status" : ""}`}>
          <h1>{title}</h1>
          <p>
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
        {children && <div className="auth-form">{children}</div>}
        {links}
      </div>
    </div>
  );
}

/** 메일 발송 안내의 앰버 원형 아이콘 */
export function MailBadge() {
  return (
    <div className="auth-icon-badge">
      <Image src="/assets/icon-mail.svg" alt="" width={60} height={60} />
    </div>
  );
}

/** 링크 오류 안내의 경고 아이콘 */
export function AlertIcon() {
  return (
    <div className="auth-status-icon">
      <Image src="/assets/icon-alert-lg.svg" alt="" width={56} height={56} />
    </div>
  );
}

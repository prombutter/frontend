import Link from "next/link";

/** 403 · 404 · 오프라인 공통 에러 상태 블록. */
export function ErrorState({
  code,
  title,
  desc,
  cta,
  href,
}: {
  code: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="error-state">
      <span className="error-state__code">{code}</span>
      <div className="error-state__title">
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <Link className="btn btn--primary btn--pill" href={href}>
        {cta}
      </Link>
    </div>
  );
}

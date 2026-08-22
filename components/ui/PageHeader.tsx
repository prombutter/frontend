/** 페이지 상단 헤더: 타이틀 + 설명 + (선택) 우측 액션. 아래 구분선까지 포함한다. */
export function PageHeader({
  title,
  desc,
  actions,
}: {
  title: string;
  desc: string;
  actions?: React.ReactNode;
}) {
  return (
    <>
      <header className="page-header">
        <h1 className="t-h1 page-header__title">{title}</h1>
        <p className="page-header__desc">{desc}</p>
        {actions && <div className="page-header__actions">{actions}</div>}
      </header>
      <div className="divider" />
    </>
  );
}

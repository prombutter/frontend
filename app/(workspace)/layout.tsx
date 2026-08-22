import Lnb from "@/components/layout/Lnb";

/** LNB + 라이트 톤 콘텐츠 패널로 이루어진 워크스페이스 셸. */
export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <Lnb />
      <main className="content">{children}</main>
    </div>
  );
}

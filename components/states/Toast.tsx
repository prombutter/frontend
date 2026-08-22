import Image from "next/image";

const DOTS = {
  success: "/assets/dot-success.svg",
  info: "/assets/dot-info.svg",
  error: "/assets/dot-error.svg",
};

/** 화면 하단 중앙에 쌓이는 토스트. 최대 3개까지 노출한다(FS-201 §8.3). */
export function Toast({
  tone,
  children,
  action,
}: {
  tone: keyof typeof DOTS;
  children: React.ReactNode;
  action?: string;
}) {
  return (
    <div className={`toast${action ? " toast--with-action" : ""}`}>
      <Image className="toast__dot" src={DOTS[tone]} alt="" width={8} height={8} />
      <span>{children}</span>
      {action && <span className="toast__action">{action}</span>}
    </div>
  );
}

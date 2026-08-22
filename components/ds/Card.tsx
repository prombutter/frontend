import { cn } from "./cn";

/** 흰 배경 + 카드 보더 + 12px 라운드. 목록·설정 화면의 기본 컨테이너. */
export function Card({
  className,
  padded = true,
  children,
}: {
  className?: string;
  /** 기본 여백(28px)을 끌지 여부. 카드 안쪽을 직접 잡을 때 false */
  padded?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[12px] border border-border-card bg-white",
        padded && "p-[28px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** 위험 구역처럼 빨간 톤으로 강조하는 카드. */
export function DangerCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[12px] border border-[rgba(220,28,28,0.35)] bg-[rgba(220,28,28,0.04)] p-[28px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

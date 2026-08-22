import Image from "next/image";
import { cn } from "./cn";

const DOTS = {
  success: "/assets/dot-success.svg",
  info: "/assets/dot-info.svg",
  error: "/assets/dot-error.svg",
} as const;

export type ToastTone = keyof typeof DOTS;

/**
 * 화면 하단 중앙에 쌓이는 토스트 (FS-201 §8.3).
 * 자동 닫힘 시간은 호출부가 관리한다 — 성공·정보 3초, 에러 5초,
 * 재시도 버튼이 있으면 클릭 전까지 유지.
 */
export function Toast({
  tone,
  action,
  onAction,
  children,
}: {
  tone: ToastTone;
  action?: string;
  onAction?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-[14px] rounded-[10px] bg-navy-900 py-[14px] pl-[18px]",
        action ? "pr-[14px]" : "pr-[18px]",
        "font-body text-[14px] font-medium leading-[1.5] tracking-[-0.28px] whitespace-nowrap text-white",
        "shadow-[0_6px_18px_rgba(0,0,0,0.2)]",
      )}
      role="status"
    >
      <Image src={DOTS[tone]} alt="" width={8} height={8} className="size-[8px] shrink-0" />
      <span>{children}</span>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="ml-[8px] rounded-[6px] border border-[rgba(220,219,215,0.5)] px-[10px] py-[6px] font-body text-[13px] font-semibold leading-[1.5] tracking-[-0.26px] text-amber-200"
        >
          {action}
        </button>
      )}
    </div>
  );
}

/** 토스트를 담는 고정 컨테이너. 최대 3개까지만 노출한다. */
export function ToastStack({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-[40px] left-1/2 z-100 flex -translate-x-1/2 flex-col items-center gap-[10px]">
      {children}
    </div>
  );
}

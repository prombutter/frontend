"use client";

import { cn } from "./cn";

/**
 * 가운데 뜨는 확인 모달. 스크림을 누르거나 ESC로 닫힌다.
 * 토스트보다 아래(z-50)에 깔린다 — FS-201 §8.3에서 토스트가 최상위다.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  actions,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: React.ReactNode;
  actions: React.ReactNode;
  className?: string;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(26,27,47,0.45)]"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className={cn(
          "flex w-[420px] max-w-[calc(100%-48px)] flex-col items-center",
          "rounded-[16px] bg-white px-[32px] pt-[36px] pb-[28px]",
          "shadow-[0_12px_32px_rgba(0,0,0,0.22)]",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col items-center gap-[12px] pb-[28px] text-center">
          <h2 className="font-body text-[19px] font-semibold leading-[1.55] tracking-[-0.38px] text-neutral-900">
            {title}
          </h2>
          {description && (
            <p className="font-body text-[14px] leading-[1.55] tracking-[-0.28px] text-neutral-600">
              {description}
            </p>
          )}
        </div>
        <div className="flex w-full gap-[10px] [&>*]:flex-1">{actions}</div>
      </div>
    </div>
  );
}

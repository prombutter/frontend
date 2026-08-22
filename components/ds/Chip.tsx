import { cn } from "./cn";

export type ChipTone = "blue" | "orange" | "amber";

const TONES: Record<ChipTone, string> = {
  blue: "bg-tag-blue-bg text-tag-blue-fg",
  orange: "bg-tag-orange-bg text-tag-orange-fg",
  amber: "bg-amber-200 text-amber-700",
};

/** 태그 뱃지. 목록 카드 하단과 필터에 쓴다. */
export function Chip({
  tone = "blue",
  className,
  children,
}: {
  tone?: ChipTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[20px] px-[12px] py-[6px]",
        "font-body text-[14px] leading-[15.4px]",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

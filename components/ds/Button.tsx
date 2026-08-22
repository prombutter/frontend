import Link from "next/link";
import { cn } from "./cn";

/**
 * Figma 버튼 컴포넌트 세트(88:1592)를 그대로 옮긴 것.
 *
 * Figma의 variant 이름을 코드 관례에 맞춰 바꿨다.
 *   size  34 → sm · 48 → md · 56 → lg
 *   type  Primary → primary · secondary · teriary(오타) → tertiary · warning
 *   state disabled는 Figma에서 gray 타입으로 잡혀 있지만, 코드에서는
 *         타입과 무관하게 disabled prop으로 처리한다.
 */
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "warning";
export type ButtonSize = "sm" | "md" | "lg";

const SIZES: Record<ButtonSize, string> = {
  sm: "gap-[10px] rounded-[8px] text-[14px]",
  md: "h-[48px] gap-[8px] rounded-[12px] text-[18px]",
  lg: "h-[56px] gap-[8px] rounded-[12px] text-[18px]",
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-navy-900 text-white",
  secondary: "bg-white border border-border-button text-neutral-900",
  tertiary: "border border-neutral-400 text-neutral-900",
  warning: "border border-red-500 text-red-500",
};

const BASE =
  "inline-flex items-center justify-center px-[20px] py-[8px] " +
  "font-body font-medium leading-[18px] text-center whitespace-nowrap " +
  "transition-opacity hover:opacity-90 " +
  "disabled:pointer-events-none disabled:bg-neutral-300 disabled:border-transparent disabled:text-neutral-400";

/** 아이콘 크기는 사이즈에 딸려간다 (34 → 16px, 48·56 → 24px). */
export function buttonIconSize(size: ButtonSize) {
  return size === "sm" ? 16 : 24;
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "lg",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(BASE, SIZES[size], VARIANTS[variant], className)} {...rest}>
      {children}
    </button>
  );
}

/** 같은 모양으로 이동만 하는 링크 버튼. */
export function ButtonLink({
  variant = "primary",
  size = "lg",
  className,
  children,
  href,
  ...rest
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={cn(BASE, SIZES[size], VARIANTS[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

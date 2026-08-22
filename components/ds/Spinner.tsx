import Image from "next/image";
import { cn } from "./cn";

/** 로딩 스피너. prefers-reduced-motion에서는 회전을 멈춘다(styles/components.css). */
export function Spinner({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/assets/spinner.svg"
      alt=""
      width={size}
      height={size}
      className={cn("spinner", className)}
      style={{ width: size, height: size }}
    />
  );
}

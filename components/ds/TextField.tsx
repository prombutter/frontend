"use client";

import { useState } from "react";
import { cn } from "./cn";

/**
 * 라벨 + 입력 + (선택) 에러 메시지 한 벌.
 * Figma 기준 높이는 본 폼 52px, 설정 화면 48px 두 가지다.
 */
export function TextField({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  error,
  invalid,
  readOnly,
  hint,
  compact = false,
  children,
}: {
  label: string;
  name?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  defaultValue?: string;
  /** 에러 메시지. 있으면 테두리도 빨갛게 된다. */
  error?: string;
  /** 메시지 없이 테두리만 에러 표시 */
  invalid?: boolean;
  readOnly?: boolean;
  /** 입력 아래 회색 보조 문구 */
  hint?: string;
  /** 설정 화면용 48px 높이 */
  compact?: boolean;
  /** 입력 아래에 끼워 넣을 요소 (비밀번호 강도 등) */
  children?: React.ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const isError = Boolean(error) || invalid;

  return (
    <div className="flex w-full flex-col gap-[8px]">
      <label
        className="font-body text-[14px] font-medium leading-[1.5] tracking-[-0.28px] text-neutral-700"
        htmlFor={name}
      >
        {label}
      </label>

      <div
        className={cn(
          "flex items-center justify-between gap-[8px] px-[16px]",
          compact ? "h-[48px] rounded-[10px]" : "h-[52px] rounded-[12px]",
          readOnly ? "bg-neutral-50" : "bg-white",
          isError ? "border border-red-500" : "border border-neutral-300",
          !isError && "focus-within:border-navy-900",
        )}
      >
        <input
          id={name}
          name={name}
          type={isPassword && revealed ? "text" : type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          readOnly={readOnly}
          className={cn(
            "min-w-0 flex-1 border-0 bg-transparent font-body text-[15px] leading-[1.5] tracking-[-0.3px] outline-none",
            "placeholder:text-neutral-400",
            readOnly ? "text-neutral-600" : "text-neutral-900",
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-pressed={revealed}
            className="shrink-0 font-body text-[13px] font-medium leading-[1.5] tracking-[-0.26px] text-neutral-500"
          >
            {revealed ? "숨김" : "표시"}
          </button>
        )}
      </div>

      {children}
      {hint && (
        <p className="font-body text-[12px] leading-[1.5] tracking-[-0.24px] text-neutral-500">
          {hint}
        </p>
      )}
      {error && (
        <p className="font-body text-[13px] leading-[1.55] tracking-[-0.26px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** 비밀번호 강도 3단 막대. weak면 첫 칸이 빨갛게 찬다. */
export function PasswordStrength({
  level = 0,
  weak = false,
}: {
  level?: 0 | 1 | 2 | 3;
  weak?: boolean;
}) {
  const label = weak ? "약함" : ["약/보통/강", "약", "보통", "강"][level];
  const filled = weak ? 1 : level;

  return (
    <div className="flex w-full items-center gap-[8px]">
      <div className="flex min-w-0 flex-1 gap-[6px]">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "h-[4px] flex-1 rounded-[2px]",
              i <= filled ? (weak ? "bg-red-500" : "bg-amber-400") : "bg-neutral-200",
            )}
          />
        ))}
      </div>
      <span
        className={cn(
          "font-body text-[12px] font-medium leading-[1.5] tracking-[-0.24px]",
          weak ? "text-red-600" : "text-neutral-400",
        )}
      >
        {label}
      </span>
    </div>
  );
}

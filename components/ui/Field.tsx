"use client";

import { useState } from "react";

/** 라벨 + 입력 한 벌. 비밀번호 필드는 우측에 표시/숨김 토글이 붙는다. */
export function Field({
  label,
  placeholder,
  type = "text",
  name,
  defaultValue,
  error,
  invalid,
  children,
}: {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  name?: string;
  defaultValue?: string;
  /** 입력 아래에 붙는 에러 메시지. 있으면 테두리도 빨갛게 된다. */
  error?: string;
  /** 메시지 없이 테두리만 에러 표시할 때 */
  invalid?: boolean;
  /** 입력 아래 보조 UI (비밀번호 강도 등) */
  children?: React.ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const isError = Boolean(error) || invalid;

  return (
    <div className="field">
      <label className="field__label" htmlFor={name}>
        {label}
      </label>
      <div className={`field__control${isError ? " is-error" : ""}`}>
        <input
          id={name}
          name={name}
          type={isPassword && revealed ? "text" : type}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        {isPassword && (
          <button
            className="field__affix"
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-pressed={revealed}
          >
            {revealed ? "숨김" : "표시"}
          </button>
        )}
      </div>
      {children}
      {error && <p className="field__error">{error}</p>}
    </div>
  );
}

/** 비밀번호 강도 3단 막대. level 0~3, weak면 첫 칸이 빨갛게 찬다. */
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
    <div className="pw-strength">
      <div className="pw-strength__bars">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`pw-strength__bar${i <= filled ? (weak ? " is-weak" : " is-on") : ""}`}
          />
        ))}
      </div>
      <span className={`pw-strength__label${weak ? " is-weak" : ""}`}>{label}</span>
    </div>
  );
}

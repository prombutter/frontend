"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { Field } from "@/components/ui/Field";
import { authenticate, AuthError, googleLoginUrl } from "@/lib/api/auth";
import { translate as t } from "@/lib/i18n";

export default function AccountForm({ mode }: { mode: "login" | "signup" }) {
  const signup = mode === "signup";
  const router = useRouter();
  const busy = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const fields = new FormData(event.currentTarget);
    const email = String(fields.get("email") ?? "").trim();
    const password = String(fields.get("password") ?? "");
    if (!email || !password) {
      setError(t("requiredFields"));
      return;
    }
    if (signup && password !== fields.get("password-confirm")) {
      setError(t("passwordMismatch"));
      return;
    }
    busy.current = true;
    setPending(true);
    setError("");
    try {
      const values: Record<string, string> = { email, password };
      if (signup) values.name = String(fields.get("name") ?? "").trim();
      await authenticate(mode, values);
      router.replace("/dashboard");
    } catch (error) {
      const code = error instanceof AuthError ? error.code : "";
      setError(
        code === "ERR-AUTH-002"
          ? t("invalidCredentials")
          : code === "ERR-AUTH-003"
            ? t("duplicateEmail")
            : ["SESSION_COOKIE_FAILED", "ERR-AUTH-001"].includes(code)
              ? t("cookieFailed")
              : ["HTTP_422", "ERR-VAL-001", "ERR-VAL-002"].includes(code)
                ? t("invalidInput")
                : t("loginFailed"),
      );
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  return (
    <AuthCard
      title={t(signup ? "signupTitle" : "loginTitle")}
      desc={t(signup ? "signupDescription" : "loginDescription")}
      links={
        <div className="auth-links">
          {signup && <span className="auth-links__plain">{t("hasAccount")}</span>}
          <Link className="auth-links__strong" href={signup ? "/login" : "/signup"}>
            {t(signup ? "loginTitle" : "signup")}
          </Link>
        </div>
      }
    >
      <form className="auth-form" onSubmit={submit}>
        {signup && <Field name="name" label={t("name")} placeholder={t("namePlaceholder")} />}
        <Field name="email" type="email" label={t("email")} placeholder={t("emailPlaceholder")} />
        <Field
          name="password"
          type="password"
          label={t("password")}
          placeholder={t("passwordPlaceholder")}
        />
        {signup && (
          <Field
            name="password-confirm"
            type="password"
            label={t("confirmPassword")}
            placeholder={t("confirmPasswordPlaceholder")}
          />
        )}
        {error && (
          <p className="auth-alert" role="alert">
            {error}
          </p>
        )}
        <button className="btn btn--primary btn--block" type="submit" disabled={pending}>
          {pending
            ? t(signup ? "creatingAccount" : "signingIn")
            : t(signup ? "signupAction" : "loginTitle")}
        </button>
      </form>
      {!signup && (
        <>
          <div className="divider-or">
            <span>{t("or")}</span>
          </div>
          <button
            className="btn btn--outline btn--block"
            type="button"
            disabled={pending}
            onClick={() => {
              if (!busy.current) window.location.assign(googleLoginUrl(window.location.origin));
            }}
          >
            {t("googleLogin")}
          </button>
        </>
      )}
    </AuthCard>
  );
}

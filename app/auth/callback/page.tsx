"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { confirmOAuthSession } from "@/lib/api/auth";
import { translate as t } from "@/lib/i18n";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    confirmOAuthSession(window.location.href)
      .then(() => {
        if (active) router.replace("/dashboard");
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [router]);
  return (
    <AuthCard
      title={t("callbackTitle")}
      desc={failed ? t("cookieFailed") : t("callbackDescription")}
    >
      {failed && (
        <Link className="btn btn--primary btn--block" href="/login">
          {t("backToLogin")}
        </Link>
      )}
    </AuthCard>
  );
}

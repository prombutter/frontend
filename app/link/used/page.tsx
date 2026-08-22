import Link from "next/link";
import { AlertIcon, AuthCard } from "@/components/auth/AuthCard";

/** 이미 사용된 링크 */
export default function LinkUsedPage() {
  return (
    <AuthCard
      status
      icon={<AlertIcon />}
      title="이미 사용된 링크입니다"
      desc="이 링크는 이미 사용되었어요. 로그인해주세요."
      links={
        <div className="auth-links auth-links--single">
          <Link className="auth-links__strong" href="/login">
            로그인으로 돌아가기
          </Link>
        </div>
      }
    >
      <div className="auth-actions">
        <Link className="btn btn--primary btn--block" href="/login">
          로그인하기
        </Link>
      </div>
    </AuthCard>
  );
}

import Link from "next/link";
import { AlertIcon, AuthCard } from "@/components/auth/AuthCard";

/** 인증·재설정 링크 만료 */
export default function LinkExpiredPage() {
  return (
    <AuthCard
      status
      icon={<AlertIcon />}
      title="링크가 만료되었습니다"
      desc={[
        "인증 링크는 발송 후 1시간(비밀번호 재설정은 3시간) 동안만",
        "유효해요. 메일을 다시 받아 진행해주세요.",
      ]}
      links={
        <div className="auth-links auth-links--single">
          <Link className="auth-links__strong" href="/login">
            로그인으로 돌아가기
          </Link>
        </div>
      }
    >
      <div className="auth-actions">
        <Link className="btn btn--primary btn--block" href="/reset">
          메일 다시 받기
        </Link>
      </div>
    </AuthCard>
  );
}

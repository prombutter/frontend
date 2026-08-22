import Link from "next/link";
import { AuthCard, MailBadge } from "@/components/auth/AuthCard";

/** 회원가입 후 인증 메일 발송 안내 */
export default function SignupSentPage() {
  return (
    <AuthCard
      status
      icon={<MailBadge />}
      title="인증 이메일을 발송했습니다"
      desc={[
        "minji@promptbutter.com 으로 보낸 메일함을 확인해주세요.",
        "인증 링크는 1시간 동안 유효해요.",
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
        <button className="btn btn--outline btn--block" type="button">
          인증 메일 재발송
        </button>
        <p className="auth-note">메일이 오지 않았다면 스팸함도 확인해주세요.</p>
      </div>
    </AuthCard>
  );
}

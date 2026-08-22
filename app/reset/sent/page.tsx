import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";

/** 비밀번호 재설정 링크 발송 안내 */
export default function ResetSentPage() {
  return (
    <AuthCard
      status
      title="재설정 링크를 발송했습니다"
      desc={["이메일이 존재하는 경우 재설정 링크를 발송했습니다.", "링크는 3시간 동안 유효해요."]}
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
          재설정 메일 재발송
        </button>
        <p className="auth-note">메일이 오지 않았다면 스팸함도 확인해주세요.</p>
      </div>
    </AuthCard>
  );
}

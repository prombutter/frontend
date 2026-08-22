import Link from "next/link";
import { AlertIcon, AuthCard } from "@/components/auth/AuthCard";

/** 링크 주소가 잘못된 경우 */
export default function LinkInvalidPage() {
  return (
    <AuthCard
      status
      icon={<AlertIcon />}
      title="유효하지 않은 링크입니다"
      desc={["링크 주소가 올바르지 않아요.", "메일에 있는 링크를 다시 눌러주세요."]}
      links={
        <div className="auth-links auth-links--single">
          <Link className="auth-links__strong" href="/login">
            로그인으로 돌아가기
          </Link>
        </div>
      }
    >
      <div className="auth-actions">
        <Link className="btn btn--outline btn--block" href="/reset">
          메일 다시 받기
        </Link>
      </div>
    </AuthCard>
  );
}

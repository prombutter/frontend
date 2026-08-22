import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Field } from "@/components/ui/Field";

/** 비밀번호 재설정 1단계 — 이메일 입력 */
export default function ResetStep1Page() {
  return (
    <AuthCard
      status
      title="비밀번호를 재설정할게요"
      desc={["가입하신 이메일 주소를 입력하면", "재설정 링크를 보내드려요."]}
      links={
        <div className="auth-links auth-links--tight">
          <span className="auth-links__plain">비밀번호가 기억나셨나요?</span>
          <Link className="auth-links__strong" href="/login">
            로그인
          </Link>
        </div>
      }
    >
      <Field name="email" type="email" label="이메일" placeholder="이메일 주소 입력" />
      <Link className="btn btn--primary btn--block" href="/reset/sent">
        재설정 링크 받기
      </Link>
    </AuthCard>
  );
}

import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Field } from "@/components/ui/Field";

/** 비밀번호 재설정 2단계 — 새 비밀번호 입력 */
export default function ResetStep2Page() {
  return (
    <AuthCard
      status
      title="새 비밀번호를 입력해주세요"
      desc="변경하면 다른 기기의 로그인은 모두 해제돼요."
      links={
        <div className="auth-links auth-links--single">
          <Link className="auth-links__strong" href="/login">
            로그인으로 돌아가기
          </Link>
        </div>
      }
    >
      <Field
        name="password"
        type="password"
        label="새 비밀번호"
        placeholder="8자 이상, 영문·숫자·특수문자 포함"
      />
      <Field
        name="password-confirm"
        type="password"
        label="새 비밀번호 확인"
        placeholder="비밀번호 다시 입력"
      />
      <Link className="btn btn--primary btn--block" href="/login">
        비밀번호 변경하기
      </Link>
    </AuthCard>
  );
}

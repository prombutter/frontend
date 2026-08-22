import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Field, PasswordStrength } from "@/components/ui/Field";

export default function SignupPage() {
  return (
    <AuthCard
      title="회원가입"
      desc="이메일 인증 후 바로 시작할 수 있어요"
      links={
        <div className="auth-links auth-links--tight">
          <span className="auth-links__plain">이미 계정이 있으신가요?</span>
          <Link className="auth-links__strong" href="/login">
            로그인
          </Link>
        </div>
      }
    >
      <Field name="name" label="이름" placeholder="이름 입력" />
      <Field name="email" type="email" label="이메일" placeholder="이메일 주소 입력" />
      <Field
        name="password"
        type="password"
        label="비밀번호"
        placeholder="8자 이상, 영문·숫자·특수문자 포함"
      >
        <PasswordStrength />
      </Field>
      <Field
        name="password-confirm"
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호 다시 입력"
      />

      {/* 시안 플로우 확인용 — 실제 가입 없이 로그인 화면으로 이동한다 */}
      <Link className="btn btn--primary btn--block" href="/login">
        가입하기
      </Link>
    </AuthCard>
  );
}

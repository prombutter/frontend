import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Field, PasswordStrength } from "@/components/ui/Field";

/** 회원가입 유효성 실패 상태 — 이메일 중복 · 비밀번호 규칙 · 확인 불일치 */
export default function SignupErrorPage() {
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
      <Field name="name" label="이름" defaultValue="김민지" />
      <Field
        name="email"
        type="email"
        label="이메일"
        defaultValue="minji@promptbutter.com"
        error="이미 사용 중인 이메일입니다."
      />
      <Field
        name="password"
        type="password"
        label="비밀번호"
        defaultValue="password"
        error="특수문자(!@#$%^&* 등)를 포함해주세요."
      >
        <PasswordStrength weak />
      </Field>
      <Field
        name="password-confirm"
        type="password"
        label="비밀번호 확인"
        defaultValue="password12"
        error="비밀번호가 일치하지 않습니다."
      />

      <button className="btn btn--block btn--disabled" type="button" disabled>
        가입하기
      </button>
    </AuthCard>
  );
}

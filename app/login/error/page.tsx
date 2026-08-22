import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Field } from "@/components/ui/Field";

/** 로그인 5회 연속 실패 → 보안 확인(CAPTCHA) 요구 상태 */
export default function LoginCaptchaPage() {
  return (
    <AuthCard
      title="로그인"
      desc="저장해둔 파츠를 바로 꺼내 쓰세요"
      links={
        <div className="auth-links">
          <Link className="auth-links__muted" href="/reset">
            비밀번호를 잊으셨나요?
          </Link>
          <span className="auth-links__sep">·</span>
          <Link className="auth-links__strong" href="/signup">
            회원가입
          </Link>
        </div>
      }
    >
      <p className="auth-alert">보안 확인이 필요합니다. (5회 연속 실패)</p>

      <Field name="email" type="email" label="이메일" defaultValue="minji@promptbutter.com" />
      <Field name="password" type="password" label="비밀번호" defaultValue="password" invalid />

      <div className="captcha">
        <span className="captcha__box" />
        <span className="captcha__label">로봇이 아닙니다</span>
        <span className="captcha__brand">reCAPTCHA</span>
      </div>

      <Link className="btn btn--primary btn--block" href="/dashboard">
        로그인
      </Link>

      <div className="divider-or">
        <span>또는</span>
      </div>

      <button className="btn btn--outline btn--block" type="button">
        Google로 로그인
      </button>
    </AuthCard>
  );
}

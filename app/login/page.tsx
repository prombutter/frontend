import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Field } from "@/components/ui/Field";

export default function LoginPage() {
  return (
    <AuthCard
      title="로그인"
      desc="저장해둔 파츠를 바로 꺼내 쓰세요"
      links={
        <div className="auth-links">
          <span className="auth-links__muted">비밀번호를 잊으셨나요?</span>
          <span className="auth-links__sep">·</span>
          <Link className="auth-links__strong" href="/signup">
            회원가입
          </Link>
        </div>
      }
    >
      <Field name="email" type="email" label="이메일" placeholder="이메일 주소 입력" />
      <Field name="password" type="password" label="비밀번호" placeholder="비밀번호 입력" />

      {/* 시안 플로우 확인용 — 실제 인증 없이 대시보드로 이동한다 */}
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

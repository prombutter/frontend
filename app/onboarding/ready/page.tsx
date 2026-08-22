import Link from "next/link";

/** 가입 직후 워크스페이스 생성 완료 안내 (ONB-READY) */
export default function OnboardingReadyPage() {
  return (
    <div className="onb-done-shell">
      <div className="ws-illust">
        <div className="ws-illust__slots">
          <span className="ws-illust__slot" />
          <span className="ws-illust__slot" />
          <span className="ws-illust__slot" />
        </div>
        <div
          className="sk-tray-base"
          style={{ position: "absolute", left: 23, top: 123, width: 252 }}
        />
      </div>

      <div className="onb-done__title">
        <h1>내 워크스페이스가 준비되었습니다</h1>
        <p>김민지님의 워크스페이스</p>
      </div>

      <div className="onb-done__actions">
        <Link className="btn btn--primary btn--block" href="/dashboard">
          바로 시작하기
        </Link>
        <Link className="btn btn--outline btn--block" href="/onboarding/extension">
          다음
        </Link>
      </div>
    </div>
  );
}

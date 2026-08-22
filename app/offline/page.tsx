import { ErrorState } from "@/components/states/ErrorState";

/** 네트워크 연결 실패 — LNB 없이 전체 화면으로 표시된다. */
export default function OfflinePage() {
  return (
    <div className="offline-shell">
      <ErrorState
        code="OFFLINE"
        title="연결에 실패했습니다"
        desc="네트워크를 확인하고 새로고침해주세요."
        cta="새로고침"
        href="/offline"
      />
    </div>
  );
}

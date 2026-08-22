import { ErrorState } from "@/components/states/ErrorState";

export default function Error403Page() {
  return (
    <div className="state-center">
      <ErrorState
        code="403"
        title="접근 권한이 없습니다"
        desc="이 페이지를 볼 수 있는 권한이 없어요."
        cta="홈으로"
        href="/dashboard"
      />
    </div>
  );
}

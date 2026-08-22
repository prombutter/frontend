import { ErrorState } from "@/components/states/ErrorState";

export default function Error404Page() {
  return (
    <div className="state-center">
      <ErrorState
        code="404"
        title="페이지를 찾을 수 없습니다"
        desc="주소가 바뀌었거나 삭제된 페이지예요."
        cta="홈으로"
        href="/dashboard"
      />
    </div>
  );
}

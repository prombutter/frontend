import { ErrorState } from "@/components/states/ErrorState";

/** 라우트가 없을 때 Next가 렌더하는 화면. Figma ERROR_404와 같은 구성. */
export default function NotFound() {
  return (
    <div className="offline-shell">
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

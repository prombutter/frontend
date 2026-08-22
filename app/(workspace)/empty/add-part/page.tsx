import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui";

/** empty_C — 프롬프트 편집 중 "파츠 추가" 패널을 열었는데 담을 파츠가 없는 상태 */
export default function EmptyAddPartPage() {
  return (
    <>
      <PageHeader title="New Prompts" desc="파츠 추가 패널 — 담을 파츠가 없는 상태" />

      <div className="panel-dim">
        <div className="side-panel" role="dialog" aria-modal="true">
          <div className="side-panel__header">
            <h2>파츠 추가</h2>
            <Link href="/prompts/new" aria-label="닫기">
              <Image src="/assets/icon-x.svg" alt="" width={20} height={20} />
            </Link>
          </div>
          <div className="side-panel__divider" />
          <div className="side-panel__search-wrap">
            <div className="side-panel__search">파츠 제목, 내용, 태그로 검색</div>
          </div>
          <div className="side-panel__empty">
            <div className="slot-illust">
              <span className="slot-illust__slot" />
              <span className="slot-illust__slot" />
            </div>
            <h3>아직 담을 파츠가 없어요</h3>
            <p>파츠를 먼저 하나 만들면, 여기에서 골라 담을 수 있어요.</p>
            <Link className="btn btn--primary btn--pill btn--icon" href="/parts/new">
              <Image src="/assets/icon-plus.svg" alt="" width={24} height={24} />
              <span>새 파츠 만들기</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { PageHeader, SearchBar } from "@/components/ui";

/** empty_B2 — 파츠도 프롬프트도 없는 상태 */
export default function EmptyPromptsNoPartsPage() {
  return (
    <>
      <PageHeader title="Prompts" desc="0 prompts in your workspace" />
      <div className="page-body">
        <div className="page-body__inner">
          <SearchBar placeholder="프롬프트 제목, 파츠를 검색해주세요" />
          <div className="empty-wrap">
            <div className="empty-state">
              <div className="slot-illust">
                <span className="slot-illust__slot" />
                <span className="slot-illust__slot" />
              </div>
              <h2>먼저 재료부터 만들어요</h2>
              <p>
                프롬프트는 저장한 파츠를 합쳐서 만들어요.
                <br />
                파츠를 먼저 하나 만들어 볼까요?
              </p>
              <Link className="btn btn--primary btn--pill btn--icon" href="/parts/new">
                <Image src="/assets/icon-plus.svg" alt="" width={24} height={24} />
                <span>파츠 만들러 가기</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

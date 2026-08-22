import Image from "next/image";
import Link from "next/link";
import { PageHeader, SearchBar } from "@/components/ui";

/** empty_A — 파츠가 하나도 없는 목록 */
export default function EmptyPartsPage() {
  return (
    <>
      <PageHeader title="Parts" desc="0 parts in your workspace" />
      <div className="page-body">
        <div className="page-body__inner">
          <SearchBar placeholder="프롬프트 제목, 파츠를 검색해주세요" />
          <div className="empty-wrap">
            <div className="empty-state">
              <div className="slot-illust">
                <span className="slot-illust__slot" />
                <span className="slot-illust__slot" />
              </div>
              <h2>첫 재료를 만들어 볼까요?</h2>
              <p>자주 쓰는 문장을 저장해두면, 필요할 때 꺼내 쓸 수 있어요.</p>
              <Link className="btn btn--primary btn--pill btn--icon" href="/parts/new">
                <Image src="/assets/icon-plus.svg" alt="" width={24} height={24} />
                <span>첫 파츠 만들기</span>
              </Link>
              <Link className="empty-state__link" href="/prompts">
                샘플 먼저 둘러보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

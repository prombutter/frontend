import Image from "next/image";
import { ListHeader, PageHeader, SearchBar } from "@/components/ui";

/** empty_E — 검색 결과 없음 */
export default function EmptySearchPage() {
  return (
    <>
      <PageHeader title="Prompts" desc="검색 결과가 없는 상태" />
      <div className="page-body">
        <div className="page-body__inner">
          <SearchBar placeholder="회의록 요약" />
          <section className="section">
            <ListHeader sortLabel="최근 생성순" />
            <div className="empty-wrap">
              <div className="empty-state empty-state--tight">
                <Image
                  className="empty-state__icon"
                  src="/assets/icon-search-lg.svg"
                  alt=""
                  width={48}
                  height={48}
                />
                <h2>찾는 결과가 없어요</h2>
                <p>다른 검색어나 태그로 다시 찾아볼까요?</p>
                <button className="btn btn--outline btn--pill" type="button">
                  필터 초기화
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

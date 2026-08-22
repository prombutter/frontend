import Image from "next/image";
import { ListHeader, PageHeader, SearchBar } from "@/components/ui";

const LINE_WIDTHS = [440, 380, 140];
const CHIP_WIDTHS = [58, 44, 66];

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__line skeleton-card__line--title" />
      {LINE_WIDTHS.map((w) => (
        <div key={w} className="skeleton-card__line" style={{ width: w, maxWidth: "100%" }} />
      ))}
      <div className="skeleton-card__chips">
        {CHIP_WIDTHS.map((w) => (
          <span key={w} className="skeleton-card__chip" style={{ width: w }} />
        ))}
      </div>
    </div>
  );
}

/** 목록 로딩 상태 — 상단 진행바 + 스켈레톤 카드 + 무한 스크롤 스피너 */
export default function LoadingStatesPage() {
  return (
    <>
      <div className="page-progress" />
      <PageHeader title="Loading" desc="스켈레톤 · 진행바 · 버튼 로딩 상태" />

      <div className="page-body">
        <div className="page-body__inner">
          <SearchBar placeholder="프롬프트 제목, 파츠를 검색해주세요" />

          <section className="section">
            <ListHeader sortLabel="최근 생성순" />

            <div className="card-rows">
              <div className="card-row">
                <SkeletonCard />
                <SkeletonCard />
              </div>
              <div className="card-row">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>

            <div className="loading-inline">
              <Image className="spinner" src="/assets/spinner.svg" alt="" width={20} height={20} />
              <span>불러오는 중</span>
            </div>

            <button className="btn btn--primary btn--loading" type="button" disabled>
              <Image className="spinner" src="/assets/spinner.svg" alt="" width={16} height={16} />
              <span>저장 중</span>
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

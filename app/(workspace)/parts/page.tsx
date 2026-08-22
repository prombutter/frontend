import Image from "next/image";
import Link from "next/link";
import { PartCard } from "@/components/cards";
import { ListHeader, PageHeader, SearchBar } from "@/components/ui";

export default function PartsPage() {
  return (
    <>
      <PageHeader
        title="Parts"
        desc="8 parts in your workspace"
        actions={
          <Link className="btn btn--primary btn--new btn--icon" href="/parts/new">
            <Image src="/assets/icon-plus.svg" alt="" width={24} height={24} />
            <span>New Part</span>
          </Link>
        }
      />

      <div className="page-body">
        <div className="page-body__inner">
          <SearchBar placeholder="프롬프트 제목, 파츠를 검색해주세요" />

          <section className="section">
            <ListHeader sortLabel="최근 생성순" />

            <div className="card-rows">
              <div className="card-row">
                <PartCard />
                <PartCard />
              </div>
              <div className="card-row">
                <PartCard />
                <PartCard />
              </div>
              <div className="card-row">
                <PartCard />
                {/* 홀수 개일 때 마지막 칸을 비워 폭을 유지한다 */}
                <div className="part-card" style={{ visibility: "hidden" }} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

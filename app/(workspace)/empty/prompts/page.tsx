import Image from "next/image";
import Link from "next/link";
import { PageHeader, SearchBar } from "@/components/ui";

/** empty_B1 — 파츠는 있지만 프롬프트가 없는 목록 */
export default function EmptyPromptsPage() {
  return (
    <>
      <PageHeader title="Prompts" desc="0 prompts in your workspace" />
      <div className="page-body">
        <div className="page-body__inner">
          <SearchBar placeholder="프롬프트 제목, 파츠를 검색해주세요" />
          <div className="empty-wrap">
            <div className="empty-state">
              <div className="merge-illust">
                <div className="merge-illust__parts">
                  <span className="merge-illust__part" />
                  <span className="merge-illust__part" />
                  <span className="merge-illust__part" />
                </div>
                <span className="merge-illust__arrow">↓</span>
                <span className="merge-illust__target" />
              </div>
              <h2>재료를 합쳐 프롬프트를 만들어요</h2>
              <p>저장한 파츠를 골라 담으면, 바로 쓸 수 있는 프롬프트가 완성돼요.</p>
              <Link className="btn btn--primary btn--pill btn--icon" href="/prompts/new">
                <Image src="/assets/icon-plus.svg" alt="" width={24} height={24} />
                <span>프롬프트 만들기</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

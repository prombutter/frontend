import Image from "next/image";
import Link from "next/link";
import { PromptCard } from "@/components/cards";
import { ListHeader, PageHeader, SearchBar } from "@/components/ui";
import { PROMPT_CARDS } from "@/lib/mock-data";

export default function PromptsPage() {
  return (
    <>
      <PageHeader
        title="Prompts"
        desc="3 prompts in your workspace · 8 sample prompts available"
        actions={
          <Link className="btn btn--primary btn--new btn--icon" href="/prompts/new">
            <Image src="/assets/icon-plus.svg" alt="" width={24} height={24} />
            <span>New Prompt</span>
          </Link>
        }
      />

      <div className="page-body">
        <div className="page-body__inner">
          <SearchBar placeholder="Search parts by title, content, or tags..." />

          <section className="section">
            <ListHeader sortLabel="최근 생성순" />
            <div className="prompt-grid">
              {PROMPT_CARDS.map((card, i) => (
                <PromptCard key={i} {...card} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

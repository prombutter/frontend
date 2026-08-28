"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { PartCard } from "@/components/cards";
import { ListHeader, PageHeader, SearchBar } from "@/components/ui";
import { useParts } from "@/hooks/useParts";
import { useDebounce } from "@/hooks/useDebounce";
import { Part } from "@/types/api";

export default function PartsPage() {
  const router = useRouter();
  const { parts, isLoading, toggleFavorite } = useParts(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      const matchSearch =
        part.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        part.body.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchTag = activeTag ? part.tags.includes(activeTag) : true;
      return matchSearch && matchTag;
    });
  }, [parts, debouncedSearch, activeTag]);

  // 그리드 배치를 위해 2개씩 묶기
  const rows = [];
  for (let i = 0; i < filteredParts.length; i += 2) {
    rows.push(filteredParts.slice(i, i + 2));
  }

  return (
    <>
      <PageHeader
        title="Parts"
        desc={`${parts.length} parts in your workspace`}
        actions={
          <Link className="btn btn--primary btn--new btn--icon" href="/parts/new">
            <Image src="/assets/icon-plus.svg" alt="" width={24} height={24} />
            <span>New Part</span>
          </Link>
        }
      />

      <div className="page-body">
        <div className="page-body__inner">
          <SearchBar
            placeholder="파츠 제목, 내용을 검색해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <section className="section">
            <ListHeader sortLabel="최근 생성순" />

            {isLoading ? (
              <div style={{ padding: 40, textAlign: "center", color: "#666" }}>Loading...</div>
            ) : filteredParts.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "#666" }}>
                등록된 파츠가 없습니다.
              </div>
            ) : (
              <div className="card-rows">
                {rows.map((row, rIdx) => (
                  <div className="card-row" key={rIdx}>
                    {row.map((part) => (
                      <PartCard
                        key={part.id}
                        part={part}
                        activeTag={activeTag}
                        onTagClick={(tag) =>
                          setActiveTag(activeTag === tag ? null : tag)
                        }
                        onFavoriteToggle={toggleFavorite}
                        onClick={(id) => router.push(`/parts/${id}`)}
                      />
                    ))}
                    {row.length === 1 && (
                      <div className="part-card" style={{ visibility: "hidden" }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

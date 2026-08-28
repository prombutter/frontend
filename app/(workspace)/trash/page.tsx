"use client";

import Image from "next/image";
import { PartCard } from "@/components/cards";
import ExtensionBanner from "@/components/layout/ExtensionBanner";
import { PageHeader } from "@/components/ui";
import { useParts } from "@/hooks/useParts";

export default function TrashPage() {
  const { parts, isLoading, restore, permanentDelete } = useParts(true);

  const handleRestore = (id: string) => {
    restore(id);
  };

  const handlePermanentDelete = (id: string) => {
    if (window.confirm("이 파츠를 영구 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      permanentDelete(id);
    }
  };

  return (
    <>
      <PageHeader title="Trash" desc="30일 이후 영구 삭제 됩니다." />

      <ExtensionBanner
        wrapClassName="trash-banner-wrap"
        icon="/assets/icon-alert-circle.svg"
        message="Deleted items are permanently removed after 30 days. Restore anything you want to keep."
        action=""
      />

      <div className="trash-sections">
        <section className="trash-section">
          <div className="trash-section__header">
            <h2 className="t-h2">Parts</h2>
            <span className="t-h2 trash-section__count">({parts.length})</span>
          </div>

          {isLoading ? (
            <div className="trash-empty">Loading...</div>
          ) : parts.length === 0 ? (
            <div className="trash-empty">삭제된 파츠가 없습니다.</div>
          ) : (
            parts.map((part) => (
              <div className="trash-card-wrap" key={part.id}>
                {/* 
                  삭제된 날짜 포맷팅 (임시로 deleted_at 만 사용) 
                  실제 서비스에서는 YYYY.MM.DD 등으로 변환 
                */}
                <PartCard 
                  part={part} 
                  deletedAt={part.deleted_at?.split('T')[0].replace(/-/g, '.')} 
                />

                <div className="trash-card-actions">
                  <button
                    className="btn btn--outline-muted"
                    type="button"
                    onClick={() => handleRestore(part.id)}
                  >
                    <Image src="/assets/icon-return.svg" alt="" width={16} height={16} />
                    <span>복원하기</span>
                  </button>
                  <button
                    className="btn btn--outline-danger"
                    type="button"
                    onClick={() => handlePermanentDelete(part.id)}
                  >
                    <Image src="/assets/icon-trash-mini.svg" alt="" width={16} height={16} />
                    <span>영구 삭제</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* 프롬프트 연동은 아직 대상 범위가 아니므로 0으로 유지 (하드코딩) */}
        <section className="trash-section">
          <div className="trash-section__header">
            <h2 className="t-h2">Prompts</h2>
            <span className="t-h2 trash-section__count">(0)</span>
          </div>
          <div className="trash-empty">삭제된 프롬프트가 없습니다.</div>
        </section>
      </div>
    </>
  );
}

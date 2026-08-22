import Image from "next/image";
import { PartCard } from "@/components/cards";
import ExtensionBanner from "@/components/layout/ExtensionBanner";
import { PageHeader } from "@/components/ui";

export default function TrashPage() {
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
            <span className="t-h2 trash-section__count">(1)</span>
          </div>

          <div className="trash-card-wrap">
            <PartCard deletedAt="2026.06.27" />

            <div className="trash-card-actions">
              <button className="btn btn--outline-muted" type="button">
                <Image src="/assets/icon-return.svg" alt="" width={16} height={16} />
                <span>복원하기</span>
              </button>
              <button className="btn btn--outline-danger" type="button">
                <Image src="/assets/icon-trash-mini.svg" alt="" width={16} height={16} />
                <span>영구 삭제</span>
              </button>
            </div>
          </div>
        </section>

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

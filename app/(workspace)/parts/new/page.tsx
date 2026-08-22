import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui";

export default function NewPartPage() {
  return (
    <>
      <PageHeader title="New Parts" desc="새로운 파츠를 생성합니다" />

      <div className="editor-body">
        <div className="editor-inner">
          <div className="title-row">
            <div className="title-input">
              <Image src="/assets/icon-star.svg" alt="" width={24} height={24} />
              <input type="text" maxLength={100} placeholder="파츠 제목을 입력하세요" />
              <span className="title-input__count">0/100</span>
            </div>
            <div className="editor-actions">
              <Link className="btn btn--tall btn--outline-muted" href="/parts">
                <Image src="/assets/icon-exit.svg" alt="" width={24} height={24} />
                <span>취소</span>
              </Link>
              <button className="btn btn--tall btn--primary" type="button">
                <Image src="/assets/icon-save.png" alt="" width={24} height={24} />
                <span>저장</span>
              </button>
            </div>
          </div>

          <div className="preview-panel">
            <div className="preview-head">
              <div className="preview-head__bar">파츠 미리보기</div>
              <div className="preview-empty">아직 등록된 파츠가 없습니다.</div>
            </div>
            <div className="preview-actions">
              <button className="btn btn--secondary" type="button">
                <Image src="/assets/icon-plus-sm.svg" alt="" width={16} height={16} />
                <span>변수 생성</span>
              </button>
              <button className="btn btn--secondary" type="button">
                <Image src="/assets/icon-plus-sm.svg" alt="" width={16} height={16} />
                <span>텍스트 생성</span>
              </button>
            </div>
          </div>

          <div className="dashed-section">
            <div className="dashed-section__head">
              <p className="dashed-section__title">태그</p>
              <p className="dashed-section__count">0 / 10</p>
            </div>
            <button className="btn btn--secondary btn--fixed-198" type="button">
              <Image src="/assets/icon-plus-sm.svg" alt="" width={16} height={16} />
              <span>태그 생성</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui";

export default function NewPromptPage() {
  return (
    <>
      <PageHeader title="New Prompts" desc="새로운 프롬프트를 생성합니다" />

      <div className="editor-body">
        <div className="editor-inner">
          <div className="title-row">
            <div className="title-input">
              <Image src="/assets/icon-star.svg" alt="" width={24} height={24} />
              <input type="text" maxLength={100} placeholder="프롬프트 제목을 입력하세요" />
              <span className="title-input__count">0/100</span>
            </div>
            <div className="editor-actions">
              <Link className="btn btn--tall btn--outline-muted" href="/prompts">
                <Image src="/assets/icon-exit.svg" alt="" width={24} height={24} />
                <span>취소</span>
              </Link>
              <button className="btn btn--tall btn--secondary" type="button">
                <Image
                  className="icon-copy"
                  src="/assets/icon-copy.png"
                  alt=""
                  width={24}
                  height={24}
                />
                <span>복사</span>
              </button>
              <button className="btn btn--tall btn--primary" type="button">
                <Image src="/assets/icon-save.png" alt="" width={24} height={24} />
                <span>저장</span>
              </button>
            </div>
          </div>

          <div className="preview-head">
            <div className="preview-head__bar">
              <span>프롬프트 미리보기</span>
              <span className="preview-head__meta">Bold yellow = value entered · chip = empty</span>
            </div>
            <div className="preview-empty">
              블럭을 추가하면 완성된 프롬프트를 미리 볼 수 있습니다.
            </div>
          </div>

          <div className="panel-row">
            <div className="panel-col">
              <div className="preview-head">
                <div className="preview-head__bar">
                  <span>블럭 리스트</span>
                  <span className="preview-head__meta">0 / 10</span>
                </div>
                <div className="preview-empty">
                  아직 등록된 블럭이 없습니다. 파츠 또는 텍스트를 입력해주세요.
                </div>
              </div>
              <div className="preview-actions">
                <button className="btn btn--secondary" type="button">
                  <Image src="/assets/icon-plus-sm.svg" alt="" width={16} height={16} />
                  <span>파츠 생성</span>
                </button>
                <button className="btn btn--secondary" type="button">
                  <Image src="/assets/icon-plus-sm.svg" alt="" width={16} height={16} />
                  <span>텍스트 생성</span>
                </button>
              </div>
            </div>

            <div className="panel-col">
              <div className="preview-head">
                <div className="preview-head__bar">
                  <span>변수 정의</span>
                </div>
                <div className="preview-empty preview-empty--inline">
                  <span>파츠를 추가할 때</span>
                  <span className="var-chip">{"{{variables}}"}</span>
                  <span>를 정의할 수 있습니다.</span>
                </div>
              </div>
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

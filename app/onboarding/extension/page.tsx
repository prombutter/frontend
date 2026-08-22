import Image from "next/image";
import Link from "next/link";

/** 확장 프로그램 설치 안내 (ONB-EXT) */
export default function OnboardingExtensionPage() {
  return (
    <div className="onb-done-shell">
      <div className="ext-illust">
        <Image
          className="ext-illust__bar"
          src="/assets/browser-bar.svg"
          alt=""
          width={560}
          height={34}
        />
        <div className="ext-illust__page">
          <div className="ext-illust__input">
            <span className="sk-line" style={{ width: 300 }} />
            <span className="sk-line" style={{ width: 220 }} />
          </div>
          <span className="ext-illust__arrow">→</span>
          <div className="ext-illust__widget">
            <div className="ext-illust__widget-head">Prombutter</div>
            <div className="ext-illust__favs">
              <span className="ext-illust__fav" />
              <span className="ext-illust__fav" />
              <span className="ext-illust__fav" />
              <span className="ext-illust__fav" />
            </div>
          </div>
        </div>
      </div>

      <div className="onb-done__title">
        <h1 className="is-two-line">
          브라우저 확장 프로그램을 설치하면
          <br />
          LLM 입력창에 바로 주입할 수 있어요
        </h1>
        <p>즐겨찾기한 프롬프트를 ChatGPT · Claude 입력창에 한 번에 넣어줘요.</p>
      </div>

      <div className="onb-done__actions">
        <button className="btn btn--primary btn--block" type="button">
          설치하기
        </button>
        <Link className="onb-done__later" href="/dashboard">
          나중에
        </Link>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  /** 배너 문구. 기본값은 확장프로그램 설치 안내. */
  message?: string;
  icon?: string;
  /** 우측 버튼 라벨. 없으면 버튼을 숨긴다(Trash 화면). */
  action?: string;
  wrapClassName?: string;
};

export default function ExtensionBanner({
  message = "Get more out of Prombutter — inject prompts directly into ChatGPT & Claude",
  icon = "/assets/icon-point.png",
  action = "Install Chrome Extension",
  wrapClassName = "banner-wrap",
}: Props) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className={wrapClassName}>
      <div className="banner">
        <div className="banner__message">
          <Image src={icon} alt="" width={24} height={23} />
          <p>{message}</p>
        </div>
        {action && (
          <button className="btn btn--primary" type="button">
            {action}
          </button>
        )}
        <button
          className="banner__close"
          type="button"
          aria-label="닫기"
          onClick={() => setVisible(false)}
        >
          <Image src="/assets/icon-x.svg" alt="" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

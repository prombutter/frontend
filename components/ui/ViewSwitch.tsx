"use client";

import Image from "next/image";
import { useState } from "react";

/** 그리드 / 리스트 보기 전환. 표시 상태만 바꾸는 UI 시안용 토글. */
export default function ViewSwitch() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="switch">
      <button
        type="button"
        aria-label="그리드 보기"
        aria-pressed={view === "grid"}
        className={view === "grid" ? "is-on" : ""}
        onClick={() => setView("grid")}
      >
        <Image src="/assets/icon-grid.svg" alt="" width={24} height={24} />
      </button>
      <button
        type="button"
        aria-label="리스트 보기"
        aria-pressed={view === "list"}
        className={view === "list" ? "is-on" : ""}
        onClick={() => setView("list")}
      >
        <Image src="/assets/icon-list.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
}

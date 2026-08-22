import Image from "next/image";
import ViewSwitch from "./ViewSwitch";

/** 목록 위의 정렬 라벨 + 그리드/리스트 전환 줄. */
export function ListHeader({ sortLabel }: { sortLabel: string }) {
  return (
    <div className="list-header">
      <button className="sort-control" type="button">
        <span className="t-h2">{sortLabel}</span>
        <Image src="/assets/icon-arrow-down.svg" alt="" width={28} height={28} />
      </button>
      <ViewSwitch />
    </div>
  );
}

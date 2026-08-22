import Image from "next/image";
import { CodeBlock, TagRow } from "@/components/ui";
import { CARD_TITLE, PART_LINES, PART_TAGS } from "@/lib/mock-data";

/**
 * 파츠 카드. Parts 목록과 Trash 양쪽에서 쓴다.
 * deletedAt이 있으면 제목 우측에 삭제일시가 붙고 태그 줄의 "+3"은 감춘다
 * (Trash에서는 카드 우하단에 복원/삭제 버튼이 겹치기 때문).
 */
export function PartCard({ deletedAt }: { deletedAt?: string }) {
  return (
    <article className="part-card">
      <div className="part-card__title">
        <Image src="/assets/icon-star.svg" alt="" width={24} height={24} />
        <p>{CARD_TITLE}</p>
        {deletedAt && <span className="part-card__date">삭제일시 {deletedAt}</span>}
      </div>
      <CodeBlock lines={PART_LINES} />
      <TagRow tags={PART_TAGS} more={deletedAt ? undefined : "+3"} />
    </article>
  );
}

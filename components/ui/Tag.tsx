import type { TagTone } from "@/types";

/** 태그 뱃지 하나. */
export function Tag({ tone = "blue", children }: { tone?: TagTone; children: React.ReactNode }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}

/** 카드 하단의 태그 줄. more에는 넘친 개수("+3")를 넘긴다. */
export function TagRow({ tags, more }: { tags: TagTone[]; more?: string }) {
  return (
    <div className="part-card__info">
      <div className="badges">
        {tags.map((tone, i) => (
          <Tag key={i} tone={tone}>
            #Coding
          </Tag>
        ))}
      </div>
      {more && <span className="part-card__more">{more}</span>}
    </div>
  );
}

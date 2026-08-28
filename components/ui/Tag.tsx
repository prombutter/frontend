"use client";

import type { TagTone } from "@/types";

function getTone(text: string): TagTone {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash % 2 === 0 ? "blue" : "orange";
}

/** 태그 뱃지 하나. */
export function Tag({
  tag,
  isActive,
  onClick,
}: {
  tag: string;
  isActive?: boolean;
  onClick?: (tag: string) => void;
}) {
  const tone = getTone(tag);
  return (
    <span
      className={`tag tag--${tone} ${isActive ? "is-active" : ""}`}
      style={{ cursor: onClick ? "pointer" : "default", opacity: isActive === false ? 0.5 : 1 }}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          e.stopPropagation();
          onClick(tag);
        }
      }}
    >
      #{tag}
    </span>
  );
}

/** 카드 하단의 태그 줄. more에는 넘친 개수("+3")를 넘긴다. */
export function TagRow({
  tags,
  more,
  onTagClick,
  activeTag,
}: {
  tags: string[];
  more?: string;
  onTagClick?: (tag: string) => void;
  activeTag?: string | null;
}) {
  return (
    <div className="part-card__info">
      <div className="badges">
        {tags.map((tag, i) => (
          <Tag
            key={i}
            tag={tag}
            isActive={activeTag === tag || !activeTag}
            onClick={onTagClick}
          />
        ))}
      </div>
      {more && <span className="part-card__more">{more}</span>}
    </div>
  );
}

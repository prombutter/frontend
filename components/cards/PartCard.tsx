import Image from "next/image";
import { CodeBlock, TagRow } from "@/components/ui";
import { CARD_TITLE, PART_LINES, PART_TAGS } from "@/lib/mock-data";

import { Part } from "@/types/api";

export function PartCard({
  part,
  deletedAt,
  onFavoriteToggle,
  onTagClick,
  activeTag,
  onClick,
}: {
  part: Part;
  deletedAt?: string;
  onFavoriteToggle?: (id: string) => void;
  onTagClick?: (tag: string) => void;
  activeTag?: string | null;
  onClick?: (id: string) => void;
}) {
  const displayTags = part.tags.slice(0, 3);
  const moreCount = part.tags.length > 3 ? `+${part.tags.length - 3}` : undefined;

  // CodeBlock lines mapping (mocking simple lines for now since we just have a body string)
  const lines = part.body.split('\n').slice(0, 5).map(text => ({ text }));

  return (
    <article className="part-card" onClick={() => onClick && onClick(part.id)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="part-card__title">
        <Image 
          src={part.is_favorite ? "/assets/icon-star-active.svg" : "/assets/icon-star.svg"} 
          alt="Favorite" 
          width={24} 
          height={24} 
          onClick={(e) => {
            if (onFavoriteToggle) {
              e.stopPropagation();
              onFavoriteToggle(part.id);
            }
          }}
          style={{ cursor: onFavoriteToggle ? 'pointer' : 'default' }}
        />
        <p>{part.title}</p>
        {deletedAt && <span className="part-card__date">삭제일시 {deletedAt}</span>}
      </div>
      <CodeBlock lines={lines} />
      <TagRow tags={displayTags} more={deletedAt ? undefined : moreCount} onTagClick={onTagClick} activeTag={activeTag} />
    </article>
  );
}

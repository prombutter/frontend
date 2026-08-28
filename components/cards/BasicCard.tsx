import { Tag } from "@/components/ui";
import { CARD_TITLE, SHORT_TAGS } from "@/lib/mock-data";

/** Dashboard의 기본 카드. fixed는 Quick Start 줄의 325×200 고정 크기. */
export function BasicCard({ fixed = false }: { fixed?: boolean }) {
  return (
    <article className={`card${fixed ? " card--fixed" : ""}`}>
      <p className="card__title">{CARD_TITLE}</p>
      <div className="card__info">
        <div className="badges">
          {SHORT_TAGS.map((_, i) => (
            <Tag key={i} tag="Coding" />
          ))}
        </div>
        <p className="card__meta">8 weeks ago</p>
      </div>
    </article>
  );
}

import Image from "next/image";
import { CodeBlock, TagRow } from "@/components/ui";
import { CARD_TITLE, PROMPT_LINES, PROMPT_TAGS } from "@/lib/mock-data";
import type { PromptCardState } from "@/types";

/** 프롬프트 카드. Sample 리본은 카드 우상단에 걸쳐 나온다. */
export function PromptCard({ sample, starred }: PromptCardState) {
  return (
    <article className="prompt-card">
      {sample && (
        <div className="ribbon">
          Sample
          <Image src="/assets/ribbon-fold.svg" alt="" width={8} height={7} />
        </div>
      )}
      <div className="prompt-card__head">
        <div className="prompt-card__title">
          <Image
            src={starred ? "/assets/icon-star-active.svg" : "/assets/icon-star.svg"}
            alt=""
            width={24}
            height={24}
          />
          <p>{CARD_TITLE}</p>
        </div>
        <p className="prompt-card__category">Category</p>
      </div>
      <div className="prompt-card__foot">
        <CodeBlock lines={PROMPT_LINES} />
        <TagRow tags={PROMPT_TAGS} more="+3" />
      </div>
    </article>
  );
}

import type { CodeLine } from "@/types";

/** 카드 안의 코드 미리보기. 좌측 51px 거터에 줄번호가 붙는다. */
export function CodeBlock({ lines }: { lines: CodeLine[] }) {
  return (
    <div className="codeblock">
      {lines.map((line, i) => (
        <div className="codeblock__line" key={i}>
          <span className="codeblock__no">{i + 1}</span>
          {line.kind && (
            <span className={`codeblock__chip codeblock__chip--${line.kind}`}>
              {line.kind.toUpperCase()}
            </span>
          )}
          <span className="codeblock__text">{line.text}</span>
        </div>
      ))}
    </div>
  );
}

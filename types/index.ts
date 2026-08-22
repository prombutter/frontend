/** 태그 뱃지 색 계열. Figma의 tag/blue, tag/orange. */
export type TagTone = "blue" | "orange";

/** 카드 안 코드 미리보기의 한 줄. */
export type CodeLine = {
  /** 프롬프트 카드에만 붙는 라인 종류 칩. p = 파츠, t = 텍스트 */
  kind?: "p" | "t";
  text: string;
};

/** 프롬프트 카드의 표시 상태. */
export type PromptCardState = {
  /** 우상단 Sample 리본 노출 여부 */
  sample: boolean;
  /** 즐겨찾기(별) 채움 여부 */
  starred: boolean;
};

/** 도넛 차트 범례 한 항목. */
export type LegendItem = {
  dot: string;
  value: string;
  label: string;
};

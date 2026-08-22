/**
 * Figma 시안의 더미 값. API 연동 전까지 화면 확인용으로만 쓴다.
 * 실제 데이터가 붙으면 이 파일은 통째로 걷어낸다.
 */
import type { CodeLine, LegendItem, PromptCardState, TagTone } from "@/types";

export const CARD_TITLE =
  "title text title text title text title text title text title text title text text title text title text";

/** 파츠 카드의 코드 미리보기 (라인 종류 칩 없음) */
export const PART_LINES: CodeLine[] = Array.from({ length: 5 }, () => ({
  text: "Analyze this error and provide a fix.",
}));

/** 프롬프트 카드의 코드 미리보기 (파츠/텍스트 칩 포함) */
export const PROMPT_LINES: CodeLine[] = [
  { kind: "p", text: "Analyze this error and provide a fix." },
  { kind: "t", text: "Analyze this error and provide a fix." },
  { kind: "p", text: "Analyze this error and provide a fix." },
  { kind: "t", text: "Analyze this error and provide a fix." },
  { kind: "t", text: "Analyze this error and provide a fix." },
];

export const SHORT_TAGS: TagTone[] = ["blue", "orange"];
export const PROMPT_TAGS: TagTone[] = ["blue", "orange", "orange", "orange"];
export const PART_TAGS: TagTone[] = [
  "blue",
  "orange",
  "orange",
  "orange",
  "orange",
  "orange",
  "orange",
];

/** 프롬프트 목록 9칸의 Sample·즐겨찾기 배치 (Figma 시안 그대로) */
export const PROMPT_CARDS: PromptCardState[] = [
  { sample: true, starred: false },
  { sample: false, starred: true },
  { sample: true, starred: false },
  { sample: false, starred: false },
  { sample: false, starred: true },
  { sample: true, starred: false },
  { sample: true, starred: false },
  { sample: true, starred: true },
  { sample: true, starred: false },
];

export const CHART_LEGEND: LegendItem[] = [
  {
    dot: "/assets/legend-dot-1.svg",
    value: "8회",
    label: "React Feature Build React Feature Build",
  },
  { dot: "/assets/legend-dot-2.svg", value: "10회", label: "React Feature Build" },
  { dot: "/assets/legend-dot-3.svg", value: "12회", label: "React Feature Build" },
];

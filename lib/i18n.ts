import ko from "@/locales/ko.json";
import en from "@/locales/en.json";

export type MessageKey = keyof typeof ko;
export function translate(key: MessageKey, locale = "ko"): string {
  return (locale.startsWith("en") ? en : ko)[key];
}

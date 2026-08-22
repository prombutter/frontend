/** 조건부 클래스 병합용 최소 헬퍼. 외부 의존성 없이 falsy 값만 걸러낸다. */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

import { Toast } from "@/components/states/Toast";
import { PageHeader } from "@/components/ui";

const RULES = [
  "화면 하단 중앙 고정 · 최대 3개 동시 노출",
  "성공·정보 3초 후 자동 닫힘",
  "에러(재시도 없음) 5초 후 자동 닫힘",
  "에러(재시도 버튼) 버튼 클릭 전까지 유지",
  "동일 메시지 300ms 내 재발행 시 중복 표시 안 함",
  "z-index 최상위 (Modal보다 위)",
];

/** 토스트 3종과 표시 규칙을 한 화면에 모아둔 시안 페이지. */
export default function ToastStatesPage() {
  return (
    <>
      <PageHeader title="Toast" desc="토스트 표시 규칙과 3종 미리보기" />

      <div className="state-center">
        <div className="rules-card">
          <p className="rules-card__title">Toast 표시 규칙 (FS-201 §8.3)</p>
          <ul>
            {RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="toast-stack">
        <Toast tone="success">파츠가 복구되었습니다.</Toast>
        <Toast tone="info">복사됨 ✓</Toast>
        <Toast tone="error" action="다시 시도">
          저장에 실패했습니다. 다시 시도해주세요.
        </Toast>
      </div>
    </>
  );
}

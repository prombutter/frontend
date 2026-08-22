import { DangerZone } from "@/components/settings/DangerZone";
import { Field } from "@/components/ui/Field";
import { PageHeader } from "@/components/ui";

/** Google로 가입한 계정의 설정 화면 — 이메일 수정 불가, 비밀번호 카드 없음 */
export default function SettingsGooglePage() {
  return (
    <>
      <PageHeader title="Settings" desc="계정 정보를 관리해요" />

      <div className="page-body">
        <div className="settings-body">
          <div className="settings-card">
            <p className="settings-card__title">프로필 정보</p>
            <Field name="name" label="이름" defaultValue="김민지" />
            <div className="field">
              <span className="field__label">이메일</span>
              <div className="field__control is-readonly">
                <input defaultValue="minji@promptbutter.com" readOnly />
              </div>
              <p className="settings-card__hint">Google 계정 이메일은 변경할 수 없어요.</p>
            </div>
            <div className="settings-card__actions">
              <button className="btn btn--primary btn--pill" type="button">
                저장
              </button>
            </div>
          </div>

          <div className="settings-card">
            <p className="settings-card__title">연결된 계정</p>
            <div className="provider-row">
              <span>Google · minji@promptbutter.com</span>
              <span className="provider-row__status">연결됨</span>
            </div>
          </div>

          <DangerZone />
        </div>
      </div>
    </>
  );
}

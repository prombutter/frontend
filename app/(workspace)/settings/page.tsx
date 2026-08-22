import { DangerZone } from "@/components/settings/DangerZone";
import { Field } from "@/components/ui/Field";
import { PageHeader } from "@/components/ui";

/** 이메일로 가입한 계정의 설정 화면 */
export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" desc="계정 정보를 관리해요" />

      <div className="page-body">
        <div className="settings-body">
          <div className="settings-card">
            <p className="settings-card__title">프로필 정보</p>
            <Field name="name" label="이름" defaultValue="김민지" />
            <Field name="email" type="email" label="이메일" defaultValue="minji@promptbutter.com">
              <p className="settings-card__hint">
                이메일을 바꾸면 새 주소로 인증 메일을 보내요. 인증 전까지는 기존 이메일이 유지돼요.
              </p>
            </Field>
            <div className="settings-card__actions">
              <button className="btn btn--primary btn--pill" type="button">
                저장
              </button>
            </div>
          </div>

          <div className="settings-card">
            <p className="settings-card__title">비밀번호 변경</p>
            <Field
              name="current-password"
              type="password"
              label="현재 비밀번호"
              placeholder="현재 비밀번호 입력"
            />
            <Field
              name="new-password"
              type="password"
              label="새 비밀번호"
              placeholder="8자 이상, 영문·숫자·특수문자 포함"
            />
            <Field
              name="new-password-confirm"
              type="password"
              label="새 비밀번호 확인"
              placeholder="비밀번호 다시 입력"
            />
            <div className="settings-card__actions">
              <button className="btn btn--outline btn--pill" type="button">
                변경
              </button>
            </div>
          </div>

          <DangerZone />
        </div>
      </div>
    </>
  );
}

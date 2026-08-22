"use client";

import { useState } from "react";

/** 계정 탈퇴 위험 구역 + 확인 모달. */
export function DangerZone() {
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <div className="danger-card">
        <div>
          <p className="danger-card__title">위험 구역</p>
          <p className="danger-card__desc">
            탈퇴하면 모든 파츠·프롬프트·워크스페이스 데이터가 즉시 영구 삭제되며 복구할 수 없어요.
          </p>
        </div>
        <div className="settings-card__actions">
          <button
            className="btn btn--danger-outline btn--pill"
            type="button"
            onClick={() => setConfirming(true)}
          >
            계정 탈퇴
          </button>
        </div>
      </div>

      {confirming && (
        <div className="modal-dim" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal__text">
              <h2>정말 탈퇴하시겠습니까?</h2>
              <p>
                탈퇴 시 모든 파츠·프롬프트, 워크스페이스 데이터가
                <br />
                즉시 영구 삭제되며 복구할 수 없습니다.
              </p>
            </div>
            <div className="modal__actions">
              <button
                className="btn btn--outline"
                type="button"
                onClick={() => setConfirming(false)}
              >
                취소
              </button>
              <button className="btn btn--danger-outline" type="button">
                탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * 온보딩 3단계의 일러스트. Figma에서 도형으로 그려진 스켈레톤 목업이라
 * 이미지 대신 좌표를 그대로 옮겼다. 기준 폭은 모달 880px.
 */

function Lines({
  widths,
  left,
  top,
  gap,
  height,
}: {
  widths: number[];
  left: number;
  top: number;
  gap: number;
  height: number;
}) {
  return (
    <div className="sk-lines" style={{ left, top, gap }}>
      {widths.map((w, i) => (
        <span key={i} className="sk-line" style={{ width: w, height, borderRadius: height / 2 }} />
      ))}
    </div>
  );
}

/** 01 — 매번 다시 쓰는 입력창 */
export function IllustEmpathy() {
  return (
    <div className="onb-illust">
      <div className="onb-illust__inner">
        <div className="sk-block" style={{ left: 180, top: 60, width: 520, height: 152 }}>
          <Lines widths={[420, 450, 380, 320]} left={23} top={23} gap={12} height={10} />
        </div>
        <div className="sk-block" style={{ left: 160, top: 76, width: 560, height: 152 }}>
          <Lines widths={[460, 490, 420, 360]} left={23} top={23} gap={12} height={10} />
        </div>
        <div
          className="sk-block sk-block--focus"
          style={{ left: 140, top: 132, width: 600, height: 190 }}
        >
          <Lines widths={[520, 544, 470, 544, 300]} left={26.5} top={28.5} gap={14} height={11} />
          <span className="sk-caret" style={{ left: 332.5, top: 125.5 }} />
          <span className="sk-glyph" style={{ left: 344.5, top: 120.5, fontSize: 20 }}>
            ↻
          </span>
        </div>
      </div>
    </div>
  );
}

/** 02 — 긴 글이 파츠 트레이로 정리되는 모습 */
export function IllustValue() {
  const slots = ["역할", "말투", "요청 내용"];
  return (
    <div className="onb-illust">
      <div className="onb-illust__inner">
        <div className="sk-block" style={{ left: 56, top: 112, width: 230, height: 176 }}>
          <Lines widths={[190, 170, 190, 140, 190, 110]} left={19} top={19} gap={12} height={9} />
        </div>

        <span className="sk-glyph" style={{ left: 316, top: 186, fontSize: 28 }}>
          →
        </span>

        <div
          className="sk-block"
          style={{ left: 396, top: 90, width: 420, height: 220, borderRadius: 16 }}
        >
          <div style={{ position: "absolute", left: 23, top: 25, display: "flex", gap: 16 }}>
            {slots.map((title) => (
              <div className="sk-tray-slot" key={title}>
                <div className="sk-part-card">
                  <p className="sk-part-card__title">{title}</p>
                  <div className="sk-part-card__lines">
                    {[80, 64, 72].map((w) => (
                      <span key={w} className="sk-line" style={{ width: w }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="sk-tray-base"
            style={{ position: "absolute", left: 23, top: 189, width: 372 }}
          />
        </div>
      </div>
    </div>
  );
}

/** 03 — 변수만 채워서 복사, AI 입력창에 붙여넣기 */
export function IllustAction() {
  return (
    <div className="onb-illust">
      <div className="onb-illust__inner">
        <div
          className="sk-block"
          style={{ left: 140, top: 26, width: 600, height: 184, borderRadius: 14 }}
        >
          <div
            style={{
              position: "absolute",
              left: 23,
              top: 25,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="sk-line" style={{ width: 120, height: 9, borderRadius: 4.5 }} />
              <span className="sk-slot">{"{{  }}"}</span>
              <span className="sk-line" style={{ width: 150, height: 9, borderRadius: 4.5 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="sk-line" style={{ width: 200, height: 9, borderRadius: 4.5 }} />
              <span className="sk-line" style={{ width: 90, height: 9, borderRadius: 4.5 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="sk-line" style={{ width: 80, height: 9, borderRadius: 4.5 }} />
              <span className="sk-slot sk-slot--filled">신제품</span>
              <span className="sk-line" style={{ width: 180, height: 9, borderRadius: 4.5 }} />
            </div>
            <span className="sk-line" style={{ width: 320, height: 9, borderRadius: 4.5 }} />
          </div>
          <span className="sk-copy-btn" style={{ position: "absolute", left: 520, top: 131 }}>
            복사
          </span>
        </div>

        <span
          className="sk-glyph"
          style={{ left: 428, top: 220, fontSize: 26, color: "var(--amber-700)" }}
        >
          ↓
        </span>

        <div
          className="sk-block sk-block--focus"
          style={{ left: 200, top: 272, width: 480, height: 104, borderRadius: 12 }}
        >
          <Lines widths={[420, 390, 260]} left={22.5} top={22.5} gap={12} height={9} />
        </div>
      </div>
    </div>
  );
}

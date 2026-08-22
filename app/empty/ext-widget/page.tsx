/** empty_D — 브라우저 확장 위젯에 즐겨찾기가 하나도 없는 상태 */
export default function EmptyExtWidgetPage() {
  return (
    <div className="ext-widget-shell">
      <p className="ext-widget-shell__label">EXT-WIDGET · 즐겨찾기 없음</p>

      <div className="ext-widget">
        <div className="ext-widget__header">
          <span>Prombutter</span>
          <span className="ext-widget__fav">♥ 즐겨찾기 0</span>
        </div>
        <div className="ext-widget__body">
          <h2>자주 쓰는 프롬프트를 여기에 띄워요</h2>
          <p>프롬프트에 ♥를 누르면, 이 바에서 바로 꺼내 쓸 수 있어요.</p>
          <div className="ext-widget__chips">
            <span className="ext-widget__chip" style={{ width: 110 }} />
            <span className="ext-widget__chip" style={{ width: 92 }} />
            <span className="ext-widget__chip" style={{ width: 76 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

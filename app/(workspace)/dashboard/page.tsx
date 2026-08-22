import Image from "next/image";
import Link from "next/link";
import { BasicCard } from "@/components/cards";
import ExtensionBanner from "@/components/layout/ExtensionBanner";
import { PageHeader } from "@/components/ui";
import { CHART_LEGEND } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" desc="Your prompt workspace" />
      <ExtensionBanner />

      <div className="main">
        <section className="section">
          <div className="section__header">
            <h2 className="t-h2 section__title">Quick Start</h2>
            <Link className="section__more" href="/prompts">
              전체보기
            </Link>
          </div>
          <div className="card-grid">
            {Array.from({ length: 4 }, (_, i) => (
              <BasicCard key={i} fixed />
            ))}
          </div>
        </section>

        <div className="section-row">
          <section className="section">
            <div className="section__header">
              <h2 className="t-h2 section__title">최근 사용된 프롬프트</h2>
            </div>
            <div className="card-grid--2">
              {Array.from({ length: 4 }, (_, i) => (
                <BasicCard key={i} />
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section__header">
              <h2 className="t-h2 section__title">자주 사용된 프롬프트</h2>
            </div>
            <div className="chart-panel">
              <p className="chart-panel__title">최근 일주일</p>
              <div className="donut">
                <Image
                  src="/assets/donut.svg"
                  alt="프롬프트 사용 비율 도넛 차트"
                  width={270}
                  height={270}
                />
                <div className="donut__center">TOTAL 30</div>
              </div>
              <div className="legend">
                {CHART_LEGEND.map((item) => (
                  <div className="legend__item" key={item.value}>
                    <Image className="legend__dot" src={item.dot} alt="" width={16} height={16} />
                    <span className="legend__value">{item.value}</span>
                    <span className="legend__label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

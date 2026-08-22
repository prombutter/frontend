"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IllustAction, IllustEmpathy, IllustValue } from "@/components/onboarding/illustrations";

const STEPS = [
  {
    illust: <IllustEmpathy />,
    title: ["매번 똑같은 말,", "다시 쓰고 있지 않나요?"],
    desc: "AI에게 보낼 문장, 기억하기도 찾기도 번거로워요.",
    cta: "다음",
    dots: "/assets/onb-dots-1.svg",
  },
  {
    illust: <IllustValue />,
    title: ["자주 쓰는 내용을", "재료처럼 저장해요"],
    desc: "한 번 만들어두면, 필요할 때 꺼내 쓰기만 하면 돼요.",
    cta: "다음",
    dots: "/assets/onb-dots-2.svg",
  },
  {
    illust: <IllustAction />,
    title: ["빈칸만 바꿔서", "어디서든 붙여넣어요"],
    desc: "상황에 맞게 빈칸만 채우면, 바로 복사해서 쓸 수 있어요.",
    cta: "시작하기",
    dots: "/assets/onb-dots-3.svg",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const next = () => {
    if (isLast) router.push("/signup");
    else setStep((s) => s + 1);
  };

  return (
    <div className="onb-shell">
      <div className="onb-modal">
        {current.illust}

        <div className="onb-copy">
          <h1>
            {current.title[0]}
            <br />
            {current.title[1]}
          </h1>
          <p>{current.desc}</p>
        </div>

        <div className="onb-footer">
          <Image
            className="onb-dots"
            src={current.dots}
            alt={`${step + 1} / ${STEPS.length}`}
            width={40}
            height={8}
          />
          <button className="btn btn--primary btn--pill" type="button" onClick={next}>
            {current.cta}
          </button>
        </div>
      </div>

      {/* 마지막 단계에는 건너뛰기가 없다 (Figma 시안 기준) */}
      {!isLast && (
        <Link className="onb-skip" href="/signup">
          건너뛰기
        </Link>
      )}
    </div>
  );
}

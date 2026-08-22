"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Button,
  ButtonLink,
  Card,
  Chip,
  DangerCard,
  Modal,
  PasswordStrength,
  Spinner,
  TextField,
  Toast,
  ToastStack,
  buttonIconSize,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ds";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "tertiary", "warning"];
const SIZES: { key: ButtonSize; label: string }[] = [
  { key: "sm", label: "sm (Figma 34)" },
  { key: "md", label: "md (Figma 48)" },
  { key: "lg", label: "lg (Figma 56)" },
];

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-[16px]">
      <div>
        <h2 className="font-body text-[20px] font-semibold tracking-[-0.4px] text-neutral-900">
          {title}
        </h2>
        {desc && <p className="font-body text-[14px] text-neutral-600">{desc}</p>}
      </div>
      {children}
    </section>
  );
}

/** PB-43 공통 컴포넌트 카탈로그. Figma 디자인 시스템(PB-62)과 대조하는 용도. */
export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-50 px-[40px] py-[60px]">
      <div className="mx-auto flex max-w-[960px] flex-col gap-[48px]">
        <header className="flex flex-col gap-[8px]">
          <h1 className="font-display text-[32px] tracking-[0.64px] text-neutral-900">
            Design System
          </h1>
          <p className="font-body text-[15px] text-neutral-600">
            PB-43 공통 컴포넌트. Figma 컴포넌트 세트를 Tailwind로 옮긴 것이며, 색·타이포는 전부
            <code className="mx-[4px] rounded bg-neutral-150 px-[6px] py-[2px] text-[13px]">
              styles/tokens.css
            </code>
            의 Figma 변수를 참조합니다.
          </p>
        </header>

        <Section
          title="Button"
          desc="size 3종 × variant 4종 + disabled. 아이콘은 사이즈에 따라 16/24px."
        >
          <Card className="flex flex-col gap-[24px]">
            {SIZES.map(({ key, label }) => (
              <div key={key} className="flex flex-col gap-[10px]">
                <p className="font-body text-[13px] text-neutral-500">{label}</p>
                <div className="flex flex-wrap items-center gap-[10px]">
                  {VARIANTS.map((variant) => (
                    <Button key={variant} variant={variant} size={key}>
                      {variant}
                    </Button>
                  ))}
                  <Button size={key} disabled>
                    disabled
                  </Button>
                  <Button size={key}>
                    <Image
                      src="/assets/icon-plus.svg"
                      alt=""
                      width={buttonIconSize(key)}
                      height={buttonIconSize(key)}
                    />
                    <span>아이콘</span>
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-[10px]">
              <p className="font-body text-[13px] text-neutral-500">
                ButtonLink — 같은 모양으로 이동만
              </p>
              <ButtonLink href="/screens" variant="secondary" size="md">
                화면 목록으로
              </ButtonLink>
            </div>
          </Card>
        </Section>

        <Section title="TextField" desc="라벨 + 입력 + 에러/힌트. 비밀번호는 표시 토글이 붙는다.">
          <Card className="flex flex-col gap-[20px]">
            <TextField name="ds-email" type="email" label="이메일" placeholder="이메일 주소 입력" />
            <TextField
              name="ds-pw"
              type="password"
              label="비밀번호"
              placeholder="8자 이상, 영문·숫자·특수문자 포함"
            >
              <PasswordStrength level={2} />
            </TextField>
            <TextField
              name="ds-error"
              label="에러 상태"
              defaultValue="minji@promptbutter.com"
              error="이미 사용 중인 이메일입니다."
            />
            <TextField
              name="ds-readonly"
              label="읽기 전용"
              defaultValue="minji@promptbutter.com"
              readOnly
              compact
              hint="Google 계정 이메일은 변경할 수 없어요."
            />
          </Card>
        </Section>

        <Section title="Chip" desc="태그 뱃지 3톤.">
          <Card className="flex flex-wrap gap-[8px]">
            <Chip tone="blue">#Coding</Chip>
            <Chip tone="orange">#Writing</Chip>
            <Chip tone="amber">#Sample</Chip>
          </Card>
        </Section>

        <Section title="Card" desc="기본 카드와 위험 구역 카드.">
          <div className="grid grid-cols-2 gap-[16px]">
            <Card className="flex flex-col gap-[8px]">
              <p className="font-body text-[18px] font-semibold tracking-[-0.36px] text-neutral-900">
                기본 카드
              </p>
              <p className="font-body text-[14px] text-neutral-600">
                흰 배경 · 카드 보더 · 라운드 12px
              </p>
            </Card>
            <DangerCard className="flex flex-col gap-[8px]">
              <p className="font-body text-[18px] font-semibold tracking-[-0.36px] text-red-600">
                위험 구역
              </p>
              <p className="font-body text-[13px] text-neutral-700">
                되돌릴 수 없는 작업에만 쓴다.
              </p>
            </DangerCard>
          </div>
        </Section>

        <Section title="Spinner" desc="인라인 로딩과 버튼 로딩.">
          <Card className="flex items-center gap-[24px]">
            <div className="flex items-center gap-[10px]">
              <Spinner />
              <span className="font-body text-[13px] text-neutral-500">불러오는 중</span>
            </div>
            <Button size="md" disabled className="gap-[10px]">
              <Spinner size={16} />
              <span>저장 중</span>
            </Button>
          </Card>
        </Section>

        <Section title="Modal" desc="확인 모달. 스크림 클릭·ESC로 닫힌다.">
          <Card>
            <Button variant="warning" size="md" onClick={() => setModalOpen(true)}>
              탈퇴 확인 모달 열기
            </Button>
          </Card>
        </Section>

        <Section title="Toast" desc="성공 · 정보 · 에러(재시도). 하단 중앙 고정, 최대 3개.">
          <Card>
            <Button variant="secondary" size="md" onClick={() => setToasts((v) => !v)}>
              {toasts ? "토스트 숨기기" : "토스트 보기"}
            </Button>
          </Card>
        </Section>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="정말 탈퇴하시겠습니까?"
        description={
          <>
            탈퇴 시 모든 파츠·프롬프트, 워크스페이스 데이터가
            <br />
            즉시 영구 삭제되며 복구할 수 없습니다.
          </>
        }
        actions={
          <>
            <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
              취소
            </Button>
            <Button variant="warning" size="md">
              탈퇴
            </Button>
          </>
        }
      />

      {toasts && (
        <ToastStack>
          <Toast tone="success">파츠가 복구되었습니다.</Toast>
          <Toast tone="info">복사됨 ✓</Toast>
          <Toast tone="error" action="다시 시도">
            저장에 실패했습니다. 다시 시도해주세요.
          </Toast>
        </ToastStack>
      )}
    </div>
  );
}

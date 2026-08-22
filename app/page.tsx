import { redirect } from "next/navigation";

/** 시안 플로우의 시작점: 온보딩 → 회원가입 → 로그인 → 대시보드 */
export default function Home() {
  redirect("/onboarding");
}

import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 로 빌드하면 out/ 에 정적 HTML을 뽑는다 (`npm run export`).
 * 시안을 서버 없이 열어보기 위한 용도라 이미지 최적화는 끈다.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: {
    // 아이콘·로고가 전부 저장소에 커밋된 자체 SVG라 최적화를 허용한다.
    // 외부 원본을 받지 않으므로 SVG 스크립트 실행 위험은 없다.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: isStaticExport,
  },
};

export default nextConfig;

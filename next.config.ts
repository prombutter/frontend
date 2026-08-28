import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 로 빌드하면 out/ 에 정적 HTML을 뽑는다 (`npm run export`).
 * 시안을 서버 없이 열어보기 위한 용도라 이미지 최적화는 끈다.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: isStaticExport,
  },
  async rewrites() {
    if (isStaticExport) return [];
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;

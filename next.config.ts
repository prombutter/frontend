import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 로 빌드하면 out/ 에 정적 HTML을 뽑는다 (`npm run export`).
 * 시안을 서버 없이 열어보기 위한 용도라 이미지 최적화는 끈다.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const apiOrigin = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!isStaticExport && process.env.NODE_ENV === "production") {
  let validApiOrigin = false;
  try {
    const url = new URL(apiOrigin ?? "");
    validApiOrigin = url.protocol === "https:" && apiOrigin?.replace(/\/$/, "") === url.origin;
  } catch {
    validApiOrigin = false;
  }
  if (!validApiOrigin) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL must be an HTTPS API origin for production.");
  }
}

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: isStaticExport,
  },
  async rewrites() {
    if (isStaticExport || process.env.NODE_ENV === "production") return [];
    return [
      {
        source: "/api/:path*",
        destination: `${apiOrigin?.replace(/\/$/, "") ?? "http://localhost:8000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

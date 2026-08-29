import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://analytics.opendesk-edu.org https://pagead2.googlesyndication.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://analytics.opendesk-edu.org https://pagead2.googlesyndication.com",
  "frame-src 'self' https://googleads.g.doubleclick.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: csp },
];

const cacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=3600, s-maxage=3600, must-revalidate",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  images: { unoptimized: false },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [...securityHeaders, ...cacheHeaders],
      },
    ];
  },
};

const withMDX = createMDX({
  options: { remarkPlugins: [], rehypePlugins: [] },
});

export default withMDX(withNextIntl(nextConfig));

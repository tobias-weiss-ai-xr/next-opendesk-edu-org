import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Serve /ads.txt directly, bypassing i18n [locale] routing that would
  // otherwise treat "ads.txt" as a locale parameter and return 404.
  if (request.nextUrl.pathname === "/ads.txt") {
    return new NextResponse(
      "google.com, pub-8452353139685392, DIRECT, f08c47fec0942fa0",
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
        },
      },
    );
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/", "/ads.txt"],
};

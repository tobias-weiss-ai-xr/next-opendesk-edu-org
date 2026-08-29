import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
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
  return NextResponse.next();
}

export const config = {
  matcher: ["/ads.txt"],
};

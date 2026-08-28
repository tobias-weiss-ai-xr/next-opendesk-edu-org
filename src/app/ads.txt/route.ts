export const dynamic = "force-static";

export async function GET() {
  const content = "google.com, pub-8452353139685392, DIRECT, f08c47fec0942fa0";
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

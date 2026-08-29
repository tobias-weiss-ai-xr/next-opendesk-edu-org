import { describe, expect, it } from "vitest";

describe("ads.txt route", () => {
  it("returns 200 with correct content and content-type", async () => {
    const mod = await import("./route");
    const response = await mod.GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe(
      "text/plain; charset=utf-8",
    );
    const body = await response.text();
    expect(body).toContain("google.com");
    expect(body).toContain("pub-8452353139685392");
    expect(body).toContain("DIRECT");
    expect(body).toContain("f08c47fec0942fa0");
  });

  it("has cache-control header for 24h", async () => {
    const mod = await import("./route");
    const response = await mod.GET();
    expect(response.headers.get("cache-control")).toBe(
      "public, max-age=86400, s-maxage=86400",
    );
  });
});

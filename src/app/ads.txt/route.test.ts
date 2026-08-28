import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("ads.txt route", () => {
  it("returns 200 with correct content", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    const body = await response.text();
    expect(body).toContain("google.com, pub-8452353139685392, DIRECT, f08c47fec0942fa0");
  });

  it("returns text/plain content type", async () => {
    const response = await GET();
    expect(response.headers.get("content-type")).toContain("text/plain");
  });
});

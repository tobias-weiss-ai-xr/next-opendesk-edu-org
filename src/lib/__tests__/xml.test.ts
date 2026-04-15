import { describe, it, expect } from "vitest";
import { escapeXml } from "@/lib/xml";

describe("escapeXml", () => {
  it("escapes ampersands", () => {
    expect(escapeXml("foo & bar")).toBe("foo &amp; bar");
  });

  it("escapes less-than signs", () => {
    expect(escapeXml("1 < 2")).toBe("1 &lt; 2");
  });

  it("escapes greater-than signs", () => {
    expect(escapeXml("2 > 1")).toBe("2 &gt; 1");
  });

  it("escapes double quotes", () => {
    expect(escapeXml('say "hello"')).toBe("say &quot;hello&quot;");
  });

  it("escapes single quotes (apostrophes)", () => {
    expect(escapeXml("it's")).toBe("it&apos;s");
  });

  it("escapes all special characters in a combined string", () => {
    expect(escapeXml('<a href="x&y">it\'s</a>')).toBe(
      "&lt;a href=&quot;x&amp;y&quot;&gt;it&apos;s&lt;/a&gt;"
    );
  });

  it("returns plain text unchanged", () => {
    expect(escapeXml("Hello World")).toBe("Hello World");
  });

  it("handles empty string", () => {
    expect(escapeXml("")).toBe("");
  });

  it("escapes multiple ampersands", () => {
    expect(escapeXml("a&b&c")).toBe("a&amp;b&amp;c");
  });
});

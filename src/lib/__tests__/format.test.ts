import { describe, it, expect } from "vitest";
import { formatDate } from "@/lib/format";

describe("formatDate", () => {
  it("formats a date string with month name", () => {
    const result = formatDate("2024-01-15");
    expect(result).toContain("2024");
    expect(result).toContain("January");
    expect(result).toContain("15");
  });

  it("formats a mid-year date correctly", () => {
    const result = formatDate("2024-07-04");
    expect(result).toContain("2024");
    expect(result).toContain("July");
    expect(result).toContain("4");
  });

  it("returns a human-readable string (not ISO format)", () => {
    const result = formatDate("2024-03-20");
    // Should use "March 20, 2024" style, not "2024-03-20"
    expect(result).not.toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

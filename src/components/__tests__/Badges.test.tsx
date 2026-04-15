import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tag, CategoryBadge } from "@/components/Badges";

describe("Tag", () => {
  it("renders children text", () => {
    render(<Tag>javascript</Tag>);
    expect(screen.getByText("javascript")).toBeInTheDocument();
  });

  it("has rounded-full class for pill shape", () => {
    render(<Tag>test-tag</Tag>);
    const el = screen.getByText("test-tag");
    expect(el.className).toContain("rounded-full");
  });

  it("has border styling", () => {
    render(<Tag>styled</Tag>);
    const el = screen.getByText("styled");
    expect(el.className).toContain("border");
  });
});

describe("CategoryBadge", () => {
  it("renders children text", () => {
    render(<CategoryBadge>Tutorial</CategoryBadge>);
    expect(screen.getByText("Tutorial")).toBeInTheDocument();
  });

  it("has accent-related styling", () => {
    render(<CategoryBadge>Design</CategoryBadge>);
    const el = screen.getByText("Design");
    expect(el.className).toContain("accent");
  });

  it("has rounded-full class for pill shape", () => {
    render(<CategoryBadge>Cat</CategoryBadge>);
    const el = screen.getByText("Cat");
    expect(el.className).toContain("rounded-full");
  });
});

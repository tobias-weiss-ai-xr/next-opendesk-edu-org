import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionPage from "@/components/SectionPage";

// Mock @/i18n/navigation Link
vi.mock("@/i18n/navigation", () => ({
  Link: (props: { href?: string; children?: React.ReactNode; [key: string]: unknown }) => (
    <a href={props.href}>{props.children}</a>
  ),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: { alt?: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...props} />
  ),
}));

// Mock content module
const mockPosts = [
  {
    title: "Post One",
    date: "2024-01-10",
    description: "First post",
    categories: ["Guide"],
    tags: ["intro"],
    htmlContent: "<p>one</p>",
    slug: "post-one",
    section: "components",
  },
  {
    title: "Post Two",
    date: "2024-02-20",
    description: "Second post",
    categories: ["Tutorial"],
    tags: ["advanced"],
    htmlContent: "<p>two</p>",
    slug: "post-two",
    section: "components",
  },
];

vi.mock("@/lib/content", () => ({
  getSectionBySlug: vi.fn((slug: string) => {
    if (slug === "components") {
      return { name: "Components", slug: "components", title: "Components", description: "All components." };
    }
    return undefined;
  }),
  getPostsBySection: vi.fn(async () => mockPosts),
  isValidSection: vi.fn(),
}));

vi.mock("@/lib/config", () => ({
  SITE_NAME: "openDesk Edu",
}));

describe("SectionPage", () => {
  it("renders section title", async () => {
    const result = await SectionPage({ section: "components" });
    render(result);
    expect(screen.getByText("Components")).toBeInTheDocument();
  });

  it("renders section description", async () => {
    const result = await SectionPage({ section: "components" });
    render(result);
    expect(screen.getByText("All components.")).toBeInTheDocument();
  });

  it("renders a PostCard for each post", async () => {
    const result = await SectionPage({ section: "components" });
    render(result);
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });

  it("shows not found for invalid section", async () => {
    const result = await SectionPage({ section: "nonexistent" });
    render(result);
    expect(screen.getByText("Section not found")).toBeInTheDocument();
  });
});

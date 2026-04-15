import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: { alt?: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...props} />
  ),
}));

// Mock next-intl/navigation Link
vi.mock("@/i18n/navigation", () => ({
  Link: (props: { href?: string; children?: React.ReactNode; [key: string]: unknown }) => (
    <a href={props.href}>{props.children}</a>
  ),
}));

// Mock next-intl useTranslations
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      home: "Home",
      components: "Components",
      architecture: "Architecture",
      getStarted: "Get Started",
      blog: "Blog",
    };
    return translations[key] ?? key;
  },
}));

function renderHeader() {
  return render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}

describe("Header", () => {
  it("renders the brand text 'openDesk Edu'", () => {
    renderHeader();
    expect(screen.getByText("openDesk Edu")).toBeInTheDocument();
  });

  it("renders all 5 nav items (Home + 4 sections)", () => {
    renderHeader();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("renders a theme toggle button", () => {
    renderHeader();
    const themeButtons = screen.getAllByLabelText("Toggle theme");
    // One for desktop, one for mobile
    expect(themeButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders a mobile menu toggle button", () => {
    renderHeader();
    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  it("logo links to home", () => {
    renderHeader();
    const logo = screen.getByText("openDesk Edu").closest("a");
    expect(logo).toHaveAttribute("href", "/");
  });
});

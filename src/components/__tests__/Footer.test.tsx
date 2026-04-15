import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "@/components/Footer";

// Mock next/link
vi.mock("next/link", () => ({
  default: (props: { href?: string; children?: React.ReactNode; [key: string]: unknown }) => (
    <a href={props.href}>{props.children}</a>
  ),
}));

// Mock next/image to prevent Footer from importing it transitively
vi.mock("next/image", () => ({
  default: (props: { alt?: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...props} />
  ),
}));

describe("Footer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-15"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the Imprint link", () => {
    render(<Footer />);
    expect(screen.getByText("Imprint")).toBeInTheDocument();
  });

  it("renders the Privacy link", () => {
    render(<Footer />);
    expect(screen.getByText("Privacy")).toBeInTheDocument();
  });

  it("renders the Contact email link", () => {
    render(<Footer />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("copyright text contains 'openDesk Edu'", () => {
    render(<Footer />);
    expect(screen.getByText(/openDesk Edu/)).toBeInTheDocument();
  });

  it("copyright includes current year", () => {
    render(<Footer />);
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it("Imprint link points to /imprint", () => {
    render(<Footer />);
    const link = screen.getByText("Imprint").closest("a");
    expect(link).toHaveAttribute("href", "/imprint");
  });

  it("Privacy link points to /privacy", () => {
    render(<Footer />);
    const link = screen.getByText("Privacy").closest("a");
    expect(link).toHaveAttribute("href", "/privacy");
  });

  it("Contact link sets mailto on click", () => {
    // Mock window.location.href to prevent jsdom navigation
    const originalLocation = window.location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = { href: "" };

    render(<Footer />);
    fireEvent.click(screen.getByText("Contact"));
    expect(window.location.href).toBe("mailto:info@opendesk-edu.org");

    // Restore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = originalLocation;
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";

// Mock next/link
vi.mock("next/link", () => ({
  default: (props: { href?: string; children?: React.ReactNode; [key: string]: unknown }) => (
    <a href={props.href}>{props.children}</a>
  ),
}));

// Mock EmailLink
vi.mock("@/components/EmailLink", () => ({
  default: (props: { children?: React.ReactNode; className?: string }) => (
    <a href="#" className={props.className}>
      {props.children}
    </a>
  ),
}));

describe("AboutPage", () => {
  it("renders the page title", () => {
    render(<AboutPage />);
    expect(screen.getByText("About openDesk Edu")).toBeInTheDocument();
  });

  it("renders all four service cards", () => {
    render(<AboutPage />);
    expect(screen.getByText("Learning Management")).toBeInTheDocument();
    expect(screen.getByText("Cloud Infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Digital Sovereignty")).toBeInTheDocument();
    expect(screen.getByText("SSO & Federation")).toBeInTheDocument();
  });

  it("renders project links", () => {
    render(<AboutPage />);
    expect(screen.getByText("Components")).toBeInTheDocument();
    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("renders contact section", () => {
    render(<AboutPage />);
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
    expect(screen.getByText("Contact us")).toBeInTheDocument();
  });

  it("links projects to correct URLs", () => {
    render(<AboutPage />);
    expect(screen.getByText("Components").closest("a")).toHaveAttribute("href", "/components");
    expect(screen.getByText("Architecture").closest("a")).toHaveAttribute("href", "/architecture");
    expect(screen.getByText("Get Started").closest("a")).toHaveAttribute("href", "/get-started");
    expect(screen.getByText("Blog").closest("a")).toHaveAttribute("href", "/blog");
  });
});

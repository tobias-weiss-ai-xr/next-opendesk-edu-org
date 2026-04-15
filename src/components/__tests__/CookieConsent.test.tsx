import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CookieConsent from "@/components/CookieConsent";

// Mock next/link
vi.mock("next/link", () => ({
  default: (props: { href?: string; children?: React.ReactNode; className?: string }) => (
    <a href={props.href} className={props.className}>
      {props.children}
    </a>
  ),
}));

// Mock config
vi.mock("@/lib/config", () => ({
  PLAUSIBLE_DOMAIN: "opendesk-edu.org",
  CLARITY_ID: "test-clarity-id",
}));

describe("CookieConsent", () => {
  beforeEach(() => {
    localStorage.clear();
    // Clean up any scripts added by previous tests
    document.querySelectorAll('script[data-domain]').forEach((s) => s.remove());
    document.querySelectorAll('script').forEach((s) => {
      if (s.textContent?.includes("clarity")) s.remove();
    });
  });

  it("renders nothing when consent already accepted", () => {
    localStorage.setItem("cookie-consent", "accepted");
    render(<CookieConsent />);
    expect(screen.queryByText("Decline")).not.toBeInTheDocument();
    expect(screen.queryByText("Accept")).not.toBeInTheDocument();
  });

  it("renders nothing when consent already declined", () => {
    localStorage.setItem("cookie-consent", "declined");
    render(<CookieConsent />);
    expect(screen.queryByText("Decline")).not.toBeInTheDocument();
    expect(screen.queryByText("Accept")).not.toBeInTheDocument();
  });

  it("renders banner when consent is undecided", () => {
    render(<CookieConsent />);
    expect(screen.getByText("Decline")).toBeInTheDocument();
    expect(screen.getByText("Accept")).toBeInTheDocument();
    expect(
      screen.getByText(/We use privacy-friendly analytics/)
    ).toBeInTheDocument();
  });

  it("accept button hides banner and loads analytics", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Accept"));

    expect(screen.queryByText("Decline")).not.toBeInTheDocument();
    expect(localStorage.getItem("cookie-consent")).toBe("accepted");

    // Plausible script should be added to document.head
    const plausible = document.querySelector('script[data-domain="opendesk-edu.org"]');
    expect(plausible).toBeInTheDocument();

    // Clarity script should be added to document.head
    const clarityScript = Array.from(document.querySelectorAll("script")).find(
      (s) => s.textContent?.includes("clarity")
    );
    expect(clarityScript).toBeInTheDocument();
  });

  it("decline button hides banner without loading analytics", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Decline"));

    expect(screen.queryByText("Decline")).not.toBeInTheDocument();
    expect(localStorage.getItem("cookie-consent")).toBe("declined");

    // No analytics scripts should be added
    const plausible = document.querySelector('script[data-domain="opendesk-edu.org"]');
    expect(plausible).not.toBeInTheDocument();
  });

  it("privacy policy link points to /privacy", () => {
    render(<CookieConsent />);
    const link = screen.getByText("Learn more");
    expect(link).toHaveAttribute("href", "/privacy");
  });

  it("stores consent in localStorage on accept", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Accept"));
    expect(localStorage.getItem("cookie-consent")).toBe("accepted");
  });

  it("stores consent in localStorage on decline", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Decline"));
    expect(localStorage.getItem("cookie-consent")).toBe("declined");
  });
});

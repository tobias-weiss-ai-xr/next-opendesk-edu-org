import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmailLink from "@/components/EmailLink";

describe("EmailLink", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = { href: "" };
  });

  it("renders children text", () => {
    render(<EmailLink>Contact Us</EmailLink>);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("sets window.location.href to mailto on click", () => {
    render(<EmailLink>Get in touch</EmailLink>);
    fireEvent.click(screen.getByText("Get in touch"));
    expect(window.location.href).toBe("mailto:info@opendesk-edu.org");
  });

  it("renders with an anchor tag and default href='#'", () => {
    render(<EmailLink>Email</EmailLink>);
    const link = screen.getByText("Email").closest("a");
    expect(link).toHaveAttribute("href", "#");
  });

  it("prevents default anchor navigation", () => {
    const preventDefault = vi.fn();
    render(<EmailLink>Click me</EmailLink>);
    const link = screen.getByText("Click me").closest("a");
    const clickEvent = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(clickEvent, "preventDefault", { value: preventDefault });
    link?.dispatchEvent(clickEvent);
    expect(preventDefault).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<EmailLink className="custom-class">Styled</EmailLink>);
    const link = screen.getByText("Styled").closest("a");
    expect(link?.className).toContain("custom-class");
  });
});

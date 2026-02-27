/**
 * @vitest-environment happy-dom
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BackLink } from "./back-link";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("BackLink", () => {
  it("renders link with href and children", () => {
    render(<BackLink href="/">← Zur Startseite</BackLink>);
    const link = screen.getByRole("link", { name: /zur startseite/i });
    expect(link).toHaveAttribute("href", "/");
  });
});

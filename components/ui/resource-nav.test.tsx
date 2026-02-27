/**
 * @vitest-environment happy-dom
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResourceNav } from "./resource-nav";

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

describe("ResourceNav", () => {
  it("returns null when resourceKeys is empty", () => {
    const { container } = render(<ResourceNav resourceKeys={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a link per resource key with capitalized label", () => {
    render(<ResourceNav resourceKeys={["people", "planets"]} />);
    expect(screen.getByRole("link", { name: "People" })).toHaveAttribute("href", "/people");
    expect(screen.getByRole("link", { name: "Planets" })).toHaveAttribute("href", "/planets");
  });
});

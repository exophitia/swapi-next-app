/**
 * @vitest-environment happy-dom
 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CardGrid } from "./card-grid";

afterEach(cleanup);

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

describe("CardGrid", () => {
  it("renders the correct number of items", () => {
    const items = [
      { key: "a", href: "/a", label: "Item A" },
      { key: "b", href: "/b", label: "Item B" },
    ];
    render(<CardGrid items={items} />);
    expect(screen.getByRole("link", { name: "Item A" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Item B" })).toBeInTheDocument();
  });

  it("renders items without href as span (no link)", () => {
    const items = [
      { key: "x", label: "No link item" },
    ];
    render(<CardGrid items={items} />);
    expect(screen.getByText("No link item")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders links with correct href", () => {
    render(
      <CardGrid
        items={[{ key: "people", href: "/people", label: "People" }]}
      />
    );
    const link = screen.getByRole("link", { name: "People" });
    expect(link).toHaveAttribute("href", "/people");
  });
});

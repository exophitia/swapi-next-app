/**
 * @vitest-environment happy-dom
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DetailCard } from "./detail-card";

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

describe("DetailCard", () => {
  it("renders title and subtitle", () => {
    render(
      <DetailCard
        title="Luke Skywalker"
        subtitle="People · ID 1"
        entries={[]}
        backLink={{ href: "/people", children: "← Back to People" }}
      />
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Luke Skywalker" })
    ).toBeInTheDocument();
    expect(screen.getByText("People · ID 1")).toBeInTheDocument();
  });

  it("renders key-value entries with formatted keys", () => {
    render(
      <DetailCard
        title="Test"
        entries={[["birth_year", "19BBY"]]}
        backLink={{ href: "/", children: "Back" }}
      />
    );
    expect(screen.getByText("birth year")).toBeInTheDocument();
    expect(screen.getByText("19BBY")).toBeInTheDocument();
  });

  it("renders back link with correct href", () => {
    render(
      <DetailCard
        title="Test"
        entries={[]}
        backLink={{ href: "/people", children: "← Zurück zu People" }}
      />
    );
    const link = screen.getByRole("link", { name: /zurück zu people/i });
    expect(link).toHaveAttribute("href", "/people");
  });
});

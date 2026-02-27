/**
 * @vitest-environment happy-dom
 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PageHeader } from "./page-header";

afterEach(cleanup);

describe("PageHeader", () => {
  it("renders the title as heading", () => {
    render(<PageHeader title="Star Wars" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Star Wars" })
    ).toBeInTheDocument();
  });

  it("renders optional description when children provided", () => {
    render(
      <PageHeader title="Test" spacing="normal">
        Description text
      </PageHeader>
    );
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("does not render a paragraph when children is not provided", () => {
    render(<PageHeader title="Only Title" />);
    expect(screen.getByRole("heading", { name: "Only Title" })).toBeInTheDocument();
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });
});

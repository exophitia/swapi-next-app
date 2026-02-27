import { describe, expect, it } from "vitest";
import type { SwapiResourceItem } from "@/lib/types";
import {
  getDisplayName,
  getDisplayableEntries,
  getIdFromUrl,
  isUrl,
  labelForResource,
  mapSwapiUrlToLocalHref,
} from "./swapi-routes";

describe("getIdFromUrl", () => {
  it("extracts id from full SWAPI URL", () => {
    expect(
      getIdFromUrl("https://swapi.py4e.com/api/people/1/")
    ).toBe("1");
  });

  it("handles URL without trailing slash", () => {
    expect(getIdFromUrl("https://swapi.py4e.com/api/people/42")).toBe("42");
  });

  it("returns empty string for empty input", () => {
    expect(getIdFromUrl("")).toBe("");
  });

  it("returns last path segment for path-only string", () => {
    expect(getIdFromUrl("/api/people/3/")).toBe("3");
  });
});

describe("mapSwapiUrlToLocalHref", () => {
  it("maps SWAPI URL to local /resource/id", () => {
    expect(
      mapSwapiUrlToLocalHref("https://swapi.py4e.com/api/people/1/")
    ).toBe("/people/1");
  });

  it("handles URL without trailing slash", () => {
    expect(
      mapSwapiUrlToLocalHref("https://swapi.py4e.com/api/planets/5")
    ).toBe("/planets/5");
  });

  it("returns null for invalid URL", () => {
    expect(mapSwapiUrlToLocalHref("not-a-url")).toBeNull();
  });

  it("returns null for URL without resource/id path", () => {
    expect(mapSwapiUrlToLocalHref("https://example.com/")).toBeNull();
  });
});

describe("getDisplayName", () => {
  it("returns name when present", () => {
    const item = { name: "Luke Skywalker", url: "https://api/people/1/" } as SwapiResourceItem;
    expect(getDisplayName(item)).toBe("Luke Skywalker");
  });

  it("returns title for film-like item", () => {
    const item = { title: "A New Hope", url: "https://api/films/1/" } as SwapiResourceItem;
    expect(getDisplayName(item)).toBe("A New Hope");
  });

  it('returns "Unbekannt" when neither name nor title is a string', () => {
    expect(getDisplayName({ url: "https://api/people/1/" } as SwapiResourceItem)).toBe("Unbekannt");
    expect(getDisplayName({ name: null, url: "" } as unknown as SwapiResourceItem)).toBe("Unbekannt");
  });
});

describe("labelForResource", () => {
  it("capitalizes first letter", () => {
    expect(labelForResource("people")).toBe("People");
    expect(labelForResource("starships")).toBe("Starships");
  });
});

describe("isUrl", () => {
  it("returns true for string starting with http", () => {
    expect(isUrl("https://swapi.dev/api/")).toBe(true);
    expect(isUrl("http://example.com")).toBe(true);
  });

  it("returns false for non-URL string", () => {
    expect(isUrl("hello")).toBe(false);
    expect(isUrl("")).toBe(false);
  });
});

describe("getDisplayableEntries", () => {
  it("excludes url field", () => {
    const item = { name: "Test", url: "https://api/people/1/" };
    const entries = getDisplayableEntries(item as never);
    expect(entries.every(([key]) => key !== "url")).toBe(true);
    expect(entries.some(([key]) => key === "name")).toBe(true);
  });

  it("includes primitive string and number", () => {
    const item = { name: "Luke", height: "172", mass: 77, url: "https://api/1/" };
    const entries = getDisplayableEntries(item as never);
    expect(entries.map(([k]) => k).sort()).toContain("name");
    expect(entries.map(([k]) => k).sort()).toContain("height");
    expect(entries.map(([k]) => k).sort()).toContain("mass");
  });

  it("includes arrays of URL strings", () => {
    const item = {
      name: "Luke",
      films: ["https://api/films/1/", "https://api/films/2/"],
      url: "https://api/people/1/",
    };
    const entries = getDisplayableEntries(item as never);
    const filmsEntry = entries.find(([key]) => key === "films");
    expect(filmsEntry).toBeDefined();
    expect(Array.isArray(filmsEntry![1])).toBe(true);
  });

  it("excludes null and undefined values", () => {
    const item = { name: "Test", empty: null, url: "https://api/1/" };
    const entries = getDisplayableEntries(item as never);
    expect(entries.some(([key]) => key === "empty")).toBe(false);
  });
});

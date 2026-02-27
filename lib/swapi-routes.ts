import type { SwapiResourceItem, SwapiResourceKey, SwapiRoot } from "@/lib/types";

/** Base URL for all SWAPI requests. */
export const SWAPI_BASE = "https://swapi.py4e.com/api";

/**
 * Default fetch options for SWAPI calls.
 * Uses Next.js `revalidate` to cache responses for 24 hours.
 */
export const fetchOptions = { next: { revalidate: 86400 } as const };

/** Response shape for a paginated SWAPI resource list (one page). */
export type ResourcePageResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwapiResourceItem[];
};

/**
 * Fetches all available SWAPI resource keys from the root endpoint.
 *
 * Example result: `["people", "planets", "films", "species", "vehicles", "starships"]`.
 * Only entries that look like valid HTTP URLs are returned.
 */
export async function getSwapiResourceKeys(): Promise<string[]> {
  const res = await fetch(`${SWAPI_BASE}/`, fetchOptions);
  const data = (await res.json()) as SwapiRoot;

  return (Object.keys(data) as (keyof SwapiRoot)[]).filter(
    (key): key is SwapiResourceKey =>
      typeof data[key] === "string" && data[key].startsWith("http")
  );
}

/**
 * Returns a human-readable label for a SWAPI resource key.
 *
 * Example: `"people"` → `"People"`.
 */
export function labelForResource(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Fetches a single page of a SWAPI resource list.
 *
 * @param resource - SWAPI resource key (e.g. `"people"`)
 * @param page - 1-based page number (defaults to 1)
 * @returns The parsed page response or `null` if the request fails.
 */
export async function getResourcePage(
  resource: string,
  page = 1
): Promise<ResourcePageResponse | null> {
  const res = await fetch(
    `${SWAPI_BASE}/${resource}/?page=${page}`,
    fetchOptions
  );
  if (!res.ok) return null;
  return res.json() as Promise<ResourcePageResponse>;
}

/**
 * Fetches a single SWAPI resource item by resource key and id.
 *
 * @param resource - SWAPI resource key (e.g. `"people"`)
 * @param id - SWAPI id as string (e.g. `"1"`)
 * @returns The parsed entity or `null` if it does not exist or the request fails.
 */
export async function getResourceItem(
  resource: string,
  id: string
): Promise<SwapiResourceItem | null> {
  const res = await fetch(`${SWAPI_BASE}/${resource}/${id}/`, fetchOptions);
  if (!res.ok) return null;
  return res.json() as Promise<SwapiResourceItem>;
}

/**
 * Extracts the numeric id from a SWAPI entity URL.
 *
 * Example: `"https://swapi.py4e.com/api/people/1/"` → `"1"`.
 */
export function getIdFromUrl(url: string): string {
  return url.replace(/\/$/, "").split("/").pop() ?? "";
}

/**
 * Returns a display name for a SWAPI entity.
 *
 * Uses the `name` field when present, otherwise the `title` field (for films).
 * Falls back to `"Unbekannt"` if neither is a string.
 */
export function getDisplayName(item: SwapiResourceItem): string {
  const name = "name" in item ? item.name : item.title;
  return typeof name === "string" ? name : "Unbekannt";
}

/** Returns true if a value is a string that looks like an HTTP URL. */
export function isUrl(value: unknown): boolean {
  return typeof value === "string" && value.startsWith("http");
}

/** Returns true if a value is an array that contains at least one URL string. */
function isUrlArray(value: unknown): boolean {
  return Array.isArray(value) && value.some(isUrl);
}

/**
 * Returns key-value pairs from a SWAPI entity that are suitable for display.
 *
 * - Excludes the `url` field.
 * - Excludes `null` / `undefined` values.
 * - Includes primitive values (`string` / `number`).
 * - Includes arrays of URL strings (relations like `films`, `vehicles`, …).
 */
export function getDisplayableEntries(
  item: SwapiResourceItem
): [string, string | number | string[]][] {
  return Object.entries(item).filter(
    (entry): entry is [string, string | number | string[]] => {
      const [key, value] = entry;

      if (key === "url" || value == null) return false;

      // Primitive values (no relations)
      if (typeof value === "string" || typeof value === "number") {
        return true;
      }

      // Arrays of URL strings (relations such as films, vehicles, ...)
      if (isUrlArray(value)) {
        return true;
      }

      // Everything else (nested objects, other arrays) is ignored
      return false;
    }
  );
}

/**
 * Maps a SWAPI entity URL to a local app href (e.g. "/people/1").
 *
 * Returns `null` if the URL cannot be parsed or does not match the expected pattern.
 */
export function mapSwapiUrlToLocalHref(url: string): string | null {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.replace(/\/$/, "").split("/");
    const id = parts.pop();
    const resource = parts.pop();
    if (!resource || !id) return null;
    return `/${resource}/${id}`;
  } catch {
    return null;
  }
}

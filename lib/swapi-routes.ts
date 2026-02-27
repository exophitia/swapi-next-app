import type { SwapiResourceItem } from "@/lib/types";

export const SWAPI_BASE = "https://swapi.py4e.com/api";
export const fetchOptions = { next: { revalidate: 86400 } as const };

export type ResourcePageResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwapiResourceItem[];
};

export async function getSwapiResourceKeys(): Promise<string[]> {
  const res = await fetch(`${SWAPI_BASE}/`, fetchOptions);
  const data = (await res.json()) as Record<string, string>;
  return Object.keys(data).filter(
    (key) => typeof data[key] === "string" && data[key].startsWith("http")
  );
}

export function labelForResource(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

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

export async function getResourceItem(
  resource: string,
  id: string
): Promise<SwapiResourceItem | null> {
  const res = await fetch(`${SWAPI_BASE}/${resource}/${id}/`, fetchOptions);
  if (!res.ok) return null;
  return res.json() as Promise<SwapiResourceItem>;
}

export function getIdFromUrl(url: string): string {
  return url.replace(/\/$/, "").split("/").pop() ?? "";
}

export function getDisplayName(item: SwapiResourceItem): string {
  const name = "name" in item ? item.name : item.title;
  return typeof name === "string" ? name : "Unbekannt";
}

function isUrl(value: unknown): boolean {
  return typeof value === "string" && value.startsWith("http");
}

function isUrlArray(value: unknown): boolean {
  return Array.isArray(value) && value.some(isUrl);
}

/** Key-value pairs from item suitable for display (no url, no links/arrays). */
export function getDisplayableEntries(
  item: SwapiResourceItem
): [string, string | number][] {
  return Object.entries(item).filter(
    (entry): entry is [string, string | number] => {
      const [key, value] = entry;
      return (
        key !== "url" &&
        value != null &&
        typeof value !== "object" &&
        !isUrl(value) &&
        !isUrlArray(value)
      );
    }
  );
}

import Link from "next/link";
import { BackLink } from "@/components/ui/back-link";
import { isUrl, mapSwapiUrlToLocalHref } from "@/lib/swapi-routes";

/** Formats keys for display (e.g. "birth_year" → "birth year"). */
const defaultKeyLabel = (key: string) => key.replace(/_/g, " ");

export type DetailEntry = [key: string, value: unknown];

type DetailCardProps = {
  /** Main title (e.g. name of the person / planet). */
  title: string;
  /** Optional line below the title (e.g. "People · ID 1"). */
  subtitle?: string;
  /** List of [key, value] pairs for the description list. */
  entries: DetailEntry[];
  /** Optional: custom formatting for the key labels. */
  formatKeyLabel?: (key: string) => string;
  /** Back link (e.g. "← Back to People"). */
  backLink: { href: string; children: React.ReactNode };
};

/**
 * Card with title, optional subtitle, key-value list and back link.
 * Reusable for detail views (person, planet, film, …).
 */
export function DetailCard({
  title,
  subtitle,
  entries,
  formatKeyLabel = defaultKeyLabel,
  backLink,
}: DetailCardProps) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900/50 p-6 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-amber-400">{title}</h1>
      {subtitle != null && subtitle !== "" && (
        <p className="mb-4 text-sm text-slate-400">{subtitle}</p>
      )}
      <dl className="grid gap-3 sm:grid-cols-2">
        {entries.map(([key, value]) => {
          const renderUrl = (url: string) => {
            const href = mapSwapiUrlToLocalHref(url);
            return href ? (
              <Link
                href={href}
                className="text-amber-400 underline hover:text-amber-300"
              >
                {href}
              </Link>
            ) : (
              url
            );
          };

          return (
            <div key={key}>
              <dt className="text-sm font-medium text-slate-400">
                {formatKeyLabel(key)}
              </dt>
              <dd className="text-slate-100">
                {typeof value === "string" && isUrl(value) ? (
                  renderUrl(value)
                ) : Array.isArray(value) && value.every(isUrl) ? (
                  <ul className="space-y-1">
                    {value.map((url) => (
                      <li key={url}>{renderUrl(url)}</li>
                    ))}
                  </ul>
                ) : (
                  String(value)
                )}
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-6">
        <BackLink href={backLink.href}>{backLink.children}</BackLink>
      </p>
    </article>
  );
}

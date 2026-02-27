import Link from "next/link";
import { BackLink } from "@/components/ui/back-link";
import { isUrl, mapSwapiUrlToLocalHref } from "@/lib/swapi-routes";

/** Formatiert Schlüssel für die Anzeige (z. B. "birth_year" → "birth year"). */
const defaultKeyLabel = (key: string) => key.replace(/_/g, " ");

export type DetailEntry = [key: string, value: unknown];

type DetailCardProps = {
  /** Haupttitel (z. B. Name der Person / des Planeten). */
  title: string;
  /** Optionale Zeile unter dem Titel (z. B. "People · ID 1"). */
  subtitle?: string;
  /** Liste von [Schlüssel, Wert]-Paaren für die Beschreibungsliste. */
  entries: DetailEntry[];
  /** Optional: eigene Formatierung der Schlüssel-Labels. */
  formatKeyLabel?: (key: string) => string;
  /** Link zurück (z. B. "← Zurück zu People"). */
  backLink: { href: string; children: React.ReactNode };
};

/**
 * Karte mit Titel, optionalem Untertitel, Key-Value-Liste und Zurück-Link.
 * Wiederverwendbar für Detailansichten (Person, Planet, Film, …).
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

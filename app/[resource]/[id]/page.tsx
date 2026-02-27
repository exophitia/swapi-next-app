import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSwapiResourceKeys,
  getResourceItem,
  labelForResource,
  getDisplayName,
  getDisplayableEntries,
} from "@/lib/swapi-routes";

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource, id } = await params;
  const keys = await getSwapiResourceKeys();
  if (!keys.includes(resource)) notFound();

  const item = await getResourceItem(resource, id);
  if (!item) notFound();

  const label = labelForResource(resource);
  const displayName = getDisplayName(item);
  const entries = getDisplayableEntries(item);

  // API-Feldnamen (z. B. "birth_year") lesbar anzeigen: Unterstrich → Leerzeichen
  const fieldLabel = (key: string) => key.replace(/_/g, " ");

  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900/50 p-6 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-amber-400">{displayName}</h1>
      <p className="mb-4 text-sm text-slate-400">{label} · ID {id}</p>
      <dl className="grid gap-3 sm:grid-cols-2">
        {entries.map(([key, value]) => (
          <div key={key}>
            <dt className="text-sm font-medium text-slate-400">
              {fieldLabel(key)}
            </dt>
            <dd className="text-slate-100">{String(value)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6">
        <Link
          href={`/${resource}`}
          className="text-amber-400 underline hover:text-amber-300"
        >
          ← Zurück zu {label}
        </Link>
      </p>
    </article>
  );
}

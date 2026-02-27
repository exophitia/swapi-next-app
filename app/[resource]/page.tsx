import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSwapiResourceKeys,
  getResourcePage,
  labelForResource,
  getIdFromUrl,
  getDisplayName,
} from "@/lib/swapi-routes";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  const keys = await getSwapiResourceKeys();
  if (!keys.includes(resource)) notFound();

  const data = await getResourcePage(resource);
  if (!data) notFound();

  const label = labelForResource(resource);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-amber-400">{label}</h1>
      <p className="mb-6 text-slate-400">
        {data.count} Einträge (Seite 1)
        {data.next ? " · Weitere Seiten über die API verfügbar" : ""}
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {data.results.map((item) => {
          const id = item.url ? getIdFromUrl(item.url) : "";
          const name = getDisplayName(item);
          const href = id ? `/${resource}/${id}` : "#";

          return (
            <li key={item.url ?? name}>
              <Link
                href={href}
                className="block rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 transition hover:border-amber-500/50 hover:bg-slate-800"
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-6">
        <Link href="/" className="text-amber-400 underline hover:text-amber-300">
          ← Zur Startseite
        </Link>
      </p>
    </div>
  );
}

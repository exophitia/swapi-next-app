import Link from "next/link";
import { getSwapiResourceKeys, labelForResource } from "@/lib/swapi-routes";

export default async function HomePage() {
  const resourceKeys = await getSwapiResourceKeys();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-amber-400">
        Star Wars – SWAPI
      </h1>
      <p className="mb-8 text-slate-400">
        Wähle eine Kategorie in der Navigation oder unten:
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {resourceKeys.map((key) => (
          <li key={key}>
            <Link
              href={`/${key}`}
              className="block rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 transition hover:border-amber-500/50 hover:bg-slate-800"
            >
              {labelForResource(key)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

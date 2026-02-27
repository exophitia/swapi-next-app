import Link from "next/link";
import { labelForResource } from "@/lib/swapi-routes";

type ResourceNavProps = {
  resourceKeys: string[];
};

/** Horizontale Navigation über die SWAPI-Ressourcen (People, Planets, …). */
export function ResourceNav({ resourceKeys }: ResourceNavProps) {
  if (resourceKeys.length === 0) return null;

  return (
    <nav className="flex flex-wrap gap-2">
      {resourceKeys.map((key) => (
        <Link
          key={key}
          href={`/${key}`}
          className="rounded px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-amber-400"
        >
          {labelForResource(key)}
        </Link>
      ))}
    </nav>
  );
}


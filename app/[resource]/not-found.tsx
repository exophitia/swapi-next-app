import Link from "next/link";

export default function ResourceNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-amber-400">Seite nicht gefunden</h1>
      <p className="text-slate-400">Die angeforderte Ressource existiert nicht.</p>
      <Link href="/" className="text-amber-400 underline hover:text-amber-300">
        Zur Startseite
      </Link>
    </div>
  );
}

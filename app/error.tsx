"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-amber-400">Etwas ist schiefgelaufen</h1>
      <p className="text-slate-400">Die Seite konnte nicht geladen werden.</p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded bg-amber-500/20 px-4 py-2 text-amber-400 hover:bg-amber-500/30"
        >
          Erneut versuchen
        </button>
        <Link
          href="/"
          className="rounded bg-slate-700 px-4 py-2 text-slate-200 hover:bg-slate-600"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}

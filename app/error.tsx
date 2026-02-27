"use client";

import { PageHeader } from "@/components/ui/page-header";
import { BackLink } from "@/components/ui/back-link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <PageHeader title="Etwas ist schiefgelaufen" spacing="normal">
        Die Seite konnte nicht geladen werden.
      </PageHeader>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded bg-amber-500/20 px-4 py-2 text-amber-400 hover:bg-amber-500/30"
        >
          Erneut versuchen
        </button>
        <BackLink href="/">← Zur Startseite</BackLink>
      </div>
    </div>
  );
}

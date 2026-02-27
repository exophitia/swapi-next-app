import { PageHeader } from "@/components/ui/page-header";
import { BackLink } from "@/components/ui/back-link";

export default function ResourceNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <PageHeader title="Seite nicht gefunden" spacing="normal">
        Die angeforderte Ressource existiert nicht.
      </PageHeader>
      <BackLink href="/">← Zur Startseite</BackLink>
    </div>
  );
}

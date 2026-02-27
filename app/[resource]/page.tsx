import { notFound } from "next/navigation";
import {
  getSwapiResourceKeys,
  getResourcePage,
  isSwapiResourceKey,
  labelForResource,
  getIdFromUrl,
  getDisplayName,
} from "@/lib/swapi-routes";
import { CardGrid } from "@/components/ui/card-grid";
import { BackLink } from "@/components/ui/back-link";
import { PageHeader } from "@/components/ui/page-header";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  const keys = await getSwapiResourceKeys();
  if (!isSwapiResourceKey(resource, keys)) notFound();

  const data = await getResourcePage(resource);
  if (!data) notFound();

  const label = labelForResource(resource);
  const items = data.results.map((item) => {
    const id = item.url ? getIdFromUrl(item.url) : "";
    const name = getDisplayName(item);
    const href = id ? `/${resource}/${id}` : undefined;

    return {
      key: item.url ?? name,
      href,
      label: name,
    };
  });

  return (
    <div>
      <PageHeader title={label}>
        {data.count} Einträge (Seite 1)
        {data.next ? " · Weitere Seiten über die API verfügbar" : ""}
      </PageHeader>
      <CardGrid items={items} className="gap-3" />
      <p className="mt-6">
        <BackLink href="/">← Zur Startseite</BackLink>
      </p>
    </div>
  );
}

import { notFound } from "next/navigation";
import {
  getSwapiResourceKeys,
  getResourceItem,
  labelForResource,
  getDisplayName,
  getDisplayableEntries,
} from "@/lib/swapi-routes";
import { DetailCard } from "@/components/ui/detail-card";

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

  return (
    <DetailCard
      title={displayName}
      subtitle={`${label} · ID ${id}`}
      entries={entries}
      backLink={{ href: `/${resource}`, children: `← Zurück zu ${label}` }}
    />
  );
}

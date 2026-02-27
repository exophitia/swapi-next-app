import { getSwapiResourceKeys, labelForResource } from "@/lib/swapi-routes";
import { CardGrid } from "@/components/ui/card-grid";
import { PageHeader } from "@/components/ui/page-header";

export default async function HomePage() {
  const resourceKeys = await getSwapiResourceKeys();

  const items = resourceKeys.map((key) => ({
    key,
    href: `/${key}`,
    label: labelForResource(key),
  }));

  return (
    <div>
      <PageHeader title="Star Wars – SWAPI" spacing="large">
        Wähle eine Kategorie in der Navigation oder unten:
      </PageHeader>
      <CardGrid items={items} className="gap-2" />
    </div>
  );
}

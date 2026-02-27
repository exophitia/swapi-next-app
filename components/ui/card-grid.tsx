import { LinkCard } from "@/components/ui/link-card";

type CardGridItem = {
  key: string;
  href: string;
  label: string;
};

type CardGridProps = {
  items: CardGridItem[];
  /** Zusätzliche Klassen für das Grid (z. B. Gap-Größe). */
  className?: string;
};

const baseGridClass = "grid sm:grid-cols-2";

/** Grid aus LinkCards, wiederverwendbar für Kategorien- und Ressourcen-Listen. */
export function CardGrid({ items, className }: CardGridProps) {
  const gridClass = [baseGridClass, className].filter(Boolean).join(" ");

  return (
    <ul className={gridClass}>
      {items.map(({ key, href, label }) => (
        <li key={key}>
          <LinkCard href={href}>{label}</LinkCard>
        </li>
      ))}
    </ul>
  );
}


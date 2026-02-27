import { LinkCard } from "@/components/ui/link-card";

type CardGridItem = {
  key: string;
  href: string;
  label: string;
};

type CardGridProps = {
  items: CardGridItem[];
  /** Additional classes for the grid (e.g. gap size). */
  className?: string;
};

const baseGridClass = "grid sm:grid-cols-2";

/** Grid of LinkCards, reusable for category and resource lists. */
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


import { LinkCard, linkCardClass } from "@/components/ui/link-card";

type CardGridItem = {
  key: string;
  /** When missing, the item is rendered as non-clickable text with the same card styling. */
  href?: string;
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
          {href ? (
            <LinkCard href={href}>{label}</LinkCard>
          ) : (
            <span className={linkCardClass}>{label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}


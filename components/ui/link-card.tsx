import Link from "next/link";

/** Exported so CardGrid can use the same styling for non-link items. */
export const linkCardClass =
  "block rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 transition hover:border-amber-500/50 hover:bg-slate-800";

type LinkCardProps = {
  href: string;
  children: React.ReactNode;
};

/** A card-style link for lists (categories, resource items). */
export function LinkCard({ href, children }: LinkCardProps) {
  return (
    <Link href={href} className={linkCardClass}>
      {children}
    </Link>
  );
}

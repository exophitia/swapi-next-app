import Link from "next/link";

const linkClass = "text-amber-400 underline hover:text-amber-300";

type BackLinkProps = {
  href: string;
  children: React.ReactNode;
};

/** Zurück-Link (z. B. „← Zur Startseite“ oder „← Zurück zu People“). */
export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

import Link from "next/link";

const linkClass = "text-amber-400 underline hover:text-amber-300";

type BackLinkProps = {
  href: string;
  children: React.ReactNode;
};

/** Back link (e.g. "← To start page" or "← Back to People"). */
export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

type PageHeaderProps = {
  title: string;
  /** Optional description text below the heading. */
  children?: React.ReactNode;
  /** Spacing below the text: "normal" (mb-6) or "large" (mb-8). */
  spacing?: "normal" | "large";
};

/**
 * Central page heading with optional description text.
 * Used, for example, on the home page and in resource lists.
 */
export function PageHeader({ title, children, spacing = "normal" }: PageHeaderProps) {
  const paragraphClass =
    spacing === "large" ? "mb-8 text-slate-400" : "mb-6 text-slate-400";

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold text-amber-400">{title}</h1>
      {children && <p className={paragraphClass}>{children}</p>}
    </>
  );
}


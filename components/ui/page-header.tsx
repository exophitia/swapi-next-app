type PageHeaderProps = {
  title: string;
  /** Optionaler Beschreibungstext unter der Überschrift. */
  children?: React.ReactNode;
  /** Abstand unter dem Text: "normal" (mb-6) oder "large" (mb-8). */
  spacing?: "normal" | "large";
};

/**
 * Zentrale Seiten-Überschrift mit optionalem Beschreibungstext.
 * Wird z. B. auf der Startseite und in Ressourcenlisten genutzt.
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


import Link from "next/link";
import type { Metadata } from "next";
import { getSwapiResourceKeys, labelForResource } from "@/lib/swapi-routes";
import "./globals.css";

export const metadata: Metadata = {
  title: "SWAPI – Star Wars API",
  description: "Star Wars Daten von SWAPI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let resourceKeys: string[] = [];
  try {
    resourceKeys = await getSwapiResourceKeys();
  } catch {
    // Nav auslassen, wenn API nicht erreichbar (z. B. bei 404-Route oder Netzwerkfehler)
  }

  return (
    <html lang="de">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <header className="border-b border-slate-700 bg-slate-900/50">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="text-xl font-semibold text-amber-400 hover:text-amber-300"
              >
                SWAPI – Star Wars
              </Link>
              <nav className="flex flex-wrap gap-2">
                {resourceKeys.map((key) => (
                  <Link
                    key={key}
                    href={`/${key}`}
                    className="rounded px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-amber-400"
                  >
                    {labelForResource(key)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { getSwapiResourceKeys } from "@/lib/swapi-routes";
import { ResourceNav } from "@/components/ui/resource-nav";
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
    // Skip navigation when API is not reachable (e.g. 404 route or network error)
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
              <ResourceNav resourceKeys={resourceKeys} />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Decide se avvolgere la pagina nella struttura del sito (Navbar + Footer).
// Lo Studio di Sanity (/studio) deve essere mostrato da solo — a tutto schermo,
// senza header/footer del sito — quindi per quelle rotte renderizziamo solo la
// pagina. Tutto il resto riceve il normale layout Navbar + main + Footer.
export function SiteChrome({
  navbar,
  footer,
  children,
}: {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main style={{ flex: 1 }}>{children}</main>
      {footer}
    </>
  );
}

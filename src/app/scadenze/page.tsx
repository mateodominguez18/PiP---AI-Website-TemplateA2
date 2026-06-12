import { getTaxDeadlines } from "@/lib/queries";
import { PageHero } from "@/components/PageHero";
import { ScadenzeClient } from "../_components/ScadenzeClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default async function ScadenzePage() {
  const deadlines = await getTaxDeadlines();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Scadenze Fiscali" },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        title="Scadenze Fiscali 2025"
        subtitle="Calendario completo degli adempimenti fiscali, previdenziali e dichiarativi per il 2025. Aggiornato con le principali scadenze per imprese, professionisti e persone fisiche."
        breadcrumbs={[{ label: "Scadenze" }]}
        eyebrow="Calendario fiscale"
      />

      <section className="section">
        <div className="container">
          <ScadenzeClient deadlines={deadlines} />
        </div>
      </section>
    </div>
  );
}


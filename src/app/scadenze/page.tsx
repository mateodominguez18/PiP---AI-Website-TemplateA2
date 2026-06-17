import type { Metadata } from "next";
import { getTaxDeadlines, getSiteSettings } from "@/lib/queries";
import { PageHero } from "@/components/PageHero";
import { ScadenzeClient } from "../_components/ScadenzeClient";
import { buildTitle } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const studio = settings?.studioName || "Brambilla & Associati";
  return {
    title: buildTitle("Scadenze Fiscali 2025: Calendario", studio),
    description:
      "Calendario completo delle scadenze fiscali 2025: adempimenti, versamenti e dichiarazioni per imprese, professionisti e privati, aggiornato dallo studio.",
    alternates: { canonical: "/scadenze" },
  };
}

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


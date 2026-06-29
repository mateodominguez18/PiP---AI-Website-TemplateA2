import type { Metadata } from "next";
import { getArticles, getSiteSettings, getSiteUrl, getPageSeo } from "@/lib/queries";
import { PageHero } from "@/components/PageHero";
import { GuideClient } from "../_components/GuideClient";
import { buildTitle, cityFromAddress, buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, pageSeo] = await Promise.all([getSiteSettings(), getPageSeo()]);
  const studio = settings?.studioName || "Brambilla & Associati";
  const city = cityFromAddress(settings?.address);
  return buildMetadata(pageSeo?.guide, {
    title: buildTitle("Guide e Novità Fiscali", studio),
    description: `Guide pratiche e novità su fiscalità, diritto societario e lavoro a cura dei professionisti dello studio ${studio} di ${city}. Aggiornamenti utili.`,
    canonical: "/guide",
  });
}

export default async function GuidePage() {
  const articles = await getArticles();
  const SITE_URL = await getSiteUrl();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Guide e Novità" },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        title="Guide e Novità Fiscali"
        subtitle="Analisi normative, guide pratiche e aggiornamenti su fiscalità, diritto societario e lavoro redatti dai professionisti dello studio."
        breadcrumbs={[{ label: "Guide e Novità" }]}
        eyebrow="Aggiornamento normativo"
      />

      <section className="section">
        <div className="container">
          <GuideClient articles={articles} />
        </div>
      </section>
    </div>
  );
}


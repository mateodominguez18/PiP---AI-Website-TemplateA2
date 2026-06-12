import { getArticles } from "@/lib/queries";
import { PageHero } from "@/components/PageHero";
import { GuideClient } from "../_components/GuideClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brambilla-associati.it";

export default async function GuidePage() {
  const articles = await getArticles();

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

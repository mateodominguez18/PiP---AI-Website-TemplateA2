import { getArticles } from "@/lib/queries";
import { PageHero } from "@/components/PageHero";
import { GuideClient } from "../_components/GuideClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default async function GuidePage() {
  const articles = await getArticles();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Guide e NovitÃ " },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        title="Guide e NovitÃ  Fiscali"
        subtitle="Analisi normative, guide pratiche e aggiornamenti su fiscalitÃ , diritto societario e lavoro redatti dai professionisti dello studio."
        breadcrumbs={[{ label: "Guide e NovitÃ " }]}
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


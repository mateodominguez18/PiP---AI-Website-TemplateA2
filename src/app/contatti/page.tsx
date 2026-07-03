import type { Metadata } from "next";
import { getSiteSettings, getPageSeo } from "@/lib/queries";
import { PageHero } from "@/components/PageHero";
import { ContattiClient } from "../_components/ContattiClient";
import { buildTitle, cityFromAddress, buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, pageSeo] = await Promise.all([getSiteSettings(), getPageSeo()]);
  const studio = settings?.studioName || "Brambilla & Associati";
  const city = cityFromAddress(settings?.address);
  return buildMetadata(pageSeo?.contatti, {
    title: buildTitle("Contatti Commercialista", studio, city),
    description: `Contatta lo studio ${studio} a ${city} per una consulenza fiscale, societaria o del lavoro: telefono, email e modulo per richiedere assistenza.`,
    canonical: "/contatti",
  });
}

export default async function ContattiPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <PageHero
        title="Contattaci"
        subtitle="Siamo disponibili per una prima valutazione della tua situazione. Compilare il modulo sottostante o contattarci direttamente."
        breadcrumbs={[{ label: "Contatti" }]}
        eyebrow="Parliamo della tua situazione"
      />

      <section className="section">
        <div className="container">
          <ContattiClient
            phone={settings?.phone}
            email={settings?.email}
            address={settings?.address}
            privacyUrl={settings?.privacyPolicyUrl}
          />
        </div>
      </section>
    </div>
  );
}

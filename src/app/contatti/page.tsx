import { getSiteSettings } from "@/lib/queries";
import { PageHero } from "@/components/PageHero";
import { ContattiClient } from "../_components/ContattiClient";

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
          />
        </div>
      </section>
    </div>
  );
}

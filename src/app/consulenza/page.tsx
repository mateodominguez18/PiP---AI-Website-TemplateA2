import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { consultingAreas } from "@/data/mockData";
import { PageHero } from "@/components/PageHero";
import { ConsultingCard } from "@/components/ConsultingCard";

export default function ConsulenzaPage() {
  return (
    <div>
      <PageHero
        title="Aree di consulenza"
        subtitle="Assistenza specializzata nelle principali discipline professionali dello studio: fiscale, societario, del lavoro e internazionale."
        breadcrumbs={[{ label: "Consulenza" }]}
        eyebrow="Le nostre competenze"
      />

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
              marginBottom: "4rem",
            }}
          >
            {consultingAreas.map((area) => (
              <ConsultingCard key={area.id} area={area} variant="grid" />
            ))}
          </div>

          <div
            className="card"
            style={{
              padding: "3rem",
              background: `linear-gradient(135deg, var(--brand-navy-dark) 0%, var(--brand-navy) 100%)`,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.375rem", fontWeight: 600, color: "white", marginBottom: "0.5rem" }}>
                Non trovi la consulenza che cerchi?
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", maxWidth: "32rem" }}>
                Contattaci e descrivi la tua situazione: valuteremo insieme come possiamo assisterti, anche in ambiti non elencati.
              </p>
            </div>
            <Link href="/contatti" className="btn-teal" style={{ flexShrink: 0 }}>
              Contattaci
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

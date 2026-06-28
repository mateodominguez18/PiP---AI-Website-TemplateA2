import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, BookOpen, FileText, Building2, Users, TrendingUp, Globe } from "lucide-react";
import { getConsultingArea, getConsultingAreas, getConsultingAreaSlugs, getSiteSettings, getSiteUrl } from "@/lib/queries";
import { PageHero } from "@/components/PageHero";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ConsultingCard } from "@/components/ConsultingCard";
import { buildTitle, cityFromAddress } from "@/lib/seo";

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>> = {
  BookOpen, FileText, Building2, Users, TrendingUp, Globe,
};

export async function generateStaticParams() {
  const slugs = await getConsultingAreaSlugs();
  return slugs.map((slug) => ({ slug }));
}

// SEO della singola area, dai dati di Sanity. Nome studio e città vengono da siteSettings;
// buildTitle toglie " a <città>" se il titolo completo supererebbe il limite di ~60 caratteri di Google.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [area, settings] = await Promise.all([getConsultingArea(slug), getSiteSettings()]);
  const studio = settings?.studioName || "Brambilla & Associati";
  if (!area) return { title: `Area non trovata – ${studio}` };

  const city = cityFromAddress(settings?.address);
  return {
    title: buildTitle(area.title, studio, city),
    description: (area.shortDescription ?? "").slice(0, 158) ||
      `Consulenza in ${area.title.toLowerCase()} a ${city} dello studio ${studio}.`,
    alternates: { canonical: `/consulenza/${slug}` },
  };
}

export default async function ConsulenzaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [area, allAreas] = await Promise.all([getConsultingArea(slug), getConsultingAreas()]);

  if (!area) notFound();

  const otherAreas = allAreas.filter((a) => a.slug !== slug).slice(0, 3);
  const Icon = iconMap[area.icon ?? ""] ?? FileText;
  const SITE_URL = await getSiteUrl();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Consulenza", "item": `${SITE_URL}/consulenza` },
      { "@type": "ListItem", "position": 3, "name": area.title },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        title={area.title}
        subtitle={area.shortDescription}
        breadcrumbs={[{ label: "Consulenza", href: "/consulenza" }, { label: area.title }]}
        eyebrow={area.targetClients}
        cta={{ label: "Richiedi consulenza", href: "/contatti" }}
      />

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem", alignItems: "start" }} className="detail-grid">
            <div>
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem", backgroundColor: "var(--action-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={22} strokeWidth={1.75} style={{ color: "var(--brand-navy)" }} />
                  </div>
                  <h2 className="section-title" style={{ color: "var(--foreground-default)" }}>Cosa facciamo</h2>
                </div>
                <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--foreground-muted)" }}>{area.fullDescription}</p>
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <h3 className="section-title" style={{ color: "var(--foreground-default)", marginBottom: "1.25rem" }}>Attività principali</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }} className="activities-grid">
                  {(area.activities ?? []).map((activity, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", padding: "0.875rem 1rem", borderRadius: "0.5rem", backgroundColor: "var(--surface-muted)" }}>
                      <CheckCircle2 size={16} style={{ color: "var(--brand-teal)", flexShrink: 0, marginTop: "0.125rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "var(--foreground-default)", lineHeight: 1.5 }}>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <h3 className="section-title" style={{ color: "var(--foreground-default)", marginBottom: "1.25rem" }}>I vantaggi per il cliente</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {(area.benefits ?? []).map((benefit, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", padding: "1.25rem", borderRadius: "0.625rem", border: "1px solid var(--border-default)", backgroundColor: "var(--surface-card)" }}>
                      <div style={{ width: "1.75rem", height: "1.75rem", borderRadius: "50%", backgroundColor: "rgba(42,127,111,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--brand-teal)" }}>{i + 1}</span>
                      </div>
                      <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--foreground-default)" }}>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {(area.faq ?? []).length > 0 && (
                <div>
                  <h3 className="section-title" style={{ color: "var(--foreground-default)", marginBottom: "1.25rem" }}>Domande frequenti</h3>
                  <FAQAccordion items={area.faq!} />
                </div>
              )}
            </div>

            <div style={{ position: "sticky", top: "5.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className="card" style={{ padding: "1.75rem", background: `linear-gradient(160deg, var(--brand-navy-dark) 0%, var(--brand-navy) 100%)`, border: "none" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "white", marginBottom: "0.75rem" }}>Serve assistenza su {area.title.toLowerCase()}?</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "rgba(255,255,255,0.7)", marginBottom: "1.25rem" }}>Contattaci per una prima valutazione. Un professionista dedicato ti risponderà entro 24 ore.</p>
                <Link href="/contatti" className="btn-teal" style={{ width: "100%", justifyContent: "center" }}>Richiedi consulenza</Link>
              </div>

              <div className="card" style={{ padding: "1.5rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--foreground-muted)", marginBottom: "0.75rem" }}>A chi è rivolto</p>
                <p style={{ fontSize: "0.9rem", color: "var(--foreground-default)", lineHeight: 1.6 }}>{area.targetClients}</p>
              </div>

              {otherAreas.length > 0 && (
                <div className="card" style={{ padding: "1.5rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--foreground-muted)", marginBottom: "1rem" }}>Altre aree di consulenza</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {otherAreas.map((a) => (
                      <Link key={a._id} href={`/consulenza/${a.slug}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "var(--foreground-default)", fontSize: "0.875rem", padding: "0.375rem 0", borderBottom: "1px solid var(--border-default)" }}>
                        <ArrowRight size={13} style={{ color: "var(--brand-teal)", flexShrink: 0 }} />
                        {a.title}
                      </Link>
                    ))}
                    <Link href="/consulenza" style={{ fontSize: "0.8125rem", color: "var(--brand-navy)", textDecoration: "none", fontWeight: 500, marginTop: "0.25rem" }}>Vedi tutte →</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr !important; } .activities-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

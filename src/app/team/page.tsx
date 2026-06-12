import { ArrowRight, CheckCircle2, Linkedin } from "lucide-react";
import { getTeamMembers, getSiteSettings } from "@/lib/queries";
import { PageHero } from "@/components/PageHero";
import type { SanityTeamMember } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brambilla-associati.it";
const PLACEHOLDER = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default async function TeamPage() {
  const [teamMembers, settings] = await Promise.all([getTeamMembers(), getSiteSettings()]);
  const recruitingEmail = settings?.recruitingEmail || "recruiting@brambilla-associati.it";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Team" },
    ],
  };

  const personSchemas = teamMembers.map((member) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}#${slugify(member.name)}`,
    "name": member.name,
    "jobTitle": member.role,
    "description": member.bio,
    "image": member.imageUrl || null,
    "worksFor": { "@id": `${SITE_URL}#studio` },
    "alumniOf": (member.education ?? []).map((edu) => ({ "@type": "EducationalOrganization", "name": edu })),
    "knowsAbout": member.specializations ?? [],
    ...(member.linkedIn && member.linkedIn !== "#" ? { "sameAs": [member.linkedIn] } : {}),
  }));

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {personSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <PageHero
        title="Il Team"
        subtitle="Professionisti qualificati e iscritti ai rispettivi Ordini, con formazione specialistica e aggiornamento normativo continuo."
        breadcrumbs={[{ label: "Team" }]}
        eyebrow="I nostri professionisti"
      />

      <section className="section">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {teamMembers.map((member, idx) => (
              <div key={member._id} className="card" style={{ overflow: "hidden", display: "grid", gridTemplateColumns: idx % 2 === 0 ? "22rem 1fr" : "1fr 22rem" }}>
                {idx % 2 === 0 ? (
                  <>
                    <div style={{ height: "100%", minHeight: "22rem" }}>
                      <img src={member.imageUrl || PLACEHOLDER} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                    </div>
                    <div style={{ padding: "2.5rem" }}><TeamMemberContent member={member} /></div>
                  </>
                ) : (
                  <>
                    <div style={{ padding: "2.5rem" }}><TeamMemberContent member={member} /></div>
                    <div style={{ height: "100%", minHeight: "22rem" }}>
                      <img src={member.imageUrl || PLACEHOLDER} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: "48rem", textAlign: "center" }}>
          <h2 className="section-title" style={{ color: "var(--foreground-default)", marginBottom: "1rem" }}>Vuoi entrare nel team?</h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--foreground-muted)", marginBottom: "1.75rem" }}>
            Lo studio è sempre alla ricerca di professionisti motivati e con solida preparazione in ambito fiscale, societario o del lavoro. Inviaci il tuo curriculum.
          </p>
          <a href={`mailto:${recruitingEmail}`} className="btn-primary">Invia curriculum <ArrowRight size={15} /></a>
        </div>
      </section>

      <style>{`@media (max-width: 900px) { .team-card-full { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function TeamMemberContent({ member }: { member: SanityTeamMember }) {
  return (
    <>
      <div style={{ marginBottom: "1.25rem" }}>
        <p className="eyebrow" style={{ color: "var(--brand-teal)", marginBottom: "0.25rem" }}>{member.title}</p>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--foreground-default)", marginBottom: "0.25rem", letterSpacing: "-0.01em" }}>{member.name}</h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--foreground-muted)" }}>{member.role}</p>
      </div>
      <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--foreground-muted)", marginBottom: "1.5rem" }}>{member.bioExtended}</p>
      <div style={{ marginBottom: "1.25rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--foreground-muted)", marginBottom: "0.625rem" }}>Formazione</p>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          {(member.education ?? []).map((edu, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.875rem", color: "var(--foreground-default)" }}>
              <CheckCircle2 size={14} style={{ color: "var(--brand-teal)", flexShrink: 0, marginTop: "0.125rem" }} />
              {edu}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--foreground-muted)", marginBottom: "0.625rem" }}>Specializzazioni</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {(member.specializations ?? []).map((spec) => <span key={spec} className="badge badge-navy">{spec}</span>)}
        </div>
      </div>
      {member.linkedIn && member.linkedIn !== "#" && (
        <a href={member.linkedIn} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 500, color: "var(--brand-navy)", textDecoration: "none" }}>
          <Linkedin size={15} /> Profilo LinkedIn
        </a>
      )}
    </>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Users,
  Clock,
  Award,
  PhoneCall,
  Calendar,
  BookOpen,
} from "lucide-react";
import { consultingAreas, taxDeadlines, articles, teamMembers, STUDIO_NAME, STUDIO_PHONE, STUDIO_EMAIL } from "@/data/mockData";
import { ConsultingCard } from "@/components/ConsultingCard";
import { ArticleCard } from "@/components/ArticleCard";
import { TeamCard } from "@/components/TeamCard";

const differentiators = [
  { icon: BookOpen, title: "Aggiornamento normativo costante", description: "Seguiamo quotidianamente l'evoluzione della normativa tributaria, le circolari dell'Agenzia delle Entrate e la giurisprudenza. I nostri clienti ricevono proattivamente le informazioni rilevanti per la loro situazione." },
  { icon: Users, title: "Interlocutore dedicato", description: "Ogni cliente ha un professionista di riferimento specifico. Nessun call center, nessun rimbalzo tra uffici: risposta diretta alle richieste, sempre dallo stesso interlocutore qualificato." },
  { icon: Shield, title: "Esperienza multidisciplinare", description: "Il nostro team integra competenze fiscali, societarie e del lavoro. Affrontiamo i problemi nella loro complessità reale, senza frammentare l'analisi in silos separati." },
  { icon: Award, title: "Approccio personalizzato", description: "Non esistono soluzioni standard. Ogni consulenza parte da un'analisi puntuale della situazione del cliente, degli obiettivi e del contesto, per arrivare alla risposta concretamente più utile." },
  { icon: Clock, title: "Tempestività e rispetto delle scadenze", description: "Gestiamo tutte le scadenze fiscali e civilistiche con un sistema di monitoraggio interno. Il cliente non deve preoccuparsi di ricordare termini: ci pensiamo noi." },
];

const trustMetrics = [
  { value: "22+", label: "Anni di attività" },
  { value: "300+", label: "Clienti assistiti" },
  { value: "4", label: "Professionisti dedicati" },
  { value: "100%", label: "Assistenza diretta" },
];

export default function HomePage() {
  const upcomingDeadlines = taxDeadlines.slice(0, 5);
  const featuredArticles = articles.slice(0, 3);
  const previewTeam = teamMembers.slice(0, 4);

  const [miniForm, setMiniForm] = React.useState({ nome: "", cognome: "", email: "", service: "", messaggio: "" });
  const [miniSent, setMiniSent] = React.useState(false);
  const [miniLoading, setMiniLoading] = React.useState(false);
  const [miniError, setMiniError] = React.useState("");

  const handleMiniSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMiniLoading(true);
    setMiniError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...miniForm, source: "homepage" }),
      });
      if (!res.ok) throw new Error();
      setMiniSent(true);
    } catch {
      setMiniError("Errore nell'invio. Riprova o contattaci via email.");
    } finally {
      setMiniLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(135deg, var(--brand-navy-dark) 0%, var(--brand-navy) 60%, var(--brand-navy-light) 100%)`,
          paddingTop: "5rem",
          paddingBottom: "5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 50%, rgba(42,127,111,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="hero-grid">
            <div>
              <p className="eyebrow" style={{ color: "var(--brand-teal-light)", marginBottom: "1rem" }}>
                Studio Professionale · Milano dal 2002
              </p>
              <h1 className="display-xl" style={{ color: "white", marginBottom: "1.25rem" }}>
                Consulenza fiscale e societaria per imprenditori e PMI
              </h1>
              <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.72)", marginBottom: "2rem", maxWidth: "32rem" }}>
                Assistenza qualificata in ambito tributario, societario e del lavoro. Aggiornamento normativo sistematico e interlocutore dedicato per ogni cliente.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                <Link href="/contatti" className="btn-teal">Richiedi una consulenza</Link>
                <Link href="/consulenza" className="btn-outline">
                  Le nostre aree
                  <ArrowRight size={15} />
                </Link>
              </div>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {["ODCEC Milano", "Revisori Legali MEF", "Consulenti del Lavoro"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--brand-teal-light)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.65)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="hero-image-col">
              <div style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
                <img
                  src="https://images.unsplash.com/photo-1758518727077-ffb66ffccced?w=800&h=500&fit=crop"
                  alt="Consulenti professionisti in riunione"
                  style={{ width: "100%", height: "22rem", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.12)", overflow: "hidden" }}>
                {trustMetrics.map((metric, i) => (
                  <div key={i} style={{ padding: "1rem 0.5rem", textAlign: "center", borderRight: i < trustMetrics.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                    <p style={{ fontSize: "1.375rem", fontWeight: 700, color: "white", lineHeight: 1 }}>{metric.value}</p>
                    <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", marginTop: "0.25rem", lineHeight: 1.3 }}>{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            .hero-image-col { display: none !important; }
          }
        `}</style>
      </section>

      {/* Aree di consulenza */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ color: "var(--brand-teal)", marginBottom: "0.625rem" }}>Le nostre competenze</p>
            <h2 className="section-title" style={{ color: "var(--foreground-default)", marginBottom: "0.875rem" }}>Aree di consulenza</h2>
            <p style={{ fontSize: "1.0625rem", color: "var(--foreground-muted)", maxWidth: "34rem", margin: "0 auto" }}>
              Assistenza specializzata nelle principali discipline professionali del commercialista, del consulente fiscale e del consulente del lavoro.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
            {consultingAreas.map((area) => (
              <ConsultingCard key={area.id} area={area} variant="grid" />
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/consulenza" className="btn-secondary">
              Vedi tutte le aree
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Scadenze in evidenza */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3.5rem", alignItems: "start" }} className="deadlines-grid">
            <div>
              <p className="eyebrow" style={{ color: "var(--brand-teal)", marginBottom: "0.625rem" }}>Calendario fiscale</p>
              <h2 className="section-title" style={{ color: "var(--foreground-default)", marginBottom: "1rem" }}>Prossime scadenze fiscali</h2>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--foreground-muted)", marginBottom: "1.5rem" }}>
                Teniamo traccia di tutti gli adempimenti rilevanti. Il calendario è aggiornato con le principali scadenze per imprese, professionisti e persone fisiche.
              </p>
              <Link href="/scadenze" className="btn-primary">
                Calendario completo
                <ArrowRight size={15} />
              </Link>
            </div>
            <div>
              <div className="card" style={{ overflow: "hidden" }}>
                <table className="deadline-table">
                  <thead>
                    <tr>
                      <th style={{ width: "7rem" }}>Data</th>
                      <th>Adempimento</th>
                      <th style={{ width: "6rem" }}>Categoria</th>
                      <th style={{ width: "5rem" }}>Priorità</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingDeadlines.map((d) => (
                      <tr key={d.id}>
                        <td><span style={{ fontWeight: 500, color: "var(--foreground-default)", fontSize: "0.875rem" }}>{d.date}</span></td>
                        <td>
                          <p style={{ fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground-default)", marginBottom: "0.125rem" }}>{d.title}</p>
                          <p style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)" }}>{d.audience}</p>
                        </td>
                        <td><span className="badge badge-gray" style={{ fontSize: "0.6875rem" }}>{d.category}</span></td>
                        <td>
                          <span className={`badge ${d.priority === "alta" ? "badge-red" : d.priority === "media" ? "badge-teal" : "badge-gray"}`} style={{ fontSize: "0.6875rem" }}>
                            {d.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .deadlines-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Guide e Novità */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <p className="eyebrow" style={{ color: "var(--brand-teal)", marginBottom: "0.625rem" }}>Aggiornamento normativo</p>
              <h2 className="section-title" style={{ color: "var(--foreground-default)" }}>Guide e Novità fiscali</h2>
            </div>
            <Link href="/guide" className="btn-secondary" style={{ flexShrink: 0 }}>
              Tutti gli articoli
              <ArrowRight size={15} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Perché scegliere lo studio */}
      <section className="section" style={{ background: `linear-gradient(180deg, var(--brand-navy-dark) 0%, var(--brand-navy) 100%)` }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ color: "var(--brand-teal-light)", marginBottom: "0.625rem" }}>Il nostro approccio</p>
            <h2 className="section-title" style={{ color: "white" }}>Perché scegliere lo Studio</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ padding: "1.75rem", borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}>
                  <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.625rem", backgroundColor: "rgba(42,127,111,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <Icon size={20} style={{ color: "var(--brand-teal-light)" }} strokeWidth={1.75} />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "white", marginBottom: "0.625rem" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team anteprima */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ color: "var(--brand-teal)", marginBottom: "0.625rem" }}>I professionisti</p>
            <h2 className="section-title" style={{ color: "var(--foreground-default)" }}>Il Team</h2>
            <p style={{ fontSize: "1rem", color: "var(--foreground-muted)", maxWidth: "32rem", margin: "0.75rem auto 0" }}>
              Professionisti iscritti ai rispettivi Ordini con formazione specialistica e continuo aggiornamento normativo.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
            {previewTeam.map((member) => (
              <TeamCard key={member.id} member={member} compact />
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/team" className="btn-secondary">
              Conosci il team
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contattaci */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="contact-grid">
            <div>
              <p className="eyebrow" style={{ color: "var(--brand-teal)", marginBottom: "0.625rem" }}>Parlaci del tuo progetto</p>
              <h2 className="section-title" style={{ color: "var(--foreground-default)", marginBottom: "1rem" }}>Richiedi una prima consulenza</h2>
              <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--foreground-muted)", marginBottom: "1.75rem" }}>
                Raccontaci la tua situazione e un nostro professionista ti contatterà entro 24 ore lavorative per valutare insieme come possiamo assisterti.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <a href={`tel:${STUDIO_PHONE}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "var(--action-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <PhoneCall size={16} style={{ color: "var(--brand-navy)" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)", marginBottom: "0.125rem" }}>Telefono</p>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--foreground-default)" }}>{STUDIO_PHONE}</p>
                  </div>
                </a>
                <a href={`mailto:${STUDIO_EMAIL}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "var(--action-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Calendar size={16} style={{ color: "var(--brand-navy)" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)", marginBottom: "0.125rem" }}>Email</p>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--foreground-default)" }}>{STUDIO_EMAIL}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--foreground-default)", marginBottom: "1.5rem" }}>
                Inviaci un messaggio
              </h3>
              {miniSent ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", backgroundColor: "rgba(42,127,111,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                    <CheckCircle2 size={22} style={{ color: "var(--brand-teal)" }} />
                  </div>
                  <p style={{ fontWeight: 600, color: "var(--foreground-default)", marginBottom: "0.375rem" }}>Richiesta inviata!</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--foreground-muted)" }}>Ti contatteremo entro 24 ore lavorative.</p>
                </div>
              ) : (
                <form onSubmit={handleMiniSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                    <div>
                      <label className="form-label">Nome *</label>
                      <input className="form-input" type="text" placeholder="Mario" required value={miniForm.nome} onChange={(e) => setMiniForm({ ...miniForm, nome: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Cognome *</label>
                      <input className="form-input" type="text" placeholder="Rossi" required value={miniForm.cognome} onChange={(e) => setMiniForm({ ...miniForm, cognome: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" placeholder="mario.rossi@esempio.it" required value={miniForm.email} onChange={(e) => setMiniForm({ ...miniForm, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="form-label">Tipo di richiesta</label>
                    <select className="form-select" value={miniForm.service} onChange={(e) => setMiniForm({ ...miniForm, service: e.target.value })}>
                      <option value="">Seleziona...</option>
                      <option>Contabilità e bilancio</option>
                      <option>Consulenza fiscale</option>
                      <option>Diritto societario</option>
                      <option>Lavoro e paghe</option>
                      <option>Operazioni straordinarie</option>
                      <option>Fiscalità internazionale</option>
                      <option>Altro</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Messaggio *</label>
                    <textarea className="form-textarea" placeholder="Descrivici brevemente la tua situazione..." required value={miniForm.messaggio} onChange={(e) => setMiniForm({ ...miniForm, messaggio: e.target.value })} />
                  </div>
                  {miniError && (
                    <p style={{ fontSize: "0.8125rem", color: "var(--action-destructive)", padding: "0.625rem 0.875rem", backgroundColor: "#fff0f3", borderRadius: "0.5rem", border: "1px solid rgba(212,24,61,0.2)" }}>
                      {miniError}
                    </p>
                  )}
                  <button type="submit" disabled={miniLoading} className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.25rem", opacity: miniLoading ? 0.7 : 1 }}>
                    {miniLoading ? "Invio in corso…" : "Invia richiesta"}
                    {!miniLoading && <ArrowRight size={15} />}
                  </button>
                  <p style={{ fontSize: "0.75rem", color: "var(--foreground-muted)", textAlign: "center" }}>
                    I tuoi dati saranno trattati nel rispetto della{" "}
                    <Link href="/privacy" style={{ color: "var(--brand-navy)" }}>Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </div>
  );
}

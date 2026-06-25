// Client component per /contatti: il modulo di contatto completo più i dati di contatto
// dello studio. Estratto a parte così la pagina può restare un server component che recupera
// le impostazioni dello studio (telefono, email, indirizzo) da Sanity e le passa come props.
"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, Send } from "lucide-react";

interface ContattiClientProps {
  phone?: string;
  email?: string;
  address?: string;
}

const clientTypes = [
  { value: "privato", label: "Privato" },
  { value: "professionista", label: "Professionista / Freelance" },
  { value: "piva", label: "Partita IVA / Autonomo" },
  { value: "societa", label: "Società / Impresa" },
  { value: "gruppo", label: "Gruppo societario" },
];

const serviceTypes = [
  "Contabilità e bilancio",
  "Consulenza fiscale",
  "Diritto societario",
  "Lavoro e paghe",
  "Operazioni straordinarie",
  "Fiscalità internazionale",
  "Primo contatto / Informazioni",
  "Altro",
];

export function ContattiClient({
  phone = "+39 02 123456",
  email = "info@brambilla-associati.it",
  address = "Via Montenapoleone 8, 20121 Milano",
}: ContattiClientProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    clientType: "",
    service: "",
    messaggio: "",
    privacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contatti" }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Si è verificato un errore. Riprova o contattaci direttamente via email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}
      className="contact-layout"
    >
      {/* Dati di contatto */}
      <div>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground-default)", marginBottom: "1.75rem" }}>
          Informazioni di contatto
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
          {[
            { Icon: Phone, label: "Telefono", value: phone, href: `tel:${phone}` },
            { Icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
          ].map(({ Icon, label, value, href }) => (
            <div key={label} style={{ display: "flex", gap: "1rem" }}>
              <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", backgroundColor: "var(--action-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={16} style={{ color: "var(--brand-navy)" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--foreground-muted)", marginBottom: "0.25rem" }}>
                  {label}
                </p>
                <a href={href} style={{ fontWeight: 500, color: "var(--foreground-default)", textDecoration: "none" }}>
                  {value}
                </a>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", backgroundColor: "var(--action-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <MapPin size={16} style={{ color: "var(--brand-navy)" }} />
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--foreground-muted)", marginBottom: "0.25rem" }}>Indirizzo</p>
              <p style={{ fontWeight: 500, color: "var(--foreground-default)", lineHeight: 1.5 }}>{address}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", backgroundColor: "var(--action-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Clock size={16} style={{ color: "var(--brand-navy)" }} />
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--foreground-muted)", marginBottom: "0.25rem" }}>Orari</p>
              <p style={{ fontWeight: 500, color: "var(--foreground-default)", lineHeight: 1.6 }}>
                Lunedì – Venerdì<br />
                9:00 – 13:00 / 14:30 – 18:00<br />
                <span style={{ fontSize: "0.875rem", color: "var(--foreground-muted)" }}>Su appuntamento</span>
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: "0.75rem",
            overflow: "hidden",
            border: "1px solid var(--border-default)",
            backgroundColor: "var(--surface-muted)",
            height: "14rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <MapPin size={28} style={{ color: "var(--foreground-muted)" }} />
          <div style={{ textAlign: "center" }}>
            <p style={{ fontWeight: 500, color: "var(--foreground-default)", fontSize: "0.9rem" }}>{address.split(",")[0]}</p>
            <p style={{ fontSize: "0.875rem", color: "var(--foreground-muted)" }}>{address.split(",").slice(1).join(",").trim()}</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.8125rem", color: "var(--brand-navy)", fontWeight: 500, textDecoration: "none" }}
            >
              Apri in Google Maps →
            </a>
          </div>
        </div>
      </div>

      {/* Modulo */}
      <div className="card" style={{ padding: "2.5rem" }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <div
              style={{ width: "4rem", height: "4rem", borderRadius: "50%", backgroundColor: "rgba(42,127,111,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}
            >
              <CheckCircle2 size={28} style={{ color: "var(--brand-teal)" }} />
            </div>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 600, color: "var(--foreground-default)", marginBottom: "0.75rem" }}>
              Richiesta inviata
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--foreground-muted)", lineHeight: 1.7, maxWidth: "28rem", margin: "0 auto 2rem" }}>
              Abbiamo ricevuto la tua richiesta. Un nostro professionista ti contatterà entro 24 ore lavorative.
            </p>
            <button className="btn-secondary" onClick={() => setSent(false)}>
              Invia un&apos;altra richiesta
            </button>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground-default)", marginBottom: "1.75rem" }}>
              Invia una richiesta
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
                <div>
                  <label className="form-label">Nome *</label>
                  <input className="form-input" type="text" placeholder="Mario" required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Cognome *</label>
                  <input className="form-input" type="text" placeholder="Rossi" required value={form.cognome} onChange={(e) => setForm({ ...form, cognome: e.target.value })} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
                <div>
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" placeholder="mario@esempio.it" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Telefono</label>
                  <input className="form-input" type="tel" placeholder="+39 02..." value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="form-label">Sei un *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", marginTop: "0.375rem" }}>
                  {clientTypes.map((ct) => (
                    <button
                      key={ct.value}
                      type="button"
                      onClick={() => setForm({ ...form, clientType: ct.value })}
                      style={{
                        padding: "0.4375rem 0.875rem",
                        borderRadius: "9999px",
                        border: `1.5px solid ${form.clientType === ct.value ? "var(--brand-navy)" : "var(--border-default)"}`,
                        backgroundColor: form.clientType === ct.value ? "var(--action-secondary)" : "transparent",
                        color: form.clientType === ct.value ? "var(--brand-navy)" : "var(--foreground-muted)",
                        fontSize: "0.875rem",
                        fontWeight: form.clientType === ct.value ? 500 : 400,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="form-label">Area di interesse</label>
                <select className="form-select" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                  <option value="">Seleziona un&apos;area...</option>
                  {serviceTypes.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Messaggio *</label>
                <textarea
                  className="form-textarea"
                  placeholder="Descrivi brevemente la tua situazione..."
                  required
                  value={form.messaggio}
                  onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
                  style={{ minHeight: "8rem" }}
                />
              </div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  required
                  checked={form.privacy}
                  onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
                  style={{ marginTop: "0.125rem", accentColor: "var(--brand-navy)", width: "1rem", height: "1rem", flexShrink: 0 }}
                />
                <span style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)", lineHeight: 1.6 }}>
                  Ho letto e accetto la{" "}
                  <a href="/privacy" style={{ color: "var(--brand-navy)" }}>Privacy Policy</a> e acconsento
                  al trattamento dei miei dati personali per la gestione della richiesta. *
                </span>
              </label>
              {error && (
                <p style={{ fontSize: "0.875rem", color: "var(--action-destructive)", padding: "0.75rem 1rem", backgroundColor: "#fff0f3", borderRadius: "0.5rem", border: "1px solid rgba(212,24,61,0.2)" }}>
                  {error}
                </p>
              )}
              <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: "center", marginTop: "0.25rem", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Invio in corso…" : "Invia richiesta"}
                {!loading && <Send size={15} />}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr !important; }
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

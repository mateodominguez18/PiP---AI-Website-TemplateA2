"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HomeContactForm() {
  const [form, setForm] = React.useState({ nome: "", cognome: "", email: "", service: "", messaggio: "" });
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "homepage" }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Errore nell'invio. Riprova o contattaci via email.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "2rem 0" }}>
        <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", backgroundColor: "rgba(42,127,111,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
          <CheckCircle2 size={22} style={{ color: "var(--brand-teal)" }} />
        </div>
        <p style={{ fontWeight: 600, color: "var(--foreground-default)", marginBottom: "0.375rem" }}>Richiesta inviata!</p>
        <p style={{ fontSize: "0.875rem", color: "var(--foreground-muted)" }}>Ti contatteremo entro 24 ore lavorative.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
        <div>
          <label className="form-label">Nome *</label>
          <input className="form-input" type="text" placeholder="Mario" required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        </div>
        <div>
          <label className="form-label">Cognome *</label>
          <input className="form-input" type="text" placeholder="Rossi" required value={form.cognome} onChange={(e) => setForm({ ...form, cognome: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="form-label">Email *</label>
        <input className="form-input" type="email" placeholder="mario.rossi@esempio.it" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <label className="form-label">Tipo di richiesta</label>
        <select className="form-select" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
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
        <textarea className="form-textarea" placeholder="Descrivici brevemente la tua situazione..." required value={form.messaggio} onChange={(e) => setForm({ ...form, messaggio: e.target.value })} />
      </div>
      {error && (
        <p style={{ fontSize: "0.8125rem", color: "var(--action-destructive)", padding: "0.625rem 0.875rem", backgroundColor: "#fff0f3", borderRadius: "0.5rem", border: "1px solid rgba(212,24,61,0.2)" }}>
          {error}
        </p>
      )}
      <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.25rem", opacity: loading ? 0.7 : 1 }}>
        {loading ? "Invio in corso…" : "Invia richiesta"}
        {!loading && <ArrowRight size={15} />}
      </button>
      <p style={{ fontSize: "0.75rem", color: "var(--foreground-muted)", textAlign: "center" }}>
        I tuoi dati saranno trattati nel rispetto della{" "}
        <Link href="/privacy" style={{ color: "var(--brand-navy)" }}>Privacy Policy</Link>.
      </p>
    </form>
  );
}

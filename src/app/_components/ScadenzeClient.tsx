// Client component for /scadenze. The page server-fetches the deadlines and passes
// them in as props; this component owns the interactive filtering (search + month +
// category + priority) and groups the results by month for display.
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar } from "lucide-react";
import type { SanityTaxDeadline } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const months = ["Tutti", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const categories = ["Tutte", "Adempimenti mensili", "IVA", "IRPEF", "Dichiarazioni", "Sostituti d'imposta", "Regime agevolativo"];
const priorities = ["Tutte", "alta", "media", "bassa"];

export function ScadenzeClient({ deadlines }: { deadlines: SanityTaxDeadline[] }) {
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Tutti");
  const [selectedCategory, setSelectedCategory] = useState("Tutte");
  const [selectedPriority, setSelectedPriority] = useState("Tutte");

  const filtered = deadlines.filter((d) => {
    const matchSearch =
      !search ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      (d.description ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (d.audience ?? "").toLowerCase().includes(search.toLowerCase());
    // Sanity stores month as "Giugno 2025"; filter options are just "Giugno" — startsWith matches without caring about the year.
    const matchMonth = selectedMonth === "Tutti" || (d.month ?? "").startsWith(selectedMonth);
    const matchCategory = selectedCategory === "Tutte" || d.category === selectedCategory;
    const matchPriority = selectedPriority === "Tutte" || d.priority === selectedPriority;
    return matchSearch && matchMonth && matchCategory && matchPriority;
  });

  const grouped: Record<string, SanityTaxDeadline[]> = {};
  filtered.forEach((d) => {
    const key = d.month ?? "Altro";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(d);
  });

  return (
    <>
      <div className="card" style={{ padding: "1.5rem", marginBottom: "2.5rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end" }}>
        <div style={{ flex: "1 1 16rem" }}>
          <label className="form-label">Cerca</label>
          <div style={{ position: "relative" }}>
            <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--foreground-muted)", pointerEvents: "none" }} />
            <input className="form-input" type="text" placeholder="Ricerca per parola chiave..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "2.25rem" }} />
          </div>
        </div>
        <div style={{ flex: "1 1 10rem" }}>
          <label className="form-label">Mese</label>
          <select className="form-select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {months.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div style={{ flex: "1 1 12rem" }}>
          <label className="form-label">Categoria</label>
          <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ flex: "1 1 8rem" }}>
          <label className="form-label">Priorità</label>
          <select className="form-select" value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}>
            {priorities.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1.25rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {[{ label: "Alta priorità", cls: "badge-red" }, { label: "Media priorità", cls: "badge-teal" }, { label: "Bassa priorità", cls: "badge-gray" }].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className={`badge ${item.cls}`} style={{ fontSize: "0.6875rem" }}>{item.label.split(" ")[0].toLowerCase()}</span>
            <span style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)" }}>{item.label}</span>
          </div>
        ))}
        <span style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)", marginLeft: "auto" }}>
          {filtered.length} scadenz{filtered.length === 1 ? "a" : "e"} trovata{filtered.length === 1 ? "" : "e"}
        </span>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--foreground-muted)" }}>
          <Calendar size={40} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
          <p>Nessuna scadenza trovata per i filtri selezionati.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([month, items]) => (
          <div key={month} style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", paddingBottom: "0.625rem", borderBottom: "2px solid var(--brand-navy)" }}>
              <Calendar size={18} style={{ color: "var(--brand-navy)" }} />
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--brand-navy)" }}>{month}</h2>
              <span className="badge badge-navy" style={{ marginLeft: "auto" }}>{items.length} scadenz{items.length === 1 ? "a" : "e"}</span>
            </div>
            <div className="card" style={{ overflow: "hidden" }}>
              <table className="deadline-table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "7.5rem" }}>Data</th>
                    <th>Adempimento</th>
                    <th style={{ width: "8rem" }}>Categoria</th>
                    <th style={{ width: "8rem" }}>Destinatari</th>
                    <th style={{ width: "5.5rem" }}>Priorità</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((d) => (
                    <tr key={d._id}>
                      <td><span style={{ fontWeight: 600, color: "var(--foreground-default)", fontSize: "0.9rem" }}>{formatDate(d.date)}</span></td>
                      <td>
                        <p style={{ fontWeight: 500, fontSize: "0.9rem", color: "var(--foreground-default)", marginBottom: "0.25rem" }}>{d.title}</p>
                        <p style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)", lineHeight: 1.5 }}>{d.description}</p>
                      </td>
                      <td><span className="badge badge-gray" style={{ fontSize: "0.6875rem" }}>{d.category}</span></td>
                      <td><span style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)" }}>{d.audience}</span></td>
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
        ))
      )}

      <div className="card" style={{ padding: "1.5rem", backgroundColor: "var(--action-secondary)", border: "none", marginTop: "2rem" }}>
        <p style={{ fontSize: "0.875rem", color: "var(--brand-navy)", lineHeight: 1.6 }}>
          <strong>Nota:</strong> Le date riportate possono essere soggette a proroghe o modifiche normative.
          Per la gestione puntuale degli adempimenti del tuo studio o della tua impresa, contattaci.{" "}
          <Link href="/contatti" style={{ color: "var(--brand-navy)", textDecoration: "underline" }}>Richiedi assistenza →</Link>
        </p>
      </div>
    </>
  );
}

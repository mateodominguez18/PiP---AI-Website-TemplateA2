"use client";

import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { articles } from "@/data/mockData";
import { PageHero } from "@/components/PageHero";
import { ArticleCard } from "@/components/ArticleCard";

const allCategories = ["Tutte", ...Array.from(new Set(articles.map((a) => a.category)))];

export default function GuidePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutte");

  const filtered = articles.filter((a) => {
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = selectedCategory === "Tutte" || a.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      <PageHero
        title="Guide e Novità Fiscali"
        subtitle="Analisi normative, guide pratiche e aggiornamenti su fiscalità, diritto societario e lavoro redatti dai professionisti dello studio."
        breadcrumbs={[{ label: "Guide e Novità" }]}
        eyebrow="Aggiornamento normativo"
      />

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "3rem", alignItems: "start" }} className="guide-layout">
            {/* Sidebar */}
            <div style={{ position: "sticky", top: "5.5rem" }}>
              <div style={{ marginBottom: "1.75rem" }}>
                <label className="form-label">Cerca negli articoli</label>
                <div style={{ position: "relative" }}>
                  <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--foreground-muted)", pointerEvents: "none" }} />
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Parola chiave..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ paddingLeft: "2.25rem" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.75rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--foreground-muted)", marginBottom: "0.75rem" }}>
                  Categorie
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: "0.5rem 0.875rem",
                        borderRadius: "0.5rem",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        fontSize: "0.875rem",
                        fontWeight: selectedCategory === cat ? 600 : 400,
                        backgroundColor: selectedCategory === cat ? "var(--action-secondary)" : "transparent",
                        color: selectedCategory === cat ? "var(--brand-navy)" : "var(--foreground-muted)",
                        transition: "all 0.15s",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--foreground-muted)", marginBottom: "0.75rem" }}>
                  Argomenti frequenti
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                  {Array.from(new Set(articles.flatMap((a) => a.tags)))
                    .slice(0, 12)
                    .map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearch(tag)}
                        className="badge badge-navy"
                        style={{ cursor: "pointer", border: "none" }}
                      >
                        {tag}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Articoli */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--foreground-muted)" }}>
                  {filtered.length} articol{filtered.length === 1 ? "o" : "i"} trovato{filtered.length === 1 ? "" : "i"}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--foreground-muted)" }}>
                  <BookOpen size={40} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
                  <p>Nessun articolo trovato per i filtri selezionati.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
                  {filtered.map((article) => (
                    <ArticleCard key={article.id} article={article} featured />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .guide-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

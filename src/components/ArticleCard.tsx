import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { SanityArticle } from "@/lib/types";
import { formatDate } from "@/lib/utils";

// Scheda di un articolo. `featured` mostra la card grande con immagine in alto usata nelle
// griglie; altrimenti mostra una riga compatta con miniatura usata nelle sidebar. Se l'articolo
// non ha un'immagine di copertina in Sanity, usa un'immagine segnaposto.
interface ArticleCardProps {
  article: SanityArticle;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const dateDisplay = formatDate(article.date);
  const placeholder = "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=450&fit=crop";
  const imgSrc = article.imageUrl || placeholder;

  if (featured) {
    return (
      <div className="card card-hover" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div className="article-img-wrap">
          <img src={imgSrc} alt={article.imageAlt || article.title} />
        </div>
        <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
            <span className="badge badge-navy">{article.category}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "var(--foreground-muted)" }}>
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>
          <h3 className="card-title" style={{ color: "var(--foreground-default)", marginBottom: "0.625rem", flex: 1 }}>{article.title}</h3>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--foreground-muted)", marginBottom: "1rem" }}>
            {(article.excerpt ?? "").substring(0, 120)}…
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)" }}>{dateDisplay}</span>
            <Link href={`/guide/${article.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.875rem", fontWeight: 500, color: "var(--brand-navy)", textDecoration: "none" }}>
              Leggi <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ display: "flex", gap: "1rem", padding: "1.25rem", alignItems: "flex-start" }}>
      <div style={{ width: "5rem", height: "4rem", borderRadius: "0.5rem", overflow: "hidden", flexShrink: 0 }}>
        <img src={imgSrc} alt={article.imageAlt || article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span className="badge badge-gray" style={{ marginBottom: "0.375rem" }}>{article.category}</span>
        <h4 style={{ fontSize: "0.9rem", lineHeight: 1.4, color: "var(--foreground-default)", fontWeight: 500, marginBottom: "0.25rem" }}>{article.title}</h4>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)" }}>{dateDisplay}</span>
          <Link href={`/guide/${article.slug}`} style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--brand-navy)", textDecoration: "none" }}>
            Leggi →
          </Link>
        </div>
      </div>
    </div>
  );
}

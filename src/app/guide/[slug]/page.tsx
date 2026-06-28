import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User, Tag, ArrowRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getArticle, getArticles, getArticleSlugs, getSiteSettings, getSiteUrl } from "@/lib/queries";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ArticleCard } from "@/components/ArticleCard";
import { formatDateFull } from "@/lib/utils";

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=450&fit=crop";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// SEO del singolo articolo, da Sanity. I titoli degli articoli sono già lunghi e ricchi di
// parole chiave, quindi il suffisso del brand viene omesso per evitare un title troppo lungo e troncato.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [article, settings] = await Promise.all([getArticle(slug), getSiteSettings()]);
  if (!article) return { title: `Articolo non trovato – ${settings?.studioName || "Brambilla & Associati"}` };

  return {
    title: article.title,
    description: (article.excerpt ?? "").slice(0, 158) || undefined,
    alternates: { canonical: `/guide/${slug}` },
  };
}

const ptComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="section-title" style={{ color: "var(--foreground-default)", marginTop: "2rem", marginBottom: "0.875rem" }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--foreground-default)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "var(--foreground-muted)", marginBottom: "1.25rem" }}>{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ color: "var(--foreground-default)" }}>{children}</strong>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.375rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}>{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.375rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}>{children}</li>
    ),
  },
};

const defaultFAQ = [
  { question: "Come posso ricevere aggiornamenti sulle novità fiscali?", answer: "Iscriviti alla nostra newsletter o contattaci per essere aggiunto alla lista dei clienti che ricevono le nostre circolari periodiche." },
  { question: "Il contenuto dell'articolo si applica alla mia situazione specifica?", answer: "Gli articoli pubblicati hanno carattere generale e informativo. Per valutare l'applicabilità alla tua situazione, ti consigliamo di contattare direttamente uno dei nostri professionisti." },
];

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticoloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([getArticle(slug), getArticles()]);

  if (!article) notFound();

  const SITE_URL = await getSiteUrl();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);
  const imgSrc = article.imageUrl || PLACEHOLDER_IMG;
  const dateDisplay = formatDateFull(article.date);
  const faqItems = (article.faq ?? []).length > 0 ? article.faq! : defaultFAQ;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Guide", "item": `${SITE_URL}/guide` },
      { "@type": "ListItem", "position": 3, "name": article.title },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "url": `${SITE_URL}/guide/${article.slug}`,
    "datePublished": article.date,
    "description": article.excerpt,
    "image": article.imageUrl ? { "@type": "ImageObject", "url": article.imageUrl } : undefined,
    "author": article.author ? { "@id": `${SITE_URL}#${slugify(article.author)}` } : undefined,
    "publisher": { "@id": `${SITE_URL}#studio` },
  };

  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  } : null;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <section style={{ background: `linear-gradient(135deg, var(--brand-navy-dark) 0%, var(--brand-navy) 100%)`, paddingBlock: "3.5rem" }}>
        <div className="container">
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <Link href="/" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <Link href="/guide" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Guide</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.8)" }}>{article.category}</span>
          </nav>
          <span className="badge badge-teal" style={{ marginBottom: "1rem" }}>{article.category}</span>
          <h1 className="display-md" style={{ color: "white", maxWidth: "50rem", marginBottom: "1.25rem" }}>{article.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
              <User size={14} /> {article.author} · {article.authorRole}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
              <Clock size={14} /> {article.readTime} di lettura
            </span>
            <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>{dateDisplay}</span>
          </div>
        </div>
      </section>

      <div style={{ height: "22rem", overflow: "hidden" }}>
        <img src={imgSrc} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem", alignItems: "start" }} className="article-grid">
            <div>
              <div style={{ borderLeft: "3px solid var(--brand-teal)", paddingLeft: "1.25rem", marginBottom: "2rem" }}>
                <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--foreground-default)", fontStyle: "italic" }}>{article.excerpt}</p>
              </div>

              <div className="prose">
                {article.body && Array.isArray(article.body) && article.body.length > 0 ? (
                  <PortableText value={article.body as Parameters<typeof PortableText>[0]["value"]} components={ptComponents} />
                ) : (
                  <p style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "var(--foreground-muted)" }}>
                    Il contenuto completo di questo articolo è in fase di pubblicazione. Contattaci per ricevere maggiori informazioni su questo argomento.
                  </p>
                )}
              </div>

              <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-default)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
                  <Tag size={15} style={{ color: "var(--foreground-muted)" }} />
                  {(article.tags ?? []).map((tag) => <span key={tag} className="badge badge-navy">{tag}</span>)}
                </div>
              </div>

              <div className="card" style={{ padding: "1.5rem", marginTop: "2rem", display: "flex", gap: "1.25rem", alignItems: "center" }}>
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--action-secondary)" }}>
                  <User size={20} style={{ color: "var(--brand-navy)" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "var(--foreground-default)" }}>{article.author}</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--foreground-muted)" }}>{article.authorRole} — Studio</p>
                </div>
              </div>

              <div style={{ marginTop: "3rem" }}>
                <h2 className="section-title" style={{ color: "var(--foreground-default)", marginBottom: "1.5rem" }}>Domande frequenti</h2>
                <FAQAccordion items={faqItems} />
              </div>

              <div className="card" style={{ padding: "2rem", marginTop: "2.5rem", background: `linear-gradient(135deg, var(--brand-navy-dark), var(--brand-navy))`, border: "none", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "white", marginBottom: "0.625rem" }}>Hai bisogno di consulenza specifica?</h3>
                <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>Contattaci per valutare la tua situazione con un professionista dedicato.</p>
                <Link href="/contatti" className="btn-teal">Richiedi consulenza <ArrowRight size={15} /></Link>
              </div>
            </div>

            <div style={{ position: "sticky", top: "5.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--foreground-muted)", marginBottom: "1rem" }}>Articoli correlati</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {related.map((rel) => <ArticleCard key={rel._id} article={rel} />)}
                </div>
              </div>
              <div className="card" style={{ padding: "1.5rem", background: `linear-gradient(160deg, var(--brand-navy-dark), var(--brand-navy))`, border: "none" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "white", marginBottom: "0.625rem" }}>Assistenza professionale</h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", marginBottom: "1.25rem", lineHeight: 1.6 }}>Hai domande su questo argomento? Parlane con un nostro commercialista.</p>
                <Link href="/contatti" className="btn-teal" style={{ width: "100%", justifyContent: "center" }}>Contattaci</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 900px) { .article-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

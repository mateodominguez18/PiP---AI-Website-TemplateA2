import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User, Tag, ArrowRight } from "lucide-react";
import { articles } from "@/data/mockData";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ArticleCard } from "@/components/ArticleCard";

const articleFAQ = [
  {
    question: "Come posso ricevere aggiornamenti sulle novità fiscali?",
    answer:
      "Iscriviti alla nostra newsletter o contattaci per essere aggiunto alla lista dei clienti che ricevono le nostre circolari periodiche.",
  },
  {
    question: "Il contenuto dell'articolo si applica alla mia situazione specifica?",
    answer:
      "Gli articoli pubblicati hanno carattere generale e informativo. Per valutare l'applicabilità alla tua situazione, ti consigliamo di contattare direttamente uno dei nostri professionisti.",
  },
];

const articleBody = `
La normativa tributaria italiana è soggetta a continui aggiornamenti e modifiche, che richiedono un'analisi attenta e sistematica da parte di imprenditori, professionisti e persone fisiche.

## Il contesto normativo

Il quadro di riferimento è definito dalla Legge di Bilancio, dai decreti legislativi attuativi della delega fiscale e dalle circolari interpretative dell'Agenzia delle Entrate. La comprensione di questi strumenti è fondamentale per una corretta pianificazione fiscale.

Tra i principali ambiti di intervento recente si segnalano:

- La riforma dell'IRPEF e la revisione delle aliquote progressive
- Le modifiche al regime forfettario per i contribuenti di minori dimensioni
- L'introduzione del concordato preventivo biennale
- Le novità in materia di agevolazioni fiscali per investimenti

## Adempimenti pratici

Dal punto di vista operativo, è necessario verificare puntualmente la propria situazione alla luce delle nuove disposizioni, anche in considerazione delle specifiche circolari di prassi emanate dall'Amministrazione finanziaria.

In particolare, occorre prestare attenzione:

1. Alla corretta applicazione delle aliquote di imposta vigenti nel periodo di imposta
2. Alla verifica delle condizioni di accesso ai regimi agevolati
3. Al rispetto dei termini di versamento e delle modalità di presentazione delle dichiarazioni
4. Alla documentazione necessaria per fruire di eventuali deduzioni e detrazioni

## Considerazioni conclusive

La materia è in continua evoluzione. Si raccomanda di verificare periodicamente gli aggiornamenti normativi e di contattare il proprio commercialista di riferimento per una valutazione personalizzata della propria posizione fiscale.

**L'assistenza di un professionista qualificato è fondamentale per evitare errori e ottimizzare legalmente il proprio carico fiscale.**
`;

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticoloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div>
      <section
        style={{
          background: `linear-gradient(135deg, var(--brand-navy-dark) 0%, var(--brand-navy) 100%)`,
          paddingBlock: "3.5rem",
        }}
      >
        <div className="container">
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <Link href="/" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <Link href="/guide" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Guide</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.8)" }}>{article.category}</span>
          </nav>

          <span className="badge badge-teal" style={{ marginBottom: "1rem" }}>{article.category}</span>

          <h1 className="display-md" style={{ color: "white", maxWidth: "50rem", marginBottom: "1.25rem" }}>
            {article.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
              <User size={14} />
              {article.author} · {article.authorRole}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
              <Clock size={14} />
              {article.readTime} di lettura
            </span>
            <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
              {article.date}
            </span>
          </div>
        </div>
      </section>

      <div style={{ height: "22rem", overflow: "hidden" }}>
        <img
          src={article.image}
          alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem", alignItems: "start" }} className="article-grid">
            <div>
              <div
                style={{
                  borderLeft: "3px solid var(--brand-teal)",
                  paddingLeft: "1.25rem",
                  marginBottom: "2rem",
                }}
              >
                <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--foreground-default)", fontStyle: "italic" }}>
                  {article.excerpt}
                </p>
              </div>

              <div className="prose">
                {articleBody.trim().split("\n\n").map((para, i) => {
                  if (para.startsWith("## ")) {
                    return (
                      <h2 key={i} className="section-title" style={{ color: "var(--foreground-default)", marginTop: "2rem", marginBottom: "0.875rem" }}>
                        {para.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (para.startsWith("- ")) {
                    const items = para.split("\n").filter((l) => l.startsWith("- "));
                    return (
                      <ul key={i} style={{ marginBottom: "1.25rem", paddingLeft: "1.5rem" }}>
                        {items.map((item, j) => (
                          <li key={j} style={{ marginBottom: "0.375rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}>
                            {item.replace("- ", "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (/^\d+\./.test(para)) {
                    const items = para.split("\n").filter((l) => /^\d+\./.test(l));
                    return (
                      <ol key={i} style={{ marginBottom: "1.25rem", paddingLeft: "1.5rem" }}>
                        {items.map((item, j) => (
                          <li key={j} style={{ marginBottom: "0.375rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}>
                            {item.replace(/^\d+\.\s/, "")}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p
                      key={i}
                      style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "var(--foreground-muted)", marginBottom: "1.25rem" }}
                      dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
                    />
                  );
                })}
              </div>

              <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-default)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
                  <Tag size={15} style={{ color: "var(--foreground-muted)" }} />
                  {article.tags.map((tag) => (
                    <span key={tag} className="badge badge-navy">{tag}</span>
                  ))}
                </div>
              </div>

              <div
                className="card"
                style={{ padding: "1.5rem", marginTop: "2rem", display: "flex", gap: "1.25rem", alignItems: "center" }}
              >
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--action-secondary)" }}>
                  <User size={20} style={{ color: "var(--brand-navy)" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "var(--foreground-default)" }}>{article.author}</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--foreground-muted)" }}>{article.authorRole} — Studio Brambilla & Associati</p>
                </div>
              </div>

              <div style={{ marginTop: "3rem" }}>
                <h2 className="section-title" style={{ color: "var(--foreground-default)", marginBottom: "1.5rem" }}>
                  Domande frequenti
                </h2>
                <FAQAccordion items={articleFAQ} />
              </div>

              <div
                className="card"
                style={{
                  padding: "2rem",
                  marginTop: "2.5rem",
                  background: `linear-gradient(135deg, var(--brand-navy-dark), var(--brand-navy))`,
                  border: "none",
                  textAlign: "center",
                }}
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "white", marginBottom: "0.625rem" }}>
                  Hai bisogno di consulenza specifica?
                </h3>
                <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>
                  Contattaci per valutare la tua situazione con un professionista dedicato.
                </p>
                <Link href="/contatti" className="btn-teal">
                  Richiedi consulenza
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div style={{ position: "sticky", top: "5.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--foreground-muted)", marginBottom: "1rem" }}>
                  Articoli correlati
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {related.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} />
                  ))}
                </div>
              </div>

              <div
                className="card"
                style={{ padding: "1.5rem", background: `linear-gradient(160deg, var(--brand-navy-dark), var(--brand-navy))`, border: "none" }}
              >
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "white", marginBottom: "0.625rem" }}>
                  Assistenza professionale
                </h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
                  Hai domande su questo argomento? Parlane con un nostro commercialista.
                </p>
                <Link href="/contatti" className="btn-teal" style={{ width: "100%", justifyContent: "center" }}>
                  Contattaci
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

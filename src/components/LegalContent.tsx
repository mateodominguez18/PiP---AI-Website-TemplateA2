import { PageHero } from "@/components/PageHero";

interface Section {
  title: string;
  content: string;
}

const privacySections: Section[] = [
  {
    title: "Titolare del trattamento",
    content: "",
  },
  {
    title: "Dati raccolti",
    content:
      "Il sito raccoglie dati personali forniti volontariamente dall'utente tramite il modulo di contatto (nome, cognome, indirizzo email, numero di telefono, testo del messaggio) e dati di navigazione raccolti automaticamente dai sistemi informatici durante il normale esercizio dei protocolli di comunicazione Internet.",
  },
  {
    title: "Finalità e base giuridica",
    content:
      "I dati raccolti tramite il modulo di contatto sono trattati per dare seguito alle richieste dell'utente (base giuridica: esecuzione di misure precontrattuali). I dati di navigazione sono utilizzati per finalità di sicurezza e funzionamento del sito (base giuridica: legittimo interesse del titolare).",
  },
  {
    title: "Conservazione dei dati",
    content:
      "I dati personali sono conservati per il tempo strettamente necessario alle finalità per le quali sono stati raccolti. I dati forniti tramite il modulo di contatto sono conservati per 24 mesi dalla ricezione, salvo diversa prescrizione normativa.",
  },
  {
    title: "Diritti dell'interessato",
    content: "In qualità di interessato, Lei ha il diritto di: accedere ai propri dati personali (art. 15 GDPR); richiederne la rettifica (art. 16 GDPR); richiederne la cancellazione (art. 17 GDPR); opporsi al trattamento (art. 21 GDPR); richiedere la limitazione del trattamento (art. 18 GDPR); richiedere la portabilità dei dati (art. 20 GDPR). Per esercitare tali diritti, è possibile scrivere a: __EMAIL__.",
  },
  {
    title: "Cookie",
    content:
      "Il sito utilizza esclusivamente cookie tecnici necessari al funzionamento. Non vengono utilizzati cookie di profilazione o di terze parti a fini pubblicitari. Per informazioni dettagliate si rinvia alla Cookie Policy.",
  },
  {
    title: "Modifiche alla Privacy Policy",
    content:
      "Il titolare si riserva il diritto di modificare la presente informativa in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento. Ultimo aggiornamento: 1 gennaio 2025.",
  },
];

const cookieSections: Section[] = [
  {
    title: "Cosa sono i cookie",
    content:
      "I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente, dove vengono memorizzati, per poi essere ritrasmessi agli stessi siti alla visita successiva.",
  },
  {
    title: "Cookie tecnici",
    content:
      "Questo sito utilizza esclusivamente cookie tecnici strettamente necessari al funzionamento del sito e alla navigazione da parte dell'utente. Non viene effettuato alcun tracciamento dell'utente. Non è richiesto il consenso per questo tipo di cookie.",
  },
  {
    title: "Cookie di terze parti",
    content:
      "Il sito non utilizza cookie di profilazione né cookie di terze parti a fini analitici o pubblicitari.",
  },
  {
    title: "Gestione dei cookie",
    content:
      "L'utente può gestire, disabilitare o eliminare i cookie tramite le impostazioni del proprio browser. Si ricorda che la disabilitazione dei cookie tecnici potrebbe compromettere alcune funzionalità del sito.",
  },
  {
    title: "Modifiche alla Cookie Policy",
    content: "La presente Cookie Policy può essere aggiornata. Ultimo aggiornamento: 1 gennaio 2025.",
  },
];

interface LegalContentProps {
  type: "privacy" | "cookie";
  studioName?: string;
  email?: string;
  address?: string;
  piva?: string;
}

export function LegalContent({
  type,
  studioName = "Brambilla & Associati",
  email = "info@brambilla-associati.it",
  address = "Via Montenapoleone 8, 20121 Milano",
  piva = "12345678901",
}: LegalContentProps) {
  const isPrivacy = type === "privacy";
  const sections = isPrivacy
    ? privacySections.map((s, i) =>
        i === 0
          ? { ...s, content: `${studioName} — ${address}. P.IVA ${piva}. Email: ${email}.` }
          : i === 4
          ? { ...s, content: s.content.replace("__EMAIL__", email) }
          : s
      )
    : cookieSections;
  const title = isPrivacy ? "Privacy Policy" : "Cookie Policy";
  const subtitle = isPrivacy
    ? "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003."
    : "Informativa sull'utilizzo dei cookie ai sensi del D.Lgs. 196/2003 e della Direttiva 2009/136/CE.";

  return (
    <div>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumbs={[{ label: title }]}
        compact
      />

      <section className="section">
        <div className="container" style={{ maxWidth: "54rem" }}>
          <div className="card" style={{ padding: "3rem" }}>
            {sections.map((section, i) => (
              <div
                key={i}
                style={{
                  paddingBottom: i < sections.length - 1 ? "1.75rem" : 0,
                  marginBottom: i < sections.length - 1 ? "1.75rem" : 0,
                  borderBottom: i < sections.length - 1 ? "1px solid var(--border-default)" : "none",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    color: "var(--brand-navy)",
                    marginBottom: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "1.75rem",
                      height: "1.75rem",
                      borderRadius: "50%",
                      backgroundColor: "var(--action-secondary)",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      color: "var(--brand-navy)",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  {section.title}
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--foreground-muted)", marginLeft: "2.25rem" }}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)", textAlign: "center", marginTop: "2rem" }}>
            Per qualsiasi informazione relativa al trattamento dei dati personali, contattare:{" "}
            <a href={`mailto:${email}`} style={{ color: "var(--brand-navy)" }}>{email}</a>
          </p>
        </div>
      </section>
    </div>
  );
}

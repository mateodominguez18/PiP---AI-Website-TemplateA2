// Migrazione una tantum: compila in siteSettings tutti i nuovi campi (link legali +
// contenuti homepage) con i valori attualmente in uso nel codice, così lo Studio non
// mostra campi vuoti. Elimina anche il singleton "homeContent", ormai inutilizzato
// dopo aver unito tutto in siteSettings.
// Eseguire con: node --env-file=.env.local scripts/backfill-site-settings.mjs
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-06-12",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1758518727077-ffb66ffccced?w=800&h=500&fit=crop";

async function uploadHeroImage() {
  const res = await fetch(HERO_IMAGE_URL);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename: "hero-consulenza.jpg" });
  return asset._id;
}

async function backfill() {
  const heroImageAssetId = await uploadHeroImage();
  console.log(`  ✓ Immagine hero caricata (${heroImageAssetId})`);

  await client
    .patch("siteSettings")
    .set({
      privacyPolicyUrl: "https://www.iubenda.com/privacy-policy/98533713",
      cookiePolicyUrl: "https://www.iubenda.com/privacy-policy/98533713/cookie-policy",

      heroEyebrow: "Studio Professionale · Milano dal 2002",
      heroTitle: "Consulenza fiscale e societaria per imprenditori e PMI",
      heroSubtitle: "Assistenza qualificata in ambito tributario, societario e del lavoro. Aggiornamento normativo sistematico e interlocutore dedicato per ogni cliente.",
      heroCtaPrimaryLabel: "Richiedi una consulenza",
      heroCtaSecondaryLabel: "Le nostre aree",
      heroBadges: ["ODCEC Milano", "Revisori Legali MEF", "Consulenti del Lavoro"],
      heroImage: { _type: "image", asset: { _type: "reference", _ref: heroImageAssetId } },
      trustMetrics: [
        { _type: "object", _key: "metric1", value: "22+", label: "Anni di attività" },
        { _type: "object", _key: "metric2", value: "300+", label: "Clienti assistiti" },
        { _type: "object", _key: "metric3", value: "4", label: "Professionisti dedicati" },
        { _type: "object", _key: "metric4", value: "100%", label: "Assistenza diretta" },
      ],

      areeEyebrow: "Le nostre competenze",
      areeTitle: "Aree di consulenza",
      areeDescription: "Assistenza specializzata nelle principali discipline professionali del commercialista, del consulente fiscale e del consulente del lavoro.",
      areeCtaLabel: "Vedi tutte le aree",

      scadenzeEyebrow: "Calendario fiscale",
      scadenzeTitle: "Prossime scadenze fiscali",
      scadenzeDescription: "Teniamo traccia di tutti gli adempimenti rilevanti. Il calendario è aggiornato con le principali scadenze per imprese, professionisti e persone fisiche.",
      scadenzeCtaLabel: "Calendario completo",
      scadenzeColData: "Data",
      scadenzeColAdempimento: "Adempimento",
      scadenzeColCategoria: "Categoria",
      scadenzeColPriorita: "Priorità",

      guideEyebrow: "Aggiornamento normativo",
      guideTitle: "Guide e Novità fiscali",
      guideCtaLabel: "Tutti gli articoli",

      differentiatorsEyebrow: "Il nostro approccio",
      differentiatorsTitle: "Perché scegliere lo Studio",
      differentiators: [
        { _type: "object", _key: "diff1", icon: "BookOpen", title: "Aggiornamento normativo costante", description: "Seguiamo quotidianamente l'evoluzione della normativa tributaria, le circolari dell'Agenzia delle Entrate e la giurisprudenza. I nostri clienti ricevono proattivamente le informazioni rilevanti per la loro situazione." },
        { _type: "object", _key: "diff2", icon: "Users", title: "Interlocutore dedicato", description: "Ogni cliente ha un professionista di riferimento specifico. Nessun call center, nessun rimbalzo tra uffici: risposta diretta alle richieste, sempre dallo stesso interlocutore qualificato." },
        { _type: "object", _key: "diff3", icon: "Shield", title: "Esperienza multidisciplinare", description: "Il nostro team integra competenze fiscali, societarie e del lavoro. Affrontiamo i problemi nella loro complessità reale, senza frammentare l'analisi in silos separati." },
        { _type: "object", _key: "diff4", icon: "Award", title: "Approccio personalizzato", description: "Non esistono soluzioni standard. Ogni consulenza parte da un'analisi puntuale della situazione del cliente, degli obiettivi e del contesto, per arrivare alla risposta concretamente più utile." },
        { _type: "object", _key: "diff5", icon: "Clock", title: "Tempestività e rispetto delle scadenze", description: "Gestiamo tutte le scadenze fiscali e civilistiche con un sistema di monitoraggio interno. Il cliente non deve preoccuparsi di ricordare termini: ci pensiamo noi." },
      ],

      teamEyebrow: "I professionisti",
      teamTitle: "Il Team",
      teamDescription: "Professionisti iscritti ai rispettivi Ordini con formazione specialistica e continuo aggiornamento normativo.",
      teamCtaLabel: "Conosci il team",

      contattiEyebrow: "Parlaci del tuo progetto",
      contattiTitle: "Richiedi una prima consulenza",
      contattiDescription: "Raccontaci la tua situazione e un nostro professionista ti contatterà entro 24 ore lavorative per valutare insieme come possiamo assisterti.",
      contattiPhoneLabel: "Telefono",
      contattiEmailLabel: "Email",
      contattiFormTitle: "Inviaci un messaggio",
    })
    .commit();

  console.log("  ✓ siteSettings compilato con i contenuti attuali della homepage");

  const orphan = await client.fetch(`*[_type == "homeContent"][0]._id`);
  if (orphan) {
    await client.delete(orphan);
    console.log(`  ✓ Documento "homeContent" (${orphan}) eliminato: non più usato`);
  }
}

backfill().catch((e) => {
  console.error("Errore durante il backfill:", e);
  process.exit(1);
});

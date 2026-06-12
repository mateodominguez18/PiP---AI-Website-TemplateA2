// Run with: node --env-file=.env.local scripts/seed-sanity.mjs
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-06-12",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ─── helpers ────────────────────────────────────────────────────────────────

const MONTH_ABB = { gen:1,feb:2,mar:3,apr:4,mag:5,giu:6,lug:7,ago:8,set:9,ott:10,nov:11,dic:12 };
const MONTH_FULL = { gennaio:1,febbraio:2,marzo:3,aprile:4,maggio:5,giugno:6,luglio:7,agosto:8,settembre:9,ottobre:10,novembre:11,dicembre:12 };

function parseItalianDateAbb(str) {
  // "16 giu 2025" → "2025-06-16"
  const [day, mon, year] = str.trim().split(" ");
  const m = MONTH_ABB[mon.toLowerCase()];
  return `${year}-${String(m).padStart(2,"0")}-${day.padStart(2,"0")}`;
}

function parseItalianDateFull(str) {
  // "12 maggio 2025" → "2025-05-12"
  const parts = str.trim().split(" ");
  const day = parts[0], mon = parts[1], year = parts[2];
  const m = MONTH_FULL[mon.toLowerCase()];
  return `${year}-${String(m).padStart(2,"0")}-${day.padStart(2,"0")}`;
}

async function deleteExisting(type) {
  const ids = await client.fetch(`*[_type == $type]._id`, { type });
  if (ids.length === 0) return;
  const tx = client.transaction();
  ids.forEach((id) => tx.delete(id));
  await tx.commit();
  console.log(`  Deleted ${ids.length} existing "${type}" documents`);
}

// ─── siteSettings ────────────────────────────────────────────────────────────

async function seedSiteSettings() {
  console.log("\n📋 Seeding siteSettings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    studioName: "Brambilla & Associati",
    tagline: "Dottori Commercialisti | Revisori Legali | Consulenti del Lavoro",
    email: "studio@brambilla-associati.it",
    phone: "+39 02 8765 4321",
    address: "Via Montenapoleone 8, 20121 Milano (MI)",
    hours: "Lun–Ven 9:00–18:00 | Su appuntamento",
    piva: "IT 04812570960",
    recruitingEmail: "recruiting@brambilla-associati.it",
  });
  console.log("  ✓ siteSettings created");
}

// ─── teamMembers ─────────────────────────────────────────────────────────────

const teamMembers = [
  {
    name: "Marco Brambilla",
    role: "Dottore Commercialista e Revisore Legale",
    title: "Partner Fondatore",
    bio: "Oltre 22 anni di esperienza in fiscalità d'impresa, diritto societario e operazioni straordinarie. Assiste PMI, gruppi industriali e imprenditori nelle fasi di crescita e ristrutturazione.",
    bioExtended: "Marco Brambilla ha fondato lo studio nel 2002 dopo una significativa esperienza presso primari studi tributari milanesi. La sua attività si concentra sulla consulenza fiscale d'impresa, con particolare attenzione alle operazioni di M&A, alle ristrutturazioni societarie e alla compliance tributaria. Ha assistito numerose operazioni di acquisizione e cessione d'azienda, conferimenti e fusioni nel settore manifatturiero e dei servizi.",
    education: ["Laurea in Economia Aziendale, Università Bocconi di Milano","Abilitato all'Ordine dei Dottori Commercialisti e degli Esperti Contabili di Milano","Revisore Legale iscritto al MEF"],
    specializations: ["Fiscalità d'impresa","Operazioni straordinarie","Ristrutturazioni societarie","M&A"],
    linkedIn: "#",
    order: 1,
  },
  {
    name: "Elena Conti",
    role: "Dottore Commercialista",
    title: "Partner",
    bio: "Specializzata in fiscalità delle persone fisiche, imprese familiari e pianificazione patrimoniale. Referente per le problematiche di passaggio generazionale e successione d'impresa.",
    bioExtended: "Elena Conti si occupa prevalentemente di consulenza fiscale e patrimoniale a persone fisiche e imprenditori individuali. Vanta una consolidata esperienza nella gestione dei processi di passaggio generazionale, nella pianificazione successoria e nell'ottimizzazione fiscale dei patrimoni personali e familiari. Assiste regolarmente clienti nel contenzioso tributario.",
    education: ["Laurea Magistrale in Scienze dell'Economia, Università degli Studi di Milano","Iscritta all'ODCEC di Milano","Master in Diritto Tributario, Università Cattolica"],
    specializations: ["Persone fisiche","Imprese familiari","Passaggio generazionale","Contenzioso tributario"],
    linkedIn: "#",
    order: 2,
  },
  {
    name: "Stefano Ferretti",
    role: "Consulente del Lavoro",
    title: "Senior Partner",
    bio: "15 anni di esperienza in elaborazione paghe, gestione del personale e consulenza previdenziale. Riferimento per le problematiche contrattuali e le relazioni industriali.",
    bioExtended: "Stefano Ferretti assiste imprese di ogni dimensione nella gestione amministrativa dei rapporti di lavoro subordinato e parasubordinato. La sua attività copre l'elaborazione dei cedolini paga, l'assistenza nelle assunzioni e cessazioni, la gestione dei rapporti con INPS, INAIL e Ispettorato del Lavoro, nonché la consulenza sui principali CCNL applicabili.",
    education: ["Laurea in Giurisprudenza, Università degli Studi di Pavia","Iscritto all'Ordine dei Consulenti del Lavoro di Milano"],
    specializations: ["Elaborazione paghe","Contrattualistica del lavoro","Previdenza e assistenza","Relazioni industriali"],
    linkedIn: "#",
    order: 3,
  },
  {
    name: "Giulia Marini",
    role: "Dottore Commercialista",
    title: "Associate",
    bio: "Specializzata in fiscalità internazionale, transfer pricing e strutture societarie cross-border. Matura esperienza maturata presso studi internazionali di primo piano a Milano e Londra.",
    bioExtended: "Giulia Marini si occupa di fiscalità internazionale per gruppi e imprese con presenza estera. Gestisce dossier di transfer pricing, CFC (Controlled Foreign Companies), tassazione dei dividendi e interessi transfrontalieri, nonché l'assistenza nelle procedure amichevoli con Amministrazioni estere (MAP). Ha lavorato presso la sede londinese di uno studio tributario internazionale.",
    education: ["Laurea Magistrale in Economia e Management, Università Bocconi","LLM in International Tax Law, King's College London","Iscritta all'ODCEC di Milano"],
    specializations: ["Fiscalità internazionale","Transfer pricing","CFC e esterovestizione","M&A cross-border"],
    linkedIn: "#",
    order: 4,
  },
];

async function seedTeam() {
  console.log("\n👥 Seeding teamMembers...");
  await deleteExisting("teamMember");
  for (const m of teamMembers) {
    await client.create({ _type: "teamMember", ...m });
    console.log(`  ✓ ${m.name}`);
  }
}

// ─── consultingAreas ─────────────────────────────────────────────────────────

const consultingAreas = [
  {
    slug: "contabilita-e-bilancio",
    title: "Contabilità e Bilancio",
    icon: "BookOpen",
    shortDescription: "Tenuta della contabilità ordinaria e semplificata, redazione del bilancio d'esercizio e adempimenti civilistici connessi.",
    fullDescription: "La corretta tenuta della contabilità è il presupposto di ogni adempimento fiscale e della produzione di informazioni gestionali affidabili. Il nostro studio segue la contabilità di società di capitali, società di persone, imprese individuali e professionisti con approccio strutturato e sistematico.",
    targetClients: "Società di capitali, SRL, SNC, ditte individuali, professionisti",
    activities: ["Contabilità ordinaria e semplificata","Redazione del bilancio d'esercizio (OIC)","Bilancio in forma abbreviata e micro-imprese","Nota integrativa e relazione sulla gestione","Adempimenti CCIAA: deposito bilancio","Contabilità analitica e controllo di gestione","Libri sociali e adempimenti civilistici"],
    benefits: ["Quadro contabile sempre aggiornato e pronto per le verifiche fiscali","Dati di bilancio affidabili per decisioni strategiche","Rispetto di tutti i termini di deposito e pubblicazione","Interlocuzione diretta con commercialisti dedicati"],
    faq: [{question:"Con quale frequenza inviate il riepilogo contabile?",answer:"Produciamo situazioni contabili periodiche (mensili o trimestrali) in base alle esigenze del cliente. I bilanci d'esercizio vengono redatti entro i termini di legge."},{question:"Gestite anche la contabilità dei condomini?",answer:"Sì, offriamo un servizio specifico di gestione contabile condominiale con rendiconto annuale, piano di riparto e comunicazioni ai condomini."},{question:"Usate software di contabilità condivisi con il cliente?",answer:"Lavoriamo con i principali gestionali (TeamSystem, Zucchetti, Wolters Kluwer). Possiamo integrarci con i sistemi già in uso dal cliente o fornire accesso al nostro."}],
    order: 1,
  },
  {
    slug: "consulenza-fiscale",
    title: "Consulenza Fiscale",
    icon: "FileText",
    shortDescription: "Dichiarazioni fiscali, pianificazione tributaria, adempimenti IVA e gestione delle relazioni con l'Agenzia delle Entrate.",
    fullDescription: "La consulenza fiscale è il cuore dell'attività dello studio. Affianchiamo imprenditori e professionisti nell'interpretazione della normativa tributaria, nella pianificazione dei carichi fiscali e nella gestione di tutti gli adempimenti dichiarativi.",
    targetClients: "Privati, professionisti, imprese, gruppi societari",
    activities: ["Dichiarazioni dei redditi (Redditi PF, SC, SP, 730)","Dichiarazione IVA annuale e liquidazioni periodiche","Modello 770 e CU per sostituti d'imposta","Pianificazione fiscale d'impresa e personale","Assistenza in accertamenti e verifiche fiscali","Interpelli all'Agenzia delle Entrate","Ravvedimento operoso e sanatorie"],
    benefits: ["Carico fiscale ottimizzato nel rispetto della normativa","Nessuna scadenza mancata grazie al nostro calendario dedicato","Assistenza qualificata in caso di controlli o accertamenti","Accesso agli ultimi aggiornamenti normativi e prassi amministrativa"],
    faq: [{question:"Gestite anche il contenzioso tributario?",answer:"Sì, seguiamo il contenzioso tributario in tutte le fasi: dal contraddittorio in sede di accertamento, al ricorso in Commissione Tributaria Provinciale e Regionale."},{question:"Come gestite le comunicazioni anomalie dell'Agenzia delle Entrate?",answer:"Le comunicazioni di irregolarità (art. 36-bis, 36-ter, 54-bis) vengono verificate tempestivamente e gestite con i rimedi più opportuni (regolarizzazione o risposta motivata)."}],
    order: 2,
  },
  {
    slug: "diritto-societario",
    title: "Diritto Societario",
    icon: "Building2",
    shortDescription: "Costituzione di società, modifiche statutarie, due diligence e assistenza negli adempimenti societari ordinari e straordinari.",
    fullDescription: "L'area societaria dello studio assiste gli imprenditori nella scelta della forma giuridica ottimale, nella gestione degli adempimenti ordinari e nelle operazioni che modificano la struttura aziendale.",
    targetClients: "Startup, PMI, gruppi aziendali, holding",
    activities: ["Costituzione di SRL, SPA, SNC, SAS e altre forme","Modifiche statutarie e assemblee straordinarie","Trasferimento di quote e azioni","Due diligence fiscale e societaria","Verbali di assemblea e di CDA","Libri sociali e adempimenti al Registro Imprese","Strutturazione di holding e gruppi societari"],
    benefits: ["Forma societaria scelta in base agli obiettivi reali dell'imprenditore","Adempimenti societari sempre in regola ed aggiornati","Tutela del patrimonio personale attraverso strutture adeguate","Supporto nelle fasi di crescita, modifica o uscita dall'impresa"],
    faq: [{question:"Quanto tempo ci vuole per costituire una SRL?",answer:"Con la procedura online (atto notarile digitale) i tempi sono di 5-10 giorni lavorativi. Con l'atto notarile tradizionale si aggiunge il tempo per la firma. Prestiamo assistenza completa nella redazione dello statuto."},{question:"Assistete anche nelle operazioni di vendita d'azienda?",answer:"Sì. Seguiamo le due diligence, la strutturazione fiscale dell'operazione, la redazione delle clausole fiscali nei contratti e gli adempimenti successivi alla closing."}],
    order: 3,
  },
  {
    slug: "lavoro-e-paghe",
    title: "Lavoro e Paghe",
    icon: "Users",
    shortDescription: "Elaborazione buste paga, gestione delle assunzioni e cessazioni, consulenza previdenziale e assistenza nei rapporti con gli enti previdenziali.",
    fullDescription: "La gestione del personale richiede competenze multidisciplinari che spaziano dal diritto del lavoro alla previdenza, dall'amministrazione delle retribuzioni alla contrattualistica. Il nostro team di consulenti del lavoro affianca le imprese in tutti questi aspetti.",
    targetClients: "Imprese con dipendenti, startup, artigiani, commercianti",
    activities: ["Elaborazione mensile delle buste paga","Assunzioni, proroghe e cessazioni dei rapporti","Comunicazioni INPS, INAIL e Centro per l'Impiego","Gestione degli ammortizzatori sociali (CIG, FIS)","Contrattualistica individuale e collettiva","Analisi e applicazione dei CCNL","Costo del lavoro e budgeting HR"],
    benefits: ["Adempimenti previdenziali e contributivi sempre corretti","Riduzione del rischio di contestazioni e ispezioni del lavoro","Consulenza costante sull'evoluzione della normativa","Gestione integrata con la contabilità generale"],
    faq: [{question:"Come avviene la trasmissione dei dati per le buste paga?",answer:"Il cliente trasmette le variabili mensili (presenze, assenze, straordinari, ecc.) tramite un foglio strutturato o direttamente via email. Elaboriamo i cedolini e li inviamo entro il termine concordato."},{question:"Assistete anche in caso di ispezioni del lavoro?",answer:"Sì. Offriamo assistenza completa in caso di accesso ispettivo da parte di INPS, INAIL o Ispettorato Nazionale del Lavoro, inclusa la predisposizione della documentazione e la gestione del contraddittorio."}],
    order: 4,
  },
  {
    slug: "operazioni-straordinarie",
    title: "Operazioni Straordinarie",
    icon: "TrendingUp",
    shortDescription: "Fusioni, scissioni, conferimenti, trasformazioni societarie e valutazioni d'azienda. Assistenza fiscale e societaria nelle operazioni di M&A.",
    fullDescription: "Le operazioni straordinarie richiedono una competenza tecnica elevata e una visione integrata degli aspetti fiscali, societari e valutativi. Il nostro studio assiste i clienti in tutte le fasi di queste operazioni, dalla progettazione alla closing.",
    targetClients: "PMI, gruppi industriali, investitori, fondi PE",
    activities: ["Fusioni per incorporazione e proprie","Scissioni totali e parziali","Conferimenti d'azienda e di ramo aziendale","Trasformazioni societarie","Valutazioni d'azienda (DCF, multipli di mercato)","Due diligence fiscale buy-side e sell-side","Strutturazione fiscale di operazioni di M&A"],
    benefits: ["Operazione strutturata in modo fiscalmente efficiente","Gestione integrata degli aspetti civilistici e tributari","Valutazione indipendente certificabile","Riduzione dei rischi post-closing attraverso garanzie contrattuali"],
    faq: [{question:"Quanto dura mediamente un'operazione di fusione?",answer:"I tempi variano in base alla complessità. Una fusione tra due piccole SRL può richiedere 3-4 mesi. Operazioni più articolate con aspetti cross-border richiedono tempistiche più lunghe."},{question:"Effettuate anche perizie di stima ex art. 2343 c.c.?",answer:"Sì. I nostri professionisti iscritti al Registro dei Revisori Legali possono predisporre perizie di stima per conferimenti in natura nelle società di capitali."}],
    order: 5,
  },
  {
    slug: "fiscalita-internazionale",
    title: "Fiscalità Internazionale",
    icon: "Globe",
    shortDescription: "Strutture societarie estere, transfer pricing, CFC, pianificazione fiscale internazionale e assistenza a imprese con attività transfrontaliere.",
    fullDescription: "La globalizzazione rende sempre più rilevante la dimensione internazionale della fiscalità. Il nostro studio affianca le imprese italiane con attività estere e i gruppi internazionali con presenza in Italia nella gestione dei profili fiscali cross-border.",
    targetClients: "PMI con attività estere, gruppi internazionali, imprenditori con asset esteri",
    activities: ["Strutturazione di gruppi societari internazionali","Transfer pricing: documentazione nazionale e master file","CFC: analisi e compliance","Monitoraggio fiscale (Quadro RW) e IVAFE/IVIE","Convenzioni contro le doppie imposizioni","Assistenza a soggetti in entrata (investitori esteri in Italia)","Procedure amichevoli (MAP) e accordi preventivi (APA)"],
    benefits: ["Struttura internazionale fiscalmente efficiente e conforme","Documentazione di transfer pricing che riduce i rischi accertativi","Presidio del rischio di esterovestizione","Interlocuzione con advisor esteri coordinata e unitaria"],
    faq: [{question:"Siete in grado di assistere nella disclosure di attività estere non dichiarate?",answer:"Sì. Attraverso la procedura di voluntary disclosure o il ravvedimento operoso, assistiamo i clienti nella regolarizzazione delle attività e dei redditi esteri non dichiarati, valutando la soluzione più opportuna."},{question:"Collaborate con studi esteri per le tematiche cross-border?",answer:"Disponiamo di una rete consolidata di corrispondenti qualificati nei principali paesi UE ed extra-UE. Coordiniamo le attività degli advisor esteri garantendo unitarietà di approccio."}],
    order: 6,
  },
];

async function seedConsultingAreas() {
  console.log("\n📂 Seeding consultingAreas...");
  await deleteExisting("consultingArea");
  for (const area of consultingAreas) {
    await client.create({
      _type: "consultingArea",
      ...area,
      slug: { _type: "slug", current: area.slug },
    });
    console.log(`  ✓ ${area.title}`);
  }
}

// ─── taxDeadlines ─────────────────────────────────────────────────────────────

const taxDeadlinesRaw = [
  { date: "16 giu 2025", month: "Giugno 2025", title: "Versamento ritenute e contributi (F24)", description: "Versamento delle ritenute operate nel mese di maggio da sostituti d'imposta. Include contributi INPS artigiani e commercianti.", category: "Adempimenti mensili", audience: "Tutti i sostituti d'imposta", priority: "alta" },
  { date: "30 giu 2025", month: "Giugno 2025", title: "LIPE – Liquidazione IVA II trimestre", description: "Trasmissione telematica all'Agenzia delle Entrate della comunicazione dei dati delle liquidazioni IVA del secondo trimestre 2025.", category: "IVA", audience: "Soggetti IVA trimestrali", priority: "alta" },
  { date: "30 giu 2025", month: "Giugno 2025", title: "Saldo IRPEF e I acconto 2025", description: "Versamento del saldo IRPEF 2024 e del primo acconto 2025 per persone fisiche (con possibilità di rateizzazione).", category: "IRPEF", audience: "Persone fisiche con IRPEF a debito", priority: "alta" },
  { date: "31 lug 2025", month: "Luglio 2025", title: "Modello 770/2025", description: "Trasmissione telematica del Modello 770 relativo alle ritenute operate nel 2024 da parte dei sostituti d'imposta.", category: "Sostituti d'imposta", audience: "Sostituti d'imposta", priority: "media" },
  { date: "20 ago 2025", month: "Agosto 2025", title: "Versamento IVA mensile luglio", description: "Versamento IVA per i contribuenti IVA mensili relativa al mese di luglio 2025.", category: "IVA", audience: "IVA mensili", priority: "media" },
  { date: "16 set 2025", month: "Settembre 2025", title: "Versamento ritenute, contributi e IVA", description: "Versamento ritenute agosto, contributi INPS e versamento IVA mensile agosto (con maggiorazione per il rinvio di agosto).", category: "Adempimenti mensili", audience: "Tutti i contribuenti", priority: "alta" },
  { date: "30 set 2025", month: "Settembre 2025", title: "Dichiarazione IVA annuale integrativa", description: "Termine per la presentazione della dichiarazione IVA integrativa a favore per il periodo d'imposta 2024.", category: "IVA", audience: "Soggetti IVA con credito", priority: "bassa" },
  { date: "31 ott 2025", month: "Ottobre 2025", title: "LIPE – Liquidazione IVA III trimestre", description: "Comunicazione dei dati delle liquidazioni IVA del terzo trimestre 2025 all'Agenzia delle Entrate.", category: "IVA", audience: "Soggetti IVA trimestrali", priority: "alta" },
  { date: "31 ott 2025", month: "Ottobre 2025", title: "Modello Redditi 2025 – Persone Fisiche", description: "Termine per la trasmissione telematica del Modello Redditi PF 2025 per le persone fisiche.", category: "Dichiarazioni", audience: "Persone fisiche, autonomi, professionisti", priority: "alta" },
  { date: "31 ott 2025", month: "Ottobre 2025", title: "Modello Redditi 2025 – Società", description: "Termine per la trasmissione telematica del Modello Redditi SC e SP 2025.", category: "Dichiarazioni", audience: "Società di capitali e di persone", priority: "alta" },
  { date: "27 dic 2025", month: "Dicembre 2025", title: "Acconto IVA dicembre", description: "Versamento dell'acconto IVA di dicembre 2025 con uno dei metodi previsti (storico, previsionale, analitico).", category: "IVA", audience: "Tutti i soggetti IVA", priority: "alta" },
  { date: "31 dic 2025", month: "Dicembre 2025", title: "Concordato preventivo biennale – Adesione", description: "Termine per la eventuale adesione al Concordato Preventivo Biennale per i contribuenti ISA e forfettari.", category: "Regime agevolativo", audience: "ISA e forfettari", priority: "media" },
];

async function seedTaxDeadlines() {
  console.log("\n📅 Seeding taxDeadlines...");
  await deleteExisting("taxDeadline");
  for (const d of taxDeadlinesRaw) {
    await client.create({
      _type: "taxDeadline",
      title: d.title,
      description: d.description,
      date: parseItalianDateAbb(d.date),
      month: d.month,
      category: d.category,
      audience: d.audience,
      priority: d.priority,
    });
    console.log(`  ✓ ${d.title}`);
  }
}

// ─── articles ─────────────────────────────────────────────────────────────────

const articlesRaw = [
  { slug: "riforma-irpef-2025-guida-nuove-aliquote", title: "Riforma IRPEF 2025: guida alle nuove aliquote e ai moduli fiscali", excerpt: "Con la Legge di Bilancio 2025 il legislatore ha introdotto importanti modifiche alla tassazione IRPEF delle persone fisiche. Analizziamo le novità in vigore da gennaio 2025.", category: "Fiscalità", date: "12 maggio 2025", readTime: "8 min", author: "Elena Conti", authorRole: "Dottore Commercialista", tags: ["IRPEF","Persone fisiche","Legge di Bilancio 2025"] },
  { slug: "regime-forfettario-2025-limiti-cause-ostative", title: "Regime forfettario 2025: limite di ricavi, cause ostative e novità", excerpt: "Il regime forfettario si conferma l'opzione più vantaggiosa per molti autonomi e professionisti. Ecco le regole in vigore nel 2025, i controlli da effettuare e i casi di esclusione.", category: "Regime fiscale", date: "28 aprile 2025", readTime: "6 min", author: "Marco Brambilla", authorRole: "Partner Fondatore", tags: ["Regime forfettario","Partita IVA","Autonomi"] },
  { slug: "concordato-preventivo-biennale-istruzioni", title: "Concordato preventivo biennale: guida pratica per contribuenti ISA", excerpt: "Il concordato preventivo biennale offre certezza del carico fiscale per due anni. Analizziamo chi può aderire, come viene calcolata la proposta e le convenienze economiche dell'istituto.", category: "Tributario", date: "10 aprile 2025", readTime: "10 min", author: "Marco Brambilla", authorRole: "Partner Fondatore", tags: ["Concordato preventivo","ISA","Accertamento"] },
  { slug: "bonus-ristrutturazioni-2025-novita", title: "Bonus ristrutturazioni 2025: aliquote, massimali e cessione del credito", excerpt: "Il quadro delle detrazioni edilizie si consolida. Riepiloghiamo le aliquote applicabili nel 2025 per le diverse tipologie di intervento e le regole sulla cessione del credito.", category: "Agevolazioni", date: "20 marzo 2025", readTime: "7 min", author: "Elena Conti", authorRole: "Dottore Commercialista", tags: ["Bonus edilizi","Ristrutturazioni","Detrazioni"] },
  { slug: "transfer-pricing-documentazione-2025", title: "Transfer pricing: la documentazione idonea aggiornata al 2025", excerpt: "Le nuove linee guida OCSE e i provvedimenti dell'Agenzia delle Entrate modificano i requisiti della documentazione di transfer pricing. Aggiorniamo il quadro per le imprese con transazioni infragruppo.", category: "Internazionale", date: "5 marzo 2025", readTime: "9 min", author: "Giulia Marini", authorRole: "Associate", tags: ["Transfer pricing","Operazioni infragruppo","OCSE"] },
  { slug: "scegliere-forma-societaria", title: "Come scegliere la forma societaria per la propria impresa", excerpt: "SRL, SPA, SNC o ditta individuale? La scelta della forma giuridica ha importanti ricadute fiscali, di responsabilità e gestionali. Una guida per imprenditori che avviano o ristrutturano la propria attività.", category: "Societario", date: "18 febbraio 2025", readTime: "7 min", author: "Marco Brambilla", authorRole: "Partner Fondatore", tags: ["Forme societarie","Startup","Costituzione"] },
];

async function seedArticles() {
  console.log("\n📰 Seeding articles...");
  await deleteExisting("article");
  for (const a of articlesRaw) {
    await client.create({
      _type: "article",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      excerpt: a.excerpt,
      category: a.category,
      date: parseItalianDateFull(a.date),
      readTime: a.readTime,
      author: a.author,
      authorRole: a.authorRole,
      tags: a.tags,
    });
    console.log(`  ✓ ${a.title}`);
  }
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 Starting Sanity seed...");
  console.log(`   Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);

  if (!process.env.SANITY_API_TOKEN) {
    console.error("\n❌ SANITY_API_TOKEN is not set in .env.local");
    process.exit(1);
  }

  await seedSiteSettings();
  await seedTeam();
  await seedConsultingAreas();
  await seedTaxDeadlines();
  await seedArticles();

  console.log("\n✅ Seed completed successfully!");
}

main().catch((err) => {
  console.error("\n❌ Seed failed:", err.message);
  process.exit(1);
});

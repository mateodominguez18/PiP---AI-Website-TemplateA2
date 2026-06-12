export const STUDIO_NAME = "Brambilla & Associati";
export const STUDIO_TAGLINE = "Dottori Commercialisti | Revisori Legali | Consulenti del Lavoro";
export const STUDIO_PIVA = "IT 04812570960";
export const STUDIO_EMAIL = "studio@brambilla-associati.it";
export const STUDIO_PHONE = "+39 02 8765 4321";
export const STUDIO_ADDRESS = "Via Montenapoleone 8, 20121 Milano (MI)";
export const STUDIO_HOURS = "Lun–Ven 9:00–18:00 | Su appuntamento";

export interface TeamMember {
  id: number;
  slug: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  bioExtended: string;
  education: string[];
  specializations: string[];
  linkedIn: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    slug: "marco-brambilla",
    name: "Marco Brambilla",
    role: "Dottore Commercialista e Revisore Legale",
    title: "Partner Fondatore",
    bio: "Oltre 22 anni di esperienza in fiscalità d'impresa, diritto societario e operazioni straordinarie. Assiste PMI, gruppi industriali e imprenditori nelle fasi di crescita e ristrutturazione.",
    bioExtended:
      "Marco Brambilla ha fondato lo studio nel 2002 dopo una significativa esperienza presso primari studi tributari milanesi. La sua attività si concentra sulla consulenza fiscale d'impresa, con particolare attenzione alle operazioni di M&A, alle ristrutturazioni societarie e alla compliance tributaria. Ha assistito numerose operazioni di acquisizione e cessione d'azienda, conferimenti e fusioni nel settore manifatturiero e dei servizi.",
    education: [
      "Laurea in Economia Aziendale, Università Bocconi di Milano",
      "Abilitato all'Ordine dei Dottori Commercialisti e degli Esperti Contabili di Milano",
      "Revisore Legale iscritto al MEF",
    ],
    specializations: ["Fiscalità d'impresa", "Operazioni straordinarie", "Ristrutturazioni societarie", "M&A"],
    linkedIn: "#",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 2,
    slug: "elena-conti",
    name: "Elena Conti",
    role: "Dottore Commercialista",
    title: "Partner",
    bio: "Specializzata in fiscalità delle persone fisiche, imprese familiari e pianificazione patrimoniale. Referente per le problematiche di passaggio generazionale e successione d'impresa.",
    bioExtended:
      "Elena Conti si occupa prevalentemente di consulenza fiscale e patrimoniale a persone fisiche e imprenditori individuali. Vanta una consolidata esperienza nella gestione dei processi di passaggio generazionale, nella pianificazione successoria e nell'ottimizzazione fiscale dei patrimoni personali e familiari. Assiste regolarmente clienti nel contenzioso tributario.",
    education: [
      "Laurea Magistrale in Scienze dell'Economia, Università degli Studi di Milano",
      "Iscritta all'ODCEC di Milano",
      "Master in Diritto Tributario, Università Cattolica",
    ],
    specializations: ["Persone fisiche", "Imprese familiari", "Passaggio generazionale", "Contenzioso tributario"],
    linkedIn: "#",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 3,
    slug: "stefano-ferretti",
    name: "Stefano Ferretti",
    role: "Consulente del Lavoro",
    title: "Senior Partner",
    bio: "15 anni di esperienza in elaborazione paghe, gestione del personale e consulenza previdenziale. Riferimento per le problematiche contrattuali e le relazioni industriali.",
    bioExtended:
      "Stefano Ferretti assiste imprese di ogni dimensione nella gestione amministrativa dei rapporti di lavoro subordinato e parasubordinato. La sua attività copre l'elaborazione dei cedolini paga, l'assistenza nelle assunzioni e cessazioni, la gestione dei rapporti con INPS, INAIL e Ispettorato del Lavoro, nonché la consulenza sui principali CCNL applicabili.",
    education: [
      "Laurea in Giurisprudenza, Università degli Studi di Pavia",
      "Iscritto all'Ordine dei Consulenti del Lavoro di Milano",
    ],
    specializations: ["Elaborazione paghe", "Contrattualistica del lavoro", "Previdenza e assistenza", "Relazioni industriali"],
    linkedIn: "#",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 4,
    slug: "giulia-marini",
    name: "Giulia Marini",
    role: "Dottore Commercialista",
    title: "Associate",
    bio: "Specializzata in fiscalità internazionale, transfer pricing e strutture societarie cross-border. Matura esperienza maturata presso studi internazionali di primo piano a Milano e Londra.",
    bioExtended:
      "Giulia Marini si occupa di fiscalità internazionale per gruppi e imprese con presenza estera. Gestisce dossier di transfer pricing, CFC (Controlled Foreign Companies), tassazione dei dividendi e interessi transfrontalieri, nonché l'assistenza nelle procedure amichevoli con Amministrazioni estere (MAP). Ha lavorato presso la sede londinese di uno studio tributario internazionale.",
    education: [
      "Laurea Magistrale in Economia e Management, Università Bocconi",
      "LLM in International Tax Law, King's College London",
      "Iscritta all'ODCEC di Milano",
    ],
    specializations: ["Fiscalità internazionale", "Transfer pricing", "CFC e esterovestizione", "M&A cross-border"],
    linkedIn: "#",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
];

export interface ConsultingArea {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  activities: string[];
  benefits: string[];
  faq: { question: string; answer: string }[];
  targetClients: string;
}

export const consultingAreas: ConsultingArea[] = [
  {
    id: "contabilita",
    slug: "contabilita-e-bilancio",
    title: "Contabilità e Bilancio",
    shortDescription:
      "Tenuta della contabilità ordinaria e semplificata, redazione del bilancio d'esercizio e adempimenti civilistici connessi.",
    fullDescription:
      "La corretta tenuta della contabilità è il presupposto di ogni adempimento fiscale e della produzione di informazioni gestionali affidabili. Il nostro studio segue la contabilità di società di capitali, società di persone, imprese individuali e professionisti con approccio strutturato e sistematico.",
    icon: "BookOpen",
    targetClients: "Società di capitali, SRL, SNC, ditte individuali, professionisti",
    activities: [
      "Contabilità ordinaria e semplificata",
      "Redazione del bilancio d'esercizio (OIC)",
      "Bilancio in forma abbreviata e micro-imprese",
      "Nota integrativa e relazione sulla gestione",
      "Adempimenti CCIAA: deposito bilancio",
      "Contabilità analitica e controllo di gestione",
      "Libri sociali e adempimenti civilistici",
    ],
    benefits: [
      "Quadro contabile sempre aggiornato e pronto per le verifiche fiscali",
      "Dati di bilancio affidabili per decisioni strategiche",
      "Rispetto di tutti i termini di deposito e pubblicazione",
      "Interlocuzione diretta con commercialisti dedicati",
    ],
    faq: [
      {
        question: "Con quale frequenza inviate il riepilogo contabile?",
        answer:
          "Produciamo situazioni contabili periodiche (mensili o trimestrali) in base alle esigenze del cliente. I bilanci d'esercizio vengono redatti entro i termini di legge.",
      },
      {
        question: "Gestite anche la contabilità dei condomini?",
        answer:
          "Sì, offriamo un servizio specifico di gestione contabile condominiale con rendiconto annuale, piano di riparto e comunicazioni ai condomini.",
      },
      {
        question: "Usate software di contabilità condivisi con il cliente?",
        answer:
          "Lavoriamo con i principali gestionali (TeamSystem, Zucchetti, Wolters Kluwer). Possiamo integrarci con i sistemi già in uso dal cliente o fornire accesso al nostro.",
      },
    ],
  },
  {
    id: "fiscale",
    slug: "consulenza-fiscale",
    title: "Consulenza Fiscale",
    shortDescription:
      "Dichiarazioni fiscali, pianificazione tributaria, adempimenti IVA e gestione delle relazioni con l'Agenzia delle Entrate.",
    fullDescription:
      "La consulenza fiscale è il cuore dell'attività dello studio. Affianchiamo imprenditori e professionisti nell'interpretazione della normativa tributaria, nella pianificazione dei carichi fiscali e nella gestione di tutti gli adempimenti dichiarativi.",
    icon: "FileText",
    targetClients: "Privati, professionisti, imprese, gruppi societari",
    activities: [
      "Dichiarazioni dei redditi (Redditi PF, SC, SP, 730)",
      "Dichiarazione IVA annuale e liquidazioni periodiche",
      "Modello 770 e CU per sostituti d'imposta",
      "Pianificazione fiscale d'impresa e personale",
      "Assistenza in accertamenti e verifiche fiscali",
      "Interpelli all'Agenzia delle Entrate",
      "Ravvedimento operoso e sanatorie",
    ],
    benefits: [
      "Carico fiscale ottimizzato nel rispetto della normativa",
      "Nessuna scadenza mancata grazie al nostro calendario dedicato",
      "Assistenza qualificata in caso di controlli o accertamenti",
      "Accesso agli ultimi aggiornamenti normativi e prassi amministrativa",
    ],
    faq: [
      {
        question: "Gestite anche il contenzioso tributario?",
        answer:
          "Sì, seguiamo il contenzioso tributario in tutte le fasi: dal contraddittorio in sede di accertamento, al ricorso in Commissione Tributaria Provinciale e Regionale.",
      },
      {
        question: "Come gestite le comunicazioni anomalie dell'Agenzia delle Entrate?",
        answer:
          "Le comunicazioni di irregolarità (art. 36-bis, 36-ter, 54-bis) vengono verificate tempestivamente e gestite con i rimedi più opportuni (regolarizzazione o risposta motivata).",
      },
    ],
  },
  {
    id: "societario",
    slug: "diritto-societario",
    title: "Diritto Societario",
    shortDescription:
      "Costituzione di società, modifiche statutarie, due diligence e assistenza negli adempimenti societari ordinari e straordinari.",
    fullDescription:
      "L'area societaria dello studio assiste gli imprenditori nella scelta della forma giuridica ottimale, nella gestione degli adempimenti ordinari e nelle operazioni che modificano la struttura aziendale.",
    icon: "Building2",
    targetClients: "Startup, PMI, gruppi aziendali, holding",
    activities: [
      "Costituzione di SRL, SPA, SNC, SAS e altre forme",
      "Modifiche statutarie e assemblee straordinarie",
      "Trasferimento di quote e azioni",
      "Due diligence fiscale e societaria",
      "Verbali di assemblea e di CDA",
      "Libri sociali e adempimenti al Registro Imprese",
      "Strutturazione di holding e gruppi societari",
    ],
    benefits: [
      "Forma societaria scelta in base agli obiettivi reali dell'imprenditore",
      "Adempimenti societari sempre in regola ed aggiornati",
      "Tutela del patrimonio personale attraverso strutture adeguate",
      "Supporto nelle fasi di crescita, modifica o uscita dall'impresa",
    ],
    faq: [
      {
        question: "Quanto tempo ci vuole per costituire una SRL?",
        answer:
          "Con la procedura online (atto notarile digitale) i tempi sono di 5-10 giorni lavorativi. Con l'atto notarile tradizionale si aggiunge il tempo per la firma. Prestiamo assistenza completa nella redazione dello statuto.",
      },
      {
        question: "Assistete anche nelle operazioni di vendita d'azienda?",
        answer:
          "Sì. Seguiamo le due diligence, la strutturazione fiscale dell'operazione, la redazione delle clausole fiscali nei contratti e gli adempimenti successivi alla closing.",
      },
    ],
  },
  {
    id: "lavoro",
    slug: "lavoro-e-paghe",
    title: "Lavoro e Paghe",
    shortDescription:
      "Elaborazione buste paga, gestione delle assunzioni e cessazioni, consulenza previdenziale e assistenza nei rapporti con gli enti previdenziali.",
    fullDescription:
      "La gestione del personale richiede competenze multidisciplinari che spaziano dal diritto del lavoro alla previdenza, dall'amministrazione delle retribuzioni alla contrattualistica. Il nostro team di consulenti del lavoro affianca le imprese in tutti questi aspetti.",
    icon: "Users",
    targetClients: "Imprese con dipendenti, startup, artigiani, commercianti",
    activities: [
      "Elaborazione mensile delle buste paga",
      "Assunzioni, proroghe e cessazioni dei rapporti",
      "Comunicazioni INPS, INAIL e Centro per l'Impiego",
      "Gestione degli ammortizzatori sociali (CIG, FIS)",
      "Contrattualistica individuale e collettiva",
      "Analisi e applicazione dei CCNL",
      "Costo del lavoro e budgeting HR",
    ],
    benefits: [
      "Adempimenti previdenziali e contributivi sempre corretti",
      "Riduzione del rischio di contestazioni e ispezioni del lavoro",
      "Consulenza costante sull'evoluzione della normativa",
      "Gestione integrata con la contabilità generale",
    ],
    faq: [
      {
        question: "Come avviene la trasmissione dei dati per le buste paga?",
        answer:
          "Il cliente trasmette le variabili mensili (presenze, assenze, straordinari, ecc.) tramite un foglio strutturato o direttamente via email. Elaboriamo i cedolini e li inviamo entro il termine concordato.",
      },
      {
        question: "Assistete anche in caso di ispezioni del lavoro?",
        answer:
          "Sì. Offriamo assistenza completa in caso di accesso ispettivo da parte di INPS, INAIL o Ispettorato Nazionale del Lavoro, inclusa la predisposizione della documentazione e la gestione del contraddittorio.",
      },
    ],
  },
  {
    id: "straordinarie",
    slug: "operazioni-straordinarie",
    title: "Operazioni Straordinarie",
    shortDescription:
      "Fusioni, scissioni, conferimenti, trasformazioni societarie e valutazioni d'azienda. Assistenza fiscale e societaria nelle operazioni di M&A.",
    fullDescription:
      "Le operazioni straordinarie richiedono una competenza tecnica elevata e una visione integrata degli aspetti fiscali, societari e valutativi. Il nostro studio assiste i clienti in tutte le fasi di queste operazioni, dalla progettazione alla closing.",
    icon: "TrendingUp",
    targetClients: "PMI, gruppi industriali, investitori, fondi PE",
    activities: [
      "Fusioni per incorporazione e proprie",
      "Scissioni totali e parziali",
      "Conferimenti d'azienda e di ramo aziendale",
      "Trasformazioni societarie",
      "Valutazioni d'azienda (DCF, multipli di mercato)",
      "Due diligence fiscale buy-side e sell-side",
      "Strutturazione fiscale di operazioni di M&A",
    ],
    benefits: [
      "Operazione strutturata in modo fiscalmente efficiente",
      "Gestione integrata degli aspetti civilistici e tributari",
      "Valutazione indipendente certificabile",
      "Riduzione dei rischi post-closing attraverso garanzie contrattuali",
    ],
    faq: [
      {
        question: "Quanto dura mediamente un'operazione di fusione?",
        answer:
          "I tempi variano in base alla complessità. Una fusione tra due piccole SRL può richiedere 3-4 mesi. Operazioni più articolate con aspetti cross-border richiedono tempistiche più lunghe.",
      },
      {
        question: "Effettuate anche perizie di stima ex art. 2343 c.c.?",
        answer:
          "Sì. I nostri professionisti iscritti al Registro dei Revisori Legali possono predisporre perizie di stima per conferimenti in natura nelle società di capitali.",
      },
    ],
  },
  {
    id: "internazionale",
    slug: "fiscalita-internazionale",
    title: "Fiscalità Internazionale",
    shortDescription:
      "Strutture societarie estere, transfer pricing, CFC, pianificazione fiscale internazionale e assistenza a imprese con attività transfrontaliere.",
    fullDescription:
      "La globalizzazione rende sempre più rilevante la dimensione internazionale della fiscalità. Il nostro studio affianca le imprese italiane con attività estere e i gruppi internazionali con presenza in Italia nella gestione dei profili fiscali cross-border.",
    icon: "Globe",
    targetClients: "PMI con attività estere, gruppi internazionali, imprenditori con asset esteri",
    activities: [
      "Strutturazione di gruppi societari internazionali",
      "Transfer pricing: documentazione nazionale e master file",
      "CFC: analisi e compliance",
      "Monitoraggio fiscale (Quadro RW) e IVAFE/IVIE",
      "Convenzioni contro le doppie imposizioni",
      "Assistenza a soggetti in entrata (investitori esteri in Italia)",
      "Procedure amichevoli (MAP) e accordi preventivi (APA)",
    ],
    benefits: [
      "Struttura internazionale fiscalmente efficiente e conforme",
      "Documentazione di transfer pricing che riduce i rischi accertativi",
      "Presidio del rischio di esterovestizione",
      "Interlocuzione con advisor esteri coordinata e unitaria",
    ],
    faq: [
      {
        question: "Siete in grado di assistere nella disclosure di attività estere non dichiarate?",
        answer:
          "Sì. Attraverso la procedura di voluntary disclosure o il ravvedimento operoso, assistiamo i clienti nella regolarizzazione delle attività e dei redditi esteri non dichiarati, valutando la soluzione più opportuna.",
      },
      {
        question: "Collaborate con studi esteri per le tematiche cross-border?",
        answer:
          "Disponiamo di una rete consolidata di corrispondenti qualificati nei principali paesi UE ed extra-UE. Coordiniamo le attività degli advisor esteri garantendo unitarietà di approccio.",
      },
    ],
  },
];

export interface TaxDeadline {
  id: number;
  date: string;
  month: string;
  title: string;
  description: string;
  category: string;
  audience: string;
  priority: "alta" | "media" | "bassa";
}

export const taxDeadlines: TaxDeadline[] = [
  { id: 1, date: "16 giu 2025", month: "Giugno", title: "Versamento ritenute e contributi (F24)", description: "Versamento delle ritenute operate nel mese di maggio da sostituti d'imposta. Include contributi INPS artigiani e commercianti.", category: "Adempimenti mensili", audience: "Tutti i sostituti d'imposta", priority: "alta" },
  { id: 2, date: "30 giu 2025", month: "Giugno", title: "LIPE – Liquidazione IVA II trimestre", description: "Trasmissione telematica all'Agenzia delle Entrate della comunicazione dei dati delle liquidazioni IVA del secondo trimestre 2025.", category: "IVA", audience: "Soggetti IVA trimestrali", priority: "alta" },
  { id: 3, date: "30 giu 2025", month: "Giugno", title: "Saldo IRPEF e I acconto 2025", description: "Versamento del saldo IRPEF 2024 e del primo acconto 2025 per persone fisiche (con possibilità di rateizzazione).", category: "IRPEF", audience: "Persone fisiche con IRPEF a debito", priority: "alta" },
  { id: 4, date: "31 lug 2025", month: "Luglio", title: "Modello 770/2025", description: "Trasmissione telematica del Modello 770 relativo alle ritenute operate nel 2024 da parte dei sostituti d'imposta.", category: "Sostituti d'imposta", audience: "Sostituti d'imposta", priority: "media" },
  { id: 5, date: "20 ago 2025", month: "Agosto", title: "Versamento IVA mensile luglio", description: "Versamento IVA per i contribuenti IVA mensili relativa al mese di luglio 2025.", category: "IVA", audience: "IVA mensili", priority: "media" },
  { id: 6, date: "16 set 2025", month: "Settembre", title: "Versamento ritenute, contributi e IVA", description: "Versamento ritenute agosto, contributi INPS e versamento IVA mensile agosto (con maggiorazione per il rinvio di agosto).", category: "Adempimenti mensili", audience: "Tutti i contribuenti", priority: "alta" },
  { id: 7, date: "30 set 2025", month: "Settembre", title: "Dichiarazione IVA annuale integrativa", description: "Termine per la presentazione della dichiarazione IVA integrativa a favore per il periodo d'imposta 2024.", category: "IVA", audience: "Soggetti IVA con credito", priority: "bassa" },
  { id: 8, date: "31 ott 2025", month: "Ottobre", title: "LIPE – Liquidazione IVA III trimestre", description: "Comunicazione dei dati delle liquidazioni IVA del terzo trimestre 2025 all'Agenzia delle Entrate.", category: "IVA", audience: "Soggetti IVA trimestrali", priority: "alta" },
  { id: 9, date: "31 ott 2025", month: "Ottobre", title: "Modello Redditi 2025 – Persone Fisiche", description: "Termine per la trasmissione telematica del Modello Redditi PF 2025 per le persone fisiche.", category: "Dichiarazioni", audience: "Persone fisiche, autonomi, professionisti", priority: "alta" },
  { id: 10, date: "31 ott 2025", month: "Ottobre", title: "Modello Redditi 2025 – Società", description: "Termine per la trasmissione telematica del Modello Redditi SC e SP 2025.", category: "Dichiarazioni", audience: "Società di capitali e di persone", priority: "alta" },
  { id: 11, date: "27 dic 2025", month: "Dicembre", title: "Acconto IVA dicembre", description: "Versamento dell'acconto IVA di dicembre 2025 con uno dei metodi previsti (storico, previsionale, analitico).", category: "IVA", audience: "Tutti i soggetti IVA", priority: "alta" },
  { id: 12, date: "31 dic 2025", month: "Dicembre", title: "Concordato preventivo biennale – Adesione", description: "Termine per la eventuale adesione al Concordato Preventivo Biennale per i contribuenti ISA e forfettari.", category: "Regime agevolativo", audience: "ISA e forfettari", priority: "media" },
];

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  tags: string[];
  image: string;
}

export const articles: Article[] = [
  { id: 1, slug: "riforma-irpef-2025-guida-nuove-aliquote", title: "Riforma IRPEF 2025: guida alle nuove aliquote e ai moduli fiscali", excerpt: "Con la Legge di Bilancio 2025 il legislatore ha introdotto importanti modifiche alla tassazione IRPEF delle persone fisiche. Analizziamo le novità in vigore da gennaio 2025.", content: "", category: "Fiscalità", date: "12 maggio 2025", readTime: "8 min", author: "Elena Conti", authorRole: "Dottore Commercialista", tags: ["IRPEF", "Persone fisiche", "Legge di Bilancio 2025"], image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=450&fit=crop" },
  { id: 2, slug: "regime-forfettario-2025-limiti-cause-ostative", title: "Regime forfettario 2025: limite di ricavi, cause ostative e novità", excerpt: "Il regime forfettario si conferma l'opzione più vantaggiosa per molti autonomi e professionisti. Ecco le regole in vigore nel 2025, i controlli da effettuare e i casi di esclusione.", content: "", category: "Regime fiscale", date: "28 aprile 2025", readTime: "6 min", author: "Marco Brambilla", authorRole: "Partner Fondatore", tags: ["Regime forfettario", "Partita IVA", "Autonomi"], image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop" },
  { id: 3, slug: "concordato-preventivo-biennale-istruzioni", title: "Concordato preventivo biennale: guida pratica per contribuenti ISA", excerpt: "Il concordato preventivo biennale offre certezza del carico fiscale per due anni. Analizziamo chi può aderire, come viene calcolata la proposta e le convenienze economiche dell'istituto.", content: "", category: "Tributario", date: "10 aprile 2025", readTime: "10 min", author: "Marco Brambilla", authorRole: "Partner Fondatore", tags: ["Concordato preventivo", "ISA", "Accertamento"], image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&h=450&fit=crop" },
  { id: 4, slug: "bonus-ristrutturazioni-2025-novita", title: "Bonus ristrutturazioni 2025: aliquote, massimali e cessione del credito", excerpt: "Il quadro delle detrazioni edilizie si consolida. Riepiloghiamo le aliquote applicabili nel 2025 per le diverse tipologie di intervento e le regole sulla cessione del credito.", content: "", category: "Agevolazioni", date: "20 marzo 2025", readTime: "7 min", author: "Elena Conti", authorRole: "Dottore Commercialista", tags: ["Bonus edilizi", "Ristrutturazioni", "Detrazioni"], image: "https://images.unsplash.com/photo-1547565933-13a49bfa933d?w=800&h=450&fit=crop" },
  { id: 5, slug: "transfer-pricing-documentazione-2025", title: "Transfer pricing: la documentazione idonea aggiornata al 2025", excerpt: "Le nuove linee guida OCSE e i provvedimenti dell'Agenzia delle Entrate modificano i requisiti della documentazione di transfer pricing. Aggiorniamo il quadro per le imprese con transazioni infragruppo.", content: "", category: "Internazionale", date: "5 marzo 2025", readTime: "9 min", author: "Giulia Marini", authorRole: "Associate", tags: ["Transfer pricing", "Operazioni infragruppo", "OCSE"], image: "https://images.unsplash.com/photo-1729371568794-fb9c66ab09cf?w=800&h=450&fit=crop" },
  { id: 6, slug: "scegliere-forma-societaria", title: "Come scegliere la forma societaria per la propria impresa", excerpt: "SRL, SPA, SNC o ditta individuale? La scelta della forma giuridica ha importanti ricadute fiscali, di responsabilità e gestionali. Una guida per imprenditori che avviano o ristrutturano la propria attività.", content: "", category: "Societario", date: "18 febbraio 2025", readTime: "7 min", author: "Marco Brambilla", authorRole: "Partner Fondatore", tags: ["Forme societarie", "Startup", "Costituzione"], image: "https://images.unsplash.com/photo-1758518726324-62bef7c815b0?w=800&h=450&fit=crop" },
];

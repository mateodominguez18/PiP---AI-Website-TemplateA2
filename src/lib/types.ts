// Forme TypeScript dei dati restituiti dalle query GROQ in queries.ts.
// Una interface per ogni tipo di documento Sanity. I campi sono facoltativi (?)
// dove il CMS permette al redattore di lasciarli vuoti.

// Campi SEO opzionali (oggetto "seo"), compilabili dal redattore nello Studio.
export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
}

// Singleton "SEO Pagine": un blocco SEO opzionale per ogni pagina fissa.
export interface SanityPageSeo {
  home?: SeoFields;
  consulenza?: SeoFields;
  guide?: SeoFields;
  scadenze?: SeoFields;
  team?: SeoFields;
  contatti?: SeoFields;
}

export interface SanityTeamMember {
  _id: string;
  name: string;
  title?: string;
  role?: string;
  bio?: string;
  bioExtended?: string;
  education?: string[];
  specializations?: string[];
  linkedIn?: string;
  imageUrl?: string;
  order?: number;
}

export interface SanityConsultingArea {
  _id: string;
  title: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  fullDescription?: string;
  activities?: string[];
  benefits?: string[];
  targetClients?: string;
  faq?: { domanda: string; risposta: string; keyword_target?: string }[];
  order?: number;
  seo?: SeoFields;
}

export interface SanityTaxDeadline {
  _id: string;
  title: string;
  description?: string;
  date: string;
  month?: string;
  category?: string;
  priority?: "alta" | "media" | "bassa";
  audience?: string;
}

export interface SanityArticle {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  date: string;
  readTime?: string;
  author?: string;
  authorRole?: string;
  excerpt?: string;
  imageUrl?: string;
  tags?: string[];
  keyword_principale?: string;
  body?: unknown[];
  faq?: { domanda: string; risposta: string; keyword_target?: string }[];
  seo?: SeoFields;
}

export interface SanitySettings {
  studioName?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
  piva?: string;
  recruitingEmail?: string;
  logoUrl?: string;
  siteUrl?: string;

  // Link legali (footer, moduli di contatto)
  privacyPolicyUrl?: string;
  cookiePolicyUrl?: string;

  // Homepage — Hero
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaPrimaryLabel?: string;
  heroCtaSecondaryLabel?: string;
  heroBadges?: string[];
  heroImageUrl?: string;
  trustMetrics?: { value: string; label: string }[];

  // Homepage — Aree di consulenza
  areeEyebrow?: string;
  areeTitle?: string;
  areeDescription?: string;
  areeCtaLabel?: string;

  // Homepage — Scadenze
  scadenzeEyebrow?: string;
  scadenzeTitle?: string;
  scadenzeDescription?: string;
  scadenzeCtaLabel?: string;
  scadenzeColData?: string;
  scadenzeColAdempimento?: string;
  scadenzeColCategoria?: string;
  scadenzeColPriorita?: string;

  // Homepage — Guide
  guideEyebrow?: string;
  guideTitle?: string;
  guideCtaLabel?: string;

  // Homepage — Perché scegliere lo Studio
  differentiatorsEyebrow?: string;
  differentiatorsTitle?: string;
  differentiators?: { icon?: string; title: string; description: string }[];

  // Homepage — Team
  teamEyebrow?: string;
  teamTitle?: string;
  teamDescription?: string;
  teamCtaLabel?: string;

  // Homepage — Contatti
  contattiEyebrow?: string;
  contattiTitle?: string;
  contattiDescription?: string;
  contattiPhoneLabel?: string;
  contattiEmailLabel?: string;
  contattiFormTitle?: string;
}

import { defineField, defineType } from "sanity";

// Singleton unico con tutte le impostazioni del sito: identità/contatti, link legali
// e tutto il contenuto testuale editabile della homepage (hero, sezioni, CTA, ecc.).
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni Sito",
  type: "document",
  fieldsets: [
    { name: "legal", title: "Link legali", options: { collapsible: true, collapsed: true } },
    { name: "hero", title: "Homepage — Hero", options: { collapsible: true, collapsed: true } },
    { name: "aree", title: "Homepage — Aree di consulenza", options: { collapsible: true, collapsed: true } },
    { name: "scadenze", title: "Homepage — Scadenze", options: { collapsible: true, collapsed: true } },
    { name: "guide", title: "Homepage — Guide", options: { collapsible: true, collapsed: true } },
    { name: "differentiatorsSection", title: "Homepage — Perché scegliere lo Studio", options: { collapsible: true, collapsed: true } },
    { name: "team", title: "Homepage — Team", options: { collapsible: true, collapsed: true } },
    { name: "contatti", title: "Homepage — Contatti", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: "studioName",
      title: "Nome Studio",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Logo dello studio. Se vuoto, viene mostrata la sigla ricavata dal nome.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo (alt)",
          type: "string",
          description: "Se vuoto, viene usato il nome dello studio.",
        }),
      ],
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Telefono",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Indirizzo",
      type: "string",
    }),
    defineField({
      name: "hours",
      title: "Orari",
      type: "string",
    }),
    defineField({
      name: "piva",
      title: "Partita IVA",
      type: "string",
    }),
    defineField({
      name: "recruitingEmail",
      title: "Email Recruiting",
      type: "string",
    }),
    defineField({
      name: "siteUrl",
      title: "URL del sito",
      type: "url",
      description:
        "Dominio del sito (es. https://www.studio.it), usato per robots.txt, gli URL canonici e i dati strutturati. Se vuoto, viene usato il dominio di Vercel.",
    }),

    // ─── Link legali ─────────────────────────────────────────────────────────
    defineField({
      name: "privacyPolicyUrl",
      title: "URL Privacy Policy",
      type: "url",
      fieldset: "legal",
    }),
    defineField({
      name: "cookiePolicyUrl",
      title: "URL Cookie Policy",
      type: "url",
      fieldset: "legal",
    }),

    // ─── Homepage: Hero ──────────────────────────────────────────────────────
    defineField({ name: "heroEyebrow", title: "Sopratitolo", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitle", title: "Titolo", type: "string", fieldset: "hero" }),
    defineField({ name: "heroSubtitle", title: "Sottotitolo", type: "text", rows: 3, fieldset: "hero" }),
    defineField({ name: "heroCtaPrimaryLabel", title: "Testo bottone primario", type: "string", description: "Il link resta fisso su /contatti.", fieldset: "hero" }),
    defineField({ name: "heroCtaSecondaryLabel", title: "Testo bottone secondario", type: "string", description: "Il link resta fisso su /consulenza.", fieldset: "hero" }),
    defineField({
      name: "heroBadges",
      title: "Badge di fiducia",
      description: 'Es. "ODCEC Milano", "Revisori Legali MEF", "Consulenti del Lavoro"',
      type: "array",
      of: [{ type: "string" }],
      fieldset: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Immagine",
      type: "image",
      options: { hotspot: true },
      fieldset: "hero",
      fields: [
        defineField({ name: "alt", title: "Testo alternativo (alt)", type: "string" }),
      ],
    }),
    defineField({
      name: "trustMetrics",
      title: "Metriche di fiducia",
      description: 'Es. "22+ Anni di attività", mostrate sotto l\'immagine hero.',
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Valore", type: "string" },
            { name: "label", title: "Etichetta", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      fieldset: "hero",
    }),

    // ─── Homepage: Aree di consulenza ────────────────────────────────────────
    defineField({ name: "areeEyebrow", title: "Sopratitolo", type: "string", fieldset: "aree" }),
    defineField({ name: "areeTitle", title: "Titolo", type: "string", fieldset: "aree" }),
    defineField({ name: "areeDescription", title: "Descrizione", type: "text", rows: 2, fieldset: "aree" }),
    defineField({ name: "areeCtaLabel", title: "Testo bottone", type: "string", description: "Il link resta fisso su /consulenza.", fieldset: "aree" }),

    // ─── Homepage: Scadenze ──────────────────────────────────────────────────
    defineField({ name: "scadenzeEyebrow", title: "Sopratitolo", type: "string", fieldset: "scadenze" }),
    defineField({ name: "scadenzeTitle", title: "Titolo", type: "string", fieldset: "scadenze" }),
    defineField({ name: "scadenzeDescription", title: "Descrizione", type: "text", rows: 2, fieldset: "scadenze" }),
    defineField({ name: "scadenzeCtaLabel", title: "Testo bottone", type: "string", description: "Il link resta fisso su /scadenze.", fieldset: "scadenze" }),
    defineField({ name: "scadenzeColData", title: "Colonna: Data", type: "string", fieldset: "scadenze" }),
    defineField({ name: "scadenzeColAdempimento", title: "Colonna: Adempimento", type: "string", fieldset: "scadenze" }),
    defineField({ name: "scadenzeColCategoria", title: "Colonna: Categoria", type: "string", fieldset: "scadenze" }),
    defineField({ name: "scadenzeColPriorita", title: "Colonna: Priorità", type: "string", fieldset: "scadenze" }),

    // ─── Homepage: Guide ─────────────────────────────────────────────────────
    defineField({ name: "guideEyebrow", title: "Sopratitolo", type: "string", fieldset: "guide" }),
    defineField({ name: "guideTitle", title: "Titolo", type: "string", fieldset: "guide" }),
    defineField({ name: "guideCtaLabel", title: "Testo bottone", type: "string", description: "Il link resta fisso su /guide.", fieldset: "guide" }),

    // ─── Homepage: Perché scegliere lo Studio ───────────────────────────────
    defineField({ name: "differentiatorsEyebrow", title: "Sopratitolo", type: "string", fieldset: "differentiatorsSection" }),
    defineField({ name: "differentiatorsTitle", title: "Titolo", type: "string", fieldset: "differentiatorsSection" }),
    defineField({
      name: "differentiators",
      title: "Punti di forza",
      type: "array",
      fieldset: "differentiatorsSection",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icona",
              type: "string",
              description: "Nome icona Lucide (es. BookOpen, Users, Shield, Award, Clock)",
              options: {
                list: [
                  { title: "BookOpen", value: "BookOpen" },
                  { title: "Users", value: "Users" },
                  { title: "Shield", value: "Shield" },
                  { title: "Award", value: "Award" },
                  { title: "Clock", value: "Clock" },
                ],
              },
            },
            { name: "title", title: "Titolo", type: "string" },
            { name: "description", title: "Descrizione", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),

    // ─── Homepage: Team ──────────────────────────────────────────────────────
    defineField({ name: "teamEyebrow", title: "Sopratitolo", type: "string", fieldset: "team" }),
    defineField({ name: "teamTitle", title: "Titolo", type: "string", fieldset: "team" }),
    defineField({ name: "teamDescription", title: "Descrizione", type: "text", rows: 2, fieldset: "team" }),
    defineField({ name: "teamCtaLabel", title: "Testo bottone", type: "string", description: "Il link resta fisso su /team.", fieldset: "team" }),

    // ─── Homepage: Contatti ──────────────────────────────────────────────────
    defineField({ name: "contattiEyebrow", title: "Sopratitolo", type: "string", fieldset: "contatti" }),
    defineField({ name: "contattiTitle", title: "Titolo", type: "string", fieldset: "contatti" }),
    defineField({ name: "contattiDescription", title: "Descrizione", type: "text", rows: 2, fieldset: "contatti" }),
    defineField({ name: "contattiPhoneLabel", title: "Etichetta telefono", type: "string", fieldset: "contatti" }),
    defineField({ name: "contattiEmailLabel", title: "Etichetta email", type: "string", fieldset: "contatti" }),
    defineField({ name: "contattiFormTitle", title: "Titolo card modulo", type: "string", fieldset: "contatti" }),
  ],
  preview: {
    select: { title: "studioName" },
  },
});

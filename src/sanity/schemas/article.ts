import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Articolo / Guida",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Fiscalità", value: "Fiscalità" },
          { title: "Regime fiscale", value: "Regime fiscale" },
          { title: "Tributario", value: "Tributario" },
          { title: "Agevolazioni", value: "Agevolazioni" },
          { title: "Internazionale", value: "Internazionale" },
          { title: "Societario", value: "Societario" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Data pubblicazione",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readTime",
      title: "Tempo di lettura",
      type: "string",
      description: 'Es. "8 min"',
    }),
    defineField({
      name: "author",
      title: "Autore",
      type: "string",
    }),
    defineField({
      name: "authorRole",
      title: "Ruolo autore",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Estratto",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Immagine copertina",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo (alt)",
          type: "string",
          description: "Se vuoto, viene usato il titolo dell'articolo.",
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tag",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "keyword_principale",
      title: "Keyword principale (GEO)",
      type: "string",
      description: "Keyword target dell'articolo, da PROMPT-19-BLOG-POST-OUTLINE / PROMPT-20-BLOG-POST-DRAFT.",
    }),
    defineField({
      name: "body",
      title: "Corpo articolo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Testo normale", value: "normal" },
            { title: "Titolo H2", value: "h2" },
            { title: "Titolo H3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Grassetto", value: "strong" },
              { title: "Corsivo", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Testo alternativo (alt)", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      description: "Generate con PROMPT-15-FAQ-GENERATOR (GEO): domanda, risposta e keyword target.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "domanda", title: "Domanda", type: "string" },
            { name: "risposta", title: "Risposta", type: "text" },
            { name: "keyword_target", title: "Keyword target (GEO)", type: "string" },
          ],
          preview: { select: { title: "domanda" } },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Data (più recenti)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});

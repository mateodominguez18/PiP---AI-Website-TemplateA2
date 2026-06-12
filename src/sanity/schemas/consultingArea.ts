import { defineField, defineType } from "sanity";

export const consultingArea = defineType({
  name: "consultingArea",
  title: "Area di Consulenza",
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
      name: "icon",
      title: "Icona",
      type: "string",
      description: "Nome icona Lucide (es. BookOpen, FileText, Building2, Users, TrendingUp, Globe)",
      options: {
        list: [
          { title: "BookOpen", value: "BookOpen" },
          { title: "FileText", value: "FileText" },
          { title: "Building2", value: "Building2" },
          { title: "Users", value: "Users" },
          { title: "TrendingUp", value: "TrendingUp" },
          { title: "Globe", value: "Globe" },
        ],
      },
    }),
    defineField({
      name: "shortDescription",
      title: "Descrizione breve",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fullDescription",
      title: "Descrizione completa",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "activities",
      title: "Attività principali",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "benefits",
      title: "Vantaggi per il cliente",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "targetClients",
      title: "A chi è rivolto",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Domanda", type: "string" },
            { name: "answer", title: "Risposta", type: "text" },
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Ordine",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "shortDescription" },
  },
});

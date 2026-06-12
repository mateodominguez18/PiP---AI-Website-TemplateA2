import { defineField, defineType } from "sanity";

export const taxDeadline = defineType({
  name: "taxDeadline",
  title: "Scadenza Fiscale",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Adempimento",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "month",
      title: "Mese (etichetta)",
      type: "string",
      description: 'Es. "Giugno 2025"',
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Adempimenti mensili", value: "Adempimenti mensili" },
          { title: "IVA", value: "IVA" },
          { title: "IRPEF", value: "IRPEF" },
          { title: "Dichiarazioni", value: "Dichiarazioni" },
          { title: "Sostituti d'imposta", value: "Sostituti d'imposta" },
          { title: "Regime agevolativo", value: "Regime agevolativo" },
        ],
      },
    }),
    defineField({
      name: "priority",
      title: "Priorità",
      type: "string",
      options: {
        list: [
          { title: "Alta", value: "alta" },
          { title: "Media", value: "media" },
          { title: "Bassa", value: "bassa" },
        ],
      },
    }),
    defineField({
      name: "audience",
      title: "Destinatari",
      type: "string",
      description: 'Es. "Tutti i contribuenti", "Partite IVA"',
    }),
  ],
  orderings: [
    {
      title: "Data",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});

import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Membro del Team",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      description: 'Es. "Partner Fondatore"',
    }),
    defineField({
      name: "role",
      title: "Ruolo",
      type: "string",
      description: 'Es. "Dottore Commercialista e Revisore Legale"',
    }),
    defineField({
      name: "bio",
      title: "Bio breve",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bioExtended",
      title: "Bio estesa",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "education",
      title: "Formazione",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "specializations",
      title: "Specializzazioni",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "linkedIn",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo (alt)",
          type: "string",
          description: "Se vuoto, viene usato il nome del professionista.",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
      description: "Posizione nella lista (1 = primo)",
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
    select: { title: "name", subtitle: "role", media: "image" },
  },
});

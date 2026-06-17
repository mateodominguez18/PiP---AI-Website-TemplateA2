import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni Sito",
  type: "document",
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
  ],
  preview: {
    select: { title: "studioName" },
  },
});

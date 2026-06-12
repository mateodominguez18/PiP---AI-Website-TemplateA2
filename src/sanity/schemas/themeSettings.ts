import { defineField, defineType } from "sanity";

export const themeSettings = defineType({
  name: "themeSettings",
  title: "Tema & Stile",
  type: "document",
  fields: [
    defineField({
      name: "primaryColor",
      title: "Colore primario",
      description: "Usato per pulsanti, header tabelle, link attivi. Es. #1B3A5C",
      type: "string",
      validation: (r) =>
        r.regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex", invert: false }).warning(
          "Inserisci un colore esadecimale valido (es. #1B3A5C)"
        ),
    }),
    defineField({
      name: "primaryDarkColor",
      title: "Colore primario scuro",
      description: "Hover pulsante primario. Es. #0F2740",
      type: "string",
      validation: (r) =>
        r.regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex", invert: false }).warning(
          "Inserisci un colore esadecimale valido"
        ),
    }),
    defineField({
      name: "primaryLightColor",
      title: "Colore primario chiaro",
      description: "Accenti, scrollbar. Es. #2D5A8E",
      type: "string",
      validation: (r) =>
        r.regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex", invert: false }).warning(
          "Inserisci un colore esadecimale valido"
        ),
    }),
    defineField({
      name: "accentColor",
      title: "Colore accento",
      description: "Pulsanti teal, badge, highlights. Es. #2A7F6F",
      type: "string",
      validation: (r) =>
        r.regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex", invert: false }).warning(
          "Inserisci un colore esadecimale valido"
        ),
    }),
    defineField({
      name: "accentLightColor",
      title: "Colore accento chiaro",
      description: "Variante chiara accento. Es. #5BB5A3",
      type: "string",
      validation: (r) =>
        r.regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex", invert: false }).warning(
          "Inserisci un colore esadecimale valido"
        ),
    }),
    defineField({
      name: "fontFamily",
      title: "Font",
      description: "Font principale del sito",
      type: "string",
      options: {
        list: [
          { title: "Inter (default)", value: "Inter" },
          { title: "Roboto", value: "Roboto" },
          { title: "Open Sans", value: "Open Sans" },
          { title: "Lato", value: "Lato" },
          { title: "Poppins", value: "Poppins" },
          { title: "DM Sans", value: "DM Sans" },
          { title: "Source Sans 3", value: "Source Sans 3" },
          { title: "Merriweather", value: "Merriweather" },
          { title: "Playfair Display", value: "Playfair Display" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Tema & Stile" };
    },
  },
});

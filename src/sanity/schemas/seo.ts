import { defineType, defineField } from "sanity";

// Oggetto SEO riusabile, incluso nelle pagine e nei contenuti per personalizzare title
// e description nei risultati di Google. È un blocco richiudibile (di default chiuso) così
// non intralcia chi modifica i contenuti. Se i campi restano vuoti, vengono usati i testi
// predefiniti scritti nel codice: nessuna pagina resta senza SEO.
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Titolo nei risultati Google. Consigliato max ~60 caratteri. Se vuoto, usa il default.",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Descrizione nei risultati Google. Ideale 140-160 caratteri. Se vuoto, usa il default.",
      validation: (r) => r.max(180),
    }),
  ],
});

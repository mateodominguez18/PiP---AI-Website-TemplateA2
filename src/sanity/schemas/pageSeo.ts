import { defineType, defineField } from "sanity";

// Singleton che raccoglie i campi SEO delle pagine fisse (home, consulenza, ecc.).
// Ogni voce usa l'oggetto "seo" ed è facoltativa: se lasciata vuota, la pagina mostra
// il SEO predefinito del codice. Serve a dare al redattore un posto da cui controllare
// e sovrascrivere title/description di queste pagine senza toccare il codice.
export const pageSeo = defineType({
  name: "pageSeo",
  title: "SEO Pagine",
  type: "document",
  fields: [
    defineField({ name: "home", title: "Home", type: "seo" }),
    defineField({ name: "consulenza", title: "Consulenza", type: "seo" }),
    defineField({ name: "guide", title: "Guide", type: "seo" }),
    defineField({ name: "scadenze", title: "Scadenze", type: "seo" }),
    defineField({ name: "team", title: "Team", type: "seo" }),
    defineField({ name: "contatti", title: "Contatti", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "SEO Pagine" }) },
});

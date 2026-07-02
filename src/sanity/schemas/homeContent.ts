import { defineField, defineType } from "sanity";

// Singleton con tutto il contenuto editabile della homepage: sezione hero,
// metriche di fiducia e i punti di forza ("Perché scegliere lo Studio").
export const homeContent = defineType({
  name: "homeContent",
  title: "Contenuti Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero — Sopratitolo",
      type: "string",
      description: 'Es. "Studio Professionale · Milano dal 2002"',
    }),
    defineField({
      name: "heroTitle",
      title: "Hero — Titolo",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero — Sottotitolo",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroBadges",
      title: "Hero — Badge di fiducia",
      description: 'Es. "ODCEC Milano", "Revisori Legali MEF", "Consulenti del Lavoro"',
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero — Immagine",
      type: "image",
      options: { hotspot: true },
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
    }),
    defineField({
      name: "differentiators",
      title: "Perché scegliere lo Studio",
      description: "Punti di forza mostrati in homepage nella sezione \"Perché scegliere lo Studio\".",
      type: "array",
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
  ],
  preview: {
    prepare: () => ({ title: "Contenuti Homepage" }),
  },
});

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const singletons = new Set(["siteSettings", "themeSettings"]);

export default defineConfig({
  name: "brambilla-associati",
  title: "Brambilla & Associati",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenuti")
          .items([
            S.listItem()
              .title("Impostazioni Sito")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.listItem()
              .title("Tema & Stile")
              .id("themeSettings")
              .child(
                S.document()
                  .schemaType("themeSettings")
                  .documentId("themeSettings")
              ),
            S.divider(),
            S.documentTypeListItem("teamMember").title("Team"),
            S.documentTypeListItem("consultingArea").title("Aree di Consulenza"),
            S.documentTypeListItem("taxDeadline").title("Scadenze Fiscali"),
            S.documentTypeListItem("article").title("Articoli / Guide"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  basePath: "/studio",
});

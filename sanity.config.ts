import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

export default defineConfig({
  name: "brambilla-associati",
  title: "Brambilla & Associati",
  projectId: "gnq02fl6",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [],
  },
  basePath: "/studio",
});

import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "gnq02fl6",
  dataset: "production",
  apiVersion: "2025-06-12",
  useCdn: true,
});

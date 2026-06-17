// Sanity client used by every server-side query in the app (see queries.ts).
// Credentials come from public env vars; there is no API token here because the
// public site only ever reads already-published content.
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
});

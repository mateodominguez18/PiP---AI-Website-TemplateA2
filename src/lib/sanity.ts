// Client di Sanity usato da ogni query lato server dell'app (vedi queries.ts).
// Le credenziali vengono da variabili d'ambiente pubbliche; qui non c'è alcun token
// API perché il sito pubblico legge solo contenuti già pubblicati.
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
});

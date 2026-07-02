import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/queries";

// Genera /robots.txt. Il dominio viene da Sanity (Impostazioni Sito), così si può
// cambiare senza rifare il deploy. Blocca l'indicizzazione del pannello /studio e
// delle rotte API; tutto il resto è consentito.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = await getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    host: baseUrl,
  };
}

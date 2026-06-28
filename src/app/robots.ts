import type { MetadataRoute } from "next";
import { getSiteUrl, getSitemapUrl } from "@/lib/queries";

// Genera /robots.txt. Il dominio e l'URL della sitemap vengono da Sanity (Impostazioni
// Sito), così si possono cambiare senza rifare il deploy. Blocca l'indicizzazione del
// pannello /studio e delle rotte API; tutto il resto è consentito.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const [baseUrl, sitemap] = await Promise.all([getSiteUrl(), getSitemapUrl()]);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap,
    host: baseUrl,
  };
}

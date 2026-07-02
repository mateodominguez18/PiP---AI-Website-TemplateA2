// Livello dati centrale: qui vivono tutte le query GROQ del sito. Le pagine chiamano
// queste funzioni dai server component e passano il risultato come props — nessun
// componente interroga Sanity direttamente. Le costanti FIELDS sono proiezioni condivise riusate tra le query.
import { client } from "./sanity";
import { resolveSiteUrl } from "./seo";
import type {
  SanityTeamMember,
  SanityConsultingArea,
  SanityTaxDeadline,
  SanityArticle,
  SanitySettings,
  SanityPageSeo,
} from "./types";

// Il contenuto è in cache per 60s, così le modifiche in Sanity appaiono in fretta senza interrogare l'API a ogni richiesta.
const opts = { next: { revalidate: 60 } };

// "imageUrl": image.asset->url risolve il riferimento all'asset di Sanity così i componenti ricevono direttamente l'URL come stringa.
const TEAM_FIELDS = `_id, name, title, role, bio, bioExtended, education, specializations, linkedIn, "imageUrl": image.asset->url, order`;
const AREA_FIELDS = `_id, title, "slug": slug.current, icon, shortDescription, fullDescription, activities, benefits, targetClients, faq, order, seo`;
const DEADLINE_FIELDS = `_id, title, description, date, month, category, priority, audience`;
const ARTICLE_FIELDS = `_id, title, "slug": slug.current, category, date, readTime, author, authorRole, excerpt, "imageUrl": image.asset->url, tags`;
const ARTICLE_FULL_FIELDS = `${ARTICLE_FIELDS}, keyword_principale, body, faq, seo`;

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return client.fetch(`*[_type == "teamMember"] | order(order asc) { ${TEAM_FIELDS} }`, {}, opts);
}

export async function getConsultingAreas(): Promise<SanityConsultingArea[]> {
  return client.fetch(`*[_type == "consultingArea"] | order(order asc) { ${AREA_FIELDS} }`, {}, opts);
}

export async function getConsultingArea(slug: string): Promise<SanityConsultingArea | null> {
  return client.fetch(
    `*[_type == "consultingArea" && slug.current == $slug][0] { ${AREA_FIELDS} }`,
    { slug },
    opts
  );
}

export async function getTaxDeadlines(): Promise<SanityTaxDeadline[]> {
  return client.fetch(`*[_type == "taxDeadline"] | order(date asc) { ${DEADLINE_FIELDS} }`, {}, opts);
}

export async function getArticles(): Promise<SanityArticle[]> {
  return client.fetch(`*[_type == "article"] | order(date desc) { ${ARTICLE_FIELDS} }`, {}, opts);
}

export async function getArticle(slug: string): Promise<SanityArticle | null> {
  return client.fetch(
    `*[_type == "article" && slug.current == $slug][0] { ${ARTICLE_FULL_FIELDS} }`,
    { slug },
    opts
  );
}

export async function getSiteSettings(): Promise<SanitySettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0] { studioName, tagline, email, phone, address, hours, piva, recruitingEmail, siteUrl, "logoUrl": logo.asset->url }`,
    {},
    opts
  );
}

// SEO opzionale delle pagine fisse (singleton "pageSeo"). Ogni pagina usa il suo blocco
// come override; se vuoto, restano i default scritti nel codice.
export async function getPageSeo(): Promise<SanityPageSeo | null> {
  return client.fetch(`*[_type == "pageSeo"][0]{ home, consulenza, guide, scadenze, team, contatti }`, {}, opts);
}

// URL di base del sito, preso da Sanity (modificabile senza redeploy) con fallback su env/Vercel.
// Usato da robots, dagli URL canonici e dal JSON-LD così l'intero sito usa lo stesso dominio.
export async function getSiteUrl(): Promise<string> {
  const settings = await getSiteSettings();
  return resolveSiteUrl(settings?.siteUrl);
}

// no-store così generateStaticParams vede sempre gli articoli/aree appena pubblicati — una lista in cache li mancherebbe fino alla rivalidazione.
export async function getArticleSlugs(): Promise<string[]> {
  const results: { slug: string }[] = await client.fetch(
    `*[_type == "article" && defined(slug.current)] { "slug": slug.current }`,
    {},
    { cache: "no-store" }
  );
  return results.map((r) => r.slug);
}

// Stessa logica no-store di getArticleSlugs.
export async function getConsultingAreaSlugs(): Promise<string[]> {
  const results: { slug: string }[] = await client.fetch(
    `*[_type == "consultingArea" && defined(slug.current)] { "slug": slug.current }`,
    {},
    { cache: "no-store" }
  );
  return results.map((r) => r.slug);
}

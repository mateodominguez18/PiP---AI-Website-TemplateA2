// Central data layer: every GROQ query the site runs lives here. Pages call these
// functions from server components and pass the result down as props — no component
// fetches Sanity directly. The FIELDS constants are shared projections reused across queries.
import { client } from "./sanity";
import type {
  SanityTeamMember,
  SanityConsultingArea,
  SanityTaxDeadline,
  SanityArticle,
  SanitySettings,
} from "./types";

// Content is cached for 60s so Sanity edits appear quickly without hammering the API on every request.
const opts = { next: { revalidate: 60 } };

// "imageUrl": image.asset->url resolves the Sanity asset reference inline so components receive a plain URL string.
const TEAM_FIELDS = `_id, name, title, role, bio, bioExtended, education, specializations, linkedIn, "imageUrl": image.asset->url, order`;
const AREA_FIELDS = `_id, title, "slug": slug.current, icon, shortDescription, fullDescription, activities, benefits, targetClients, faq, order`;
const DEADLINE_FIELDS = `_id, title, description, date, month, category, priority, audience`;
const ARTICLE_FIELDS = `_id, title, "slug": slug.current, category, date, readTime, author, authorRole, excerpt, "imageUrl": image.asset->url, tags`;
const ARTICLE_FULL_FIELDS = `${ARTICLE_FIELDS}, body, faq`;

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
    `*[_type == "siteSettings"][0] { studioName, tagline, email, phone, address, hours, piva, recruitingEmail, "logoUrl": logo.asset->url }`,
    {},
    opts
  );
}

// no-store so generateStaticParams always sees newly published articles/areas — a cached list would miss them until revalidation.
export async function getArticleSlugs(): Promise<string[]> {
  const results: { slug: string }[] = await client.fetch(
    `*[_type == "article" && defined(slug.current)] { "slug": slug.current }`,
    {},
    { cache: "no-store" }
  );
  return results.map((r) => r.slug);
}

// Same no-store rationale as getArticleSlugs.
export async function getConsultingAreaSlugs(): Promise<string[]> {
  const results: { slug: string }[] = await client.fetch(
    `*[_type == "consultingArea" && defined(slug.current)] { "slug": slug.current }`,
    {},
    { cache: "no-store" }
  );
  return results.map((r) => r.slug);
}

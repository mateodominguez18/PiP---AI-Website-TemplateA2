// Funzioni di utilità per la SEO, condivise dalle generateMetadata() delle pagine.
// Permettono alle pagine fisse di mantenere il testo SEO scritto a mano e controllato
// in lunghezza, prendendo però nome studio e città da Sanity: così rinominando lo studio
// (o cambiando città) nel CMS ogni title/description si aggiorna in automatico.

// Estrae la città dall'indirizzo libero ("Via X, 20121 Milano (MI)" -> "Milano").
// Ripiega su "Milano" se l'indirizzo è vuoto o in un formato inatteso.
export function cityFromAddress(address?: string, fallback = "Milano"): string {
  if (!address) return fallback;
  const match = address.match(/\d{5}\s+([^(,]+?)\s*(?:\(|$)/);
  return match ? match[1].trim() : fallback;
}

// Costruisce "<lead> a <città> – <studio>", ma toglie " a <città>" se il titolo completo
// supererebbe il limite di ~60 caratteri di Google. Per le pagine senza città, non passarla.
export function buildTitle(lead: string, studio: string, city?: string): string {
  if (city) {
    const withCity = `${lead} a ${city} – ${studio}`;
    if (withCity.length <= 60) return withCity;
  }
  return `${lead} – ${studio}`;
}

// Risolve l'URL di base del sito (usato per robots, canonical e JSON-LD).
// Priorità: il valore impostato in Sanity (modificabile senza redeploy), poi la
// variabile d'ambiente, poi l'URL automatico di Vercel, infine localhost.
export function resolveSiteUrl(siteUrl?: string): string {
  const fromVercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
  const url = siteUrl || process.env.NEXT_PUBLIC_SITE_URL || fromVercel || "http://localhost:3000";
  return url.trim().replace(/\/+$/, ""); // niente "/" finale
}

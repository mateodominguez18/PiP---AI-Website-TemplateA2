// SEO helpers shared by the page-level generateMetadata() functions.
// They let the fixed pages keep their hand-written, length-checked SEO copy while
// pulling the studio name and city from Sanity, so renaming the studio (or moving
// city) in the CMS updates every title/description automatically.

// Pulls the city out of the free-text address ("Via X, 20121 Milano (MI)" -> "Milano").
// Falls back to "Milano" if the address is empty or in an unexpected format.
export function cityFromAddress(address?: string, fallback = "Milano"): string {
  if (!address) return fallback;
  const match = address.match(/\d{5}\s+([^(,]+?)\s*(?:\(|$)/);
  return match ? match[1].trim() : fallback;
}

// Builds "<lead> a <city> – <studio>", but drops " a <city>" if the full title would
// exceed Google's ~60-char limit. Pass no city for pages that don't need one.
export function buildTitle(lead: string, studio: string, city?: string): string {
  if (city) {
    const withCity = `${lead} a ${city} – ${studio}`;
    if (withCity.length <= 60) return withCity;
  }
  return `${lead} – ${studio}`;
}

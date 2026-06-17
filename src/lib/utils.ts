// Date helpers. Sanity stores dates as ISO strings ("2025-06-16"); these turn
// them into the Italian display formats used across the site.
const MONTHS_ABB = ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];
const MONTHS_FULL = ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];

export function formatDate(isoDate: string): string {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${parseInt(day)} ${MONTHS_ABB[parseInt(month) - 1]} ${year}`;
}

export function formatDateFull(isoDate: string): string {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${parseInt(day)} ${MONTHS_FULL[parseInt(month) - 1]} ${year}`;
}

// Fallback logo mark: builds initials from the studio name when no logo image is set.
// "Brambilla & Associati" -> "B&A", "Rossi & Partners" -> "R&P".
export function initialsFromName(name: string): string {
  const words = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "—";
  return words.map((w) => (w === "&" ? "&" : w[0])).join("").toUpperCase().slice(0, 5);
}

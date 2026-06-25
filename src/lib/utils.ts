// Funzioni di utilità per le date. Sanity salva le date come stringhe ISO
// ("2025-06-16"); queste le trasformano nei formati italiani usati nel sito.
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

// Sigla di riserva per il logo: ricava le iniziali dal nome dello studio quando non c'è un'immagine.
// "Brambilla & Associati" -> "B&A", "Rossi & Partners" -> "R&P".
export function initialsFromName(name: string): string {
  const words = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "—";
  return words.map((w) => (w === "&" ? "&" : w[0])).join("").toUpperCase().slice(0, 5);
}

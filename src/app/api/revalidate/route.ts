// Endpoint webhook chiamato da Sanity ogni volta che un contenuto viene pubblicato.
// Rigenera OGNI pagina del sito su richiesta (invece di aspettare la finestra ISR di 60s).
//
// revalidatePath("/", "layout") invalida tutte le rotte che condividono il layout radice,
// cioè l'intero sito — così una modifica a qualsiasi documento aggiorna ogni pagina.
//
// Protetto da un segreto condiviso (SANITY_REVALIDATE_SECRET) così solo Sanity può
// attivarlo. Il segreto si passa come ?secret=... nell'URL oppure nell'header
// x-revalidate-secret.
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const provided = req.nextUrl.searchParams.get("secret") ?? req.headers.get("x-revalidate-secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || provided !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: "Invalid or missing secret." }, { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

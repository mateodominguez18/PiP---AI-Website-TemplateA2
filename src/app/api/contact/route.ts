// Rotta API che gestisce entrambi i moduli di contatto (homepage + /contatti). Riceve
// il POST del modulo, costruisce un'email HTML e la invia tramite l'API transazionale di
// Brevo. Tutte le credenziali Brevo e l'indirizzo destinatario vengono dalle variabili d'ambiente.
import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/queries";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// L'input del modulo non è attendibile: va sottoposto a escape prima di inserirlo nell'HTML dell'email per evitare iniezioni.
function escapeHtml(value: string): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(data: Record<string, string>, studioName: string): string {
  const rows = [
    ["Nome", `${data.nome ?? ""} ${data.cognome ?? ""}`.trim()],
    ["Email", data.email],
    ["Telefono", data.telefono || "—"],
    ["Tipo cliente", data.clientType || "—"],
    ["Area di interesse", data.service || "—"],
    ["Messaggio", data.messaggio],
    ["Provenienza", data.source || "sito"],
  ]
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#6B7280;white-space:nowrap;border-bottom:1px solid #E5E7EB;">${label}</td>
        <td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #E5E7EB;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
        <tr>
          <td style="background:linear-gradient(135deg,#0F2740,#1B3A5C);padding:28px 32px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);">${escapeHtml(studioName)}</p>
            <h1 style="margin:6px 0 0;font-size:20px;color:#ffffff;font-weight:600;">Nuova richiesta di contatto</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;background:#F9FAFB;border-top:1px solid #E5E7EB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">Questa email è stata generata automaticamente dal modulo di contatto di ${escapeHtml(studioName)}.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, cognome, email, telefono, clientType, service, messaggio, source } = body;

    if (!nome || !email || !messaggio) {
      return NextResponse.json({ error: "Campi obbligatori mancanti." }, { status: 400 });
    }

    // Il nome dello studio viene da Sanity così il branding dell'email segue un'eventuale rinomina nel CMS.
    const settings = await getSiteSettings();
    const studioName = settings?.studioName || "Brambilla & Associati";

    const payload = {
      sender: {
        name: process.env.BREVO_SENDER_NAME,
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: process.env.BREVO_RECIPIENT_EMAIL ?? process.env.BREVO_SENDER_EMAIL }],
      replyTo: { email, name: `${nome} ${cognome ?? ""}`.trim() },
      subject: `Nuova richiesta — ${nome} ${cognome ?? ""}`.trim(),
      htmlContent: buildHtml({ nome, cognome, email, telefono, clientType, service, messaggio, source }, studioName),
    };

    const res = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Brevo error:", err);
      return NextResponse.json({ error: "Errore nell'invio." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact route error:", e);
    return NextResponse.json({ error: "Errore del server." }, { status: 500 });
  }
}

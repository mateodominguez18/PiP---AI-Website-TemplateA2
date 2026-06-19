// Webhook endpoint called by Sanity whenever content is published. It regenerates
// EVERY page of the site on demand (instead of waiting for the 60s ISR window).
//
// revalidatePath("/", "layout") invalidates all routes that share the root layout,
// i.e. the whole site — so a change to any document refreshes every page.
//
// Protected by a shared secret (SANITY_REVALIDATE_SECRET) so only Sanity can trigger
// it. The secret is passed either as ?secret=... in the URL or in the
// x-revalidate-secret header.
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

// TEMP diagnostic — confirms whether the secret env var reached this deployment
// (reports only presence and length, never the value). Remove after verifying.
export async function GET() {
  const s = process.env.SANITY_REVALIDATE_SECRET;
  return NextResponse.json({ secretConfigured: Boolean(s), secretLength: s ? s.length : 0 });
}

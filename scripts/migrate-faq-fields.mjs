// Migrazione una tantum: rinomina i campi "faq" esistenti (question/answer) nel nuovo
// schema domanda/risposta/keyword_target, allineato all'output di PROMPT-15-FAQ-GENERATOR.
// Eseguire con: node --env-file=.env.local scripts/migrate-faq-fields.mjs
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-06-12",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// keyword_target per area, usata come fallback per il contenuto già pubblicato
// (non presente nei vecchi documenti question/answer).
const KEYWORD_BY_TITLE = {
  "Contabilità e Bilancio": "contabilità e bilancio",
  "Consulenza Fiscale": "consulenza fiscale",
  "Diritto Societario": "diritto societario",
  "Lavoro e Paghe": "lavoro e paghe",
  "Operazioni Straordinarie": "operazioni straordinarie",
  "Fiscalità Internazionale": "fiscalità internazionale",
};

async function migrate() {
  const docs = await client.fetch(
    `*[_type in ["consultingArea","article"] && defined(faq)]{ _id, _type, title, faq }`
  );

  if (docs.length === 0) {
    console.log("Nessun documento con faq da migrare.");
    return;
  }

  const tx = client.transaction();
  for (const doc of docs) {
    const needsMigration = doc.faq.some((f) => "question" in f || "answer" in f);
    if (!needsMigration) continue;

    const newFaq = doc.faq.map((f) => ({
      _key: f._key,
      _type: f._type ?? "object",
      domanda: f.domanda ?? f.question,
      risposta: f.risposta ?? f.answer,
      keyword_target: f.keyword_target ?? KEYWORD_BY_TITLE[doc.title],
    }));

    tx.patch(doc._id, (p) => p.set({ faq: newFaq }));
    console.log(`  → ${doc._type} "${doc.title}" (${doc._id}): ${newFaq.length} FAQ migrate`);
  }

  await tx.commit();
  console.log("Migrazione completata.");
}

migrate().catch((e) => {
  console.error("Errore durante la migrazione:", e);
  process.exit(1);
});

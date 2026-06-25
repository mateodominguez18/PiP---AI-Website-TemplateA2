import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiteChrome } from "@/components/SiteChrome";
import { client } from "@/lib/sanity";
import { getSiteSettings } from "@/lib/queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// SEO predefinita/di riserva. metadataBase permette ai percorsi `alternates.canonical`
// di ogni pagina (es. "/team") di risolversi in URL assoluti. Ogni pagina sovrascrive title/description.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Brambilla & Associati — Dottori Commercialisti a Milano",
  description:
    "Studio professionale con sede a Milano. Consulenza fiscale, societaria e del lavoro per imprenditori, professionisti e imprese.",
};

const DEFAULTS = {
  primaryColor: "#1B3A5C",
  primaryDarkColor: "#0F2740",
  primaryLightColor: "#2D5A8E",
  accentColor: "#2A7F6F",
  accentLightColor: "#5BB5A3",
  fontFamily: "Inter",
};

// Ripiega su null in caso di errore così il sito si mostra comunque con i DEFAULTS se Sanity è irraggiungibile.
async function getTheme() {
  try {
    return await client.fetch(
      `*[_type == "themeSettings"][0]{primaryColor,primaryDarkColor,primaryLightColor,accentColor,accentLightColor,fontFamily}`,
      {},
      { next: { revalidate: 60 } }
    );
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, settings] = await Promise.all([getTheme(), getSiteSettings()]);

  const primary = theme?.primaryColor || DEFAULTS.primaryColor;
  const primaryDark = theme?.primaryDarkColor || DEFAULTS.primaryDarkColor;
  const primaryLight = theme?.primaryLightColor || DEFAULTS.primaryLightColor;
  const accent = theme?.accentColor || DEFAULTS.accentColor;
  const accentLight = theme?.accentLightColor || DEFAULTS.accentLightColor;
  const font = theme?.fontFamily || DEFAULTS.fontFamily;

  const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}:wght@300;400;500;600;700&display=swap`;

  const cssOverride = `
    :root {
      --brand-navy: ${primary};
      --brand-navy-dark: ${primaryDark};
      --brand-navy-light: ${primaryLight};
      --brand-teal: ${accent};
      --brand-teal-light: ${accentLight};
      --action-primary: ${primary};
      --action-accent: ${accent};
      --font-family: '${font}';
    }
  `;

  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontUrl} rel="stylesheet" />
        {/* Stile inline perché i valori vengono da Sanity al momento della richiesta — non possono stare in un file CSS statico. */}
        <style dangerouslySetInnerHTML={{ __html: cssOverride }} />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://embeds.iubenda.com/widgets/e164dbb6-76ee-471a-af39-765056ca77c6.js" async />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <SiteChrome
          navbar={<Navbar studioName={settings?.studioName} phone={settings?.phone} logoUrl={settings?.logoUrl} />}
          footer={
            <Footer
              studioName={settings?.studioName}
              piva={settings?.piva}
              email={settings?.email}
              phone={settings?.phone}
              address={settings?.address}
              hours={settings?.hours}
              logoUrl={settings?.logoUrl}
            />
          }
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}

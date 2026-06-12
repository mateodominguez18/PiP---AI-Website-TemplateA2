import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { client } from "@/lib/sanity";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Brambilla & Associati — Dottori Commercialisti Milano",
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
        <style dangerouslySetInnerHTML={{ __html: cssOverride }} />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://embeds.iubenda.com/widgets/e164dbb6-76ee-471a-af39-765056ca77c6.js" async />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar studioName={settings?.studioName} phone={settings?.phone} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer
          studioName={settings?.studioName}
          piva={settings?.piva}
          email={settings?.email}
          phone={settings?.phone}
          address={settings?.address}
          hours={settings?.hours}
        />
      </body>
    </html>
  );
}

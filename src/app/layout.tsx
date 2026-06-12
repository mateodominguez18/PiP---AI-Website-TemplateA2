import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Brambilla & Associati — Dottori Commercialisti Milano",
  description:
    "Studio professionale con sede a Milano. Consulenza fiscale, societaria e del lavoro per imprenditori, professionisti e imprese.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://embeds.iubenda.com/widgets/e164dbb6-76ee-471a-af39-765056ca77c6.js" async />
      </head>
      <body className={inter.className} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

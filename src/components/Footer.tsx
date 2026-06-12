import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Linkedin } from "lucide-react";

interface FooterProps {
  studioName?: string;
  piva?: string;
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
}

const consultingLinks = [
  { label: "Contabilità e Bilancio", href: "/consulenza/contabilita-e-bilancio" },
  { label: "Consulenza Fiscale", href: "/consulenza/consulenza-fiscale" },
  { label: "Diritto Societario", href: "/consulenza/diritto-societario" },
  { label: "Lavoro e Paghe", href: "/consulenza/lavoro-e-paghe" },
  { label: "Operazioni Straordinarie", href: "/consulenza/operazioni-straordinarie" },
  { label: "Fiscalità Internazionale", href: "/consulenza/fiscalita-internazionale" },
];

const studioLinks = [
  { label: "Il Team", href: "/team" },
  { label: "Scadenze Fiscali", href: "/scadenze" },
  { label: "Guide e Novità", href: "/guide" },
  { label: "Contattaci", href: "/contatti" },
];

export function Footer({
  studioName = "Brambilla & Associati",
  piva = "12345678901",
  email = "info@brambilla-associati.it",
  phone = "+39 02 123456",
  address = "Via Montenapoleone 8, 20121 Milano",
  hours = "Lun–Ven 9:00–18:00",
}: FooterProps) {
  return (
    <footer style={{ backgroundColor: "var(--brand-navy-dark)", color: "rgba(255,255,255,0.85)" }}>
      <div className="container" style={{ paddingBlock: "4rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
          }}
        >
          {/* Studio info */}
          <div style={{ gridColumn: "span 2" }} className="footer-wide-col">
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--brand-teal)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "white", fontSize: "0.875rem", fontWeight: 700 }}>B&A</span>
              </div>
              <span style={{ color: "white", fontWeight: 700, fontSize: "1rem" }}>{studioName}</span>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: "22rem", marginBottom: "1.5rem" }}>
              Studio professionale con sede a Milano. Consulenza fiscale, societaria e del lavoro per imprenditori, professionisti e imprese.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <a href={`tel:${phone}`} className="footer-link" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Phone size={14} style={{ flexShrink: 0 }} />
                {phone}
              </a>
              <a href={`mailto:${email}`} className="footer-link" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Mail size={14} style={{ flexShrink: 0 }} />
                {email}
              </a>
              <span style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
                <MapPin size={14} style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                {address}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
                <Clock size={14} style={{ flexShrink: 0 }} />
                {hours}
              </span>
            </div>
          </div>

          {/* Consulenza */}
          <div>
            <p style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>
              Aree di consulenza
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {consultingLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <p style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>
              Lo studio
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {studioLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "1.5rem" }}>
              <p style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>
                Seguici
              </p>
              <a
                href="#"
                className="footer-link"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div
          className="container"
          style={{
            paddingBlock: "1.25rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} {studioName}. P.IVA {piva}. Tutti i diritti riservati.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a
              href="https://www.iubenda.com/privacy-policy/98533713"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
            >
              Privacy Policy
            </a>
            <a
              href="https://www.iubenda.com/privacy-policy/98533713/cookie-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-wide-col { grid-column: span 1 !important; }
        }
      `}</style>
    </footer>
  );
}

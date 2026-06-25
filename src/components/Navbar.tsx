"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { initialsFromName } from "@/lib/utils";

interface NavbarProps {
  studioName?: string;
  phone?: string;
  logoUrl?: string;
}

const navItems = [
  { label: "Consulenza", href: "/consulenza" },
  { label: "Guide e Novità", href: "/guide" },
  { label: "Scadenze", href: "/scadenze" },
  { label: "Team", href: "/team" },
];

export function Navbar({ studioName = "Brambilla & Associati", phone = "+39 02 123456", logoUrl }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "var(--background-default)",
        borderBottom: `1px solid var(--border-default)`,
        boxShadow: scrolled ? "0 2px 12px rgba(15, 39, 64, 0.06)" : "none",
        transition: "box-shadow 0.2s",
      }}
    >
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>
          {/* Logo: immagine caricata da Sanity, oppure le iniziali ricavate dal nome dello studio */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem" }}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={studioName}
                style={{ height: "2rem", width: "auto", maxWidth: "8rem", objectFit: "contain", display: "block", flexShrink: 0 }}
              />
            ) : (
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--brand-navy)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "white", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  {initialsFromName(studioName)}
                </span>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--brand-navy)", letterSpacing: "-0.01em" }}>
                {studioName}
              </span>
              <span style={{ fontSize: "0.6875rem", color: "var(--foreground-muted)", letterSpacing: "0.04em" }}>
                Dottori Commercialisti
              </span>
            </div>
          </Link>

          {/* Navigazione desktop */}
          <nav style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} className="hidden-mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${pathname.startsWith(item.href) ? " active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} className="hidden-mobile">
            <a
              href={`tel:${phone}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.875rem",
                color: "var(--foreground-muted)",
                textDecoration: "none",
              }}
            >
              <Phone size={14} />
              {phone}
            </a>
            <Link href="/contatti" className="btn-primary btn-sm">
              Richiedi consulenza
            </Link>
          </div>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              padding: "0.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--foreground-default)",
            }}
            className="show-mobile"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div
          style={{
            borderTop: `1px solid var(--border-default)`,
            backgroundColor: "var(--background-default)",
            padding: "1rem 0 1.5rem",
          }}
        >
          <div className="container" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "0.75rem 0",
                  textDecoration: "none",
                  color: "var(--foreground-default)",
                  fontWeight: 500,
                  fontSize: "0.9375rem",
                  borderBottom: `1px solid var(--border-default)`,
                }}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ paddingTop: "1rem" }}>
              <Link href="/contatti" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Richiedi consulenza
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  cta?: { label: string; href: string };
  compact?: boolean;
}

export function PageHero({ title, subtitle, breadcrumbs, eyebrow, cta, compact }: PageHeroProps) {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, var(--brand-navy-dark) 0%, var(--brand-navy) 100%)`,
        paddingBlock: compact ? "3rem" : "4.5rem",
      }}
    >
      <div className="container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "1.5rem", flexWrap: "wrap" }}
          >
            <Link
              href="/"
              style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.55)", fontSize: "0.8125rem", textDecoration: "none" }}
            >
              <Home size={13} />
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.35)" }} />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8125rem", textDecoration: "none" }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem" }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p className="eyebrow" style={{ color: "var(--brand-teal-light)", marginBottom: "0.75rem" }}>
            {eyebrow}
          </p>
        )}

        <h1
          className="display-md"
          style={{ color: "white", maxWidth: "44rem", marginBottom: subtitle ? "1rem" : 0 }}
        >
          {title}
        </h1>

        {subtitle && (
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", maxWidth: "38rem" }}>
            {subtitle}
          </p>
        )}

        {cta && (
          <div style={{ marginTop: "1.75rem" }}>
            <Link href={cta.href} className="btn-teal">
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { BookOpen, FileText, Building2, Users, TrendingUp, Globe, ArrowRight } from "lucide-react";
import type { SanityConsultingArea } from "@/lib/types";

// Scheda di un'area di consulenza. `variant` alterna tra la card verticale a griglia e
// la riga orizzontale. Sanity salva l'icona come nome testuale ("BookOpen"), quindi questa
// mappa trasforma quel testo nel vero componente icona di lucide (FileText se sconosciuto).
const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>> = {
  BookOpen, FileText, Building2, Users, TrendingUp, Globe,
};

interface ConsultingCardProps {
  area: SanityConsultingArea;
  variant?: "grid" | "list";
}

export function ConsultingCard({ area, variant = "grid" }: ConsultingCardProps) {
  const Icon = iconMap[area.icon ?? ""] ?? FileText;

  if (variant === "list") {
    return (
      <div className="card card-hover" style={{ padding: "1.5rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
        <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.625rem", backgroundColor: "var(--action-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={20} strokeWidth={1.75} style={{ color: "var(--brand-navy)" }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 className="card-title" style={{ color: "var(--foreground-default)", marginBottom: "0.5rem" }}>{area.title}</h3>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--foreground-muted)", marginBottom: "0.875rem" }}>{area.shortDescription}</p>
          <Link href={`/consulenza/${area.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.875rem", fontWeight: 500, color: "var(--brand-navy)", textDecoration: "none" }}>
            Scopri di più <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-hover" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem", backgroundColor: "var(--action-secondary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", flexShrink: 0 }}>
        <Icon size={22} strokeWidth={1.75} style={{ color: "var(--brand-navy)" }} />
      </div>
      <h3 className="card-title" style={{ color: "var(--foreground-default)", marginBottom: "0.625rem" }}>{area.title}</h3>
      <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--foreground-muted)", flex: 1, marginBottom: "1.25rem" }}>{area.shortDescription}</p>
      <Link href={`/consulenza/${area.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.875rem", fontWeight: 500, color: "var(--brand-navy)", textDecoration: "none", marginTop: "auto" }}>
        Scopri di più <ArrowRight size={14} />
      </Link>
    </div>
  );
}

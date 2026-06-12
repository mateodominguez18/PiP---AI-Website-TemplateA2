import { Linkedin } from "lucide-react";
import { TeamMember } from "@/data/mockData";

interface TeamCardProps {
  member: TeamMember;
  compact?: boolean;
}

export function TeamCard({ member, compact = false }: TeamCardProps) {
  if (compact) {
    return (
      <div className="card card-hover" style={{ padding: "1.5rem", textAlign: "center" }}>
        <div
          style={{
            width: "5rem",
            height: "5rem",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 1rem",
            border: "3px solid var(--border-default)",
          }}
        >
          <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground-default)", marginBottom: "0.25rem" }}>
          {member.name}
        </h3>
        <p style={{ fontSize: "0.8125rem", color: "var(--brand-teal)", fontWeight: 500, marginBottom: "0.25rem" }}>
          {member.title}
        </p>
        <p style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)", marginBottom: "0.875rem" }}>
          {member.role}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", justifyContent: "center", marginBottom: "0.875rem" }}>
          {member.specializations.slice(0, 2).map((spec) => (
            <span key={spec} className="badge badge-navy" style={{ fontSize: "0.6875rem" }}>
              {spec}
            </span>
          ))}
        </div>
        <a
          href={member.linkedIn}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.8125rem",
            color: "var(--brand-navy)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          <Linkedin size={13} />
          LinkedIn
        </a>
      </div>
    );
  }

  return (
    <div className="card" style={{ overflow: "hidden", display: "flex" }}>
      <div style={{ width: "8rem", flexShrink: 0 }}>
        <img
          src={member.image}
          alt={member.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <div style={{ padding: "1.5rem", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--foreground-default)", marginBottom: "0.125rem" }}>
              {member.name}
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--brand-teal)", fontWeight: 500 }}>
              {member.title} · {member.role}
            </p>
          </div>
          <a href={member.linkedIn} style={{ color: "var(--foreground-muted)", flexShrink: 0 }} title="LinkedIn">
            <Linkedin size={16} />
          </a>
        </div>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--foreground-muted)", marginBottom: "1rem" }}>
          {member.bio}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {member.specializations.map((spec) => (
            <span key={spec} className="badge badge-navy" style={{ fontSize: "0.6875rem" }}>
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

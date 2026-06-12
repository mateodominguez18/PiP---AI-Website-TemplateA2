import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <p style={{ fontSize: "5rem", fontWeight: 700, color: "var(--border-default)", lineHeight: 1, marginBottom: "1rem" }}>
        404
      </p>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--foreground-default)", marginBottom: "0.75rem" }}>
        Pagina non trovata
      </h1>
      <p style={{ color: "var(--foreground-muted)", marginBottom: "2rem" }}>
        La pagina che stai cercando non esiste o è stata spostata.
      </p>
      <Link href="/" className="btn-primary">
        Torna alla home
      </Link>
    </div>
  );
}

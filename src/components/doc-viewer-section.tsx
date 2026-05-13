import { Search, ExternalLink, FileText, Book } from "lucide-react";

export function DocViewerSection() {
  return (
    <>
      {/* Technology References — full-width card */}
      <div
        className="doc-card"
        style={{
          background: "rgba(255,255,255,.07)",
          borderColor: "rgba(255,255,255,.12)",
          color: "#fff",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div className="ico" style={{ background: "rgba(255,255,255,.1)", color: "var(--coral)" }}>
          <Search size={20} />
        </div>
        <h5 style={{ color: "#fff" }}>Technology References</h5>
        <p style={{ color: "rgba(255,255,255,.6)" }}>
          An annotated bibliography of every framework, library, API, and asset used to build Tampa Resource Hub — scroll below for the full breakdown.
        </p>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 12, color: "rgba(255,255,255,.4)", paddingTop: 10,
          borderTop: "1px solid rgba(255,255,255,.12)",
        }}>
          <ExternalLink size={12} /> Scroll below
        </span>
      </div>

      {/* PDF webviews */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 20,
        marginTop: 20,
      }}>
        {[
          { title: "Project Work Log",            icon: <FileText size={14} />, src: "/work-log.pdf" },
          { title: "Student Copyright Checklist", icon: <Book size={14} />,     src: "/copyright-checklist.pdf" },
        ].map((d) => (
          <div key={d.src} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,.55)", fontSize: 12, fontWeight: 500 }}>
              <span style={{ color: "var(--coral)" }}>{d.icon}</span>
              {d.title}
            </div>
            <iframe
              src={d.src}
              width="100%"
              height="480"
              style={{ display: "block", border: "none", borderRadius: 12 }}
              title={d.title}
            />
          </div>
        ))}
      </div>
    </>
  );
}

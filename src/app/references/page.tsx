import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { FileText, Book, Search, Download } from "lucide-react";

const sources = [
  { num: "01", t: "Hillsborough County Community Services Annual Report", s: "Hillsborough County · 2025" },
  { num: "02", t: "Tampa Bay Nonprofit Coalition Resource Census",         s: "TBNC · 2026" },
  { num: "03", t: "Florida Department of Children & Families – Local Office Directory", s: "State of Florida · 2026" },
  { num: "04", t: "Tampa Public Library Community Programming Index",      s: "Tampa Public Library · Q3 2026" },
  { num: "05", t: "United Way Suncoast Impact Reports",                   s: "United Way · 2024–2026" },
];
const orgs = [
  { num: "06", t: "Metro Tampa Food Bank",         s: "Listed partner · since 2018" },
  { num: "07", t: "Youth Hope Counseling Center",  s: "Listed partner · since 2019" },
  { num: "08", t: "Tampa Housing Alliance",         s: "Listed partner · since 2020" },
  { num: "09", t: "BayCare Community Clinic",       s: "Listed partner · since 2021" },
  { num: "10", t: "Lift Tampa Workforce Hub",       s: "Listed partner · since 2022" },
];
const access = [
  { num: "11", t: "Web Content Accessibility Guidelines (WCAG) 2.2 AA", s: "W3C · 2024" },
  { num: "12", t: "Plain Language Guidelines for Public-Facing Services", s: "PlainLanguage.gov · 2023" },
  { num: "13", t: "Inclusive Color Contrast Policy",                      s: "Internal · v2.1" },
];
const credits = [
  { num: "14", t: "Hero photography",   s: "Unsplash community license" },
  { num: "15", t: "Iconography system", s: "Lucide · ISC license" },
  { num: "16", t: "Typography",         s: "Inter (SIL OFL) · Instrument Serif (SIL OFL)" },
];
const copyright = [
  { num: "17", t: "Site copy",                 s: "© 2026 Tampa Resource Hub" },
  { num: "18", t: "Partner logos & marks",     s: "Used with permission · trademarks of their respective owners" },
  { num: "19", t: "Open-source notice",        s: "Code under MIT · content under CC BY 4.0" },
];

function RefSection({ title, items }: { title: string; items: { num: string; t: string; s: string }[] }) {
  return (
    <Reveal>
      <div className="ref-section">
        <h3>{title}</h3>
        <div className="ref-list">
          {items.map((it) => (
            <div key={it.num} className="ref-row">
              <span className="num">{it.num}</span>
              <span>{it.t}</span>
              <span className="meta">{it.s}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

const docs = [
  { ico: <FileText size={22} />, t: "Project Work Log",              d: "Detailed timeline of design decisions, research, and contributors across the build." },
  { ico: <Book size={22} />,     t: "Student Copyright Checklist",   d: "Step-by-step checklist used to verify all imagery, fonts, and source materials." },
  { ico: <Search size={22} />,   t: "Research Sources Bibliography", d: "Annotated bibliography for community statistics, partner reports, and methodologies." },
];

export default function ReferencesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "linear-gradient(180deg, #f6e9d8 0%, #1a1f2e 100%)" }}>
        <section id="references" className="section" style={{ color: "#fff" }}>
          <Reveal>
            <span className="section-eyebrow" style={{ background: "rgba(255,255,255,.08)", color: "#ffd9cc" }}>
              <span className="dot" style={{ background: "var(--coral)" }} />Documentation
            </span>
            <h2 className="section-title" style={{ color: "#fff" }}>References &amp; <em>Documentation</em>.</h2>
            <p className="section-sub" style={{ color: "rgba(255,255,255,.7)" }}>
              A transparent record of the sources, partners, accessibility standards, and credits behind Tampa Resource Hub.
            </p>
          </Reveal>

          <Reveal>
            <div className="doc-grid" style={{ marginTop: 36 }}>
              {docs.map((d, i) => (
                <div key={i} className="doc-card">
                  <div className="ico">{d.ico}</div>
                  <h5>{d.t}</h5>
                  <p>{d.d}</p>
                  <a className="dl" href="#">
                    Download PDF
                    <span className="arr"><Download size={14} /></span>
                  </a>
                </div>
              ))}
            </div>
          </Reveal>

          <RefSection title="Sources"                     items={sources} />
          <RefSection title="Community Organizations"     items={orgs} />
          <RefSection title="Accessibility Standards"     items={access} />
          <RefSection title="Image & Media Credits"       items={credits} />
          <RefSection title="Copyright Documentation"     items={copyright} />
        </section>
      </main>
      <Footer />
    </>
  );
}

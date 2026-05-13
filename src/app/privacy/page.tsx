import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Shield, Eye, Database, Lock, Mail, RefreshCw, Globe, Users, CheckCircle } from "lucide-react";

const EFFECTIVE_DATE = "May 1, 2026";

const sections = [
  {
    icon: <Eye size={18} />,
    title: "What We Collect",
    accent: "coral" as const,
    body: (
      <>
        <p>Tampa Resource Hub is designed to be a read-only civic tool. For the vast majority of visitors, <strong>we collect no personal information whatsoever.</strong></p>
        <ul>
          <li><strong>Resource directory browsing</strong> — no account, login, or tracking required.</li>
          <li><strong>Events and news pages</strong> — data is pulled live from Tampa.gov public feeds. No user data is stored or transmitted.</li>
          <li><strong>Resource submissions</strong> — if you voluntarily submit an organization via the Submit page, we collect the information you provide (organization name, contact details, description). This data is used solely to review and potentially add the resource to the directory.</li>
          <li><strong>Language preference</strong> — your EN/ES toggle choice is saved in <code>localStorage</code> on your own device. It never leaves your browser.</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Database size={18} />,
    title: "How We Use Your Data",
    accent: "teal" as const,
    body: (
      <>
        <p>Any information collected through the Submit page is used exclusively to:</p>
        <ul>
          <li>Review whether the submitted resource meets our community guidelines</li>
          <li>Contact the submitter if we need clarification before listing</li>
          <li>Add verified organizations to the public resource directory</li>
        </ul>
        <p>We do not use your data for advertising, profiling, or any commercial purpose. We do not sell data — ever.</p>
      </>
    ),
  },
  {
    icon: <Lock size={18} />,
    title: "Storage & Security",
    accent: "coral" as const,
    body: (
      <>
        <p>Submitted resource data is stored in <strong>Supabase</strong>, a SOC 2 Type II certified cloud database hosted on AWS. Data is encrypted at rest and in transit (TLS 1.2+).</p>
        <p>The site is hosted on <strong>Vercel</strong>, which provides automatic HTTPS, DDoS protection, and edge security for all requests. No raw user data is stored on local machines or exported outside these platforms.</p>
      </>
    ),
  },
  {
    icon: <Shield size={18} />,
    title: "Cookies & Tracking",
    accent: "teal" as const,
    body: (
      <>
        <p>Tampa Resource Hub uses <strong>no third-party tracking cookies, analytics pixels, or advertising scripts.</strong></p>
        <ul>
          <li>No Google Analytics, Meta Pixel, or similar trackers are embedded on this site.</li>
          <li>Vercel may collect anonymous, aggregate performance metrics (load times, error rates) as part of its infrastructure. This data cannot identify individual users.</li>
          <li>The only browser storage used is <code>localStorage</code> for your EN/ES language preference.</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Globe size={18} />,
    title: "Third-Party Services",
    accent: "coral" as const,
    body: (
      <>
        <p>The site integrates with the following services to deliver its features:</p>
        <ul>
          <li><strong>Tampa.gov public APIs</strong> — events and news data. No user data is sent to Tampa.gov.</li>
          <li><strong>OpenStreetMap / Leaflet</strong> — map tiles for the resource directory. Tile requests may include your IP as part of standard HTTP requests to OSM servers.</li>
          <li><strong>Unsplash CDN</strong> — photography. Standard CDN request logs may include IP addresses per Unsplash&apos;s own policy.</li>
          <li><strong>Google Calendar</strong> — the &quot;Add to Calendar&quot; button uses a public URL scheme and opens in a new tab. No data is sent unless you click the link.</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Users size={18} />,
    title: "Children&apos;s Privacy",
    accent: "teal" as const,
    body: (
      <p>This service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware such information was collected, we will delete it promptly.</p>
    ),
  },
  {
    icon: <CheckCircle size={18} />,
    title: "Your Rights",
    accent: "coral" as const,
    body: (
      <>
        <p>Because we collect minimal personal data, there is very little to manage. If you submitted a resource and wish to have your contact information removed, email us and we will delete it within 5 business days.</p>
        <p style={{ marginTop: 12 }}>
          <strong>Contact:</strong>{" "}
          <a href="mailto:webmastertsa2026@gmail.com" style={{ color: "var(--coral)", textDecoration: "none" }}>
            webmastertsa2026@gmail.com
          </a>
        </p>
      </>
    ),
  },
  {
    icon: <RefreshCw size={18} />,
    title: "Policy Updates",
    accent: "teal" as const,
    body: (
      <p>If this policy changes materially, the effective date at the top of this page will be updated. Continued use of the site after an update constitutes acceptance of the revised policy.</p>
    ),
  },
  {
    icon: <Mail size={18} />,
    title: "Contact",
    accent: "coral" as const,
    body: (
      <>
        <p>Questions about this statement or our data practices?</p>
        <p style={{ marginTop: 10 }}>
          <strong>Email:</strong>{" "}
          <a href="mailto:webmastertsa2026@gmail.com" style={{ color: "var(--coral)", textDecoration: "none" }}>
            webmastertsa2026@gmail.com
          </a>
          <br />
          <strong>Location:</strong> Hillsborough County, Florida
          <br />
          <strong>Response time:</strong> Within 5 business days
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "linear-gradient(180deg, #e0f1f8 0%, #d4e8f5 100%)", minHeight: "100vh" }}>
        <section className="section" style={{ maxWidth: 820 }}>
          <Reveal>
            <span className="section-eyebrow"><span className="dot" />Legal</span>
            <h2 className="section-title">Privacy <em>Statement.</em></h2>
            <p className="section-sub">
              Tampa Resource Hub is a community-funded civic project. We believe in full transparency — here is everything we collect, store, and do with it.
            </p>
            <p style={{ fontSize: 13, color: "var(--mute)", marginTop: 8 }}>
              Effective date: {EFFECTIVE_DATE}
            </p>
          </Reveal>

          {/* Summary callout */}
          <Reveal>
            <div style={{
              marginTop: 40, padding: "20px 28px",
              background: "var(--teal-soft)", border: "1px solid var(--teal)",
              borderRadius: "var(--r-lg)",
              fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7,
            }}>
              <strong style={{ color: "var(--ink)" }}>The short version:</strong> We don&apos;t track you, sell your data, or use advertising. The site works without any personal information. The only data we ever receive is what you voluntarily submit through the resource submission form.
            </div>
          </Reveal>

          {/* Policy sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 40 }}>
            {sections.map((s, i) => {
              const accentColor = s.accent === "coral" ? "var(--coral)" : "var(--teal)";
              const accentBg    = s.accent === "coral" ? "var(--coral-soft)" : "var(--teal-soft)";
              return (
                <Reveal key={i}>
                  <div style={{
                    background: "var(--paper)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-xl)",
                    padding: "24px 28px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                        background: accentBg, color: accentColor,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {s.icon}
                      </div>
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>
                        {s.title}
                      </h3>
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.75, color: "var(--ink-2)" }}
                      className="privacy-body"
                    >
                      {s.body}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

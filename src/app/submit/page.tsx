"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { HoverGlow } from "@/components/hover-glow";
import { ArrowRight, Upload, Check, Sparkles } from "lucide-react";

const categories = [
  "Food Assistance", "Mental Health", "Housing", "Healthcare",
  "Youth Programs", "Education", "Employment", "Emergency Assistance",
];

function Field({ k, label, type = "text", full = false, options, vals, set }: {
  k: string; label: string; type?: string; full?: boolean;
  options?: string[];
  vals: Record<string, string>;
  set: (k: string, v: string) => void;
}) {
  const has = !!(vals[k] && vals[k].length);
  return (
    <div className={`fl-field ${has ? "has-val" : ""} ${full ? "full" : ""}`}>
      {options ? (
        <select value={vals[k] || ""} onChange={(e) => set(k, e.target.value)}>
          <option value="" />
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea value={vals[k] || ""} onChange={(e) => set(k, e.target.value)} />
      ) : (
        <input type={type} value={vals[k] || ""} onChange={(e) => set(k, e.target.value)} />
      )}
      <label>{label}</label>
    </div>
  );
}

export default function SubmitPage() {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string, v: string) => setVals((prev) => ({ ...prev, [k]: v }));

  return (
    <>
      <Navbar />
      <main style={{ background: "linear-gradient(180deg, #efe7d6 0%, #f6e9d8 100%)" }}>
        <section id="submit" className="section">
          <Reveal>
            <span className="section-eyebrow"><span className="dot" />Contribute</span>
            <h2 className="section-title">Submit a Community <em>Resource</em>.</h2>
            <p className="section-sub">
              Help us expand Tampa Resource Hub by sharing organizations, services, or community programs that support local residents.
            </p>
          </Reveal>

          <div className="submit-grid">
            <Reveal>
              <div className="form-card">
                <div className="form-grid">
                  <Field k="org"      label="Organization name"                    vals={vals} set={set} />
                  <Field k="cat"      label="Resource category" options={categories} vals={vals} set={set} />
                  <Field k="web"      label="Website" type="url"                   vals={vals} set={set} />
                  <Field k="addr"     label="Address"                              vals={vals} set={set} />
                  <Field k="phone"    label="Contact phone" type="tel"             vals={vals} set={set} />
                  <Field k="email"    label="Contact email" type="email"           vals={vals} set={set} />
                  <Field k="desc"     label="Short description" type="textarea" full vals={vals} set={set} />
                  <Field k="services" label="Services offered (comma separated)" type="textarea" full vals={vals} set={set} />
                  <div className="full">
                    <div className="upload">
                      <div className="ico"><Upload size={24} /></div>
                      <div className="lbl">Upload organization logo</div>
                      <div className="sub">PNG or SVG · up to 5MB · drag &amp; drop or click to browse</div>
                    </div>
                  </div>
                  <Field k="notes" label="Additional notes" type="textarea" full vals={vals} set={set} />
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
                  <HoverGlow
                    size="md"
                    background="#0E1525"
                    glowColor="#FFB37A"
                    color="#fff"
                    hoverColor="#FFD8B8"
                    icon={<ArrowRight size={14} />}
                    onClick={() => setSubmitted(true)}
                  >
                    Submit for review
                  </HoverGlow>
                  <button className="btn-pill-ghost">Save draft</button>
                  <span style={{ fontSize: 12, color: "var(--mute)", marginLeft: "auto" }}>
                    Submissions are reviewed within 3 business days.
                  </span>
                </div>

                {submitted && (
                  <div className="success-card">
                    <div className="ring"><Check size={22} /></div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 16 }}>Thank you — your submission is in review.</div>
                      <div style={{ color: "var(--mute)", fontSize: 13, marginTop: 4 }}>
                        We&apos;ll reach out to the contact above within three business days. You&apos;ll see your resource live shortly after.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal>
              <aside className="submit-side">
                <div className="icon-tile lg"><Sparkles size={22} /></div>
                <h4>Why <em>submit</em>?</h4>
                <p>
                  Community-submitted resources help residents discover valuable support systems throughout Tampa.
                  Every submission is reviewed by our team for accuracy and accessibility before going live.
                </p>
                <div className="perks">
                  <div className="perk">
                    <span className="check"><Check size={12} /></span>
                    Reach thousands of Tampa Bay residents already using the Hub
                  </div>
                  <div className="perk">
                    <span className="check"><Check size={12} /></span>
                    Connect with peer organizations through our quarterly partner roundtables
                  </div>
                  <div className="perk">
                    <span className="check"><Check size={12} /></span>
                    Free to list — community-funded, no fees ever
                  </div>
                  <div className="perk">
                    <span className="check"><Check size={12} /></span>
                    Editorial coverage opportunities in our News section
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

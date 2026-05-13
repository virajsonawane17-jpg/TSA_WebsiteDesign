"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { HoverGlow } from "@/components/hover-glow";
import { useLanguage } from "@/contexts/language-context";
import { ArrowRight, Upload, Check, Sparkles } from "lucide-react";

const CATEGORY_KEYS = [
  "Food Assistance", "Mental Health", "Housing", "Healthcare",
  "Youth Programs", "Education", "Employment", "Emergency Assistance",
];

function Field({ k, label, type = "text", full = false, options, vals, set, selectPlaceholder }: {
  k: string; label: string; type?: string; full?: boolean;
  options?: string[];
  vals: Record<string, string>;
  set: (k: string, v: string) => void;
  selectPlaceholder?: string;
}) {
  const has = !!(vals[k] && vals[k].length);
  return (
    <div className={`fl-field ${has ? "has-val" : ""} ${full ? "full" : ""}`}>
      {options ? (
        <select value={vals[k] || ""} onChange={(e) => set(k, e.target.value)}>
          <option value="">{selectPlaceholder || ""}</option>
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
  const { s } = useLanguage();
  const sub = s.submit;

  const [vals, setVals] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string, v: string) => setVals((prev) => ({ ...prev, [k]: v }));

  return (
    <>
      <Navbar />
      <main style={{ background: "linear-gradient(180deg, #c8e8e2 0%, #d4ede8 100%)" }}>
        <section id="submit" className="section">
          <Reveal>
            <span className="section-eyebrow"><span className="dot" />{sub.eyebrow}</span>
            <h2 className="section-title">{sub.title} <em>{sub.titleEm}</em></h2>
            <p className="section-sub">{sub.sub}</p>
          </Reveal>

          <div className="submit-grid">
            <Reveal>
              <div className="form-card">
                <div className="form-grid">
                  <Field k="org"      label={sub.orgName}                                         vals={vals} set={set} />
                  <Field k="cat"      label={sub.category} options={CATEGORY_KEYS}
                                      selectPlaceholder={sub.selectCategory}                       vals={vals} set={set} />
                  <Field k="web"      label={sub.website} type="url"                              vals={vals} set={set} />
                  <Field k="addr"     label={sub.address}                                         vals={vals} set={set} />
                  <Field k="phone"    label={sub.phone} type="tel"                                vals={vals} set={set} />
                  <Field k="email"    label={sub.email} type="email"                              vals={vals} set={set} />
                  <Field k="desc"     label={sub.description} type="textarea" full                vals={vals} set={set} />
                  <Field k="services" label={sub.services} type="textarea" full                   vals={vals} set={set} />
                  <div className="full">
                    <div className="upload">
                      <div className="ico"><Upload size={24} /></div>
                      <div className="lbl">{sub.uploadLabel}</div>
                      <div className="sub">{sub.uploadSub}</div>
                    </div>
                  </div>
                  <Field k="notes" label={sub.notes} type="textarea" full                        vals={vals} set={set} />
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
                  <HoverGlow
                    size="md"
                    background="#091826"
                    glowColor="#5bc8f0"
                    color="#fff"
                    hoverColor="#b8e4f8"
                    icon={<ArrowRight size={14} />}
                    onClick={() => setSubmitted(true)}
                  >
                    {sub.submitBtn}
                  </HoverGlow>
                  <span style={{ fontSize: 12, color: "var(--mute)", marginLeft: "auto" }}>
                    {sub.reviewNote}
                  </span>
                </div>

                {submitted && (
                  <div className="success-card">
                    <div className="ring"><Check size={22} /></div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 16 }}>{sub.successTitle}</div>
                      <div style={{ color: "var(--mute)", fontSize: 13, marginTop: 4 }}>
                        {sub.successSub}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal>
              <aside className="submit-side">
                <div className="icon-tile lg"><Sparkles size={22} /></div>
                <h4>{sub.whyTitle} <em>{sub.whyTitleEm}</em></h4>
                <p>{sub.whyDesc}</p>
                <div className="perks">
                  <div className="perk">
                    <span className="check"><Check size={12} /></span>
                    {sub.perk1}
                  </div>
                  <div className="perk">
                    <span className="check"><Check size={12} /></span>
                    {sub.perk2}
                  </div>
                  <div className="perk">
                    <span className="check"><Check size={12} /></span>
                    {sub.perk3}
                  </div>
                  <div className="perk">
                    <span className="check"><Check size={12} /></span>
                    {sub.perk4}
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

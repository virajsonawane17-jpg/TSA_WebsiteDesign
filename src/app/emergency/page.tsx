"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { Phone, AlertTriangle, ShieldAlert, Home, Utensils, ArrowRight, MessageSquare, Heart } from "lucide-react";

export default function EmergencyPage() {
  const { s } = useLanguage();
  const e = s.emergency;

  const HOTLINES = [
    { name: e.h1_name, number: "988",            tel: "988",          desc: e.h1_desc },
    { name: e.h2_name, number: "2-1-1",          tel: "211",          desc: e.h2_desc },
    { name: e.h3_name, number: "1-800-500-1119", tel: "18005001119",  desc: e.h3_desc },
    { name: e.h4_name, number: "1-800-962-2873", tel: "18009622873",  desc: e.h4_desc },
  ];

  const CATEGORIES = [
    {
      title: e.cat1_title,
      Icon: ShieldAlert,
      items: [
        { name: e.cat1_i1, action: e.cat1_a1,        href: "tel:211" },
        { name: e.cat1_i2, action: "(813) 935-2015", href: "tel:8139352015" },
        { name: e.cat1_i3, action: "(813) 272-2958", href: "tel:8132722958" },
      ],
    },
    {
      title: e.cat2_title,
      Icon: Home,
      items: [
        { name: "Metropolitan Ministries", action: "(813) 209-1000", href: "tel:8132091000" },
        { name: "Salvation Army Tampa",    action: "(813) 226-0055", href: "tel:8132260055" },
        { name: "St. Vincent de Paul",     action: "(813) 977-7057", href: "tel:8139777057" },
      ],
    },
    {
      title: e.cat3_title,
      Icon: Utensils,
      items: [
        { name: "Feeding Tampa Bay", action: "(813) 254-1190", href: "tel:8132541190" },
        { name: "St. Peter Claver",  action: "(813) 223-7098", href: "tel:8132237098" },
        { name: "Tampa Crossroads",  action: "(813) 238-8557", href: "tel:8132388557" },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Alert Hero */}
        <div className="emerg-hero-band">
          <div className="emerg-hero-inner">
            <Reveal>
              <div className="emerg-911">
                <AlertTriangle size={13} />
                {e.alertBand}
              </div>
              <h1>{e.headingPre}<em>{e.headingEm}</em>{e.headingPost}</h1>
              <p>{e.sub}</p>
            </Reveal>
          </div>
        </div>

        {/* Hotlines */}
        <div className="emerg-hotlines-wrap">
          <Reveal>
            <div className="emerg-hotline-grid">
              {HOTLINES.map((h) => (
                <div key={h.tel} className="emerg-hotline-card">
                  <div className="h-tag">{h.name}</div>
                  <div className="h-num">{h.number}</div>
                  <div className="h-desc">{h.desc}</div>
                  <a href={`tel:${h.tel}`} className="emerg-call-btn">
                    <Phone size={13} /> {e.callNow}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Resource Categories */}
        <div className="emerg-cats-wrap">
          <Reveal>
            <div className="emerg-cats-grid">
              {CATEGORIES.map((cat) => (
                <div key={cat.title}>
                  <div className="emerg-cat-head">
                    <div className="emerg-cat-icon"><cat.Icon size={20} /></div>
                    <h3>{cat.title}</h3>
                  </div>
                  {cat.items.map((item) => (
                    <a key={item.name} href={item.href} className="emerg-cat-item">
                      <div>
                        <div className="emerg-cat-name">{item.name}</div>
                        <div className="emerg-cat-action">{item.action}</div>
                      </div>
                      <div className="emerg-cat-ico"><Phone size={13} /></div>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Mental Health */}
        <div className="emerg-mental-band">
          <div className="emerg-mental-inner">
            <Reveal>
              <div>
                <span className="section-eyebrow" style={{ background: "rgba(255,255,255,.08)", color: "#b8e4f8", borderColor: "transparent" }}>
                  <span className="dot" />{e.mentalEyebrow}
                </span>
                <h2>{e.mentalPreHead}<em>{e.mentalEmHead}</em></h2>
                <p className="emerg-mental-lead">{e.mentalLead}</p>
                <div className="emerg-mental-cards">
                  <div className="emerg-mental-card">
                    <h4>{e.textTitle}</h4>
                    <p>
                      {e.textPre}<strong>{e.textKeyword}</strong>{e.textMid}
                      <a href="sms:741741"><strong>741741</strong></a>{e.textPost}
                    </p>
                  </div>
                  <div className="emerg-mental-card">
                    <h4>{e.trevorTitle}</h4>
                    <p>
                      {e.trevorPre}<a href="tel:18664887386"><strong>1-866-488-7386</strong></a>
                      {e.trevorMid}<strong>START</strong>{e.trevorTo}
                      <a href="sms:678678"><strong>678-678</strong></a>.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="emerg-crisis-box">
                <h3>Crisis Center of Tampa Bay</h3>
                <p>{e.crisisBoxDesc}</p>
                <a href="tel:211" className="emerg-crisis-link">
                  <div className="emerg-crisis-link-ico"><Phone size={15} /></div>
                  <span>{e.crisisBoxCall}</span>
                </a>
                <a href="https://www.crisiscenter.com" target="_blank" rel="noopener noreferrer" className="emerg-crisis-link">
                  <div className="emerg-crisis-link-ico"><MessageSquare size={15} /></div>
                  <span>{e.crisisBoxChat}</span>
                </a>
                <Link href="/directory" className="emerg-crisis-link">
                  <div className="emerg-crisis-link-ico"><Heart size={15} /></div>
                  <span>{e.crisisBoxDir}</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Directory CTA */}
        <div className="emerg-cta-band">
          <Reveal>
            <div className="emerg-cta-inner">
              <span className="section-eyebrow"><span className="dot" />{e.ctaEyebrow}</span>
              <h2>{e.ctaHeading}</h2>
              <p>{e.ctaBody}</p>
              <Link href="/directory" className="emerg-dir-btn">
                {e.ctaBtn}
                <span className="ico"><ArrowRight size={14} /></span>
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

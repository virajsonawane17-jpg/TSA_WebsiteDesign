"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { Phone, AlertTriangle, ShieldAlert, Home, Utensils, ArrowRight, MessageSquare, Heart } from "lucide-react";

const HOTLINES = [
  {
    name: "Suicide & Crisis Lifeline",
    number: "988",
    tel: "988",
    desc: "24/7 free and confidential support for people in distress.",
  },
  {
    name: "Hillsborough County 211",
    number: "2-1-1",
    tel: "211",
    desc: "The gateway to health and human services in Hillsborough County.",
  },
  {
    name: "Domestic Violence Hotline",
    number: "1-800-500-1119",
    tel: "18005001119",
    desc: "The Spring of Tampa Bay · 24/7 crisis support.",
  },
  {
    name: "Florida Abuse Hotline",
    number: "1-800-962-2873",
    tel: "18009622873",
    desc: "Report child or elder abuse or neglect.",
  },
];

const CATEGORIES = [
  {
    title: "Immediate Crisis Support",
    Icon: ShieldAlert,
    items: [
      { name: "Crisis Center of Tampa Bay", action: "Call 211", href: "tel:211" },
      { name: "ACT (Abuse Counseling)", action: "(813) 935-2015", href: "tel:8139352015" },
      { name: "Mobile Crisis Unit", action: "(813) 272-2958", href: "tel:8132722958" },
    ],
  },
  {
    title: "Emergency Shelter",
    Icon: Home,
    items: [
      { name: "Metropolitan Ministries", action: "(813) 209-1000", href: "tel:8132091000" },
      { name: "Salvation Army Tampa", action: "(813) 226-0055", href: "tel:8132260055" },
      { name: "St. Vincent de Paul", action: "(813) 977-7057", href: "tel:8139777057" },
    ],
  },
  {
    title: "Food Emergency",
    Icon: Utensils,
    items: [
      { name: "Feeding Tampa Bay", action: "(813) 254-1190", href: "tel:8132541190" },
      { name: "St. Peter Claver", action: "(813) 223-7098", href: "tel:8132237098" },
      { name: "Tampa Crossroads", action: "(813) 238-8557", href: "tel:8132388557" },
    ],
  },
];

export default function EmergencyPage() {
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
                For immediate life-threatening emergencies, call 911
              </div>
              <h1>Emergency &amp; Crisis <em>Resources</em></h1>
              <p>
                If you or someone you know needs urgent help, you are not alone.
                Use the verified hotlines and resources below for 24/7 support across Tampa Bay.
              </p>
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
                    <Phone size={13} /> Call Now
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
                  <span className="dot" />Mental Health &amp; Suicide Prevention
                </span>
                <h2>You are not <em>alone.</em></h2>
                <p className="emerg-mental-lead">
                  Tampa has specialized services for trauma, depression, and crisis intervention
                  available 24 hours a day, 7 days a week.
                </p>
                <div className="emerg-mental-cards">
                  <div className="emerg-mental-card">
                    <h4>Text Support</h4>
                    <p>Text <strong>HOME</strong> to <a href="sms:741741"><strong>741741</strong></a> to connect with a Crisis Counselor.</p>
                  </div>
                  <div className="emerg-mental-card">
                    <h4>Trevor Project</h4>
                    <p>LGBTQ+ youth support. Call <a href="tel:18664887386"><strong>1-866-488-7386</strong></a> or text <strong>START</strong> to <a href="sms:678678"><strong>678-678</strong></a>.</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="emerg-crisis-box">
                <h3>Crisis Center of Tampa Bay</h3>
                <p>
                  The gateway to help in Hillsborough County — providing a full range of services
                  from suicide prevention to sexual assault advocacy.
                </p>
                <a href="tel:211" className="emerg-crisis-link">
                  <div className="emerg-crisis-link-ico"><Phone size={15} /></div>
                  <span>Dial 2-1-1 (24/7 hotline)</span>
                </a>
                <a href="https://www.crisiscenter.com" target="_blank" rel="noopener noreferrer" className="emerg-crisis-link">
                  <div className="emerg-crisis-link-ico"><MessageSquare size={15} /></div>
                  <span>Online chat available</span>
                </a>
                <Link href="/directory" className="emerg-crisis-link">
                  <div className="emerg-crisis-link-ico"><Heart size={15} /></div>
                  <span>Browse full resource directory</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Directory CTA */}
        <div className="emerg-cta-band">
          <Reveal>
            <div className="emerg-cta-inner">
              <span className="section-eyebrow"><span className="dot" />Resource Directory</span>
              <h2>Still not sure where to start?</h2>
              <p>
                The Resource Directory has 50+ Tampa Bay organizations categorized by need.
                Search by category to find the right support near you.
              </p>
              <Link href="/directory" className="emerg-dir-btn">
                Browse All Resources
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

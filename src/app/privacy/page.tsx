"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/contexts/language-context";
import { Shield, Eye, Database, Lock, Mail, RefreshCw, Globe, Users, CheckCircle } from "lucide-react";

const EMAIL = "webmastertsa2026@gmail.com";

export default function PrivacyPage() {
  const { lang, s } = useLanguage();
  const p = s.privacy;
  const es = lang === "es";

  const sections = [
    {
      icon: <Eye size={18} />,
      title: p.s1,
      accent: "coral" as const,
      body: es ? (
        <>
          <p>Tampa Resource Hub está diseñado para ser una herramienta cívica de solo lectura. Para la gran mayoría de los visitantes, <strong>no recopilamos ninguna información personal.</strong></p>
          <ul>
            <li><strong>Navegación del directorio de recursos</strong> — no se requiere cuenta, inicio de sesión ni seguimiento.</li>
            <li><strong>Páginas de eventos y noticias</strong> — los datos se obtienen en vivo desde los feeds públicos de Tampa.gov. No se almacena ni transmite ningún dato del usuario.</li>
            <li><strong>Envío de recursos</strong> — si envías voluntariamente una organización a través de la página de Envío, recopilamos la información que proporcionas (nombre de la organización, datos de contacto, descripción). Estos datos se usan únicamente para revisar y potencialmente agregar el recurso al directorio.</li>
            <li><strong>Preferencia de idioma</strong> — tu elección del botón EN/ES se guarda en <code>localStorage</code> en tu propio dispositivo. Nunca sale de tu navegador.</li>
          </ul>
        </>
      ) : (
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
      title: p.s2,
      accent: "teal" as const,
      body: es ? (
        <>
          <p>Cualquier información recopilada a través de la página de Envío se usa exclusivamente para:</p>
          <ul>
            <li>Revisar si el recurso enviado cumple con nuestras pautas comunitarias</li>
            <li>Contactar al remitente si necesitamos aclaración antes de publicar</li>
            <li>Agregar organizaciones verificadas al directorio público de recursos</li>
          </ul>
          <p>No usamos tus datos para publicidad, perfiles o ningún propósito comercial. No vendemos datos — nunca.</p>
        </>
      ) : (
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
      title: p.s3,
      accent: "coral" as const,
      body: es ? (
        <>
          <p>Los datos de recursos enviados se almacenan en <strong>Supabase</strong>, una base de datos en la nube certificada SOC 2 Tipo II alojada en AWS. Los datos están cifrados en reposo y en tránsito (TLS 1.2+).</p>
          <p>El sitio está alojado en <strong>Vercel</strong>, que proporciona HTTPS automático, protección DDoS y seguridad en el borde para todas las solicitudes. No se almacenan datos de usuario sin procesar en máquinas locales ni se exportan fuera de estas plataformas.</p>
        </>
      ) : (
        <>
          <p>Submitted resource data is stored in <strong>Supabase</strong>, a SOC 2 Type II certified cloud database hosted on AWS. Data is encrypted at rest and in transit (TLS 1.2+).</p>
          <p>The site is hosted on <strong>Vercel</strong>, which provides automatic HTTPS, DDoS protection, and edge security for all requests. No raw user data is stored on local machines or exported outside these platforms.</p>
        </>
      ),
    },
    {
      icon: <Shield size={18} />,
      title: p.s4,
      accent: "teal" as const,
      body: es ? (
        <>
          <p>Tampa Resource Hub <strong>no usa cookies de seguimiento de terceros, píxeles de análisis ni scripts publicitarios.</strong></p>
          <ul>
            <li>No hay Google Analytics, Meta Pixel ni rastreadores similares integrados en este sitio.</li>
            <li>Vercel puede recopilar métricas de rendimiento anónimas y agregadas (tiempos de carga, tasas de error) como parte de su infraestructura. Estos datos no pueden identificar a usuarios individuales.</li>
            <li>El único almacenamiento del navegador que se usa es <code>localStorage</code> para tu preferencia de idioma EN/ES.</li>
          </ul>
        </>
      ) : (
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
      title: p.s5,
      accent: "coral" as const,
      body: es ? (
        <>
          <p>El sitio se integra con los siguientes servicios para ofrecer sus funciones:</p>
          <ul>
            <li><strong>APIs públicas de Tampa.gov</strong> — datos de eventos y noticias. No se envían datos del usuario a Tampa.gov.</li>
            <li><strong>OpenStreetMap / Leaflet</strong> — mosaicos de mapa para el directorio de recursos. Las solicitudes de mosaicos pueden incluir tu IP como parte de las solicitudes HTTP estándar a los servidores de OSM.</li>
            <li><strong>Unsplash CDN</strong> — fotografía. Los registros de solicitudes CDN estándar pueden incluir direcciones IP según la propia política de Unsplash.</li>
            <li><strong>Google Calendar</strong> — el botón &quot;Agregar al Calendario&quot; usa un esquema de URL público y se abre en una nueva pestaña. No se envían datos a menos que hagas clic en el enlace.</li>
          </ul>
        </>
      ) : (
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
      title: p.s6,
      accent: "teal" as const,
      body: es ? (
        <p>Este servicio no está dirigido a menores de 13 años. No recopilamos conscientemente información personal de menores de 13 años. Si nos enteramos de que dicha información fue recopilada, la eliminaremos de inmediato.</p>
      ) : (
        <p>This service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware such information was collected, we will delete it promptly.</p>
      ),
    },
    {
      icon: <CheckCircle size={18} />,
      title: p.s7,
      accent: "coral" as const,
      body: (
        <>
          <p>{p.contact_rights}</p>
          <p style={{ marginTop: 12 }}>
            <strong>{p.contact_label}:</strong>{" "}
            <a href={`mailto:${EMAIL}`} style={{ color: "var(--coral)", textDecoration: "none" }}>{EMAIL}</a>
          </p>
        </>
      ),
    },
    {
      icon: <RefreshCw size={18} />,
      title: p.s8,
      accent: "teal" as const,
      body: es ? (
        <p>Si esta política cambia de forma significativa, la fecha de vigencia en la parte superior de esta página se actualizará. El uso continuado del sitio después de una actualización constituye la aceptación de la política revisada.</p>
      ) : (
        <p>If this policy changes materially, the effective date at the top of this page will be updated. Continued use of the site after an update constitutes acceptance of the revised policy.</p>
      ),
    },
    {
      icon: <Mail size={18} />,
      title: p.s9,
      accent: "coral" as const,
      body: (
        <>
          <p>{p.contact_q}</p>
          <p style={{ marginTop: 10 }}>
            <strong>{p.contact_email}:</strong>{" "}
            <a href={`mailto:${EMAIL}`} style={{ color: "var(--coral)", textDecoration: "none" }}>{EMAIL}</a>
            <br />
            <strong>{p.contact_location}:</strong> {p.contact_location_val}
            <br />
            <strong>{p.contact_response}:</strong> {p.contact_response_val}
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <main style={{ background: "linear-gradient(180deg, #e0f1f8 0%, #d4e8f5 100%)", minHeight: "100vh" }}>
        <section className="section" style={{ maxWidth: 820 }}>
          <Reveal>
            <span className="section-eyebrow"><span className="dot" />{p.eyebrow}</span>
            <h2 className="section-title">{p.headingPre}<em>{p.headingEm}</em></h2>
            <p className="section-sub">{p.sub}</p>
            <p style={{ fontSize: 13, color: "var(--mute)", marginTop: 8 }}>
              {p.effectiveDate} {p.effectiveDateVal}
            </p>
          </Reveal>

          <Reveal>
            <div style={{
              marginTop: 40, padding: "20px 28px",
              background: "var(--teal-soft)", border: "1px solid var(--teal)",
              borderRadius: "var(--r-lg)",
              fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7,
            }}>
              <strong style={{ color: "var(--ink)" }}>{p.shortLabel}</strong>{" "}{p.short}
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 40 }}>
            {sections.map((sec, i) => {
              const accentColor = sec.accent === "coral" ? "var(--coral)" : "var(--teal)";
              const accentBg    = sec.accent === "coral" ? "var(--coral-soft)" : "var(--teal-soft)";
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
                        {sec.icon}
                      </div>
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>
                        {sec.title}
                      </h3>
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.75, color: "var(--ink-2)" }} className="privacy-body">
                      {sec.body}
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

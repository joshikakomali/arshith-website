import React from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const INDUSTRIES_DATA = [
  {
    id: 1,
    title: "Agriculture & Organic Food",
    eyebrow: "RETAIL & E-COMMERCE",
    desc: "Empowering local farmers by establishing direct-to-consumer supply chains. Through Arshith Fresh, we distribute pesticide-free, organic, and highly nutritious items to households.",
    icon: "ri-leaf-line",
    bgImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop",
    slug: "agriculture-organic-food"
  },
  {
    id: 2,
    title: "Software & Digital Technology",
    eyebrow: "IT SERVICES & INFRASTRUCTURE",
    desc: "Architecting custom software, mobile dashboards, cloud scaling networks, and secure database setups. Through Arshith Infotech, we enable corporations to digitize workflows and scale up.",
    icon: "ri-code-box-line",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    slug: "software-digital-technology"
  },
  {
    id: 3,
    title: "Corporate Strategy & Advisory",
    eyebrow: "BUSINESS CONSULTING",
    desc: "Guiding organizations through feasibility planning, compliance auditing, operational consolidation, and digital migration scripts. Suntech Solutions coordinates advisory structures.",
    icon: "ri-line-chart-line",
    bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    slug: "corporate-strategy-advisory"
  },
  {
    id: 4,
    title: "Branding & Programmatic Ads",
    eyebrow: "DIGITAL MARKETING",
    desc: "Positioning brands in modern markets using search engine optimization, programmatic advertising, social channel conversions, and creative campaign assets. Driven by Suntech Digital.",
    icon: "ri-focus-3-line",
    bgImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
    slug: "branding-programmatic-ads"
  }
];

export default function Industries() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef}>
      {/* PAGE HERO */}
      <section className="page-hero industries-hero">
        <div className="container">
          <div className="page-hero-split">
            <div className="page-hero-content gsap-reveal" data-y="30">
              <span className="eyebrow">SECTORS WE SHAPE</span>
              <h1>
                Industries We <br />
                Are <span className="highlight-text">Transforming</span>
              </h1>
              <p>
                Leveraging technological innovation and ecological awareness to establish leading roles in key commercial sectors.
              </p>
            </div>

            <div className="hero-side-image-card gsap-reveal" data-y="45" data-delay="0.12">
              <img
                src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2074&auto=format&fit=crop"
                alt="Industry planning workspace"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED INDUSTRY SECTORS LIST */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div className="section-header gsap-reveal">
          <span className="eyebrow">OPERATIONAL SPHERES</span>
          <h2>Market Verticals &amp; Focus Areas</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }} className="gsap-reveal">
          {INDUSTRIES_DATA.map((ind, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={ind.id} 
                className="grid-2-col"
                style={{ 
                  direction: isEven ? "ltr" : "rtl"
                }}
              >
                {/* Image panel */}
                <div 
                  style={{ 
                    borderRadius: "var(--radius-lg)", 
                    overflow: "hidden", 
                    height: "360px",
                    position: "relative"
                  }}
                >
                  <img 
                    src={ind.bgImage} 
                    alt={ind.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", top: "30px", left: "30px", width: "50px", height: "50px", background: "rgba(3, 7, 18, 0.85)", backdropFilter: "blur(10px)", border: "1px solid var(--border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "var(--accent)" }}>
                    <i className={ind.icon}></i>
                  </div>
                </div>

                {/* Content panel */}
                <div style={{ direction: "ltr" }}>
                  <span className="eyebrow">{ind.eyebrow}</span>
                  <h3 style={{ fontSize: "28px", marginBottom: "16px", color: "var(--text-main)" }}>{ind.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: "1.7", marginBottom: "24px" }}>
                    {ind.desc}
                  </p>
                  <Link
                    to={`/industries/framework/${ind.slug}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: "600", fontSize: "14px", color: "var(--accent)" }}
                  >
                    Explore Frameworks <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PARTNERSHIP HIGHLIGHTS */}
      <section className="light-contrast" style={{ borderBottom: "none" }}>
        <div className="grid-2-col gsap-reveal">
          <div>
            <span className="eyebrow">COOPERATIVE VALUE</span>
            <h2 style={{ fontSize: "36px", marginBottom: "20px", color: "#0f172a" }}>Shaping Sustainable Supply Paradigms</h2>
            <p style={{ color: "#111111", marginBottom: "16px", fontSize: "16px" }}>
              Our multi-layered industry framework supports deep cooperation between farming cooperatives, regional technology hubs, and retail commerce networks. We establish secure, high-speed, and green architectures that meet global standards.
            </p>
            <p style={{ color: "#111111", fontSize: "16px" }}>
              Through continuous optimization and structural coordination, Arshith Group channels capital resources and digital intelligence to empower regional sectors.
            </p>
          </div>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: "400px" }}>
            <img 
              src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2074&auto=format&fit=crop" 
              alt="Workspace planning session" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

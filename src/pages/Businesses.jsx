import React, { useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const BRANDS_DATA = [
  {
    id: 1,
    name: "Arshith Fresh",
    category: "ecommerce",
    tag: "E-Commerce & Organic Retail",
    desc: "Natural and pure farm-sourced organic products delivered directly to Indian households with a focus on nutrition and health.",
    url: "/portfolio/arshith-fresh",
    image: "/assests/arshith fresh.png"
  },
  {
    id: 2,
    name: "Arshith Infotech",
    category: "tech",
    tag: "Enterprise Software & Cloud Systems",
    desc: "Custom application developments, dashboard integrations, automated pipelines, and complete technical consulting.",
    url: "/portfolio/arshith-infotech",
    image: "/assests/arshith.png"
  },
  {
    id: 3,
    name: "Suntech Solutions",
    category: "consulting",
    tag: "Business Advisory & Growth Strategy",
    desc: "Operational consulting, feasibility reporting, system automation architectures, and compliance consulting for startups.",
    url: "/portfolio/suntech-solutions",
    image: "/assests/suntech.png"
  },
  {
    id: 4,
    name: "Suntech Digital",
    category: "marketing",
    tag: "Digital Marketing & Branding Solutions",
    desc: "Data-driven advertising campaigns, search engine optimization (SEO), social media branding, and user conversion funnels.",
    url: "https://suntechorganization.com/",
    image: "/assests/suntech.png"
  }
];

export default function Businesses() {
  const containerRef = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredBrands = activeCategory === "all"
    ? BRANDS_DATA
    : BRANDS_DATA.filter(brand => brand.category === activeCategory);

  return (
    <div ref={containerRef}>
      {/* PAGE HERO */}
      <section className="page-hero businesses-hero">
        <div className="container">
          <div className="page-hero-split">
            <div className="page-hero-content gsap-reveal" data-y="30">
              <span className="eyebrow">OUR PORTFOLIO</span>
              <h1>
                Diversified <br />
                Business <span className="highlight-text">Verticals</span>
              </h1>
              <p>
                Explore our core brands and organizations operating across technology, e-commerce, and business services.
              </p>
            </div>

            <div className="hero-side-image-card gsap-reveal" data-y="45" data-delay="0.12">
              <img src="/assests/business.png" alt="Arshith Group office portfolio" />
            </div>
          </div>
        </div>
      </section>

      {/* LISTED COMPANIES */}
      <section style={{ background: "var(--bg-dark)", marginTop: "2rem" }} className="gsap-reveal">
        <div className="container" style={{ padding: "2.5rem 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "40px", alignItems: "center" }}>
            <div>
              <span className="eyebrow">LISTED COMPANIES</span>
              <h2 style={{ fontSize: "28px", margin: "12px 0", color: "var(--text-main)" }}>Arshith Group Holdings</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                Arshith Group is a diversified holding with businesses across e-commerce, enterprise software, and consulting services. Below are three of our core companies.
              </p>
              <p style={{ color: "var(--text-muted)", marginBottom: "6px", fontWeight: 600 }}>Explore:</p>

              <div style={{ display: "grid", gap: "12px", marginTop: "8px" }}>
                {/* Card 1 */}
                <Link to="/portfolio/arshith-fresh" className="gsap-reveal listed-card" data-delay="0" data-anim="slide-right" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#fff", borderRadius: "10px", boxShadow: "0 6px 18px rgba(15,23,42,0.04)" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>Arshith Fresh</div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>Organic retail & e-commerce</div>
                  </div>
                  <span aria-label="Visit Arshith Fresh" style={{ background: "transparent", border: "none", color: "var(--accent)", fontSize: "20px", cursor: "pointer" }}>
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </Link>

                {/* Card 2 */}
                <Link to="/portfolio/arshith-infotech" className="gsap-reveal listed-card" data-delay="0.08" data-anim="slide-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#fff", borderRadius: "10px", boxShadow: "0 6px 18px rgba(15,23,42,0.04)" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>Arshith Infotech</div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>Enterprise software & cloud systems</div>
                  </div>
                  <span aria-label="Visit Arshith Infotech" style={{ background: "transparent", border: "none", color: "var(--accent)", fontSize: "20px", cursor: "pointer" }}>
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </Link>

                {/* Card 3 */}
                <Link to="/portfolio/suntech-solutions" className="gsap-reveal listed-card" data-delay="0.16" data-anim="slide-left" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#fff", borderRadius: "10px", boxShadow: "0 6px 18px rgba(15,23,42,0.04)" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>Suntech Solutions</div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>Business advisory & consulting</div>
                  </div>
                  <span aria-label="Visit Suntech Solutions" style={{ background: "transparent", border: "none", color: "var(--accent)", fontSize: "20px", cursor: "pointer" }}>
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src="/assests/arshith group.jpeg" alt="Arshith Group" style={{ width: "100%", maxWidth: "420px", borderRadius: "12px", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* FILTERABLE PORTFOLIO SHOWCASE */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div className="filter-tabs-wrapper gsap-reveal">
          <button 
            className={`filter-tab-btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Brands
          </button>
          <button 
            className={`filter-tab-btn ${activeCategory === "ecommerce" ? "active" : ""}`}
            onClick={() => setActiveCategory("ecommerce")}
          >
            E-Commerce
          </button>
          <button 
            className={`filter-tab-btn ${activeCategory === "tech" ? "active" : ""}`}
            onClick={() => setActiveCategory("tech")}
          >
            IT Services
          </button>
          <button 
            className={`filter-tab-btn ${activeCategory === "consulting" ? "active" : ""}`}
            onClick={() => setActiveCategory("consulting")}
          >
            Consulting
          </button>
          <button 
            className={`filter-tab-btn ${activeCategory === "marketing" ? "active" : ""}`}
            onClick={() => setActiveCategory("marketing")}
          >
            Marketing
          </button>
        </div>

        <div className="brands-grid-luxury gsap-reveal">
          {filteredBrands.map((brand) => (
            <Link 
              to={brand.url}
              key={brand.id}
              className="brand-card-luxury"
            >
              <div className="brand-card-image-wrapper">
                <img src={brand.image} alt={brand.name} className="brand-card-logo-img" />
              </div>
              <div className="brand-card-info">
                <span>{brand.tag}</span>
                <h3>{brand.name}</h3>
                <p>{brand.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", fontSize: "14px", color: "var(--accent)" }}>
                  Visit Site <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STATS DECK */}
      <section className="light-contrast">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px", textAlign: "center" }} className="gsap-reveal">
          <div>
            <h2 style={{ fontSize: "48px", color: "var(--text-main)", marginBottom: "4px", fontWeight: 800 }}>100+</h2>
            <p style={{ color: "#111111", fontSize: "14px", textTransform: "uppercase", fontWeight: "600" }}>Products In Market</p>
          </div>
          <div>
            <h2 style={{ fontSize: "48px", color: "var(--text-main)", marginBottom: "4px", fontWeight: 800 }}>30K+</h2>
            <p style={{ color: "#111111", fontSize: "14px", textTransform: "uppercase", fontWeight: "600" }}>Active Subscribers</p>
          </div>
          <div>
            <h2 style={{ fontSize: "48px", color: "var(--text-main)", marginBottom: "4px", fontWeight: 800 }}>7+</h2>
            <p style={{ color: "#111111", fontSize: "14px", textTransform: "uppercase", fontWeight: "600" }}>Years Experience</p>
          </div>
          <div>
            <h2 style={{ fontSize: "48px", color: "var(--text-main)", marginBottom: "4px", fontWeight: 800 }}>4+</h2>
            <p style={{ color: "#111111", fontSize: "14px", textTransform: "uppercase", fontWeight: "600" }}>Corporate Verticals</p>
          </div>
        </div>
      </section>

      {/* VISION & VALUE SECTION */}
      <section style={{ background: "var(--bg-dark)", borderBottom: "none" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="gsap-reveal">
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: "400px" }}>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Co-working and strategy discussion" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <span className="eyebrow">OUR VISION</span>
            <h2 style={{ fontSize: "36px", marginBottom: "20px", color: "#fff" }}>Consolidating Multi-vertical Value</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px", fontSize: "16px" }}>
              By integrating software solutions, organic food retail networks, and organizational consulting services, Arshith Group builds a cohesive framework. We prioritize quality products, high-end security parameters, and professional compliance structures.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>
              Our brands support shared infrastructure, which improves agility and guarantees consistency across all our digital platforms and customer touchpoints.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

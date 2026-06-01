import React from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Internship() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef}>
      {/* PAGE HERO */}
      <section className="page-hero internship-hero">
        <div className="container">
          <div className="page-hero-split">
            <div className="page-hero-content gsap-reveal" data-y="30">
              <span className="eyebrow">INTERNSHIP HUB</span>
              <h1>
                Front-End Development <br />
                <span className="highlight-text">Internship Program</span>
              </h1>
              <p>
                Build actual responsive layouts, learn professional code workflows, and receive personal mentorship on real-world projects.
              </p>
              <div style={{ display: "flex", gap: "15px", marginTop: "24px" }}>
                <a href="#overview" className="btn btn-primary">Learn More</a>
                <Link to="/internship-details" className="btn btn-secondary">Register Now</Link>
              </div>
            </div>

            <div className="hero-side-image-card gsap-reveal" data-y="45" data-delay="0.12">
              <img
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1600&auto=format&fit=crop"
                alt="Internship training and collaboration"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" style={{ background: "var(--bg-dark)" }}>
        <div className="section-header gsap-reveal">
          <span className="eyebrow">METHODOLOGY</span>
          <h2>Practical Sprints &amp; Real Tasks</h2>
        </div>

        <div className="process-step-row gsap-reveal">
          <div className="process-step-card">
            <span className="step-num">01</span>
            <h3>Who Can Apply</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Undergraduate freshers, MCA/B.Tech students, or self-taught coders looking for professional code structure and UI execution habits.
            </p>
          </div>

          <div className="process-step-card">
            <span className="step-num">02</span>
            <h3>How It Works</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Receive direct UI templates, responsive layouts tasks, code reviews, and feedback just like working inside an actual tech team.
            </p>
          </div>

          <div className="process-step-card">
            <span className="step-num">03</span>
            <h3>Skills Acquired</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Master semantic HTML5 structures, responsive grids, advanced CSS/SCSS selectors, custom vanilla animations, and clean Git commits.
            </p>
          </div>

          <div className="process-step-card">
            <span className="step-num">04</span>
            <h3>Career Placement</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Outstanding candidates receive direct internship certificates, portfolios reviews, and internal recommendation referrals.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT YOU GAIN / REVELATION */}
      <section className="light-contrast">
        <div className="section-header gsap-reveal">
          <span className="eyebrow">PORTFOLIO SHIELD</span>
          <h2>Acquire High-Demand Capabilities</h2>
        </div>

        <div className="grid-3-col gsap-reveal">
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "40px", borderRadius: "var(--radius-lg)" }}>
            <div style={{ width: "50px", height: "50px", background: "rgba(37,99,235,0.08)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "var(--accent)", marginBottom: "20px" }}>
              <i className="ri-layout-4-line"></i>
            </div>
            <h3 style={{ color: "#0f172a", fontSize: "20px", marginBottom: "12px" }}>Strong UI Fidelity</h3>
            <p style={{ color: "#111111", fontSize: "14px" }}>Learn precise translation of web mockup templates (Figma/PSD) to functional, fluid codes across all viewpoints.</p>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "40px", borderRadius: "var(--radius-lg)" }}>
            <div style={{ width: "50px", height: "50px", background: "rgba(37,99,235,0.08)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "var(--accent)", marginBottom: "20px" }}>
              <i className="ri-folder-open-line"></i>
            </div>
            <h3 style={{ color: "#0f172a", fontSize: "20px", marginBottom: "12px" }}>Production Portfolios</h3>
            <p style={{ color: "#111111", fontSize: "14px" }}>Assemble production-level layouts, components libraries, and form validation codes to show employers.</p>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "40px", borderRadius: "var(--radius-lg)" }}>
            <div style={{ width: "50px", height: "50px", background: "rgba(37,99,235,0.08)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "var(--accent)", marginBottom: "20px" }}>
              <i className="ri-user-star-line"></i>
            </div>
            <h3 style={{ color: "#0f172a", fontSize: "20px", marginBottom: "12px" }}>Interview Confidence</h3>
            <p style={{ color: "#111111", fontSize: "14px" }}>Learn technical communication and responsive parameters, helping you clear design-level interviews.</p>
          </div>
        </div>
      </section>

      {/* DURATION PACKAGES */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div className="section-header gsap-reveal">
          <span className="eyebrow">PROGRAM DETAILS</span>
          <h2>Select Your Duration</h2>
        </div>

        <div className="internship-about-grid gsap-reveal">
          <div className="service-card-luxury" style={{ border: "1px solid var(--border)", position: "relative" }}>
            <h3 style={{ fontSize: "24px", color: "var(--accent)", marginBottom: "10px" }}>3 Months Program</h3>
            <span style={{ fontSize: "14px", color: "var(--text-muted)", display: "block", marginBottom: "20px" }}>Core Front-End Track</span>
            <p style={{ color: "var(--text-muted)", fontSize: "15px", marginBottom: "20px" }}>
              Ideal for building key responsive elements, markup foundations, and interactive forms with mentor check-ins.
            </p>
            <ul style={{ listStyle: "none", color: "var(--text-muted)", fontSize: "14px", marginBottom: "30px" }}>
              <li style={{ marginBottom: "8px" }}><i className="ri-check-line" style={{ color: "var(--accent)", marginRight: "8px" }}></i> 5+ Responsive Web Tasks</li>
              <li style={{ marginBottom: "8px" }}><i className="ri-check-line" style={{ color: "var(--accent)", marginRight: "8px" }}></i> 1-on-1 Code Reviews</li>
              <li style={{ marginBottom: "8px" }}><i className="ri-check-line" style={{ color: "var(--accent)", marginRight: "8px" }}></i> Shared Discord Community</li>
              <li><i className="ri-check-line" style={{ color: "var(--accent)", marginRight: "8px" }}></i> Completion Certificate</li>
            </ul>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>REGISTRATION FEE</span>
                <span style={{ fontSize: "22px", fontWeight: "700", color: "var(--text-main)" }}>₹1,250</span>
              </div>
              <Link to="/internship-details" className="btn btn-secondary" style={{ padding: "10px 20px", fontSize: "13px" }}>Register</Link>
            </div>
          </div>

          <div className="service-card-luxury" style={{ border: "1px solid var(--accent)", position: "relative" }}>
            <div style={{ position: "absolute", top: "-15px", right: "20px", background: "var(--accent)", color: "#030712", fontSize: "11px", fontWeight: "700", padding: "4px 12px", borderRadius: "10px", textTransform: "uppercase" }}>Recommended</div>
            <h3 style={{ fontSize: "24px", color: "var(--accent)", marginBottom: "10px" }}>6 Months Program</h3>
            <span style={{ fontSize: "14px", color: "var(--text-muted)", display: "block", marginBottom: "20px" }}>Advanced Placement Track</span>
            <p style={{ color: "var(--text-muted)", fontSize: "15px", marginBottom: "20px" }}>
              Comprehensive preparation covering web code deployments, API integrations, advanced React frameworks, and placement recommendations.
            </p>
            <ul style={{ listStyle: "none", color: "var(--text-muted)", fontSize: "14px", marginBottom: "30px" }}>
              <li style={{ marginBottom: "8px" }}><i className="ri-check-line" style={{ color: "var(--accent)", marginRight: "8px" }}></i> 10+ Advanced React Layouts</li>
              <li style={{ marginBottom: "8px" }}><i className="ri-check-line" style={{ color: "var(--accent)", marginRight: "8px" }}></i> Live Hosting &amp; GitHub Setup</li>
              <li style={{ marginBottom: "8px" }}><i className="ri-check-line" style={{ color: "var(--accent)", marginRight: "8px" }}></i> Placement Portfolio Audit</li>
              <li><i className="ri-check-line" style={{ color: "var(--accent)", marginRight: "8px" }}></i> Interview Simulation Sprints</li>
            </ul>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>REGISTRATION FEE</span>
                <span style={{ fontSize: "22px", fontWeight: "700", color: "var(--text-main)" }}>₹1,999</span>
              </div>
              <Link to="/internship-details" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "13px" }}>Register</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={{ background: "var(--bg-dark)", borderBottom: "none" }} className="gsap-reveal">
        <div className="grid-split-main">
          <div>
            <span className="eyebrow">ENROLL NOW</span>
            <h2 style={{ fontSize: "36px", marginBottom: "20px", color: "#fff" }}>Secure Your Seat in the Upcoming Batch</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
              Submit your registration today and launch your path as a professional front-end engineer. Need additional assistance? Feel free to contact our coordinator desk.
            </p>
            <div style={{ display: "flex", gap: "30px", marginBottom: "30px" }}>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>EMAIL COORDINATOR</span>
                <span style={{ fontSize: "16px", color: "#fff", fontWeight: "600" }}>support@arshithfresh.com</span>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>CALL ASSISTANCE</span>
                <span style={{ fontSize: "16px", color: "#fff", fontWeight: "600" }}>+91 90145 74712</span>
              </div>
            </div>
            <a 
              href="https://forms.gle/HzxWQMb2x8swxtN3A" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              Go to Google Application Form →
            </a>
          </div>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: "350px" }}>
            <img 
              src="/assests/arshith.png" 
              alt="Internship Poster" 
              style={{ width: "100%", height: "100%", objectFit: "contain", background: "rgba(255,255,255,0.02)" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

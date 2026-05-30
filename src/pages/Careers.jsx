import React from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Careers() {
  const containerRef = useScrollReveal();

  const handleApplySubmit = (e) => {
    e.preventDefault();
    alert("Application submitted successfully!");
    e.target.reset();
  };

  return (
    <div ref={containerRef}>
      {/* PAGE HERO */}
      <section className="page-hero careers-hero">
        <div className="container">
          <div className="page-hero-split careers-hero-split">
            <div className="page-hero-content gsap-reveal" data-y="30">
              <span className="eyebrow">WORK WITH US</span>
              <h1>
                Build Your Future <br />
                With <span className="highlight-text">Arshith Group</span>
              </h1>
              <p>
                Join a team of visionaries, developers, and creatives designing next-generation business technologies and organic retail networks.
              </p>
            </div>

            <div className="hero-side-image-card gsap-reveal" data-y="45" data-delay="0.12">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop"
                alt="Arshith Group team collaborating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CULTURE / BENEFITS */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div className="section-header gsap-reveal">
          <span className="eyebrow">OUR BENEFITS</span>
          <h2>A Workplace That Inspires Growth</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }} className="gsap-reveal">
          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-rocket-line"></i>
            </div>
            <h3>Accelerated Growth</h3>
            <p>Develop your professional expertise with targeted mentorship, skill development workflows, and real project ownership.</p>
          </div>

          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-team-line"></i>
            </div>
            <h3>Collaborative Culture</h3>
            <p>Work alongside passionate tech architects, designers, and business strategists in a supportive environment.</p>
          </div>

          <div className="service-card-luxury">
            <div className="service-card-icon">
              <i className="ri-lightbulb-line"></i>
            </div>
            <h3>Creative Freedom</h3>
            <p>Suggest bold ideas, design custom UI components, optimize cloud databases, and shape actual brand decisions.</p>
          </div>
        </div>
      </section>

      {/* VACANCIES LIST */}
      <section className="light-contrast">
        <div className="section-header gsap-reveal">
          <span className="eyebrow">OPEN POSITIONS</span>
          <h2>Explore Current Opportunities</h2>
        </div>

        <div className="job-cards-list gsap-reveal">
          {/* Job 1 */}
          <div className="job-row-luxury" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <div className="job-row-title">
              <h3 style={{ color: "#0f172a" }}>Senior Frontend Developer</h3>
              <p style={{ color: "#111111" }}>IT Services | Bengaluru | Full-Time</p>
            </div>
            <a href="#apply" className="btn btn-primary" style={{ padding: "10px 24px" }}>Apply Now</a>
          </div>

          {/* Job 2 */}
          <div className="job-row-luxury" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <div className="job-row-title">
              <h3 style={{ color: "#0f172a" }}>UI/UX Product Designer</h3>
              <p style={{ color: "#111111" }}>IT Services | Bengaluru / Remote | Full-Time</p>
            </div>
            <a href="#apply" className="btn btn-primary" style={{ padding: "10px 24px" }}>Apply Now</a>
          </div>

          {/* Job 3 */}
          <div className="job-row-luxury" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <div className="job-row-title">
              <h3 style={{ color: "#0f172a" }}>Digital Marketing Executive</h3>
              <p style={{ color: "#111111" }}>Suntech Digital | Bengaluru | Full-Time</p>
            </div>
            <a href="#apply" className="btn btn-primary" style={{ padding: "10px 24px" }}>Apply Now</a>
          </div>

          {/* Job 4: Internship */}
          <div className="job-row-luxury" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <div className="job-row-title">
              <h3 style={{ color: "#0f172a" }}>Internship Training Program</h3>
              <p style={{ color: "#111111" }}>Web Development, UI/UX Design &amp; Digital Marketing | Freshers</p>
            </div>
            <Link to="/internship" className="btn btn-primary" style={{ padding: "10px 24px" }}>Learn More</Link>
          </div>
        </div>
      </section>

      {/* INTERNSHIP PROMOTION */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="gsap-reveal">
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: "400px" }}>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1974&auto=format&fit=crop" 
              alt="Team discussing career growth" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <span className="eyebrow">INTERNSHIPS</span>
            <h2 style={{ fontSize: "36px", marginBottom: "20px", color: "#fff" }}>Kickstart Your Professional Journey</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px", fontSize: "16px" }}>
              Are you a fresher, undergraduate student, or self-taught engineer looking to build strong practical capabilities? Our internship program offers mentor reviews, tasks based on real-time projects, and placement options.
            </p>
            <div style={{ display: "flex", gap: "15px" }}>
              <Link to="/internship" className="btn btn-primary">Internship Program</Link>
              <Link to="/internship-details" className="btn btn-secondary">Apply Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION REGISTRATION FORM */}
      <section style={{ background: "var(--bg-dark)", borderBottom: "none" }} id="apply">
        <div style={{ maxWidth: "800px", margin: "0 auto" }} className="gsap-reveal">
          <div className="section-header" style={{ textAlign: "center", margin: "0 auto 3rem" }}>
            <span className="eyebrow" style={{ display: "inline-block" }}>APPLY TODAY</span>
            <h2>Submit Your Application</h2>
            <p style={{ color: "var(--text-muted)" }}>
              Share your details, and our human resources department will connect with you.
            </p>
          </div>

          <form onSubmit={handleApplySubmit} className="premium-form">
            <div className="form-grid-2">
              <div className="form-group-luxury">
                <input type="text" placeholder="Full Name" required />
              </div>
              <div className="form-group-luxury">
                <input type="email" placeholder="Email Address" required />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group-luxury">
                <input type="tel" placeholder="Phone Number" required />
              </div>
              <div className="form-group-luxury">
                <select defaultValue="" required>
                  <option value="" disabled>Select Degree</option>
                  <option value="B.Tech">B.Tech / B.E</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="MCA">MCA</option>
                  <option value="MBA">MBA</option>
                  <option value="Other">Other Graduates</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group-luxury">
                <select defaultValue="" required>
                  <option value="" disabled>Target Domain</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
              </div>
              <div className="form-group-luxury">
                <select defaultValue="" required>
                  <option value="" disabled>Internship Duration</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                </select>
              </div>
            </div>

            <div className="form-group-luxury">
              <textarea placeholder="Tell us about yourself and why you'd like to join us" rows="5" required></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

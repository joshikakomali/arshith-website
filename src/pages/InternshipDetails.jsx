import React, { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function InternshipDetails() {
  const containerRef = useScrollReveal();
  const [fileName, setFileName] = useState("Attach PDF Resume Only");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("Attach PDF Resume Only");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const fileInput = form.resume;
    const file = fileInput.files[0];
    if (!file) {
      alert("Please upload your PDF resume");
      return;
    }
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.elements.name.value);
    formData.append("email", form.elements.email.value);
    formData.append("phone", form.elements.phone.value);
    formData.append("college_name", form.elements.college_name.value);
    formData.append("degree", form.elements.degree.value);
    formData.append("cgpa", form.elements.cgpa.value);
    formData.append("role_applied", form.elements.role_applied.value);
    formData.append("duration", form.elements.duration.value);
    formData.append("mode", form.elements.mode.value);
    formData.append("available_immediately", form.elements.available_immediately.value);
    formData.append("resume", file);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

    try {
      const response = await fetch(`${apiUrl}/apply`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Application Submitted Successfully! Redirecting to schedule your interview slot...");
        window.location.href = `/book-slot?candidateId=${data.candidateId}`;
      } else {
        alert(data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error - Ensure your backend server is running on port 5001");
    }
  };

  return (
    <div ref={containerRef}>
      {/* HERO */}
      <section className="page-hero internship-registration-hero">
        <div className="container">
          <div className="page-hero-split">
            <div className="page-hero-content gsap-reveal" data-y="30">
              <span className="eyebrow">SUBMIT ENROLLMENT</span>
              <h1>
                Internship Registration <br />
                &amp; <span className="highlight-text">Curriculum</span>
              </h1>
              <p>
                Review modules details, check payment routing parameters, and submit your registration details below.
              </p>
            </div>

            <div className="hero-side-image-card gsap-reveal" data-y="45" data-delay="0.12">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop"
                alt="Internship registration and curriculum planning"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM MODULES */}
      <section style={{ background: "var(--bg-dark)" }}>
        <div className="section-header gsap-reveal">
          <span className="eyebrow">SYLLABUS</span>
          <h2>Technical Skills &amp; DPR Training</h2>
        </div>

        <div className="grid-3-col gsap-reveal">
          <div className="service-card-luxury">
            <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: "700" }}>MODULE 01</span>
            <h3 style={{ fontSize: "20px", margin: "10px 0" }}>DPR Documentation</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Learn structured reporting workflows, Client requirement gathers, and SDLC planning protocols used in IT firms.
            </p>
          </div>

          <div className="service-card-luxury">
            <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: "700" }}>MODULE 02</span>
            <h3 style={{ fontSize: "20px", margin: "10px 0" }}>Project Feasibility</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Study cost analysis strategies, technical complexity indexes, risk matrix logs, and wireframe outlines.
            </p>
          </div>

          <div className="service-card-luxury">
            <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: "700" }}>MODULE 03</span>
            <h3 style={{ fontSize: "20px", margin: "10px 0" }}>UI/UX &amp; Coding</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Develop high-fidelity screens in HTML, CSS, JavaScript, React components, and responsive grid layouts.
            </p>
          </div>

          <div className="service-card-luxury">
            <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: "700" }}>MODULE 04</span>
            <h3 style={{ fontSize: "20px", margin: "10px 0" }}>Database &amp; APIs</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Understand server interactions, database structure (SQL/NoSQL), dynamic routing nodes, and API calls.
            </p>
          </div>

          <div className="service-card-luxury">
            <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: "700" }}>MODULE 05</span>
            <h3 style={{ fontSize: "20px", margin: "10px 0" }}>Deployments &amp; Git</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Publish layouts on live cloud platforms (Vercel/AWS), handle commit histories, branch merges, and pull requests.
            </p>
          </div>

          <div className="service-card-luxury">
            <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: "700" }}>MODULE 06</span>
            <h3 style={{ fontSize: "20px", margin: "10px 0" }}>Soft Skills &amp; HR</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Improve interview confidence, group discussion communication, presentation slides, and portfolio audits.
            </p>
          </div>
        </div>
      </section>

      {/* REGISTRATION & SECURE BILLING */}
      <section className="light-contrast">
        <div className="grid-split-main gsap-reveal">
          <div>
            <span className="eyebrow">SECURE PORTAL</span>
            <h2 style={{ fontSize: "36px", color: "#0f172a", marginBottom: "20px" }}>Placement-Oriented Enrollment</h2>
            <p style={{ color: "#111111", marginBottom: "24px" }}>
              The registration fees cover administrative infrastructure, live hosting platforms, continuous mentor code reviews, and certification costs. Review payment channels on the right to complete validation steps.
            </p>
            <ul style={{ listStyle: "none", color: "#111111", fontSize: "15px" }}>
              <li style={{ marginBottom: "10px" }}><i className="ri-checkbox-circle-fill" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Full learning materials catalog access</li>
              <li style={{ marginBottom: "10px" }}><i className="ri-checkbox-circle-fill" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Staggered project reviews and grading</li>
              <li style={{ marginBottom: "10px" }}><i className="ri-checkbox-circle-fill" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Direct mock interview scheduling access</li>
              <li><i className="ri-checkbox-circle-fill" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Completion certificate validation link</li>
            </ul>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "40px", borderRadius: "var(--radius-lg)" }}>
            <h3 style={{ color: "#0f172a", fontSize: "20px", marginBottom: "20px", borderBottom: "1px solid #e2e8f0", paddingBottom: "15px" }}>Payment Credentials</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", color: "#111111" }}>
              <p><strong>UPI ID:</strong> <span style={{ color: "var(--accent)", fontWeight: "600" }}>nfarookafi@oksbi</span></p>
              <p><strong>GPay Number:</strong> <span style={{ color: "#0f172a", fontWeight: "600" }}>9493836029</span></p>
              <p><strong>Account Holder:</strong> <span style={{ color: "#0f172a" }}>Farook N</span></p>
              <p><strong>Account No:</strong> <span style={{ color: "#0f172a" }}>925010012605535</span></p>
              <p><strong>Bank IFSC:</strong> <span style={{ color: "#0f172a" }}>UTIB0003266 (Axis Bank)</span></p>
            </div>
            <a href="#register" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "24px" }}>Proceed to Form</a>
          </div>
        </div>
      </section>

      {/* FORM REGISTRATION SECTION */}
      <section style={{ background: "var(--bg-dark)", borderBottom: "none" }} id="register">
        <div style={{ maxWidth: "800px", margin: "0 auto" }} className="gsap-reveal">
          <div className="section-header" style={{ textAlign: "center", margin: "0 auto 3rem" }}>
            <span className="eyebrow" style={{ display: "inline-block" }}>REGISTRATION</span>
            <h2>Submit Enrollment Details</h2>
            <p style={{ color: "var(--text-muted)" }}>
              Ensure your details match your certificates. Resumes must be uploaded in PDF format only.
            </p>
          </div>

          <form id="internshipForm" onSubmit={handleFormSubmit} className="premium-form">
            <div className="form-grid-2">
              <div className="form-group-luxury">
                <input type="text" name="name" placeholder="Full Name" required />
              </div>
              <div className="form-group-luxury">
                <input type="email" name="email" placeholder="Email Address" required />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group-luxury">
                <input type="tel" name="phone" placeholder="Phone Number" required />
              </div>
              <div className="form-group-luxury">
                <input type="text" name="college_name" placeholder="College Name" required />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group-luxury">
                <select name="degree" defaultValue="" required>
                  <option value="" disabled>Select Degree</option>
                  <option value="B.Tech">B.Tech / B.E</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="MCA">MCA</option>
                  <option value="MBA">MBA</option>
                  <option value="Other">Other Graduates</option>
                </select>
              </div>
              <div className="form-group-luxury">
                <input type="text" name="cgpa" placeholder="CGPA (e.g. 8.5)" required />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group-luxury">
                <select name="role_applied" defaultValue="" required>
                  <option value="" disabled>Applying For</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="SEO">SEO</option>
                  <option value="Business Development">Business Development</option>
                </select>
              </div>
              <div className="form-group-luxury">
                <select name="duration" defaultValue="" required>
                  <option value="" disabled>Internship Duration</option>
                  <option value="3 Months">3 Months Program</option>
                  <option value="6 Months">6 Months Program</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2" style={{ marginBottom: "25px" }}>
              <div className="form-group-luxury">
                <label style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "8px", display: "block" }}>Internship Mode</label>
                <div style={{ display: "flex", gap: "25px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                    <input type="radio" name="mode" value="Remote" required style={{ width: "16px", height: "16px", accentColor: "var(--accent)" }} /> Remote
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                    <input type="radio" name="mode" value="Hybrid" required style={{ width: "16px", height: "16px", accentColor: "var(--accent)" }} /> Hybrid
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                    <input type="radio" name="mode" value="On-site" required style={{ width: "16px", height: "16px", accentColor: "var(--accent)" }} /> On-site
                  </label>
                </div>
              </div>

              <div className="form-group-luxury">
                <label style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "8px", display: "block" }}>Available Immediately</label>
                <div style={{ display: "flex", gap: "25px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                    <input type="radio" name="available_immediately" value="Yes" required style={{ width: "16px", height: "16px", accentColor: "var(--accent)" }} /> Yes
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                    <input type="radio" name="available_immediately" value="No" required style={{ width: "16px", height: "16px", accentColor: "var(--accent)" }} /> No
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group-luxury">
              <div className="file-upload-wrap">
                <label htmlFor="resume" className="file-upload-label">
                  <i className="ri-upload-cloud-2-line" style={{ fontSize: "22px" }}></i>
                  <span>{fileName}</span>
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Submit Enrollment Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

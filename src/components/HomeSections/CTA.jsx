import React, { useState } from "react";
import styles from "./CTA.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function CTA() {
  const containerRef = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API submission
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 5000);
    }
  };

  return (
    <section ref={containerRef} className={styles.section} id="contact">
      <div className={styles.container}>
        
        {/* Left Column: Get in Touch Copy */}
        <div className={styles.infoCol}>
          <span className={`${styles.eyebrow} gsap-reveal`}>Get In Touch</span>
          <h2 className={`${styles.title} gsap-reveal`}>
            Let’s Build Something <br />
            <span>Great Together</span>
          </h2>
          <p className={`${styles.desc} gsap-reveal`}>
            Have an inquiry about our e-commerce platforms, strategic IT consultancies, or open student internship pathways? Drop us a line and our administrative team will reach out.
          </p>

          <div className={`${styles.contactDetails} gsap-reveal`} data-delay="0.1">
            <div className={styles.detailItem}>
              <div className={styles.iconBox}>
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <h4>Office Location</h4>
                <p>Bengaluru, Karnataka, India - 560076</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.iconBox}>
                <i className="fa-solid fa-phone"></i>
              </div>
              <div>
                <h4>Phone Hotline</h4>
                <p>+91 86184 71424</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.iconBox}>
                <i className="fa-regular fa-envelope"></i>
              </div>
              <div>
                <h4>General Email</h4>
                <p>info@arshithgroup.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form Card */}
        <div className={`${styles.formCol} gsap-reveal`} data-delay="0.2">
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.group}>
                  <label htmlFor="ctaName">Full Name</label>
                  <input
                    type="text"
                    id="ctaName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="ctaEmail">Email Address</label>
                  <input
                    type="email"
                    id="ctaEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.group}>
                  <label htmlFor="ctaPhone">Phone Number</label>
                  <input
                    type="tel"
                    id="ctaPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="ctaSubject">Subject Topic</label>
                  <select
                    id="ctaSubject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a topic</option>
                    <option value="careers">Careers & Jobs</option>
                    <option value="internship">Internship</option>
                    <option value="business">Business Enquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.group}>
                <label htmlFor="ctaMsg">Message Detail</label>
                <textarea
                  id="ctaMsg"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project/query..."
                  required
                />
              </div>

              <div className={styles.submitBlock}>
                <button type="submit" className={styles.submitBtn}>
                  Send Message <i className="fa-solid fa-paper-plane"></i>
                </button>
                {submitted && (
                  <p className={styles.successMsg}>
                    ✅ Thank you! Message transmitted successfully.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

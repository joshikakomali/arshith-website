import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Sustainability.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Sustainability() {
  const containerRef = useScrollReveal();
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const wrapper = imageWrapperRef.current;
    const img = imageRef.current;
    if (!wrapper || !img) return;

    const ctx = gsap.context(() => {
      // Background parallax translation
      gsap.to(img, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        
        {/* Left Column: Parallax Image Showcase */}
        <div className={styles.imageColumn}>
          <div ref={imageWrapperRef} className={styles.imageWrapper}>
            <div className={styles.overlay} />
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop"
              alt="Sustainable corporate building"
              className={styles.parallaxImage}
            />
            {/* Floating details */}
            <div className={styles.floatingCard}>
              <i className="fa-solid fa-leaf"></i>
              <div>
                <h4>Eco Integrity</h4>
                <p>Targeting net-zero operations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Progressive Storytelling Content */}
        <div className={styles.contentColumn}>
          <span className={`${styles.eyebrow} gsap-reveal`}>Sustainability & Innovation</span>
          <h2 className={`${styles.title} gsap-reveal`}>
            Building <span>Future-Ready</span> <br />
            Business Ecosystems
          </h2>
          <p className={`${styles.desc} gsap-reveal`}>
            At Arshith Group, our growth plans are synchronized with ecological protection and community empowerment. We combine modern IT systems, clean logistics, and organic retail models to minimize environmental footprint while maximizing shared value.
          </p>

          {/* Progressive Key Columns */}
          <div className={styles.featureGrid}>
            <div className={`${styles.featureItem} gsap-reveal`} data-delay="0.1">
              <div className={styles.iconBox}>
                <i className="fa-solid fa-solar-panel"></i>
              </div>
              <div>
                <h4>Responsible Operations</h4>
                <p>Integrating sustainable power and solar distribution grids into urban utility models.</p>
              </div>
            </div>

            <div className={`${styles.featureItem} gsap-reveal`} data-delay="0.2">
              <div className={styles.iconBox}>
                <i className="fa-solid fa-seedling"></i>
              </div>
              <div>
                <h4>Organic Local Sourcing</h4>
                <p>Arshith Fresh partners directly with regional growers to encourage sustainable agriculture.</p>
              </div>
            </div>

            <div className={`${styles.featureItem} gsap-reveal`} data-delay="0.3">
              <div className={styles.iconBox}>
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <h4>Trusted Governance</h4>
                <p>Maintaining high administrative compliance and operational safety across all divisions.</p>
              </div>
            </div>
          </div>

          <div className={`${styles.logoBlock} gsap-reveal`} data-delay="0.4">
            <img src="/assests/Arshithlogo.webp" alt="Arshith Group Logo" className={styles.logo} />
            <div className={styles.badgeText}>
              <strong>Arshith Group</strong>
              <span>Trusted Brand Pledge</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

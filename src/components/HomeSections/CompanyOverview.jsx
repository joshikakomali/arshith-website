import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CompanyOverview.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyOverview() {
  const containerRef = useScrollReveal();
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const wrapper = imageWrapperRef.current;
    const img = imageRef.current;
    if (!wrapper || !img) return;

    const ctx = gsap.context(() => {
      // Create a subtle parallax effect on the CEO image on scroll
      gsap.to(img, {
        yPercent: 15,
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
    <section ref={containerRef} className={styles.section} id="about">
      <div className={styles.container}>
        {/* Text/Content Column */}
        <div className={styles.content}>
          <span className={`${styles.eyebrow} gsap-reveal`}>Company Overview</span>
          <h2 className={`${styles.title} gsap-reveal`}>
            Shaping a Brighter, <br />
            <span>Value-Driven</span> Future
          </h2>
          <p className={`${styles.desc} gsap-reveal`}>
            Arshith Group stands at the forefront of enterprise innovation, aligning multiple divisions across e-commerce, software systems, and strategic management consulting to solve complex real-world challenges.
          </p>
          
          <div className={`${styles.quoteWrapper} gsap-reveal`} data-delay="0.15">
            <div className={styles.quoteMark}>“</div>
            <p className={styles.quoteText}>
              Growth is not just about business, it’s about <span>creating value</span>, empowering people, and making a meaningful impact every day. It’s about building trust and shaping a future driven by progress.
            </p>
            <div className={styles.quoteAuthor}>
              <h4>Farook N</h4>
              <span>Chairman & CEO, Arshith Group</span>
            </div>
            <Link to="/about" className={styles.btnOutline}>
              View Executive Profile <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Image/CEO Profile Column with Parallax */}
        <div className={styles.imageColumn}>
          <div ref={imageWrapperRef} className={styles.imageFrame}>
            <div className={styles.imageOverlay} />
            <img
              ref={imageRef}
              src="/assests/ceo sir.png"
              alt="Farook N - CEO Arshith Group"
              className={styles.ceoImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

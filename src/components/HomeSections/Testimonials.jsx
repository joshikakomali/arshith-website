import React, { useState, useEffect, useRef } from "react";
import styles from "./Testimonials.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const REVIEWS = [
  {
    id: 1,
    quote: "The software systems built by Arshith Infotech reconstructed our logistics dashboard. We streamlined multi-vendor cargo auditing and saw immediate efficiency spikes.",
    author: "Rohan Sharma",
    role: "Operations Manager, LogiCorp India",
  },
  {
    id: 2,
    quote: "Selling on Arshith Fresh is a game changer for our agricultural cooperative. We now distribute crops directly to urban hubs, securing higher margins and faster payouts.",
    author: "H. Gowda",
    role: "Cooperative Lead, Mandya Organic Farm Hub",
  },
  {
    id: 3,
    quote: "Completing my technical training at Arshith Group provided hands-on exposure to production cloud databases. The mentorship directly helped me land my first software job.",
    author: "Pooja Reddy",
    role: "Graduate Trainee & Cloud Developer",
  },
];

export default function Testimonials() {
  const containerRef = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <section
      ref={containerRef}
      className={styles.section}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.container}>
        
        {/* Header */}
        <div className={`${styles.header} gsap-reveal`}>
          <span className={styles.eyebrow}>Client Reviews</span>
          <h2 className={styles.title}>What Partners Say</h2>
        </div>

        {/* Carousel Frame */}
        <div className={`${styles.carousel} gsap-reveal`} data-delay="0.15">
          <div className={styles.quoteIcon}>“</div>
          
          <div className={styles.slideContainer}>
            {REVIEWS.map((review, index) => (
              <div
                key={review.id}
                className={`${styles.slide} ${
                  index === activeIndex ? styles.slideActive : ""
                }`}
              >
                <p className={styles.quoteText}>{review.quote}</p>
                <div className={styles.authorBlock}>
                  <h4>{review.author}</h4>
                  <span>{review.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className={styles.controls}>
            <button className={styles.controlBtn} onClick={prevSlide} aria-label="Previous review">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className={styles.dots}>
              {REVIEWS.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${
                    index === activeIndex ? styles.dotActive : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button className={styles.controlBtn} onClick={nextSlide} aria-label="Next review">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

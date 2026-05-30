import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";
import useHeroAnimation from "./useHeroAnimation";

const SLIDES = [
  {
    id: 1,
    preTitle: "E-Commerce Sourcing",
    title: (
      <>
        Arshith <span className={styles.titleHighlight}>Fresh</span>
      </>
    ),
    desc: "Rooted in nature, grown with care. We deliver fresh, organic products directly from farm cooperatives to city households.",
    bgImage: "https://img.magnific.com/free-photo/black-friday-sales-sign-neon-light_23-2151833076.jpg?semt=ais_hybrid&w=740&q=80",
    midImage: "/assests/arshith fresh.png",
    statsLabel: "Sourcing Integrity",
    statsValue: "100% Organic",
    statsDesc: "Direct farm partnerships bypassing unnecessary middlemen.",
    primaryBtnText: "Shop Online",
    secondaryBtnText: "Seller Portal",
    primaryLink: "https://arshithfresh.com/",
    secondaryLink: "https://seller.arshithfresh.com/",
  },
  {
    id: 2,
    preTitle: "IT Services & Consulting",
    title: (
      <>
        Arshith <span className={styles.titleHighlight}>InfoTech</span>
      </>
    ),
    desc: "Building custom software services and high-performance digital systems to turn enterprise ideas into reliable applications.",
    bgImage: "https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg",
    midImage: "/assests/arshith.png",
    statsLabel: "Tech Deployments",
    statsValue: "100+ Systems",
    statsDesc: "Delivered with modern architectures and absolute security.",
    primaryBtnText: "IT Solutions",
    secondaryBtnText: "Contact Us",
    primaryLink: "/services",
    secondaryLink: "/contact",
  },
  {
    id: 3,
    preTitle: "Business Consulting",
    title: (
      <>
        Suntech <span className={styles.titleHighlight}>Solutions</span>
      </>
    ),
    desc: "Providing strategic business planning, advisory systems, and corporate compliance services to drive sustainable growth.",
    bgImage: "https://img.freepik.com/free-vector/gradient-connection-background_23-2150441887.jpg?semt=ais_hybrid&w=740&q=80",
    midImage: "/assests/suntech.png",
    statsLabel: "Advisory Tenure",
    statsValue: "7+ Years",
    statsDesc: "Scaling startups and enterprises through data-driven insight.",
    primaryBtnText: "Our Services",
    secondaryBtnText: "Get In Touch",
    primaryLink: "https://suntechorganization.com/",
    secondaryLink: "/contact",
  },
  {
    id: 4,
    preTitle: "Digital Marketing & Branding",
    title: (
      <>
        Suntech <span className={styles.titleHighlight}>Digital</span>
      </>
    ),
    desc: "Creating target campaigns, search engine optimization (SEO), and conversion audits designed to amplify online enterprise scale.",
    bgImage: "https://t4.ftcdn.net/jpg/02/94/29/33/360_F_294293388_rMi36DO4isvXoNh8B3Q5G07X0bL9z1Ng.jpg",
    midImage: "/assests/suntech.png",
    statsLabel: "Search Growth",
    statsValue: "10x Reach",
    statsDesc: "Custom SEO plans and digital asset optimization.",
    primaryBtnText: "Explore Portfolio",
    secondaryBtnText: "Contact Advisor",
    primaryLink: "/portfolio",
    secondaryLink: "/contact",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef(null);

  // Refs for GSAP animation target
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const bgLayersRef = useRef([]);
  const midLayersRef = useRef([]);
  const fgLayersRef = useRef([]);
  const textContainersRef = useRef([]);

  // Clear and restart the automatic slide timer
  const restartTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleDotClick = (index) => {
    if (index === activeSlide) return;
    setActiveSlide(index);
    restartTimer();
  };

  const handleScrollClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Invoke the animation hook
  useHeroAnimation({
    activeSlide,
    containerRef,
    slidesRef,
    bgLayersRef,
    midLayersRef,
    fgLayersRef,
    textContainersRef,
  });

  return (
    <section className={styles.heroContainer} ref={containerRef} id="home">
      {/* Slides Wrapper */}
      <div className={styles.slidesWrapper}>
        {SLIDES.map((slide, index) => {
          const isActive = index === activeSlide;

          return (
            <div
              key={slide.id}
              className={styles.slide}
              ref={(el) => (slidesRef.current[index] = el)}
              style={{
                opacity: index === 0 ? 1 : 0,
                visibility: index === 0 ? "visible" : "hidden",
                zIndex: index === 0 ? 2 : 1,
              }}
            >
              {/* Layer 1: Background Zoom */}
              <div
                className={styles.bgLayer}
                ref={(el) => (bgLayersRef.current[index] = el)}
                style={{ backgroundImage: `url('${slide.bgImage}')` }}
              />

              {/* Overlay */}
              <div className={styles.overlay} />

              {/* Layer 2: Midground image */}
              <div className={styles.midLayer} ref={(el) => (midLayersRef.current[index] = el)}>
                <img
                  src={slide.midImage}
                  alt={slide.preTitle}
                  className={styles.midLayerImage}
                />
              </div>

              {/* Layer 3: Foreground Floating Stats Card */}
              <div className={styles.fgLayer} ref={(el) => (fgLayersRef.current[index] = el)}>
                <div className={styles.statsCard}>
                  <span className={styles.statsLabel}>{slide.statsLabel}</span>
                  <h3 className={styles.statsValue}>{slide.statsValue}</h3>
                  <p className={styles.statsDesc}>{slide.statsDesc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Layer 4: Static Content Box (Text container overlays absolute over pages) */}
      <div className={styles.contentContainer}>
        <div className={styles.textWrapper}>
          {SLIDES.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={`text-${slide.id}`}
                ref={(el) => (textContainersRef.current[index] = el)}
                style={{
                  display: isActive ? "block" : "none",
                }}
              >
                <span className={styles.preTitle}>{slide.preTitle}</span>
                <h1 className={styles.title}>{slide.title}</h1>
                <p className={styles.desc}>{slide.desc}</p>
                <div className={styles.btnContainer + " hero-buttons"}>
                  <Link to={slide.primaryLink} className={styles.primaryBtn}>
                    {slide.primaryBtnText}
                  </Link>
                  <Link to={slide.secondaryLink} className={styles.secondaryBtn}>
                    {slide.secondaryBtnText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Slide Dots Navigation */}
      <div className={styles.navDots}>
        <div className={styles.slideNumber}>
          <span className={styles.activeNumber}>0{activeSlide + 1}</span>
          <span>/</span>
          <span>0{SLIDES.length}</span>
        </div>
        {SLIDES.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === activeSlide ? styles.activeDot : ""}`}
            onClick={() => handleDotClick(index)}
          >
            <div className={styles.progressBar} />
          </div>
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className={styles.scrollIndicator} onClick={handleScrollClick}>
        <span>Scroll Down</span>
        <div className={styles.mouseIcon}>
          <span className={styles.wheel} />
        </div>
      </div>
    </section>
  );
}

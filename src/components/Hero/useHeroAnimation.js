import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function useHeroAnimation({
  activeSlide,
  containerRef,
  slidesRef,
  bgLayersRef,
  midLayersRef,
  fgLayersRef,
  textContainersRef,
}) {
  const prevSlideRef = useRef(activeSlide);

  // Handle slide transition animations
  useEffect(() => {
    const prevSlide = prevSlideRef.current;
    const currentSlideEl = slidesRef.current[activeSlide];
    const currentBg = bgLayersRef.current[activeSlide];
    const currentMid = midLayersRef.current[activeSlide];
    const currentFg = fgLayersRef.current[activeSlide];
    const textContainer = textContainersRef.current[activeSlide];

    const tl = gsap.timeline();

    // 1. Hide the previous slide
    if (prevSlide !== activeSlide) {
      const prevSlideEl = slidesRef.current[prevSlide];
      const prevBg = bgLayersRef.current[prevSlide];
      const prevMid = midLayersRef.current[prevSlide];
      const prevFg = fgLayersRef.current[prevSlide];
      const prevTextContainer = textContainersRef.current[prevSlide];

      if (prevSlideEl) {
        tl.to(
          prevSlideEl,
          {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(prevSlideEl, { zIndex: 1, visibility: "hidden" });
            },
          },
          0
        );
      }

      if (prevBg) {
        // Zoom out the old background image during exit
        tl.to(
          prevBg,
          {
            scale: 1.0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          0
        );
      }

      if (prevMid) {
        tl.to(
          prevMid,
          {
            opacity: 0,
            x: 20,
            duration: 1.0,
            ease: "power2.inOut",
          },
          0
        );
      }

      if (prevFg) {
        tl.to(
          prevFg,
          {
            opacity: 0,
            y: 20,
            duration: 1.0,
            ease: "power2.inOut",
          },
          0
        );
      }

      if (prevTextContainer) {
        const prevChildren = prevTextContainer.children;
        tl.to(
          prevChildren,
          {
            opacity: 0,
            y: -20,
            stagger: 0.05,
            duration: 0.6,
            ease: "power2.in",
          },
          0
        );
      }
    }

    // 2. Show the new active slide
    if (currentSlideEl) {
      gsap.set(currentSlideEl, { zIndex: 2, visibility: "visible" });
      tl.to(
        currentSlideEl,
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        0
      );
    }

    // Slow cinematic breathing scale effect on current background
    if (currentBg) {
      tl.fromTo(
        currentBg,
        { scale: 1.15, x: 0, y: 0 },
        {
          scale: 1.02,
          duration: 6,
          ease: "sine.out",
        },
        0
      );
    }

    // Stagger fade-in/slide-up for Midground and Foreground layers
    if (currentMid) {
      tl.fromTo(
        currentMid,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.4, ease: "power3.out" },
        0.2
      );
    }

    if (currentFg) {
      tl.fromTo(
        currentFg,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" },
        0.3
      );
    }

    // Stagger animate text contents (include pre-title)
    if (textContainer) {
      const preTitle = textContainer.querySelector("span");
      const title = textContainer.querySelector("h1");
      const desc = textContainer.querySelector("p");
      const buttons = textContainer.querySelector(".hero-buttons");

      // initial states (pre-title slightly closer)
      gsap.set([preTitle, title, desc, buttons], { opacity: 0, y: 36 });

      tl.to(
        [preTitle, title, desc, buttons],
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          duration: 1.1,
          ease: "power3.out",
        },
        0.45
      );
    }

    prevSlideRef.current = activeSlide;

    return () => {
      tl.kill();
    };
  }, [activeSlide, slidesRef, bgLayersRef, midLayersRef, fgLayersRef, textContainersRef]);

  // Handle Mouse movement parallax
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Normalise coordinates between -0.5 and 0.5
      const normX = x / rect.width;
      const normY = y / rect.height;

      // Target active slide's layers only
      const activeBg = bgLayersRef.current[activeSlide];
      const activeMid = midLayersRef.current[activeSlide];
      const activeFg = fgLayersRef.current[activeSlide];

      if (activeBg) {
        gsap.to(activeBg, {
          x: normX * -15, // Background moves slowly
          y: normY * -15,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (activeMid) {
        gsap.to(activeMid, {
          x: normX * -30, // Midground moves medium speed
          y: normY * -30,
          duration: 1.0,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (activeFg) {
        gsap.to(activeFg, {
          x: normX * -55, // Foreground/Glass card moves faster
          y: normY * -55,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeSlide, containerRef, bgLayersRef, midLayersRef, fgLayersRef]);

  // Handle Scroll parallax using ScrollTrigger
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Parallax text content - moves slightly slower than scroll
      textContainersRef.current.forEach((textWrapper) => {
        if (textWrapper) {
          gsap.to(textWrapper, {
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            yPercent: 40,
            ease: "none",
          });
        }
      });

      // Background scroll shift
      bgLayersRef.current.forEach((bg) => {
        if (bg) {
          gsap.to(bg, {
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            yPercent: 12,
            ease: "none",
          });
        }
      });

      // Midground scroll shift
      midLayersRef.current.forEach((mid) => {
        if (mid) {
          gsap.to(mid, {
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            yPercent: 20,
            ease: "none",
          });
        }
      });

      // Foreground scroll shift
      fgLayersRef.current.forEach((fg) => {
        if (fg) {
          gsap.to(fg, {
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            yPercent: 28,
            ease: "none",
          });
        }
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, bgLayersRef, midLayersRef, fgLayersRef, textContainersRef]);
}

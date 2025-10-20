"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

const AnimPortfolio: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Split text animation
    const splitTitle = new SplitType(".portfolio-description h1", {
      types: "lines,words,chars",
      tagName: "span",
    });

    const words = sectionRef.current.querySelectorAll('.portfolio-description h1 .word');
    const otherElements = sectionRef.current.querySelectorAll('.portfolio-description p, .category-filter');

    // Animate title words
    if (words.length > 0) {
      gsap.fromTo(
        words,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.06,
          clearProps: "all",
        }
      );
    }

    // Animate description and filter
    if (otherElements.length > 0) {
      gsap.fromTo(
        otherElements,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    }

    // Cleanup on unmount
    return () => {
      if (splitTitle) {
        splitTitle.revert();
      }
    };
  }, []);

  return (
    <main ref={sectionRef} className="portfolio-page">
      {children}
    </main>
  );
};

export default AnimPortfolio;

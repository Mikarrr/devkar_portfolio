"use client";
import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useAnimPreload = () => {
  const loadingNumber = document.querySelector("[data-loading-number]");
  const section = document.querySelector("[data-preload-section]");

  if (loadingNumber && section) {
    gsap.to(loadingNumber, {
      innerHTML: 100,
      duration: 2,
      ease: "linear",
      snap: { innerHTML: 1 },
      onComplete: () => {
        gsap.to(section, {
          y: "-100%",
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  }
};

export const animatePageIn = () => {
  const bannerOne = document.getElementById("banner-1");

  if (bannerOne) {
    const tl = gsap.timeline();

    tl.set([bannerOne], {
      yPercent: 0,
    }).to([bannerOne], {
      yPercent: -100,
      stagger: 0.2,
      delay: 0.2,
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const bannerOne = document.getElementById("banner-1");

  if (bannerOne) {
    const tl = gsap.timeline();

    tl.set([bannerOne], {
      yPercent: 100,
    }).to([bannerOne], {
      yPercent: 0,
      stagger: 0.2,
      delay: 0.2,
      onComplete: () => {
        router.push(href);
      },
    });
  }
};

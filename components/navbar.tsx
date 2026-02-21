"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MenuIcon, XIcon } from "lucide-react";
import WaitlistModal from "./WaitlistModal";
import { motion } from "framer-motion";

const shrinkVelocityThreshold = 120;
const expandVelocityThreshold = -60;

const tweenOpts = { duration: 0.35, ease: "power3.out" as const, overwrite: true };

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [isHeroDark, setIsHeroDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Assuming HeroSection is roughly 100vh - 80px
      const heroHeight = window.innerHeight - 80;
      if (window.scrollY > heroHeight - 50) {
        setIsHeroDark(false);
      } else {
        setIsHeroDark(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => {
      if (mq.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const expanded = {
    width: "90%",
    maxWidth: "1200px",
    borderRadius: isMobile ? "24px" : "32px",
    marginTop: isMobile ? "16px" : "24px",
    borderWidth: "1px",
    paddingX: isMobile ? "16px" : "24px",
    gap: isMobile ? "20px" : "40px",
  };
  const shrunk = {
    width: "90%",
    maxWidth: isMobile ? "100%" : "800px",
    borderRadius: isMobile ? "24px" : "32px",
    marginTop: isMobile ? "16px" : "24px",
    borderWidth: "1px",
    paddingX: isMobile ? "12px" : "16px",
    gap: isMobile ? "12px" : "16px",
  };

  useGSAP(
    () => {
      const navContainer = navContainerRef.current;
      const left = leftRef.current;
      const nav = navRef.current;
      const right = rightRef.current;

      if (!navContainer || !left || !nav || !right) return;

      let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
      let lastTime = performance.now();
      let isShrunk = false;

      const tweenTo = (state: any, willBeShrunk: boolean) => {
        gsap.to(navContainer, {
          width: state.width,
          maxWidth: state.maxWidth,
          borderRadius: state.borderRadius,
          marginTop: state.marginTop,
          borderWidth: state.borderWidth,
          paddingLeft: state.paddingX,
          paddingRight: state.paddingX,
          ...tweenOpts,
        });

        const flexInner = navContainer.querySelector(".nav-flex-inner");
        if (flexInner) {
          gsap.to(flexInner, {
            gap: state.gap,
            ...tweenOpts,
          });
        }
        isShrunk = willBeShrunk;
      };

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (typeof window === "undefined" || !window.matchMedia("(min-width: 768px)").matches) return;
          const currentScrollY = window.scrollY;
          const heroHeight = window.innerHeight - 80;

          if (currentScrollY <= heroHeight - 50) {
            if (isShrunk) tweenTo(expanded, false);
            return;
          }

          const velocity = self.getVelocity();

          if (velocity > shrinkVelocityThreshold) {
            if (!isShrunk) tweenTo(shrunk, true);
          } else if (velocity < expandVelocityThreshold) {
            if (isShrunk) tweenTo(expanded, false);
          }
        }
      });

      return () => {
        st.kill();
      };
    },
    { scope: navRef, dependencies: [] }
  );

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-center w-full pointer-events-none transition-colors duration-300 ${isHeroDark ? "dark" : ""}`}
    >
      <div
        ref={navContainerRef}
        className={`w-[90%] max-w-[1200px] mt-4 md:mt-6 px-4 md:px-6 rounded-[24px] md:rounded-[32px] border pointer-events-auto transition-colors duration-300 overflow-hidden ${isHeroDark ? 'bg-black/80 border-white/10 text-white' : 'bg-white/80 border-black/10 shadow-sm text-black'}`}
      >
        <div className="nav-flex-inner flex items-center justify-between w-full h-14 sm:h-16 gap-5 md:gap-10">
          <div
            ref={leftRef}
            className="flex items-center justify-start shrink-0 transition-colors duration-300"
          >
            <Link href="/" className="flex items-center justify-center group" onClick={() => setMobileMenuOpen(false)}>
              <div className="dark:hidden shrink-0">
                <Image src="/assets/linea.svg" alt="Linea" width={100} height={100} className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="hidden dark:block shrink-0">
                <Image src="/assets/linea-light.svg" alt="Linea" width={100} height={100} className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <span className={`font-bold text-xl ml-2 transition-colors duration-300 ${isHeroDark ? 'text-white' : 'text-black'}`}>Linea</span>
            </Link>
          </div>
          <div
            ref={navRef}
            className="hidden md:flex items-center justify-center shrink-0 transition-colors duration-300"
          >
            <div className="px-5 py-2 text-sm flex items-center justify-center gap-6 lg:gap-10 w-full font-medium tracking-wide">
              {navLinks.map(({ label, href }) => (
                <Link key={label} href={href} className={`transition-colors duration-300 ${isHeroDark ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'}`}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div
            ref={rightRef}
            className="hidden md:flex flex-row items-center justify-end shrink-0 transition-colors duration-300"
          >
            <button
              type="button"
              onClick={() => setWaitlistOpen(true)}
              className={`px-5 py-2 text-sm flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full ${isHeroDark ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'}`}
            >
              Join Waitlist
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className={`md:hidden p-2 -mr-2 transition-colors duration-300 ${isHeroDark ? 'text-white' : 'text-black'}`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className="fixed inset-0 z-40 md:hidden transition-opacity duration-300 pointer-events-auto"
        style={{
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-label="Close menu"
        />
        <div
          className="absolute top-[calc(24px+4.5rem)] left-2 right-2 rounded-2xl border border-border bg-background/90 backdrop-blur-xl shadow-xl overflow-hidden"
          style={{
            maxHeight: mobileMenuOpen ? "calc(100vh - 120px)" : 0,
            transition: "max-height 0.3s ease-out",
          }}
        >
          <nav className="py-4 px-2 flex flex-col">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground uppercase text-base font-medium transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => { setWaitlistOpen(true); setMobileMenuOpen(false); }}
                className="w-full px-4 py-3 rounded-xl backdrop-blur-lg border border-border shadow-xl text-foreground font-semibold uppercase text-base hover:text-primary transition-colors duration-200"
              >
                Join Waitlist
              </button>
            </div>
          </nav>
        </div>
      </div>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </motion.div>
  );
}

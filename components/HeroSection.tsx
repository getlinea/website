"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import gsap from "gsap";
import { XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { GridRevealShader } from "./ui/background-paper-shaders";
import StarMarquee from "./ui/star-marquee";

const INNER_SCALE_OPEN = 3;

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const closedRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const obj = { val: 0 };
    const timer = setTimeout(() => {
      gsap.to(obj, {
        val: 1,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => {
          setRevealProgress(obj.val);
          if (obj.val > 0.8) setShowContent(true);
        }
      });
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const open = () => {
    if (!cardRef.current || !innerRef.current) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const rect = cardRef.current.getBoundingClientRect();
    closedRectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    setIsExpanded(true);
    gsap.set(cardRef.current, {
      position: "fixed",
      left: rect.left,
      top: rect.top,
      right: "auto",
      bottom: "auto",
      width: rect.width,
      height: rect.height,
    });
    gsap.to(cardRef.current, {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: w,
      height: h,
      maxWidth: "none",
      borderRadius: 0,
      duration: 0.5,
      ease: "power3.inOut",
      overwrite: true,
    });
    gsap.to(innerRef.current, {
      scale: INNER_SCALE_OPEN,
      duration: 0.5,
      ease: "power3.inOut",
      transformOrigin: "bottom right",
      overwrite: true,
    });
  };

  const close = () => {
    if (!cardRef.current || !innerRef.current || !closedRectRef.current) return;
    const closed = closedRectRef.current;
    gsap.to(cardRef.current, {
      left: closed.left,
      top: closed.top,
      right: "auto",
      bottom: "auto",
      width: closed.width,
      height: closed.height,
      borderRadius: 8,
      duration: 0.5,
      ease: "power3.inOut",
      overwrite: true,
      onComplete: () => {
        if (!cardRef.current) return;
        gsap.set(cardRef.current, { clearProps: "all" });
        setIsExpanded(false);
      },
    });
    gsap.to(innerRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power3.inOut",
      transformOrigin: "bottom right",
      overwrite: true,
    });
  };

  const toggle = () => (isExpanded ? close() : open());

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleResize = () => {
      if (isExpanded) {
        close();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [isExpanded, close]);

  return (
    <div ref={heroRef} className="relative w-full dark bg-background flex bg-black flex-col">
      <div className="w-full pointer-events-auto">
        <StarMarquee />
      </div>
      <div className="relative h-[calc(100vh-88px)] sm:h-[calc(100vh-120px)] md:h-[calc(100vh-100px)] lg:h-[calc(100vh-120px)] mt-[64px] sm:mt-[100px] md:mt-[80px] lg:mt-[116px] min-h-120 w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: true }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <GridRevealShader imagePath="/assets/hero.webp" progress={revealProgress} />
            </Suspense>
          </Canvas>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black/60 z-[1]"
          aria-hidden
        />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 flex flex-col text-center items-center justify-center h-full mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-[1.05] font-semibold uppercase w-[90%] lg:max-w-126 xl:max-w-240 lg:absolute lg:left-8 lg:bottom-12 lg:z-30 lg:text-left lg:block lg:h-auto lg:mx-0 text-white tracking-tight"
        >
          The universal platform <br className="hidden lg:block" />
          for building <br className="hidden lg:block" />
          AI agent workflows
        </motion.h1>
        <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-md md:max-w-2xl mx-auto gap-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-white/70 text-center lg:hidden px-6 text-lg"
          >
            Linea is an advanced, visual no-code platform that empowers you to build, test, and deploy sophisticated AI agent workflows effortlessly.
          </motion.p>
        </div>
        <motion.div
          ref={cardRef}
          role="button"
          tabIndex={0}
          onClick={toggle}
          onKeyDown={(e) => e.key === "Enter" && toggle()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className={`absolute right-4 bottom-4 w-[calc(100%-2rem)] max-w-[200px] h-24 sm:right-6 sm:bottom-6 sm:max-w-[280px] sm:h-32 md:right-8 md:bottom-8 md:max-w-[440px] md:w-[440px] md:h-[220px] cursor-pointer rounded-lg backdrop-blur-md bg-white/5 border border-white/20 overflow-hidden hidden sm:flex items-end justify-end ${isExpanded ? "z-50" : "z-20"}`}
        >
          <div
            ref={innerRef}
            className="p-4 md:p-6 min-w-full min-h-full flex items-center justify-center"
            style={{ transformOrigin: "bottom right" }}
          >
            <span className="text-white/80 text-sm">Click to expand</span>
          </div>
          {isExpanded && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); close(); }}
              className="absolute top-4 right-4 z-30 cursor-pointer rounded-full w-10 h-10 flex items-center justify-center bg-white/10 border border-white/30 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <span className="relative inline-block w-4 h-4 text-white/80">
                <XIcon className="w-4 h-4" />
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
"use client";

import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { FaqsSection } from "./faqs";

const testimonials = [
  {
    text: "Linea reduced our workflow deployment time from 2 weeks to 3 hours. The MCP integration is incredibly seamless.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    name: "Sarah Johnson",
    role: "VP Engineering, TechCorp",
  },
  {
    text: "Finally, an agent builder that actually grounds its reasoning. The human-in-the-loop oversight is a game-changer.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    name: "Michael Rodriguez",
    role: "Head of Automation, StartupXYZ",
  },
  {
    text: "We've saved 40+ hours per week on automated research workflows. The ROI was immediate and substantial.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    name: "Alex Chen",
    role: "CTO, GrowthCo",
  },
  {
    text: "The real-time insights extracted by Linea agents have transformed how we parse unstructured data.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    name: "David Kim",
    role: "Director of Product, ScaleFlow",
  },
  {
    text: "Cross-platform data orchestration used to be a nightmare. Now it's completely handled by our custom agent.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    name: "Elena Rossi",
    role: "Integration Manager, EuroConnect",
  },
  {
    text: "The most intuitive visual node platform I've ever used. Our entire engineering team loves it.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    name: "James Wilson",
    role: "VP Engineering, NextGen AI",
  },
  {
    text: "Linea's secure code sandboxing freed up our team to focus on strategic tasks instead of infrastructure.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    name: "Priya Patel",
    role: "Senior Developer, InnovateLabs",
  },
  {
    text: "The universal MCP connectivity makes wiring up any REST API to our agents virtually effortless. Highly recommend.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    name: "Marcus Thompson",
    role: "Platform Engineer, DataBank",
  },
  {
    text: "With Linea, we cut our script execution and orchestration time by 75%. The reliability is unmatched.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    name: "Jennifer Lee",
    role: "AI Director, CloudScale",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function SocialProofSection() {
  return (
    <div className="min-h-screen w-full bg-background dark py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-5">
            <div className="border border-zinc-800 bg-zinc-900/50 py-1 px-4 rounded-full text-zinc-300 text-sm font-medium tracking-wide">
              Testimonials
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 mb-6">
            The Preferred Universal Platform for AI Builders
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join high-growth companies using Linea to build sophisticated agent workflows and power their AI strategies.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="flex justify-center gap-6 mb-24 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden"
      >
        <TestimonialsColumn testimonials={firstColumn} duration={15} />
        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
      </motion.div>

      <FaqsSection />
    </div>
  );
}

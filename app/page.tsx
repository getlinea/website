"use client";

import HeroSection from "@/components/HeroSection";
import dynamic from 'next/dynamic';

const VideoSection = dynamic(() => import('@/components/VideoSection'), { ssr: true });
const BentoGrid = dynamic(() => import('@/components/BentoGrid'), { ssr: true });
const HowItWorksSection = dynamic(() => import('@/components/HowItWorksSection'), { ssr: true });
const SocialProofSection = dynamic(() => import('@/components/SocialProofSection'), { ssr: true });

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div id="features">
        <VideoSection />
        <BentoGrid />
      </div>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <div id="testimonials">
        <SocialProofSection />
      </div>
    </div>
  );
}

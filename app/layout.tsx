import type { Metadata } from "next";
import localFont from "next/font/local";
import { Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import { Footer } from "../components/ui/modem-animated-footer";
import { Twitter, Linkedin, Github, Mail, Zap } from "lucide-react";
import Image from "next/image";
import { ClerkProvider } from "@clerk/nextjs";
import SmoothScroll from "../components/SmoothScroll";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const vt323 = localFont({
  src: "../public/fonts/VT323/VT323-Regular.ttf",
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manage Financial Operations with AI | getlinea.app",
  description: "Building the future of financial operations with AI-powered automation, compliance, and insights for modern businesses. | getlinea.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socialLinks = [
    {
      icon: <Twitter className="w-6 h-6" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:hello@getlinea.app",
      label: "Email",
    },
  ];

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "mailto:hello@getlinea.app" }
  ];

  return (
    <ClerkProvider waitlistUrl="/">
      <html lang="en" className="overflow-x-clip">
        <body
          className={`${figtree.variable} ${vt323.variable} antialiased overflow-x-clip max-w-[100vw]`}
        >
          <Navbar />
          <SmoothScroll>
            <main className="overflow-x-clip max-w-[100vw]">
              {children}
            </main>
          </SmoothScroll>
          <Footer
            brandName="Linea"
            brandDescription="Building the future of financial operations with AI-powered automation, compliance, and insights for modern businesses."
            socialLinks={socialLinks}
            navLinks={navLinks}
            creatorName="Linea"
            creatorUrl="https://getlinea.app"
            brandIcon={<Image src="/assets/linea-light.svg" alt="Linea Logo" className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-background drop-shadow-lg" width={56} height={56} />}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}

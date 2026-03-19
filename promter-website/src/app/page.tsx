import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import PresetsShowcase from "@/components/landing/PresetsShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import AIChat from "@/components/chat/AIChat";
import HowToUse from "@/components/landing/HowToUse";
import Testimonials from "@/components/landing/Testimonials";
import BotIntegration from "@/components/landing/BotIntegration";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Promter",
  url: "https://promter.dev",
  description:
    "Modular prompt library and AI builder for generating production-ready websites. 50+ prompts, 27 templates, free and open source.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Promter",
    url: "https://promter.dev",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <AIChat />
        <HowItWorks />
        <HowToUse />
        <BotIntegration />
        <Features />
        <PresetsShowcase />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

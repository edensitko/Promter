import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ResourcesBrowser from "@/components/resources/ResourcesBrowser";
import { ArrowRight, LayoutTemplate } from "lucide-react";

export const metadata = {
  title: "Prompt Library",
  description:
    "Browse 50+ modular AI prompt modules: UI styles, layouts, animations, and 3D effects. Copy any prompt directly for free.",
  openGraph: {
    title: "Prompt Library — Promter",
    description: "50+ modular AI prompts for UI styles, layouts, animations, and 3D effects. Browse, preview, and copy any module.",
    url: "https://promter.dev/resources",
  },
  alternates: { canonical: "https://promter.dev/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Prompt{" "}
              <span className="gradient-text">Library</span>
            </h1>
            <p className="mt-3 text-sm lg:text-base text-white/40 max-w-xl mx-auto">
              Browse all prompt modules used by our presets. Copy any module
              directly or combine them for your own custom prompts.
            </p>
            <Link
              href="/templates"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200"
            >
              <LayoutTemplate size={16} />
              Explore Templates
              <ArrowRight size={14} />
            </Link>
          </div>
          <ResourcesBrowser />
        </div>
      </main>
      <Footer />
    </>
  );
}

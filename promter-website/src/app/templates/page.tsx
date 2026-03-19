import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import TemplatesBrowser from "@/components/templates/TemplatesBrowser";

export const metadata = {
  title: "Website Templates",
  description:
    "Browse 27 ready-to-use website templates. Each template combines UI styles, layouts, animations, and 3D effects into a complete AI prompt recipe.",
  openGraph: {
    title: "Website Templates — Promter",
    description: "27 ready-to-use AI prompt templates for generating complete websites. SaaS, e-commerce, portfolios, dashboards and more.",
    url: "https://promter.dev/templates",
  },
  alternates: { canonical: "https://promter.dev/templates" },
};

export default function TemplatesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Website{" "}
              <span className="gradient-text">Templates</span>
            </h1>
            <p className="mt-3 text-sm lg:text-base text-white/40 max-w-xl mx-auto">
              Complete prompt recipes that combine UI styles, layouts, animations,
              and 3D effects. Each generation is unique thanks to built-in randomization.
            </p>
          </div>
          <TemplatesBrowser />
        </div>
      </main>
      <Footer />
    </>
  );
}

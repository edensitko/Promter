import { notFound } from "next/navigation";
import { presets } from "@/data/presets";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import TemplateDetail from "@/components/templates/TemplateDetail";

export function generateStaticParams() {
  return presets.map((p) => ({ id: p.id }));
}

import { categories } from "@/data/presets";

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const preset = presets.find((p) => p.id === id);
    if (!preset) return { title: "Not Found" };
    const catLabel = categories[preset.category as keyof typeof categories]?.label || preset.category;
    const totalModules = preset.uiStyles.length + preset.layouts.length + preset.animations.length + preset.effects3d.length;
    return {
      title: `${preset.name} Template`,
      description: `${preset.description} — ${catLabel} template with ${totalModules} modules, ${preset.estimatedComponents}+ components. ${preset.difficulty} difficulty.`,
      openGraph: {
        title: `${preset.name} — Promter Template`,
        description: preset.description,
        url: `https://promter.dev/templates/${id}`,
      },
      alternates: { canonical: `https://promter.dev/templates/${id}` },
    };
  });
}

export default async function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const preset = presets.find((p) => p.id === id);
  if (!preset) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <TemplateDetail preset={preset} />
      </main>
      <Footer />
    </>
  );
}

import { notFound } from "next/navigation";
import { promptFiles } from "@/data/embedded-prompts";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PromptDetail from "@/components/prompts/PromptDetail";

export const dynamic = "force-static";
export const dynamicParams = false;

function getAllPrompts() {
  const seen = new Set<string>();
  return Object.entries(promptFiles)
    .filter(([path]) => {
      if (seen.has(path)) return false;
      seen.add(path);
      return true;
    })
    .map(([path, content]) => {
      const parts = path.split("/");
      const name = parts[parts.length - 1].replace(".md", "");
      return { path, category: parts[0], name, content };
    });
}

export function generateStaticParams() {
  return getAllPrompts().map((p) => ({ id: p.name }));
}

const categoryLabels: Record<string, string> = {
  ui: "UI Style",
  layouts: "Layout",
  animations: "Animation",
  "3d": "3D Effect",
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prompt = getAllPrompts().find((p) => p.name === id);
  if (!prompt) return { title: "Not Found" };
  const heading = prompt.content.split("\n").find((l) => l.startsWith("# "));
  const title = heading ? heading.replace(/^#+\s*/, "") : prompt.name;
  const catLabel = categoryLabels[prompt.category] || prompt.category;
  const sizeKB = Math.round((prompt.content.length / 1024) * 10) / 10;
  return {
    title,
    description: `${title} — Free ${catLabel} prompt module (${sizeKB} KB). Copy and use with ChatGPT, Claude, Cursor, or any AI coding assistant.`,
    openGraph: {
      title: `${title} — Promter`,
      description: `Free ${catLabel} prompt module. Copy and paste into any AI assistant to generate websites.`,
      url: `https://promter.dev/prompts/${id}`,
    },
    alternates: { canonical: `https://promter.dev/prompts/${id}` },
  };
}

export default async function PromptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allPrompts = getAllPrompts();
  const prompt = allPrompts.find((p) => p.name === id);
  if (!prompt) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <PromptDetail prompt={prompt} />
      </main>
      <Footer />
    </>
  );
}

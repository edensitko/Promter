import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://promter.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Promter — Generate Complete Websites with AI",
    template: "%s — Promter",
  },
  description:
    "Describe your dream website and our AI builds the perfect prompt recipe. 50+ modular prompts, 27 templates, and a free AI prompt builder for generating production-ready websites.",
  keywords: [
    "AI website generator",
    "AI prompts",
    "website prompts",
    "prompt library",
    "AI coding assistant",
    "ChatGPT prompts",
    "Claude prompts",
    "Cursor prompts",
    "website templates",
    "prompt engineering",
    "UI design prompts",
    "glassmorphism",
    "3D web effects",
    "Next.js templates",
    "Tailwind CSS",
    "web development",
    "AI web design",
  ],
  authors: [{ name: "Promter" }],
  creator: "Promter",
  publisher: "Promter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Promter",
    title: "Promter — Generate Complete Websites with AI",
    description:
      "50+ modular prompts and 27 templates for generating production-ready websites with any AI coding assistant. Free, open source, no signup required.",
    images: [
      {
        url: "/logo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Promter — AI Website Prompt Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Promter — Generate Complete Websites with AI",
    description:
      "50+ modular prompts and 27 templates for generating production-ready websites with any AI coding assistant.",
    images: ["/logo/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/logo/5.png",
    apple: "/logo/5.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

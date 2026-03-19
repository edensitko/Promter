"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";

const links = [
  {
    title: "Product",
    items: [
      { label: "Presets", href: "/#presets" },
      { label: "Features", href: "/#features" },
      { label: "Generator", href: "/#generate" },
      { label: "Templates", href: "/templates" },
    ],
  },
  {
    title: "Library",
    items: [
      { label: "Getting Started", href: "/#how-it-works" },
      { label: "Prompt Library", href: "/resources" },
      { label: "Templates", href: "/templates" },
      { label: "Library", href: "/resources" },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "GitHub", href: "https://github.com/edensitko/Promter" },
      { label: "Discord", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Contributing", href: "https://github.com/edensitko/Promter#contributing" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center">
              <Image src="/logo/2.png" alt="Promter logo" width={48} height={48} className="rounded-lg" />
            </Link>
            <p className="mt-3 text-sm text-white/30 max-w-xs leading-relaxed">
              Modular prompt library for generating production-ready websites with any AI coding assistant.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: Github, href: "https://github.com/edensitko/Promter" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.06] transition-all"
                  aria-label={Icon === Github ? "GitHub" : "Twitter"}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {links.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/25 hover:text-white/50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Promter. Open source under MIT.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/15 hover:text-white/40 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/15 hover:text-white/40 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

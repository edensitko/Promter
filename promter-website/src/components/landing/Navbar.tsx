"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Github } from "lucide-react";

const navLinks = [
  { label: "Generate", href: "/#generate" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Library", href: "/resources" },
  { label: "Templates", href: "/templates" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <nav className={`mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 flex items-center justify-between h-14 lg:h-16 rounded-2xl border transition-all duration-300 ${
        scrolled
          ? "bg-white/[0.06] backdrop-blur-xl border-white/[0.10] shadow-lg shadow-black/20"
          : "bg-white/[0.03] backdrop-blur-md border-white/[0.06]"
      }`}>
        <Link href="/" className="flex items-center">
          <Image src="/logo/2.png" alt="Promter logo" width={80} height={80} className="rounded-lg w-[50px] h-[50px] sm:w-[80px] sm:h-[80px]" />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/edensitko/Promter"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white/70 hover:text-white"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden mx-4 overflow-hidden transition-all duration-300 ${open ? "max-h-80 mt-2" : "max-h-0"}`}>
        <div className="bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/[0.10] px-4 py-5 space-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-white/60 hover:text-white py-2"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Photography", href: "/photography" },
  { label: "Films", href: "/films" },
  { label: "Blogs", href: "/blogs" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("footer-visible");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`

        .footer-root {
          --gold: #c8a96e;
          --gold-light: #e8d5b0;
          --ink: #1c1712;
          --muted: #9a8a74;
        }

        .footer-section {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .footer-visible .footer-section { opacity: 1; transform: translateY(0); }
        .footer-visible .footer-section:nth-child(1) { transition-delay: 0ms; }
        .footer-visible .footer-section:nth-child(2) { transition-delay: 110ms; }
        .footer-visible .footer-section:nth-child(3) { transition-delay: 220ms; }

        .footer-top-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #c8a96e 30%, #e8d5b0 50%, #c8a96e 70%, transparent 100%);
        }

        .footer-nav-link {
          position: relative;
          color: #000000;
          font-family: 'Jost';
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: capitalize;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .footer-nav-link:hover { color: var(--ink); }
        .footer-nav-link:hover::after { width: 100%; }

        .footer-social {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid var(--gold-light);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          color: var(--muted);
          text-decoration: none;
        }
        .footer-social:hover {
          background: var(--gold);
          border-color: var(--gold);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(200, 169, 110, 0.35);
        }

        .footer-email {
          font-size: 1.15rem;
          font-weight: 400;
          color: var(--ink);
          text-decoration: none;
          letter-spacing: 0.03em;
          position: relative;
          transition: color 0.3s ease;
                    font-family: 'Jost', sans-serif;

        }
        .footer-email::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 50%; transform: translateX(-50%);
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .footer-email:hover { color: var(--muted); }
        .footer-email:hover::after { width: 100%; }

        .vdivider {
          width: 1px;
          background: linear-gradient(180deg, transparent, #c8b89a 25%, #c8b89a 75%, transparent);
          align-self: stretch;
          min-height: 160px;
        }

        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .footer-ornament { animation: slowSpin 20s linear infinite; opacity: 0.45; }

        .footer-quote {
          font-style: italic;
          font-size: 1.4rem;
          font-weight: 300;
          line-height: 1.65;
          color: var(--ink);
          letter-spacing: 0.01em;
        }
        .footer-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.64rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #b09a7e;
        }
        .footer-address {

          font-size: 1.05rem;
          color: #3d3328;
          line-height: 1.8;
        }
      `}</style>

      <footer ref={footerRef} className="footer-root w-full bg-[#F4F1E5] overflow-hidden">
        <div className="footer-top-rule" />

        <div className="max-w-8xl mx-auto px-8 md:px-16 pt-16 pb-10">

          {/* ── QUOTE BAND ── */}
          {/* <div className="footer-section flex flex-col items-center text-center mb-16 gap-4">
            <svg className="footer-ornament" width="34" height="34" viewBox="0 0 32 32" fill="none">
              <path d="M16 2 L18.5 12.5 L29 10 L21.5 17.5 L29 25 L18.5 22 L16 32 L13.5 22 L3 25 L10.5 17.5 L3 10 L13.5 12.5 Z"
                stroke="#c8a96e" strokeWidth="1" fill="none"/>
              <circle cx="16" cy="16" r="3" fill="#c8a96e" opacity="0.6"/>
            </svg>
            <p className="footer-quote max-w-xl">
              "A home is not just Link place — it is Link feeling, Link story, Link state of bliss."
            </p>
            <div className="flex items-center gap-3 mt-1">
              <div className="h-px w-12 bg-[#c8a96e] opacity-50" />
              <span className="footer-label">House of Bliss</span>
              <div className="h-px w-12 bg-[#c8a96e] opacity-50" />
            </div>
          </div> */}

          {/* ── MAIN 3-COL ── */}
          <div className="flex flex-col md:flex-row items-start md:items-stretch gap-10 md:gap-0">

            {/* LEFT */}
            <div className="footer-section flex-1 flex flex-col items-start gap-6 pr-0 md:pr-12">
              <Image
                width={180}
                height={190}
                src="/darklogo.png"
                alt="House of Bliss Logo"
                className="object-contain"
              />
             
              <div className="flex gap-3">
                <Link href="https://www.instagram.com/houseofbliss.in" target="_blank" rel="noopener" aria-label="Instagram" className="footer-social">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </Link>
               
              </div>
            </div>

            <div className="hidden md:block vdivider mx-8" />

            {/* CENTER: Nav */}
            <div className="footer-section flex-1 flex flex-col gap-5 items-start md:items-center">
              <span className="footer-label">Links</span>
              <nav className="flex flex-col gap-3.5 items-start md:items-center">
                {NAV_LINKS.map((link) => (
                  <Link key={link.label} href={link.href} className="footer-nav-link lowercase">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hidden md:block vdivider mx-8" />

            {/* RIGHT: Address + email */}
            <div className="footer-section flex-1 flex flex-col items-start md:items-end gap-7 pl-0 md:pl-12">
              <div className="flex flex-col items-start md:items-end gap-2">
                <span className="footer-label">Find Us</span>
                <address className="footer-address not-italic mt-1" style={{ textAlign: "inherit" ,  fontFamily: "Jost" }}>
                  Bengaluru, Karnataka
                </address>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <span className="footer-label">Write to Us</span>
                <Link style={{ fontFamily: "Jost"}} href="mailto:info@houseofbliss.co.in" className="footer-email mt-1 ">
                  info@houseofbliss.co.in
                </Link>
              </div>
            </div>

          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="mt-5 pt-6 border-t border-[#ddd3be] flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="footer-label" style={{ letterSpacing: "0.18em" }}>
              © {new Date().getFullYear()} House of Bliss. All rights reserved.
            </p>
            <div className="flex items-center gap-2 opacity-35">
              <div className="h-px w-6 bg-[#c8a96e]" />
              <svg width="8" height="8" viewBox="0 0 10 10" fill="#c8a96e">
                <polygon points="5,0 6.2,3.8 10,3.8 6.9,6.2 8.1,10 5,7.6 1.9,10 3.1,6.2 0,3.8 3.8,3.8"/>
              </svg>
              <div className="h-px w-6 bg-[#c8a96e]" />
            </div>
            <p className="footer-label" style={{ color: "#c8a96e", letterSpacing: "0.18em" }}>
              Bengaluru, India
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
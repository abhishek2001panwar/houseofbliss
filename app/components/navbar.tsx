"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export type NavbarTheme = "light" | "dark";

interface NavbarProps {
  theme?: NavbarTheme;
  color?: string;
}

function resolveColor(theme: NavbarTheme, color?: string): string {
  if (color) return color;
  return theme === "dark" ? "#41453D" : "#fdf9dc";
}

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "Photography", href: "/photography" },
  { name: "Films", href: "/films" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Say hi", href: "/contact" },
];

const services = [
  { name: "Cinematic Wedding Photography", href: "/service1" },
  { name: "Pre Wedding Photography", href: "/service2" },
  { name: "Wedding Photgraphy", href: "/service3" },
  { name: "Best Wedding Photography", href: "/service4" },
  { name: "Post Wedding shoot", href: "/service5" },
  { name: "Engagement Photographers", href: "/service6" },
  { name: "Candid Wedding Photography", href: "/service7" },
  { name: "Affordable Wedding Photographers", href: "/service8" },
  { name: "Best Wedding Photographer", href: "/service9" },
  { name: "Top Wedding Photographers", href: "/service10" },
];

const servicesRow1 = services.slice(0, 5);
const servicesRow2 = services.slice(5, 10);

// ─── Instagram Icon ───────────────────────────────────────────────────────────
function InstagramIcon({ color }: { color: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

// ─── Desktop services overlay ─────────────────────────────────────────────────
function DesktopServiceLink({
  service,
  idx,
  visible,
  onClose,
}: {
  service: { name: string; href: string };
  idx: number;
  visible: boolean;
  onClose: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={service.href}
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between py-5 px-6"
      style={{
        minWidth: 0,
        gap: "12px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transitionDelay: visible ? `${idx * 40}ms` : "0ms",
        borderBottom: `1px solid rgba(253,249,220,${hovered ? "0.28" : "0.07"})`,
        borderTop: `1px solid rgba(253,249,220,${hovered ? "0.28" : "0"})`,
        background: hovered ? "rgba(253,249,220,0.04)" : "transparent",
        transition:
          "opacity 0.5s, transform 0.5s, border-color 0.25s, background 0.25s",
      }}
    >
      <span
        className="font-editorial whitespace-nowrap truncate"
        style={{
          fontSize: "1rem",
          letterSpacing: "0.02em",
          transition: "color 0.25s",
          color: hovered ? "#fdf9dc" : "rgba(253,249,220,0.5)",
        }}
      >
        {service.name}
      </span>
      <span
        className="flex-shrink-0"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-6px)",
          transition: "opacity 0.25s, transform 0.25s",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(253,249,220,0.65)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

function ServicesOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-40"
        style={{
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          background: "rgba(0,0,0,0.52)",
          transition: "opacity 0.4s",
          backdropFilter: open ? "blur(3px)" : "none",
          WebkitBackdropFilter: open ? "blur(3px)" : "none",
        }}
        onClick={onClose}
      />
      <div
        className="fixed top-0 left-0 w-full z-50"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-18px)",
          pointerEvents: open ? "auto" : "none",
          background: "rgba(11,12,9,0.92)",
          backdropFilter: "blur(28px) saturate(1.2)",
          WebkitBackdropFilter: "blur(28px) saturate(1.2)",
          borderBottom: "1px solid rgba(253,249,220,0.07)",
          paddingTop: "88px",
          paddingBottom: "40px",
          transition:
            "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-20">
          <div
            className="flex items-center gap-4 mb-6"
            style={{
              opacity: open ? 1 : 0,
              transition: "opacity 0.5s",
              transitionDelay: open ? "60ms" : "0ms",
            }}
          >
            <span
              className="font-neue-light uppercase tracking-[0.35em] text-[10px] flex-shrink-0"
              style={{ color: "rgba(253,249,220,0.28)" }}
            >
              Our Services
            </span>
            <div
              className="h-px flex-1"
              style={{ background: "rgba(253,249,220,0.07)" }}
            />
            <button
              onClick={onClose}
              className="flex-shrink-0 font-neue-light text-[10px] uppercase tracking-[0.3em] hover:opacity-100 transition-opacity duration-200"
              style={{ color: "rgba(253,249,220,0.28)" }}
            >
              Close ✕
            </button>
          </div>
          <div className="grid grid-cols-5">
            {servicesRow1.map((s, i) => (
              <DesktopServiceLink
                key={s.href}
                service={s}
                idx={i}
                visible={open}
                onClose={onClose}
              />
            ))}
          </div>
          <div
            className="h-px w-full"
            style={{ background: "rgba(253,249,220,0.04)" }}
          />
          <div className="grid grid-cols-5">
            {servicesRow2.map((s, i) => (
              <DesktopServiceLink
                key={s.href}
                service={s}
                idx={i + 5}
                visible={open}
                onClose={onClose}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Mobile services popover ──────────────────────────────────────────────────
function MobileServicesPopover({
  open,
  onClose,
  onServiceClick,
}: {
  open: boolean;
  onClose: () => void;
  onServiceClick: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col"
      style={{
        background: "rgba(11,12,9,0.99)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.45s cubic-bezier(0.76,0,0.24,1)",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div
        className="flex items-center justify-between px-6 pt-7 pb-5"
        style={{ borderBottom: "1px solid rgba(253,249,220,0.08)" }}
      >
        <span
          className="font-neue-light uppercase tracking-[0.3em] text-[10px]"
          style={{ color: "rgba(253,249,220,0.3)" }}
        >
          Services
        </span>
        <button
          onClick={onClose}
          className="flex items-center gap-2 font-neue-light text-[11px] uppercase tracking-[0.25em]"
          style={{ color: "rgba(253,249,220,0.35)" }}
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="7 1 1 7 7 13" />
          </svg>
          Back
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {services.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            onClick={onServiceClick}
            className="group flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(253,249,220,0.06)" }}
          >
            <span
              className="font-editorial transition-colors duration-200 group-hover:text-[#fdf9dc]"
              style={{
                fontSize: "1.1rem",
                color: "rgba(253,249,220,0.6)",
                letterSpacing: "0.02em",
              }}
            >
              {s.name}
            </span>
            <svg
              className="opacity-0 group-hover:opacity-50 transition-opacity duration-200 flex-shrink-0"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fdf9dc"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Full-page menu overlay (mobile) ─────────────────────────────────────────
function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [servicesPopoverOpen, setServicesPopoverOpen] = useState(false);
  useEffect(() => {
    if (!open) setServicesPopoverOpen(false);
  }, [open]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-[60] overflow-hidden"
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          background: "rgba(11,12,9,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition:
            "transform 0.65s cubic-bezier(0.76,0,0.24,1), opacity 0.5s",
        }}
      >
        {/* Top bar */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-6 pt-7 pb-6"
          style={{ borderBottom: "1px solid rgba(253,249,220,0.07)" }}
        >
          <Link href="/" onClick={onClose}>
            <Image
              width={60}
              height={24}
              src="/logo.png"
              alt="House of Bliss"
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center gap-2 font-neue-light text-[11px] uppercase tracking-[0.3em] hover:opacity-100 transition-opacity duration-200"
            style={{ color: "rgba(253,249,220,0.4)" }}
          >
            Close
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="flex flex-col w-full">
            {menuLinks.map((link, idx) => (
              <div
                key={link.href}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s, transform 0.6s",
                  transitionDelay: open ? `${0.08 + idx * 0.07}s` : "0s",
                  borderBottom: "1px solid rgba(253,249,220,0.07)",
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between py-4 w-full"
                >
                  <span
                    className=" transition-colors duration-200"
                    style={{
                      fontSize: "clamp(1.5rem, 7vw, 2.2rem)",
                      color: "rgba(253,249,220,0.85)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {link.name}
                  </span>
                  <svg
                    className="opacity-0 group-hover:opacity-50 transition-opacity duration-200 flex-shrink-0"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fdf9dc"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            ))}
            {/* Mobile Services button */}
            <div
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s, transform 0.6s",
                transitionDelay: open
                  ? `${0.08 + menuLinks.length * 0.07}s`
                  : "0s",
                borderBottom: "1px solid rgba(253,249,220,0.07)",
              }}
            >
              {/* <button
                onClick={() => setServicesPopoverOpen(true)}
                className="flex items-center justify-between py-4 w-full focus:outline-none group"
              >
                <span
                  className="font-editorial"
                  style={{
                    fontSize: "clamp(1.5rem, 7vw, 2.2rem)",
                    color: "rgba(253,249,220,0.85)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Services
                </span>
                <svg
                  className="flex-shrink-0 opacity-40 group-hover:opacity-70 transition-opacity duration-200"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fdf9dc"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button> */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex-shrink-0 px-6 py-5 flex items-center justify-between"
          style={{
            borderTop: "1px solid rgba(253,249,220,0.07)",
            opacity: open ? 1 : 0,
            transition: "opacity 0.6s",
            transitionDelay: open ? "0.5s" : "0s",
          }}
        >
          <span
            className="font-neue-light text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(253,249,220,0.2)" }}
          >
            House of Bliss © 2026
          </span>
          <a
            href="mailto:info@houseofbliss.co.in"
            className="font-neue-light text-[10px] uppercase tracking-[0.25em] hover:opacity-80 transition-opacity duration-200"
            style={{ color: "rgba(253,249,220,0.22)" }}
          >
            info@houseofbliss.co.in
          </a>
        </div>
      </div>

      <MobileServicesPopover
        open={servicesPopoverOpen}
        onClose={() => setServicesPopoverOpen(false)}
        onServiceClick={onClose}
      />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ theme = "light", color }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const ink = resolveColor(theme, color);

  const scrolledBg =
    theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.25)";

  const scrolledShadow =
    theme === "dark"
      ? "0 1px 0 0 rgba(0,0,0,0.08)"
      : "0 1px 0 0 rgba(255,255,255,0.06)";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > lastScrollY && y > 60) {
        setMenuOpen(false);
        setServicesOpen(false);
      }
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full flex items-center justify-between py-2 px-6 md:px-16 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
          backgroundColor: scrolled ? scrolledBg : "transparent",
          boxShadow: scrolled ? scrolledShadow : "none",
        }}
      >
        {/* ── LEFT: Logo ── */}
        <Link className="flex-shrink-0" href="/">
          <Image
            width={80}
            height={30}
            src={theme === "dark" ? "/darklogo.png" : "/logo.png"}
            alt="House of Bliss"
            priority
            className=" animate-fadeIn"
          />
        </Link>

        {/* ── RIGHT: all links + Instagram + Get in Touch (desktop) · MENU (mobile) ── */}
        <div className="flex items-center gap-10">
          {/* Nav links — desktop only */}
          <Link
            href="/photography"
            className="hidden md:inline font-serif text-[13px] capitalise tracking-[0.12em] hover:opacity-60 transition-opacity duration-200"
            style={{ color: ink }}
          >
            Photography
          </Link>
          <Link
            href="/films"
            className="hidden md:inline font-serif text-[13px] capitalise tracking-[0.12em] hover:opacity-60 transition-opacity duration-200"
            style={{ color: ink }}
          >
            Films
          </Link>
          <Link
            href="/about"
            className="hidden md:inline font-serif text-[13px] capitalise tracking-[0.12em] hover:opacity-60 transition-opacity duration-200"
            style={{ color: ink }}
          >
            About
          </Link>
          <Link
            href="/blogs"
            className="hidden md:inline font-serif text-[13px] capitalise tracking-[0.12em] hover:opacity-60 transition-opacity duration-200"
            style={{ color: ink }}
          >
            Blogs
          </Link>

          {/* Instagram icon — desktop only */}
          <Link
            href="https://www.instagram.com/houseofbliss.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden md:flex items-center justify-center hover:opacity-60 transition-opacity duration-200"
          >
            <InstagramIcon color={ink} />
          </Link>

          {/* Get in Touch button — desktop only */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 font-neue-light text-[10px] capitalise tracking-[0.15em] px-4 py-2 transition-all duration-300 hover:opacity-80"
            style={{
              color: theme === "dark" ? "#41453D" : "#fdf9dc",
              border: `1px solid ${theme === "dark" ? "rgba(65,69,61,0.5)" : "rgba(253,249,220,0.35)"}`,
              borderRadius: "2px",
            }}
          >
            Get in Touch
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          {/* MENU button — mobile only */}
          <button
            className="relative overflow-hidden md:hidden font-neue-light text-[15px] group h-[20px]"
            style={{ color: ink }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
              <span>MENU</span>
              <span>MENU</span>
            </span>
          </button>
        </div>
      </nav>

      <ServicesOverlay
        open={servicesOpen}
        onClose={() => setServicesOpen(false)}
      />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Navbar;

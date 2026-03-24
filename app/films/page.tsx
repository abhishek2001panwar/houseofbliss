"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import films, { Couple } from "@/lib/films";
import Navbar from "../components/navbar";
import Link from "next/link";

// ─── Film Card ────────────────────────────────────────────────────────────────
function FilmCard({ couple, index }: { couple: Couple; index: number }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumb = couple.videos[0].src;

 useEffect(() => {
  const el = videoRef.current;
  if (!el) return;

  // Skip company watermark at start
  const seekAndPlay = () => {
    el.currentTime = 9;
  };

  // Loop back to 6s before the last 6 seconds (skips end card too)
  const handleTimeUpdate = () => {
    if (el.duration && el.currentTime >= el.duration - 9) {
      el.currentTime = 9;
    }
  };

  el.addEventListener("loadedmetadata", seekAndPlay);
  el.addEventListener("timeupdate", handleTimeUpdate);
  if (el.readyState >= 1) seekAndPlay();

  return () => {
    el.removeEventListener("loadedmetadata", seekAndPlay);
    el.removeEventListener("timeupdate", handleTimeUpdate);
  };
}, []);

  return (
    <div
      className="film-card"
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => router.push(`/films/couple/${couple.coupleSlug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── media ── */}
      <div className="media-wrap">
        <video
          ref={videoRef}
          src={thumb}
          muted
          autoPlay
          playsInline
         
          preload="metadata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />

        {/* dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to top, rgba(8,7,5,0.82) 0%, rgba(8,7,5,0.30) 55%, rgba(8,7,5,0.12) 100%)"
              : "linear-gradient(to top, rgba(8,7,5,0.45) 0%, transparent 60%)",
            transition: "background 0.55s ease",
            pointerEvents: "none",
          }}
        />

        {/* hover CTA */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "22px 20px 20px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1)",
            zIndex: 4,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 18px",
              border: "1px solid rgba(255,255,255,0.30)",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#fff",
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.30em",
              textTransform: "uppercase" as const,
              width: "fit-content",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              transition: "background 0.25s, border-color 0.25s",
            }}
          >
            View All Films
            <ArrowUpRight size={11} />
          </div>
        </div>
      </div>

      {/* ── text row ── */}
      <div className="card-text">
        <h3 className="card-name font-serif">{couple.title}</h3>
        <ArrowUpRight
          size={14}
          style={{
            color: hovered ? "rgba(44,43,39,0.6)" : "rgba(44,43,39,0.15)",
            transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
            transition: "color 0.3s, transform 0.3s",
            flexShrink: 0,
            marginTop: 3,
          }}
        />
      </div>
      <div
        className="card-rule"
        style={{ background: hovered ? "rgba(44,43,39,0.15)" : "rgba(44,43,39,0.08)", transition: "background 0.4s" }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FilmsPage() {
  return (
    <>
      <style>{`
        :root {
          --cream:      #F4F1E5;
          --cream-dark: #EAE6D4;
          --ink:        #2C2B27;
          --ink-60:     rgba(44,43,39,0.60);
          --ink-35:     rgba(44,43,39,0.35);
          --ink-15:     rgba(44,43,39,0.15);
          --ink-08:     rgba(44,43,39,0.08);
        }

        .films-page { min-height: 100vh; background: var(--cream); }

        .films-section {
          width: 100%; max-width: 1440px;
          margin: 0 auto;
          padding: 80px 48px 120px;
        }
        @media (max-width: 768px) { .films-section { padding: 60px 20px 80px; } }

        .films-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
        }
        @media (max-width: 900px) { .films-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .films-grid { grid-template-columns: 1fr; gap: 0; background: none; } }

        .film-card {
          display: flex; flex-direction: column;
          cursor: pointer;
          opacity: 0;
          background: var(--cream);
          animation: fadeUp 0.65s ease forwards;
          border-radius: 4px;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .media-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #111;
        }

        .card-text {
          display: flex; align-items: flex-start;
          justify-content: space-between;
          padding: 14px 16px 16px;
          background: var(--cream);
        }
        .card-name {
          font-size: 0.95rem; font-weight: 300;
          color: var(--ink); margin: 0; line-height: 1.3;
        }
        .card-rule { height: 1px; }

        .films-footer { display: flex; justify-content: center; margin-top: 72px; }
        .films-footer-btn {
          font-size: 9px; letter-spacing: 0.4em;
          text-transform: uppercase; color: var(--ink-35);
          border: 1px solid var(--ink-15); background: none;
          padding: 16px 40px; cursor: pointer;
          transition: border-color 0.3s, color 0.3s;
          font-family: 'DM Mono', monospace;
        }
        .films-footer-btn:hover { border-color: var(--ink-60); color: var(--ink); }

        @media (max-width: 560px) {
          .card-text { padding: 12px 0 14px; }
          .card-rule  { display: block; }
        }
      `}</style>

      <Navbar theme="dark" />

      <div className="films-page">
        <section className="films-section">
          <div className="films-grid pt-32">
            {films.map((couple, idx) => (
              <FilmCard key={couple.coupleSlug} couple={couple} index={idx} />
            ))}
          </div>

          <div className="films-footer">
            <Link href="/contact" className="films-footer-btn">
              Enquire About Your Wedding
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
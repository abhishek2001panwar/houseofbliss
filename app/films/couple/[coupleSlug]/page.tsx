"use client";

import React, { use, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import films, { Video } from "@/lib/films";

// ─── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({ video, index, coupleSlug }: { video: Video; index: number; coupleSlug: string }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const seekAndPlay = () => {
      el.currentTime = 7; // skip company intro watermark
    };

    // loadedmetadata = duration known, seeking is possible
    el.addEventListener("loadedmetadata", seekAndPlay);

    // already ready (e.g. cached)
    if (el.readyState >= 1) seekAndPlay();

    return () => el.removeEventListener("loadedmetadata", seekAndPlay);
  }, []);

  return (
    <div
      className="vcard"
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={() => router.push(`/films/couple/${coupleSlug}/video/${video.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* media */}
      <div className="vcard-media">
        <video
          ref={videoRef}
          src={video.src}
          muted
          autoPlay
          playsInline
          loop
          preload="metadata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />

        {/* gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to top, rgba(8,7,5,0.75) 0%, rgba(8,7,5,0.18) 55%, transparent 100%)"
              : "linear-gradient(to top, rgba(8,7,5,0.38) 0%, transparent 55%)",
            transition: "background 0.55s ease",
            pointerEvents: "none",
          }}
        />

        {/* hover watch label */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            padding: "18px 18px 16px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.50)",
              border: "1px solid rgba(255,255,255,0.50)",
              padding: "8px 16px",
              backdropFilter: "blur(6px)",
            }}
          >
            Watch <ArrowUpRight size={10} />
          </div>
        </div>

        {/* index badge */}
        <span
          style={{
            position: "absolute", top: 13, left: 15,
            fontFamily: "'DM Mono', monospace",
            fontSize: 9, letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.28)",
            userSelect: "none", zIndex: 3,
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* text row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 10px" }}>
        <p
          style={{
            margin: 0, fontSize: 9, letterSpacing: "0.24em",
            textTransform: "uppercase" as const,
            color: hovered ? "rgba(44,43,39,0.65)" : "rgba(44,43,39,0.40)",
            transition: "color 0.3s",
          }}
        >
          {video.category}
        </p>
        <ArrowUpRight
          size={13}
          style={{
            color: hovered ? "rgba(44,43,39,0.55)" : "rgba(44,43,39,0.15)",
            transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
            transition: "color 0.3s, transform 0.3s",
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CoupleFilmsPage({ params }: { params: Promise<{ coupleSlug: string }> }) {
  const router = useRouter();
  const { coupleSlug } = use(params);

  const coupleIndex = films.findIndex(c => c.coupleSlug === coupleSlug);
  const couple = films[coupleIndex];

  if (!couple) {
    return (
      <div style={{ padding: 80, textAlign: "center", fontFamily: "Georgia, serif", color: "#2C2B27" }}>
        <h2 style={{ fontWeight: 300, fontStyle: "italic", fontSize: "2rem" }}>Couple not found</h2>
        <button onClick={() => router.push("/films")} style={{ marginTop: 32, padding: "12px 32px", border: "1px solid #2C2B27", background: "none", cursor: "pointer", fontSize: 11, letterSpacing: "0.2em" }}>
          Back to Films
        </button>
      </div>
    );
  }

  const prevCouple = coupleIndex > 0 ? films[coupleIndex - 1] : null;
  const nextCouple = coupleIndex < films.length - 1 ? films[coupleIndex + 1] : null;

  return (
    <>
      <style>{`
        :root {
          --cream: #F4F1E5; --cream-dark: #EAE6D4;
          --ink: #2C2B27; --ink-60: rgba(44,43,39,0.60);
          --ink-35: rgba(44,43,39,0.35); --ink-15: rgba(44,43,39,0.15);
          --ink-08: rgba(44,43,39,0.08);
        }

        .couple-page { background: var(--cream); min-height: 100vh; padding: 28px 0 72px; }

        .top-bar { display: flex; align-items: flex-start; justify-content: space-between; padding: 0 48px 32px; }
        @media (max-width: 640px) { .top-bar { padding: 0 20px 24px; } }

        .back-btn {
          display: flex; align-items: center; gap: 6px;
          color: #000; background: none; border: none;
          cursor: pointer; font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          padding: 0; transition: color 0.2s;
        }
        .back-btn:hover { color: var(--ink); }

        .couple-name {
          font-family: var(--font-editorial, serif);
          font-size: clamp(1.4rem, 3vw, 2.4rem);
          font-weight: 300; font-style: italic;
          color: var(--ink); line-height: 1.1; margin: 0; text-align: right;
        }

        .videos-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 1px; padding: 0 48px;
        }
        @media (max-width: 768px) { .videos-grid { grid-template-columns: 1fr; padding: 0 20px; gap: 24px 0; } }

        .vcard {
          display: flex; flex-direction: column; cursor: pointer;
          opacity: 0; background: var(--cream);
          animation: fadeUp 0.6s ease forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .vcard-media { position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #111; }

        .couple-footer { padding: 48px 48px 0; }
        @media (max-width: 640px) { .couple-footer { padding: 36px 20px 0; } }
        .footer-rule { height: 1px; background: linear-gradient(90deg, transparent, var(--ink-15), transparent); margin-bottom: 28px; }
        .footer-nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; }

        .nav-pill {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 18px; border: 1px solid var(--ink-08);
          background: var(--cream-dark); cursor: pointer;
          transition: background 0.25s, border-color 0.25s; color: var(--ink);
          min-width: 0; flex: 1; max-width: 46%;
        }
        @media (min-width: 640px) { .nav-pill { flex: unset; max-width: none; } }
        .nav-pill:hover { background: #DEDAD0; border-color: var(--ink-15); }
        .nav-pill:disabled { opacity: 0.18; cursor: not-allowed; pointer-events: none; }

        .nav-eyebrow { font-size: 7px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-35); margin-bottom: 2px; }
        .nav-title { font-family: var(--font-editorial, serif); font-size: 14px; font-style: italic; font-weight: 300; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .footer-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--ink-15); flex-shrink: 0; }
      `}</style>

      <div className="couple-page">
        <div className="top-bar">
          <button className="back-btn" onClick={() => router.push("/films")}>
            <ChevronLeft size={12} /> All Couples
          </button>
          <h1 className="couple-name">{couple.title}</h1>
        </div>

        <div className="videos-grid">
          {couple.videos.map((video, idx) => (
            <VideoCard key={video.slug} video={video} index={idx} coupleSlug={coupleSlug} />
          ))}
        </div>

        <div className="couple-footer">
          <div className="footer-rule" />
          <div className="footer-nav">
            <button
              className="nav-pill"
              disabled={!prevCouple}
              onClick={() => prevCouple && router.push(`/films/couple/${prevCouple.coupleSlug}`)}
            >
              <ChevronLeft size={12} style={{ color: "var(--ink-35)", flexShrink: 0 }} />
              <div style={{ textAlign: "left", minWidth: 0 }}>
                <p className="nav-eyebrow">Previous</p>
                <p className="nav-title">{prevCouple?.title ?? "—"}</p>
              </div>
            </button>

            <div className="footer-dot" />

            <button
              className="nav-pill"
              disabled={!nextCouple}
              onClick={() => nextCouple && router.push(`/films/couple/${nextCouple.coupleSlug}`)}
              style={{ flexDirection: "row-reverse" }}
            >
              <ChevronLeft size={12} style={{ color: "var(--ink-35)", transform: "rotate(180deg)", flexShrink: 0 }} />
              <div style={{ textAlign: "right", minWidth: 0 }}>
                <p className="nav-eyebrow">Next</p>
                <p className="nav-title">{nextCouple?.title ?? "—"}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
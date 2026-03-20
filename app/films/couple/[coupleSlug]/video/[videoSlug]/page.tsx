"use client";

import React, { use, useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ArrowLeft, ArrowRight } from "lucide-react";
import films from "@/lib/films";

// ─── helpers ──────────────────────────────────────────────────────────────────
function pad(n: number) { return String(n).padStart(2, "0"); }
function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${pad(m)}:${pad(sec)}`;
}

// ─── SVG icons ────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <polygon points="4,2 16,9 4,16" fill="currentColor" />
  </svg>
);
const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="3" y="2" width="4" height="14" rx="1" fill="currentColor" />
    <rect x="11" y="2" width="4" height="14" rx="1" fill="currentColor" />
  </svg>
);
const MuteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 6.5h3l4-3.5v12L6 11.5H3V6.5z" fill="currentColor" />
    <line x1="12" y1="6" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="6" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const UnmuteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 6.5h3l4-3.5v12L6 11.5H3V6.5z" fill="currentColor" />
    <path d="M12 6c1.5.8 2.5 2.3 2.5 3.9s-1 3.1-2.5 3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M13.5 4c2.2 1.3 3.7 3.6 3.7 6.1s-1.5 4.8-3.7 6.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);
const FullscreenIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M1 1h4M1 1v4M15 1h-4M15 1v4M1 15h4M1 15v-4M15 15h-4M15 15v-4"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export default function VideoPlayerPage({
  params,
}: {
  params: Promise<{ coupleSlug: string; videoSlug: string }>;
}) {
  const router = useRouter();
  const { coupleSlug, videoSlug } = use(params);

  let couple = films.find(c => c.coupleSlug === coupleSlug);
  if (!couple) {
    couple = films.find(c => c.videos.some(v => v.slug === videoSlug));
  }

  const videoIndex = couple?.videos.findIndex(v => v.slug === videoSlug) ?? -1;
  const video      = couple?.videos[videoIndex];
  const prevVideo  = couple && videoIndex > 0 ? couple.videos[videoIndex - 1] : null;
  const nextVideo  = couple && videoIndex < couple.videos.length - 1 ? couple.videos[videoIndex + 1] : null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  const [playing, setPlaying]         = useState(true);
  const [muted, setMuted]             = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [ctrlVisible, setCtrlVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setCtrlVisible(true);
    hideTimer.current = setTimeout(() => setCtrlVisible(false), 3000);
  }, []);

  useEffect(() => {
    resetHide();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [resetHide]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrentTime(v.currentTime);
    const onMeta = () => setDuration(v.duration);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
    };
  }, [videoSlug]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    playing ? v.play().catch(() => {}) : v.pause();
  }, [playing]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
  }, [muted]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - bar.left) / bar.width));
    if (videoRef.current) videoRef.current.currentTime = ratio * duration;
  };

  const toggleFS = () => {
    if (!document.fullscreenElement) wrapRef.current?.requestFullscreen();
    else document.exitFullscreen();
  };

  if (!couple || !video) {
    return (
      <div style={{ padding: 80, textAlign: "center", fontFamily: "Georgia, serif", color: "#2C2B27" }}>
        <h2 style={{ fontWeight: 300, fontStyle: "italic", fontSize: "1.8rem" }}>Video not found</h2>
        <p style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.4, marginTop: 8 }}>
          coupleSlug: "{coupleSlug}" · videoSlug: "{videoSlug}"
        </p>
        <button
          onClick={() => router.push("/films")}
          style={{ marginTop: 32, padding: "12px 32px", border: "1px solid #2C2B27", background: "none", cursor: "pointer", letterSpacing: "0.2em", fontSize: 11 }}
        >
          Back to Films
        </button>
      </div>
    );
  }

  const navTo = (slug: string) =>
    router.push(`/films/couple/${couple!.coupleSlug}/video/${slug}`);

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

        /* ── Page shell ──
           Uses flex column so the video + content stack naturally.
           No fixed heights, no vh tricks — just let content flow.
           pb-safe ensures content clears the footer in your layout.        */
        .vp-page {
          background: var(--cream);
          /* padding-bottom accounts for your layout footer.
             Adjust 72px to match your footer's actual height.             */
          padding: 24px 0 80px;
          box-sizing: border-box;
        }

        /* ── Top bar ── */
        .vp-topbar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 0 20px 16px;
        }
        @media (min-width: 640px) {
          .vp-topbar { padding: 0 40px 20px; }
        }

        .vp-back {
          display: flex; align-items: center; gap: 7px;
          color: var(--ink-35); background: none; border: none;
          cursor: pointer; font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          padding: 0; transition: color 0.2s;
        }
        .vp-back:hover { color: var(--ink); }

        .vp-meta { text-align: right; }
        .vp-couple-name {
          font-size: clamp(1.1rem, 3.5vw, 1.9rem);
          font-weight: 300; font-style: italic;
          color: var(--ink); line-height: 1.1; margin: 0;
        }
        .vp-category {
          font-size: 9px; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--ink-35); margin-top: 4px;
        }

        /* ── Video wrapper ──
           aspect-ratio keeps the 16/9 box; no fixed heights.
           On mobile this naturally fills the full width.                  */
        .vp-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #0E0D0B;
          overflow: hidden;
          cursor: pointer;
        }
        .vp-video {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .vp-vig-top {
          position: absolute; top: 0; left: 0; right: 0; height: 24%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 100%);
          pointer-events: none;
        }
        .vp-vig-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 42%;
          background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%);
          pointer-events: none;
        }

        /* ── Controls overlay ── */
        .vp-controls {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 0 16px 14px;
          transition: opacity 0.45s ease; z-index: 10;
        }
        @media (min-width: 640px) {
          .vp-controls { padding: 0 28px 22px; }
        }
        .vp-on  { opacity: 1; pointer-events: auto; }
        .vp-off { opacity: 0; pointer-events: none; }

        /* Scrubber */
        .vp-scrub {
          position: relative; height: 2px;
          background: rgba(255,255,255,0.20);
          margin-bottom: 14px; border-radius: 2px; cursor: pointer;
        }
        @media (min-width: 640px) { .vp-scrub { margin-bottom: 18px; } }
        .vp-scrub:hover .vp-thumb { opacity: 1 !important; transform: translate(-50%,-50%) scale(1) !important; }
        .vp-fill {
          position: absolute; left: 0; top: 0; height: 100%;
          background: rgba(255,255,255,0.85); border-radius: 2px;
          transition: width 0.15s linear;
        }
        .vp-thumb {
          position: absolute; top: 50%; transform: translate(-50%,-50%) scale(0);
          width: 11px; height: 11px; border-radius: 50%; background: #fff;
          opacity: 0; transition: opacity 0.18s, transform 0.18s;
          box-shadow: 0 0 7px rgba(255,255,255,0.65);
        }

        /* Buttons row */
        .vp-row {
          display: flex; align-items: center;
          justify-content: space-between; gap: 8px;
        }

        /* Time — hidden on very small screens to avoid overflow */
        .vp-time {
          font-size: 9px; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.40); min-width: 72px;
        }
        @media (min-width: 400px) { .vp-time { font-size: 10px; min-width: 88px; } }
        .vp-sep { color: rgba(255,255,255,0.18); margin: 0 3px; }

        .vp-btns { display: flex; align-items: center; gap: 8px; }
        @media (min-width: 640px) { .vp-btns { gap: 10px; } }

        .vp-btn {
          display: flex; align-items: center; justify-content: center;
          /* Smaller on mobile so they all fit */
          width: 36px; height: 36px;
          border: 1px solid rgba(255,255,255,0.14); border-radius: 50%;
          background: rgba(255,255,255,0.08); backdrop-filter: blur(14px);
          color: #fff; cursor: pointer;
          transition: background 0.22s, border-color 0.22s, transform 0.18s;
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .vp-btn { width: 42px; height: 42px; }
        }
        .vp-btn:hover {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.30);
          transform: scale(1.06);
        }
        .vp-play {
          width: 44px !important; height: 44px !important;
          border-color: rgba(255,255,255,0.28) !important;
          background: rgba(255,255,255,0.14) !important;
        }
        @media (min-width: 640px) {
          .vp-play { width: 54px !important; height: 54px !important; }
        }

        .vp-idx {
          font-size: 9px; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.22);
          text-align: right; min-width: 40px;
        }
        @media (min-width: 400px) { .vp-idx { font-size: 10px; min-width: 88px; } }

        /* ── Below video ── */
        .vp-below {
          padding: 20px 20px 0;
        }
        @media (min-width: 640px) {
          .vp-below { padding: 28px 40px 0; }
        }

        .vp-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--ink-15), transparent);
          margin-bottom: 20px;
        }
        @media (min-width: 640px) { .vp-divider { margin-bottom: 24px; } }

        .vp-info { text-align: center; margin-bottom: 20px; }
        @media (min-width: 640px) { .vp-info { margin-bottom: 28px; } }
        .vp-info-name {
          font-size: clamp(1.2rem, 4vw, 2.2rem);
          font-weight: 300; color: var(--ink);
        }
        .vp-info-sub {
          font-size: 9px; letter-spacing: 0.25em;
          color: var(--ink-35); margin-top: 6px;
        }

        /* ── Nav pills ── */
        .vp-nav {
          display: flex; align-items: center;
          justify-content: space-between; gap: 10px;
        }
        .vp-pill {
          display: flex; align-items: center; gap: 8px;
          /* Shrink padding on mobile */
          padding: 10px 14px;
          border: 1px solid var(--ink-08);
          background: var(--cream-dark);
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s;
          color: var(--ink);
          /* Prevent pills from overflowing on small screens */
          min-width: 0;
          flex: 1;
          max-width: 46%;
        }
        @media (min-width: 640px) {
          .vp-pill { gap: 10px; padding: 11px 20px; max-width: none; flex: unset; }
        }
        .vp-pill:hover { background: #DEDAD0; border-color: var(--ink-15); }
        .vp-pill:disabled { opacity: 0.18; cursor: not-allowed; pointer-events: none; }

        .vp-pill-label {
          font-size: 7px; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--ink-35); margin-bottom: 2px;
        }
        @media (min-width: 400px) { .vp-pill-label { font-size: 8px; } }

        .vp-pill-title {
          font-size: 13px; font-weight: 300; color: var(--ink);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        @media (min-width: 640px) { .vp-pill-title { font-size: 15px; } }

        .vp-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--ink-15); flex-shrink: 0;
        }
        .mono { font-family: 'DM Mono', monospace; }
      `}</style>

      <div className="vp-page" onMouseMove={resetHide} onTouchStart={resetHide}>

        {/* top bar */}
        <div className="vp-topbar">
          <button className="vp-back" onClick={() => router.push(`/films/couple/${couple!.coupleSlug}`)}>
            <ChevronLeft size={13} /> {couple.title}
          </button>
          <div className="vp-meta">
            <h1 className="vp-couple-name">{couple.title}</h1>
            <p className="vp-category">{video.category}</p>
          </div>
        </div>

        {/* video */}
        <div ref={wrapRef} className="vp-wrap" onClick={() => { setPlaying(p => !p); resetHide(); }}>
          <video key={videoSlug} ref={videoRef} src={video.src} autoPlay playsInline loop className="vp-video" />
          <div className="vp-vig-top" />
          <div className="vp-vig-bottom" />

          <div className={`vp-controls ${ctrlVisible ? "vp-on" : "vp-off"}`} onClick={e => e.stopPropagation()}>
            <div className="vp-scrub" onClick={seekTo}>
              <div className="vp-fill" style={{ width: `${progress}%` }} />
              <div className="vp-thumb" style={{ left: `${progress}%` }} />
            </div>
            <div className="vp-row">
              <div className="vp-time mono">
                {fmtTime(currentTime)}<span className="vp-sep">/</span>{fmtTime(duration)}
              </div>
              <div className="vp-btns">
                <button className="vp-btn" onClick={() => { setMuted(m => !m); resetHide(); }}>
                  {muted ? <MuteIcon /> : <UnmuteIcon />}
                </button>
                <button className="vp-btn vp-play" onClick={() => { setPlaying(p => !p); resetHide(); }}>
                  {playing ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button className="vp-btn" onClick={toggleFS}><FullscreenIcon /></button>
              </div>
              <div className="vp-idx mono">
                {pad((videoIndex ?? 0) + 1)}&nbsp;/&nbsp;{pad(couple.videos.length)}
              </div>
            </div>
          </div>
        </div>

        {/* below video */}
        <div className="vp-below">
          <div className="vp-divider" />
          <div className="vp-info">
            <p className="vp-info-name">{couple.title}</p>
          </div>

          <div className="vp-nav">
            <button className="vp-pill" disabled={!prevVideo} onClick={() => prevVideo && navTo(prevVideo.slug)}>
              <ArrowLeft size={13} style={{ color: "var(--ink-35)", flexShrink: 0 }} />
              <div style={{ textAlign: "left", minWidth: 0 }}>
                <p className="vp-pill-label">Previous Film</p>
                <p className="vp-pill-title">{prevVideo?.category ?? "—"}</p>
              </div>
            </button>

            <div className="vp-dot" />

            <button className="vp-pill" disabled={!nextVideo} onClick={() => nextVideo && navTo(nextVideo.slug)} style={{ flexDirection: "row-reverse" }}>
              <ArrowRight size={13} style={{ color: "var(--ink-35)", flexShrink: 0 }} />
              <div style={{ textAlign: "right", minWidth: 0 }}>
                <p className="vp-pill-label">Next Film</p>
                <p className="vp-pill-title">{nextVideo?.category ?? "—"}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
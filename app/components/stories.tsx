"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import {Button} from "./button";
import Link from "next/link";

const storiesData = [
  {
    video:
      "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773635426/story1_zcczqb.mp4",
    title: "A Tender Memory of Blossoming Love",
    location: "46°33'N 11°42'N",
    des: "Vikas and Kavya wedding took place in a brightly decorated hall filled with marigolds and mango leaves. As the nadaswaram played softly, they stood facing each other, nervous smiles on their faces. When the moment came to exchange garlands, Meena shyly lifted hers, and Arjun bent slightly to make it easier. Laughter echoed as their cousins teased them. With the garlands around their necks and eyes full of promise, they stepped towards the sacred fire, beginning their life together surrounded by family and joy.",
  },
  {
    video:
      "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773635429/story2_leupwl.mp4",
    title: "An Everlasting Memory of Sacred Love",
    location: "Zürich, Switzerland",
    des: "Amit and Komal sat before the crackling homam, dressed in traditional silk attire. As the priest chanted the final mantras, Rohan tied the thaali around Anjali's neck with steady hands, his fingers trembling slightly with emotion. Their eyes met briefly - a mix of happiness, relief, and deep connection. Their families clapped softly while elders blessed them with turmeric and rice, sealing the moment with warmth. Simple yet beautiful, it was a day that marked the start of their journey as one.",
  },
];

const moreVideos = [
  "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773635427/story3_vfg06j.mp4",
  "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773635425/story4_a8cxgn.mp4",
  "https://res.cloudinary.com/degf7s9yn/video/upload/f_auto,q_auto/v1773635464/story5_u0nhkd.mp4",
];

const storyBoxes = [
  {
    label: "Our Philosophy",
    text: "At House of Bliss, we celebrate the heartfelt, the real, and the beautifully unscripted.",
  },
  {
    label: "Who We Love",
    text: "We're drawn to couples who wear their hearts on their sleeves - the dreamers, the storytellers, the ones who aren't afraid to break a few traditions.",
  },
  {
    label: "Our Art",
    text: "For us, photography isn't just about capturing events - it's about translating energy, personality, and emotion into timeless frames.",
  },
  {
    label: "Our Journey",
    text: "From quiet home ceremonies to grand celebrations across oceans, every wedding we've witnessed has been a reflection of love in its purest form.",
  },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function useParallax(strength = 20) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const progress = (centerY - viewCenter) / window.innerHeight;
        setOffset(progress * strength);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strength]);
  return { ref, offset };
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(253,249,220,0.92)">
    <polygon points="5,3 21,12 5,21" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(253,249,220,0.92)">
    <rect x="4" y="3" width="5" height="18" rx="1.5" />
    <rect x="15" y="3" width="5" height="18" rx="1.5" />
  </svg>
);

// ── Shared sub-components ─────────────────────────────────────────────────────
const MuteButton = ({
  muted,
  onToggle,
}: {
  muted: boolean;
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
    style={{
      background: "rgba(253,249,220,0.12)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid rgba(253,249,220,0.28)",
      boxShadow: "0 2px 20px rgba(0,0,0,0.25)",
    }}
    aria-label={muted ? "Unmute" : "Mute"}
  >
    {muted ? (
      <span className="flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fdf9dc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="rgba(253,249,220,0.45)" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
        <span className="text-[#fdf9dc] text-[10px] tracking-[0.2em] uppercase" style={{ opacity: 0.78 }}>Muted</span>
      </span>
    ) : (
      <span className="flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fdf9dc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="rgba(253,249,220,0.45)" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" strokeOpacity="0.45" />
        </svg>
        <span className="text-[#fdf9dc] text-[10px] tracking-[0.2em] uppercase" style={{ opacity: 0.78 }}>Sound</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#fdf9dc] animate-pulse" style={{ opacity: 0.75 }} />
      </span>
    )}
  </button>
);

// ── NEW: Play/Pause button - bottom-right, same glass style ──────────────────
const PlayPauseButton = ({
  playing,
  onToggle,
  progress,
}: {
  playing: boolean;
  onToggle: () => void;
  progress: number;
}) => {
  const size = 44;
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const strokeDash = (progress / 100) * circumference;

  return (
    <button
      onClick={onToggle}
      className="absolute bottom-4 right-4 z-20 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
      style={{ width: size, height: size, background: "none", border: "none", padding: 0, cursor: "pointer" }}
      aria-label={playing ? "Pause" : "Play"}
    >
      {/* frosted glass bg circle */}
      <span style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "rgba(253,249,220,0.12)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(253,249,220,0.28)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.25)",
      }} />
      {/* SVG progress ring */}
      <svg
        width={size} height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
      >
        {/* track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="rgba(253,249,220,0.18)"
          strokeWidth="1.5"
        />
        {/* fill */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="rgba(253,249,220,0.75)"
          strokeWidth="1.5"
          strokeDasharray={`${strokeDash} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.1s linear" }}
        />
      </svg>
      {/* icon */}
      <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </span>
    </button>
  );
};

const Overlays = () => (
  <>
    <div className="absolute inset-0 pointer-events-none z-10" style={{
      background: `linear-gradient(to bottom, rgba(20,22,16,0.42) 0%, rgba(20,22,16,0.06) 28%, rgba(20,22,16,0.06) 62%, rgba(20,22,16,0.52) 100%)`,
    }} />
    <div className="absolute inset-0 pointer-events-none z-10" style={{
      background: `radial-gradient(ellipse at center, transparent 45%, rgba(15,16,12,0.28) 100%)`,
    }} />
    <div className="absolute inset-0 z-10 pointer-events-none" style={{
      opacity: 0.045,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "150px 150px",
    }} />
  </>
);

// ── Landscape card ────────────────────────────────────────────────────────────
const LandscapeVideoCard = ({ video, title, des }: { video: string; title: string; des?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const { ref: parallaxRef, offset } = useParallax(18);

  // progress tracker
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => setProgress((vid.currentTime / vid.duration) * 100 || 0);
    vid.addEventListener("timeupdate", onTime);
    return () => vid.removeEventListener("timeupdate", onTime);
  }, []);

  // auto-hide controls
  const resetHide = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2800);
  }, []);

  useEffect(() => { resetHide(); return () => { if (hideTimer.current) clearTimeout(hideTimer.current); }; }, [resetHide]);

  const handleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
    resetHide();
  };

  const handlePlayPause = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play(); setPlaying(true); }
    else { vid.pause(); setPlaying(false); }
    resetHide();
  };

  return (
    <div className="w-full flex flex-col" onMouseMove={resetHide}>
      <div
        ref={parallaxRef}
        className="relative w-full overflow-hidden group"
        style={{ paddingBottom: "52%", height: 0 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          position: "absolute", top: "-10%", left: 0, right: 0, bottom: "-10%",
          transform: `translateY(${offset}px)`,
          transition: "transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
        }}>
          <video
            ref={videoRef}
            src={video}
            controls={false}
            muted={muted}
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ display: "block", position: "absolute", inset: 0 }}
          />
        </div>

        <Overlays />
        <MuteButton muted={muted} onToggle={handleMute} />

        {/* Play/Pause - bottom right, only shows when controls visible */}
        <div style={{ opacity: controlsVisible ? 1 : 0, transition: "opacity 0.4s ease" }}>
          <PlayPauseButton playing={playing} onToggle={handlePlayPause} progress={progress} />
        </div>

        {/* Hover description */}
        <div
          className="absolute bottom-8 left-8 z-30 pointer-events-none"
          style={{
            fontFamily: "var(--font-editorial)",
            maxWidth: "60%", minWidth: "220px",
            color: "#fff",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            willChange: "opacity, transform",
          }}
        >
          {des && (
            <span
              className="text-white text-base md:text-lg font-neue-light leading-relaxed"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)", letterSpacing: "0.02em", display: "inline-block" }}
            >
              {des}
            </span>
          )}
        </div>
      </div>

      {title && (
        <div className="font-editorial text-[#41453D] text-xl md:text-2xl mt-4">{title}</div>
      )}
    </div>
  );
};

// ── Portrait card ─────────────────────────────────────────────────────────────
const PortraitVideoCard = ({ video }: { video: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const { ref: parallaxRef, offset } = useParallax(25);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => setProgress((vid.currentTime / vid.duration) * 100 || 0);
    vid.addEventListener("timeupdate", onTime);
    return () => vid.removeEventListener("timeupdate", onTime);
  }, []);

  const resetHide = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2800);
  }, []);

  useEffect(() => { resetHide(); return () => { if (hideTimer.current) clearTimeout(hideTimer.current); }; }, [resetHide]);

  const handleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
    resetHide();
  };

  const handlePlayPause = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play(); setPlaying(true); }
    else { vid.pause(); setPlaying(false); }
    resetHide();
  };

  return (
    <div className="w-full" onMouseMove={resetHide}>
      <div
        ref={parallaxRef}
        className="relative w-full overflow-hidden"
        style={{ height: "260px" }}
      >
        <div style={{
          position: "absolute", top: "-12%", left: 0, right: 0, bottom: "-12%",
          transform: `translateY(${offset}px)`,
          transition: "transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
        }}>
          <video
            ref={videoRef}
            src={video}
            controls={false}
            muted={muted}
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ display: "block" }}
          />
        </div>

        <Overlays />
        <MuteButton muted={muted} onToggle={handleMute} />

        <div style={{ opacity: controlsVisible ? 1 : 0, transition: "opacity 0.4s ease" }}>
          <PlayPauseButton playing={playing} onToggle={handlePlayPause} progress={progress} />
        </div>
      </div>
    </div>
  );
};

// ── Story boxes ───────────────────────────────────────────────────────────────
const StoryBoxes = () => {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className="max-w-5xl mx-auto mb-16 w-full px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#41453D]/15 border border-[#41453D]/15 rounded-2xl overflow-hidden">
        {storyBoxes.map((box, i) => (
          <div
            key={i}
            className="bg-[#F4F1E5] p-8 md:p-10 flex flex-col gap-3 transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0) scale(1)" : `translateY(${60 + i * 20}px) scale(0.97)`,
              transitionDelay: inView ? `${i * 120}ms` : "0ms",
            }}
          >
            <span className="text-[10px] font-neue-medium tracking-[0.3em] uppercase text-[#41453D]/40 mb-1">
              {String(i + 1).padStart(2, "0")} / {box.label}
            </span>
            <div
              className="h-px bg-[#41453D]/20 transition-all duration-700"
              style={{
                width: inView ? "100%" : "0%",
                transitionDelay: inView ? `${i * 120 + 200}ms` : "0ms",
              }}
            />
            <p className="font-neue-light text-[#41453D] text-base md:text-lg leading-relaxed mt-2">
              {box.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main export ───────────────────────────────────────────────────────────────
const Stories = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#F4F1E5] flex flex-col items-center justify-center px-4 md:px-16 py-32">
      <h2 className="font-editorial text-[#41453D] border-b text-5xl md:text-6xl mb-12 text-center">
        TIMELESS WEDDING STORIES
      </h2>

      {/* Landscape cards */}
      <div className="w-full max-w-5xl flex flex-col gap-12 mb-16">
        {storiesData.map((story, idx) => (
          <LandscapeVideoCard key={idx} video={story.video} title={story.title} des={story.des} />
        ))}
      </div>

      <Link href="/blogs">
        <Button variant="outline" className="border border-[#41453D] bg-transparent text-[#41453D] font-neue-medium px-6 py-2 mb-16 hover:bg-[#eae6c7] transition">
          Explore more
        </Button>
      </Link>

      <StoryBoxes />

      {/* Portrait cards */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
        {moreVideos.map((video, idx) => (
          <PortraitVideoCard key={idx} video={video} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1140 130" className="w-full h-[120px]" preserveAspectRatio="none">
          <path
            d="M0,120 C200,160 350,40 520,80 C700,120 900,30 1100,70 C1250,100 1350,70 1440,90 L1440,180 L0,180 Z"
            fill="#F4F1E5"
            
          />
        </svg>
      </div>
    </section>
  );
};

export default Stories;
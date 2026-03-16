"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";

// ─── Video data (10 films) ────────────────────────────────────────────────────
const VIDEOS = [
  {
    id: "v1",
    coords: ["46°52′N", "11°01′E"],
    location: "Hochgurgl, Austria",
    title: "Deep inside the glacier - an adventurous elopement in Austria",
    src: "https://res.cloudinary.com/degf7s9yn/video/upload/v1773634860/vid1_1_wfvsmn.mp4",
    poster: "",
  },
  {
    id: "v2",
    coords: ["46°28′N", "11°39′E"],
    location: "South Tyrol, Italy",
    title: "Volcano wedding - an intimate ceremony at dawn",
    src: "https://res.cloudinary.com/degf7s9yn/video/upload/v1773634431/vid2_y5rih8.mp4",
    poster: "",
  },
  {
    id: "v3",
    coords: ["62°7′N", "7°26′W"],
    location: "Faroe Islands",
    title: "Wind, rain, and vows - a Faroe Islands elopement",
    src: "https://res.cloudinary.com/degf7s9yn/video/upload/v1773634434/vid3_rsub5b.mp4",
    poster: "",
  },
  {
    id: "v4",
    coords: ["51°21′N", "4°49′E"],
    location: "Antwerp, Belgium",
    title: "Candlelit chapel - Nick & Jeroen in Antwerp",
    src: "https://res.cloudinary.com/degf7s9yn/video/upload/v1773634854/vid4_1_y8vlhe.mp4",
    poster: "",
  },
  {
    id: "v5",
    coords: ["47°17′N", "12°9′E"],
    location: "Austrian Alps",
    title: "A snowboard elopement - Jens & Margot",
    src: "https://res.cloudinary.com/degf7s9yn/video/upload/v1773634457/vid5_rb5lqz.mp4",
    poster: "",
  },
  {
    id: "v6",
    coords: ["56°13′N", "4°51′W"],
    location: "Loch Lomond, Scotland",
    title: "Scottish highland ceremony - Barbara & Stoffel",
    src: "https://res.cloudinary.com/degf7s9yn/video/upload/v1773634432/vid6_azxq5q.mp4",
    poster: "",
  },
  {
    id: "v7",
    coords: ["46°49′N", "9°17′E"],
    location: "Graubünden, Switzerland",
    title: "Alpine micro-wedding - Manou & Andries",
    src: "https://res.cloudinary.com/degf7s9yn/video/upload/v1773634440/vid7_sdki7f.mp4",
    poster: "",
  },
  {
    id: "v8",
    coords: ["38°41′N", "7°40′W"],
    location: "Alentejo, Portugal",
    title: "Golden hour dinner - Tinneke & Steven in Portugal",
    src: "https://res.cloudinary.com/degf7s9yn/video/upload/v1773634835/vid8_1_j4ukst.mp4",
    poster: "",
  },
  {
    id: "v9",
    coords: ["50°55′N", "1°42′E"],
    location: "Cap Blanc-Nez, France",
    title: "Warehouse love - Brecht & Lisa engagement",
    src: "https://res.cloudinary.com/degf7s9yn/video/upload/v1773634437/vid9_inkvye.mp4",
    poster: "",
  },
  {
    id: "v10",
    coords: ["46°33′N", "11°42′E"],
    location: "Dolomiti, Italy",
    title: "Helicopter elopement - high above the Dolomites",
    src: "https://res.cloudinary.com/degf7s9yn/video/upload/v1773634419/vid10_hpf6e3.mp4",
    poster: "",
  },
];

// ─── Image data ───────────────────────────────────────────────────────────────
const STORIES = [
  { id: 1,  coords: ["46°52′N", "11°01′E"], location: "Hochgurgl, Austria",       title: "Deep inside the glacier - an adventurous elopement in Austria",           img: "/portfolio/img1.jpg" },
  { id: 2,  coords: ["46°28′N", "11°39′E"], location: "",                          title: "The cost of a wedding vs an elopement - what you need to know",           img: "/portfolio/vert1.jpg" },
  { id: 3,  coords: ["51°21′N", "4°49′E"],  location: "Antwerp, Belgium",          title: "Why I no longer photograph church weddings",                              img: "/portfolio/img3.jpg" },
  { id: 4,  coords: ["62°7′N",  "7°26′W"],  location: "Faroe Islands",             title: "What is an elopement? (And why you might want one)",                      img: "/portfolio/vert2.jpg" },
  { id: 5,  coords: ["47°17′N", "12°9′E"],  location: "Austrian Alps",             title: "How to tell your family you're eloping - without the drama",              img: "/portfolio/img5.jpg" },
  { id: 6,  coords: ["56°13′N", "4°51′W"],  location: "Scotland",                  title: "10 tips for your wedding day no one else will tell you",                  img: "/portfolio/vert3.jpg" },
  { id: 7,  coords: ["46°49′N", "9°17′E"],  location: "Graubünden, Switzerland",   title: "10 epic & adventurous places to elope in Europe",                        img: "/portfolio/img7.jpg" },
  { id: 8,  coords: ["38°41′N", "7°40′W"],  location: "Alentejo, Portugal",        title: "6 reasons to have a destination wedding",                                img: "/portfolio/vert4.jpeg" },
  { id: 9,  coords: ["50°55′N", "1°42′E"],  location: "Cap Blanc-Nez, France",     title: "Why an engagement shoot is always a good idea",                          img: "/portfolio/img9.jpg" },
  { id: 10, coords: ["46°33′N", "11°42′E"], location: "Dolomiti, Italy",           title: "Intimate helicopter elopement in the Italian Dolomites",                 img: "/portfolio/vert5.jpg" },
  { id: 11, coords: ["39°9′N",  "9°23′E"],  location: "Sardegna, Italy",           title: "Sardinia Wedding Weekend - when the wedding planner gets married",        img: "/portfolio/img11.jpg" },
  { id: 12, coords: ["47°22′N", "8°33′E"],  location: "Zürich, Switzerland",       title: "From city hall to alpine adventure: Zürich civil wedding",               img: "/portfolio/vert6.jpeg" },
  { id: 13, coords: ["39°9′N",  "9°23′E"],  location: "Sardegna, Italy",           title: "Sardinia Wedding Weekend - when the wedding planner gets married",        img: "/portfolio/img12.jpg" },
  { id: 14, coords: ["47°22′N", "8°33′E"],  location: "Zürich, Switzerland",       title: "From city hall to alpine adventure: Zürich civil wedding",               img: "/portfolio/vert7.jpeg" },
  { id: 15, coords: ["39°9′N",  "9°23′E"],  location: "Sardegna, Italy",           title: "Sardinia Wedding Weekend - when the wedding planner gets married",        img: "/portfolio/img13.jpg" },
  { id: 16, coords: ["47°22′N", "8°33′E"],  location: "Zürich, Switzerland",       title: "From city hall to alpine adventure: Zürich civil wedding",               img: "/portfolio/vert8.jpg" },
  { id: 17, coords: ["39°9′N",  "9°23′E"],  location: "Sardegna, Italy",           title: "Sardinia Wedding Weekend - when the wedding planner gets married",        img: "/portfolio/img14.jpg" },
  { id: 18, coords: ["47°22′N", "8°33′E"],  location: "Zürich, Switzerland",       title: "From city hall to alpine adventure: Zürich civil wedding",               img: "/portfolio/vert9.jpeg" },
  { id: 19, coords: ["39°9′N",  "9°23′E"],  location: "Sardegna, Italy",           title: "Sardinia Wedding Weekend - when the wedding planner gets married",        img: "/portfolio/img15.jpg" },
  { id: 20, coords: ["47°22′N", "8°33′E"],  location: "Zürich, Switzerland",       title: "From city hall to alpine adventure: Zürich civil wedding",               img: "/portfolio/vert10.jpeg" },
  { id: 21, coords: ["39°9′N",  "9°23′E"],  location: "Sardegna, Italy",           title: "Sardinia Wedding Weekend - when the wedding planner gets married",        img: "/portfolio/img16.jpeg" },
  { id: 22, coords: ["47°22′N", "8°33′E"],  location: "Zürich, Switzerland",       title: "From city hall to alpine adventure: Zürich civil wedding",               img: "/portfolio/vert11.jpg" },
  { id: 23, coords: ["39°9′N",  "9°23′E"],  location: "Sardegna, Italy",           title: "Sardinia Wedding Weekend - when the wedding planner gets married",        img: "/portfolio/img17.jpg" },
  { id: 24, coords: ["47°22′N", "8°33′E"],  location: "Zürich, Switzerland",       title: "From city hall to alpine adventure: Zürich civil wedding",               img: "/portfolio/vert12.jpg" },
  { id: 25, coords: ["39°9′N",  "9°23′E"],  location: "Sardegna, Italy",           title: "Sardinia Wedding Weekend - when the wedding planner gets married",        img: "/portfolio/img18.jpg" },
  { id: 26, coords: ["47°22′N", "8°33′E"],  location: "Zürich, Switzerland",       title: "From city hall to alpine adventure: Zürich civil wedding",               img: "/portfolio/vert13.jpg" },
  { id: 27, coords: ["39°9′N",  "9°23′E"],  location: "Sardegna, Italy",           title: "Sardinia Wedding Weekend - when the wedding planner gets married",        img: "/portfolio/img19.jpg" },
  { id: 28, coords: ["47°22′N", "8°33′E"],  location: "Zürich, Switzerland",       title: "From city hall to alpine adventure: Zürich civil wedding",               img: "/portfolio/vert14.jpg" },
  { id: 29, coords: ["39°9′N",  "9°23′E"],  location: "Sardegna, Italy",           title: "Sardinia Wedding Weekend - when the wedding planner gets married",        img: "/portfolio/img20.jpg" },
  { id: 30, coords: ["47°22′N", "8°33′E"],  location: "Zürich, Switzerland",       title: "From city hall to alpine adventure: Zürich civil wedding",               img: "/portfolio/vert14.jpg" },
];

// ─── Scroll hook ──────────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function IconPlay() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <path d="M1 1.5L13 8L1 14.5V1.5Z" fill="currentColor" />
    </svg>
  );
}
function IconPause() {
  return (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
      <rect x="0" y="0" width="4" height="16" rx="1.5" fill="currentColor" />
      <rect x="8" y="0" width="4" height="16" rx="1.5" fill="currentColor" />
    </svg>
  );
}
function IconMute() {
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
      <path d="M1 5H4L9 1V15L4 11H1V5Z" fill="currentColor" />
      <line x1="13" y1="4" x2="17" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="4" x2="13" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconUnmute() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
      <path d="M1 5H4L9 1V15L4 11H1V5Z" fill="currentColor" />
      <path d="M12 5.5C13.2 6.5 14 7.7 14 8.5C14 9.3 13.2 10.5 12 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 3C17.2 4.8 18.5 6.6 18.5 8.5C18.5 10.4 17.2 12.2 15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({ video, large }: { video: (typeof VIDEOS)[0]; large: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "block", color: "inherit" }}
    >
      <div style={{ position: "relative", overflow: "hidden", width: "100%", background: "#111" }}>
        <div style={{ position: "absolute", top: 12, right: 14, zIndex: 3, fontFamily: "var(--font-neue-light, monospace)", fontSize: 10, letterSpacing: "0.04em", color: "#fff", lineHeight: 1.5, textAlign: "right", textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}>
          {video.coords.map((c, i) => <div key={i}>{''}</div>)}
        </div>
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted loop playsInline
          style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: large ? "16/10" : "9/14" }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.15)", zIndex: 4 }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "rgba(255,255,255,0.9)", transition: "width 0.2s linear" }} />
        </div>
        <div style={{ position: "absolute", bottom: 14, left: 14, zIndex: 4, display: "flex", alignItems: "center", gap: 10, opacity: hovered || playing ? 1 : 0, transition: "opacity 0.3s ease" }}>
          {[{ fn: togglePlay, icon: playing ? <IconPause /> : <IconPlay /> }, { fn: toggleMute, icon: muted ? <IconMute /> : <IconUnmute /> }].map((btn, i) => (
            <button key={i} onClick={btn.fn} style={{ width: 34, height: 34, border: "1px solid rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderRadius: "50%", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", outline: "none", transition: "background 0.2s ease, border-color 0.2s ease" }}>{btn.icon}</button>
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center", opacity: !playing && !hovered ? 1 : 0, transition: "opacity 0.35s ease", pointerEvents: "none" }}>
          <div style={{ width: 52, height: 52, border: "1.5px solid rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(6px)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <IconPlay />
          </div>
        </div>
      </div>
      <div style={{ paddingTop: 12 }}>
        {video.location && (
          <p style={{ margin: "0 0 5px", fontFamily: "var(--font-neue-light, sans-serif)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(30,30,26,0.45)" }}>{''}</p>
        )}
        <p style={{ margin: 0, fontFamily: "var(--font-editorial, serif)", fontWeight: 300, fontSize: large ? 18 : 14, lineHeight: 1.35, color: "#1e1e1a", letterSpacing: "-0.01em" }}>{''}</p>
      </div>
    </div>
  );
}

// ─── Image Story Card ─────────────────────────────────────────────────────────
function StoryCard({ story, large }: { story: (typeof STORIES)[0]; large: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="#" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
      <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
        <div style={{ position: "absolute", top: 12, right: 14, zIndex: 2, fontFamily: "var(--font-neue-light, monospace)", fontSize: 10, letterSpacing: "0.04em", color: "#fff", lineHeight: 1.5, textAlign: "right", textShadow: "0 1px 6px rgba(0,0,0,0.55)" }}>
          {story.coords.map((c, i) => <div key={i}>{''}</div>)}
        </div>
        <img
          src={story.img}
          alt={story.title}
          style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: large ? "3/2" : "2/3", transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 0.75s cubic-bezier(.25,.46,.45,.94)" }}
        />
      </div>
      <div style={{ paddingTop: 15 }}>
        {story.location && (
          <p style={{ margin: "0 0 5px", fontFamily: "var(--font-neue-light, sans-serif)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(30,30,26,0.45)" }}>{""}
          </p>
        )}
        <p style={{ margin: 0, fontFamily: "var(--font-editorial, serif)", fontWeight: 300, fontSize: large ? 18 : 14, lineHeight: 1.35, color: "#1e1e1a", letterSpacing: "-0.01em" }}>{""}
        </p>
      </div>
    </a>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ padding: "18vh 7% 7vh", display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ flex: 1, height: 1, background: "rgba(30,30,26,0.13)" }} />
      <span style={{ fontFamily: "var(--font-neue-light, sans-serif)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(30,30,26,0.4)", whiteSpace: "nowrap" }}>{""}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(30,30,26,0.13)" }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StoriesPage() {
  const scrollY = useScrollY();
  const [filter, setFilter] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const videoPairs: [(typeof VIDEOS)[0], (typeof VIDEOS)[0] | null][] = [];
  for (let i = 0; i < VIDEOS.length; i += 2) {
    videoPairs.push([VIDEOS[i], VIDEOS[i + 1] ?? null]);
  }

  const storyPairs: [(typeof STORIES)[0], (typeof STORIES)[0] | null][] = [];
  for (let i = 0; i < STORIES.length; i += 2) {
    storyPairs.push([STORIES[i], STORIES[i + 1] ?? null]);
  }

  const rightPushes = [130, 100, 150, 90, 120];

  return (
    <>
      <style>{`
        /* ── Hero header ── */
        .portfolio-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 60px;
          padding: 68px 7% 52px;
          border-bottom: 1px solid rgba(30,30,26,0.13);
          align-items: start;
        }

        /* ── Zigzag grid (desktop) ── */
        .portfolio-row {
          display: grid;
          grid-template-columns: 38% 52%;
          column-gap: 10%;
          margin-bottom: 9vh;
          align-items: start;
        }

        /* ── Mobile overrides ── */
        @media (max-width: 768px) {
          .portfolio-header {
            grid-template-columns: 1fr;
            gap: 24px 0;
            padding: 40px 5% 36px;
          }

          /* Stack rows into single column, remove parallax push */
          .portfolio-row {
            grid-template-columns: 1fr;
            column-gap: 0;
            margin-bottom: 40px;
          }

          /* Reset all inline parallax transforms on mobile children */
          .portfolio-row .row-left,
          .portfolio-row .row-right {
            transform: none !important;
            padding-top: 0 !important;
            margin-bottom: 32px;
          }

          /* Last portrait card fix - remove any stray margin */
          .portrait-left-card {
            margin-bottom: 0 !important;
          }
        }
      `}</style>

      <Navbar theme="dark" />
      <div className="pt-32" style={{ background: "#fefee8", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ── Header ── */}
        <div className="portfolio-header">
          <h1
            style={{
              fontFamily: "var(--font-editorial, serif)",
              fontWeight: 300,
              fontSize: "clamp(42px, 9vw, 120px)",
              color: "#1e1e1a",
              margin: 0,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              transform: isMobile ? "none" : `translateY(${-scrollY * 0.1}px)`,
              transition: "transform 0.05s linear",
            }}
          >
            Our Portfolio
          </h1>

          <div style={{ paddingTop: 6 }}>
            <p style={{ fontFamily: "var(--font-neue-regular, sans-serif)", fontSize: 13, lineHeight: 1.78, color: "#3a3a35", margin: "0 0 14px", maxWidth: 390 }}>
              <strong style={{ fontFamily: "var(--font-neue-medium, sans-serif)" }}>Some might call this a portfolio.</strong>{" "}
              We call it a collection of stories - moments captured through our lens, where emotions, celebrations, and once-in-a-lifetime memories come to life through photographs and cinematic wedding films.
            </p>
            <p style={{ fontFamily: "var(--font-neue-light, sans-serif)", fontSize: 13, lineHeight: 1.78, color: "#3a3a35", margin: "0 0 26px", maxWidth: 390 }}>
              Explore the films, browse the photographs, and experience weddings through our perspective - where every detail, every smile, and every moment is captured with intention.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["all", "Wedding Films", "Photo Stories", "Couple Shoots"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    border: "1px solid rgba(30,30,26,0.35)",
                    background: filter === f ? "#1e1e1a" : "transparent",
                    color: filter === f ? "#fefee8" : "#1e1e1a",
                    fontFamily: "var(--font-neue-regular, sans-serif)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    padding: "6px 16px",
                    cursor: "pointer",
                    transition: "all 0.22s ease",
                    outline: "none",
                    textTransform: "capitalize",
                  }}
                >
                  {f === "all" ? "- Any -" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Video rows ── */}
        <div style={{ padding: "0 7%" }}>
          {videoPairs.map(([left, right], rowIndex) => {
            const rightPush = rightPushes[rowIndex % rightPushes.length];
            const leftSpeed = 0.018 + (rowIndex % 3) * 0.007;
            const rightSpeed = 0.012 + (rowIndex % 4) * 0.005;
            return (
              <div key={rowIndex} className="portfolio-row" style={{ paddingTop: rowIndex === 0 ? (isMobile ? "4vh" : 0) : 0 }}>
                <div
                  className="row-left"
                  style={isMobile ? {} : { transform: `translateY(${-scrollY * leftSpeed}px)`, transition: "transform 0.05s linear" }}
                >
                  <VideoCard video={left} large={false} />
                </div>
                {right && (
                  <div
                    className="row-right"
                    style={isMobile ? {} : { paddingTop: rightPush, transform: `translateY(${-scrollY * rightSpeed}px)`, transition: "transform 0.05s linear" }}
                  >
                    <VideoCard video={right} large={true} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Images section divider ── */}
        <SectionDivider label="photographs - stories in still light" />

        {/* ── Image rows ── */}
        <div style={{ padding: "0 7%" }}>
          {storyPairs.map(([left, right], rowIndex) => {
            const rightPush = rightPushes[rowIndex % rightPushes.length];
            const leftSpeed = 0.018 + (rowIndex % 3) * 0.007;
            const rightSpeed = 0.012 + (rowIndex % 4) * 0.005;
            const isLastRow = rowIndex === storyPairs.length - 1;
            return (
              <div
                key={rowIndex}
                className="portfolio-row"
                style={{ paddingTop: rowIndex === 0 ? "4vh" : 0 }}
              >
                <div
                  className={`row-left${isLastRow ? " portrait-left-card" : ""}`}
                  style={isMobile ? {} : { transform: `translateY(${-scrollY * leftSpeed}px)`, transition: "transform 0.05s linear" }}
                >
                  <StoryCard story={left} large={false} />
                </div>
                {right && (
                  <div
                    className="row-right"
                    style={isMobile ? {} : { paddingTop: rightPush, transform: `translateY(${-scrollY * rightSpeed}px)`, transition: "transform 0.05s linear" }}
                  >
                    <StoryCard story={right} large={true} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ height: "10vh" }} />
      </div>
    </>
  );
}
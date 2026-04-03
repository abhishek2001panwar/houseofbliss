// Magical.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

// Row 1 — img2 and img4 replaced by videos; img1, img3, img5 remain
const topImages = {
  img1: "/mag/img1.png",
  img3: "/mag/img3.png",
  img5: "/couple5/img8.png",
}

// Row 1 landscape videos (replace img2 & img4)
const topVideos = {
  vid1: "https://hsrtiles.in/wp-content/uploads/2026/04/N_P_WEDDING_TEASER_1_w2tcan-1.webm", // was img2
  vid2: "https://hsrtiles.in/wp-content/uploads/2026/04/S_S_WED_TEASER_4K_ddkmuw-1.webm", // was img4
}

// Row 2 — original middleImages; TextCard replaced by video
const middleImages = [
  "/couple2/img1.png",  // col 1
  "/mag/img7.png",      // col 2
  "/couple6/img8.png",  // col 4
  "/couple7/img9.png",  // col 5
]

// Row 2 landscape video (replaces TextCard at col 3)
const middleVideo = "https://hsrtiles.in/wp-content/uploads/2026/04/K_P_RECEPTION_TEASER_oqig1z-1.mov"

// https://res.cloudinary.com/dxcoo0eza/video/upload/v1774332593/D_S_WEDDING_TEASER_1_1_ipnrf7_fe2izr.webm
// Row 3 — unchanged
const bottomImages = [
  "/gallery/img8.png",
  "/gallery/img9.png",
  
  
  "/gallery/img11.png",
]

// ── Intersection hook ─────────────────────────────────────────────────────────
function useReveal(threshold = 0.07) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Portrait image cell (4/5) ─────────────────────────────────────────────────
function GridImage({ src, alt, delay = 0 }: { src: string; alt: string; delay?: number }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className="overflow-hidden w-full" style={{ aspectRatio: '4/5', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        clipPath: visible ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
        transition: `clip-path 0.9s cubic-bezier(0.76,0,0.24,1) ${delay}ms`,
        willChange: 'clip-path',
      }}>
        <img src={src} alt={alt} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transform: visible ? 'scale(1)' : 'scale(1.08)',
          transition: `transform 1.4s cubic-bezier(0.76,0,0.3,4) ${delay}ms`,
          willChange: 'transform',
        }} className="hover:scale-105 transition-transform duration-4000 ease-in" />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: '#E8E4D8', zIndex: -1 }} />
    </div>
  )
}

// ── Landscape video cell ───────────────────────────────────────────────────────
// stretch=true  → no fixed aspect-ratio; height fills the grid row (used when
//                 sitting next to portrait images so heights align via CSS grid)
// stretch=false → enforces 16/9 aspect-ratio (used standalone / mobile)
function GridVideo({ src, delay = 0, stretch = false }: { src: string; delay?: number; stretch?: boolean }) {
  const { ref, visible } = useReveal()
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (visible && videoRef.current) videoRef.current.play().catch(() => {})
  }, [visible])
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
      ref={ref}
      className="overflow-hidden w-full"
      style={{
        aspectRatio: stretch ? undefined : '16/9',
        position: 'relative',
        height: stretch ? '100%' : undefined,
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        clipPath: visible ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
        transition: `clip-path 0.9s cubic-bezier(0.76,0,0.24,1) ${delay}ms`,
        willChange: 'clip-path',
      }}>
        <video ref={videoRef} src={src} muted  playsInline preload="metadata" style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transform: visible ? 'scale(1)' : 'scale(1.08)',
          transition: `transform 1.4s cubic-bezier(0.76,0,0.3,4) ${delay}ms`,
          willChange: 'transform',
        }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: '#E8E4D8', zIndex: -1 }} />
    </div>
  )
}

// ── Row wrapper ───────────────────────────────────────────────────────────────
function AnimatedRow({ children, className, style }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties
}) {
  return <div className={className} style={style}>{children}</div>
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Magical() {
  const S = 80 // stagger ms

  return (
    <section className="w-full bg-[#F4F1E5] overflow-hidden">

      {/* ════════ DESKTOP (md+) ════════ */}

      {/*
        ROW 1 — was: [img1 | img2 | img3 | img4 | img5]  (5 × 1fr)
                now: [img1 | VIDEO | img3 | VIDEO | img5]

        Portrait cells are 4/5 ratio → they set the row height.
        Video cells get 2fr so they are wide enough to look good landscape.
        Grid: 1fr 2fr 1fr 2fr 1fr  (total 7fr)
        items-stretch so videos fill the full portrait row height.
      */}
      <AnimatedRow
        className="hidden md:grid gap-px px-1 pt-1 items-stretch"
        style={{ gridTemplateColumns: '1fr 2fr 1fr 2fr 1fr' }}
      >
        <GridImage src={topImages.img1} alt="Wedding moment 1" delay={0 * S} />
        <GridVideo  src={topVideos.vid1}  delay={1 * S} stretch />
        <GridImage src={topImages.img3} alt="Wedding moment 3" delay={2 * S} />
        <GridVideo  src={topVideos.vid2}  delay={3 * S} stretch />
        <GridImage src={topImages.img5} alt="Wedding moment 5" delay={4 * S} />
      </AnimatedRow>

      {/*
        ROW 2 — was: [img | img | TextCard | img | img]  (5 × 1fr)
                now: [img | img | VIDEO     | img | img]

        Centre video gets 2fr for landscape width; flanking images stay 1fr.
        Grid: 1fr 1fr 2fr 1fr 1fr  (total 6fr)
      */}
      <AnimatedRow
        className="hidden md:grid gap-px px-1 py-1 items-stretch"
        style={{ gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr' }}
      >
        <GridImage src={middleImages[0]} alt="Wedding moment 6"  delay={0 * S} />
        <GridImage src={middleImages[1]} alt="Wedding moment 7"  delay={1 * S} />
        <GridVideo  src={middleVideo}     delay={2 * S} stretch />
        <GridImage src={middleImages[2]} alt="Wedding moment 8"  delay={3 * S} />
        <GridImage src={middleImages[3]} alt="Wedding moment 9"  delay={4 * S} />
      </AnimatedRow>

      {/* ROW 3 — unchanged */}
      {/* ROW 3 — col1, col2: images | col3+4: video (2fr) | col5: image */}
<AnimatedRow
  className="hidden md:grid gap-px px-1 pb-px items-stretch"
  style={{ gridTemplateColumns: '1fr 1fr 2fr 1fr' }}
>
  <GridImage src={bottomImages[0]} alt="Wedding moment 10" delay={0 * S} />
  <GridImage src={bottomImages[1]} alt="Wedding moment 11" delay={1 * S} />
  <GridVideo
    src="https://hsrtiles.in/wp-content/uploads/2026/04/D_S_WEDDING_TEASER_1_1_ipnrf7_fe2izr.webm"
    delay={2 * S}
    stretch
  />
  <GridImage src={bottomImages[2]} alt="Wedding moment 12" delay={3 * S} />
</AnimatedRow>
      {/* ROW 3 — unchanged */}




      {/* ════════ MOBILE (< md) ════════ */}

      {/* Mobile R1: img1 | vid1 (landscape, 2× wide) */}
      <AnimatedRow
        className="grid md:hidden gap-1 px-1 pt-1 items-stretch"
        style={{ gridTemplateColumns: '1fr 2fr' }}
      >
        <GridImage src={topImages.img1} alt="Wedding moment 1" delay={0} />
        <GridVideo  src={topVideos.vid1}  delay={1 * S} stretch />
      </AnimatedRow>

      {/* Mobile R2: img3 | vid2 (landscape, 2× wide) */}
      <AnimatedRow
        className="grid md:hidden gap-1 px-1 pt-1 items-stretch"
        style={{ gridTemplateColumns: '1fr 2fr' }}
      >
        <GridImage src={topImages.img3} alt="Wedding moment 3" delay={0} />
        <GridVideo  src={topVideos.vid2}  delay={1 * S} stretch />
      </AnimatedRow>

      {/* Mobile R3: img5, middleImg1, img7 */}
      <AnimatedRow className="grid md:hidden grid-cols-3 gap-1 px-1 pt-1">
        <GridImage src={topImages.img5}  alt="Wedding moment 5" delay={0 * S} />
        <GridImage src={middleImages[0]} alt="Wedding moment 6" delay={1 * S} />
        <GridImage src={middleImages[1]} alt="Wedding moment 7" delay={2 * S} />
      </AnimatedRow>

      {/* Mobile R4: middle video full width (16/9) */}
      <AnimatedRow className="grid md:hidden grid-cols-1 px-1 pt-1">
        <GridVideo src={middleVideo} delay={0} />
      </AnimatedRow>

      {/* Mobile R5: img8, img9, bottomImg1 */}
      <AnimatedRow className="grid md:hidden grid-cols-3 gap-1 px-1 pt-1">
        <GridImage src={middleImages[2]} alt="Wedding moment 8"  delay={0 * S} />
        <GridImage src={middleImages[3]} alt="Wedding moment 9"  delay={1 * S} />
        <GridImage src={bottomImages[0]} alt="Wedding moment 10" delay={2 * S} />
      </AnimatedRow>

      {/* Mobile R6: bottomImg2, bottomImg3, bottomImg4 */}
      <AnimatedRow className="grid md:hidden grid-cols-3 gap-1 px-1 pt-1">
        {bottomImages.slice(1, 4).map((src, i) => (
          <GridImage key={`m-bot2-${i}`} src={src} alt={`Wedding moment ${i + 11}`} delay={i * S} />
        ))}
      </AnimatedRow>

      {/* Mobile R7: bottomImg5 */}
      <AnimatedRow className="grid md:hidden grid-cols-3 gap-1 px-1 py-1">
        <GridImage src={bottomImages[4]} alt="Wedding moment 14" delay={0} />
      </AnimatedRow>

    </section>
  )
}
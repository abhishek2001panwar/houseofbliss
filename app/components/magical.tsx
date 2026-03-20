// Magical.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

const topImages = [
  "/mag/img1.png",
  "/mag/img2.png",
  "/mag/img3.png",
  "/mag/img4.png",
  "/mag/img5.png",
];

const middleImages = [
  "/couple2/img1.png",
  "/mag/img7.png",
  "/couple6/img8.png",
  "/couple7/img9.png",
];

const bottomImages = [
  "/couple7/img2.png",
  "/mag/img11.png",
  "/couple4/img4.png",
  "/couple5/img8.png",
  "/couple1/img9.png",
];

// ── Intersection hook — fires once when element enters viewport ──────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, visible }
}

// ── Single animated image cell ────────────────────────────────────────────────
// Animation: image revealed by a clip-path wipe (curtain rises from bottom)
// Each cell gets a delay based on its column index for a staggered wave effect.
function GridImage({
  src,
  alt,
  delay = 0,
}: {
  src: string
  alt: string
  delay?: number
}) {
  const { ref, visible } = useReveal(0.05)

  return (
    <div
      ref={ref}
      className="overflow-hidden w-full"
      style={{ aspectRatio: '4/5', position: 'relative' }}
    >
      {/* The clip-path container — clips from bottom to top */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: visible
            ? 'inset(0% 0% 0% 0%)'
            : 'inset(0% 0% 100% 0%)',
          transition: `clip-path 0.9s cubic-bezier(0.76, 0, 0.24, 1) ${delay}ms`,
          willChange: 'clip-path',
        }}
      >
        {/* Image scales in slightly as the curtain opens */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: visible ? 'scale(1)' : 'scale(1.08)',
            transition: `transform 1.4s cubic-bezier(0.76, 0, 0.3, 4) ${delay}ms`,
            willChange: 'transform',
          }}
          className="hover:scale-105 transition-transform duration-4000 ease-in"
        />
      </div>

      {/* Background placeholder so layout doesn't jump */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#E8E4D8',
          zIndex: -1,
        }}
      />
    </div>
  )
}

// ── Text card — fades + rises in ─────────────────────────────────────────────
function TextCard({ mobile, delay = 0 }: { mobile?: boolean; delay?: number }) {
  const { ref, visible } = useReveal(0.05)

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center bg-white"
      style={{
        aspectRatio: '4/5',
        gap: mobile ? '6px' : '12px',
        padding: mobile ? '8px' : '16px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(24px)',
        transition: `opacity 0.85s ease ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <span
        style={{
          fontSize: mobile ? '0.46rem' : '0.62rem',
          letterSpacing: '0.25em',
          color: '#41453D',
          opacity: 0.4,
          textTransform: 'uppercase' as const,
          textAlign: 'center' as const,
        }}
      >
        some of the most
      </span>
      <span
        className="font-editorial text-center leading-none"
        style={{
          fontSize: mobile ? 'clamp(1rem, 5vw, 1.5rem)' : 'clamp(1.8rem, 3.5vw, 3.6rem)',
          color: '#41453D',
          letterSpacing: '-0.02em',
          fontStyle: 'italic',
        }}
      >
        "Magical"
      </span>
      <span
        style={{
          fontSize: mobile ? '0.46rem' : '0.62rem',
          letterSpacing: '0.2em',
          color: '#41453D',
          opacity: 0.4,
          textTransform: 'lowercase' as const,
          textAlign: 'center' as const,
        }}
      >
        wedding moments
      </span>
    </div>
  )
}

// ── Row wrapper — triggers when the row enters view ──────────────────────────
// Each image in the row gets a staggered delay (0, 80, 160, 240, 320ms)
function AnimatedRow({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Magical() {
  const STAGGER = 80 // ms between each cell in a row

  return (
    <section className="w-full bg-[#F4F1E5] overflow-hidden">

      {/* ─── DESKTOP (md+) ─── */}

      {/* Row 1 */}
      <AnimatedRow className="hidden md:grid grid-cols-5 gap-px px-1 pt-1">
        {topImages.map((src, i) => (
          <GridImage key={`d-top-${i}`} src={src} alt={`Wedding moment ${i + 1}`} delay={i * STAGGER} />
        ))}
      </AnimatedRow>

      {/* Row 2 */}
      <AnimatedRow className="hidden md:grid grid-cols-5 gap-px px-1 py-1">
        <GridImage src={middleImages[0]} alt="Wedding moment 6" delay={0 * STAGGER} />
        <GridImage src={middleImages[1]} alt="Wedding moment 7" delay={1 * STAGGER} />
        <TextCard delay={2 * STAGGER} />
        <GridImage src={middleImages[2]} alt="Wedding moment 8" delay={3 * STAGGER} />
        <GridImage src={middleImages[3]} alt="Wedding moment 9" delay={4 * STAGGER} />
      </AnimatedRow>

      {/* Row 3 */}
      <AnimatedRow className="hidden md:grid grid-cols-5 gap-px px-1 pb-px">
        {bottomImages.map((src, i) => (
          <GridImage key={`d-bot-${i}`} src={src} alt={`Wedding moment ${i + 10}`} delay={i * STAGGER} />
        ))}
      </AnimatedRow>

      {/* ─── MOBILE (< md) ─── */}

      {/* Mobile Row 1 */}
      <AnimatedRow className="grid md:hidden grid-cols-3 gap-1 px-1 pt-1">
        {topImages.slice(0, 3).map((src, i) => (
          <GridImage key={`m-top1-${i}`} src={src} alt={`Wedding moment ${i + 1}`} delay={i * STAGGER} />
        ))}
      </AnimatedRow>

      {/* Mobile Row 2 */}
      <AnimatedRow className="grid md:hidden grid-cols-3 gap-1 px-1 pt-1">
        {topImages.slice(3).map((src, i) => (
          <GridImage key={`m-top2-${i}`} src={src} alt={`Wedding moment ${i + 4}`} delay={i * STAGGER} />
        ))}
        <GridImage src={middleImages[0]} alt="Wedding moment 6" delay={2 * STAGGER} />
      </AnimatedRow>

      {/* Mobile Row 3 */}
      <AnimatedRow className="grid md:hidden grid-cols-3 gap-1 px-1 py-1">
        <GridImage src={middleImages[1]} alt="Wedding moment 7" delay={0 * STAGGER} />
        <TextCard mobile delay={1 * STAGGER} />
        <GridImage src={middleImages[2]} alt="Wedding moment 8" delay={2 * STAGGER} />
      </AnimatedRow>

      {/* Mobile Row 4 */}
      <AnimatedRow className="grid md:hidden grid-cols-3 gap-1 px-1">
        <GridImage src={middleImages[3]} alt="Wedding moment 9" delay={0} />
        {bottomImages.slice(0, 2).map((src, i) => (
          <GridImage key={`m-bot1-${i}`} src={src} alt={`Wedding moment ${i + 10}`} delay={(i + 1) * STAGGER} />
        ))}
      </AnimatedRow>

      {/* Mobile Row 5 */}
      <AnimatedRow className="grid md:hidden grid-cols-3 gap-1 px-1 pb-1">
        {bottomImages.slice(2).map((src, i) => (
          <GridImage key={`m-bot2-${i}`} src={src} alt={`Wedding moment ${i + 12}`} delay={i * STAGGER} />
        ))}
      </AnimatedRow>

    </section>
  )
}
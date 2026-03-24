'use client'
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function About() {
  // Subtle parallax on the image
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const [parallax, setParallax] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!imgWrapRef.current) return
      const rect = imgWrapRef.current.getBoundingClientRect()
      const wh = window.innerHeight
      if (rect.top < wh && rect.bottom > 0) {
        const pct = (wh / 2 - (rect.top + rect.height / 2)) / wh
        setParallax(pct * 50)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative w-full bg-[#F4F1E5] overflow-hidden">

      {/* ── DESKTOP ──────────────────────────────────────────────────── */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 42%', minHeight: '88vh' }}>

        {/* LEFT — all the content, vertically centered */}
        <div className="flex flex-col justify-center px-16 xl:px-24 py-24 gap-10">

          {/* Eyebrow */}
          <span
            className="text-[#41453D]/35 tracking-[0.35em] uppercase"
            style={{ fontSize: '0.58rem' }}
          >
            About us
          </span>

          {/* Headline */}
          <div className="flex flex-col gap-1">
            <h2
              className="text-[#41453D] leading-[0.92] uppercase"
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-editorial, serif)',
              }}
            >
              Classic Moments
            </h2>
            <h2
              className="text-[#41453D] leading-[0.92] uppercase"
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-editorial, serif)',
                fontStyle: 'italic',
              }}
            >
              Captured With Edge
            </h2>
          </div>

          {/* Thin rule */}
          <div className="w-12 h-px bg-[#41453D]/25" />

          {/* Body copy */}
          <div className="flex flex-col gap-5 max-w-md">
            <p
              className="font-neue-light text-[#41453D]/75 leading-[1.9]"
              style={{ fontSize: '0.9rem' }}
            >
              Blending artistic vision with emotional storytelling, House of Bliss stands at the forefront of modern wedding documentation. For over ten years, their lens has captured not just moments, but memories.
            </p>
            <p
              className="font-neue-light text-[#41453D]/75 leading-[1.9]"
              style={{ fontSize: '0.9rem' }}
            >
              From quiet home ceremonies to grand celebrations across oceans, every wedding we've witnessed has been a reflection of love in its purest form.
            </p>
          </div>

          {/* Explore link */}
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 font-neue-light uppercase tracking-[0.28em] text-[#41453D]/55 hover:text-[#41453D] transition-colors duration-300 w-fit"
            style={{ fontSize: '0.65rem' }}
          >
            Explore more
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          {/* Small index number — decorative */}
          <span
            className="text-[#41453D]/10 select-none"
            style={{
              fontSize: 'clamp(5rem, 12vw, 9rem)',
              fontFamily: 'var(--font-editorial, serif)',
              lineHeight: 1,
              marginTop: 'auto',
              letterSpacing: '-0.04em',
            }}
          >
            
          </span>

        </div>

        {/* RIGHT — tall portrait image, edge-to-edge, with parallax */}
        <div ref={imgWrapRef} className="relative overflow-hidden" style={{ minHeight: '88vh' }}>
          <Image
            src="/couple2/img7.webp"
            alt="House of Bliss"
            fill
            sizes="42vw"
            className="object-cover"
            style={{
              objectPosition: 'center top',
              transform: `translateY(${parallax}px)`,
              transition: 'transform 0.4s cubic-bezier(.4,1,.7,1)',
            }}
          />
          {/* very soft left-edge vignette so it blends into the bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #F4F1E5 0%, transparent 12%)',
            }}
          />
        </div>

      </div>

      {/* ── MOBILE ───────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col">

        {/* Image — tall, full width */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <Image
            src="/couple2/img7.webp"
            alt="House of Bliss"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'center top' }}
          />
          {/* bottom fade into content below */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 60%, #F4F1E5 100%)' }}
          />
        </div>

        {/* Content below image on mobile */}
        <div className="flex flex-col gap-6 px-6 pt-2 pb-16">

          <span
            className="text-[#41453D]/35 tracking-[0.35em] uppercase"
            style={{ fontSize: '0.55rem' }}
          >
            About us
          </span>

          <div className="flex flex-col gap-1">
            <h2
              className="text-[#41453D] leading-[0.92] uppercase"
              style={{
                fontSize: 'clamp(2rem, 9vw, 3rem)',
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-editorial, serif)',
              }}
            >
              Classic Moments
            </h2>
            <h2
              className="text-[#41453D] leading-[0.92] uppercase italic"
              style={{
                fontSize: 'clamp(2rem, 9vw, 3rem)',
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-editorial, serif)',
              }}
            >
              Captured With Edge
            </h2>
          </div>

          <div className="w-8 h-px bg-[#41453D]/25" />

          <p
            className="font-neue-light text-[#41453D]/70 leading-[1.9]"
            style={{ fontSize: '0.88rem' }}
          >
            Blending artistic vision with emotional storytelling, House of Bliss stands at the forefront of modern wedding documentation. For over ten years, their lens has captured not just moments, but memories.
          </p>

          <Link
            href="/about"
            className="group inline-flex items-center gap-3 font-neue-light uppercase tracking-[0.28em] text-[#41453D]/50 hover:text-[#41453D] transition-colors duration-300 w-fit"
            style={{ fontSize: '0.62rem' }}
          >
            Explore more
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

        </div>
      </div>

    </section>
  )
}
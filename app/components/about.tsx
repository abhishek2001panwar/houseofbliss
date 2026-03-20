'use client'
import React from 'react'
import Link from 'next/link'

const storyBoxes = [
  {
    label: 'Our Philosophy',
    text: 'At House of Bliss, we celebrate the heartfelt, the real, and the beautifully unscripted.',
  },
  {
    label: 'Who We Love',
    text: "We're drawn to couples who wear their hearts on their sleeves — the dreamers, the storytellers, the ones who aren't afraid to break a few traditions.",
  },
  {
    label: 'Our Art',
    text: "For us, photography isn't just about capturing events — it's about translating energy, personality, and emotion into timeless frames.",
  },
  {
    label: 'Our Journey',
    text: "From quiet home ceremonies to grand celebrations across oceans, every wedding we've witnessed has been a reflection of love in its purest form.",
  },
]

export function About() {
  return (
    <section className="relative w-full bg-[#F4F1E5] overflow-hidden">

      {/* ── HEADLINE BAND ─────────────────────────────────────────── */}
      <div className="relative pt-20 md:pt-10 px-6 md:px-16 text-center">
        <h2
          className="font-editorial text-[#41453D] leading-[0.95] uppercase"
          style={{ fontSize: 'clamp(2.6rem, 8vw, 4rem)', letterSpacing: '-0.01em' }}
        >
          Classic Moment's
        </h2>
        <div className="flex items-baseline justify-center gap-3 md:gap-5 mt-1">
          <span
            className="font-editorial text-[#41453D] uppercase"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 4rem)', letterSpacing: '-0.01em' }}
          >
            Captured With Edge
          </span>
        </div>
      </div>

      {/* ── TWO IMAGES + BODY COPY ────────────────────────────────── */}
      <div className="relative flex flex-col md:flex-row items-start gap-0">

        {/* ── MOBILE: both images stacked above body copy ── */}
        <div className="md:hidden w-full flex gap-3 px-6 mb-8 mt-8">
          <div className="w-1/2 h-[220px] overflow-hidden">
            <img
              src="/about2.png"
              alt="House of Bliss"
              className="w-full h-full object-cover grayscale"
              style={{ objectPosition: 'center top' }}
            />
          </div>
          <div className="w-1/2 h-[220px] overflow-hidden">
            <img
              src="/about3.png"
              alt="House of Bliss"
              className="w-full h-full object-cover grayscale"
              style={{ objectPosition: 'center 20%' }}
            />
          </div>
        </div>

        {/* ── DESKTOP: left image offset DOWN ── */}
        <div className="hidden md:block w-[25%] flex-shrink-0" style={{ paddingTop: '80px' }}>
          <div className="w-full overflow-hidden" style={{ height: '520px' }}>
            <img
              src="/about2.png"
              alt="House of Bliss"
              className="w-full h-full object-cover grayscale"
              style={{ objectPosition: 'center top' }}
            />
          </div>
        </div>

        {/* ── CENTER: body copy + story boxes + explore more ── */}
        <div className="flex-1 px-6 md:px-14 py-0 md:py-8 flex flex-col items-center gap-6">

          {/* Body paragraphs */}
          <p className="font-neue-light text-[#41453D] text-[0.9rem] md:text-[0.95rem] leading-[1.85] max-w-lg text-center">
            Blending artistic vision with emotional storytelling, House of Bliss stands at the forefront of modern wedding documentation. For over ten years, their lens has captured not just moments, but memories.
          </p>
          <p className="font-neue-light text-[#41453D] text-[0.9rem] md:text-[0.95rem] leading-[1.85] max-w-lg text-center">
            Blending artistic vision with emotional storytelling, House of Bliss stands at the forefront of modern wedding documentation. For nearly a decade, they have crafted timeless photographs and films that live on in the hearts of thousands.
          </p>

          {/* Explore more link */}
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 font-neue-light text-[11px] uppercase tracking-[0.25em] text-[#41453D]/70 hover:text-[#41453D] transition-colors duration-200 mt-2 w-fit"
          >
            Explore more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          {/* ── 2×2 Story boxes — centered below explore more ── */}
          {/* <div className="w-full max-w-lg mt-4 grid grid-cols-2 gap-px bg-[#41453D]/12">
            {storyBoxes.map((box, i) => (
              <div
                key={i}
                className="bg-[#F4F1E5] px-5 py-6 flex flex-col gap-3 group hover:bg-[#eceadf] transition-colors duration-300"
              >
                <span className="font-neue-light text-[8px] uppercase tracking-[0.32em] text-[#41453D]/35">
                  {String(i + 1).padStart(2, '0')} — {box.label}
                </span>
                <div className="h-px bg-[#41453D]/15 w-6 group-hover:w-full transition-all duration-500" />
                <p className="font-neue-light text-[#41453D] text-[0.78rem] leading-[1.75] mt-1">
                  {box.text}
                </p>
              </div>
            ))}
          </div> */}

        </div>

        {/* ── DESKTOP: right image offset UP ── */}
        <div className="hidden md:block w-[28%] flex-shrink-0" style={{ paddingBottom: '80px' }}>
          <div className="w-full overflow-hidden" style={{ height: '520px' }}>
            <img
              src="/about3.png"
              alt="House of Bliss"
              className="w-full h-full object-cover grayscale"
              style={{ objectPosition: 'center top' }}
            />
          </div>
        </div>

      </div>

      {/* bottom breathing room */}
      <div className="pb-16 md:pb-20" />

    </section>
  )
}
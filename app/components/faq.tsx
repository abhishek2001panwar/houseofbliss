'use client';
import React, { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "What services do you offer for wedding photography in Bengaluru?",
    answer: "We offer cinematic wedding photography in Bengaluru, including pre-wedding shoots and emotional storytelling with high-end visuals.",
  },
  {
    question: "Why are you considered the best wedding photographer in Bengaluru?",
    answer: "Our team is known as the best wedding photographer in Bengaluru for blending emotion, storytelling, and cinematic detail.",
  },
  {
    question: "What defines your best wedding photography style?",
    answer: "We create the best wedding photography by capturing real emotions, natural moments, and dramatic visuals in every frame.",
  },
  {
    question: "Do you provide pre-wedding photography as part of your wedding photography service in Bangalore?",
    answer: "Yes, we offer pre-wedding photography as part of our wedding photography service in Bangalore for complete love-story coverage.",
  },
  {
    question: "How long have you been offering wedding photography in Bengaluru?",
    answer: "We've provided premium wedding photography in Bengaluru for over 10 years, capturing over 500 weddings with style and emotion.",
  },
  {
    question: "What makes your wedding photography service in Bangalore unique?",
    answer: "Our wedding photography service in Bangalore combines cinematic direction, timeless editing, and authentic moments for unmatched quality.",
  },
  {
    question: "Are your services suitable for destination weddings beyond Bengaluru?",
    answer: "Yes, while we specialize in wedding photography in Bengaluru, we also cover destination weddings across India and internationally.",
  },
  {
    question: "What sets your team apart as the best wedding photographer?",
    answer: "As the best wedding photographer, we focus on visual storytelling, cinematic lighting, and customized client experiences.",
  },
  {
    question: "How soon should I book your wedding photography service in Bangalore?",
    answer: "We recommend booking our wedding photography service in Bangalore at least 3–6 months in advance to ensure availability.",
  },
  {
    question: "Do you offer both photo and video for wedding photography in Bengaluru?",
    answer: "Yes, we offer full-service wedding photography in Bengaluru, including cinematic films and creative photo coverage.",
  },
];

function useInViewOnce(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function FAQRow({ faq, idx }: { faq: { question: string; answer: string }; idx: number }) {
  const { ref, inView } = useInViewOnce(0.1);
  // FIX: accordion open state for mobile
  const [open, setOpen] = useState(false);

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${Math.min(idx * 60, 400)}ms`,
      }}
    >
      {/* Top border */}
      <div className="h-px bg-[#000000]/20 w-full" />

      {/* ── MOBILE: accordion layout ───────────────────────── */}
      <button
        className="md:hidden w-full text-left py-5 px-1 flex items-start gap-3 group focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {/* Number */}
        <span className="font-neue-light text-[#000000]/30 text-xs tracking-widest pt-1 flex-shrink-0 w-7">
          {String(idx + 1).padStart(2, '0')}
        </span>
        {/* Question */}
        <span className="flex-1  text-[#000000] text-[1rem] leading-snug pr-2">
          {faq.question}
        </span>
        {/* Chevron */}
        <span
          className="flex-shrink-0 mt-1 transition-transform duration-300 text-[#000000]/50"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* Mobile answer panel */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: open ? '400px' : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <p className="font-neue-light text-[#000000]/65 text-[0.95rem] leading-relaxed pb-5 pl-10 pr-2">
          {faq.answer}
        </p>
      </div>

      {/* ── DESKTOP: original side-by-side row layout ───────── */}
      <div className="hidden md:flex group relative flex-row items-start py-5 px-3">
        {/* Hover fill */}
        <div className="absolute inset-0 bg-[#000000]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm" />

        {/* Number */}
        <div className="w-12 flex-shrink-0 pt-1">
          <span className="font-neue-light text-[#000000]/30 text-sm tracking-widest">
            {String(idx + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Question */}
        <div className="w-[45%] font-serif pr-12 text-left  text-[1.32rem] md:text-[1.6rem] text-[#000000] leading-snug">
          {faq.question}
        </div>

        {/* Divider dot */}
      

        {/* Answer */}
        <div className="flex-1 text-left font-neue-light text-[1rem] md:text-[1.05rem] text-[#000000]/65 leading-relaxed group-hover:text-[#000000]/85 transition-colors duration-300">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const { ref: headingRef, inView: headingIn } = useInViewOnce(0.3);

  return (
    <section className="w-full py-16 md:py-28 px-4 md:px-20 bg-[#F4F1E5] relative overflow-hidden">

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.005]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="max-w-8xl mx-auto relative z-10">

        {/* Header */}
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-3 gap-2 md:gap-4 transition-all duration-700"
          style={{
            opacity: headingIn ? 1 : 0,
            transform: headingIn ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          {/* FIX: smaller heading on mobile */}
          
          <p className=" text-[#000000] text-xs sm:text-sm tracking-[0.2em] uppercase md:pb-3">
           F A Q
          </p>
        </div>

        {/* FAQ list */}
        <div className="mt-5">
          {faqs.map((faq, idx) => (
            <FAQRow key={idx} faq={faq} idx={idx} />
          ))}
          {/* Final bottom border */}
          <div className="h-px bg-[#000000]/20 w-full" />
        </div>

      </div>
    </section>
  );
}

export default FAQ;
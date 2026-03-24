"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import cards from "@/lib/couples";
import Navbar from "@/app/components/navbar";

export default function PhotographyDetailPage() {
  const params = useParams();
  const { id } = params;
  const card = cards.find((c) => c.id === Number(id));

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">
        Not found
      </div>
    );
  }

  const gridImages = card.gallery || [];
  const currentIdx = cards.findIndex((c) => c.id === Number(id));
  const prevCard = currentIdx > 0 ? cards[currentIdx - 1] : null;
  const nextCard = currentIdx < cards.length - 1 ? cards[currentIdx + 1] : null;

  // Parallax for hero image
  const imgRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top < windowH && rect.bottom > 0) {
        const percent = (windowH / 2 - (rect.top + rect.height / 2)) / windowH;
        setOffset(percent * 40);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /*
    Gallery grid pattern (repeating, same max-w-3xl container as original):
      Row A: 2 images side-by-side  (col-span-1 each, aspect 3/4)
      Row B: 1 full-width image     (col-span-2,       aspect 3/2)
      ...repeat

    We render inside a 2-col grid and use col-span-2 for full-width rows.
  */
  type GalleryRow =
    | { kind: "pair"; a: string; b: string }
    | { kind: "full"; src: string };

  const rows: GalleryRow[] = [];
  let i = 0;
  while (i < gridImages.length) {
    // pair row — needs 2 images
    if (i + 1 < gridImages.length) {
      rows.push({ kind: "pair", a: gridImages[i], b: gridImages[i + 1] });
      i += 2;
    } else {
      // only 1 left → make it full width
      rows.push({ kind: "full", src: gridImages[i] });
      i += 1;
      break;
    }
    // full-width row after every pair (if image available)
    if (i < gridImages.length) {
      rows.push({ kind: "full", src: gridImages[i] });
      i += 1;
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#F4F1E5] flex flex-col items-center py-32 px-4">
      <Navbar theme="dark" />

      {/* ── Header card — white bg, couple name ── */}
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">

        {/* Couple name */}
        <span className=" font-serif font-serif text-2xl text-[#41453D] mb-2 italic">
          {card.title}
        </span>

     

        {/* Hero image with parallax */}
        <div
          ref={imgRef}
          className="w-full overflow-hidden rounded-xl"
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            width={1600}
            height={1600}
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
            style={{
              transform: `translateY(${offset}px)`,
              transition: "transform 0.3s cubic-bezier(.4,1,.7,1)",
            }}
          />
        </div>
      </div>

      {/* ── Gallery grid ── */}
      {rows.length > 0 && (
        <div className="max-w-4xl w-full mx-auto mt-2 grid grid-cols-2 gap-2">
          {rows.map((row, ri) =>
            row.kind === "pair" ? (
              // ── Two portrait images side by side ──
              <React.Fragment key={ri}>
                <div className="overflow-hidden w-full" style={{ aspectRatio: "3/4" }}>
                  <Image
                    width={1600} height={1600}
                    src={row.a}
                    alt={`Gallery ${ri}a`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden w-full" style={{ aspectRatio: "3/4" }}>
                  <Image
                    width={1600} height={1600}
                    src={row.b}
                    alt={`Gallery ${ri}b`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </React.Fragment>
            ) : (
              // ── Single full-width image (spans both columns) ──
              <div
                key={ri}
                className="col-span-2 overflow-hidden w-full"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  width={1600} height={2133}
                  src={row.src}
                  alt={`Gallery ${ri}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )
          )}
        </div>
      )}

      {gridImages.length === 0 && (
        <p className="text-center text-[#41453D]/30 py-24 tracking-widest text-xs uppercase">
          Gallery coming soon
        </p>
      )}

      {/* ── Navigation ── */}
      <div className="w-full max-w-3xl mx-auto mt-20">

        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[#41453D]/12" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#41453D]/30 font-neue-light">
            More Photography
          </span>
          <div className="flex-1 h-px bg-[#41453D]/12" />
        </div>

        <div className="grid grid-cols-3 items-start">

          {/* Prev */}
          <div className="flex justify-start">
            {prevCard ? (
              <Link href={`/photography/${prevCard.id}`} className="group flex flex-col items-start gap-3 focus:outline-none">
                <div className="flex items-center gap-2 text-[#41453D]/40 group-hover:text-[#41453D] transition-colors duration-300">
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="text-[10px] tracking-[0.25em] uppercase font-neue-light">Previous</span>
                </div>
                <div className="overflow-hidden w-20 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ aspectRatio: "3/4" }}>
                  <Image width={1600} height={1600} src={prevCard.image} alt={prevCard.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="font-editorial font-serif text-[#41453D] text-sm leading-tight group-hover:opacity-70 transition-opacity">
                  {prevCard.title}
                </span>
              </Link>
            ) : <div />}
          </div>

          {/* Back to all */}
          <div className="flex flex-col items-center gap-3">
            <Link href="/photography" className="group flex flex-col items-center gap-3 focus:outline-none">
              <div className="w-10 h-10 rounded-full border border-[#41453D]/20 flex items-center justify-center group-hover:border-[#41453D]/60 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="text-[#41453D]/40 group-hover:text-[#41453D] transition-colors duration-300">
                  <rect x="1" y="1" width="5" height="5" rx="0.5" fill="currentColor" />
                  <rect x="8" y="1" width="5" height="5" rx="0.5" fill="currentColor" />
                  <rect x="1" y="8" width="5" height="5" rx="0.5" fill="currentColor" />
                  <rect x="8" y="8" width="5" height="5" rx="0.5" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase font-neue-light text-[#41453D]/40 group-hover:text-[#41453D]/70 transition-colors duration-300">
                GO Back
              </span>
            </Link>
          </div>

          {/* Next */}
          <div className="flex justify-end">
            {nextCard ? (
              <Link href={`/photography/${nextCard.id}`} className="group flex flex-col items-end gap-3 focus:outline-none">
                <div className="flex items-center gap-2 text-[#41453D]/40 group-hover:text-[#41453D] transition-colors duration-300">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-neue-light">Next</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <div className="overflow-hidden w-20 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ aspectRatio: "3/4" }}>
                  <Image width={1600} height={1600} src={nextCard.image} alt={nextCard.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="font-editorial font-serif text-[#41453D] text-sm leading-tight text-right group-hover:opacity-70 transition-opacity">
                  {nextCard.title}
                </span>
              </Link>
            ) : <div />}
          </div>

        </div>

        <div className="h-px bg-[#41453D]/12 mt-10" />
      </div>
    </div>
  );
}
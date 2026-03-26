"use client";
import React from "react";
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

  // Hero image is first in the gallery grid
  const allGalleryImages = [card.image, ...gridImages];

  type GalleryRow =
    | { kind: "pair"; a: string; b: string }
    | { kind: "full"; src: string };

  const rows: GalleryRow[] = [];
  let i = 0;
  while (i < allGalleryImages.length) {
    if (i + 1 < allGalleryImages.length) {
      rows.push({ kind: "pair", a: allGalleryImages[i], b: allGalleryImages[i + 1] });
      i += 2;
    } else {
      rows.push({ kind: "full", src: allGalleryImages[i] });
      i += 1;
      break;
    }
    if (i < allGalleryImages.length) {
      rows.push({ kind: "full", src: allGalleryImages[i] });
      i += 1;
    }
  }

  // Split title at " & " for two-line display like reference image
  const titleParts = card.title.includes(" & ")
    ? [card.title.split(" & ")[0] + " &", card.title.split(" & ")[1]]
    : [card.title];

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .name-line-1 {
          animation: fadeUp 0.85s cubic-bezier(.22,1,.36,1) both;
        }
        .name-line-2 {
          animation: fadeUp 0.85s 0.12s cubic-bezier(.22,1,.36,1) both;
        }
        .name-location {
          animation: fadeUp 0.85s 0.24s cubic-bezier(.22,1,.36,1) both;
        }
        .gallery-item {
          animation: fadeIn 1s 0.4s cubic-bezier(.22,1,.36,1) both;
        }
      `}</style>

      <div className="min-h-screen w-full bg-[#F4F1E5] flex flex-col items-center py-32 px-4">
        <Navbar theme="dark" />

        {/* ── Header card — white bg, TEXT ONLY, perfectly centered ── */}
        <div
          className="max-w-md w-full bg-white  shadow-xl flex flex-col items-center justify-center px-6 sm:px-10"
          style={{ minHeight: "clamp(140px, 40vw, 600px)", paddingTop: "clamp(3rem, 8vw, 6rem)", paddingBottom: "clamp(3rem, 8vw, 6rem)" }}
        >
          {/* Couple name */}
          <div className="text-center" style={{ lineHeight: 1.05 }}>
            {titleParts.map((line, idx) => (
              <h1
                key={idx}
                className={`font-serif  block text-[#0e0e0e] ${idx === 0 ? "name-line-1" : "name-line-2"}`}
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 3.2rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                }}
              >
                {line}
              </h1>
            ))}
          </div>

       
        </div>

        {/* ── Gallery grid (hero image is first item) ── */}
        {rows.length > 0 && (
          <div className="max-w-4xl w-full mx-auto mt-2 grid grid-cols-2 gap-2">
            {rows.map((row, ri) =>
              row.kind === "pair" ? (
                <React.Fragment key={ri}>
                  <div
                    className="gallery-item overflow-hidden w-full"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <Image
                      width={1600} height={1600}
                      src={row.a}
                      alt={`Gallery ${ri}a`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="gallery-item overflow-hidden w-full" style={{ aspectRatio: "3/4" }}>
                    <Image
                      width={1600} height={1600}
                      src={row.b}
                      alt={`Gallery ${ri}b`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </React.Fragment>
              ) : (
                <div
                  key={ri}
                  className="gallery-item col-span-2 overflow-hidden w-full"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    width={1500} height={2033}
                    src={row.src}
                    alt={`Gallery ${ri}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )
            )}
          </div>
        )}

        {allGalleryImages.length === 0 && (
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
    </>
  );
}
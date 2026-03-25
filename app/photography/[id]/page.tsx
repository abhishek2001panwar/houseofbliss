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

  // hero image is first in the grid, followed by gallery
  const allImages = [card.image, ...(card.gallery || [])];

  const currentIdx = cards.findIndex((c) => c.id === Number(id));
  const prevCard = currentIdx > 0 ? cards[currentIdx - 1] : null;
  const nextCard = currentIdx < cards.length - 1 ? cards[currentIdx + 1] : null;

  type GalleryRow =
    | { kind: "pair"; a: string; b: string }
    | { kind: "full"; src: string };

  const rows: GalleryRow[] = [];
  let i = 0;
  while (i < allImages.length) {
    if (i + 1 < allImages.length) {
      rows.push({ kind: "pair", a: allImages[i], b: allImages[i + 1] });
      i += 2;
    } else {
      rows.push({ kind: "full", src: allImages[i] });
      i += 1;
      break;
    }
    if (i < allImages.length) {
      rows.push({ kind: "full", src: allImages[i] });
      i += 1;
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#F4F1E5] flex flex-col items-center">
      <Navbar theme="dark" />

      {/* ── Tall editorial name card — small on mobile, full on md+ ── */}
      <div className="w-full flex justify-center pt-20 md:pt-24 pb-4 md:pb-4 px-3 md:px-4">
        <div
          className="w-full max-w-xl bg-white flex flex-col items-start justify-end
                     min-h-[200px] md:min-h-[85vh] rounded-2xl"
          style={{ padding: "0 clamp(18px, 5vw, 48px) clamp(24px, 4vw, 56px)" }}
        >
          <h1
            className="font-serif font-normal text-[#111]
                       text-[1.6rem] md:text-[clamp(2.8rem,7vw,5rem)]"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.02, wordBreak: "break-word" }}
          >
            {card.title}.
          </h1>
        
        </div>
      </div>

      {/* ── Gallery grid — hero image is first cell ── */}
      {rows.length > 0 ? (
        <div className="max-w-4xl w-full mx-auto px-4 grid grid-cols-2 gap-2 pb-2">
          {rows.map((row, ri) =>
            row.kind === "pair" ? (
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
              <div
                key={ri}
                className="col-span-2 overflow-hidden w-full"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  width={1600} height={900}
                  src={row.src}
                  alt={`Gallery ${ri}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-center text-[#41453D]/30 py-24 tracking-widest text-xs uppercase">
          Gallery coming soon
        </p>
      )}

      {/* ── Navigation ── */}
      <div className="w-full max-w-3xl mx-auto mt-20 px-4">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[#41453D]/12" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#41453D]/30"
            style={{ fontFamily: "var(--font-neue-light, sans-serif)" }}>
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
                  <span className="text-[10px] tracking-[0.25em] uppercase"
                    style={{ fontFamily: "var(--font-neue-light, sans-serif)" }}>Previous</span>
                </div>
                <div className="overflow-hidden w-20 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ aspectRatio: "3/4" }}>
                  <Image width={400} height={533} src={prevCard.image} alt={prevCard.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="font-serif italic text-[#41453D] text-sm leading-tight group-hover:opacity-70 transition-opacity">
                  {prevCard.title}
                </span>
              </Link>
            ) : <div />}
          </div>

          {/* Back to all */}
          <div className="flex flex-col items-center gap-3">
            <Link href="/photography" className="group flex flex-col items-center gap-3 focus:outline-none">
              <div className="w-10 h-10 rounded-full border border-[#41453D]/20 flex items-center justify-content-center justify-center group-hover:border-[#41453D]/60 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="text-[#41453D]/40 group-hover:text-[#41453D] transition-colors duration-300">
                  <rect x="1" y="1" width="5" height="5" rx="0.5" fill="currentColor" />
                  <rect x="8" y="1" width="5" height="5" rx="0.5" fill="currentColor" />
                  <rect x="1" y="8" width="5" height="5" rx="0.5" fill="currentColor" />
                  <rect x="8" y="8" width="5" height="5" rx="0.5" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#41453D]/40 group-hover:text-[#41453D]/70 transition-colors duration-300"
                style={{ fontFamily: "var(--font-neue-light, sans-serif)" }}>
                Go Back
              </span>
            </Link>
          </div>

          {/* Next */}
          <div className="flex justify-end">
            {nextCard ? (
              <Link href={`/photography/${nextCard.id}`} className="group flex flex-col items-end gap-3 focus:outline-none">
                <div className="flex items-center gap-2 text-[#41453D]/40 group-hover:text-[#41453D] transition-colors duration-300">
                  <span className="text-[10px] tracking-[0.25em] uppercase"
                    style={{ fontFamily: "var(--font-neue-light, sans-serif)" }}>Next</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <div className="overflow-hidden w-20 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ aspectRatio: "3/4" }}>
                  <Image width={400} height={533} src={nextCard.image} alt={nextCard.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="font-serif italic text-[#41453D] text-sm leading-tight text-right group-hover:opacity-70 transition-opacity">
                  {nextCard.title}
                </span>
              </Link>
            ) : <div />}
          </div>

        </div>

        <div className="h-px bg-[#41453D]/12 mt-10 mb-16" />
      </div>
    </div>
  );
}
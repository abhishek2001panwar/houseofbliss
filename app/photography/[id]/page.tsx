"use client";
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/app/components/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import cards  from "@/lib/couples";
import Navbar from "@/app/components/navbar";

// Cards data copied from photography/page.tsx
// const cards = [
//   {
//     id: "reva-zach",
//     image: "/mag/img10.png",
//     title: "Reva & Zach",
//     desc: "A royal celebration of love in Udaipur.",
//     date: "Oct 7, 2024",
//     location: "Udaipur",
//     index: "01",
//     gallery: [
//       "/mag/img10.png",
//       "/mag/img10.png",
//       "/mag/img10.png",
//       "/mag/img10.png",
//       "/mag/img10.png",
//     ],
//   },
//   {
//     id: "manisha-christopher",
//     image: "/mag/img12.png",
//     title: "Manisha & Christopher",
//     desc: "A timeless wedding in Singapore's heritage district.",
//     date: "Aug 25, 2024",
//     location: "Singapore",
//     index: "02",
//   },
//   {
//     id: "alia-ranbir",
//     image: "/mag/img8.png",
//     title: "Alia & Ranbir",
//     desc: "Bollywood glamour meets tradition in Mumbai.",
//     date: "Aug 8, 2024",
//     location: "Mumbai",
//     index: "03",
//   },
//   {
//     id: "kiara-siddharth",
//     image: "/mag/img9.png",
//     title: "Kiara & Siddharth",
//     desc: "A vibrant beachside wedding full of joy.",
//     date: "Apr 24, 2024",
//     location: "Goa",
//     index: "04",
//   },
//   {
//     id: "ananya-rahul",
//     image: "/mag/img13.png",
//     title: "Ananya & Rahul",
//     desc: "A colorful destination wedding in Jaipur.",
//     date: "Jul 12, 2024",
//     location: "Jaipur",
//     index: "05",
//   },
//   {
//     id: "meera-jonathan",
//     image: "/mag/img14.png",
//     title: "Meera & Jonathan",
//     desc: "A cross-cultural celebration in Goa.",
//     date: "Jun 18, 2024",
//     location: "Goa",
//     index: "06",
//   },
//   {
//     id: "isha-aman",
//     image: "/mag/img15.png",
//     title: "Isha & Aman",
//     desc: "A classic Indian wedding with modern flair.",
//     date: "May 5, 2024",
//     location: "Delhi",
//     index: "07",
//   },
//   {
//     id: "tara-vikram",
//     image: "/mag/img16.png",
//     title: "Tara & Vikram",
//     desc: "A chic city wedding in Bangalore.",
//     date: "Mar 30, 2024",
//     location: "Bangalore",
//     index: "08",
//   },
// ];

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

  // Parallax effect for main image
  const imgRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Only parallax when in viewport
      if (rect.top < windowH && rect.bottom > 0) {
        const percent = (windowH/2 - (rect.top + rect.height/2)) / windowH;
        setOffset(percent * 40); // max 40px parallax
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F4F1E5] flex flex-col items-center py-32 px-4">
      <Navbar theme="dark" />
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <div
          ref={imgRef}
          className="w-full overflow-hidden rounded-xl mb-6"
          style={{ aspectRatio: "3/4" }}
        >
          <span className="font-editorial text-2xl text-[#41453D] mb-2">
            {card.title}
          </span>
          <div className="w-full h-px bg-[#41453D]/15 my-4" />
          {/* <span className="font-neue-light text-[#41453D]/80 text-base text-center mb-6">
            {card.desc}
          </span> */}
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${offset}px)`, transition: 'transform 0.3s cubic-bezier(.4,1,.7,1)' }}
          />
        </div>
      </div>

      {/* Premium grid of images */}
      <div className="max-w-3xl w-full mx-auto mt-10 grid grid-cols-2 gap-px">
        {gridImages.length > 0 ? (
          gridImages.map((img, idx) => (
            <div key={idx} className="w-full">
              <div
                className="overflow-hidden  shadow-md w-full"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={img}
                  alt={`Gallery image ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No images available</p>
        )}
      </div>

      {/* ── Premium Navigation ── */}
      <div className="w-full max-w-3xl mx-auto mt-20">

        {/* Hairline + label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[#41453D]/12" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#41453D]/30 font-neue-light">
            More Photography
          </span>
          <div className="flex-1 h-px bg-[#41453D]/12" />
        </div>

        {/* Three-column nav: prev | back | next */}
        <div className="grid grid-cols-3 items-start">

          {/* Prev */}
          <div className="flex justify-start">
            {prevCard ? (
              <Link
                href={`/photography/${prevCard.id}`}
                className="group flex flex-col items-start gap-3 focus:outline-none"
              >
                <div className="flex items-center gap-2 text-[#41453D]/40 group-hover:text-[#41453D] transition-colors duration-300">
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="text-[10px] tracking-[0.25em] uppercase font-neue-light">
                    Previous
                  </span>
                </div>
                <div
                  className="overflow-hidden w-20 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={prevCard.image}
                    alt={prevCard.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="font-editorial text-[#41453D] text-sm leading-tight group-hover:opacity-70 transition-opacity">
                  {prevCard.title}
                </span>
              </Link>
            ) : (
              <div /> /* empty placeholder */
            )}
          </div>

          {/* Back to all */}
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/photography"
              className="group flex flex-col items-center gap-3 focus:outline-none"
            >
              {/* Thin circle icon */}
              <div className="w-10 h-10 rounded-full border border-[#41453D]/20 flex items-center justify-center group-hover:border-[#41453D]/60 transition-colors duration-300">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-[#41453D]/40 group-hover:text-[#41453D] transition-colors duration-300"
                >
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
              <Link
                href={`/photography/${nextCard.id}`}
                className="group flex flex-col items-end gap-3 focus:outline-none"
              >
                <div className="flex items-center gap-2 text-[#41453D]/40 group-hover:text-[#41453D] transition-colors duration-300">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-neue-light">
                    Next
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <div
                  className="overflow-hidden w-20 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={nextCard.image}
                    alt={nextCard.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="font-editorial text-[#41453D] text-sm leading-tight text-right group-hover:opacity-70 transition-opacity">
                  {nextCard.title}
                </span>
              </Link>
            ) : (
              <div /> /* empty placeholder */
            )}
          </div>

        </div>

        {/* Bottom hairline */}
        <div className="h-px bg-[#41453D]/12 mt-10" />
      </div>
    </div>
  );
}
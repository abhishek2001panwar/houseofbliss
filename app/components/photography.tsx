import React from "react";
import Link from "next/link";

const cards = [
  {
    id: 1,
    image: "/couple1/hero.png",
    title: "Nithesh and Poojitha",
    desc: "A royal celebration of love in Udaipur.",
    date: "Oct 7, 2024",
    location: "Udaipur",
    index: "01",
    gallery: [
      "/couple1/img1.png",
      "/couple1/img2.png",
      "/couple1/img3.png",
    
      "/couple1/img5.png",
      "/couple1/img6.png",
      "/couple1/img7.png",
      "/couple1/img8.png",
      "/couple1/img9.png",
      "/couple1/img10.png",
      "/couple1/img11.png",
      "/couple1/img12.png",
    ],
  },
  {
    id: 2,
    image: "/couple2/hero.png",
    title: "Prakruthi & Sudarshan",
    desc: "A timeless wedding in Singapore's heritage district.",
    date: "Aug 25, 2024",
    location: "Singapore",
    index: "02",
    gallery: [
      "/couple2/img1.png",
      "/couple2/img2.png",
      "/couple2/img3.png",
      "/couple2/img4.png",
      "/couple2/img5.png",
      "/couple2/img6.png",
      "/couple2/img7.png",
      "/couple2/img8.png",
      "/couple2/img9.png",
    ],
  },
 
  {
    id: 4,
    image: "/couple4/hero.png",
    title: "Ani & Neha",
    desc: "A vibrant beachside wedding full of joy.",
    date: "Apr 24, 2024",
    location: "Goa",
    index: "04",
    gallery: [
      "/couple4/img1.png",
      "/couple4/img2.png",
      "/couple4/img3.png",
      "/couple4/img4.png",
      "/couple4/img5.png",
      "/couple4/img6.png",
      "/couple4/img7.png",
    ],
  },
];
//  {
//     id: 3,
//     image: "/couple3/hero.png",
//     title: "Khajukathara & Preetham",
//     desc: "Bollywood glamour meets tradition in Mumbai.",
//     date: "Aug 8, 2024",
//     location: "Mumbai",
//     index: "03",
//     gallery: [
//       "/couple3/img1.png",
//       "/couple3/img2.png",
//       "/couple3/img3.png",
//       "/couple3/img4.png",
//       "/couple3/img5.png",
//       "/couple3/img6.png",
//       "/couple3/img7.png",
//       "/couple3/img8.png",
//       "/couple3/img9.png",
//       "/couple3/img10.png",
//     ],
//   },
export default function PhotographySection() {
  return (
    <section className="w-full bg-[#F4F1E5] px-6 md:px-14 py-16 md:py-24">
         <div
      
        
        className={`flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-gray-400 transition-all duration-700 `}
      >
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground ">
           Photography
          </p>
          <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-gray-200">
          </h2>
        </div>
        
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-px mb-10 md:mb-14">
        {cards.map((card, idx) => (
          <Link
            key={idx}
            href={`/photography/${card.id}`}
            className="group flex flex-col gap-3"
          >
            {/* Image */}
            <div
              className="overflow-hidden w-full"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Text below image */}
            <div className="flex flex-col gap-0.5 px-0.5">
              <span
                className="font-editorial text-[#41453D] leading-tight group-hover:opacity-70 transition-opacity duration-200"
                style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)', letterSpacing: '-0.01em' }}
              >
                {card.title}
              </span>
            
            </div>
          </Link>
        ))}
      </div>

      {/* CTA button — centered */}
      <div className="flex justify-center">
        <Link
          href="/photography"
          className="inline-flex border border-black text-black items-center gap-2 font-neue-light text-[12px] uppercase tracking-[0.2em] px-8 py-3 transition-all duration-300 hover:opacity-80"
          style={{
            color: '#000000',
          
            letterSpacing: '0.18em',
          }}
        >
          Explore More 
        </Link>
      </div>

    </section>
  );
}
import React from "react";
import Image from "next/image";
import Navbar from "../components/navbar";
import Link from "next/link";
import  cards  from "@/lib/couples";

// const cards = [
//   {
//     id: "reva-zach",
//     image: "/mag/img10.png",
//     title: "Reva & Zach",
//     desc: "A royal celebration of love in Udaipur.",
//     date: "Oct 7, 2024",
//     location: "Udaipur",
//     index: "01",
//      gallery: [
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

export default function PhotographyPage() {
  return (
    <div className="min-h-screen w-full bg-[#F4F1E5] pt-32 ">
      <Navbar theme="dark" />

    

      {/* Grid */}
      <div className="w-full px-6 md:px-16 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-px gap-y-10">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={`/photography/${card.id}`}
              className="group flex flex-col focus:outline-none"
              style={{ textDecoration: "none" }}
            >
              {/* Image */}
              <div
                className="overflow-hidden w-full relative"
                style={{ aspectRatio: "3/4" }}
              >
                <Image width={1200} height={1200} src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-[#41453D] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Meta — no background, editorial style */}
              <div className="flex flex-col pt-4">
                {/* Top row: index + location */}
                {/* <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#41453D]/30 font-neue-light">
                    {card.index}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#41453D]/30 font-neue-light">
                    {card.location}
                  </span>
                </div> */}

                {/* Thin divider */}
                <div className="w-full h-px bg-[#41453D]/15 mb-3" />

                {/* Title */}
                <span className="font-editorial text-[#41453D] text-xl leading-tight tracking-tight group-hover:opacity-70 transition-opacity duration-300">
                  {card.title}
                </span>

                {/* Desc + date */}
                <div className="flex items-start justify-between gap-3 mt-1.5">
                  {/* <span className="font-neue-light text-[#41453D]/55 text-xs leading-relaxed flex-1">
                    {card.desc}
                  </span> */}
                 
                </div>
               {/* <span className="font-neue-light text-[#41453D]/55 text-xs leading-relaxed flex-1">
                    Read more
                  </span> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
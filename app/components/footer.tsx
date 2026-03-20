import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F4F1E5] text-black py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-8 md:gap-0">
        {/* Left: Logo and Socials */}
        <div className="flex-1 flex flex-col items-start mb-8 md:mb-0">
          {/* Logo */}
          <Image 
            width={80}
            height={80}
          src="/dark.webp" alt="House of Bliss Logo" className=" mb-4" />
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="https://www.instagram.com/houseofbliss.in" target="_blank" rel="noopener" aria-label="Instagram">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M16 8h-2a2 2 0 0 0-2 2v2h4"/><path d="M12 16v-4"/></svg>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener" aria-label="Pinterest">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 15c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4c0 1.38.7 2.59 1.76 3.29L9 19l2-2"/></svg>
            </a>
          </div>
        </div>

        {/* Center: Address */}
        <div className="flex-1 flex flex-col items-center text-center mb-8 md:mb-0">
          <div className="text-base font-neue-light">
            2nd Floor, 772, 100 Feet Rd,<br />
            Above Royal Enfield Showroom,<br />
            HAL 2nd Stage, Doopanahalli,<br />
            Indiranagar, Bengaluru,<br />
            Karnataka - 560038
          </div>
        </div>

        {/* Right: Email */}
        <div className="flex-1 flex flex-col items-end md:items-end items-center text-center md:text-right">
          <a href="mailto:info@houseofbliss.co.in" className="underline text-base font-neue-light break-all">info@houseofbliss.co.in</a>
        </div>
      </div>
    </footer>
  );
}
import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#fdf9dc] w-full border-t pt-8 pb-4 px-4 md:px-12">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">
        {/* Left: Brand and links */}
        <div className="flex flex-col gap-4 min-w-[180px] md:min-w-[220px]">
          <span className="font-editorial text-[2rem] md:text-[2.5rem] text-[#5a5a4c] mb-2">house of bliss</span>
          <div className="flex flex-row gap-8 md:gap-12">
            <div className="flex flex-col gap-1 md:gap-2 font-editorial text-[#5a5a4c] text-[1rem] md:text-[1.3rem]">
              <a href="#stories">Stories</a>
              <a href="#pricing">Pricing</a>
              <a href="#sayhi">Say hi</a>
            </div>
            <div className="flex flex-col gap-1 md:gap-2 font-editorial text-[#5a5a4c] text-[1rem] md:text-[1.3rem]">
              <a href="#about">About</a>
              <a href="#photographers">For photographers</a>
            </div>
          </div>
        </div>
        {/* Center: Instagram button */}
        <div className="flex flex-col items-center justify-center min-w-[180px] md:min-w-[220px] mt-4 md:mt-0">
          <a
            href="https://instagram.com/houseofbliss.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 md:px-8 py-3 md:py-4 border border-[#5a5a4c] font-neue-regular text-base md:text-lg text-[#5a5a4c] bg-transparent hover:bg-black hover:text-white transition-colors duration-300 w-full text-center"
            style={{ fontFamily: 'var(--font-neue-regular)' }}
          >
            Follow us on Instagram
          </a>
        </div>
        {/* Right: Info */}
        <div className="flex flex-col min-w-[220px] md:min-w-[320px] mt-4 md:mt-0">
          <span className="font-neue-regular text-[#5a5a4c] text-[0.9rem] md:text-[1rem] mb-2">
            Address:<br />
            2nd Floor, 772, 100 Feet Rd, Above Royal Enfield Showroom,<br /> HAL 2nd Stage, Doopanahalli, Indiranagar, <br /> Bengaluru, Karnataka, 560038
          </span>
          {/* <span className="font-neue-regular text-[#5a5a4c] text-[1rem]">
            2nd Floor, 772, 100 Feet Rd, Above Royal Enfield Showroom,<br />
            HAL 2nd Stage, Doopanahalli, Indiranagar,<br />
             Bengaluru, Karnataka, 560038
           
          </span> */}
        </div>
      </div>
      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 md:mt-12 pt-4 md:pt-6 border-t border-[#5a5a4c] text-[#5a5a4c] text-[0.9rem] md:text-[1rem] font-neue-regular">
        <div className="flex flex-wrap gap-4 md:gap-6">
          <span>©House of Bliss</span>
          <a href="#privacy">Privacy policy</a>
          <a href="#cookie">Cookie policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
        <span className="mt-2 md:mt-0"></span>
      </div>
    </footer>
  );
}

export default Footer;
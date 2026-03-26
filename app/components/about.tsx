import React from "react";
import { Button } from "../components/button";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <section className="bg-[#F5F0E8] w-full py-10 md:py-20 lg:py-20">
      <style>{`
        .hotc-title  { font-family:  serif; }
        .hotc-cursive{ font-family:  cursive; }
        .hotc-body   { font-family:  serif; }
      `}</style>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ══════════════════════════════════════════
            DESKTOP LAYOUT (lg+)
            left-img | heading / description / right-img
        ══════════════════════════════════════════ */}
        <div className="hidden lg:flex flex-row items-stretch">
          {/* Left Image — portrait */}
          <div className="w-[29%] flex-shrink-0 top-[15%]">
            <div className="h-full min-h-[500px] max-h-[540px] overflow-hidden">
              <img
                src="/couple2/img7.webp"
                alt="Wedding couple"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right block: heading on top, then text + image below */}
          <div className="flex-1 flex flex-col text-center  ">
            {/* Heading */}
            <div className="mb-6 -ml-4 ">
              <div
                className="hotc-title font-medium text-[#1a1a1a] leading-[1.15] uppercase"
                style={{
                  fontSize: "clamp(1.55rem, 3.2vw, 2.9rem)",
                  fontFamily: "var(--font-editorial, serif)",
                }}
              >
                classic moments
              </div>
              <div className="hotc-title font-light text-[#1a1a1a] leading-[1.15] flex flex-wrap items-baseline gap-x-2">
                <span
                  className="uppercase font-medium"
                  style={{
                    fontSize: "clamp(1.55rem, 3.2vw, 2.9rem)",
                    fontFamily: "var(--font-editorial, serif)",
                  }}
                >
                  captured with edge
                </span>
              </div>
            </div>

            {/* Description + Right Image */}
            <div className="flex flex-row flex-1 gap-6 p-2">
              {/* Description */}
              <div className="flex-1 flex flex-col justify-start pr-4 p-10">
                <p className="hotc-body text-[#2b2b2b] text-[0.88rem] leading-[1.9] mb-5">
                  Blending artistic vision with emotional storytelling, House of
                  Bliss stands at the forefront of modern wedding documentation.
                  For over ten years, their lens has captured not just moments,
                  but memories.
                   From quiet home ceremonies to grand celebrations across
                  oceans, every wedding we've witnessed has been a reflection of
                  love in its purest form. <br />
                   Where your love story take center stage <br />
                  we believe every couple has a unique tale waiting to be told
                  with artistry and emotion
                </p>
                <p className="hotc-body text-[#2b2b2b] text-[0.88rem] leading-[1.9] mb-5">
                 
                </p>
                <p className="hotc-body text-[#2b2b2b] text-[0.88rem] leading-[1.9] mb-5">
                 
                </p>

                <Link href="/about" className="flex  md:justify-center">
                  <Button
                    variant="outline"
                    className="mt-16 text-center self-start"
                  >
                    explore more{" "}
                  </Button>
                </Link>
              </div>

              {/* Right Image — portrait */}
              <div className="w-[40%] flex-shrink-0">
                <div className="h-full min-h-[350px] max-h-[400px] overflow-hidden">
                  <img
                    src="/couple3/img2.jpeg"
                    alt="Bride portrait"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            MOBILE + TABLET LAYOUT (< lg)
            heading → description → [img | img]
        ══════════════════════════════════════════ */}
        <div className="flex flex-col  lg:hidden gap-5">
          {/* Heading */}
          <div>
            <div
              className="hotc-title  text-[#1a1a1a] leading-[1.15] uppercase"
              style={{ fontSize: "clamp(1.4rem, 5.5vw, 2.2rem)" }}
            >
              classic moments
            </div>
            <div className="hotc-title  text-[#1a1a1a] leading-[1.15] flex flex-wrap items-baseline gap-x-1">
              <span
                className="uppercase tracking-[0.1em] "
                style={{ fontSize: "clamp(1.4rem, 5.5vw, 2.2rem)" }}
              >
                captured with edge
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="hotc-body text-[#2b2b2b] text-[0.87rem] leading-[1.85] mb-4">
               Blending artistic vision with emotional storytelling, House of
                  Bliss stands at the forefront of modern wedding documentation.
                  For over ten years, their lens has captured not just moments,
                  but memories.
                   From quiet home ceremonies to grand celebrations across
                  oceans, every wedding we've witnessed has been a reflection of
                  love in its purest form. <br />
                   Where your love story take center stage <br />
                  we believe every couple has a unique tale waiting to be told
                  with artistry and emotion
            </p>
           
            <Link href="/about" className="flex   justify-center">
              <Button variant="outline" className="mt-8 text-center self-start">
                explore more{" "}
              </Button>
            </Link>
          </div>

          {/* Two portrait images side by side */}
          <div className="flex flex-row gap-3">
            <div className="w-1/2">
              <div className=" sm:h-[500px] overflow-hidden">
                <img
                  src="/couple2/img7.webp"
                  alt="Wedding couple"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className=" sm:h-[500px] overflow-hidden">
                <img
                  src="/couple3/img2.jpeg"
                  alt="Bride portrait"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

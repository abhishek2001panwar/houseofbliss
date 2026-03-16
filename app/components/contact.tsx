"use client";

import React, { useState } from "react";
import Button from "./button";

const Contact = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      {/* Hero / intro section */}
      <section className="bg-[#41453D]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start justify-center pt-8 md:pt-3 gap-6 md:gap-0">
            {/* FIX: added pt-8 on mobile so heading isn't flush to top */}
            <div className="flex-1 flex flex-col justify-center md:pr-8">
              <h2 className="font-editorial text-[#fdf9dc] text-4xl sm:text-5xl md:text-6xl mb-4 md:mb-8">
                Say hi!
              </h2>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {/* FIX: text-base on mobile instead of text-lg to avoid overflow */}
              <div className="font-neue-light text-[#fdf9dc] text-base md:text-lg lg:text-xl mb-6 md:mb-8">
                You've made it all the way to the contact page, congrats! If
                you've made it this far, chances are something felt a little
                different. Whether you're ready to book or you need a little
                more info, I'm excited to hear what I can do for you!
                <br />
                <br />
                If you feel like creating magic together, please fill out the
                form below and I will get back to you within 3–4 days.
                <br />
                <br />
              
                <a
                  href="mailto:info@houseofbliss.co.in"
                  className="underline break-all"
                >
                  info@houseofbliss.co.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="relative w-full min-h-screen bg-[#41453D] flex flex-col items-center justify-center px-4 md:px-8 py-12 md:py-16 pb-28 md:pb-32">

        {/* Headline above form */}
        <div className="w-full max-w-2xl mx-auto mb-10 md:mb-14 text-center px-2">
          <h3 className="font-editorial text-[#fdf9dc] text-2xl sm:text-3xl md:text-4xl mb-3">
            Let's Craft Your Wedding Story Together
          </h3>
          <p className="font-neue-light text-[#fdf9dc] text-sm sm:text-base md:text-lg leading-relaxed">
            Ready to discuss your vision and create something extraordinary?
            <br className="hidden sm:block" />
            We're excited to connect with you!
          </p>
        </div>

        {/* Form */}
        <form className="bg-transparent text-[#fdf9dc] w-full max-w-3xl mx-auto font-neue-light text-left">

          {/* FIX: First/last name - stacked on mobile, side-by-side on sm+ */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
            <div className="flex-1 flex flex-col">
              <label className="mb-2 text-sm font-neue-medium">
                First name(s)
              </label>
              <input
                type="text"
                className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-3 px-1 focus:outline-none font-neue-light placeholder:text-[#fdf9dc]/30"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="mb-2 text-sm font-neue-medium">Last name</label>
              <input
                type="text"
                className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-3 px-1 focus:outline-none font-neue-light placeholder:text-[#fdf9dc]/30"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-col">
            <label className="mb-2 text-sm font-neue-medium">Your e-mail</label>
            <input
              type="email"
              className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-3 px-1 focus:outline-none font-neue-light placeholder:text-[#fdf9dc]/30"
            />
          </div>

          <div className="mb-6 flex flex-col">
            <label className="mb-2 text-sm font-neue-medium">Subject</label>
            <input
              type="text"
              className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-3 px-1 focus:outline-none font-neue-light placeholder:text-[#fdf9dc]/30"
            />
          </div>

          <div className="mb-6 flex flex-col">
            <label className="mb-2 text-sm font-neue-medium leading-snug">
              Tell me everything! Or at least what's relevant to my photography
              service.
            </label>
            <textarea
              className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-3 px-1 focus:outline-none min-h-[120px] md:min-h-[150px] font-neue-light resize-none"
            />
          </div>

          {/* Privacy checkbox - FIX: larger tap target on mobile */}
          <div className="mb-6 flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="accent-[#fdf9dc] w-5 h-5 mt-0.5 flex-shrink-0 bg-[#41453D] border-[#fdf9dc] rounded cursor-pointer"
            />
            <span className="font-neue-light text-sm sm:text-base leading-relaxed">
              I agree with the{" "}
              <a href="#" className="underline">
                privacy policy
              </a>
              .
            </span>
          </div>

          <div className="mb-6 text-xs font-neue-light text-[#fdf9dc]/60 leading-relaxed">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </div>

          {/* FIX: full-width button already set, added py for touch friendliness */}
          <Button variant="filled" className="w-full py-3">
            Send
          </Button>
        </form>

        {/* FIX: wave SVG viewBox corrected to match path extent (0 to 1440) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 130"
            className="w-full h-[70px] sm:h-[90px] md:h-[100px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120 
                 C200,160 350,40 520,80
                 C700,120 900,30 1100,70
                 C1250,100 1350,70 1440,90
                 L1440,180
                 L0,180 Z"
              fill="#fdf9dc"
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default Contact;
"use client";

import React, { useState } from "react";
import Button from "../components/button";
import Navbar from "../components/navbar";

const Contact = () => {
  const [isPlanner, setIsPlanner] = useState(false);
  const [isWorkingWithPlanner, setIsWorkingWithPlanner] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <>
    <Navbar theme="light"/>
      <section className="bg-[#41453D] pt-32">
        <div className="max-w-8xl mx-auto px-7 ">
          <div className="flex flex-col md:flex-row items-start justify-center pt-3">
            <div className="flex-1 flex flex-col justify-center md:pr-8">
              <h2 className="font-editorial text-[#fdf9dc] text-5xl md:text-6xl mb-8">
                Say hi!
              </h2>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="font-neue-light text-[#fdf9dc] text-lg md:text-xl mb-8 max-w-3xl">
                You've made it all the way to the contact page, congrats! If
                you've made it this far, chances are something felt a little
                different. Whether you're ready to book or you need a little
                more info, I'm excited to hear what I can do for you!
                <br />
                <br />
                If you feel like creating magic together, please fill out the
                form below and I will get back to you within 3 - 4 days.
                <br />
                <br />
                Feel like technology has failed upon us? Send me an e-mail
                through{" "}
                <a href="mailto:info@houseofbliss.co.in" className="underline">
                  info@houseofbliss.co.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full min-h-screen bg-[#41453D] flex flex-col items-center justify-center px-4 py-16 pb-20">
        {/* Say hi and info */}

        {/* Headline above form */}
        <div className="w-full max-w-2xl mx-auto mb-18 text-left">
          <h3 className="font-editorial text-[#fdf9dc] text-3xl md:text-4xl mb-2 text-center">
            Let's Craft Your Wedding Story Together
          </h3>
          <p className="font-neue-light text-[#fdf9dc] text-lg md:text-md text-center">
            Ready to discuss your vision and create something extraordinary?
            <br />
            We're excited to connect with you!
          </p>
        </div>
        {/* Form below Say hi section */}
        <form className="bg-transparent text-[#fdf9dc] w-full max-w-3xl mx-auto font-neue-light text-left">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 flex flex-col">
              <label className="mb-2 text-sm font-neue-medium">
                First name(s)
              </label>
              <input
                type="text"
                className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-2 px-3 focus:outline-none font-neue-light"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="mb-2 text-sm font-neue-medium">Last name</label>
              <input
                type="text"
                className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-2 px-3 focus:outline-none font-neue-light"
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col">
            <label className="mb-2 text-sm font-neue-medium">Your e-mail</label>
            <input
              type="email"
              className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-2 px-3 focus:outline-none font-neue-light"
            />
          </div>
          <div className="mb-6 flex flex-col">
            <label className="mb-2 text-sm font-neue-medium">
             Subject
            </label>
             <input
              type="text"
              className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-2 px-3 focus:outline-none font-neue-light"
            />
           
          </div>
          <div className="mb-6 flex flex-col">
            <label className="mb-2 text-sm font-neue-medium">
              Tell me everything! Or at least what's relevant to my photography
              service.
            </label>
            <textarea className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-2 px-3 focus:outline-none min-h-[120px] font-neue-light" />
          </div>
          {/* <div className="flex gap-4 mb-6">
            <div className="flex-1 flex flex-col">
              <label className="mb-2 text-sm font-neue-medium">
                Location - if known (optional)
              </label>
              <input
                type="text"
                className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-2 px-3 focus:outline-none font-neue-light"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="mb-2 text-sm font-neue-medium">
                Date - if known (optional)
              </label>
              <input
                type="text"
                className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-2 px-3 focus:outline-none font-neue-light"
              />
            </div>
          </div> */}
          {/* <div className="mb-6 flex flex-col">
            <label className="mb-2 text-sm font-neue-medium">
              Wedding planner (optional)
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isWorkingWithPlanner}
                  onChange={() =>
                    setIsWorkingWithPlanner(!isWorkingWithPlanner)
                  }
                  className="accent-[#fdf9dc] w-5 h-5 bg-[#41453D] border-[#fdf9dc] rounded"
                />
                <span className="font-neue-light">
                  I'm working with a wedding planner for my event
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isPlanner}
                  onChange={() => setIsPlanner(!isPlanner)}
                  className="accent-[#fdf9dc] w-5 h-5 bg-[#41453D] border-[#fdf9dc] rounded"
                />
                <span className="font-neue-light">I am a wedding planner</span>
              </label>
            </div>
          </div> */}
          {/* <div className="mb-6 flex flex-col">
            <label className="mb-2 text-sm font-neue-medium">
              What's your greatest adventure in yet? (optional)
            </label>
            <textarea className="bg-transparent border-b border-[#fdf9dc] text-[#fdf9dc] py-2 px-3 focus:outline-none min-h-[80px] font-neue-light" />
          </div> */}
          <div className="mb-6 flex items-center gap-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="accent-[#fdf9dc] w-5 h-5 bg-[#41453D] border-[#fdf9dc] rounded"
            />
            <span className="font-neue-light">
              I agree with the{" "}
              <a href="#" className="underline">
                privacy policy
              </a>
              .
            </span>
          </div>
          <div className="mb-6 text-xs font-neue-light">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </div>
          <Button variant="filled" className="w-full">
            Send
          </Button>
        </form>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="220 10 1140 100"
            className="w-full h-[100px]"
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

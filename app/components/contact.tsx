"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

/* ── Success popup ── */
function SuccessPopup({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 600);
    }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ background: "rgba(65,69,61,0.55)", backdropFilter: "blur(6px)" }}
    >
      <div
        className={`relative flex flex-col items-center gap-5 px-12 py-10 rounded-sm transition-all duration-500
          ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}`}
        style={{
          background: "rgba(65,69,61,0.45)",
          border: "1px solid rgba(253,249,220,0.18)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
        }}
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="absolute inset-0 w-16 h-16" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(253,249,220,0.25)" strokeWidth="1.5" />
            <circle
              cx="32" cy="32" r="28"
              fill="none" stroke="#fdf9dc" strokeWidth="1.5"
              strokeDasharray="176" strokeDashoffset={visible ? 0 : 176}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.9s cubic-bezier(0.22,0.68,0,1.1) 0.1s",
                transform: "rotate(-90deg)",
                transformOrigin: "center",
              }}
            />
          </svg>
          <svg
            width="22" height="22" viewBox="0 0 22 22" fill="none"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.5)",
              transition: "all 0.4s cubic-bezier(0.22,0.68,0,1.1) 0.7s",
            }}
          >
            <path d="M4 11.5L9 16.5L18 6" stroke="#fdf9dc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="text-center">
          <p className="font-editorial text-[#fdf9dc] text-2xl mb-1">Message Sent</p>
          <p className="font-neue-light text-[#fdf9dc]/60 text-xs tracking-widest uppercase">
            We'll be in touch within 3–4 days
          </p>
        </div>

        <div className="w-full h-px bg-[#fdf9dc]/10 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-[#fdf9dc]/40 rounded-full"
            style={{
              width: visible ? "0%" : "100%",
              transition: visible ? "width 3s linear" : "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Spinner ── */
function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

/* ── Main component ── */
const Contact = () => {
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", subject: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ KEY FIX: explicit e.preventDefault() + e.stopPropagation() at the very top
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setError("");

    if (!agreed) {
      setError("You must agree to the privacy policy.");
      return;
    }

    setLoading(true);

    try {
      const { error: sbError } = await supabase.from("contact").insert([{
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      }]);

      if (sbError) {
        setError("Submission failed. Please try again.");
      } else {
        setForm({ first_name: "", last_name: "", email: "", subject: "", message: "" });
        setAgreed(false);
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = `
    w-full bg-transparent border-b border-[#fdf9dc]/60 text-[#fdf9dc]
    py-3 px-1 focus:outline-none focus:border-[#fdf9dc]
    font-neue-light placeholder:text-[#fdf9dc]/30
    transition-colors duration-200
    [color-scheme:dark]
    [-webkit-text-fill-color:#fdf9dc]
    [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#41453D]
    [&:-webkit-autofill]:[-webkit-text-fill-color:#fdf9dc]
    [&:-webkit-autofill:focus]:shadow-[inset_0_0_0_1000px_#41453D]
    [&:-webkit-autofill:hover]:shadow-[inset_0_0_0_1000px_#41453D]
  `;

  return (
    <>
      {showPopup && <SuccessPopup onDone={() => setShowPopup(false)} />}

      {/* Hero */}
      <section className="bg-black/90">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start justify-center pt-8 md:pt-3 gap-6 md:gap-0">
            <div className="flex-1 flex flex-col justify-center md:pr-8">
              <h2 className="font-editorial text-[#fdf9dc] text-4xl sm:text-5xl md:text-6xl mb-4 md:mb-8">
                Say hi!
              </h2>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="font-neue-light text-[#fdf9dc] text-base md:text-lg lg:text-xl mb-6 md:mb-8">
                You've made it all the way to the contact page, congrats! If
                you've made it this far, chances are something felt a little
                different. Whether you're ready to book or you need a little
                more info, I'm excited to hear what I can do for you!
                <br /><br />
                If you feel like creating magic together, please fill out the
                form below and I will get back to you within 3–4 days.
                <br /><br />
                <a href="mailto:info@houseofbliss.co.in" className="underline break-all">
                  info@houseofbliss.co.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="relative w-full min-h-screen bg-black/90 flex flex-col items-center justify-center px-4 md:px-8 py-12 md:py-16 pb-28 md:pb-32">

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

        {/* ✅ onSubmit on the <form> tag, NOT on the button */}
        <form
          onSubmit={handleSubmit}
          noValidate={false}
          className="bg-transparent text-[#fdf9dc] w-full max-w-3xl mx-auto font-neue-light text-left"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
            <div className="flex-1 flex flex-col">
              <label className="mb-2 text-sm font-neue-medium">First name(s)</label>
              <input type="text" name="first_name" value={form.first_name}
                onChange={handleChange} className={inputCls} required />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="mb-2 text-sm font-neue-medium">Last name</label>
              <input type="text" name="last_name" value={form.last_name}
                onChange={handleChange} className={inputCls} required />
            </div>
          </div>

          <div className="mb-6 flex flex-col">
            <label className="mb-2 text-sm font-neue-medium">Your e-mail</label>
            <input type="email" name="email" value={form.email}
              onChange={handleChange} className={inputCls} required />
          </div>

          <div className="mb-6 flex flex-col">
            <label className="mb-2 text-sm font-neue-medium">Subject</label>
            <input type="text" name="subject" value={form.subject}
              onChange={handleChange} className={inputCls} required />
          </div>

          <div className="mb-6 flex flex-col">
            <label className="mb-2 text-sm font-neue-medium leading-snug">
              Tell us everything! Or at least what's relevant to our service.
            </label>
            <textarea name="message" value={form.message} onChange={handleChange}
              className={`${inputCls} min-h-[120px] md:min-h-[150px] resize-none`} required />
          </div>

          <div className="mb-6 flex items-start gap-3">
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)}
              className="accent-[#fdf9dc] w-5 h-5 mt-0.5 flex-shrink-0 cursor-pointer" />
            <span className="font-neue-light text-sm sm:text-base leading-relaxed">
              I agree with the{" "}
              <a href="#" className="underline">privacy policy</a>.
            </span>
          </div>

          <div className="mb-6 text-xs font-neue-light text-[#fdf9dc]/60 leading-relaxed">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </div>

          {/* ✅ Native <button type="submit"> — no custom Button component to misfire */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-4 flex items-center justify-center gap-2
              bg-[#fdf9dc] text-[#41453D]
              font-neue-regular text-sm tracking-widest 
              transition-all duration-300
              hover:bg-[#f0eccc] active:scale-[0.99]
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? <><Spinner /> Sending...</> : "Send"}
          </button>

          {error && (
            <div className="mt-4 text-red-400 text-center font-neue-light text-sm">{error}</div>
          )}
        </form>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 130" className="w-full h-[70px] sm:h-[90px] md:h-[100px]" preserveAspectRatio="none">
            <path
              d="M0,120 C200,160 350,40 520,80 C700,120 900,30 1100,70 C1250,100 1350,70 1440,90 L1440,180 L0,180 Z"
              fill="#fdf9dc"
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default Contact;
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "../components/navbar";

/* ── palette ── */
const BG = "#0C0C0C"; // near-black, not pure
const SURFACE = "#141414"; // card / input bg
const INK = "#F5F0E8"; // warm white
const INK_MID = "rgba(245,240,232,0.6)";
const INK_LOW = "rgba(245,240,232,0.35)";
const BORDER = "rgba(245,240,232,0.12)";
const BORDER_FOCUS = "rgba(245,240,232,0.55)";
const GOLD = "#B8965A"; // accent
const GOLD_DIM = "rgba(184,150,90,0.18)";

/* ── Success popup ── */
function SuccessPopup({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 600);
    }, 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ background: "rgba(12,12,12,0.75)", backdropFilter: "blur(8px)" }}
    >
      <div
        className={`relative flex flex-col items-center gap-5 px-12 py-10 transition-all duration-500
          ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}`}
        style={{
          background: "#181510",
          border: `1px solid ${GOLD}`,
          boxShadow: `0 0 60px rgba(184,150,90,0.15), 0 24px 64px rgba(0,0,0,0.6)`,
        }}
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="absolute inset-0 w-16 h-16" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke={BORDER}
              strokeWidth="1.5"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke={GOLD}
              strokeWidth="1.5"
              strokeDasharray="176"
              strokeDashoffset={visible ? 0 : 176}
              strokeLinecap="round"
              style={{
                transition:
                  "stroke-dashoffset 0.9s cubic-bezier(0.22,0.68,0,1.1) 0.1s",
                transform: "rotate(-90deg)",
                transformOrigin: "center",
              }}
            />
          </svg>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.5)",
              transition: "all 0.4s cubic-bezier(0.22,0.68,0,1.1) 0.7s",
            }}
          >
            <path
              d="M4 11.5L9 16.5L18 6"
              stroke={GOLD}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="font-editorial text-2xl mb-1" style={{ color: INK }}>
            Message Sent
          </p>
          <p
            className="font-neue-light text-xs tracking-widest uppercase"
            style={{ color: INK_MID }}
          >
            We'll be in touch within 3–4 days
          </p>
        </div>
        <div
          className="w-full h-px rounded-full overflow-hidden mt-2"
          style={{ background: BORDER }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: GOLD,
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
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/* ── Field — fully bordered input ── */
function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  required?: boolean;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;

  const base: React.CSSProperties = {
    width: "100%",
    background: focused ? "#181818" : SURFACE,
    border: `1px solid ${focused ? BORDER_FOCUS : BORDER}`,
    outline: "none",
    padding: textarea ? "14px 16px 10px" : "18px 16px 8px",
    fontFamily: "inherit",
    fontSize: "0.9rem",
    lineHeight: 1.6,
    color: INK,
    transition: "border-color 0.25s, background 0.25s",
    resize: "none",
    WebkitBoxShadow: `0 0 0 1000px ${focused ? "#181818" : SURFACE} inset`,
    WebkitTextFillColor: INK,
    caretColor: GOLD,
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Floating label inside the border */}
      <label
        style={{
          position: "absolute",
          top: focused || filled ? (textarea ? 6 : 7) : textarea ? 16 : "50%",
          transform:
            focused || filled ? "none" : textarea ? "none" : "translateY(-50%)",
          left: 16,
          fontSize: focused || filled ? "0.62rem" : "0.88rem",
          letterSpacing: focused || filled ? "0.18em" : "0.03em",
          textTransform: focused || filled ? "uppercase" : "none",
          color: focused ? GOLD : INK_LOW,
          transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
          fontFamily: "inherit",
          fontWeight: 300,
          zIndex: 1,
        }}
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, paddingTop: 24 }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete="on"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={base}
        />
      )}

      {/* Gold bottom accent line on focus */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: focused ? "0%" : "50%",
          right: focused ? "0%" : "50%",
          height: 1,
          background: GOLD,
          transition:
            "left 0.35s cubic-bezier(0.4,0,0.2,1), right 0.35s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ── Main ── */
const Contact = () => {
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
      const { error: sbError } = await supabase.from("contact").insert([
        {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
      ]);
      if (sbError) {
        setError("Submission failed. Please try again.");
      } else {
        setForm({
          first_name: "",
          last_name: "",
          email: "",
          subject: "",
          message: "",
        });
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

  return (
    <>
    <Navbar theme="light" />
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px ${SURFACE} inset !important;
          -webkit-text-fill-color: ${INK} !important;
          caret-color: ${GOLD} !important;
          transition: background-color 9999s ease-in-out 0s;
        }
        ::selection { background: rgba(184,150,90,0.2); }
      `}</style>

      {showPopup && <SuccessPopup onDone={() => setShowPopup(false)} />}

      <section
        className="relative w-full overflow-hidden"
        style={{ background: BG }}
      >
        <div className="max-w-8xl mx-auto px-6 md:px-16 py-16 md:py-32 flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          {/* ── LEFT ── */}
          <div className="flex-1 flex flex-col gap-10">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.35em] mb-3"
                style={{ color: GOLD }}
              >
                Get in touch
              </p>
              <div
                className="h-px w-10 mb-8"
                style={{ background: GOLD_DIM }}
              />
              <h2
                className="font-editorial font-serif leading-[0.92]"
                style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", color: INK }}
              >
                Say hi!
              </h2>
            </div>

            <p
              className="font-neue-light text-[0.92rem] leading-[1.9] max-w-sm"
              style={{ color: INK_MID }}
            >
              You've made it all the way to the contact page - congrats. If
              something felt a little different, we'd love to hear from you.
              Whether you're ready to book or just need a little more info,
              we're excited to connect.
            </p>

            {/* Email */}
            <a
              href="mailto:info@houseofbliss.co.in"
              className="group inline-flex items-center gap-3 w-fit"
              style={{
                color: INK_MID,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = INK_MID as string)
              }
            >
              <span className="font-neue-light text-[11px] uppercase tracking-[0.28em]">
                info@houseofbliss.co.in
              </span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            {/* Phone */}
              <div
              className="inline-flex items-center gap-3 font-neue-light text-[11px] uppercase tracking-[0.28em] -mt-6"
              style={{ color: INK_MID }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.29a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.06.35 2.16.59 3.29.72A2 2 0 0 1 21 18.91V21z" />
              </svg>
              +91 7892-052739{" "}
            </div>
            <div
              className="inline-flex items-center gap-3 font-neue-light text-[11px] uppercase tracking-[0.28em] -mt-6"
              style={{ color: INK_MID }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.29a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.06.35 2.16.59 3.29.72A2 2 0 0 1 21 18.91V21z" />
              </svg>
              +91 96630-41267
            </div>
          

            {/* ── Map — darkened with CSS filter ── */}
            <div
              className="overflow-hidden relative"
              style={{
                border: `1px solid ${BORDER}`,
              }}
            >
              {/* Dark overlay so map matches the dark theme */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(12,12,12,0.38)",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />
              <iframe
                title="House of Bliss Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019234!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDMuNiJF!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="260"
                style={{
                  border: 0,
                  display: "block",
                  filter:
                    "",
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* ── RIGHT: FORM ── */}
          <div className="flex-1 w-full">
            <div className="mb-10">
              <h3
                className="font-editorial font-serif leading-[1.05] mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: INK }}
              >
                Let's craft your
                <br />
                <em style={{ color: GOLD }}>wedding story</em> together.
              </h3>
              <p
                className="font-neue-light text-[0.85rem] tracking-wide"
                style={{ color: INK_MID }}
              >
                Ready to discuss your vision and create something extraordinary?
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <Field
                    label="First name(s)"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex-1">
                  <Field
                    label="Last name"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Field
                label="Email address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Field
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
              <Field
                label="Tell us everything - or at least what's relevant."
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                textarea
              />

              {/* Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group mt-1">
                <div
                  onClick={() => setAgreed((a) => !a)}
                  style={{
                    width: 17,
                    height: 17,
                    flexShrink: 0,
                    marginTop: 2,
                    border: `1px solid ${agreed ? GOLD : BORDER}`,
                    background: agreed ? GOLD_DIM : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                >
                  {agreed && (
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1.5 5L4 7.5L8.5 2.5"
                        stroke={GOLD}
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className="font-neue-light text-[0.82rem] leading-relaxed"
                  style={{ color: INK_MID }}
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    style={{
                      color: INK,
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    privacy policy
                  </a>
                  .
                </span>
              </label>

              {/* reCAPTCHA note */}
              <p
                className="text-[10px] font-neue-light leading-relaxed -mt-2"
                style={{ color: INK_LOW }}
              >
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>

              {/* ── Submit button — elegant outlined with gold accent ── */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "15px 0",
                  background: "transparent",
                  color: INK,
                  border: `1px solid ${BORDER_FOCUS}`,
                  fontFamily: "inherit",
                  fontSize: "0.7rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.5 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.3s ease",
                  marginTop: 6,
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.borderColor = GOLD;
                    e.currentTarget.style.color = GOLD;
                    e.currentTarget.style.background = GOLD_DIM;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = BORDER_FOCUS;
                  e.currentTarget.style.color = INK;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {loading ? (
                  <>
                    <Spinner /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {error && (
                <p
                  className="text-center font-neue-light text-xs mt-1"
                  style={{ color: "#E8A87C" }}
                >
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

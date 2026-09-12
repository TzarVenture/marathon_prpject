import React, { useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaEnvelope,
  FaGlobe,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheck,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ComingSoonFooter = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = (e) => {
    // Security: Disallow spaces and restrict length
    const clean = e.target.value.replace(/\s/g, "").slice(0, 80);
    setEmail(clean);
    if (emailError) {
      if (emailRegex.test(clean)) {
        setEmailError("");
      }
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 5000);
  };

  return (
    <footer className="w-full bg-[#080808] text-white select-none">
      {/* Top Heritage Golden Border Line */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#cca043]/40 to-transparent" />

      {/* Main 3-Column Content Container (100% Full Width with Symmetrical Spacing) */}
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-12 lg:py-14">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-6">
          
          {/* ====================================================
              COLUMN 1: STAY CONNECTED (Left Column - Symmetric Width)
              ==================================================== */}
          <div className="order-2 lg:order-1 w-full lg:w-[280px] xl:w-[300px] shrink-0 flex flex-col items-start text-left">
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-[0.16em] text-[#d49a37]">
              STAY CONNECTED
            </h3>
            <p className="text-xs sm:text-[13px] text-neutral-300 font-medium mt-1 mb-3.5 leading-snug">
              Be the first to know when registrations open!
            </p>

            {/* Email Subscription Capsule (Compact Size) */}
            <form
              onSubmit={handleSubscribe}
              className={`w-full max-w-[270px] sm:max-w-[285px] bg-white rounded-full p-1 pl-3 flex items-center shadow-md transition-all ${
                emailError
                  ? "ring-2 ring-red-500"
                  : "focus-within:ring-2 focus-within:ring-[#b91c1c]/50"
              }`}
            >
              <input
                type="email"
                required
                maxLength={80}
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email address"
                className="w-full bg-transparent text-neutral-900 placeholder:text-neutral-400 text-xs font-medium outline-none pr-1.5 min-w-0"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 active:scale-95 shadow cursor-pointer flex items-center gap-1"
              >
                {subscribed ? (
                  <>
                    <FaCheck className="text-[9px]" />
                    <span>DONE</span>
                  </>
                ) : (
                  <span>SUBSCRIBE</span>
                )}
              </button>
            </form>

            {/* Email Error Notice */}
            {emailError && (
              <p className="text-[10.5px] text-red-400 font-medium mt-1.5">
                {emailError}
              </p>
            )}

            {/* Subscription feedback confirmation */}
            {subscribed && (
              <p className="text-[11px] sm:text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1.5 animate-fadeIn">
                <FaCheck /> Thank you! We will notify you when registrations open.
              </p>
            )}

            {/* Social Media Circular Badges (5 white circles) */}
            <div className="flex items-center gap-2.5 sm:gap-3 mt-4 sm:mt-5">
              {[
                {
                  icon: FaInstagram,
                  label: "Instagram",
                  href: "https://www.instagram.com/rajgirmarathon",
                },
                {
                  icon: FaFacebookF,
                  label: "Facebook",
                  href: "https://www.facebook.com/rajgirmarathon",
                },
                {
                  icon: FaXTwitter,
                  label: "X (Twitter)",
                  href: "https://x.com/Rajgirmarathon",
                },
                {
                  icon: FaYoutube,
                  label: "YouTube",
                  href: "https://www.youtube.com/@rajgirmarathon",
                },
                {
                  icon: FaLinkedinIn,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/rajgir-marathon",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center text-xs sm:text-sm hover:scale-115 hover:bg-[#d49a37] hover:text-white transition-all duration-200 shadow cursor-pointer"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ====================================================
              COLUMN 2: CENTER ARTWORK ("Run Through History")
              ==================================================== */}
          <div className="order-1 lg:order-2 flex items-center justify-center px-2 py-1 flex-1 max-w-[340px] sm:max-w-[370px] lg:max-w-[400px]">
            <img
              src="/images/footer_run_through_history.png"
              alt="Rajgir Marathon - Run Through History"
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </div>

          {/* ====================================================
              COLUMN 3: ORGANISED BY & CONTACT DETAILS (Right Column - Symmetric Width)
              ==================================================== */}
          <div className="order-3 lg:order-3 w-full lg:w-[280px] xl:w-[300px] shrink-0 flex flex-col items-start text-left">
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-[0.16em] text-[#d49a37] mb-2 sm:mb-2.5">
              ORGANISED BY
            </h3>

            {/* Contact Details List with Golden Icons */}
            <div className="flex flex-col gap-2 sm:gap-2.5 text-xs sm:text-[13px] text-neutral-200">
              {/* Email */}
              <a
                href="mailto:rajgirmarathon@gmail.com"
                className="flex items-center gap-2.5 hover:text-[#d49a37] transition-colors"
              >
                <FaEnvelope className="text-[#d49a37] text-sm shrink-0" />
                <span className="font-medium">rajgirmarathon@gmail.com</span>
              </a>

              {/* Website */}
              <a
                href="https://www.rajgirmarathon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#d49a37] transition-colors"
              >
                <FaGlobe className="text-[#d49a37] text-sm shrink-0" />
                <span className="font-medium">www.rajgirmarathon.com</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+918882520326"
                className="flex items-center gap-2.5 hover:text-[#d49a37] transition-colors"
              >
                <FaPhoneAlt className="text-[#d49a37] text-sm shrink-0" />
                <span className="font-medium">+91 8882520326</span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-[#d49a37] text-sm shrink-0" />
                <span className="font-medium">Rajgir, Bihar, India</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ====================================================
          BOTTOM RED BANNER (Clean Red Strip Only - No Structure)
          ==================================================== */}
      <div
        className="w-full py-3.5 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-center font-extrabold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm text-white shadow-xl"
        style={{
          background: "linear-gradient(90deg, #990f17 0%, #d62828 50%, #990f17 100%)",
          borderTop: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <p className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <span>RAJGIR MARATHON</span>
          <span className="text-white/50">|</span>
          <span>COMING SOON</span>
          <span className="text-white/50">|</span>
          <span className="text-[#fde047]">
            RUN WITH PURPOSE. FINISH WITH PRIDE.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default ComingSoonFooter;

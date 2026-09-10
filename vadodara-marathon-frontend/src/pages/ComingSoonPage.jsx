import React from "react";

const IconMapPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconStadium = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="10" rx="10" ry="4" />
    <path d="M2 10v4c0 2.2 4.5 4 10 4s10-1.8 10-4v-4" />
  </svg>
);
const IconLandmark = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
);
const IconGlobe = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconUtensils = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);
const IconMusic = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);
const IconUsers = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const raceCategories = [
  { dist: "42.195 KM", name: "Full Marathon" },
  { dist: "21.1 KM",  name: "Half Marathon" },
  { dist: "10 KM",    name: "Heritage Run"  },
  { dist: "5 KM",     name: "Family Run"    },
  { dist: "3 KM",     name: "Kids Run"      },
  { dist: "Corporate",name: "Challenge"     },
  { dist: "Defence &",name: "Police Run"    },
];

const highlights = [
  { Icon: IconLandmark, label: "Heritage Route"        },
  { Icon: IconGlobe,    label: "Tourism & Culture"     },
  { Icon: IconUtensils, label: "Bihar Food Fest"        },
  { Icon: IconMusic,    label: "Music & Entertainment"  },
  { Icon: IconUsers,    label: "Community Engagement"   },
];

const ComingSoonPage = () => {
  return (
    <div
      style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#ffffff" }}
      className="relative min-h-screen w-full overflow-x-hidden flex flex-col"
    >

      {/* NAVBAR - Transparent floating header */}
      <header
        className="absolute top-0 left-0 z-30 w-full px-5 sm:px-10 py-4 flex items-center justify-between"
        style={{
          background: "linear-gradient(to bottom, rgba(5,3,1,0.65) 0%, rgba(5,3,1,0) 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/95 rounded-xl p-1 shadow-lg shadow-black/30 flex items-center justify-center backdrop-blur-sm">
            <img
              src="/images/mainLogo.png"
              alt="Rajgir Marathon Logo"
              className="h-11 sm:h-14 w-auto object-contain rounded-lg"
            />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-white font-black text-base sm:text-lg tracking-wider leading-tight">
              RAJGIR MARATHON
            </span>
            <span className="text-[#f4b98a] text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
              Run Through History
            </span>
          </div>
        </div>

        <div
          className="flex items-center px-4 py-1.5"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.25)",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
          }}
        >
          <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-white">
            Edition 2026
          </span>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative flex-1 flex flex-col justify-center items-center overflow-hidden pt-24 sm:pt-28 pb-10 sm:pb-16"
        style={{ minHeight: "100vh" }}
      >
        {/* Desktop background image */}
        <div className="absolute inset-0 hidden sm:block">
          <img
            src="/images/desktopHero.png"
            alt="Rajgir Marathon Hero Desktop"
            className="w-full h-full object-cover object-center"
          />
          {/* Centered dark gradient overlay for optimal text contrast across the center */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(5,3,1,0.76) 0%, rgba(5,3,1,0.84) 55%, rgba(5,3,1,0.92) 100%)"
            }}
          />
        </div>

        {/* Mobile background image */}
        <div className="absolute inset-0 block sm:hidden">
          <img
            src="/images/mobileHero.png"
            alt="Rajgir Marathon Hero Mobile"
            className="w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(5,3,1,0.78)" }}
          />
        </div>

        {/* ALL CONTENT: centered column */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 py-6 sm:py-8 flex flex-col items-center text-center">
          
          {/* Location chip */}
          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-4"
            style={{
              background: "rgba(255,243,237,0.12)",
              border: "1px solid rgba(244,185,138,0.45)",
              borderRadius: "999px",
              color: "#f4b98a",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <IconMapPin />
            <span>Rajgir, Bihar, India</span>
          </div>

          {/* Tagline */}
          <p className="text-xs sm:text-sm font-semibold uppercase mb-2" style={{ color: "#f07040", letterSpacing: "0.14em" }}>
            Run Through 2,500 Years of History
          </p>

          {/* Main heading */}
          <div className="mb-2">
            <h1 className="font-black leading-none tracking-tight mb-1" style={{ fontSize: "clamp(3.2rem,8.5vw,6.5rem)", color: "#ffffff" }}>
              RAJGIR
            </h1>
            <h2 className="font-black leading-none tracking-tight" style={{ fontSize: "clamp(2.6rem,7vw,5rem)", color: "#e8540a" }}>
              MARATHON
            </h2>
          </div>

          {/* HIGH-VISIBILITY HERO "COMING SOON" SHOWCASE */}
          <div className="my-6 sm:my-8 flex flex-col items-center">
            <div
              className="relative inline-flex items-center justify-center px-6 sm:px-14 py-2.5 sm:py-4"
              style={{
                background: "linear-gradient(135deg, #ff6b1a 0%, #e8540a 50%, #c44a00 100%)",
                border: "2px solid rgba(255, 255, 255, 0.5)",
                borderRadius: "999px",
                boxShadow: "0 0 45px rgba(232, 84, 10, 0.8), 0 10px 30px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                className="font-black tracking-[0.16em] sm:tracking-[0.22em] uppercase text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]"
                style={{ fontSize: "clamp(1.15rem, 4vw, 2.5rem)" }}
              >
                COMING SOON
              </span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase text-[#f4b98a] mt-3 drop-shadow-md">
              Official Registrations Opening Soon
            </p>
          </div>

          {/* Sub-tagline pill & Venue */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <div className="inline-flex items-center px-4 py-2" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px", backdropFilter: "blur(8px)" }}>
              <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-white">
                Run Where History Lives
              </span>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "999px",
                backdropFilter: "blur(8px)",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              <span style={{ color: "#e8540a" }}><IconStadium /></span>
              <span>Rajgir Sports Complex</span>
            </div>
          </div>

          {/* Info cards: side by side, centered */}
          <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-4 text-left">

            {/* Race Categories */}
            <div
              className="rounded-2xl p-4 flex-1"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
              }}
            >
              <p className="text-xs font-bold tracking-widest uppercase mb-3 text-center sm:text-left" style={{ color: "rgba(255,255,255,0.45)" }}>
                Race Categories
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {raceCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-start px-2.5 py-2"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: "8px",
                    }}
                  >
                    <span className="font-black text-xs leading-tight" style={{ color: "#ffffff" }}>
                      {cat.dist}
                    </span>
                    <span className="text-xs font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.48)" }}>
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Highlights */}
            <div
              className="rounded-2xl p-4 flex-1"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
              }}
            >
              <p className="text-xs font-bold tracking-widest uppercase mb-3 text-center sm:text-left" style={{ color: "rgba(255,255,255,0.45)" }}>
                Event Highlights
              </p>
              <div className="flex flex-col gap-2.5">
                {highlights.map(({ Icon, label }, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                      style={{ background: "rgba(232,84,10,0.18)", color: "#e8540a" }}
                    >
                      <Icon />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold" style={{ color: "rgba(255,255,255,0.82)" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER - white bg to match logo */}
      <footer
        className="relative z-10 px-5 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2"
        style={{ background: "#ffffff", borderTop: "1px solid #ebe9e4" }}
      >
        <p className="text-xs sm:text-sm font-black tracking-widest text-center sm:text-left uppercase">
          <span style={{ color: "#e8540a" }}>One Run. </span>
          <span style={{ color: "#1a1410" }}>One Destination. </span>
          <span style={{ color: "#c44a00" }}>Endless Memories.</span>
        </p>
        <div className="flex items-center gap-3 text-xs font-semibold" style={{ color: "#9a8880" }}>
          <span style={{ color: "#e8540a" }}>#RajgirMarathon</span>
          <span style={{ color: "#d0cbc7" }}>|</span>
          <span>&#169; {new Date().getFullYear()} Rajgir Marathon</span>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoonPage;
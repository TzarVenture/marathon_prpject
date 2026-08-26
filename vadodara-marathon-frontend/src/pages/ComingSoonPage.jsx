import React from "react";

const IconMapPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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

      {/* NAVBAR - white bg to match logo */}
      <header
        className="relative z-30 w-full px-5 sm:px-10 py-3 flex items-center justify-between"
        style={{ background: "#ffffff", borderBottom: "1px solid #ebe9e4" }}
      >
        <div className="flex items-center">
          <img
            src="/images/mainLogo.png"
            alt="Rajgir Marathon Logo"
            className="h-14 sm:h-16 w-auto object-contain"
          />
        </div>

        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{ border: "1.5px solid #e8540a", borderRadius: "999px", background: "#fff8f5" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#e8540a" }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#e8540a" }} />
          </span>
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase" style={{ color: "#e8540a" }}>
            Coming Soon
          </span>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative flex-1 flex flex-col justify-center overflow-hidden"
        style={{ minHeight: "calc(100vh - 68px)" }}
      >
        {/* Desktop background image */}
        <div className="absolute inset-0 hidden sm:block">
          <img
            src="/images/desktopHero.png"
            alt="Rajgir Marathon Hero Desktop"
            className="w-full h-full object-cover object-center"
          />
          {/* Left-to-right dark gradient: dark left, fading to transparent right */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(5,3,1,0.88) 0%, rgba(5,3,1,0.72) 30%, rgba(5,3,1,0.38) 60%, rgba(5,3,1,0.05) 100%)"
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
            style={{ background: "rgba(5,3,1,0.72)" }}
          />
        </div>

        {/* ALL CONTENT: left-aligned column */}
        <div className="relative z-10 w-full px-5 sm:px-10 lg:px-16 py-8 sm:py-10">
          <div className="max-w-2xl">

            {/* Location chip */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4"
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
            <h1 className="font-black leading-none tracking-tight mb-0" style={{ fontSize: "clamp(3.2rem,9vw,7rem)", color: "#ffffff" }}>
              RAJGIR
            </h1>
            <h2 className="font-black leading-none tracking-tight mb-5" style={{ fontSize: "clamp(2.6rem,7.5vw,5.5rem)", color: "#e8540a" }}>
              MARATHON
            </h2>

            {/* Sub-tagline pill */}
            <div className="inline-block px-5 py-2 mb-6" style={{ background: "#e8540a", borderRadius: "999px" }}>
              <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase" style={{ color: "#ffffff" }}>
                Run Where History Lives
              </span>
            </div>

            {/* Key Info pills */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {[
                { icon: <IconCalendar />, text: "Coming Soon - 2026" },
                { icon: <IconStadium />,  text: "Rajgir Sports Complex" },
              ].map(({ icon, text }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "12px",
                    backdropFilter: "blur(8px)",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "#e8540a" }}>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Info cards: side by side below text */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Race Categories */}
              <div
                className="rounded-2xl p-4 flex-1"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
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
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
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
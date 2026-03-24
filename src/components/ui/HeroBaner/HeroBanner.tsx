import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const BubblesParticles = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 120,
      particles: {
        number: { value: 66, density: { enable: true, area: 800 } },
        color: {
          value: ["#FF6A00", "#FF8C00", "#FF4500", "#1a1a1a", "#2d2d2d", "#FF3D00"],
        },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.3, max: 0.85 },
          animation: { enable: true, speed: 0.8, minimumValue: 0.2, sync: false },
        },
        size: {
          value: { min: 8, max: 32 },
          animation: { enable: true, speed: 2, minimumValue: 6, sync: false },
        },
        move: {
          enable: true,
          speed: 1.4,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "bounce" },
        },
        shadow: { enable: true, color: "#FF6A00", blur: 7 },
        stroke: { width: 1, color: "#FF6A00", opacity: 0.5 },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "bubble" },
          onClick: { enable: false },
        },
        modes: {
          bubble: { distance: 180, size: 45, duration: 2, opacity: 1, color: "#FF8C00" },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;600&display=swap"
        rel="stylesheet"
      />

      <div className="relative w-full overflow-hidden bg-[#0a0a0a] h-[550px]">

        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{ background: "linear-gradient(90deg, transparent 0%, #FF6A00 40%, #FF3D00 60%, transparent 100%)" }}
        />

        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[70%] h-40 z-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,106,0,0.22) 0%, transparent 70%)" }}
        />

        {init && (
          <Particles
            id="tsparticles"
            options={options}
            className="absolute inset-0 w-full h-full z-[1]"
          />
        )}

        <div
          className="relative z-[2] flex flex-col items-center justify-center h-full px-6 text-center"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[3px] uppercase text-[#FF6A00] rounded-full px-[18px] py-[5px] mb-6 backdrop-blur-sm border border-[rgba(255,106,0,0.4)] bg-[rgba(255,106,0,0.07)]">
            ✦ Online Freelance Platform
          </span>

          <h1
            className="m-0 leading-[0.95] tracking-widest text-[#f0f0f0]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 9vw, 96px)" }}
          >
            WORK SMARTER.
            <br />
            <span
              style={{
                color: "#FF6A00",
                textShadow: "0 0 30px rgba(255,106,0,0.7), 0 0 60px rgba(255,106,0,0.3)",
              }}
            >
              SYNC FASTER.
            </span>
          </h1>

          <p
            className="font-light text-[rgba(240,240,240,0.55)] max-w-[500px] leading-relaxed mt-[18px] mb-10 tracking-wide"
            style={{ fontSize: "clamp(14px, 2vw, 17px)" }}
          >
            SyncWork connects top freelancers with ambitious projects —
            real-time collaboration, seamless contracts, and instant payments.
            All in one place.
          </p>

          <button
            className="
              inline-flex items-center gap-2.5 px-9 py-3.5
              text-sm font-semibold tracking-widest uppercase
              text-[#0a0a0a] rounded border-0 cursor-pointer
              transition-all duration-200 ease-in-out
              hover:-translate-y-0.5 active:translate-y-0
              shadow-[0_0_20px_rgba(255,106,0,0.4),0_4px_16px_rgba(0,0,0,0.5)]
              hover:shadow-[0_0_32px_rgba(255,106,0,0.65),0_8px_24px_rgba(0,0,0,0.5)]
            "
            style={{ background: "linear-gradient(135deg, #FF6A00 0%, #FF3D00 100%)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Start for Free
          </button>
        </div>
      </div>
    </>
  );
};

export default BubblesParticles;
import { useEffect, useState } from "react";

const LoadingScreen = ({ duration = 2200 }: { duration?: number }) => {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeT = setTimeout(() => setFading(true), duration - 600);
    const hideT = setTimeout(() => setHidden(true), duration);
    return () => {
      clearTimeout(fadeT);
      clearTimeout(hideT);
    };
  }, [duration]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-700 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.25), transparent 60%)",
        }}
      />

      {/* Shimmer ring */}
      <div className="absolute w-[320px] h-[320px] rounded-full border border-primary/20 animate-[spin_8s_linear_infinite]" />
      <div className="absolute w-[260px] h-[260px] rounded-full border border-primary/10 animate-[spin_12s_linear_infinite_reverse]" />

      <div className="relative flex flex-col items-center gap-6 animate-fade-in">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full" />
          <h1 className="relative font-serif text-6xl md:text-7xl text-gold tracking-[0.3em] bg-gradient-to-b from-primary via-primary/90 to-primary/50 bg-clip-text text-transparent">
            TILILA
          </h1>
        </div>

        <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-primary/70">
            Luxury · Elegance · Femininity
        </p>

        {/* Gold loading bar */}
        <div className="mt-4 relative w-48 h-px bg-primary/15 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-[loadingSlide_1.4s_ease-in-out_infinite]"
          />
        </div>
      </div>

      <style>{`
        @keyframes loadingSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;

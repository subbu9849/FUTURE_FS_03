import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 200);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 12;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 900);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 160);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-all duration-1000 ${
        fadeOut ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-terracotta/[0.04] rounded-full blur-[120px] animate-breathe" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sage/[0.04] rounded-full blur-[100px] animate-breathe" style={{ animationDelay: "2s" }} />
      </div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Logo mark — a camera aperture abstraction */}
        <div className={`relative transition-all duration-1000 ${showText ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <div className="w-16 h-16 rounded-full border-2 border-terracotta/30 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-terracotta animate-pulse" />
          </div>
          <div className="absolute -inset-3 rounded-full border border-terracotta/10 animate-gentle-spin" style={{ animationDuration: "20s" }} />
          <div className="absolute -inset-6 rounded-full border border-terracotta/[0.04] animate-gentle-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
        </div>

        <div className={`flex flex-col items-center gap-2 transition-all duration-700 delay-300 ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <h1 className="font-hero text-2xl tracking-[0.25em] text-ivory font-medium">
            SUBBU STUDIO
          </h1>
          <span className="text-[11px] tracking-[0.35em] text-terracotta/60 font-body uppercase font-medium">
            Fine Art Photography
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-56 h-[1.5px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300 ease-out rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, hsl(18 55% 48% / 0.4), hsl(18 55% 48%), hsl(12 30% 65%))",
            }}
          />
        </div>

        <span className="text-[10px] text-muted-foreground/50 font-body tracking-[0.2em] uppercase">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;

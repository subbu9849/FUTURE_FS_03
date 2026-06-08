import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[1.5px]">
      <div
        className="h-full transition-all duration-150 rounded-r-full"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, hsl(18 55% 48%), hsl(12 40% 60%))",
        }}
      />
    </div>
  );
};

export default ScrollProgress;

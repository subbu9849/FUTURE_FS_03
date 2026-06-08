import { useEffect, useRef } from "react";

const SpotlightEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    };

    container.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => container.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="spotlight-mask pointer-events-none fixed inset-0 z-40 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
    />
  );
};

export default SpotlightEffect;

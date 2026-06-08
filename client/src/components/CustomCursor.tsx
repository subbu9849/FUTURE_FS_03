import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setHidden(false);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer");
      setHovering(!!interactive);
    };

    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    const animate = () => {
      const dx = mouseRef.current.x - posRef.current.x;
      const dy = mouseRef.current.y - posRef.current.y;
      posRef.current.x += dx * 0.12;
      posRef.current.y += dy * 0.12;

      if (cursorRef.current) {
        const size = hovering ? 56 : 36;
        cursorRef.current.style.width = `${size}px`;
        cursorRef.current.style.height = `${size}px`;
        cursorRef.current.style.transform = `translate3d(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseRef.current.x - 3}px, ${mouseRef.current.y - 3}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [hovering]);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        id="custom-cursor"
        className={hidden ? "hidden" : ""}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid hsl(18 55% 48% / 0.45)",
          left: 0,
          top: 0,
          transition: "width 0.25s ease, height 0.25s ease",
        }}
      />
      {/* Center dot */}
      <div
        ref={dotRef}
        className={hidden ? "hidden" : ""}
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "hsl(18 55% 48%)",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          left: 0,
          top: 0,
        }}
      />
    </>
  );
};

export default CustomCursor;

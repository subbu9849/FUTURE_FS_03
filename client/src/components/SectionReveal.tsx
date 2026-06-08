import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}

const SectionReveal = ({ children, className, direction = "up", delay = 0 }: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const animations = {
    up: "translate-y-8",
    left: "-translate-x-8",
    right: "translate-x-8",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        visible ? "opacity-100 translate-y-0 translate-x-0 blur-0" : `opacity-0 ${animations[direction]} blur-[2px]`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SectionReveal;

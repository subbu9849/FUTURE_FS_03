import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 transition-all duration-500",
        hover && "hover:bg-white/[0.07] hover:border-terracotta/20 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;

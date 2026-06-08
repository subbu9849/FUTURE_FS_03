import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="relative w-8 h-8 rounded-full border-2 border-terracotta/30 flex items-center justify-center group-hover:border-terracotta/60 transition-colors duration-500">
            <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            <div className="absolute -inset-1.5 rounded-full border border-terracotta/10 animate-gentle-spin" style={{ animationDuration: "15s" }} />
          </div>
          <span className="font-heading text-lg tracking-[0.2em] text-ivory font-medium">
            SUBBU STUDIO
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "relative px-4 py-2 font-body text-[13px] tracking-[0.05em] transition-colors duration-300 font-medium",
                location.pathname === link.href
                  ? "text-terracotta"
                  : "text-ivory/60 hover:text-ivory",
              )}
            >
              {link.label}
              {location.pathname === link.href && (
                <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-terracotta/50 rounded-full" />
              )}
            </Link>
          ))}
          <Link
            to="/booking"
            className="ml-4 px-6 py-2.5 bg-terracotta text-ivory font-body text-[13px] font-medium rounded-full hover:bg-terracotta/80 transition-all duration-300 hover:shadow-lg hover:shadow-terracotta/20"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-ivory/80 p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-6 bg-background/98 backdrop-blur-xl transition-all duration-500 md:hidden",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "font-heading text-2xl tracking-[0.05em] transition-all duration-500",
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              location.pathname === link.href ? "text-terracotta" : "text-ivory/70 hover:text-ivory",
            )}
            style={{ transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/booking"
          className="mt-4 px-8 py-3 bg-terracotta text-ivory font-body text-sm font-medium rounded-full hover:bg-terracotta/80 transition-all duration-300"
          style={{ transitionDelay: mobileOpen ? `${navLinks.length * 80}ms` : "0ms" }}
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Youtube, Facebook } from "lucide-react";

const footerLinks = {
  "Explore": [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
  ],
  "Services": [
    { href: "/services", label: "Wedding Photography" },
    { href: "/services", label: "Pre-Wedding Shoots" },
    { href: "/services", label: "Fashion Photography" },
    { href: "/services", label: "Corporate Events" },
    { href: "/services", label: "Drone Photography" },
  ],
  "Support": [
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
    { href: "/booking", label: "Book a Session" },
    { href: "/testimonials", label: "Testimonials" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.05] bg-espresso">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-9 h-9 rounded-full border-2 border-terracotta/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              </div>
              <span className="font-heading text-xl tracking-[0.2em] text-ivory font-medium">
                SUBBU STUDIO
              </span>
            </Link>
            <p className="text-muted-foreground font-body leading-relaxed max-w-sm mb-8 text-sm">
              Crafting timeless visual narratives with artistic excellence. 
              Fine art photography and videography for life's most precious moments.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Facebook, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted-foreground hover:text-terracotta hover:border-terracotta/30 hover:bg-terracotta/[0.05] transition-all duration-300"
                  aria-label="Social link"
                >
                  <social.icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body text-sm font-semibold text-ivory mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-terracotta transition-colors duration-300 font-body text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm font-body">
            &copy; {new Date().getFullYear()} Subbu Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground font-body">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-terracotta/60" strokeWidth={1.5} />
              Mumbai, India
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-terracotta/60" strokeWidth={1.5} />
              +91 98765 43210
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-terracotta/60" strokeWidth={1.5} />
              hello@subbustudio.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

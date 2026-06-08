import { Link } from "react-router-dom";
import { Check, Star } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import GlassCard from "@/components/GlassCard";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Essential",
    price: "₹50,000",
    description: "Perfect for intimate events and portrait sessions.",
    featured: false,
    features: [
      "4 hours of coverage",
      "1 photographer",
      "200+ edited photos",
      "Online gallery",
      "Print-ready files",
      "1-week delivery",
    ],
  },
  {
    name: "Premium",
    price: "₹85,000",
    description: "Our most popular package for weddings and events.",
    featured: true,
    features: [
      "8 hours of coverage",
      "2 photographers",
      "500+ edited photos",
      "Online gallery",
      "Premium photo album (30 pages)",
      "Drone shots included",
      "Teaser video",
      "3-week delivery",
    ],
  },
  {
    name: "Luxury",
    price: "₹1,50,000",
    description: "The complete Subbu Studio experience.",
    featured: false,
    features: [
      "Full-day coverage (12+ hours)",
      "3 photographers + assistant",
      "1000+ edited photos",
      "Online gallery + USB drive",
      "Luxury leather album (50 pages)",
      "Cinematic highlight film (5-7 min)",
      "Full ceremony video",
      "Drone photography & videography",
      "Pre-wedding consultation",
      "Express 1-week delivery",
    ],
  },
];

const customFeatures = [
  "Pre-wedding shoot add-on: ₹25,000",
  "Additional photographer: ₹15,000",
  "Extra album pages (per 10): ₹5,000",
  "Rush delivery (48 hours): ₹10,000",
  "Destination wedding surcharge: At cost",
  "Additional hour of coverage: ₹8,000",
];

const Pricing = () => {
  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="container px-6 relative z-10 text-center">
          <SectionReveal>
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-6 block">
              Investment
            </span>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-6">
              Transparent Pricing,<br />Exceptional Value
            </h1>
          </SectionReveal>
          <SectionReveal delay={400}>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
              Every package is designed to deliver an extraordinary photography experience. 
              Choose the one that fits your vision, or let us create something custom.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16">
        <div className="container px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <SectionReveal key={i} delay={i * 150}>
                <GlassCard
                  className={cn(
                    "h-full flex flex-col relative",
                    pkg.featured && "terracotta-gradient-border",
                  )}
                >
                  {pkg.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-terracotta text-ivory rounded-full font-nav text-[10px] uppercase tracking-[0.2em] flex items-center gap-1">
                      <Star className="h-3 w-3 fill-black" />
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="font-heading text-2xl font-medium text-white mb-2">
                      {pkg.name}
                    </h3>
                    <div className="mb-3">
                      <span className="font-heading text-4xl font-light text-terracotta">
                        {pkg.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-body text-sm">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="flex-1">
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm">
                          <Check className="h-4 w-4 text-terracotta flex-shrink-0 mt-0.5" />
                          <span className="text-white/70 font-body">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/booking"
                    className={cn(
                      "block text-center py-3 rounded-full font-nav text-xs uppercase tracking-[0.2em] transition-all duration-300",
                      pkg.featured
                        ? "bg-terracotta text-ivory hover:bg-terracotta-light"
                        : "border border-white/20 text-white hover:border-terracotta/50 hover:text-terracotta",
                    )}
                  >
                    Choose {pkg.name}
                  </Link>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Add-ons */}
      <section className="py-16 border-t border-white/5">
        <div className="container px-6">
          <div className="text-center mb-12">
            <SectionReveal>
              <TextReveal as="h2" className="font-heading text-3xl md:text-4xl font-light text-white mb-4">
                Customize Your Experience
              </TextReveal>
            </SectionReveal>
            <SectionReveal delay={200}>
              <p className="text-muted-foreground font-body max-w-xl mx-auto">
                Add any of these options to any package to create your perfect photography experience.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={300}>
            <div className="max-w-lg mx-auto glass rounded-2xl p-6">
              <ul className="space-y-4">
                {customFeatures.map((f, i) => (
                  <li key={i} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="text-white/70 font-body text-sm">{f.split(":")[0]}</span>
                    <span className="text-terracotta font-nav text-sm">{f.split(": ")[1]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="container px-6 text-center">
          <SectionReveal>
            <TextReveal as="h2" className="font-heading text-3xl md:text-4xl font-light text-white mb-4">
              Need Something Custom?
            </TextReveal>
          </SectionReveal>
          <SectionReveal delay={200}>
            <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
              We create bespoke packages for unique events and special requirements. Let's talk.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 border border-white/20 text-white font-nav text-sm uppercase tracking-[0.2em] rounded-full hover:border-terracotta/50 hover:text-terracotta transition-all duration-300"
            >
              Get a Custom Quote
            </Link>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
};

export default Pricing;

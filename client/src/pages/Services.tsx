import { Link } from "react-router-dom";
import {
  Heart, Sparkles, Camera, Building2, Video, Plane, Baby, Sun,
  Star, Check,
} from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import GlassCard from "@/components/GlassCard";

const services = [
  {
    icon: Heart,
    title: "Wedding Photography",
    description: "Comprehensive wedding coverage from pre-ceremony rituals to the grand reception. We capture every tear, every smile, and every candid moment with an artistic eye.",
    features: ["Full-day coverage", "2 photographers", "1000+ edited photos", "Online gallery", "Premium album"],
    highlight: true,
  },
  {
    icon: Sparkles,
    title: "Pre-Wedding Shoots",
    description: "Cinematic love stories told through stunning visuals at handpicked locations. These sessions are designed to be as unique as your love story.",
    features: ["Location scouting", "Multiple outfits", "Drone shots", "150+ edited photos", "Teaser video"],
    highlight: false,
  },
  {
    icon: Camera,
    title: "Fashion Photography",
    description: "Editorial-grade fashion shoots for designers, models, and brands. From lookbooks to campaign imagery, we deliver striking visuals that command attention.",
    features: ["Studio & location", "Professional lighting", "Styling consultation", "High-end retouching", "Quick turnaround"],
    highlight: false,
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description: "Professional documentation of conferences, product launches, award ceremonies, and corporate gatherings with a refined, polished aesthetic.",
    features: ["Multi-angle coverage", "Candid & posed", "Same-day previews", "Corporate usage rights", "Express delivery"],
    highlight: false,
  },
  {
    icon: Video,
    title: "Cinematic Videography",
    description: "Motion pictures that tell your story with cinematic quality. From wedding films to brand stories, every frame is composed with intention.",
    features: ["4K resolution", "Aerial footage", "Professional audio", "Color grading", "Teaser + full film"],
    highlight: false,
  },
  {
    icon: Plane,
    title: "Drone Photography",
    description: "Breathtaking aerial imagery that adds a dramatic perspective to your visual storytelling. Perfect for outdoor events and architectural shoots.",
    features: ["Licensed pilot", "4K aerial stills", "360° panoramas", "Safe operations", "Quick processing"],
    highlight: false,
  },
  {
    icon: Baby,
    title: "Baby & Family Shoots",
    description: "Tender, heartwarming sessions that capture the innocence and joy of childhood. From newborns to family portraits, we create memories to cherish.",
    features: ["Indoor/outdoor", "Props included", "Patient approach", "50+ edited photos", "Print-ready files"],
    highlight: false,
  },
  {
    icon: Sun,
    title: "Outdoor Photography",
    description: "Harnessing natural light and stunning landscapes to create breathtaking imagery. Perfect for engagement shoots, portraits, and adventure sessions.",
    features: ["Golden hour shoots", "Multiple locations", "Natural light mastery", "Candid approach", "100+ photos"],
    highlight: false,
  },
];

const Services = () => {
  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta/3 rounded-full blur-3xl" />
        <div className="container px-6 relative z-10 text-center">
          <SectionReveal>
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-6 block">
              What We Do
            </span>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-6">
              Premium Photography<br />& Videography
            </h1>
          </SectionReveal>
          <SectionReveal delay={400}>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
              Every service is delivered with uncompromising quality, artistic vision, and an 
              obsessive attention to detail that defines the Subbu Studio experience.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <GlassCard
                  className={`h-full flex flex-col group ${
                    service.highlight ? "terracotta-gradient-border" : ""
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${
                    service.highlight
                      ? "bg-terracotta/20"
                      : "bg-terracotta/10 group-hover:bg-terracotta/20"
                  }`}>
                    <service.icon className={`h-6 w-6 ${
                      service.highlight ? "text-terracotta" : "text-terracotta/70 group-hover:text-terracotta"
                    } transition-colors duration-500`} strokeWidth={1.5} />
                  </div>

                  <h3 className="font-heading text-2xl font-medium text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed text-sm mb-6">
                    {service.description}
                  </p>

                  <div className="mt-auto">
                    <div className="h-[1px] bg-white/5 mb-4" />
                    <ul className="space-y-2">
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Check className="h-3.5 w-3.5 text-terracotta flex-shrink-0" />
                          <span className="font-body">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="container px-6 text-center">
          <SectionReveal>
            <TextReveal as="h2" className="font-heading text-4xl md:text-5xl font-light text-white mb-6">
              Ready to Create Something Beautiful?
            </TextReveal>
          </SectionReveal>
          <SectionReveal delay={200}>
            <p className="text-muted-foreground font-body text-lg mb-8 max-w-xl mx-auto">
              Let's discuss your vision and find the perfect package for your needs.
            </p>
            <Link
              to="/booking"
              className="inline-block px-8 py-4 bg-terracotta text-ivory font-nav text-sm uppercase tracking-[0.2em] rounded-full hover:bg-terracotta-light transition-all duration-300"
            >
              Book a Consultation
            </Link>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
};

export default Services;

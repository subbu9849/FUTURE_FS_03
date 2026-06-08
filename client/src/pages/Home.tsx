import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Camera, Award, Users, Star, ChevronDown, Sparkles,
  Heart, Image, Video, Plane, Building2, Baby, Camera as CameraIcon,
} from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import GlassCard from "@/components/GlassCard";
import TextReveal from "@/components/TextReveal";
import ParallaxSection from "@/components/ParallaxSection";

const heroSlides = [
  {
    title: "Where Love Stories\nBecome Art",
    subtitle: "Luxury Wedding Photography & Cinematic Storytelling",
    accent: "Weddings",
  },
  {
    title: "Capturing the\nUnseen Beauty",
    subtitle: "Fashion & Editorial Photography at Its Finest",
    accent: "Fashion",
  },
  {
    title: "Moments That\nLast Forever",
    subtitle: "Pre-Wedding & Engagement Visual Narratives",
    accent: "Pre-Wedding",
  },
];

const stats = [
  { end: 500, suffix: "+", label: "Weddings Captured" },
  { end: 15, suffix: "+", label: "Years Experience" },
  { end: 50, suffix: "+", label: "Awards Won" },
  { end: 2000, suffix: "+", label: "Happy Clients" },
];

const services = [
  { icon: Heart, title: "Wedding Photography", description: "Timeless documentation of your most cherished celebration with artistic vision and emotional depth." },
  { icon: Sparkles, title: "Pre-Wedding Shoots", description: "Cinematic love stories captured in breathtaking locations before your special day." },
  { icon: CameraIcon, title: "Fashion Photography", description: "Editorial-grade fashion imagery that elevates brands and personalities." },
  { icon: Building2, title: "Corporate Events", description: "Professional coverage of corporate gatherings with a refined, polished aesthetic." },
  { icon: Video, title: "Videography", description: "Cinematic films that bring your stories to life with movement, sound, and emotion." },
  { icon: Plane, title: "Drone Photography", description: "Breathtaking aerial perspectives that add scale and drama to your visual story." },
];

const testimonialsPreview = [
  { quote: "Subbu Studio didn't just photograph our wedding — they captured our souls. Every image brings tears of joy.", name: "Priya & Arjun", role: "Wedding, 2024" },
  { quote: "The most professional and creative team I've ever worked with. Our pre-wedding film feels like a movie trailer.", name: "Ananya & Rohan", role: "Pre-Wedding, 2024" },
  { quote: "They turned our corporate event into something visually spectacular. The photos elevated our entire brand.", name: "Vikram Sharma", role: "Corporate Event, 2024" },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = useCallback(() => {
    const next = document.getElementById("about-preview");
    next?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Parallax hero on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setHeroOpacity(Math.max(0, 1 - scrollY / 800));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative">
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 cinematic-gradient" />

        {/* Decorative ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full border border-terracotta/5 animate-rotate-slow opacity-20" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-terracotta/10 animate-rotate-slow opacity-30" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-terracotta rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
                opacity: 0.2 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-6 text-center" style={{ opacity: heroOpacity }}>
          {/* Accent label */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-terracotta/20 bg-terracotta/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta animate-pulse" />
            <span className="font-nav text-[10px] uppercase tracking-[0.3em] text-terracotta">
              {heroSlides[currentSlide].accent}
            </span>
          </div>

          {/* Headline */}
          <h1
            key={currentSlide}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-8 animate-fade-up tracking-tight whitespace-pre-line"
          >
            {heroSlides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p
            key={`sub-${currentSlide}`}
            className="text-lg md:text-xl text-muted-foreground font-body mb-12 max-w-2xl mx-auto animate-fade-up delay-200 font-light"
          >
            {heroSlides[currentSlide].subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-400">
            <Link
              to="/booking"
              className="group relative px-8 py-4 bg-terracotta text-ivory font-nav text-sm uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_hsl(18 55% 48% / 0.3)]"
            >
              <span className="relative z-10">Book Your Session</span>
              <div className="absolute inset-0 bg-terracotta-light translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 border border-white/20 text-white font-nav text-sm uppercase tracking-[0.2em] rounded-full hover:border-terracotta/50 hover:text-terracotta transition-all duration-300"
            >
              View Portfolio
            </Link>
          </div>

          {/* Slide indicators */}
          <div className="mt-16 flex items-center justify-center gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-[2px] rounded-full transition-all duration-500 ${
                  i === currentSlide ? "w-8 bg-terracotta" : "w-4 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-terracotta transition-colors duration-300"
        >
          <span className="font-nav text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="py-20 border-t border-white/5">
        <div className="container px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <div className="text-center">
                  <AnimatedCounter
                    end={stat.end}
                    suffix={stat.suffix}
                    className="font-heading text-4xl md:text-5xl font-light text-white block mb-2"
                  />
                  <span className="text-muted-foreground font-nav text-xs uppercase tracking-[0.2em]">
                    {stat.label}
                  </span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT PREVIEW ═══════════ */}
      <section id="about-preview" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/3 rounded-full blur-3xl" />
        <div className="container px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <SectionReveal direction="left">
              <div className="relative">
                <div className="aspect-[3/4] bg-gradient-to-br from-espresso to-background rounded-2xl overflow-hidden border border-white/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-20 w-20 text-terracotta/20" strokeWidth={1} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="font-nav text-[10px] uppercase tracking-[0.3em] text-terracotta">
                      Established 2010
                    </span>
                  </div>
                </div>
                {/* Floating element */}
                <div className="absolute -bottom-6 -right-6 glass-strong rounded-xl p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-terracotta" />
                    <span className="font-nav text-xs uppercase tracking-[0.1em] text-white">50+ Awards</span>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal direction="right">
              <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-4 block">
                Our Story
              </span>
              <TextReveal as="h2" className="font-heading text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                Crafting Visual Poetry Since 2010
              </TextReveal>
              <TextReveal className="text-muted-foreground font-body leading-relaxed mb-6 delay-200">
                Subbu Studio was born from a singular passion: to transform fleeting moments into 
                timeless art. Over 15 years, we've grown from a small studio into one of India's 
                most trusted luxury photography brands, capturing over 500 weddings and countless 
                stories along the way.
              </TextReveal>
              <TextReveal className="text-muted-foreground font-body leading-relaxed mb-8 delay-300">
                Every frame we create is infused with intention — blending technical mastery with 
                an artistic eye that sees beyond the obvious.
              </TextReveal>
              <div className="animate-fade-up delay-400">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-terracotta font-nav text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all duration-300"
                >
                  Discover Our Journey
                  <span className="h-[1px] w-8 bg-terracotta transition-all duration-300 group-hover:w-12" />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="py-32 relative">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-terracotta/3 rounded-full blur-3xl" />
        <div className="container px-6">
          <div className="text-center mb-20">
            <SectionReveal>
              <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-4 block">
                What We Offer
              </span>
            </SectionReveal>
            <SectionReveal delay={200}>
              <TextReveal as="h2" className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                Premium Photography Services
              </TextReveal>
            </SectionReveal>
            <SectionReveal delay={300}>
              <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
                From intimate weddings to grand corporate events, every project receives the same 
                dedication to artistic excellence.
              </p>
            </SectionReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <GlassCard className="h-full group">
                  <div className="w-14 h-14 rounded-2xl bg-terracotta/10 flex items-center justify-center mb-6 group-hover:bg-terracotta/20 transition-colors duration-500">
                    <service.icon className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-2xl font-medium text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <div className="mt-6 h-[1px] w-0 group-hover:w-full bg-terracotta/30 transition-all duration-500" />
                </GlassCard>
              </SectionReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <SectionReveal delay={600}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-terracotta font-nav text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all duration-300"
              >
                View All Services
                <span className="h-[1px] w-8 bg-terracotta" />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS PREVIEW ═══════════ */}
      <section className="py-32 border-y border-white/5">
        <div className="container px-6">
          <div className="text-center mb-16">
            <SectionReveal>
              <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-4 block">
                Client Love
              </span>
            </SectionReveal>
            <SectionReveal delay={200}>
              <TextReveal as="h2" className="font-heading text-4xl md:text-5xl font-light text-white">
                Words From the Heart
              </TextReveal>
            </SectionReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsPreview.map((t, i) => (
              <SectionReveal key={i} delay={i * 150}>
                <GlassCard className="h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-terracotta text-terracotta" />
                    ))}
                  </div>
                  <p className="text-white/80 font-body leading-relaxed italic mb-8 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-heading text-lg text-white">{t.name}</p>
                    <p className="text-muted-foreground text-sm font-nav">{t.role}</p>
                  </div>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-terracotta font-nav text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all duration-300"
            >
              Read More Stories
              <span className="h-[1px] w-8 bg-terracotta" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA SECTION ═══════════ */}
      <section className="py-32 relative overflow-hidden">
        <ParallaxSection speed={0.2}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[600px] h-[600px] rounded-full border border-terracotta/5" />
          </div>
        </ParallaxSection>

        <div className="container px-6 text-center relative z-10">
          <SectionReveal>
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-4 block">
              Let's Create Magic
            </span>
          </SectionReveal>
          <SectionReveal delay={200}>
            <TextReveal as="h2" className="font-heading text-4xl md:text-6xl font-light text-white mb-6 max-w-3xl mx-auto leading-tight">
              Ready to Transform Your Moments Into Timeless Art?
            </TextReveal>
          </SectionReveal>
          <SectionReveal delay={400}>
            <p className="text-muted-foreground font-body text-lg mb-10 max-w-xl mx-auto">
              Let's create something beautiful together. Reach out and let's discuss your vision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/booking"
                className="px-8 py-4 bg-terracotta text-ivory font-nav text-sm uppercase tracking-[0.2em] rounded-full hover:bg-terracotta-light transition-all duration-300 hover:shadow-[0_0_40px_hsl(18 55% 48% / 0.3)]"
              >
                Book Your Session
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border border-white/20 text-white font-nav text-sm uppercase tracking-[0.2em] rounded-full hover:border-terracotta/50 hover:text-terracotta transition-all duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
};

export default Home;

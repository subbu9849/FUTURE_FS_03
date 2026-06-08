import { Star, Quote } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import GlassCard from "@/components/GlassCard";

const testimonials = [
  {
    quote: "Subbu Studio didn't just photograph our wedding — they captured our souls. Every single image brings tears of joy. The way they handled our interfaith ceremony with such grace and cultural sensitivity was beyond anything we imagined.",
    name: "Priya & Arjun",
    role: "Wedding Photography",
    rating: 5,
  },
  {
    quote: "The most professional and creative team I've ever worked with. Our pre-wedding film feels like a movie trailer. They found locations we didn't even know existed and made us look like absolute stars.",
    name: "Ananya & Rohan",
    role: "Pre-Wedding Shoot",
    rating: 5,
  },
  {
    quote: "They turned our corporate event into something visually spectacular. The photos elevated our entire brand. We've already booked them for our next three events. That's how good they are.",
    name: "Vikram Sharma",
    role: "Corporate Event",
    rating: 5,
  },
  {
    quote: "I was nervous about having a baby shoot, but Subbu made the entire experience so comfortable. The photos of our newborn are treasures we'll keep forever. Pure magic.",
    name: "Meera & Karthik",
    role: "Baby Shoot",
    rating: 5,
  },
  {
    quote: "Our destination wedding in Rajasthan was captured with such cinematic brilliance. The drone shots of the fort, the candid moments, the attention to detail — world-class doesn't even begin to describe it.",
    name: "Sanya & Dev",
    role: "Destination Wedding",
    rating: 5,
  },
  {
    quote: "Subbu Studio redefined what photography means to us. Every frame tells a story. The album they created is the most beautiful thing we own. Worth every rupee and more.",
    name: "Lakshmi & Aditya",
    role: "Wedding Photography",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="container px-6 relative z-10 text-center">
          <SectionReveal>
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-6 block">
              Testimonials
            </span>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-6">
              Love Letters From<br />Our Clients
            </h1>
          </SectionReveal>
          <SectionReveal delay={400}>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
              The greatest reward of our work is the joy it brings. Here's what our clients 
              have to say about their Subbu Studio experience.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container px-6">
          <div className="columns-1 md:columns-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <GlassCard className="mb-8 break-inside-avoid">
                  <Quote className="h-8 w-8 text-terracotta/30 mb-4" strokeWidth={1} />
                  <p className="text-white/80 font-body leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading text-lg text-white">{t.name}</p>
                      <p className="text-muted-foreground text-sm font-nav">{t.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-terracotta text-terracotta" />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;

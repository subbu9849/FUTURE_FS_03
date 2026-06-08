import { Award, Camera, Heart, Users, Eye } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import AnimatedCounter from "@/components/AnimatedCounter";

const values = [
  { icon: Eye, title: "Vision", description: "To be India's most sought-after luxury photography studio, setting the standard for artistic excellence and client experience." },
  { icon: Heart, title: "Mission", description: "To transform life's most precious moments into timeless visual art that generations will treasure." },
  { icon: Camera, title: "Philosophy", description: "Every frame is a story. We don't just capture images — we capture emotions, light, and the essence of the moment." },
];

const milestones = [
  { year: "2010", title: "The Beginning", description: "Subbu Studio opened its doors with one camera and an unwavering passion for photography." },
  { year: "2013", title: "First 100 Weddings", description: "Reached our first milestone of 100 weddings, each one teaching us something new about love and art." },
  { year: "2016", title: "National Recognition", description: "Won our first national photography award, putting us on the map as a premier studio." },
  { year: "2019", title: "Expanding Horizons", description: "Added videography and drone photography to our services, offering complete visual storytelling." },
  { year: "2022", title: "500+ Love Stories", description: "Crossed 500 weddings and expanded our team to include India's finest photography talent." },
  { year: "2024", title: "International Presence", description: "Started capturing destination weddings across the globe, from Bali to Tuscany." },
];

const About = () => {
  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="container px-6 relative z-10 text-center">
          <SectionReveal>
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-6 block">
              Our Story
            </span>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-6">
              The Art of Visual<br />Storytelling
            </h1>
          </SectionReveal>
          <SectionReveal delay={400}>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
              For over 15 years, Subbu Studio has been at the forefront of luxury photography in India, 
              crafting timeless visual narratives that transcend the ordinary.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-t border-white/5">
        <div className="container px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <SectionReveal key={i} delay={i * 150}>
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-terracotta/10 flex items-center justify-center mb-6 mx-auto">
                    <v.icon className="h-7 w-7 text-terracotta" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-2xl text-white mb-4">{v.title}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{v.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-white/5">
        <div className="container px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { end: 500, suffix: "+", label: "Weddings" },
              { end: 2000, suffix: "+", label: "Happy Clients" },
              { end: 50, suffix: "+", label: "Awards" },
              { end: 15, suffix: "+", label: "Years" },
            ].map((stat, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <div className="text-center">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} className="font-heading text-4xl md:text-5xl font-light text-white block mb-2" />
                  <span className="text-muted-foreground font-nav text-xs uppercase tracking-[0.2em]">{stat.label}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 border-t border-white/5">
        <div className="container px-6">
          <div className="text-center mb-20">
            <SectionReveal>
              <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-4 block">Our Journey</span>
            </SectionReveal>
            <SectionReveal delay={200}>
              <TextReveal as="h2" className="font-heading text-4xl md:text-5xl font-light text-white">Milestones & Memories</TextReveal>
            </SectionReveal>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <div className="flex gap-8 pb-12 relative">
                  {/* Timeline line */}
                  {i < milestones.length - 1 && (
                    <div className="absolute left-[27px] top-14 bottom-0 w-[1px] bg-white/5" />
                  )}
                  {/* Year badge */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center">
                    <span className="font-nav text-xs text-terracotta font-semibold">{m.year}</span>
                  </div>
                  <div className="pt-3">
                    <h3 className="font-heading text-xl text-white mb-2">{m.title}</h3>
                    <p className="text-muted-foreground font-body leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 border-t border-white/5">
        <div className="container px-6">
          <div className="text-center mb-16">
            <SectionReveal>
              <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-4 block">The Artist</span>
            </SectionReveal>
            <SectionReveal delay={200}>
              <TextReveal as="h2" className="font-heading text-4xl md:text-5xl font-light text-white">Meet the Visionary</TextReveal>
            </SectionReveal>
          </div>

          <SectionReveal delay={300}>
            <div className="max-w-2xl mx-auto">
              <div className="glass rounded-3xl p-10 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-terracotta/20 to-terracotta/5 border border-terracotta/20 flex items-center justify-center mx-auto mb-6">
                  <Camera className="h-10 w-10 text-terracotta" strokeWidth={1} />
                </div>
                <h3 className="font-heading text-3xl font-light text-white mb-2">Subbu</h3>
                <p className="text-terracotta font-nav text-xs uppercase tracking-[0.2em] mb-6">Founder & Lead Photographer</p>
                <p className="text-muted-foreground font-body leading-relaxed">
                  A photographer by passion and an artist by heart, Subbu has spent over 15 years 
                  perfecting the craft of visual storytelling. His work is characterized by an 
                  extraordinary ability to find beauty in the unscripted, the authentic, and the 
                  deeply human. Every frame he captures is a testament to his belief that 
                  photography is not just about seeing — it's about feeling.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
};

export default About;

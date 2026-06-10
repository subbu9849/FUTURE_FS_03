import { Calendar, Clock, Users, MapPin, Camera, Check } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  { icon: Calendar, label: "Choose Package", description: "Select the package that fits your needs" },
  { icon: MapPin, label: "Tell Us Details", description: "Share your event date, location, and vision" },
  { icon: Camera, label: "We Confirm", description: "Our team confirms availability within 24 hours" },
  { icon: Users, label: "Let's Create Magic", description: "We bring your vision to life" },
];

const Booking = () => {
  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="container px-6 relative z-10 text-center">
          <SectionReveal>
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-6 block">
              Book Now
            </span>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-6">
              Book Your Session
            </h1>
          </SectionReveal>
          <SectionReveal delay={400}>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to create something extraordinary? Fill in the details below and we'll 
              get back to you within 24 hours to confirm your booking.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-12 border-b border-white/[0.05]">
        <div className="container px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <div className="text-center relative">
                  <div className="w-14 h-14 rounded-2xl bg-terracotta/[0.1] flex items-center justify-center mb-4 mx-auto">
                    <step.icon className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
                  </div>
                  <span className="font-nav text-[10px] uppercase tracking-[0.15em] text-terracotta block mb-1">
                    Step {i + 1}
                  </span>
                  <h4 className="font-heading text-base text-white mb-1">{step.label}</h4>
                  <p className="text-muted-foreground text-xs font-body">{step.description}</p>

                  {/* Connector */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-7 -right-3 w-6 h-[1px] bg-terracotta/[0.2]" />
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto">
            <SectionReveal>
              <div className="glass rounded-3xl p-8 md:p-10">
                <h3 className="font-heading text-2xl text-white mb-8">
                  Event Details
                </h3>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                        First Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Subbu "
                        className="bg-white/5 border-white/[0.1] text-white placeholder:text-white/30 h-12 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Shaik"
                        className="bg-white/5 border-white/[0.1] text-white placeholder:text-white/30 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="subbu@example.com"
                        className="bg-white/5 border-white/[0.1] text-white placeholder:text-white/30 h-12 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        placeholder="+91 9550395349"
                        className="bg-white/5 border-white/[0.1] text-white placeholder:text-white/30 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                      Event Type
                    </label>
                    <select className="w-full h-12 rounded-xl bg-white/5 border border-white/[0.1] text-ivory/70 font-body text-sm px-4 appearance-none cursor-pointer focus:outline-none focus:border-terracotta/[0.5] transition-colors">
                      <option value="">Select event type...</option>
                      <option>Wedding Photography</option>
                      <option>Pre-Wedding Shoot</option>
                      <option>Fashion Photography</option>
                      <option>Corporate Event</option>
                      <option>Baby Shoot</option>
                      <option>Outdoor Photography</option>
                      <option>Videography</option>
                      <option>Drone Photography</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                        Event Date
                      </label>
                      <Input
                        type="date"
                        className="bg-white/5 border-white/[0.1] text-white h-12 rounded-xl [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                        Event Location
                      </label>
                      <Input
                        type="text"
                        placeholder="Andhra Pradesh, India"
                        className="bg-white/5 border-white/[0.1] text-white placeholder:text-white/30 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                      Tell Us About Your Vision
                    </label>
                    <Textarea
                      placeholder="Describe your event, preferred style, special requests, and anything else you'd like us to know..."
                      rows={4}
                      className="bg-white/5 border-white/[0.1] text-white placeholder:text-white/30 rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-terracotta text-ivory hover:bg-terracotta-light font-nav text-sm uppercase tracking-[0.2em] h-14 rounded-full text-base"
                  >
                    Submit Booking Request
                  </Button>

                  <p className="text-center text-muted-foreground text-xs font-body">
                    We'll get back to you within 24 hours to confirm availability and discuss the details.
                  </p>
                </form>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Booking;

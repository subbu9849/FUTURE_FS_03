import { MapPin, Phone, Mail, Instagram, Youtube, Facebook, Clock } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="container px-6 relative z-10 text-center">
          <SectionReveal>
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-6 block">
              Contact
            </span>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-6">
              Let's Start a<br />Conversation
            </h1>
          </SectionReveal>
          <SectionReveal delay={400}>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you're planning a wedding, a corporate event, or a personal shoot, 
              we'd love to hear from you. Reach out and let's create something beautiful.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container px-6">
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact Info */}
            <SectionReveal direction="left">
              <div>
                <TextReveal as="h2" className="font-heading text-3xl font-light text-white mb-8">
                  Get In Touch
                </TextReveal>

                <div className="space-y-6">
                  {[
                    { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                    { icon: Mail, label: "Email", value: "hello@subbustudio.com", href: "mailto:hello@subbustudio.com" },
                    { icon: MapPin, label: "Studio Location", value: "Mumbai, India", href: "#" },
                    { icon: Clock, label: "Studio Hours", value: "Mon-Sat, 10 AM - 7 PM", href: "#" },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center flex-shrink-0 group-hover:bg-terracotta/20 transition-colors">
                        <item.icon className="h-5 w-5 text-terracotta" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                          {item.label}
                        </p>
                        <p className="text-white font-body group-hover:text-terracotta transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social */}
                <div className="mt-10">
                  <p className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    Follow Us
                  </p>
                  <div className="flex gap-3">
                    {[
                      { icon: Instagram, label: "Instagram" },
                      { icon: Youtube, label: "YouTube" },
                      { icon: Facebook, label: "Facebook" },
                    ].map((s, i) => (
                      <a
                        key={i}
                        href="#"
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-terracotta hover:border-terracotta/40 transition-all duration-300"
                        aria-label={s.label}
                      >
                        <s.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Contact Form */}
            <SectionReveal direction="right">
              <div className="glass rounded-3xl p-8">
                <h3 className="font-heading text-2xl text-white mb-6">
                  Send a Message
                </h3>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Priya Sharma"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="priya@example.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                      Your Message
                    </label>
                    <Textarea
                      placeholder="Tell us about your event..."
                      rows={4}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-terracotta text-ivory hover:bg-terracotta-light font-nav text-xs uppercase tracking-[0.2em] h-12 rounded-full"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

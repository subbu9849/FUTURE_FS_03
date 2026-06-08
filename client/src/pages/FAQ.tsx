import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import TextReveal from "@/components/TextReveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I book a session with Subbu Studio?",
    answer: "Booking is simple. Visit our Booking page, select your preferred package, choose your date, and fill in your event details. Our team will get back to you within 24 hours to confirm availability and discuss the details. You can also call us directly or reach out through the Contact page.",
  },
  {
    question: "How far in advance should I book?",
    answer: "For weddings, we recommend booking at least 3-6 months in advance, especially during peak wedding season (October-February). For other shoots, 2-4 weeks is usually sufficient. However, we always try to accommodate last-minute requests whenever possible.",
  },
  {
    question: "Do you travel for destination weddings?",
    answer: "Absolutely! We love destination weddings and have captured beautiful celebrations across India and internationally. Travel and accommodation costs are billed at actuals. We've shot in Rajasthan, Goa, Kerala, Bali, Thailand, and Italy, among other stunning locations.",
  },
  {
    question: "How many photos will I receive?",
    answer: "The number depends on your package. Our Essential package delivers 200+ edited photos, Premium delivers 500+, and Luxury delivers 1000+. Every photo is individually edited for color, tone, and composition. We don't believe in quantity over quality — every image you receive is portfolio-worthy.",
  },
  {
    question: "What is your editing style?",
    answer: "Our signature editing style is timeless and elegant. We favor true-to-life colors with a slight warmth that enhances skin tones naturally. We avoid trendy filters that will look dated in a few years. Our goal is for your photos to look as beautiful in 20 years as they do today.",
  },
  {
    question: "Do you provide raw or unedited photos?",
    answer: "We don't provide raw or unedited files as they don't reflect our finished work. Every image we deliver goes through our meticulous editing process to ensure the highest quality. The edited photos you receive represent our artistic vision and professional standard.",
  },
  {
    question: "How long until I receive my photos?",
    answer: "Delivery timelines vary by package: Essential (1 week), Premium (3 weeks), Luxury (1 week express). For wedding films and highlight videos, expect 4-6 weeks. Rush delivery options are available for most packages if you need your photos sooner.",
  },
  {
    question: "What happens if it rains on my wedding day?",
    answer: "Rain can create some of the most romantic and memorable photographs! We're experienced in all weather conditions and come prepared with backup equipment, umbrellas for the couple, and creative location alternatives. Some of our most stunning portfolio images were captured in the rain.",
  },
  {
    question: "Do you have backup equipment?",
    answer: "Yes, we always carry backup cameras, lenses, lighting equipment, and memory cards to every shoot. Your precious moments are irreplaceable, and we take every precaution to ensure they're captured safely. We also create redundant backups of all files immediately after every event.",
  },
  {
    question: "Can we print our photos through you?",
    answer: "Yes! We offer premium printing services including luxury leather-bound albums, canvas prints, framed wall art, and fine art prints. Our printing partners use archival-quality materials that ensure your photos last for generations. Premium and Luxury packages include album options.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="container px-6 relative z-10 text-center">
          <SectionReveal>
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-terracotta mb-6 block">
              FAQ
            </span>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-white mb-6">
              Frequently Asked<br />Questions
            </h1>
          </SectionReveal>
          <SectionReveal delay={400}>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about working with Subbu Studio. If you don't 
              find your answer here, we're just a message away.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 50}>
                <div className="glass rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-heading text-lg text-white pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-terracotta flex-shrink-0 transition-transform duration-300",
                        openIndex === i && "rotate-180",
                      )}
                      strokeWidth={1.5}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300",
                      openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-muted-foreground font-body leading-relaxed text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;

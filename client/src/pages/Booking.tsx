import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Calendar, Users, MapPin, Camera } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  {
    icon: Calendar,
    label: "Choose Package",
    description: "Select the package that fits your needs",
  },
  {
    icon: MapPin,
    label: "Tell Us Details",
    description: "Share your event date, location, and vision",
  },
  {
    icon: Camera,
    label: "We Confirm",
    description: "Our team confirms availability within 24 hours",
  },
  {
    icon: Users,
    label: "Let's Create Magic",
    description: "We bring your vision to life",
  },
];

const Booking = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    event_type: "",
    event_date: "",
    location: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await emailjs.send(
        "service_smqy011",
        "template_ofdce89",
        formData,
        "SyyD1sj52yI5prXoR"
      );

      alert("Booking Request Sent Successfully!");

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        event_type: "",
        event_date: "",
        location: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send booking request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-32">
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
              Ready to create something extraordinary? Fill in the details below
              and we'll get back to you within 24 hours.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="py-12 border-b border-white/[0.05]">
        <div className="container px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <div className="text-center relative">
                  <div className="w-14 h-14 rounded-2xl bg-terracotta/[0.1] flex items-center justify-center mb-4 mx-auto">
                    <step.icon
                      className="h-6 w-6 text-terracotta"
                      strokeWidth={1.5}
                    />
                  </div>

                  <span className="font-nav text-[10px] uppercase tracking-[0.15em] text-terracotta block mb-1">
                    Step {i + 1}
                  </span>

                  <h4 className="font-heading text-base text-white mb-1">
                    {step.label}
                  </h4>

                  <p className="text-muted-foreground text-xs font-body">
                    {step.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto">
            <SectionReveal>
              <div className="glass rounded-3xl p-8 md:p-10">
                <h3 className="font-heading text-2xl text-white mb-8">
                  Event Details
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />

                    <Input
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />

                    <Input
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <select
                    name="event_type"
                    value={formData.event_type}
                    onChange={handleChange}
                    className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white"
                  >
                    <option value="">Select Event Type</option>
                    <option>Wedding Photography</option>
                    <option>Pre-Wedding Shoot</option>
                    <option>Fashion Photography</option>
                    <option>Corporate Event</option>
                    <option>Baby Shoot</option>
                    <option>Outdoor Photography</option>
                    <option>Videography</option>
                    <option>Drone Photography</option>
                  </select>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      type="date"
                      name="event_date"
                      value={formData.event_date}
                      onChange={handleChange}
                    />

                    <Input
                      name="location"
                      placeholder="Event Location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <Textarea
                    rows={5}
                    name="message"
                    placeholder="Tell us about your event..."
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-terracotta text-white h-14 rounded-full"
                  >
                    {loading
                      ? "Sending..."
                      : "Submit Booking Request"}
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

export default Booking;
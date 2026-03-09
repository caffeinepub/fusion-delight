import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function ContactSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const { actor } = useActor();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      if (actor) {
        await actor.addContactSubmission(form.name, form.email, form.message);
      }
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Could not send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 bg-[oklch(0.12_0_0)] fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          {/* EDIT: Change section label */}
          <span className="section-label">Get In Touch</span>
          {/* EDIT: Change section heading */}
          <h2 className="section-heading">Contact Us</h2>
          <span className="section-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* EDIT: Replace with your restaurant address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary">📍</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Address</p>
                  {/* EDIT: Replace with your restaurant address */}
                  <p className="text-muted-foreground text-sm">
                    123 Restaurant Street
                    <br />
                    City Name, Country
                  </p>
                </div>
              </div>

              {/* EDIT: Replace with your phone number */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary">📞</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Phone</p>
                  {/* EDIT: Replace with your phone number */}
                  <a
                    href="tel:+000000000000"
                    className="text-muted-foreground text-sm hover:text-secondary transition-colors"
                  >
                    +00 0000 000000
                  </a>
                </div>
              </div>

              {/* EDIT: Replace with your email address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary">✉️</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Email</p>
                  {/* EDIT: Replace with your email address */}
                  <a
                    href="mailto:contact@restaurant.com"
                    data-ocid="contact.link"
                    className="text-muted-foreground text-sm hover:text-secondary transition-colors"
                  >
                    contact@restaurant.com
                  </a>
                </div>
              </div>

              {/* EDIT: Update your operating hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary">🕐</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Hours</p>
                  {/* EDIT: Replace with your actual operating hours */}
                  <p className="text-muted-foreground text-sm">
                    Mon–Fri: 11:00 AM – 10:00 PM
                    <br />
                    Sat–Sun: 10:00 AM – 11:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            {/* EDIT: Replace this div with a Google Maps iframe embed */}
            {/* Example: <iframe src="https://maps.google.com/maps?q=YOUR_ADDRESS&output=embed" ...></iframe> */}
            <div
              data-ocid="contact.map_marker"
              className="map-placeholder rounded-xl h-52 flex flex-col items-center justify-center gap-3 border border-border"
            >
              <span className="text-3xl">🗺️</span>
              <p className="text-muted-foreground text-sm text-center px-4">
                Map Placeholder — Embed Google Maps iframe here
              </p>
              {/* EDIT: Uncomment and paste your Google Maps embed code below */}
              {/*
                <iframe
                  src="https://maps.google.com/maps?q=YOUR_ADDRESS&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              */}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-5">
            <h3 className="font-display text-xl font-semibold text-foreground">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-1.5">
                <Label
                  htmlFor="contact-name"
                  className="text-sm text-foreground/80"
                >
                  Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="contact-name"
                  data-ocid="contact.input"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="contact-email"
                  className="text-sm text-foreground/80"
                >
                  Email <span className="text-primary">*</span>
                </Label>
                <Input
                  id="contact-email"
                  data-ocid="contact.input"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="contact-message"
                  className="text-sm text-foreground/80"
                >
                  Message <span className="text-primary">*</span>
                </Label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.textarea"
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  required
                  rows={5}
                  className="bg-background border-border resize-none"
                />
              </div>

              <button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-md bg-primary text-primary-foreground font-semibold text-base btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

// Generate time slots from 12:00 PM to 10:00 PM in 30-minute intervals
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 12; h <= 22; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 22 && m > 0) break;
      const hour12 = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      const minuteStr = m === 0 ? "00" : "30";
      slots.push(`${hour12}:${minuteStr} ${ampm}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

export default function ReservationSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const { actor } = useActor();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.date ||
      !form.time ||
      !form.partySize
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      if (actor) {
        await actor.addReservation(
          form.name,
          form.date,
          form.time,
          BigInt(Number(form.partySize)),
          form.specialRequests,
          `${form.email} | ${form.phone}`,
        );
      }
      setSubmitted(true);
      toast.success("Reservation confirmed! We look forward to welcoming you.");
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        partySize: "",
        specialRequests: "",
      });
    } catch {
      toast.error("Reservation failed. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="reserve"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 bg-[oklch(0.12_0_0)] fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Panel */}
          <div className="space-y-6">
            <div>
              {/* EDIT: Change section label */}
              <span className="section-label">Book a Table</span>
              {/* EDIT: Change section heading */}
              <h2 className="section-heading">Reserve Your Experience</h2>
              <span className="section-divider" />
            </div>

            {/* EDIT: Change the description text */}
            <p className="text-muted-foreground leading-relaxed">
              Join us for an unforgettable dining experience. Our team is
              dedicated to making every visit special — from intimate dinners to
              celebratory gatherings.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-foreground/80">
                <span className="text-secondary text-xl">🕐</span>
                {/* EDIT: Update your operating hours */}
                <span className="text-sm">Mon–Fri: 11:00 AM – 10:00 PM</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <span className="text-secondary text-xl">🕐</span>
                <span className="text-sm">Sat–Sun: 10:00 AM – 11:00 PM</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <span className="text-secondary text-xl">📍</span>
                {/* EDIT: Update address */}
                <span className="text-sm">
                  123 Restaurant Street, City Name, Country
                </span>
              </div>
            </div>

            {/* Decorative image */}
            <div className="rounded-lg overflow-hidden aspect-video hidden lg:block">
              <img
                src="/assets/generated/food-salmon.dim_600x400.jpg"
                alt="A beautiful plated dish"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Reservation Form */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            {submitted ? (
              <div
                data-ocid="reservation.success_state"
                className="text-center py-12 space-y-4"
              >
                <div className="text-5xl">🎉</div>
                <h3 className="font-display text-2xl text-secondary">
                  Table Reserved!
                </h3>
                <p className="text-muted-foreground">
                  We'll send a confirmation to your email.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-primary hover:underline"
                >
                  Make another reservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="res-name"
                      className="text-sm text-foreground/80"
                    >
                      Full Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="res-name"
                      data-ocid="reservation.input"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="res-email"
                      className="text-sm text-foreground/80"
                    >
                      Email <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="res-email"
                      data-ocid="reservation.input"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="res-phone"
                      className="text-sm text-foreground/80"
                    >
                      Phone
                    </Label>
                    <Input
                      id="res-phone"
                      data-ocid="reservation.input"
                      type="tel"
                      placeholder="+00 0000 000000"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="res-date"
                      className="text-sm text-foreground/80"
                    >
                      Date <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="res-date"
                      data-ocid="reservation.input"
                      type="date"
                      value={form.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm text-foreground/80">
                      Time <span className="text-primary">*</span>
                    </Label>
                    <Select
                      onValueChange={(v) => updateField("time", v)}
                      value={form.time}
                    >
                      <SelectTrigger
                        data-ocid="reservation.select"
                        className="bg-background border-border"
                      >
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm text-foreground/80">
                      Party Size <span className="text-primary">*</span>
                    </Label>
                    <Select
                      onValueChange={(v) => updateField("partySize", v)}
                      value={form.partySize}
                    >
                      <SelectTrigger
                        data-ocid="reservation.select"
                        className="bg-background border-border"
                      >
                        <SelectValue placeholder="Guests" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n} {n === 1 ? "Guest" : "Guests"}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="res-requests"
                    className="text-sm text-foreground/80"
                  >
                    Special Requests
                  </Label>
                  <Textarea
                    id="res-requests"
                    data-ocid="reservation.textarea"
                    placeholder="Allergies, special occasions, seating preferences..."
                    value={form.specialRequests}
                    onChange={(e) =>
                      updateField("specialRequests", e.target.value)
                    }
                    rows={3}
                    className="bg-background border-border resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-ocid="reservation.submit_button"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-md bg-primary text-primary-foreground font-semibold text-base btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Reserving..." : "Reserve Table"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

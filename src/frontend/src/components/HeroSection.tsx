import { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 hero-overlay" aria-hidden="true" />

      {/* Hero Content */}
      <div
        className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* EDIT: Change the establishment year */}
        <p className="section-label mb-4" style={{ marginBottom: "1rem" }}>
          EST. 2026
        </p>

        {/* EDIT: Change this to your restaurant name */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none mb-6"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
        >
          Bella Italia
        </h1>

        {/* EDIT: Change this tagline to reflect your restaurant's identity */}
        <p className="text-lg md:text-xl text-foreground/75 font-light tracking-wide mb-10 max-w-xl mx-auto">
          Where Every Dish Tells a Story
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#menu"
            data-ocid="hero.primary_button"
            className="px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-semibold text-base btn-primary min-w-[160px] text-center"
          >
            View Menu
          </a>
          <a
            href="#reserve"
            data-ocid="hero.secondary_button"
            className="px-8 py-3.5 rounded-md border-2 border-secondary text-secondary font-semibold text-base btn-outline-gold min-w-[160px] text-center"
          >
            Reserve a Table
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-foreground/50 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-secondary/60 to-transparent" />
      </div>
    </section>
  );
}

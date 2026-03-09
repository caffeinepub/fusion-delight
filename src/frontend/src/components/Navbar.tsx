import { useEffect, useState } from "react";

// EDIT: Update the restaurant name in the logo
const RESTAURANT_NAME = "Bella Italia";

const NAV_LINKS = [
  // EDIT: Add or remove nav links to match your site sections
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Chefs", href: "#chefs" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.1_0_0/0.96)] backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          {/* biome-ignore lint/a11y/useValidAnchor: anchor with hash href + closeMobile is valid navigation */}
          <a
            href="#home"
            data-ocid="nav.link"
            className="font-display text-xl md:text-2xl font-bold text-secondary hover:text-secondary/80 transition-colors"
            onClick={closeMobile}
          >
            {RESTAURANT_NAME}
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid="nav.link"
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-secondary transition-colors rounded-md hover:bg-white/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#reserve"
                data-ocid="nav.primary_button"
                className="ml-3 px-5 py-2.5 text-sm font-semibold rounded-md bg-primary text-primary-foreground btn-primary"
              >
                Reserve
              </a>
            </li>
          </ul>

          {/* Hamburger Button */}
          <button
            type="button"
            data-ocid="nav.toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center gap-[6px] w-10 h-10 rounded-md hover:bg-white/5 transition-colors"
          >
            <span
              className={`hamburger-line line-1 ${mobileOpen ? "hamburger-open" : ""}`}
            />
            <span
              className={`hamburger-line line-2 ${mobileOpen ? "hamburger-open" : ""}`}
            />
            <span
              className={`hamburger-line line-3 ${mobileOpen ? "hamburger-open" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          data-ocid="nav.panel"
          className="md:hidden bg-[oklch(0.12_0_0/0.98)] backdrop-blur-md border-t border-border animate-mobile-slide-down"
        >
          <ul className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={closeMobile}
                  className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-secondary hover:bg-white/5 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              {/* biome-ignore lint/a11y/useValidAnchor: anchor with hash href + closeMobile is valid navigation */}
              <a
                href="#reserve"
                data-ocid="nav.primary_button"
                onClick={closeMobile}
                className="block mt-2 px-4 py-3 text-sm font-semibold text-center rounded-md bg-primary text-primary-foreground btn-primary"
              >
                Reserve a Table
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

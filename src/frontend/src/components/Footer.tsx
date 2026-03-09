import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

// EDIT: Update restaurant name and description in the footer
const RESTAURANT_NAME = "Bella Italia";
// EDIT: Update the footer tagline
const TAGLINE = "Where Every Dish Tells a Story";
// EDIT: Update the footer description
const DESCRIPTION =
  "Experience the finest dining in an atmosphere of warmth and elegance. Every dish crafted with passion and the freshest seasonal ingredients.";

// EDIT: Update social media URLs to your actual profiles
const SOCIAL_LINKS = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Chefs", href: "#chefs" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
  { label: "Reserve", href: "#reserve" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-[oklch(0.08_0_0)] border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <a
              href="#home"
              data-ocid="footer.link"
              className="font-display text-2xl font-bold text-secondary hover:text-secondary/80 transition-colors"
            >
              {RESTAURANT_NAME}
            </a>
            <p className="text-muted-foreground text-sm italic">{TAGLINE}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {DESCRIPTION}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="footer.link"
                    className="text-muted-foreground text-sm hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social + Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm tracking-wider uppercase">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    data-ocid="footer.link"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-secondary hover:border-secondary transition-all duration-200 hover:bg-secondary/10"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-foreground mb-2 text-sm tracking-wider uppercase">
                Visit Us
              </h4>
              {/* EDIT: Replace with your restaurant address */}
              <p className="text-muted-foreground text-sm">
                123 Restaurant Street
              </p>
              <p className="text-muted-foreground text-sm">
                City Name, Country
              </p>
              {/* EDIT: Replace with your phone number */}
              <a
                href="tel:+000000000000"
                className="text-muted-foreground text-sm hover:text-secondary transition-colors block"
              >
                +00 0000 000000
              </a>
              {/* EDIT: Replace with your email */}
              <a
                href="mailto:contact@restaurant.com"
                className="text-muted-foreground text-sm hover:text-secondary transition-colors block"
              >
                contact@restaurant.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Bella Italia | All Rights Reserved
          </p>
          <p className="text-muted-foreground text-xs">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

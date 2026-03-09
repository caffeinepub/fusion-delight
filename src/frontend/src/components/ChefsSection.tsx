import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

// EDIT: Replace chef data with your actual chefs
const CHEFS = [
  {
    // EDIT: Change name, title, bio, and image for Chef 1
    name: "Chef Name",
    title: "Executive Chef",
    bio: "With over 20 years of culinary excellence, our Executive Chef brings a world-class perspective to every dish. Trained at Le Cordon Bleu and refined across three continents.",
    image: "/assets/generated/chef-1.dim_400x500.jpg",
  },
  {
    // EDIT: Change name, title, bio, and image for Chef 2
    name: "Chef Name",
    title: "Head Pastry Chef",
    bio: "A master of sweet craft, our Pastry Chef transforms the finest ingredients into extraordinary creations. Each dessert is a carefully composed expression of flavour and beauty.",
    image: "/assets/generated/chef-2.dim_400x500.jpg",
  },
  {
    // EDIT: Change name, title, bio, and image for Chef 3
    name: "Chef Name",
    title: "Sous Chef",
    bio: "Our Sous Chef's passion for bold flavours and precise technique ensures every plate that leaves our kitchen meets the highest standards of taste and presentation.",
    image: "/assets/generated/chef-3.dim_400x500.jpg",
  },
];

export default function ChefsSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="chefs"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 bg-[oklch(0.12_0_0)] fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          {/* EDIT: Change section label */}
          <span className="section-label">The Team</span>
          {/* EDIT: Change section heading */}
          <h2 className="section-heading">Meet Our Chefs</h2>
          <span className="section-divider mx-auto" />
        </div>

        {/* Chefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CHEFS.map((chef, i) => (
            <div
              key={`${chef.title}-${i}`}
              data-ocid={`chefs.item.${i + 1}`}
              className="chef-card group bg-card border border-border rounded-xl overflow-hidden"
            >
              {/* Chef Photo */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={chef.image}
                  alt={`${chef.name} - ${chef.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {/* Chef Info */}
              <div className="p-6 space-y-2">
                <p className="text-xs font-semibold tracking-widest uppercase text-secondary">
                  {chef.title}
                </p>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {chef.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {chef.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

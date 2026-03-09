import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MenuCategory } from "../backend";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useGetMenu } from "../hooks/useQueries";

// EDIT: Map dish names to their food images. Add or update entries as your menu changes.
const MENU_IMAGES: Record<string, string> = {
  "Samosa Chaat": "/assets/generated/menu-bruschetta.dim_400x300.jpg",
  "Dal Shorba": "/assets/generated/menu-soup.dim_400x300.jpg",
  "Paneer Tikka": "/assets/generated/menu-calamari.dim_400x300.jpg",
  "Garden Salad": "/assets/generated/menu-salad.dim_400x300.jpg",
  "Butter Chicken": "/assets/generated/menu-salmon.dim_400x300.jpg",
  "Lamb Rogan Josh": "/assets/generated/menu-pasta-carbonara.dim_400x300.jpg",
  "Chicken Tikka Masala":
    "/assets/generated/menu-chicken-tikka.dim_400x300.jpg",
  "Beef Wellington": "/assets/generated/menu-beef-wellington.dim_400x300.jpg",
  "Gulab Jamun": "/assets/generated/menu-lava-cake.dim_400x300.jpg",
  "Mango Kulfi": "/assets/generated/menu-creme-brulee.dim_400x300.jpg",
  Tiramisu: "/assets/generated/menu-tiramisu.dim_400x300.jpg",
  "Artisan Sorbet": "/assets/generated/menu-sorbet.dim_400x300.jpg",
  "Mango Lassi": "/assets/generated/menu-juice.dim_400x300.jpg",
  "Masala Chai": "/assets/generated/menu-craft-beer.dim_400x300.jpg",
  "Cocktail of the Day": "/assets/generated/menu-cocktail.dim_400x300.jpg",
  "Fresh Juice": "/assets/generated/menu-juice.dim_400x300.jpg",
};

function MenuCard({
  item,
  index,
}: {
  item: { name: string; description: string; price: number };
  index: number;
}) {
  const imageSrc = MENU_IMAGES[item.name];

  return (
    <div
      data-ocid={`menu.item.${index + 1}`}
      className="menu-card bg-card border border-border rounded-lg overflow-hidden flex flex-col"
    >
      {imageSrc && (
        <div className="relative overflow-hidden aspect-[4/3] w-full">
          <img
            src={imageSrc}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-semibold text-foreground leading-snug">
            {item.name}
          </h3>
          <span className="text-secondary font-bold text-base whitespace-nowrap flex-shrink-0">
            ${item.price}
          </span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const { data: menuData } = useGetMenu();

  const menu: MenuCategory[] = menuData || [];

  return (
    <section
      id="menu"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Our Menu</span>
          <h2 className="section-heading">A Feast for Every Palate</h2>
          <span className="section-divider mx-auto" />
        </div>

        <Tabs defaultValue={menu[0]?.category || "Starters"} className="w-full">
          <TabsList
            data-ocid="menu.tab"
            className="flex flex-wrap justify-center gap-2 bg-transparent border border-border rounded-lg p-1 mb-10 h-auto"
          >
            {menu.map((cat) => (
              <TabsTrigger
                key={cat.category}
                value={cat.category}
                data-ocid="menu.tab"
                className="px-6 py-2.5 text-sm font-medium rounded-md text-foreground/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                {cat.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {menu.map((cat) => (
            <TabsContent key={cat.category} value={cat.category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {cat.items.map((item, i) => (
                  <MenuCard key={item.name} item={item} index={i} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

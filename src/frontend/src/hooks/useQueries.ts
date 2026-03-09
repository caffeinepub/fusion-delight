import { useQuery } from "@tanstack/react-query";
import type { MenuCategory, Review } from "../backend";
import { useActor } from "./useActor";

// ── Static fallback data (shown while backend loads or if empty) ──

export const STATIC_MENU: MenuCategory[] = [
  {
    category: "Starters",
    items: [
      {
        name: "Samosa Chaat",
        description:
          "Crispy golden samosas topped with tangy tamarind chutney, mint yogurt & pomegranate seeds",
        price: 8,
      },
      {
        name: "Dal Shorba",
        description:
          "Velvety lentil soup tempered with cumin, garlic & fresh coriander",
        price: 9,
      },
      {
        name: "Paneer Tikka",
        description:
          "Marinated cottage cheese cubes, char-grilled in tandoor, served with mint chutney",
        price: 14,
      },
      {
        name: "Garden Salad",
        description:
          "Mixed greens, cherry tomatoes, cucumber, red onion & house vinaigrette",
        price: 11,
      },
    ],
  },
  {
    category: "Mains",
    items: [
      {
        name: "Butter Chicken",
        description:
          "Slow-cooked chicken in rich tomato-butter gravy, aromatic spices & fresh cream",
        price: 26,
      },
      {
        name: "Lamb Rogan Josh",
        description:
          "Slow-braised tender lamb, Kashmiri chillies, whole spices & saffron-scented sauce",
        price: 30,
      },
      {
        name: "Chicken Tikka Masala",
        description:
          "Tandoor-roasted chicken in velvety masala sauce, basmati rice & warm naan",
        price: 24,
      },
      {
        name: "Beef Wellington",
        description:
          "Tender beef fillet, mushroom duxelles, golden pastry crust & red wine jus",
        price: 42,
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        name: "Gulab Jamun",
        description:
          "Soft milk-solid dumplings soaked in rose-cardamom sugar syrup, served warm",
        price: 9,
      },
      {
        name: "Mango Kulfi",
        description:
          "Traditional Indian ice cream with Alphonso mango, pistachio & rose water",
        price: 10,
      },
      {
        name: "Tiramisu",
        description:
          "Mascarpone cream, espresso-soaked ladyfingers, cocoa dusting & dark chocolate",
        price: 11,
      },
      {
        name: "Artisan Sorbet",
        description:
          "Three scoops of house-made seasonal sorbet, fresh mint & citrus zest",
        price: 8,
      },
    ],
  },
  {
    category: "Drinks",
    items: [
      {
        name: "Mango Lassi",
        description:
          "Chilled yogurt blended with ripe Alphonso mango, a pinch of cardamom & honey",
        price: 7,
      },
      {
        name: "Masala Chai",
        description:
          "Freshly brewed spiced tea with ginger, cardamom, cinnamon & full-cream milk",
        price: 5,
      },
      {
        name: "Cocktail of the Day",
        description:
          "Signature creation by our mixologist — changes daily with the season",
        price: 14,
      },
      {
        name: "Fresh Juice",
        description:
          "Cold-pressed seasonal fruits, no added sugar — ask for today's blend",
        price: 6,
      },
    ],
  },
];

export const STATIC_REVIEWS: Review[] = [
  {
    id: BigInt(1),
    date: BigInt(Date.now()),
    name: "Guest Name",
    comment:
      "Amazing dining experience! The food was exceptional and the service was impeccable. Every dish was a work of art — I'll definitely be returning soon.",
    rating: BigInt(5),
  },
  {
    id: BigInt(2),
    date: BigInt(Date.now()),
    name: "Guest Name",
    comment:
      "Best restaurant in the city. Highly recommend the Butter Chicken — perfectly spiced and presented. The atmosphere is intimate and the staff are wonderful.",
    rating: BigInt(5),
  },
  {
    id: BigInt(3),
    date: BigInt(Date.now()),
    name: "Guest Name",
    comment:
      "Fantastic atmosphere and delicious food. The seasonal menu shows real creativity and passion. A truly memorable evening with exceptional wines to match.",
    rating: BigInt(4),
  },
];

export function useGetMenu() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuCategory[]>({
    queryKey: ["menu"],
    queryFn: async () => {
      if (!actor) return STATIC_MENU;
      try {
        const result = await actor.getMenu();
        return result.length > 0 ? result : STATIC_MENU;
      } catch {
        return STATIC_MENU;
      }
    },
    enabled: !!actor && !isFetching,
    placeholderData: STATIC_MENU,
  });
}

export function useGetReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return STATIC_REVIEWS;
      try {
        const result = await actor.getReviews();
        return result.length > 0 ? result : STATIC_REVIEWS;
      } catch {
        return STATIC_REVIEWS;
      }
    },
    enabled: !!actor && !isFetching,
    placeholderData: STATIC_REVIEWS,
  });
}

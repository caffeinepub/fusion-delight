import { useCallback, useEffect, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

// EDIT: Update gallery images and dish names to match your restaurant
const GALLERY_ITEMS = [
  {
    src: "/assets/generated/food-pasta.dim_600x400.jpg",
    alt: "Pasta Carbonara",
    label: "Pasta Carbonara",
  },
  {
    src: "/assets/generated/food-salmon.dim_600x400.jpg",
    alt: "Grilled Salmon",
    label: "Grilled Salmon",
  },
  {
    src: "/assets/generated/food-dessert.dim_600x400.jpg",
    alt: "Chocolate Lava Cake",
    label: "Chocolate Lava Cake",
  },
  {
    src: "/assets/generated/food-bruschetta.dim_600x400.jpg",
    alt: "Bruschetta",
    label: "Bruschetta",
  },
  {
    src: "/assets/generated/food-curry.dim_600x400.jpg",
    alt: "Chicken Tikka",
    label: "Chicken Tikka",
  },
  {
    src: "/assets/generated/food-cocktail.dim_600x400.jpg",
    alt: "Signature Cocktail",
    label: "Signature Cocktail",
  },
];

export default function GallerySection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
    );
  }, []);

  const goToNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % GALLERY_ITEMS.length,
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const activeItem =
    lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* EDIT: Change section label */}
          <span className="section-label">The Gallery</span>
          {/* EDIT: Change section heading */}
          <h2 className="section-heading">Our Culinary Creations</h2>
          <span className="section-divider mx-auto" />
        </div>

        {/* Masonry-style responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALLERY_ITEMS.map((item, i) => (
            <button
              type="button"
              key={item.src}
              data-ocid={`gallery.item.${i + 1}`}
              className="gallery-card relative group cursor-pointer text-left w-full bg-transparent border-0 p-0"
              onClick={() => openLightbox(i)}
              aria-label={`View ${item.label} in lightbox`}
            >
              {/* Slightly vary heights for masonry feel */}
              <div
                className={`relative overflow-hidden rounded-lg ${
                  i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Hover overlay with dish name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="font-display text-secondary text-lg font-semibold translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.label}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {activeItem && (
        <dialog
          data-ocid="gallery.modal"
          open
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full max-w-none max-h-none m-0 p-0 border-0"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          aria-label={`Lightbox: ${activeItem.label}`}
          onKeyDown={(e) => e.key === "Escape" && closeLightbox()}
        >
          {/* Backdrop click to close */}
          <button
            type="button"
            className="absolute inset-0 w-full h-full cursor-default bg-transparent border-0"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          />

          {/* Close button */}
          <button
            type="button"
            data-ocid="gallery.close_button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full w-11 h-11 flex items-center justify-center transition-all duration-200 z-10"
            aria-label="Close lightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
              role="img"
            >
              <title>Close</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Prev button */}
          <button
            type="button"
            data-ocid="gallery.pagination_prev"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-3 sm:left-6 text-white/80 hover:text-white bg-black/50 hover:bg-primary rounded-full w-11 h-11 flex items-center justify-center transition-all duration-200 z-10"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
              role="img"
            >
              <title>Previous</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Image container */}
          <div className="relative flex flex-col items-center px-16 sm:px-20 max-w-5xl w-full z-10">
            <img
              src={activeItem.src}
              alt={activeItem.alt}
              className="max-h-[75vh] max-w-full w-auto rounded-xl shadow-2xl object-contain"
            />
            {/* Caption */}
            <p className="mt-4 font-display text-secondary text-lg font-semibold tracking-wide">
              {activeItem.label}
            </p>
            {/* Dot indicators */}
            <div className="flex gap-2 mt-3">
              {GALLERY_ITEMS.map((galleryItem, idx) => (
                <button
                  type="button"
                  key={galleryItem.src}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === lightboxIndex
                      ? "bg-secondary scale-125"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            type="button"
            data-ocid="gallery.pagination_next"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-3 sm:right-6 text-white/80 hover:text-white bg-black/50 hover:bg-primary rounded-full w-11 h-11 flex items-center justify-center transition-all duration-200 z-10"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
              role="img"
            >
              <title>Next</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </dialog>
      )}
    </section>
  );
}

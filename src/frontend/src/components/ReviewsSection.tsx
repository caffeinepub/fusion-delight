import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useGetReviews } from "../hooks/useQueries";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: star positions are stable
          key={i}
          className={`text-base ${
            i < rating ? "text-secondary" : "text-muted-foreground/40"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const { data: reviews } = useGetReviews();

  const displayReviews = reviews || [];

  return (
    <section
      id="reviews"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 px-4 fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* EDIT: Change section label */}
          <span className="section-label">Testimonials</span>
          {/* EDIT: Change section heading */}
          <h2 className="section-heading">What Our Guests Say</h2>
          <span className="section-divider mx-auto" />
        </div>

        {/* Reviews Grid */}
        {displayReviews.length === 0 ? (
          <div
            data-ocid="reviews.empty_state"
            className="text-center py-16 text-muted-foreground"
          >
            No reviews yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayReviews.slice(0, 6).map((review, i) => {
              const initials = review.name
                .split(" ")
                .map((w: string) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              const ratingNum = Number(review.rating);

              return (
                <div
                  key={Number(review.id)}
                  data-ocid={`reviews.item.${i + 1}`}
                  className="bg-card border border-border rounded-xl p-6 space-y-4 hover:border-secondary/30 transition-colors"
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <span className="text-secondary font-semibold text-sm">
                        {initials}
                      </span>
                    </div>
                    <div>
                      {/* EDIT: Reviews come from backend or STATIC_REVIEWS in useQueries.ts */}
                      <p className="font-semibold text-foreground text-sm">
                        {review.name}
                      </p>
                      <StarRating rating={ratingNum} />
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-muted-foreground text-sm leading-relaxed relative">
                    <span className="text-secondary/30 text-4xl font-serif absolute -top-2 -left-1 leading-none">
                      &quot;
                    </span>
                    <p className="pt-3">{review.comment}</p>
                  </blockquote>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

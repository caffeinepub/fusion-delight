import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that uses IntersectionObserver to track element visibility.
 * Once visible, stays visible (one-shot trigger for fade-in animations).
 */
export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already visible (e.g., reduced motion), skip observer
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first trigger — stays visible
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        ...options,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, options]);

  return { ref, isVisible };
}

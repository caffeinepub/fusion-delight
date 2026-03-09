import { Toaster } from "@/components/ui/sonner";
import ChefsSection from "./components/ChefsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import Navbar from "./components/Navbar";
import ReservationSection from "./components/ReservationSection";
import ReviewsSection from "./components/ReviewsSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero — Full viewport height landing section */}
        <HeroSection />

        {/* Menu — Tabbed cuisine categories */}
        <MenuSection />

        {/* Reservation — Table booking form */}
        <ReservationSection />

        {/* Gallery — Food photography grid */}
        <GallerySection />

        {/* Chefs — Team section */}
        <ChefsSection />

        {/* Reviews — Customer testimonials */}
        <ReviewsSection />

        {/* Contact — Contact info + form + map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.15 0 0)",
            border: "1px solid oklch(0.22 0 0)",
            color: "oklch(1 0 0)",
          },
        }}
      />
    </div>
  );
}

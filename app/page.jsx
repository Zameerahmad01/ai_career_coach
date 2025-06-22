import HeroSection from "../components/sections/HeroSection";
import CareerServicesSection from "../components/sections/CareerServicesSection";
import StatsSection from "../components/sections/StatsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import FAQSection from "../components/sections/FAQSection";
import CTASection from "../components/sections/CTASection";
import Features from "../components/sections/Features";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <main>
        <HeroSection />
        <CareerServicesSection />
        <Features />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
}

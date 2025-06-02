import Features from "@/components/landingPage/Features";
import HeroSection from "@/components/landingPage/HeroSection";
import Statistics from "@/components/landingPage/Statistics";
import HowItsWork from "@/components/landingPage/HowItsWork";
import Testimonials from "@/components/landingPage/Testimonials";
import Faq from "@/components/landingPage/Faq";
import Cta from "@/components/landingPage/Cta";

export default function Home() {
  return (
    <>
      <div className="grid-background"></div>
      <HeroSection />
      <Features />
      <Statistics />
      <HowItsWork />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}

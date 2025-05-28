import Examples from "@/components/examples";
import Features from "@/components/features";
import GradientBackground from "@/components/gradient-background";
import HeroSection from "@/components/hero";

export default function Home() {
  return (
    <div className="">
      <GradientBackground className="opacity-70" />
      <HeroSection />
      <Examples className="mt-16 md:mt-32" />
      <Features className="mt-16 md:mt-32" />
    </div>
  );
}

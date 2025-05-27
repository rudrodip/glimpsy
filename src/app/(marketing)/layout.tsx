import GradientBackground from "@/components/gradient-background";
import { Navbar } from "@/components/Navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <GradientBackground className="opacity-70" />
      <Navbar />
      {children}
    </div>
  )
}
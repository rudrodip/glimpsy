import GradientBackground from "@/components/gradient-background";
import { Navbar } from "@/components/Navbar";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-screen flex flex-col">
      <Navbar />
      <GradientBackground className="dark:opacity-10 opacity-20" />
      {children}
    </div>
  )
}
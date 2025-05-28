import Footer from "@/components/footer";
import { Navbar } from "@/components/Navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full min-h-screen flex flex-col px-2 md:px-0">
      <Navbar />
      {children}
      <Footer className="mt-8" />
    </div>
  )
}
import { Navbar } from "@/components/Navbar";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      {children}
    </div>
  )
}
import Link from "next/link";
import ModeToggle from "./theme-toggle";
import Image from "next/image";
import Socials from "@/components/socials";

export function Navbar() {
  return (
    <div className="sticky top-0 p-4 z-50">
      <div className="flex items-center justify-between h-full w-full max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/favicon.png" alt="Glimpsy" width={20} height={20} />
            <span className="text-lg font-bold tracking-tight primary-gradient gradient-text gradient-flow-left-to-right group-hover:opacity-80 transition-opacity duration-300">
              Glimpsy
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/examples"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Examples
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Socials />
          <ModeToggle className="rounded-full size-10 bg-transparent" variant="ghost" />
        </div>
      </div>
    </div>
  );
}

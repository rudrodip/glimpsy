"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ModeToggle from "./theme-toggle";
import Image from "next/image";
import Socials from "@/components/socials";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navConfig } from "@/lib/config/nav.config";

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const THRESHOLD = isMobile ? 50 : 500;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div 
      ref={navRef}
      className={cn(
        "sticky top-0 py-2 z-50 transition-all transform-gpu duration-300 ease-out", 
        scrollY > THRESHOLD && "w-full max-w-5xl mx-auto rounded-lg md:rounded-xl top-2 bg-background/60 dark:bg-background/70 backdrop-blur-sm",
      )}
      style={scrollY < THRESHOLD ? { top: `${Math.round(scrollY / 100) * 1.5}px` } : undefined}
    >
      <div className={cn("flex items-center justify-between h-full w-full container mx-auto transition-all transform-gpu duration-300 ease-out", scrollY > THRESHOLD && "max-w-5xl px-4")}>
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/favicon.png" alt="Glimpsy" width={20} height={20} />
            <span className="text-lg font-bold tracking-tight primary-gradient gradient-text gradient-flow-left-to-right group-hover:opacity-80 transition-opacity duration-300">
              Glimpsy
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-4">
            {navConfig.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
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

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const pathname = usePathname();
  
  const isActive = (() => {
    if (href.includes('#')) {
      const [linkPath, linkHash] = href.split('#');
      const currentHash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
      
      if (linkPath === '/' || linkPath === '') {
        return pathname === '/' && currentHash === linkHash;
      }
      
      return pathname === linkPath && currentHash === linkHash;
    }
    
    return pathname === href;
  })();

  return (
    <Link href={href} className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", isActive && "text-foreground")}>
      {children}
    </Link>
  )
}
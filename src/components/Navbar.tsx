"use client";

import Link from "next/link";
import ModeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import Image from "next/image";

export function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 h-14 border-b bg-background/95 backdrop-blur-sm z-50">
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

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Button
            asChild
            size="sm"
            className="h-8 px-3"
          >
            <Link href="/">Create</Link>
          </Button>
          <ModeToggle className="rounded-full size-8" />
        </div>
      </div>
    </div>
  );
}

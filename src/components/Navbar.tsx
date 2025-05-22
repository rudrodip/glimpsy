"use client";

import { cn } from "@/lib/utils";
import { EyeIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 h-16 border-b border-primary/40 bg-background/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="flex items-center justify-between h-full w-full max-w-7xl mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 group-hover:from-primary/30 group-hover:to-primary/40 transition-all duration-300 border border-primary/30 group-hover:border-primary/50 shadow-sm">
            <EyeIcon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-0.5 -right-0.5">
              <Sparkles className="h-3 w-3 text-primary/70" />
            </span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">Glimpsy</span>
        </Link>        <div className="hidden sm:flex items-center space-x-6">
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/examples"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            Examples
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
          <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm font-medium px-4 py-2 rounded-md border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
          >
            Dashboard
          </Link>
          <div className="h-6 w-px bg-primary/20 hidden sm:block" />
          <Link
            href="/create"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium bg-gradient-to-r from-primary/90 to-primary text-primary-foreground px-4 py-2 rounded-md hover:shadow-md hover:from-primary hover:to-primary/90 transition-all duration-300"
          >
            <span>Create</span>
            <EyeIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ModeToggle />
        </div>
      </div>

    </div>
  );
}

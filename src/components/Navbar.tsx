"use client";

import { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (    <div className="fixed top-0 inset-x-0 h-16 border-b border-primary bg-background z-50 shadow-md">
      <div className="flex items-center justify-between h-full w-full max-w-7xl mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors border border-primary/50">
            <EyeIcon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-primary">
            Glimpsy
          </span>
        </Link>

        <div className="hidden sm:flex items-center space-x-6">
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

        <div className="flex items-center gap-2">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium px-4 py-2 rounded-md hover:bg-muted transition-colors"
          >
            Dashboard
          </Link>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <Link
            href="/create" 
            className="hidden sm:flex items-center gap-1 text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            <span>Create</span>
            <EyeIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

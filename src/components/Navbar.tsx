"use client";

import { cn } from "@/lib/utils";
import { EyeIcon, Sparkles, SwatchBook } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 h-20 border-b border-primary/10 bg-background/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="flex items-center justify-between h-full w-full max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-background rounded-full p-2 border border-primary/10">
                <SwatchBook className="h-7 w-7 text-primary group-hover:animate-pulse" />
              </div>
            </div>
            <AnimatedGradientText
              className="text-xl font-bold tracking-tight"
              colorFrom="#6d28d9"
              colorTo="#8b5cf6"
              speed={1.5}
            >
              Glimpsy
            </AnimatedGradientText>
          </Link>
          <div className="hidden sm:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/examples"
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              Examples
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-base font-medium px-5 py-2.5 rounded-md border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
          >
            Dashboard
          </Link>{" "}
          <div className="h-6 w-px bg-primary/20 hidden sm:block" />
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 text-base font-medium relative overflow-hidden group rounded-md"
          >
            <Button
              onClick={() => {
                redirect("/");
              }}
              className="cursor-pointer"
            >
              Create
            </Button>
          </Link>
          <div className="ml-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

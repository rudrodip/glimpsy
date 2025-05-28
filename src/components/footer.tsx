import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site.config";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Sparkles, Heart } from "lucide-react";
import { AnimatedBorderCard } from "@/components/animated-border-card";

export default function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("w-full mt-20 mb-8", className)}>
      <div className="container mx-auto">
        <AnimatedBorderCard className="p-px rounded-2xl" gradientSize={200}>
          <div className="bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
              <div className="lg:col-span-1 space-y-6">
                <div className="flex items-center gap-3">
                  <Image src="/favicon.png" alt="Logo" width={40} height={40} className="rounded-lg" />
                  <h2 className="font-heading text-3xl tracking-tighter font-bold primary-gradient gradient-text gradient-flow-left-to-right">
                    {siteConfig.name}
                  </h2>
                </div>
                <p className="text-foreground/70 leading-relaxed max-w-sm">
                  {siteConfig.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="primary-gradient gradient-flow-left-to-right border-none text-zinc-50 gap-2">
                    <Sparkles className="h-4 w-4 fill-zinc-50" />
                    <Link href="/studio">Start Creating</Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-semibold text-foreground">Features</h3>
                  <div className="space-y-3 text-sm">
                    <Link
                      href="/#features"
                      className="block text-foreground/70 hover:text-foreground transition-colors duration-200 hover:translate-x-1 transform"
                    >
                      Image Generation
                    </Link>
                    <Link
                      href="/#features"
                      className="block text-foreground/70 hover:text-foreground transition-colors duration-200 hover:translate-x-1 transform"
                    >
                      Text to Speech
                    </Link>
                    <Link
                      href="/#features"
                      className="block text-foreground/70 hover:text-foreground transition-colors duration-200 hover:translate-x-1 transform"
                    >
                      AI-Powered
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-semibold text-foreground">Resources</h3>
                  <div className="space-y-3 text-sm">
                    <Link
                      href="/about"
                      className="block text-foreground/70 hover:text-foreground transition-colors duration-200 transform"
                    >
                      About
                    </Link>
                    <Link
                      href="/#examples"
                      className="block text-foreground/70 hover:text-foreground transition-colors duration-200 transform"
                    >
                      Examples
                    </Link>
                    <Link
                      href="/changelog"
                      className="block text-foreground/70 hover:text-foreground transition-colors duration-200 transform"
                    >
                      Changelog
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-semibold text-foreground">Connect</h3>
                  <div className="space-y-3">
                    <a 
                      href={siteConfig.socials.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200 group"
                    >
                      <Icons.Github className="size-3 group-hover:scale-110 transition-transform duration-200" />
                      <span>GitHub</span>
                    </a>
                    <a 
                      href={siteConfig.socials.x} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200 group"
                    >
                      <Icons.X className="size-3 group-hover:scale-110 transition-transform duration-200" />
                      <span>X</span>
                    </a>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-xs text-foreground/60 mb-2">Built by</p>
                    <div className="space-y-1">
                      {siteConfig.contributors.map((contributor) => (
                        <a
                          key={contributor.name}
                          href={contributor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-foreground/70 hover:text-foreground transition-colors duration-200"
                        >
                          {contributor.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
              <p>
                © {currentYear}{" "}
                <Link href={siteConfig.origin} className="hover:text-foreground transition-colors duration-200">
                  {siteConfig.name}
                </Link>
                . All rights reserved.
              </p>
              <div className="flex items-center gap-2">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
                <span>for creators everywhere</span>
              </div>
            </div>
          </div>
        </AnimatedBorderCard>
      </div>
    </footer>
  )
}
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Image, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageSkeletonProps {
  className?: string;
}

export function ImageSkeleton({ className }: ImageSkeletonProps) {
  return (
    <div className={cn("w-full", className)}>
      <Card className="w-full bg-card/50 backdrop-blur-sm border border-border/40 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 animate-pulse">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Image className="h-5 w-5 text-primary/60" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted/60 rounded w-36 animate-pulse" />
              <div className="h-3 bg-muted/40 rounded w-52 animate-pulse" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="relative aspect-square w-full bg-gradient-to-br from-muted/20 via-muted/40 to-muted/20 rounded-lg overflow-hidden border border-border/20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
            
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className="border border-primary/10 animate-pulse"
                    style={{
                      animationDelay: `${i * 0.02}s`,
                      animationDuration: `${1 + Math.random()}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 bg-muted/30 rounded-full animate-pulse">
                <Palette className="h-8 w-8 text-primary/40" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 
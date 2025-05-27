"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioLines, Volume2, Download, Play, SkipBack, SkipForward, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioSkeletonProps {
  className?: string;
}

export function AudioSkeleton({ className }: AudioSkeletonProps) {
  return (
    <div className={cn("w-full", className)}>
      <Card className="w-full bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm border border-border/40 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AudioLines className="h-6 w-6 text-primary/60 animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-lg">
                <div className="h-5 bg-muted/60 rounded w-32 animate-pulse" />
              </CardTitle>
              <div className="h-4 bg-muted/40 rounded w-48 animate-pulse mt-1" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Audio visualizer */}
          <div className="relative h-24 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg overflow-hidden border border-border/20">
            <div className="absolute inset-0 flex items-center justify-center gap-1 px-6">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-primary/30 rounded-full animate-pulse"
                  style={{
                    width: '2px',
                    height: `${Math.random() * 60 + 10}px`,
                    animationDelay: `${i * 0.02}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                />
              ))}
            </div>

            <div className="absolute left-0 top-0 h-full bg-primary/10 w-1/3 animate-pulse" />
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="relative h-2 bg-muted/30 rounded-full">
              <div className="absolute left-0 top-0 h-full bg-primary/40 rounded-full w-1/3 animate-pulse" />
              <div className="absolute top-1/2 w-4 h-4 bg-primary/40 rounded-full shadow-lg transform -translate-y-1/2 animate-pulse left-1/3" />
            </div>

            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 animate-pulse" />
                <div className="h-3 bg-muted/60 rounded w-8 animate-pulse" />
              </div>
              <div className="h-3 bg-muted/60 rounded w-8 animate-pulse" />
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-muted/40 rounded-md animate-pulse flex items-center justify-center">
              <SkipBack className="h-4 w-4 text-muted-foreground/50" />
            </div>

            <div className="h-12 w-12 bg-muted/40 rounded-full animate-pulse flex items-center justify-center">
              <Play className="h-5 w-5 text-muted-foreground/50" />
            </div>

            <div className="h-10 w-10 bg-muted/40 rounded-md animate-pulse flex items-center justify-center">
              <SkipForward className="h-4 w-4 text-muted-foreground/50" />
            </div>

            <div className="flex items-center gap-2 flex-1 ml-4">
              <Volume2 className="h-4 w-4 text-muted-foreground/50" />
              <div className="flex-1 h-2 bg-muted/30 rounded-lg animate-pulse" />
            </div>

            <div className="h-10 bg-muted/40 rounded-md animate-pulse flex items-center gap-2 px-4">
              <Download className="h-4 w-4 text-muted-foreground/50" />
              <div className="h-3 bg-muted/30 rounded w-16 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
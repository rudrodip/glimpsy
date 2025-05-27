"use client";

import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Download,
  Volume2,
  SkipBack,
  SkipForward,
  AudioLines,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createWavBuffer } from "@/lib/utils";
import { AIResponse } from "@/types";
import { Slider } from "@/components/ui/slider";

interface AudioResponseProps {
  response: AIResponse;
  className?: string;
}

export function AudioResponseComponent({ response, className }: AudioResponseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Memoize visualizer bars so they don't change on every render
  const visualizerBars = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      height: Math.random() * 60 + 10
    })), []
  );

  useEffect(() => {
    if (response.data) {
      // Create audio URL from base64 data
      const pcmBuffer = Buffer.from(response.data, "base64");
      const wavBuffer = createWavBuffer(pcmBuffer);
      const blob = new Blob([wavBuffer], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.src = url;
      }

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [response.data]);

  // Separate effect for volume to avoid recreating audio source
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const progress = (clickX / rect.width) * duration;
      audioRef.current.currentTime = progress;
      setCurrentTime(progress);
    }
  }, [duration]);

  const handleSkip = useCallback((seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, [duration, currentTime]);

  const handleDownload = useCallback(() => {
    if (response.data) {
      const pcmBuffer = Buffer.from(response.data, "base64");
      const wavBuffer = createWavBuffer(pcmBuffer);
      const blob = new Blob([wavBuffer], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-audio.wav";
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [response.data]);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const progress = useMemo(() => 
    duration > 0 ? (currentTime / duration) * 100 : 0, 
    [currentTime, duration]
  );

  return (
    <div className={cn("w-full", className)}>
      <Card className="w-full bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm border border-border/40 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AudioLines className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Audio Generated</CardTitle>
              <p className="text-sm text-muted-foreground">
                Ready to play • Generated in {response.delta}ms
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="relative h-24 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg overflow-hidden border border-border/20">
            <div className="absolute inset-0 flex items-center justify-center gap-1 px-6">
              {visualizerBars.map((bar) => (
                <div
                  key={bar.id}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isPlaying
                      ? "bg-primary animate-pulse"
                      : "bg-primary/30"
                  )}
                  style={{
                    width: '2px',
                    height: `${bar.height}px`,
                    animationDelay: `${bar.id * 0.02}s`,
                  }}
                />
              ))}
            </div>

            <div
              className="absolute left-0 top-0 h-full bg-primary/10 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="space-y-2">
            <div
              ref={progressRef}
              className="relative h-2 bg-muted/30 rounded-full cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div
                className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 w-4 h-4 bg-primary rounded-full shadow-lg transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${progress}% - 8px)` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatTime(currentTime)}</span>
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleSkip(-10)}
              disabled={!duration}
              className="h-10 w-10"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              onClick={handlePlayPause}
              disabled={!response.data}
              className="h-12 w-12 rounded-full"
              size="icon"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => handleSkip(10)}
              disabled={!duration}
              className="h-10 w-10"
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2 flex-1 ml-4">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[volume]}
                onValueChange={useCallback((value: number[]) => setVolume(value[0]), [])}
                className="flex-1 h-2 bg-muted/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <Button
              variant="outline"
              onClick={handleDownload}
              disabled={!response.data}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
    </div>
  );
};

export const AudioResponse = memo(AudioResponseComponent);
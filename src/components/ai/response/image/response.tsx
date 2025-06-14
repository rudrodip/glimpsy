"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download, Share2, Maximize2,
  Image as ImageIcon,
  Palette,
  AlertTriangle,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AIResponse } from "@/types";

interface ImageResponseProps {
  response: AIResponse;
  className?: string;
}

export function ImageResponse({ response, className }: ImageResponseProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownload = () => {
    if (response.data) {
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${response.data}`;
      link.download = "generated-image.png";
      link.click();
    }
  };

  const handleShare = async () => {
    if (response.data && navigator.share) {
      try {
        const byteCharacters = atob(response.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });
        const file = new File([blob], 'generated-image.png', { type: 'image/png' });

        await navigator.share({
          title: 'AI Generated Image',
          text: 'Check out this AI-generated image!',
          files: [file],
        });
      } catch (error) {
        // ignore
      }
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
        <div className="relative max-w-full max-h-full">
          <img
            src={`data:image/png;base64,${response.data}`}
            alt="Generated image - fullscreen view"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleFullscreen}
            className="absolute top-4 right-4 bg-background/80 dark:bg-background/80 hover:bg-background/90 dark:hover:bg-background/90 backdrop-blur-sm"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <Card className="w-full bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm border border-border/40 shadow-xl overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Image Generated</CardTitle>
                {!response.error && (
                  <p className="text-sm text-muted-foreground">
                    Generated in {response.delta}ms
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleShare}
                disabled={!response.data}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {response.error && (
            <div className="relative">
              <div className="aspect-square w-full bg-gradient-to-br from-destructive/5 to-destructive/10 rounded-lg border border-destructive/20 flex items-center justify-center">
                <div className="text-center space-y-4 p-6">
                  <div className="p-3 bg-destructive/10 rounded-full w-fit mx-auto">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-destructive">Generation Failed</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      {response.error}
                    </p>
                    {response.error.includes("Rate limit") && (
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-3">
                        <Clock className="h-3 w-3" />
                        <span>Please wait a moment before trying again</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!response.error && (
            <div className="relative group">
              <div className="relative aspect-square w-full bg-gradient-to-br from-muted/10 to-muted/20 rounded-lg overflow-hidden border border-border/20 shadow-lg">
                {response.data ? (
                  <>
                    <img
                      src={`data:image/png;base64,${response.data}`}
                      alt="AI generated image"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={handleFullscreen}
                          className="bg-background/80 backdrop-blur-sm shadow-lg"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={handleDownload}
                          className="bg-background/80 backdrop-blur-sm shadow-lg"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Palette className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">No image data</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
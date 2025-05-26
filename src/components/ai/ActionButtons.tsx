"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUp, Sparkles } from "lucide-react";
import { ModeValue } from "@/types";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  prompt: string;
  mode: ModeValue;
  enhancing: boolean;
  onEnhance: () => void;
}

export function ActionButtons({ prompt, mode, enhancing, onEnhance }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-1">
      {mode === ModeValue.TEXT_TO_IMAGE && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={!prompt || enhancing}
                className={cn("aspect-square p-0 size-8 group/enhance", {
                  "cursor-not-allowed hover:bg-transparent text-muted-foreground hover:text-muted-foreground disabled:pointer-events-auto disabled:opacity-85": !prompt,
                  "cursor-pointer": prompt,
                })}
                onClick={onEnhance}
              >
                <Sparkles className={cn(
                  "size-4",
                  {
                    "group-hover/enhance:fill-pink-400 group-hover/enhance:stroke-rose-400 transition-all duration-150 ease-out": prompt
                  }
                )} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{prompt ? "Enhance your prompt" : "Enter your prompt first"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <Button
        type="submit"
        variant={prompt ? "default" : "outline"}
        disabled={!prompt || enhancing}
        className={cn("aspect-square p-0 size-8", {
          "cursor-not-allowed bg-muted hover:bg-muted text-muted-foreground hover:text-muted-foreground disabled:pointer-events-auto disabled:opacity-85": !prompt,
          "cursor-pointer": prompt,
        })}
      >
        <ArrowUp />
      </Button>
    </div>
  );
} 
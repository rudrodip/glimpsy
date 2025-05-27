"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUp, Sparkles, Square } from "lucide-react";
import { ModeValue } from "@/types";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useAI } from "./ai-context";

export function ActionButtons() {
  const { currentPrompt, currentMode, enhancing, handleEnhancePrompt, canStop, handleStop, isGeneratingResponse } = useAI();
  const isMacOs = navigator.userAgent.includes("Mac") || navigator.userAgent.includes("Macintosh");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifierPressed = isMacOs ? event.metaKey : event.ctrlKey;

      if (isModifierPressed && event.key.toLowerCase() === 'i' && currentMode === ModeValue.TEXT_TO_IMAGE && currentPrompt && !enhancing) {
        event.preventDefault();
        handleEnhancePrompt();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMacOs, currentMode, currentPrompt, enhancing, handleEnhancePrompt]);

  return (
    <div className="flex items-center gap-1">
      {currentMode === ModeValue.TEXT_TO_IMAGE && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={!currentPrompt || enhancing || isGeneratingResponse}
                className={cn("aspect-square p-0 size-8 group/enhance", {
                  "cursor-not-allowed hover:bg-transparent text-muted-foreground hover:text-muted-foreground disabled:pointer-events-auto disabled:opacity-85": !currentPrompt,
                  "cursor-pointer": currentPrompt,
                })}
                onClick={handleEnhancePrompt}
              >
                <Sparkles className={cn(
                  "size-4",
                  {
                    "group-hover/enhance:fill-pink-400 group-hover/enhance:stroke-rose-400 transition-all duration-150 ease-out": currentPrompt
                  }
                )} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="px-2">
              <div className="flex items-center gap-2">
                <p>{currentPrompt ? "Enhance your prompt" : "Enter your prompt first"}</p>
                <p className="text-xs px-1 py-0.5 rounded bg-linear-to-r from-rose-400 to-fuchsia-400 gradient-flow-left-to-right">
                  {isMacOs ? "⌘" : "Ctrl"} + I
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {canStop ? (
        <Button
          className="gap-2 px-2"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            handleStop();
          }}
        >
          <div className="border-2 border-background rounded-full aspect-square p-1 flex items-center justify-center">
            <Square className="size-2 fill-current" />
          </div>
          <span>Stop</span>
        </Button>
      )
        :
        (
          <Button
            type="submit"
            variant={currentPrompt ? "default" : "outline"}
            disabled={!currentPrompt || enhancing}
            className={cn("aspect-square p-0 size-8", {
              "cursor-not-allowed bg-muted hover:bg-muted text-muted-foreground hover:text-muted-foreground disabled:pointer-events-auto disabled:opacity-85": !currentPrompt,
              "cursor-pointer": currentPrompt,
            })}
          >
            <ArrowUp />
          </Button>
        )}
    </div>
  );
} 
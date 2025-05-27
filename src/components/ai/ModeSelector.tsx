"use client";

import { Select, SelectItem, SelectContent, SelectTrigger } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ModeValue } from "@/types";
import { MODE_OPTIONS } from "@/lib/constants";
import { useAI } from "./ai-context";

export function ModeSelector() {
  const { currentMode, handleModeChange, resetResponse } = useAI();
  const selectedMode = MODE_OPTIONS.find(option => option.value === currentMode);

  return (
    <div className="flex items-center gap-2">
      <Select
        value={currentMode}
        onValueChange={(value) => {
          handleModeChange(value as ModeValue);
          resetResponse();
        }}
      >
        <SelectTrigger
          className="gap-2 border-none bg-transparent dark:bg-transparent hover:bg-muted shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
          size="sm"
        >
          <div className="flex items-center gap-2">
            {selectedMode && <selectedMode.meta.icon className="w-4 h-4" />}
            {selectedMode?.meta.label || "Choose Mode"}
          </div>
        </SelectTrigger>
        <SelectContent>
          <TooltipProvider>
            {MODE_OPTIONS.map((option) => (
              <Tooltip key={option.value} delayDuration={0}>
                <TooltipTrigger asChild>
                  <SelectItem value={option.value} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <option.meta.icon className="w-4 h-4" />
                      {option.meta.label}
                    </div>
                  </SelectItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{option.meta.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </SelectContent>
      </Select>
    </div>
  );
}
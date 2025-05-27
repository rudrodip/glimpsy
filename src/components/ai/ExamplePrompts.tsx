"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ModeValue } from "@/types";
import { EXAMPLES } from "@/lib/constants";

interface ExamplePromptsProps {
  isExampleSelected: boolean;
  onExampleSelect: (prompt: string, mode: ModeValue) => void;
  onExampleClose: () => void;
}

export function ExamplePrompts({ 
  isExampleSelected, 
  onExampleSelect, 
  onExampleClose 
}: ExamplePromptsProps) {
  const handleExampleClick = (example: typeof EXAMPLES[number]) => {
    onExampleSelect(example.prompt, example.mode);
  };

  return (
    <div className="w-full flex items-center justify-center gap-4">
      {EXAMPLES.map((example) => (
        <Button
          key={example.prompt}
          type="button"
          variant="outline"
          size="sm"
          className="rounded-xl flex items-center gap-2 px-3 py-1.5 text-xs dark:bg-zinc-800 hover:dark:bg-zinc-900"
          onClick={() => handleExampleClick(example)}
        >
          <example.icon className="w-4 h-4 shrink-0" />
          <p>{example.promptLabel}</p>
        </Button>
      ))}
      {isExampleSelected && (
        <Button
          type="button"
          size="sm"
          className="p-0 aspect-square rounded-full size-8 bg-muted hover:bg-muted/50"
          variant="outline"
          onClick={onExampleClose}
        >
          <X />
        </Button>
      )}
    </div>
  );
} 
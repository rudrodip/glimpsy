"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { EXAMPLES } from "@/lib/constants";
import { useAI } from "./ai-context";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function ExamplePrompts({ className }: { className?: string }) {
  const { isExampleSelected, handleExampleSelect, handleExampleClose, generatedOnce, enhancing, isGeneratingResponse } = useAI();
  const pathname = usePathname();

  const handleExampleClick = (example: typeof EXAMPLES[number]) => {
    handleExampleSelect(example.prompt, example.mode);
  };

  if (pathname !== "/" && generatedOnce) {
    return null;
  }

  return (
    <motion.div layoutId="example-prompts" id="example-prompts" className={cn("w-full flex flex-wrap items-center justify-center gap-2 md:gap-4", className)}>
      {EXAMPLES.map((example) => (
        <Button
          key={example.prompt}
          type="button"
          variant="outline"
          size="sm"
          disabled={isGeneratingResponse || enhancing}
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
          disabled={isGeneratingResponse || enhancing}
          className="p-0 aspect-square rounded-full size-8 dark:bg-zinc-800 hover:dark:bg-zinc-900"
          variant="outline"
          onClick={handleExampleClose}
        >
          <X />
        </Button>
      )}
    </motion.div>
  );
}
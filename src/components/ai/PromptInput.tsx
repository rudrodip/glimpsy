"use client";

import { useEffect } from "react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { PROMPT_PLACEHOLDERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAI } from "./ai-context";

export const PromptInput = () => {
  const { form, enhancing, textAreaRef, currentPrompt, currentMode } = useAI();
  const { setValue } = form;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key.length === 1 &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !enhancing &&
        document.activeElement !== textAreaRef.current
      ) {
        e.preventDefault();
        textAreaRef.current?.focus();
        setValue("prompt", currentPrompt + e.key);
      }
    };
    
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [enhancing, textAreaRef, setValue, currentPrompt]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Note: onSubmit functionality will be handled by the form submission
    }
  };

  return (
    <FormField
      control={form.control}
      name="prompt"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea
              {...field}
              ref={textAreaRef}
              className={cn(
                "text-sm h-25 p-2 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent dark:bg-transparent no-scrollbar",
                {
                  "enhance-gradient enhance-gradient-text enhance-gradient-animation disabled:dark:opacity-100":
                    enhancing && currentPrompt,
                }
              )}
              disabled={enhancing}
              placeholder={PROMPT_PLACEHOLDERS[currentMode]}
              autoFocus={true}
              onKeyDown={handleKeyDown}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

PromptInput.displayName = "PromptInput"; 
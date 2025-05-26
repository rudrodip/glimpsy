"use client";

import { forwardRef, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ModeValue } from "@/types";
import { PROMPT_PLACEHOLDERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PromptInputProps {
  form: UseFormReturn<{ prompt: string; mode: ModeValue }>;
  enhancing: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export const PromptInput = forwardRef<HTMLTextAreaElement, PromptInputProps>(
  ({ form, enhancing, onFocus, onBlur }, ref) => {
    const { watch, setValue } = form;
    const currentPrompt = watch("prompt");
    const currentMode = watch("mode");

    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        const textAreaRef = ref as React.RefObject<HTMLTextAreaElement>;
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
    }, [enhancing, ref, setValue, currentPrompt]);

    return (
      <FormField
        control={form.control}
        name="prompt"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                ref={ref}
                className={cn(
                  "text-sm h-25 p-2 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent dark:bg-transparent no-scrollbar",
                  {
                    "enhance-gradient enhance-gradient-text enhance-gradient-animation disabled:dark:opacity-100":
                      enhancing && currentPrompt,
                  }
                )}
                disabled={enhancing}
                placeholder={PROMPT_PLACEHOLDERS[currentMode]}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </FormControl>
          </FormItem>
        )}
      />
    );
  }
);

PromptInput.displayName = "PromptInput"; 
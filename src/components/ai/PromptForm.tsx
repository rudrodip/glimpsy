"use client";

import { z } from "zod";
import { Form } from "@/components/ui/form";
import { promptSchema } from "@/lib/schema";
import { AnimatedBorderCard } from "../animated-border-card";
import { PromptInput } from "./PromptInput";
import { ModeSelector } from "./ModeSelector";
import { ActionButtons } from "./ActionButtons";
import { ExamplePrompts } from "./ExamplePrompts";
import { useAI } from "./ai-context";

type PromptFormData = z.infer<typeof promptSchema>;

interface PromptFormProps {
  onSubmit: (data: PromptFormData) => Promise<void>;
}

export function PromptForm({ onSubmit }: PromptFormProps) {
  const { form, onFormSubmit } = useAI();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit(onSubmit))} className="space-y-8">
          <AnimatedBorderCard
            className="w-full p-px rounded-[11px]"
            gradientSize={150}
          >
            <div id="chatbox" className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800">
              <PromptInput />
              <div id="menu" className="flex items-center justify-between">
                <ModeSelector />
                <ActionButtons />
              </div>
            </div>
          </AnimatedBorderCard>
          
          <ExamplePrompts />
        </form>
      </Form>
    </div>
  );
} 
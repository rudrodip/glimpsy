"use client";

import { motion } from "motion/react";
import { Form } from "@/components/ui/form";
import { AnimatedBorderCard } from "../animated-border-card";
import { PromptInput } from "./PromptInput";
import { ModeSelector } from "./ModeSelector";
import { ActionButtons } from "./ActionButtons";
import { useAI } from "./ai-context";
import { cn } from "@/lib/utils";
interface PromptFormProps {
  className?: string;
}

export function PromptForm({ className }: PromptFormProps) {
  const { form, onSubmit: onFormSubmit } = useAI();

  return (
    <motion.div layoutId="prompt-form" id="prompt-form" className={cn("w-full max-w-3xl mx-auto", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
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
        </form>
      </Form>
    </motion.div>
  );
} 
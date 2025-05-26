"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ModeValue } from "@/types";
import { promptSchema } from "@/lib/schema";
import { AnimatedBorderCard } from "../animated-border-card";
import { PromptInput } from "./PromptInput";
import { ModeSelector } from "./ModeSelector";
import { ActionButtons } from "./ActionButtons";
import { ExamplePrompts } from "./ExamplePrompts";
import { enhanceImagePrompt } from "@/actions";
import { toast } from "sonner";

type PromptFormData = z.infer<typeof promptSchema>;

interface PromptFormProps {
  onSubmit: (data: PromptFormData) => Promise<void>;
}

export function PromptForm({ onSubmit }: PromptFormProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [enhancing, setEnhancing] = useState<boolean>(false);
  const [isExampleSelected, setIsExampleSelected] = useState<boolean>(false);
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
      mode: ModeValue.TEXT_TO_IMAGE,
    },
  });

  const { watch, setValue, handleSubmit } = form;
  const currentPrompt = watch("prompt");
  const currentMode = watch("mode");

  const handleFormSubmit = async (data: PromptFormData) => {
    await onSubmit(data);
  };

  const handleEnhancePrompt = async () => {
    if (currentMode !== ModeValue.TEXT_TO_IMAGE) {
      toast.error("Enhance prompt is only available for text to image mode");
      return;
    }
    
    setEnhancing(true);
    setIsExampleSelected(false);
    
    try {
      const enhancedPrompt = await enhanceImagePrompt(currentPrompt);
      if (enhancedPrompt) {
        setValue("prompt", enhancedPrompt);
        textAreaRef.current?.focus();
      } else {
        toast.error("Failed to enhance prompt, please try again");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to enhance prompt");
    } finally {
      setEnhancing(false);
    }
  };

  const handleModeChange = (mode: ModeValue) => {
    if (isExampleSelected) {
      setIsExampleSelected(false);
      setValue("prompt", "");
    }
    setValue("mode", mode);
  };

  const handleExampleSelect = (prompt: string, mode: ModeValue) => {
    setValue("prompt", prompt);
    setValue("mode", mode);
    setIsExampleSelected(true);
  };

  const handleExampleClose = () => {
    setValue("prompt", "");
    setValue("mode", ModeValue.TEXT_TO_IMAGE);
    setIsExampleSelected(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          <AnimatedBorderCard
            className="w-full p-px rounded-[11px]"
            gradientSize={150}
            focused={isFocused}
          >
            <div id="chatbox" className="w-full p-2 rounded-lg bg-card">
              <PromptInput
                ref={textAreaRef}
                form={form}
                enhancing={enhancing}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <div id="menu" className="flex items-center justify-between">
                <ModeSelector
                  form={form}
                  onModeChange={handleModeChange}
                />
                <ActionButtons
                  prompt={currentPrompt}
                  mode={currentMode}
                  enhancing={enhancing}
                  onEnhance={handleEnhancePrompt}
                />
              </div>
            </div>
          </AnimatedBorderCard>
          
          <ExamplePrompts
            isExampleSelected={isExampleSelected}
            onExampleSelect={handleExampleSelect}
            onExampleClose={handleExampleClose}
          />
        </form>
      </Form>
    </div>
  );
} 
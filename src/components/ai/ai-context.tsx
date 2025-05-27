"use client";

import { createContext, useContext, useState, useRef, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ModeValue } from "@/types";
import { promptSchema } from "@/lib/schema";
import { enhanceImagePrompt } from "@/actions";
import { toast } from "sonner";

type PromptFormData = z.infer<typeof promptSchema>;

interface AIContextType {
  form: UseFormReturn<PromptFormData>;
  enhancing: boolean;
  isExampleSelected: boolean;
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
  currentPrompt: string;
  currentMode: ModeValue;
  handleEnhancePrompt: () => Promise<void>;
  handleModeChange: (mode: ModeValue) => void;
  handleExampleSelect: (prompt: string, mode: ModeValue) => void;
  handleExampleClose: () => void;
  onFormSubmit: (onSubmit: (data: PromptFormData) => Promise<void>) => () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

interface AIProviderProps {
  children: ReactNode;
}

export function AIProvider({ children }: AIProviderProps) {
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

  const { watch, setValue } = form;
  const currentPrompt = watch("prompt");
  const currentMode = watch("mode");

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

  const onFormSubmit = (onSubmit: (data: PromptFormData) => Promise<void>) => {
    return async () => {
      const data = form.getValues();
      await onSubmit(data);
    };
  };

  const value: AIContextType = {
    form,
    enhancing,
    isExampleSelected,
    textAreaRef,
    currentPrompt,
    currentMode,
    handleEnhancePrompt,
    handleModeChange,
    handleExampleSelect,
    handleExampleClose,
    onFormSubmit,
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
} 
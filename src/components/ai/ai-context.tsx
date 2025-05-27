"use client";

import { createContext, useContext, useState, useRef, ReactNode, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AIResponse, ModeValue } from "@/types";
import { promptSchema } from "@/lib/schema";
import { enhanceImagePrompt, generateResponse } from "@/actions";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

type PromptFormData = z.infer<typeof promptSchema>;

interface AIContextType {
  form: UseFormReturn<PromptFormData>;
  enhancing: boolean;
  isExampleSelected: boolean;
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
  currentPrompt: string;
  currentMode: ModeValue;
  isGeneratingResponse: boolean;
  response: AIResponse | null;
  handleEnhancePrompt: () => Promise<void>;
  handleModeChange: (mode: ModeValue) => void;
  handleExampleSelect: (prompt: string, mode: ModeValue) => void;
  handleExampleClose: () => void;
  onSubmit: (data: PromptFormData) => Promise<void>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

interface AIProviderProps {
  children: ReactNode;
}

export function AIProvider({ children }: AIProviderProps) {
  const [enhancing, setEnhancing] = useState<boolean>(false);
  const [isExampleSelected, setIsExampleSelected] = useState<boolean>(false);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState<boolean>(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const currentPath = usePathname();
  const router = useRouter();
  
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

  useEffect(() => {
    if (currentPath === "/studio") {
      const pendingData = sessionStorage.getItem('pendingGeneration');
      if (pendingData) {
        sessionStorage.removeItem('pendingGeneration');
        const data = JSON.parse(pendingData) as PromptFormData;
        
        (async () => {
          try {
            setValue("prompt", "");
            const response = await generateResponse(data);
            setResponse(response);
          } catch (error) {
            console.error(error);
            toast.error("Failed to generate response");
          } finally {
            setIsGeneratingResponse(false);
          }
        })();
      }
    }
  }, [currentPath]);

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
      } else {
        toast.error("Failed to enhance prompt, please try again");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to enhance prompt");
    } finally {
      setEnhancing(false);
      textAreaRef.current?.focus();
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

  const onSubmit = async (data: PromptFormData) => {
    setIsGeneratingResponse(true);
    setResponse(null);
    
    if (currentPath === "/") {
      sessionStorage.setItem('pendingGeneration', JSON.stringify(data));
      router.push("/studio");
      return;
    }
    
    try {
      const response = await generateResponse(data);
      setResponse(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate response");
    } finally {
      setIsGeneratingResponse(false);
    }
  }
  const value: AIContextType = {
    form,
    enhancing,
    isExampleSelected,
    textAreaRef,
    currentPrompt,
    currentMode,
    isGeneratingResponse,
    response,
    handleEnhancePrompt,
    handleModeChange,
    handleExampleSelect,
    handleExampleClose,
    onSubmit,
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
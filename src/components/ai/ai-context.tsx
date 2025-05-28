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
  generatedOnce: boolean;
  canStop: boolean;
  handleEnhancePrompt: () => Promise<void>;
  handleModeChange: (mode: ModeValue) => void;
  handleExampleSelect: (prompt: string, mode: ModeValue) => void;
  handleExampleClose: () => void;
  handleStop: () => void;
  onSubmit: (data: PromptFormData) => Promise<void>;
  resetResponse: () => void;
  setPrompt: (prompt: string) => void;
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
  const [generatedOnce, setGeneratedOnce] = useState<boolean>(false);
  const currentPath = usePathname();
  const router = useRouter();
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const activeRequestsRef = useRef<Map<string, AbortController>>(new Map());
  const currentGenerationIdRef = useRef<string | null>(null);
  const currentEnhanceIdRef = useRef<string | null>(null);

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
        
        const requestId = `pending-${Date.now()}`;
        const abortController = new AbortController();
        activeRequestsRef.current.set(requestId, abortController);
        currentGenerationIdRef.current = requestId;
        
        (async () => {
          try {
            setValue("prompt", "");
            const response = await generateResponse(data);
            abortController.signal.throwIfAborted();
            setResponse(response);
          } catch (error: any) {
            if (error?.name === 'AbortError') {
              console.log('Pending generation aborted');
            } else {
              console.error(error);
              toast.error("Failed to generate response");
            }
          } finally {
            setIsGeneratingResponse(false);
            activeRequestsRef.current.delete(requestId);
            if (currentGenerationIdRef.current === requestId) {
              currentGenerationIdRef.current = null;
            }
          }
        })();
        
        return () => {
          abortController.abort();
          activeRequestsRef.current.delete(requestId);
          if (currentGenerationIdRef.current === requestId) {
            currentGenerationIdRef.current = null;
          }
        };
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
    
    const requestId = `enhance-${Date.now()}`;
    const enhanceController = new AbortController();
    activeRequestsRef.current.set(requestId, enhanceController);
    currentEnhanceIdRef.current = requestId;
    
    try {
      const enhancedPrompt = await enhanceImagePrompt(currentPrompt);
      enhanceController.signal.throwIfAborted();
      
      if (enhancedPrompt) {
        setValue("prompt", enhancedPrompt);
      } else {
        toast.error("Failed to enhance prompt, please try again");
      }
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        console.log('Prompt enhancement aborted');
      } else {
        console.error(error);
        toast.error("Failed to enhance prompt");
      }
    } finally {
      setEnhancing(false);
      activeRequestsRef.current.delete(requestId);
      if (currentEnhanceIdRef.current === requestId) {
        currentEnhanceIdRef.current = null;
      }
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

  const handleStop = () => {
    // Abort all active requests
    for (const [requestId, controller] of activeRequestsRef.current.entries()) {
      controller.abort();
      activeRequestsRef.current.delete(requestId);
    }
    
    // Clear current request IDs
    currentGenerationIdRef.current = null;
    currentEnhanceIdRef.current = null;
    
    setIsGeneratingResponse(false);
    setEnhancing(false);
    setGeneratedOnce(false);
  };

  const onSubmit = async (data: PromptFormData) => {
    setIsGeneratingResponse(true);
    setResponse(null);
    setGeneratedOnce(true);
    
    if (currentPath === "/") {
      sessionStorage.setItem('pendingGeneration', JSON.stringify(data));
      router.push("/studio");
      return;
    }
    
    const requestId = `generate-${Date.now()}`;
    const abortController = new AbortController();
    activeRequestsRef.current.set(requestId, abortController);
    currentGenerationIdRef.current = requestId;
    
    try {
      const response = await generateResponse(data);
      abortController.signal.throwIfAborted();
      setResponse(response);
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        console.log('Generation aborted');
      } else {
        console.error(error);
        toast.error("Failed to generate response");
      }
    } finally {
      setIsGeneratingResponse(false);
      activeRequestsRef.current.delete(requestId);
      if (currentGenerationIdRef.current === requestId) {
        currentGenerationIdRef.current = null;
      }
    }
  }

  const resetResponse = () => {
    setResponse(null);
    setGeneratedOnce(false);
    setValue("prompt", "");
  }

  const setPrompt = (prompt: string) => {
    setValue("prompt", prompt);
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
    generatedOnce,
    canStop: isGeneratingResponse || enhancing,
    handleEnhancePrompt,
    handleModeChange,
    handleExampleSelect,
    handleExampleClose,
    handleStop,
    onSubmit,
    resetResponse,
    setPrompt,
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
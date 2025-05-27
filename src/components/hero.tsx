"use client";

import { z } from "zod";
import { PromptForm } from "./ai/PromptForm";
import { promptSchema } from "@/lib/schema";
import { generateResponse } from "@/actions";
import { ExamplePrompts } from "./ai/ExamplePrompts";
import { useRouter } from "next/navigation";

type PromptFormData = z.infer<typeof promptSchema>;

export default function HeroSection() {
  const router = useRouter();
  const handleFormSubmit = async (data: PromptFormData) => {
    router.push("/studio");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div id="mainbox" className="flex flex-col items-center justify-center mt-16 md:mt-32 lg:mt-40">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tighter mb-2">
          Glimpse Your <span className="primary-gradient gradient-text gradient-flow-left-to-right">Imagination</span>
        </h1>
        <p className="text-foreground/80 text-sm mb-8">
          Transform your imagination into reality with Glimpsy&apos;s creative platform
        </p>
        <PromptForm onSubmit={handleFormSubmit} />
        <ExamplePrompts className="mt-8" />
      </div>
    </div>
  );
}

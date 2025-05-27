"use client"

import { ExamplePrompts, PromptForm } from "@/components/ai";

export default function StudioPage() {
  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col overflow-hidden">
      <div id="response" className="flex flex-col justify-between flex-1 overflow-y-auto">
      </div>
      <div className="w-full mb-2">
        <ExamplePrompts className="mb-4" />
        <PromptForm onSubmit={async () => {}} className="w-full max-w-4xl" />
      </div>
    </div>
  )
}
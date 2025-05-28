"use client"

import {
  ExamplePrompts,
  PromptForm,
  useAI,
  AudioSkeleton,
  AudioResponse,
  ImageSkeleton,
  ImageResponse
} from "@/components/ai";
import { ModeValue } from "@/types";
import { Loader2, AudioLines, ImageIcon, Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/config/site.config";
import Image from "next/image";

export default function StudioPage() {
  const { isGeneratingResponse, response, currentMode } = useAI();
  
  const renderSkeleton = () => {
    if (currentMode === ModeValue.TEXT_TO_SPEECH) {
      return <AudioSkeleton className="max-w-xl mx-auto" />;
    } else if (currentMode === ModeValue.TEXT_TO_IMAGE) {
      return <ImageSkeleton className="max-w-xl mx-auto" />;
    }
    return (
      <div className="flex items-center justify-center flex-1">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    
    if (response.mode === ModeValue.TEXT_TO_SPEECH) {
      return <AudioResponse response={response} className="max-w-xl mx-auto" />;
    } else if (response.mode === ModeValue.TEXT_TO_IMAGE) {
      return <ImageResponse response={response} className="max-w-xl mx-auto" />;
    }
    
    return null;
  };

  const renderPlaceholder = () => {
    return (
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm border border-border/40 shadow-xl">
        <CardContent className="text-center space-y-8 pt-12 pb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl shadow-lg">
                <Wand2 className="h-10 w-10 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold font-heading tracking-tighter">
              Transform Your <span className="primary-gradient gradient-text gradient-flow-left-to-right">Ideas</span>
            </h2>
            <p className="text-foreground/80 text-sm max-w-md mx-auto leading-relaxed">
              Turn your imagination into stunning audio and visuals with {siteConfig.name}&apos;s creative AI platform
            </p>
          </div>

          <div className="flex items-center justify-center gap-6">
            <div className="group cursor-pointer">
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <AudioLines className="h-7 w-7 text-primary" />
                </div>
                <span className="text-sm font-medium">Generate Audio</span>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <ImageIcon className="h-7 w-7 text-primary" />
                </div>
                <span className="text-sm font-medium">Create Images</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/20">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Image src="/favicon.png" alt="logo" width={16} height={16} />
              <span>Powered by {siteConfig.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col overflow-hidden">
      <div id="response" className="flex flex-col justify-between flex-1 overflow-y-auto p-4">
        {isGeneratingResponse && (
          <div className="flex items-center justify-center flex-1">
            {renderSkeleton()}
          </div>
        )}
        
        {response && !isGeneratingResponse && (
          <div className="flex items-center justify-center flex-1">
            {renderResponse()}
          </div>
        )}

        {!response && !isGeneratingResponse && (
          <div className="flex items-center justify-center flex-1">
            {renderPlaceholder()}
          </div>
        )}
      </div>
      <div className="w-full mb-2 px-4">
        <ExamplePrompts className="mb-4" />
        <PromptForm className="w-full max-w-4xl" />
      </div>
    </div>
  )
}
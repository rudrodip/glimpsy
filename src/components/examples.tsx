"use client";

import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { CopyIcon, ChevronRightIcon, CheckIcon } from "lucide-react";
import { useAI } from "./ai/ai-context";
import Link from "next/link";
import { imageExamples } from "@/lib/images";

type Example = {
  title: string;
  description: string;
  imageSrc: string;
  style: string;
  category: string;
  prompt: string;
};

type SeeMoreCard = {
  type: 'see-more';
  category: string;
  remainingCount: number;
};

type DisplayedItem = Example | SeeMoreCard;

export default function Examples({ className }: { className?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [copiedPrompts, setCopiedPrompts] = useState<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);
  const { setPrompt } = useAI();
  
  const categories = useMemo(() => new Set(imageExamples.map((example) => example.category)), []);

  const filteredExamples = useMemo(() => {
    if (selectedCategory === null) return imageExamples;
    return imageExamples.filter((example) => example.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayedExamples = useMemo((): DisplayedItem[] => {
    if (selectedCategory === null) {
      const isExpanded = expandedCategories.has('all');

      if (isExpanded) {
        return imageExamples;
      } else {
        const shuffled = isClient 
          ? [...imageExamples].sort(() => Math.random() - 0.5)
          : [...imageExamples];
        const selected = shuffled.slice(0, 11);
        const result: DisplayedItem[] = [...selected];

        if (imageExamples.length > 11) {
          result.push({
            type: 'see-more',
            category: 'all',
            remainingCount: imageExamples.length - 11
          });
        }

        return result;
      }
    } else {
      return filteredExamples;
    }
  }, [selectedCategory, filteredExamples, expandedCategories, isClient]);

  const handleSeeMore = (category: string) => {
    setExpandedCategories(prev => new Set([...prev, category]));
  };

  const copyPrompt = async (prompt: string, index: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompts(prev => new Set([...prev, index]));
      setTimeout(() => {
        setCopiedPrompts(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  return (
    <div id="examples" className={cn("w-full container mx-auto rounded-xl bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm p-4 md:p-6 lg:p-8", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tighter mb-2">Examples</h1>
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          <Button
            key="all"
            variant={
              selectedCategory === null ? "default" : "outline"
            }
            size="sm"
            className="rounded-full text-xs h-7 px-3"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {Array.from(categories).map((category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category ? "default" : "outline"
              }
              size="sm"
              className="rounded-full text-xs h-7 px-3"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {displayedExamples.map((example, index) => {
          if ('type' in example && example.type === 'see-more') {
            return (
              <div key={`see-more-${example.category}`} className="group">
                <div
                  className="aspect-square relative overflow-hidden rounded-xl border hover:border-primary/20 bg-muted/30 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center p-4"
                  onClick={() => handleSeeMore(example.category)}
                >
                  <ChevronRightIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium text-foreground mb-1">
                    See More
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {example.remainingCount} more {example.category.toLowerCase()} examples
                  </p>
                </div>
              </div>
            );
          }

          const exampleItem = example as Example;
          const isCopied = copiedPrompts.has(index);
          
          return (
            <div key={index} className="group">
              <div className="aspect-square relative overflow-hidden rounded-xl bg-muted border group-hover:shadow-xl transition-all duration-300">
                <Image
                  unoptimized
                  src={exampleItem.imageSrc}
                  alt={exampleItem.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  width={400}
                  height={400}
                  placeholder="blur"
                  blurDataURL={exampleItem.imageSrc}
                />
                <div className="absolute top-3 left-3">
                  <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {exampleItem.category}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-zinc-800 text-white text-xs px-2 py-1 rounded-md w-fit mb-2">
                      {exampleItem.style}
                    </div>
                    <h3 className="text-white font-medium">
                      {exampleItem.title}
                    </h3>
                    <p className="text-white/90 text-sm mt-1">
                      {exampleItem.description}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className={cn(
                          "border-none text-white h-8 rounded-lg transition-all duration-200",
                          isCopied 
                            ? "bg-green-500/30 hover:bg-green-500/40" 
                            : "bg-white/20 hover:bg-white/30"
                        )}
                        onClick={() => copyPrompt(exampleItem.prompt, index)}
                      >
                        {isCopied ? (
                          <>
                            <CheckIcon className="h-3.5 w-3.5 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <CopyIcon className="h-3.5 w-3.5 mr-1" />
                            Prompt
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 border-none text-white h-8 rounded-lg"
                        onClick={() => setPrompt(exampleItem.prompt)}
                        asChild
                      >
                        <Link href={`/studio`}>
                          <Image src="/favicon.png" alt="Try" width={16} height={16} /> Try
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

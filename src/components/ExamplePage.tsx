"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "./Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpenIcon,
  CopyIcon,
  DownloadIcon,
  ImageIcon,
  MessageSquareIcon,
  RefreshCwIcon,
  SparklesIcon,
  ThumbsUpIcon,
  ZapIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";

// Sample image examples with hardcoded images
const imageExamples = [
  {
    title: "Futuristic City",
    description: "A futuristic city with flying cars and neon lights",
    imageSrc: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000",
    style: "Futuristic"
  },
  {
    title: "Serene Nature",
    description: "Peaceful mountain landscape with a lake reflection",
    imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
    style: "Photography"
  },
  {
    title: "Abstract Art",
    description: "Colorful abstract art with flowing shapes and patterns",
    imageSrc: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000",
    style: "Abstract"
  },
  {
    title: "Tech Workspace",
    description: "Modern technology workspace with devices and accessories",
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
    style: "Workspace"
  }
];

// Creative examples with more artistic images
const creativeExamples = [
  {
    title: "Surreal Fantasy",
    description: "A dreamlike landscape with floating islands and magical elements",
    imageSrc: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1000",
    style: "Fantasy"
  },
  {
    title: "Portrait Art",
    description: "Artistic portrait with vibrant colors and lighting effects",
    imageSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000",
    style: "Portrait"
  },
  {
    title: "Food Photography",
    description: "Mouthwatering food arrangement with professional styling",
    imageSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
    style: "Food"
  }
];

// Professional use case examples
const professionalExamples = [
  {
    title: "Product Mockup",
    description: "Product packaging design mockup for a premium skincare line",
    imageSrc: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000",
    industry: "Design"
  },
  {
    title: "Marketing Campaign",
    description: "Social media marketing campaign imagery for a lifestyle brand",
    imageSrc: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000",
    industry: "Marketing"
  },
  {
    title: "Educational Content",
    description: "Visual learning materials for science education",
    imageSrc: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000",
    industry: "Education"
  },
  {
    title: "Real Estate Visualization",
    description: "Interior design visualization for real estate listings",
    imageSrc: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000",
    industry: "Real Estate"
  }
];

// Sample prompts for the text generation examples
const textPrompts = [
  {
    title: "Blog Post",
    prompt: "Write a blog post about sustainable fashion trends in 2025",
    category: "Content Writing"
  },
  {
    title: "Product Description",
    prompt: "Create a product description for a smart home security system",
    category: "Marketing"
  },
  {
    title: "Story",
    prompt: "Write a short story about a time traveler in ancient Rome",
    category: "Creative Writing"
  }
];

export default function ExamplePage() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [selectedPrompt, setSelectedPrompt] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 w-full max-w-7xl mx-auto p-6 pt-20 flex flex-col gap-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            See <span className="text-primary">Glimpsy</span> in Action
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore examples of AI-generated images and text created with Glimpsy. From artistic creations to professional use cases, see what's possible.
          </p>
        </div>

        {/* Main content */}
        <Tabs 
          defaultValue="gallery" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 w-[420px]">
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>Image Gallery</span>
              </TabsTrigger>
              <TabsTrigger value="creative" className="flex items-center gap-2">
                <SparklesIcon className="h-4 w-4" />
                <span>Creative</span>
              </TabsTrigger>
              <TabsTrigger value="professional" className="flex items-center gap-2">
                <ZapIcon className="h-4 w-4" />
                <span>Professional</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Example Gallery
                </CardTitle>
                <CardDescription>
                  Browse through examples of AI-generated images created with Glimpsy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {imageExamples.map((example, index) => (
                    <div key={index} className="group">
                      <div className="aspect-video relative overflow-hidden rounded-lg border border-muted bg-muted group-hover:shadow-md transition-all duration-300">
                        <img
                          src={example.imageSrc}
                          alt={example.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="text-white font-medium">{example.title}</h3>
                              <p className="text-white/80 text-sm">{example.description}</p>
                            </div>
                            <div className="bg-primary/90 text-white text-xs px-2 py-1 rounded-md">
                              {example.style}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-muted-foreground mb-4">Want to see more AI-generated images? Try Glimpsy today!</p>
                  <Button className="flex items-center gap-2">
                    <SparklesIcon className="h-4 w-4" />
                    Try Image Generation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creative Tab */}
          <TabsContent value="creative">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-primary" />
                  Creative Examples
                </CardTitle>
                <CardDescription>
                  Artistic and creative AI-generated images for inspiration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {creativeExamples.map((example, index) => (
                    <div key={index} className="group">
                      <div className="aspect-square relative overflow-hidden rounded-lg border border-muted bg-muted hover:border-primary/40 transition-all duration-300">
                        <img
                          src={example.imageSrc}
                          alt={example.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <h3 className="text-white font-medium">{example.title}</h3>
                          <p className="text-white/80 text-sm">{example.description}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <div className="bg-primary/90 text-white text-xs px-2 py-1 rounded-md">
                              {example.style}
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40">
                                <DownloadIcon className="h-4 w-4 text-white" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40">
                                <CopyIcon className="h-4 w-4 text-white" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Button className="flex items-center gap-2">
                    <SparklesIcon className="h-4 w-4" />
                    Create Your Own Art
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Tab */}
          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ZapIcon className="h-5 w-5 text-primary" />
                  Professional Use Cases
                </CardTitle>
                <CardDescription>
                  How professionals use Glimpsy in their workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {professionalExamples.map((example, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 group">
                      <div className="md:w-1/2">
                        <div className="aspect-video relative overflow-hidden rounded-lg border border-muted bg-muted">
                          <img
                            src={example.imageSrc}
                            alt={example.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 flex flex-col">
                        <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full w-fit">
                          {example.industry}
                        </div>
                        <h3 className="text-lg font-medium mt-2">{example.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1 flex-grow">{example.description}</p>
                        <Button variant="ghost" size="sm" className="justify-start mt-3 group-hover:text-primary transition-colors w-fit px-0">
                          See case study →
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Text Generation Preview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Text Generation Examples</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareIcon className="h-5 w-5 text-primary" />
                AI Text Generation
              </CardTitle>
              <CardDescription>
                Generate blog posts, product descriptions, stories and more with Glimpsy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 space-y-4">
                  {textPrompts.map((prompt, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedPrompt === index 
                          ? "bg-primary/10 border border-primary/20" 
                          : "bg-muted/50 border border-muted hover:bg-primary/5"
                      }`}
                      onClick={() => setSelectedPrompt(index)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
                          {prompt.category}
                        </div>
                        <MessageSquareIcon className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-medium">{prompt.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {prompt.prompt}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="md:w-2/3">
                  <div className="bg-muted/30 rounded-lg p-6 border border-muted h-[300px] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <SparklesIcon className="h-10 w-10 text-primary/50 mx-auto" />
                      <div>
                        <h3 className="text-lg font-medium">Select a prompt example</h3>
                        <p className="text-muted-foreground">Or try Glimpsy yourself to see AI-generated text results</p>
                      </div>
                      <Button className="mt-4">
                        Try Text Generation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20 mt-12">
          <CardContent className="flex flex-col items-center py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <SparklesIcon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Ready to create with Glimpsy?</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Join thousands of creators, designers, and marketers who are revolutionizing their workflows with AI.
            </p>
            <Button size="lg" className="font-medium cursor-pointer" onClick={() => {redirect("/")}}>
              Get Started For Free
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
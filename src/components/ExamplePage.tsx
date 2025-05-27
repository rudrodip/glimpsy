"use client";

import { useState, useEffect } from "react";
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
  StarIcon,
  CheckIcon,
  ArrowRightIcon,
  SearchIcon,
  FilterIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

// Import example data from separate files
import { 
  imageExamples, 
  creativeExamples, 
  professionalExamples, 
  additionalExamples,
  textPrompts,
  getUniqueCategories,
  filterExamplesByCategory,
  filterExamplesBySearch
} from "./data";

export default function ExamplePage() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Get unique categories from image examples
  const categories = getUniqueCategories(imageExamples);

  // Get filtered examples
  const filteredExamples = filterExamplesBySearch(
    filterExamplesByCategory(imageExamples, activeCategory),
    searchQuery
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with animation */}
      <div className="relative overflow-hidden">
        {/* Floating elements */}
        <div
          className="absolute top-20 left-[10%] w-12 h-12 rounded-full bg-primary/10 animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-[15%] w-8 h-8 rounded-full bg-primary/10 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-[20%] w-10 h-10 rounded-full bg-primary/10 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <SparklesIcon className="h-4 w-4" />
            Inspiration Gallery
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            See{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Glimpsy
            </span>{" "}
            in Action
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
            Explore examples of AI-generated images and text created with
            Glimpsy. From artistic creations to professional use cases, see
            what's possible.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-300">
            <Button size="lg" className="rounded-full gap-2">
              <SparklesIcon className="h-5 w-5" />
              Try it yourself
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              View all examples
            </Button>
          </div>

          {/* Sample floating images */}
          <div className="mt-12 relative h-24 hidden md:block animate-fade-in-up animation-delay-400">
            <div
              className="absolute left-[10%] top-0 w-16 h-16 rounded-lg overflow-hidden shadow-lg border border-primary/20 rotate-3 animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <img
                src={imageExamples[0].imageSrc}
                alt="Example"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute left-[30%] top-4 w-20 h-20 rounded-lg overflow-hidden shadow-lg border border-primary/20 -rotate-6 animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <img
                src={imageExamples[1].imageSrc}
                alt="Example"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute left-[50%] top-2 w-16 h-16 rounded-lg overflow-hidden shadow-lg border border-primary/20 rotate-12 animate-float"
              style={{ animationDelay: "2.5s" }}
            >
              <img
                src={creativeExamples[0].imageSrc}
                alt="Example"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute left-[70%] top-6 w-18 h-18 rounded-lg overflow-hidden shadow-lg border border-primary/20 -rotate-6 animate-float"
              style={{ animationDelay: "0.2s" }}
            >
              <img
                src={professionalExamples[0].imageSrc}
                alt="Example"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto p-6 pb-20 flex flex-col gap-10">
        {/* Main content */}
        <Tabs
          defaultValue="gallery"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-4 w-[560px]">
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>Image Gallery</span>
              </TabsTrigger>
              <TabsTrigger value="creative" className="flex items-center gap-2">
                <SparklesIcon className="h-4 w-4" />
                <span>Creative</span>
              </TabsTrigger>
              <TabsTrigger
                value="professional"
                className="flex items-center gap-2"
              >
                <ZapIcon className="h-4 w-4" />
                <span>Professional</span>
              </TabsTrigger>
              <TabsTrigger
                value="more"
                className="flex items-center gap-2"
              >
                <StarIcon className="h-4 w-4" />
                <span>More Examples</span>
              </TabsTrigger>
            </TabsList>
          </div>{" "}
          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-primary" />
                      Example Gallery
                    </CardTitle>
                    <CardDescription>
                      Browse through examples of AI-generated images created
                      with Glimpsy
                    </CardDescription>                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative w-[200px]">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        className="pl-9"
                        placeholder="Search examples..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <FilterIcon className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                  </div>
                </div>

                {/* Category filters */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        activeCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      className="rounded-full text-xs h-7 px-3"
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardHeader>{" "}
              <CardContent>
                {" "}                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredExamples.map((example, index) => (
                    <div key={index} className="group">
                      <div className="aspect-square relative overflow-hidden rounded-xl bg-muted group-hover:shadow-xl transition-all duration-300 border border-muted/50 group-hover:border-primary/20">
                        <img
                          src={example.imageSrc}
                          alt={example.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            {example.category}
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="bg-primary/90 text-white text-xs px-2 py-1 rounded-md w-fit mb-2">
                              {example.style}
                            </div>
                            <h3 className="text-white font-medium">
                              {example.title}
                            </h3>
                            <p className="text-white/90 text-sm mt-1">
                              {example.description}
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-white/20 hover:bg-white/30 border-none text-white h-8 rounded-lg"
                              >
                                <CopyIcon className="h-3.5 w-3.5 mr-1" />{" "}
                                Prompt
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-white/20 hover:bg-white/30 border-none text-white h-8 rounded-lg"
                              >
                                <ZapIcon className="h-3.5 w-3.5 mr-1" /> Try
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredExamples.length === 0 && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                      <SearchIcon className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No results found</h3>
                      <p className="text-muted-foreground mt-1 mb-4">
                        {activeCategory !== "All"
                          ? `We couldn't find any ${activeCategory} examples ${
                              searchQuery ? `matching "${searchQuery}"` : ""
                            }`
                          : `We couldn't find any examples matching "${searchQuery}"`}
                      </p>
                      <div className="flex gap-2">
                        {searchQuery && (
                          <Button
                            variant="outline"
                            onClick={() => setSearchQuery("")}
                          >
                            Clear search
                          </Button>
                        )}
                        {activeCategory !== "All" && (
                          <Button
                            variant="outline"
                            onClick={() => setActiveCategory("All")}
                          >
                            View all categories
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>                <div className="mt-8 flex flex-col items-center gap-4">
                  <p className="text-muted-foreground">
                    Want to see more AI-generated images? Try Glimpsy today!
                  </p>
                  <div className="flex gap-3">
                    <Button className="flex items-center gap-2 rounded-full px-6">
                      <SparklesIcon className="h-4 w-4" />
                      Try Image Generation
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 rounded-full px-6" 
                      onClick={() => setActiveTab("more")}>
                      <ImageIcon className="h-4 w-4" />
                      Browse More Examples
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Creative Tab */}
          <TabsContent value="creative">
            <Card className="overflow-hidden">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-primary" />
                  Creative Examples
                </CardTitle>
                <CardDescription>
                  Artistic and creative AI-generated images for inspiration
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {creativeExamples.map((example, index) => (
                    <div
                      key={index}
                      className="group relative h-[350px] overflow-hidden border-r border-b border-muted"
                    >
                      <img
                        src={example.imageSrc}
                        alt={example.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            <div className="text-white/90 text-xs font-medium uppercase tracking-wider">
                              {example.style}
                            </div>
                          </div>
                          <h3 className="text-white text-xl font-bold">
                            {example.title}
                          </h3>
                          <p className="text-white/80 text-sm mt-2 mb-4">
                            {example.description}
                          </p>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 hover:bg-white/20 text-white border-white/20 h-9 rounded-lg"
                            >
                              <SparklesIcon className="h-3.5 w-3.5 mr-1.5" />{" "}
                              Create similar
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white border-white/20"
                            >
                              <ThumbsUpIcon className="h-4 w-4" />
                            </Button>
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
          </TabsContent>{" "}
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
                    <div
                      key={index}
                      className="flex flex-col md:flex-row gap-4 group hover:bg-muted/20 p-4 rounded-lg transition-colors"
                    >
                      <div className="md:w-1/2 relative">
                        <div className="aspect-video relative overflow-hidden rounded-lg border border-muted bg-muted">
                          <img
                            src={example.imageSrc}
                            alt={example.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                            {example.industry}
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/2 flex flex-col">
                        <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full w-fit">
                          {example.industry}
                        </div>
                        <h3 className="text-lg font-medium mt-2">
                          {example.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1 flex-grow">
                          {example.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start mt-3 group-hover:text-primary transition-colors w-fit px-0 flex items-center gap-1"
                        >
                          See case study{" "}
                          <ArrowRightIcon className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-muted">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="md:w-1/4 flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <ZapIcon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="md:w-2/4 text-center md:text-left">
                      <h3 className="text-lg font-medium mb-2">
                        Enterprise Solutions
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Custom AI solutions for large organizations. Get
                        dedicated support, higher rate limits, and personalized
                        training.
                      </p>
                    </div>
                    <div className="md:w-1/4 flex justify-center md:justify-end">
                      <Button variant="outline" className="gap-1">
                        Contact Sales{" "}
                        <ArrowRightIcon className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>          </TabsContent>
          {/* More Examples Tab */}
          <TabsContent value="more">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StarIcon className="h-5 w-5 text-primary" />
                  Additional Examples
                </CardTitle>
                <CardDescription>
                  Explore even more examples of what Glimpsy AI can create
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {additionalExamples.map((example, index) => (
                    <div key={index} className="group">
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-muted group-hover:shadow-xl transition-all duration-300 border border-muted/50 group-hover:border-primary/20">
                        <img
                          src={example.imageSrc}
                          alt={example.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2">
                          <div className="bg-primary/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            {example.category}
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-md w-fit mb-2">
                              {example.style}
                            </div>
                            <h3 className="text-white font-medium text-sm">
                              {example.title}
                            </h3>
                            <p className="text-white/90 text-xs mt-1">
                              {example.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-10">
                  <div className="max-w-xl p-6 bg-muted/30 rounded-lg border border-muted">
                    <h3 className="text-lg font-medium mb-3 text-center">Looking for something specific?</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Try Glimpsy AI to create exactly what you're looking for. Our advanced AI can generate images based on your specific requirements.
                    </p>
                    <div className="flex justify-center">
                      <Button className="rounded-full gap-2">
                        <SparklesIcon className="h-4 w-4" />
                        Create Your Own
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Text Generation Preview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            Text Generation Examples
          </h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareIcon className="h-5 w-5 text-primary" />
                AI Text Generation
              </CardTitle>
              <CardDescription>
                Generate blog posts, product descriptions, stories and more with
                Glimpsy
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
                </div>{" "}
                <div className="md:w-2/3">
                  {!showOutput ? (
                    <div
                      className="bg-muted/30 rounded-lg p-6 border border-muted h-[400px] flex items-center justify-center cursor-pointer hover:bg-muted/40 transition-colors"
                      onClick={() => setShowOutput(true)}
                    >
                      <div className="text-center space-y-4">
                        <SparklesIcon className="h-10 w-10 text-primary/50 mx-auto" />
                        <div>
                          <h3 className="text-lg font-medium">
                            Select a prompt example
                          </h3>
                          <p className="text-muted-foreground">
                            Or try Glimpsy yourself to see AI-generated text
                            results
                          </p>
                        </div>
                        <Button className="mt-4">Show Example Output</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-card rounded-lg border border-muted overflow-hidden h-[400px]">
                      <div className="flex items-center justify-between border-b p-3 bg-muted/30">
                        <div className="flex items-center gap-2">
                          <BookOpenIcon className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">
                            {textPrompts[selectedPrompt].title} Output
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <CopyIcon className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => setShowOutput(false)}
                          >
                            <RefreshCwIcon className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 overflow-y-auto h-[calc(400px-45px)] prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap text-sm font-sans">
                          {textPrompts[selectedPrompt].output}
                        </pre>
                      </div>
                    </div>
                  )}{" "}
                </div>
              </div>
            </CardContent>
          </Card>    
              </div>

        <div className="my-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
                <ZapIcon className="h-4 w-4" />
                AI Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 animate-fade-in-up">
                Powerful AI at Your Fingertips
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                Glimpsy leverages cutting-edge AI to deliver high-quality results across various tasks
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up animation-delay-300">
              <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-all duration-500"></div>
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <ImageIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Image Generation</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Generation Speed</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[90%]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Quality Score</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[85%]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Prompt Accuracy</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[92%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm font-medium text-primary">
                    3-5 seconds average generation time
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-all duration-500"></div>
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <MessageSquareIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Text Generation</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Creativity</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[88%]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Coherence</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[95%]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tone Accuracy</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[89%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm font-medium text-primary">
                    Up to 1000 words per minute
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-all duration-500"></div>
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <SparklesIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Style Control</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Style Diversity</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[97%]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Consistency</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[91%]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Fine Control</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[85%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm font-medium text-primary">
                    Over 50 distinct style presets
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-all duration-500"></div>
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <ZapIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Performance</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">API Uptime</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[99%]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Response Time</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[94%]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Scalability</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[92%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm font-medium text-primary">
                    99.9% uptime guarantee
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Enhanced CTA */}
        <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 mt-12">
          <CardContent className="flex flex-col md:flex-row items-center gap-8 py-10 px-8">
            <div className="text-center md:text-left md:flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                <SparklesIcon className="h-3.5 w-3.5" />
                Try Glimpsy Today
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Ready to create your own?
              </h2>
              <p className="text-muted-foreground max-w-md mb-6">
                It's your turn to experience the power of AI-assisted content
                creation. Create stunning images and compelling text in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="rounded-full gap-2 px-6">
                  <SparklesIcon className="h-5 w-5" />
                  Start Creating
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  View More Examples
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-primary/5 blur-2xl rounded-full"></div>
                <img
                  src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=400"
                  alt="AI generated image example"
                  className="rounded-lg shadow-lg border border-primary/20"
                  width={300}
                />
                <div className="absolute -bottom-4 -right-4 bg-background rounded-lg p-2 shadow-lg border border-primary/10">
                  <div className="flex items-center gap-2 px-2">
                    <SparklesIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      Created with Glimpsy AI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

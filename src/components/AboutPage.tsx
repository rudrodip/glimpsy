"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BookIcon,
  BriefcaseIcon,
  EyeIcon,
  GlobeIcon,
  GraduationCapIcon,
  HeartIcon,
  LightbulbIcon,
  MessageCircleIcon,
  PaletteIcon,
  RocketIcon,
} from "lucide-react";
import { Navbar } from "./Navbar";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 w-full max-w-7xl mx-auto p-6 pt-20 flex flex-col gap-10">
        <Card className="w-full rounded-lg bg-background overflow-hidden animate-in fade-in duration-500 border-none shadow-none">
          <CardHeader className="py-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 bg-muted">
                <AvatarImage src="/globe.svg" />
                <AvatarFallback>GL</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-semibold">
                  About Glimpsy
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  AI-powered text and image generation tool
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-16 px-4 sm:px-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-muted">
                  <LightbulbIcon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Our Mission</h2>
              </div>
              <div className="pl-12">
                <p className="text-lg leading-relaxed">
                  Glimpsy was created to make AI-powered content creation
                  accessible to everyone. Our platform combines the latest
                  advancements in AI to generate high-quality text and images
                  from simple prompts, empowering creators, marketers,
                  educators, and curious minds alike to bring their ideas to
                  life without technical barriers.
                </p>
              </div>
            </div>
            <div className="space-y-3   ">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-muted">
                  <EyeIcon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Key Features</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 pl-12">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-muted">
                      <MessageCircleIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Text Generation</h3>
                  </div>
                  <p className="text-muted-foreground pl-12">
                    Create blog posts, stories, product descriptions, and more
                    with our AI text generator.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-muted">
                      <GlobeIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Image Creation</h3>
                  </div>
                  <p className="text-muted-foreground pl-12">
                    Transform your ideas into stunning visuals with our AI image
                    generator.
                  </p>
                </div>
              </div>
            </div>
            {/* How It Works - Minimal Timeline */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-muted">
                  <HeartIcon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">How It Works</h2>
              </div>
              <div className="pl-12 space-y-10 relative">
                <div className="absolute left-4 top-6 bottom-6 w-[1px] bg-muted"></div>

                <div className="relative">
                  <div className="flex items-start gap-5">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center relative z-10">
                      <span className="text-primary font-medium">1</span>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-medium">Enter Your Prompt</h3>
                      <p className="text-muted-foreground">
                        Describe what you want to create in natural language. Be
                        as specific or as creative as you like.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-start gap-5">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center relative z-10">
                      <span className="text-primary font-medium">2</span>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-medium">AI Processing</h3>
                      <p className="text-muted-foreground">
                        Our advanced AI models analyze your prompt and generate
                        relevant content in seconds.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-start gap-5">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center relative z-10">
                      <span className="text-primary font-medium">3</span>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-medium">Download & Use</h3>
                      <p className="text-muted-foreground">
                        Instantly download your generated text or images and use
                        them in your projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}

            {/* Use Cases Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-muted">
                  <RocketIcon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Use Cases</h2>
              </div>
              <div className="pl-12">
                <p className="text-lg mb-6">
                  Glimpsy helps professionals across industries enhance their
                  creative workflow:
                </p>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3 border border-muted/30 rounded-lg p-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-full bg-muted">
                        <PaletteIcon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium">Designers</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Generate concept art, inspiration boards, and preliminary
                      mock-ups to kickstart your creative process. Visualize
                      ideas before investing significant design time.
                    </p>
                  </div>

                  <div className="space-y-3 border border-muted/30 rounded-lg p-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-full bg-muted">
                        <BriefcaseIcon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium">Marketers</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Create engaging social media content, advertisements, and
                      marketing copy in seconds. Maintain brand voice
                      consistency across multiple campaigns.
                    </p>
                  </div>

                  <div className="space-y-3 border border-muted/30 rounded-lg p-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-full bg-muted">
                        <BookIcon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium">Content Creators</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Overcome writer's block with AI-assisted content
                      generation. Create blog posts, scripts, and stories with
                      customizable style and tone to match your unique voice.
                    </p>
                  </div>

                  <div className="space-y-3 border border-muted/30 rounded-lg p-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-full bg-muted">
                        <GraduationCapIcon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium">Educators</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Develop educational materials, visual aids, and
                      supplemental content to enhance learning experiences.
                      Create engaging examples to illustrate complex concepts.
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-primary font-medium">
                    Find out how Glimpsy can help with your specific needs →
                  </p>
                </div>
              </div>
            </div>
        
            {/* Clean Footer */}
            <div className="py-2 text-center">
              <p className="text-lg">
                <span className="font-medium">Glimpsy</span> — Creating the
                future of content with AI.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                © {new Date().getFullYear()} Glimpsy AI. All rights reserved.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

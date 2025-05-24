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
  GlobeIcon,
  GraduationCapIcon,
  LightbulbIcon,
  MessageCircleIcon,
  PaletteIcon,
  RocketIcon,
  SparklesIcon,
  ZapIcon,
  AudioLinesIcon,
  ImageIcon,
  FileTextIcon,
  UsersIcon,
  StarIcon,
} from "lucide-react";
import { Navbar } from "./Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20" />
        <div className="relative max-w-5xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <SparklesIcon className="h-4 w-4" />
              AI-Powered Content Platform
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Glimpsy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The all-in-one AI platform for creating stunning text, images, and audio content with just a few words
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">3</div>
            <div className="text-muted-foreground">AI Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">∞</div>
            <div className="text-muted-foreground">Possibilities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">0</div>
            <div className="text-muted-foreground">Technical Skills Required</div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground">
              Three powerful AI tools to bring your creative vision to life
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-200 dark:hover:border-blue-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Text Generation</h3>
                <p className="text-muted-foreground mb-4">
                  Create compelling content, stories, and copy with advanced AI language models
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">Articles</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">Stories</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">Copy</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-green-200 dark:hover:border-green-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ImageIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Image Creation</h3>
                <p className="text-muted-foreground mb-4">
                  Transform ideas into stunning visuals with cutting-edge AI image generation
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">Art</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">Design</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">Concepts</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-purple-200 dark:hover:border-purple-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <AudioLinesIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Audio Generation</h3>
                <p className="text-muted-foreground mb-4">
                  Convert text to natural-sounding speech with advanced voice synthesis
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs">Narration</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs">Podcasts</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs">Voice</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Creating amazing content has never been easier
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Describe Your Idea</h3>
              <p className="text-muted-foreground">
                Simply type what you want to create. Our AI understands natural language and context.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Magic Happens</h3>
              <p className="text-muted-foreground">
                Advanced AI models process your request and generate high-quality content in seconds.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Use Your Creation</h3>
              <p className="text-muted-foreground">
                Download, share, or further customize your generated content for any purpose.
              </p>
            </div>
          </div>
        </div>

        <Card className="mb-20 border-2 border-dashed border-primary/20 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardContent className="p-12 text-center">
            <LightbulbIcon className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We believe that everyone should have access to powerful AI tools for content creation. 
              Glimpsy democratizes cutting-edge technology, making it simple for anyone to create 
              professional-quality text, images, and audio without technical expertise.
            </p>
          </CardContent>
        </Card>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perfect For</h2>
            <p className="text-lg text-muted-foreground">
              Professionals and creators across industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <PaletteIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Designers</h3>
                <p className="text-sm text-muted-foreground">
                  Generate concept art and visual inspiration
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <BriefcaseIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">Marketers</h3>
                <p className="text-sm text-muted-foreground">
                  Create engaging campaigns and content
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <BookIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">Writers</h3>
                <p className="text-sm text-muted-foreground">
                  Overcome blocks and spark creativity
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <GraduationCapIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold mb-2">Educators</h3>                <p className="text-sm text-muted-foreground">
                  Create educational materials easily
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="overflow-hidden border-0 shadow-2xl bg-[#0d1526] mb-15 rounded-2xl">
          <CardContent className="md:p-16 text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
              <RocketIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Something Amazing?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join creators worldwide who are using Glimpsy to transform their ideas into reality
            </p>
            <div className="inline-flex items-center justify-center">
              <button className="flex items-center gap-2 bg-white text-[#0d1526] px-6 py-3 rounded-full hover:bg-opacity-90 transition-all font-medium">
                <SparklesIcon className="h-5 w-5" />
                Start creating instantly
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-lg font-medium mb-2">
            Glimpsy — Where creativity meets AI innovation
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Glimpsy AI. Empowering creators worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}

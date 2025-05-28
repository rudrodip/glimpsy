"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  AudioLinesIcon,
  SparklesIcon,
  GithubIcon,
  TwitterIcon,
  ExternalLinkIcon,
  HeartIcon,
  ZapIcon,
  PaletteIcon,
  MicIcon,
  CheckIcon,
  ClockIcon,
  StarIcon,
  TrendingUpIcon,
  ShieldIcon,
  DownloadIcon,
  UsersIcon,
  BrainIcon,
  RocketIcon,
  WandIcon,
  CameraIcon,
  Globe,
} from "lucide-react";
import { motion } from "motion/react";
import { AnimatedBorderCard } from "@/components/animated-border-card";
import GradientBackground from "@/components/gradient-background";
import { siteConfig } from "@/lib/config/site.config";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons";

export default function AboutPage() {
  const features = [
    {
      icon: <ZapIcon className="h-5 w-5" />,
      title: "Lightning Fast",
      description: "Generate content in seconds, not minutes"
    },
    {
      icon: <ShieldIcon className="h-5 w-5" />,
      title: "Privacy First",
      description: "Your creations are yours - we don't store or track"
    },
    {
      icon: <BrainIcon className="h-5 w-5" />,
      title: "AI Powered",
      description: "Latest AI models for highest quality output"
    },
    {
      icon: <DownloadIcon className="h-5 w-5" />,
      title: "Easy Export",
      description: "Download in high quality formats instantly"
    }
  ];

  const useCases = [
    {
      icon: <CameraIcon className="h-8 w-8" />,
      title: "Content Creation",
      description: "Generate unique visuals for social media, blogs, and marketing materials",
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: <MicIcon className="h-8 w-8" />,
      title: "Accessibility",
      description: "Convert text to speech for better content accessibility and inclusion",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <WandIcon className="h-8 w-8" />,
      title: "Creative Projects",
      description: "Bring artistic visions to life for personal or professional projects",
      gradient: "from-purple-500/20 to-indigo-500/20"
    },
    {
      icon: <TrendingUpIcon className="h-8 w-8" />,
      title: "Business Growth",
      description: "Scale content production without hiring expensive agencies",
      gradient: "from-green-500/20 to-emerald-500/20"
    }
  ];

  const stats = [
    { number: "10K+", label: "Images Generated" },
    { number: "5K+", label: "Audio Files Created" },
    { number: "99.9%", label: "Uptime" },
    { number: "< 5s", label: "Average Generation Time" }
  ];

  return (
    <div className="relative min-h-screen">
      <GradientBackground className="opacity-30" />
      
      <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium mb-6 backdrop-blur-sm">
            <SparklesIcon className="h-4 w-4" />
            About {siteConfig.name}
          </div>
          <h1 className="text-3xl md:text-6xl font-bold font-heading tracking-tighter mb-6">
            Your <span className="primary-gradient gradient-text gradient-flow-left-to-right">Creative Assistant</span>
          </h1>
          <p className="text-base md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="primary-gradient gradient-flow-left-to-right text-white border-none gap-2" asChild>
              <Link href="/studio">
                <SparklesIcon className="h-5 w-5" />
                Try {siteConfig.name} Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-heading primary-gradient gradient-text gradient-flow-left-to-right mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-foreground/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-20"
          id="features"
        >
          <AnimatedBorderCard className="p-px rounded-[11px]" gradientSize={150}>
            <Card className="h-full bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm border-0 rounded-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                    <ImageIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading">Image Generation</h3>
                    <p className="text-sm text-foreground/60">AI-Powered Visual Creation</p>
                  </div>
                </div>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  Transform your ideas into stunning visuals with cutting-edge AI technology. 
                  From photorealistic images to artistic concepts, simply describe your vision 
                  and watch it materialize in seconds.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                    <span>High-resolution outputs up to 1024x1024</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                    <span>Multiple artistic styles and formats</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                    <span>Commercial usage rights included</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedBorderCard>

          <AnimatedBorderCard className="p-px rounded-[11px]" gradientSize={150}>
            <Card className="h-full bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm border-0 rounded-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-linear-to-br from-green-500/20 to-blue-500/20 rounded-lg">
                    <AudioLinesIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading">Text to Speech</h3>
                    <p className="text-sm text-foreground/60">Natural Voice Synthesis</p>
                  </div>
                </div>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  Convert any text into natural-sounding speech with our advanced AI voice 
                  synthesis. Perfect for creating voiceovers, podcasts, audiobooks, or 
                  making your content more accessible.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                    <span>Crystal clear audio quality</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                    <span>Multiple voice options and languages</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                    <span>Instant MP3 download</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedBorderCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tighter mb-4">
              Why Choose <span className="primary-gradient gradient-text gradient-flow-left-to-right">{siteConfig.name}?</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Built for creators who value quality, speed, and simplicity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <AnimatedBorderCard key={index} className="p-px rounded-[11px]" gradientSize={100}>
                <Card className="h-full bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm border-0 rounded-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold font-heading mb-1">{feature.title}</h3>
                        <p className="text-sm text-foreground/70">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedBorderCard>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tighter mb-4">
              Perfect For <span className="primary-gradient gradient-text gradient-flow-left-to-right">Every Creator</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Whether you're a professional or just starting out, {siteConfig.name} adapts to your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <AnimatedBorderCard key={index} className="p-px rounded-[11px]" gradientSize={150}>
                <Card className="h-full bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm border-0 rounded-lg group transition-all duration-300">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${useCase.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-bold font-heading mb-3">{useCase.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{useCase.description}</p>
                  </CardContent>
                </Card>
              </AnimatedBorderCard>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tighter mb-4">
              Simple. Fast. <span className="primary-gradient gradient-text gradient-flow-left-to-right">Powerful.</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Creating amazing content has never been this easy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm relative">
                <PaletteIcon className="h-10 w-10 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">Describe Your Vision</h3>
              <p className="text-foreground/70 tracking-tighter">
                Simply type what you want to create in natural language. Our AI understands 
                context and nuance to bring your ideas to life.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm relative">
                <ZapIcon className="h-10 w-10 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">AI Magic Happens</h3>
              <p className="text-foreground/70 tracking-tighter">
                Our advanced AI models process your request using cutting-edge machine learning 
                to generate high-quality content in seconds.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm relative">
                <HeartIcon className="h-10 w-10 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">Enjoy & Share</h3>
              <p className="text-foreground/70 tracking-tighter">
                Download your creations in high quality, share them with the world, or use them 
                in your projects. The possibilities are endless.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <AnimatedBorderCard className="p-px rounded-[11px]" gradientSize={200}>
            <Card className="bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm border-0 rounded-lg">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-rose-400/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <RocketIcon className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tighter mb-6">
                  Our <span className="primary-gradient gradient-text gradient-flow-left-to-right">Mission</span>
                </h2>
                <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed mb-8">
                  We believe creativity should be accessible to everyone. {siteConfig.name} democratizes 
                  powerful AI tools, making it simple for anyone to bring their imagination to life 
                  without technical expertise, expensive software, or steep learning curves.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4 text-primary" />
                    <span>Inclusive for all skill levels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-primary" />
                    <span>Save time and resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarIcon className="h-4 w-4 text-primary" />
                    <span>Professional quality results</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedBorderCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tighter mb-4">
              Meet the <span className="primary-gradient gradient-text gradient-flow-left-to-right">Team</span>
            </h2>
            <p className="text-lg text-foreground/70">
              The passionate developers behind {siteConfig.name}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {siteConfig.contributors.map((contributor, index) => (
              <AnimatedBorderCard key={contributor.name} className="p-px rounded-[11px]" gradientSize={300}>
                <Card className="h-full bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm border-0 rounded-lg group transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300">
                      <AvatarImage 
                        src={`https://github.com/${contributor.github.split('/').pop()}.png`} 
                        alt={contributor.name}
                      />
                      <AvatarFallback className="text-lg font-bold">
                        {contributor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold font-heading mb-2">{contributor.name}</h3>
                    <p className="text-sm text-foreground/70 mb-6">Full Stack Developer</p>
                    <div className="flex items-center justify-center gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <a href={contributor.github} target="_blank" rel="noopener noreferrer">
                          <Icons.Github />
                          GitHub
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={contributor.x} target="_blank" rel="noopener noreferrer">
                          <Icons.X className="size-3" />
                          Twitter
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={contributor.url} target="_blank" rel="noopener noreferrer">
                          <Globe />
                          Portfolio
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedBorderCard>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <AnimatedBorderCard className="p-px rounded-[11px]" gradientSize={300}>
            <Card className="bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm border-0 rounded-lg">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-rose-400/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <SparklesIcon className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tighter mb-4">
                  Ready to Create Something <span className="primary-gradient gradient-text gradient-flow-left-to-right">Amazing?</span>
                </h2>
                <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Join thousands of creators worldwide who are using {siteConfig.name} to transform 
                  their ideas into reality. No signup required - start creating in seconds.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="primary-gradient gradient-flow-left-to-right text-white border-none gap-2" asChild>
                    <Link href="/studio">
                      <SparklesIcon className="h-5 w-5" />
                      Start Creating Now
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="h-5 w-5 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedBorderCard>
        </motion.div>
      </div>
    </div>
  );
}

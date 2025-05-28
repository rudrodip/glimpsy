"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedBorderCard } from "@/components/animated-border-card";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  AudioLinesIcon,
  ZapIcon,
  ShieldIcon,
  DownloadIcon,
  SparklesIcon,
  CheckIcon
} from "lucide-react";

interface FeatureProps {
  className?: string;
}

export default function Features({ className }: FeatureProps) {
  const features = [
    {
      icon: <ImageIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "AI Image Generation",
      description: "Transform your ideas into stunning visuals with cutting-edge AI technology.",
      gradient: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      benefits: [
        "High-resolution outputs up to 1024x1024",
        "Multiple artistic styles and formats",
        "Commercial usage rights included"
      ]
    },
    {
      icon: <AudioLinesIcon className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Text to Speech",
      description: "Convert any text into natural-sounding speech with advanced AI voice synthesis.",
      gradient: "bg-gradient-to-br from-green-500/20 to-blue-500/20",
      benefits: [
        "Crystal clear audio quality",
        "Adjust volume",
        "Instant MP3 download"
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: <ZapIcon className="h-5 w-5" />,
      title: "Lightning Fast",
      description: "Generate content in seconds, not minutes",
      gradient: "bg-gradient-to-br from-yellow-400 dark:from-yellow-500 to-orange-400 dark:to-orange-500"
    },
    {
      icon: <ShieldIcon className="h-5 w-5" />,
      title: "Privacy First",
      description: "Your creations are yours - we don't store or track",
      gradient: "bg-gradient-to-br from-emerald-400 dark:from-emerald-500 to-teal-400 dark:to-teal-500"
    },
    {
      icon: <SparklesIcon className="h-5 w-5" />,
      title: "AI Powered",
      description: "Latest AI models for highest quality output",
      gradient: "bg-gradient-to-br from-purple-400 dark:from-purple-500 to-indigo-400 dark:to-indigo-500"
    },
    {
      icon: <DownloadIcon className="h-5 w-5" />,
      title: "Easy Export",
      description: "Download in high quality formats instantly",
      gradient: "bg-gradient-to-br from-cyan-400 dark:from-cyan-500 to-blue-400 dark:to-blue-500"
    }
  ];

  return (
    <section id="features" className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium mb-6 backdrop-blur-sm">
            <SparklesIcon className="h-4 w-4" />
            Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter mb-6">
            Powerful <span className="primary-gradient gradient-text gradient-flow-left-to-right">AI Tools</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Everything you need to bring your creative vision to life with cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AnimatedBorderCard className="p-px rounded-2xl h-full" gradientSize={150}>
                <Card className="h-full bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm border-0 rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={cn("p-3 rounded-xl", feature.gradient)}>
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-heading">{feature.title}</h3>
                        <p className="text-sm text-foreground/60">Professional Quality</p>
                      </div>
                    </div>
                    <p className="text-foreground/70 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <div className="space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <CheckIcon className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedBorderCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {additionalFeatures.map((feature, index) => (
            <Card key={index} className="h-full bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm border-0 rounded-xl group transition-all duration-300">
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className={cn("w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300", feature.gradient)}>
                  {feature.icon}
                </div>
                <h3 className="font-bold font-heading mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed flex-1">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
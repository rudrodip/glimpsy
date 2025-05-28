"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBorderCard } from "@/components/animated-border-card";
import GradientBackground from "@/components/gradient-background";
import { 
  SparklesIcon, 
  PlusIcon, 
  BugIcon, 
  WrenchIcon,
  CalendarIcon,
  TagIcon,
  ArrowUpIcon,
  ShieldIcon
} from "lucide-react";

interface ChangelogEntry {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  changes: {
    type: "added" | "fixed" | "improved" | "security";
    description: string;
  }[];
}

export default function ChangelogPage() {
  const changelog: ChangelogEntry[] = [
    {
      version: "0.0.1",
      date: "2024-12-20",
      type: "major",
      changes: [
        { type: "added", description: "AI-powered text-to-image generation with high-quality output" },
        { type: "added", description: "Text-to-speech feature with natural voice synthesis" },
        { type: "added", description: "Modern, responsive web interface" },
        { type: "added", description: "Initial release of Glimpsy platform" }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "added":
        return <PlusIcon className="h-4 w-4 text-green-600" />;
      case "fixed":
        return <BugIcon className="h-4 w-4 text-blue-600" />;
      case "improved":
        return <ArrowUpIcon className="h-4 w-4 text-purple-600" />;
      case "security":
        return <ShieldIcon className="h-4 w-4 text-orange-600" />;
      default:
        return <WrenchIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "major":
        return <Badge variant="default" className="bg-red-500 hover:bg-red-600">Major</Badge>;
      case "minor":
        return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">Minor</Badge>;
      case "patch":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Patch</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      
      <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium mb-6 backdrop-blur-sm">
            <CalendarIcon className="h-4 w-4" />
            Changelog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter mb-6">
            What's <span className="primary-gradient gradient-text gradient-flow-left-to-right">New</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Stay up to date with the latest features, improvements, and bug fixes in Glimpsy
          </p>
        </motion.div>

        <div className="space-y-8">
          {changelog.map((entry, index) => (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <AnimatedBorderCard className="p-px rounded-2xl" gradientSize={150}>
                <Card className="bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm border-0 rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <TagIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold font-heading">
                            Version {entry.version}
                          </h2>
                          <p className="text-sm text-foreground/60 flex items-center gap-2">
                            <CalendarIcon className="h-3 w-3" />
                            {formatDate(entry.date)}
                          </p>
                        </div>
                      </div>
                      {getTypeBadge(entry.type)}
                    </div>

                    <div className="space-y-3">
                      {entry.changes.map((change, changeIndex) => (
                        <div key={changeIndex} className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {getTypeIcon(change.type)}
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium capitalize text-foreground/80">
                              {change.type}:{" "}
                            </span>
                            <span className="text-sm text-foreground/70">
                              {change.description}
                            </span>
                          </div>
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <AnimatedBorderCard className="p-px rounded-2xl" gradientSize={200}>
            <Card className="bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm border-0 rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <SparklesIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-2">
                  Have a Feature Request?
                </h3>
                <p className="text-foreground/70 mb-4 max-w-md mx-auto">
                  We're always looking to improve Glimpsy. Share your ideas and help shape the future of our platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://github.com/sachigoyal/glimpsy/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                  >
                    Submit Feedback
                  </a>
                </div>
              </CardContent>
            </Card>
          </AnimatedBorderCard>
        </motion.div>
      </div>
    </div>
  );
} 
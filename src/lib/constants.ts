import { ModeValue } from "@/types";
import {
  ImageIcon,
  AudioLines,
  type LucideIcon,
} from "lucide-react";

export const MODE_OPTIONS: {
  value: ModeValue;
  meta: { label: string; icon: LucideIcon; description: string };
}[] = [
  {
    value: ModeValue.TEXT_TO_IMAGE,
    meta: {
      label: "Text to Image",
      icon: ImageIcon,
      description: "Generate images from text",
    },
  },
  {
    value: ModeValue.TEXT_TO_SPEECH,
    meta: {
      label: "Text to Speech",
      icon: AudioLines,
      description: "Generate speech from text",
    },
  },
];

export const PROMPT_PLACEHOLDERS: Record<ModeValue, string> = {
  [ModeValue.TEXT_TO_IMAGE]: "Describe the image you want to generate",
  [ModeValue.TEXT_TO_SPEECH]: "Write the text you want to convert to speech",
};

export const EXAMPLES: {
  mode: ModeValue;
  icon: LucideIcon;
  promptLabel: string;
  prompt: string;
}[] = [
  {
    mode: ModeValue.TEXT_TO_IMAGE,
    icon: ImageIcon,
    promptLabel: "A Beautiful Sunset",
    prompt:
      "A breathtaking golden sunset over a perfectly calm ocean with gentle waves reflecting the warm amber and orange hues of the sky, surrounded by wispy clouds and seagulls in the distance",
  },
  {
    mode: ModeValue.TEXT_TO_SPEECH,
    icon: AudioLines,
    promptLabel: "Hey! I'm Glimpsy",
    prompt:
      "Hey! I'm Glimpsy, your creative assistant. I'm here to help you create something amazing. What can I help you with today?",
  },
  {
    mode: ModeValue.TEXT_TO_IMAGE,
    icon: ImageIcon,
    promptLabel: "A playful cat",
    prompt: "A playful cat with a pink bowtie and a pink collar",
  },
  {
    mode: ModeValue.TEXT_TO_SPEECH,
    icon: AudioLines,
    promptLabel: "You are amazing",
    prompt: "You are an amazing person, I love you",
  },
];

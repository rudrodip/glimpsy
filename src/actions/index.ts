"use server";

import { GoogleGenAI, Modality } from "@google/genai";
import { writeFileSync } from "fs";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function getResponse(prompt: string) {
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const contents = prompt;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: contents,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  if (!response.candidates?.[0]?.content) {
    console.error("No content found in response");
    throw new Error("No content found in response");
  }

  const result: {
    text?: string;
    image?: string;
  } = {
    text: "",
    image: "",
  };

  for (const part of response.candidates?.[0]?.content.parts ?? []) {
    if (part.text) {
      result.text = part.text;
      console.log(part.text);
    } else if (part.inlineData) {
      result.image = part.inlineData.data;
    }
  }

  return result;
}

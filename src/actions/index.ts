"use server";

import { AIResponse, ModeValue } from "@/types";
import { GoogleGenAI, Modality } from "@google/genai";
import { promptSchema } from "@/lib/schema";
import z from "zod";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function generateText(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.TEXT],
      },
    });
     console.log(response);
    return response.text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
}

export async function enhanceImagePrompt(prompt: string) {
  const systemPrompt = `
  Glimpsy is a creative assistant that allows you to create images and text to speech and respond to user queries.
  Your work is to enhance the prompt only for text to image mode to make it more creative and engaging and to make it more specific to the mode. Make sure the AI is able to understand the prompt clearly.

  Restrictions:
  - Don't make it too long.
  - Don't make it too short.
  - Don't make it too vague.
  - Don't use jargons
  - Don't use complex words.
  - Don't use emojis.
  - Don't use special characters.
  - Don't use markdown.
  - Don't use html.
  - Don't use code.

  Instructions:
  - It should be in the same language as the user prompt.
  - It should be concise, and plain text. No markdown or other formatting.
  - It should be specific to the mode.
  - It should be creative and engaging.
  - Use simple words and sentences.

  It should feel natural and human like.

  User prompt: ${prompt}

  Just output the enhanced prompt, no other text. Make in very concise and instructive.
  `

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: systemPrompt,
  });

  return response.text?.trim();
}

export async function generateResponse(data: z.infer<typeof promptSchema>): Promise<AIResponse> {
  const { prompt, mode } = data;
  const startTime = Date.now();

  const createResponse = (data?: string, error?: string): AIResponse => ({
    mode,
    data,
    delta: Date.now() - startTime,
    error
  });

  try {
    switch (mode) {
      case ModeValue.TEXT_TO_IMAGE: {
        const result = await generateTextToImage(prompt);
        return createResponse(result.image);
      }
      
      case ModeValue.TEXT_TO_SPEECH: {
        const result = await generateAudio(prompt);
        return createResponse(result);
      }
      
      case ModeValue.AUTO:
        return createResponse(undefined, "Not Implemented");
      
      default:
        return createResponse(undefined, "Invalid mode");
    }
  } catch (error) {
    console.error(`Error in generateResponse for mode ${mode}:`, error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return createResponse(undefined, errorMessage);
  }
}

async function generateTextToImage(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: prompt,
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  })

  if (!response.candidates?.[0]?.content) {
    console.error("No content found in response");
    throw new Error("No content found in response");
  }

  const result: { text?: string; image?: string } = {
    text: "",
    image: "",
  };

  for (const part of response.candidates?.[0]?.content.parts ?? []) {
    if (part.text) {
      result.text = part.text;
    } else if (part.inlineData) { 
      result.image = part.inlineData.data;
    }
  }

  return result;
}

async function generateAudio(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    if (!response.candidates) {
      throw new Error("No response from Gemini");
    }

    if (!response.candidates[0]?.content?.parts) {
      throw new Error("No content from Gemini");
    }

    const content = response.candidates[0]?.content?.parts[0];
    const result = content.inlineData?.data;
    
    return result;
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
}

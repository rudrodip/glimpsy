"use server";
import wav from "wav";
import { GoogleGenAI, Modality } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET || "";
if (!GEMINI_API_KEY || !GEMINI_API_SECRET) {
  throw new Error("Missing Gemini API credentials");
}

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
export async function saveWaveFile(
  filename: string,
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<void> {
  return new Promise((resolve, reject) => {
    const writer = new wav.FileWriter(filename, {
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    writer.on("finish", resolve);
    writer.on("error", reject);

    writer.write(pcmData);
    writer.end();
  });
}

export async function generateAudio(prompt: string) {
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
    const mimeType = content.inlineData?.mimeType;

    return {
      result,
      mimeType,
    };
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
}

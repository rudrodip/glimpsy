import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createWavBuffer(
  pcmData: Buffer,
  sampleRate = 24000,
  channels = 1,
  bitsPerSample = 16
) {
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;
  const dataSize = pcmData.length;
  const fileSize = 36 + dataSize;

  const wavBuffer = Buffer.alloc(44 + dataSize);
  let offset = 0;

  // RIFF header
  wavBuffer.write("RIFF", offset);
  offset += 4;
  wavBuffer.writeUInt32LE(fileSize, offset);
  offset += 4;
  wavBuffer.write("WAVE", offset);
  offset += 4;

  // fmt chunk
  wavBuffer.write("fmt ", offset);
  offset += 4;
  wavBuffer.writeUInt32LE(16, offset);
  offset += 4; // chunk size
  wavBuffer.writeUInt16LE(1, offset);
  offset += 2; // PCM format
  wavBuffer.writeUInt16LE(channels, offset);
  offset += 2;
  wavBuffer.writeUInt32LE(sampleRate, offset);
  offset += 4;
  wavBuffer.writeUInt32LE(byteRate, offset);
  offset += 4;
  wavBuffer.writeUInt16LE(blockAlign, offset);
  offset += 2;
  wavBuffer.writeUInt16LE(bitsPerSample, offset);
  offset += 2;

  // data chunk
  wavBuffer.write("data", offset);
  offset += 4;
  wavBuffer.writeUInt32LE(dataSize, offset);
  offset += 4;
  pcmData.copy(wavBuffer, offset);

  return wavBuffer;
}

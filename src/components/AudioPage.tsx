"use client";

import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { generateAudio } from "@/actions";

function createWavBuffer(
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

export default function AudioPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioResult, setAudioResult] = useState<string | undefined>(undefined);
  const [mimeType, setMimeType] = useState<string | undefined>(undefined);

  const handleDownload = () => {
    if (!audioResult || !mimeType) return;

    const pcmBuffer = Buffer.from(audioResult, "base64");
    const wavBuffer = createWavBuffer(pcmBuffer);
    const blob = new Blob([wavBuffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audio.wav";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePlay = () => {
    if (!audioResult || !mimeType) return;

    const pcmBuffer = Buffer.from(audioResult, "base64");
    const wavBuffer = createWavBuffer(pcmBuffer);
    const blob = new Blob([wavBuffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
    audio.onended = () => URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setAudioResult(undefined);
    setMimeType(undefined);
    setIsPlaying(false);
    try {
      const { result, mimeType } = await generateAudio(prompt);
      setAudioResult(result);
      setMimeType(mimeType);
    } catch (error) {
      console.error("Error generating audio:", error);
      setError("Failed to generate audio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter your prompt"
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>{" "}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {audioResult && (
        <div>
          <Button onClick={handleDownload}>Download</Button>{" "}
          <Button onClick={handlePlay} disabled={isPlaying}>
            {isPlaying ? "Playing..." : "Play"}
          </Button>
        </div>
      )}
    </div>
  );
}

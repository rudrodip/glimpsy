"use client";

import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { generateAudio } from "@/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  AlertCircle,
  Download,
  Loader2,
  Mic,
  Play,
  Send,
  Volume2,
  AudioLines,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Navbar } from "./Navbar";

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

    setIsPlaying(true);
    const pcmBuffer = Buffer.from(audioResult, "base64");
    const wavBuffer = createWavBuffer(pcmBuffer);
    const blob = new Blob([wavBuffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
    audio.onended = () => {
      URL.revokeObjectURL(url);
      setIsPlaying(false);
    };
    audio.onerror = () => {
      setIsPlaying(false);
    };
  };
  const handleSubmit = async () => {
    if (!prompt.trim()) return;

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
      setError("Failed to generate audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && prompt.trim() && !loading) {
      handleSubmit();
    }
  };  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 w-full max-w-4xl mx-auto p-6 pt-20 flex flex-col gap-6">
        {!audioResult && !loading && (
          <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <Card className="w-full max-w-2xl bg-background shadow-xl border-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <AudioLines className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-bold text-center text-primary">
                    AI Audio Generator
                  </CardTitle>
                </div>
                <CardDescription className="text-center text-muted-foreground">
                  Convert your text to high-quality audio with advanced AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 items-center">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      className="flex-1 h-11 pl-12 shadow-sm"
                      placeholder="Enter text to convert to audio..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={loading}
                    />
                    <Mic className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button
                    onClick={handleSubmit}
                    className="h-11"
                    disabled={loading || !prompt.trim()}
                    variant="default"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}        {loading && (
          <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <Card className="w-full max-w-2xl bg-background shadow-xl border-2">
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">Generating audio...</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI is crafting your audio. This may take a moment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}{audioResult && !loading && (
              <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <Card className="w-full max-w-2xl bg-card shadow-xl border border-border/40">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-6 w-6 text-primary" />
                      <div>
                        <CardTitle className="text-xl">Audio Generated</CardTitle>
                        <CardDescription>
                          Ready to play or download
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-background/80 rounded-lg border border-border/40">
                      <p className="text-sm text-muted-foreground mb-2 font-medium">
                        Generated from:
                      </p>
                      <p className="text-sm font-medium italic">
                        "{prompt}"
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handlePlay}
                        disabled={isPlaying}
                        className="flex-1 h-11"
                        variant="default"
                      >
                        {isPlaying ? (
                          <>
                            <div className="mr-2 w-3 h-3 rounded-full bg-current animate-pulse" />
                            Playing...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Play Audio
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        className="h-11"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
      </div>
    </div>
  );
}

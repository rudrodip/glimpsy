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
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Center content when no results, top-align when results exist */}
      <div className={`${audioResult || loading ? 'pt-8' : 'min-h-screen flex items-center justify-center'}`}>
        <div className="max-w-2xl mx-auto px-6 w-full">
          
          {/* Header - only show when centered */}
          {!audioResult && !loading && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <AudioLines className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">AI Audio Generator</h1>
              <p className="text-muted-foreground">
                Convert your text to high-quality audio
              </p>
            </div>
          )}

          {/* Input Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    className="h-11 pl-10"
                    placeholder="Enter text to convert to audio..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                  />
                  <Mic className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <Button
                  onClick={handleSubmit}
                  className="h-11 px-6"
                  disabled={loading || !prompt.trim()}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading && (
            <Card className="mb-6">
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <div className="text-center">
                    <h3 className="font-semibold">Generating audio...</h3>
                    <p className="text-sm text-muted-foreground">This may take a moment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Audio Results */}
          {audioResult && !loading && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                    <Volume2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Audio Generated</CardTitle>
                    <CardDescription>Ready to play or download</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Generated from:</p>
                  <p className="text-sm font-medium">"{prompt}"</p>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={handlePlay}
                    disabled={isPlaying}
                    className="flex-1"
                  >
                    {isPlaying ? (
                      <>
                        <div className="mr-2 w-2 h-2 rounded-full bg-current animate-pulse" />
                        Playing...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Play
                      </>
                    )}
                  </Button>
                  
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
        </div>
      </div>
    </div>
  );
}

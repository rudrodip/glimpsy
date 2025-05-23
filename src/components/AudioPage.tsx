"use client";

import { Input } from "./ui/input";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Howl } from "howler";
import { getAudioResponse } from "@/actions";

export default function AudioPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioMimeType, setAudioMimeType] = useState<string>("audio/mpeg");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const soundRef = useRef<Howl | null>(null);

  // Cleanup effect to revoke URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setAudioUrl(null);
    setAudioBase64(null);
    setIsPlaying(false);
    try {
    const response  = await getAudioResponse(prompt);
      if (!response) {
        setError("No audio data found in response");
        return;
      }
      const audioData = response.audioData;
      const mimeType = response.mimeType || "audio/mpeg";

      // Create a Blob URL for the audio data
      const blob = new Blob([audioData], { type: mimeType });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setAudioMimeType(mimeType);
      setAudioBase64(audioData);
      setIsPlaying(false);
      soundRef.current = new Howl({
        src: [url],
        format: [mimeType.split("/")[1]],
        onplay: () => {
          setIsPlaying(true);
        },
        onpause: () => {
          setIsPlaying(false);
        },
        onend: () => {
          setIsPlaying(false);
        },
      });
      soundRef.current.play();
      setIsPlaying(true);
      
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
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}      {soundRef.current && (
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => {
                if (isPlaying) {
                  soundRef.current?.pause();
                  setIsPlaying(false);
                } else {
                  soundRef.current?.play();
                  setIsPlaying(true);
                }
              }}
              variant="outline"
            >
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <span>{isPlaying ? "Playing audio..." : "Audio ready"}</span>
          </div>
          {/* Keep the native audio player as fallback */}
          {audioUrl && (
            <audio controls className="w-full">
              <source src={audioUrl} type={audioMimeType} />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      )}
    </div>
  );
}

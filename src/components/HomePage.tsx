"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { getResponse } from "@/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Loader2, Sparkles, Image as ImageIcon, Type, Send, Download, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Navbar } from "./Navbar";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError("");
    const response = await getResponse(prompt);
    console.log(response);
    
    if (response.text) {
      setText(response.text);
    }

    if (response.image) {
      setImage(response.image);
    }
    
    setLoading(false);
    if (!response.text && !response.image) {
      setError("No content found in response");
    }
  }

  // Handle pressing Enter key in the input field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && prompt.trim() && !loading) {
      handleSubmit();
    }
  };

  // Download the generated image
  const downloadImage = () => {
    if (!image) return;
    
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${image}`;
    link.download = `glimpsy-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download the generated text
  const downloadText = () => {
    if (!text) return;
    
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `glimpsy-text-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  // Reset the form to generate a new prompt
  const handleReset = () => {
    setText("");
    setImage("");
    setPrompt("");
    setError("");
  };
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 w-full max-w-4xl mx-auto p-6 pt-20 flex flex-col gap-6">        {!text && !image && !loading && (
          <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <Card className="w-full max-w-2xl bg-background shadow-xl border-2 border-primary">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-bold text-center text-primary">
                    AI Text & Image Generator
                  </CardTitle>
                </div>
                <CardDescription className="text-center text-muted-foreground">
                  Enter a prompt below to generate text or image content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 items-center">
                  <Input
                    className="flex-1 h-11 pl-4 shadow-sm"
                    placeholder="Enter your prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                  />
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
        )}

        {error && (
          <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-5 duration-300">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}        {loading && (
          <Card className="shadow-lg border border-primary overflow-hidden animate-pulse bg-background">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-[200px]" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col items-center justify-center p-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-medium text-center">Generating content...</p>
              <p className="text-sm text-muted-foreground text-center">This might take a moment</p>
            </CardContent>
          </Card>
        )}

        {(text || image) && !loading && (
          <Card className="shadow-xl border-primary border-2 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 bg-background">
            <CardHeader className="pb-2 border-b">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-primary">
                  <AvatarImage src="/globe.svg" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg font-bold">Generated Results</CardTitle>
              </div>
            </CardHeader><CardContent className="space-y-6 pt-6">
              {text && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Type className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-medium">Generated Text</h3>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 gap-1" 
                      onClick={downloadText}
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="text-xs">Download</span>
                    </Button>
                  </div>                  <div className="bg-muted p-4 rounded-lg border border-border shadow-inner">
                    <p className="text-pretty whitespace-pre-wrap leading-relaxed">{text}</p>
                  </div>
                </div>
              )}
              
              {text && image && <Separator className="my-6" />}
              
              {image && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-medium">Generated Image</h3>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 gap-1" 
                      onClick={downloadImage}
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="text-xs">Download</span>
                    </Button>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border shadow-md bg-muted">
                    <img 
                      src={`data:image/png;base64,${image}`} 
                      alt="Generated" 
                      className="max-w-full h-auto mx-auto object-contain" 
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-muted pt-4 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">Generated based on prompt: "{prompt}"</div>
              <Button 
                size="sm" 
                variant="outline" 
                className="gap-1" 
                onClick={handleReset}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>New</span>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

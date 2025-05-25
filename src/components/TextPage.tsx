"use client";
import { useState } from "react";
import { generateText } from "@/actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function TextPage() {

const [text, setText] = useState("");
  return (
    <div>
      <Input
        type="text"
        placeholder="Enter text to generate..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
     <Button onClick={() => generateText(text)}>Submit</Button>
    </div>
  );
}
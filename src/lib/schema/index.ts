import { z } from "zod";
import { ModeValue } from "@/types";

export const promptSchema = z.object({
  prompt: z.string().min(1),
  mode: z.nativeEnum(ModeValue),
});
import { 
  imageExamples,
  creativeExamples,
  professionalExamples,
  additionalExamples, 
  ImageExample 
} from './imageExamples';
import { textPrompts, TextPrompt } from './textExamples';

// Combined examples for easy access
export const allImageExamples = [...imageExamples, ...additionalExamples];

// Helper functions for examples
export function getCategoryCounts(examples: ImageExample[]) {
  const counts: Record<string, number> = {};
  examples.forEach(example => {
    if (example.category) {
      counts[example.category] = (counts[example.category] || 0) + 1;
    }
  });
  return counts;
}

export function getUniqueCategories(examples: ImageExample[]) {
  return ["All", ...Array.from(new Set(examples.filter(ex => ex.category).map(ex => ex.category as string)))];
}

export function getUniqueStyles(examples: ImageExample[]) {
  return Array.from(new Set(examples.map(ex => ex.style)));
}

export function filterExamplesByCategory(examples: ImageExample[], category: string) {
  if (category === "All") return examples;
  return examples.filter(ex => ex.category === category);
}

export function filterExamplesBySearch(examples: ImageExample[], query: string) {
  if (!query) return examples;
  const lowercaseQuery = query.toLowerCase();
  return examples.filter(
    example =>
      example.title.toLowerCase().includes(lowercaseQuery) ||
      example.description.toLowerCase().includes(lowercaseQuery) ||
      example.style.toLowerCase().includes(lowercaseQuery) ||
      (example.category && example.category.toLowerCase().includes(lowercaseQuery))
  );
}

export {
  imageExamples,
  creativeExamples,
  professionalExamples,
  additionalExamples,
  textPrompts,
  type ImageExample,
  type TextPrompt
};

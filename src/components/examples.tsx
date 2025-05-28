"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { CopyIcon, ChevronRightIcon, CheckIcon } from "lucide-react";
import { useAI } from "./ai/ai-context";
import Link from "next/link";

type Example = {
  title: string;
  description: string;
  imageSrc: string;
  style: string;
  category: string;
  prompt: string;
};

type SeeMoreCard = {
  type: 'see-more';
  category: string;
  remainingCount: number;
};

type DisplayedItem = Example | SeeMoreCard;

export default function Examples({ className }: { className?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [copiedPrompts, setCopiedPrompts] = useState<Set<number>>(new Set());
  const { setPrompt } = useAI();
  
  const categories = useMemo(() => new Set(imageExamples.map((example) => example.category)), []);

  const filteredExamples = useMemo(() => {
    if (selectedCategory === null) return imageExamples;
    return imageExamples.filter((example) => example.category === selectedCategory);
  }, [selectedCategory]);

  const displayedExamples = useMemo((): DisplayedItem[] => {
    if (selectedCategory === null) {
      const isExpanded = expandedCategories.has('all');

      if (isExpanded) {
        return imageExamples;
      } else {
        const shuffled = [...imageExamples].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 11);
        const result: DisplayedItem[] = [...selected];

        if (imageExamples.length > 11) {
          result.push({
            type: 'see-more',
            category: 'all',
            remainingCount: imageExamples.length - 11
          });
        }

        return result;
      }
    } else {
      return filteredExamples;
    }
  }, [selectedCategory, filteredExamples, expandedCategories]);

  const handleSeeMore = (category: string) => {
    setExpandedCategories(prev => new Set([...prev, category]));
  };

  const copyPrompt = async (prompt: string, index: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompts(prev => new Set([...prev, index]));
      setTimeout(() => {
        setCopiedPrompts(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  return (
    <div id="examples" className={cn("w-full container mx-auto rounded-xl bg-zinc-50 dark:bg-zinc-800 backdrop-blur-sm p-4 md:p-6 lg:p-8", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tighter mb-2">Examples</h1>
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          <Button
            key="all"
            variant={
              selectedCategory === null ? "default" : "outline"
            }
            size="sm"
            className="rounded-full text-xs h-7 px-3"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {Array.from(categories).map((category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category ? "default" : "outline"
              }
              size="sm"
              className="rounded-full text-xs h-7 px-3"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {displayedExamples.map((example, index) => {
          if ('type' in example && example.type === 'see-more') {
            return (
              <div key={`see-more-${example.category}`} className="group">
                <div
                  className="aspect-square relative overflow-hidden rounded-xl border hover:border-primary/20 bg-muted/30 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center p-4"
                  onClick={() => handleSeeMore(example.category)}
                >
                  <ChevronRightIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium text-foreground mb-1">
                    See More
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {example.remainingCount} more {example.category.toLowerCase()} examples
                  </p>
                </div>
              </div>
            );
          }

          const exampleItem = example as Example;
          const isCopied = copiedPrompts.has(index);
          
          return (
            <div key={index} className="group">
              <div className="aspect-square relative overflow-hidden rounded-xl bg-muted border group-hover:shadow-xl transition-all duration-300">
                <img
                  src={exampleItem.imageSrc}
                  alt={exampleItem.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {exampleItem.category}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-zinc-800 text-white text-xs px-2 py-1 rounded-md w-fit mb-2">
                      {exampleItem.style}
                    </div>
                    <h3 className="text-white font-medium">
                      {exampleItem.title}
                    </h3>
                    <p className="text-white/90 text-sm mt-1">
                      {exampleItem.description}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className={cn(
                          "border-none text-white h-8 rounded-lg transition-all duration-200",
                          isCopied 
                            ? "bg-green-500/30 hover:bg-green-500/40" 
                            : "bg-white/20 hover:bg-white/30"
                        )}
                        onClick={() => copyPrompt(exampleItem.prompt, index)}
                      >
                        {isCopied ? (
                          <>
                            <CheckIcon className="h-3.5 w-3.5 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <CopyIcon className="h-3.5 w-3.5 mr-1" />
                            Prompt
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 border-none text-white h-8 rounded-lg"
                        onClick={() => setPrompt(exampleItem.prompt)}
                        asChild
                      >
                        <Link href={`/studio`}>
                          <Image src="/favicon.png" alt="Try" width={16} height={16} /> Try
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export const imageExamples = [
  // Cityscapes (12 images)
  {
    title: "Futuristic City",
    description: "A futuristic city with flying cars and neon lights",
    imageSrc: "https://picsum.photos/400/400?random=1",
    style: "Futuristic",
    category: "Cityscapes",
    prompt: "A breathtaking futuristic cityscape at dusk, towering glass skyscrapers with holographic displays, flying cars streaming between buildings, vibrant neon lights in blue and purple, cyberpunk aesthetic, ultra-detailed, cinematic lighting, 8k resolution",
  },
  {
    title: "Tokyo Nights",
    description: "Neon-lit streets of Tokyo at midnight",
    imageSrc: "https://picsum.photos/400/400?random=2",
    style: "Urban",
    category: "Cityscapes",
    prompt: "Tokyo street at midnight, bustling with life, bright neon signs reflecting on wet pavement, convenience stores glowing warmly, people with umbrellas, rain-soaked streets, atmospheric lighting, street photography style, high contrast",
  },
  {
    title: "Manhattan Skyline",
    description: "Iconic New York City skyline at sunset",
    imageSrc: "https://picsum.photos/400/400?random=3",
    style: "Photography",
    category: "Cityscapes",
    prompt: "Manhattan skyline during golden hour, Empire State Building prominent, warm orange and pink sunset colors reflecting off glass windows, Hudson River in foreground, dramatic clouds, professional photography, ultra-sharp detail",
  },
  {
    title: "Cyberpunk Street",
    description: "Rain-soaked cyberpunk city street",
    imageSrc: "https://picsum.photos/400/400?random=4",
    style: "Cyberpunk",
    category: "Cityscapes",
    prompt: "Cyberpunk city street, heavy rain, neon signs in Asian characters, steam rising from manholes, dark alleyway with pink and blue lighting, futuristic motorcycles, gritty atmosphere, blade runner aesthetic, moody and atmospheric",
  },
  {
    title: "London Bridge",
    description: "Historic London bridge over the Thames",
    imageSrc: "https://picsum.photos/400/400?random=5",
    style: "Architectural",
    category: "Cityscapes",
    prompt: "Tower Bridge London at sunset, Thames River flowing underneath, Victorian Gothic architecture, warm golden lighting, boats on the river, cloudy sky with dramatic colors, architectural photography, fine detail",
  },
  {
    title: "Dubai Towers",
    description: "Modern Dubai skyline with glass towers",
    imageSrc: "https://picsum.photos/400/400?random=6",
    style: "Modern",
    category: "Cityscapes",
    prompt: "Dubai skyline with Burj Khalifa, modern glass skyscrapers reflecting sunlight, clear blue sky, desert in background, luxury and opulence, architectural marvel, ultra-modern design, crisp and clean, professional photography",
  },
  {
    title: "Venice Canals",
    description: "Romantic Venice canals with gondolas",
    imageSrc: "https://picsum.photos/400/400?random=7",
    style: "Classical",
    category: "Cityscapes",
    prompt: "Venice canal with gondola, historic Italian architecture, warm afternoon light, stone bridges, weathered buildings with shutters, romantic atmosphere, European charm, soft warm lighting, travel photography style",
  },
  {
    title: "Hong Kong Harbor",
    description: "Bustling Hong Kong harbor at night",
    imageSrc: "https://picsum.photos/400/400?random=8",
    style: "Urban",
    category: "Cityscapes",
    prompt: "Hong Kong harbor at night, Symphony of Lights show, skyscrapers reflecting in water, colorful LED displays, busy harbor with boats, urban energy, dynamic composition, long exposure photography, vibrant colors",
  },
  {
    title: "Paris Streets",
    description: "Charming Parisian cobblestone streets",
    imageSrc: "https://picsum.photos/400/400?random=9",
    style: "Vintage",
    category: "Cityscapes",
    prompt: "Cobblestone street in Montmartre Paris, charming cafe with outdoor seating, Haussmann architecture, vintage street lamps, people walking with bags, romantic European atmosphere, warm golden hour lighting, film photography aesthetic",
  },
  {
    title: "Silicon Valley",
    description: "Tech hub with modern office buildings",
    imageSrc: "https://picsum.photos/400/400?random=10",
    style: "Corporate",
    category: "Cityscapes",
    prompt: "Silicon Valley tech campus, modern glass office buildings, sleek contemporary architecture, well-manicured landscaping, clear blue sky, innovative design, corporate headquarters, clean lines, professional business environment",
  },
  {
    title: "Chicago Loop",
    description: "Art deco buildings in downtown Chicago",
    imageSrc: "https://picsum.photos/400/400?random=11",
    style: "Art Deco",
    category: "Cityscapes",
    prompt: "Chicago Loop district, Art Deco skyscrapers, geometric patterns on building facades, vintage 1920s architecture, dramatic upward angle, black and white with selective color, architectural details, urban canyon effect",
  },
  {
    title: "Ancient Rome",
    description: "Colosseum and ancient Roman architecture",
    imageSrc: "https://picsum.photos/400/400?random=12",
    style: "Historical",
    category: "Cityscapes",
    prompt: "Roman Colosseum at sunset, ancient stone architecture, weathered arches and columns, warm golden light, historical grandeur, tourists in foreground for scale, dramatic sky, archaeological wonder, textural detail",
  },

  // Landscapes (12 images)
  {
    title: "Serene Nature",
    description: "Peaceful mountain landscape with a lake reflection",
    imageSrc: "https://picsum.photos/400/400?random=13",
    style: "Photography",
    category: "Landscapes",
    prompt: "Serene mountain lake at dawn, perfect reflection of snow-capped peaks, misty morning atmosphere, pristine wilderness, calm water surface, evergreen forest, soft pastel colors, nature photography, tranquil and peaceful",
  },
  {
    title: "Ocean Sunset",
    description: "Vibrant sunset over calm ocean waters",
    imageSrc: "https://picsum.photos/400/400?random=14",
    style: "Photography",
    category: "Landscapes",
    prompt: "Spectacular ocean sunset, vibrant orange and pink colors in sky, calm waves gently lapping shore, silhouetted rocks, dramatic cloud formations, golden hour lighting, seascape photography, peaceful and majestic",
  },
  {
    title: "Alpine Meadow",
    description: "Colorful wildflowers in mountain meadow",
    imageSrc: "https://picsum.photos/400/400?random=15",
    style: "Natural",
    category: "Landscapes",
    prompt: "Alpine meadow in full bloom, colorful wildflowers covering rolling hills, snow-capped mountains in background, bright summer day, blue sky with white clouds, nature's beauty, vibrant colors, landscape photography",
  },
  {
    title: "Desert Dunes",
    description: "Golden sand dunes under starry sky",
    imageSrc: "https://picsum.photos/400/400?random=16",
    style: "Minimalist",
    category: "Landscapes",
    prompt: "Sahara desert sand dunes at night, star-filled sky with Milky Way visible, golden sand ripples, minimalist composition, vast emptiness, astrophotography, serene and otherworldly, natural curves and textures",
  },
  {
    title: "Forest Stream",
    description: "Crystal clear stream through ancient forest",
    imageSrc: "https://picsum.photos/400/400?random=17",
    style: "Peaceful",
    category: "Landscapes",
    prompt: "Crystal clear forest stream, ancient moss-covered trees, dappled sunlight filtering through canopy, smooth river rocks, lush green vegetation, peaceful woodland setting, nature photography, pristine wilderness",
  },
  {
    title: "Northern Lights",
    description: "Aurora borealis dancing over snowy landscape",
    imageSrc: "https://picsum.photos/400/400?random=18",
    style: "Mystical",
    category: "Landscapes",
    prompt: "Aurora borealis dancing across night sky, vibrant green and purple lights, snow-covered landscape below, lone cabin with warm glow, arctic wilderness, astrophotography, magical and ethereal, natural phenomenon",
  },
  {
    title: "Canyon Vista",
    description: "Dramatic red rock canyon formations",
    imageSrc: "https://picsum.photos/400/400?random=19",
    style: "Dramatic",
    category: "Landscapes",
    prompt: "Grand Canyon at sunset, dramatic red rock formations, layered geological history, vast scale, warm golden light on canyon walls, clear blue sky, natural wonder, landscape photography, breathtaking vista",
  },
  {
    title: "Tropical Beach",
    description: "White sand beach with crystal blue water",
    imageSrc: "https://picsum.photos/400/400?random=20",
    style: "Tropical",
    category: "Landscapes",
    prompt: "Tropical paradise beach, pristine white sand, crystal clear turquoise water, palm trees swaying in breeze, blue sky with puffy clouds, perfect weather, vacation destination, tropical photography, idyllic setting",
  },
  {
    title: "Volcanic Landscape",
    description: "Rugged volcanic terrain with lava flows",
    imageSrc: "https://picsum.photos/400/400?random=21",
    style: "Dramatic",
    category: "Landscapes",
    prompt: "Active volcano with glowing lava flows, dramatic volcanic landscape, dark rocky terrain, orange molten lava, smoke and ash, powerful natural forces, geological wonder, extreme environment, raw earth energy",
  },
  {
    title: "Autumn Forest",
    description: "Golden autumn leaves in misty forest",
    imageSrc: "https://picsum.photos/400/400?random=22",
    style: "Seasonal",
    category: "Landscapes",
    prompt: "Autumn forest in peak fall colors, golden and orange leaves, misty morning atmosphere, sunbeams filtering through trees, carpet of fallen leaves, seasonal change, nature photography, warm and cozy feeling",
  },
  {
    title: "Iceberg Field",
    description: "Majestic icebergs floating in arctic waters",
    imageSrc: "https://picsum.photos/400/400?random=23",
    style: "Arctic",
    category: "Landscapes",
    prompt: "Massive icebergs floating in arctic ocean, pristine white and blue ice formations, calm dark water, clear sky, polar landscape, climate and environment, natural sculpture, arctic photography, pristine wilderness",
  },
  {
    title: "Rolling Hills",
    description: "Green rolling hills with scattered clouds",
    imageSrc: "https://picsum.photos/400/400?random=24",
    style: "Pastoral",
    category: "Landscapes",
    prompt: "Rolling green hills in countryside, scattered white clouds casting shadows, pastoral landscape, peaceful rural setting, bright green grass, blue sky, landscape photography, idyllic and serene",
  },

  // Art (12 images)
  {
    title: "Abstract Art",
    description: "Colorful abstract art with flowing shapes and patterns",
    imageSrc: "https://picsum.photos/400/400?random=25",
    style: "Abstract",
    category: "Art",
    prompt: "Abstract expressionist painting, vibrant flowing colors, dynamic brushstrokes, layers of paint, emotional expression through color, modern art, contemporary style, gallery quality, artistic interpretation",
  },
  {
    title: "Digital Portrait",
    description: "Detailed digital art portrait with vibrant colors",
    imageSrc: "https://picsum.photos/400/400?random=26",
    style: "Portrait",
    category: "Art",
    prompt: "Digital art portrait, hyper-realistic detail, vibrant colors, dramatic lighting, artistic interpretation, digital painting technique, character design, modern portrait art, high resolution, professional quality",
  },
  {
    title: "Geometric Patterns",
    description: "Complex geometric patterns and tessellations",
    imageSrc: "https://picsum.photos/400/400?random=27",
    style: "Geometric",
    category: "Art",
    prompt: "Intricate geometric pattern, mathematical precision, tessellating shapes, symmetrical design, modern graphic art, clean lines, vibrant colors, digital art, pattern design, contemporary aesthetic",
  },
  {
    title: "Watercolor Dream",
    description: "Soft watercolor painting with flowing colors",
    imageSrc: "https://picsum.photos/400/400?random=28",
    style: "Watercolor",
    category: "Art",
    prompt: "Dreamy watercolor painting, soft flowing colors, organic shapes, translucent layers, artistic blur, traditional watercolor technique, delicate brushwork, pastel colors, ethereal quality, fine art",
  },
  {
    title: "Oil Painting",
    description: "Classical oil painting with rich textures",
    imageSrc: "https://picsum.photos/400/400?random=29",
    style: "Classical",
    category: "Art",
    prompt: "Classical oil painting, rich impasto texture, traditional technique, warm color palette, masterful brushwork, chiaroscuro lighting, old master style, fine art quality, museum piece, classical realism",
  },
  {
    title: "Pop Art",
    description: "Bold pop art with bright colors and patterns",
    imageSrc: "https://picsum.photos/400/400?random=30",
    style: "Pop Art",
    category: "Art",
    prompt: "Bold pop art design, bright primary colors, graphic style, commercial art influence, Andy Warhol inspired, screen printing aesthetic, contemporary culture, repetitive patterns, modern art movement",
  },
  {
    title: "Surreal Landscape",
    description: "Dreamlike surreal landscape with impossible geometry",
    imageSrc: "https://picsum.photos/400/400?random=31",
    style: "Surreal",
    category: "Art",
    prompt: "Surreal dreamscape, impossible architecture, floating objects, melting clocks, Salvador Dali inspired, dream logic, fantastical elements, artistic imagination, subconscious imagery, surrealism movement",
  },
  {
    title: "Ink Drawing",
    description: "Detailed black and white ink illustration",
    imageSrc: "https://picsum.photos/400/400?random=32",
    style: "Illustration",
    category: "Art",
    prompt: "Detailed ink illustration, intricate linework, black and white, pen and ink technique, crosshatching, fine detail, traditional illustration, artistic craftsmanship, graphic novel style, monochromatic art",
  },
  {
    title: "Stained Glass",
    description: "Beautiful stained glass window design",
    imageSrc: "https://picsum.photos/400/400?random=33",
    style: "Decorative",
    category: "Art",
    prompt: "Ornate stained glass window, colorful glass panels, intricate leading, Gothic cathedral style, religious iconography, light filtering through colored glass, decorative art, medieval craftsmanship, architectural art",
  },
  {
    title: "Graffiti Mural",
    description: "Vibrant street art graffiti mural",
    imageSrc: "https://picsum.photos/400/400?random=34",
    style: "Street Art",
    category: "Art",
    prompt: "Large-scale graffiti mural, vibrant spray paint colors, urban street art, contemporary culture, artistic rebellion, bold graphic style, public art, city wall, underground art scene, expressive freedom",
  },
  {
    title: "Pixel Art",
    description: "Retro pixel art with 8-bit style graphics",
    imageSrc: "https://picsum.photos/400/400?random=35",
    style: "Pixel",
    category: "Art",
    prompt: "Retro pixel art, 8-bit style, nostalgic gaming aesthetic, low resolution charm, digital art, video game inspired, blocky graphics, limited color palette, vintage computing, indie game art",
  },
  {
    title: "Marble Sculpture",
    description: "Classical marble sculpture with fine details",
    imageSrc: "https://picsum.photos/400/400?random=36",
    style: "Sculpture",
    category: "Art",
    prompt: "Classical marble sculpture, Renaissance style, fine carved detail, white Carrara marble, dramatic lighting, museum quality, sculptural mastery, three-dimensional art, timeless beauty, artistic tradition",
  },

  // Interiors (12 images)
  {
    title: "Tech Workspace",
    description: "Modern technology workspace with devices and accessories",
    imageSrc: "https://picsum.photos/400/400?random=37",
    style: "Workspace",
    category: "Interiors",
    prompt: "Modern tech workspace, multiple monitors, sleek desk setup, ergonomic chair, ambient LED lighting, minimalist design, high-end technology, productivity environment, clean organization, contemporary office",
  },
  {
    title: "Cozy Living Room",
    description: "Warm and inviting living room with fireplace",
    imageSrc: "https://picsum.photos/400/400?random=38",
    style: "Cozy",
    category: "Interiors",
    prompt: "Cozy living room with fireplace, comfortable sectional sofa, warm throw blankets, soft ambient lighting, wooden beams, rustic decor, hygge atmosphere, home comfort, inviting space, family gathering area",
  },
  {
    title: "Minimalist Kitchen",
    description: "Clean, minimalist kitchen with marble counters",
    imageSrc: "https://picsum.photos/400/400?random=39",
    style: "Minimalist",
    category: "Interiors",
    prompt: "Minimalist kitchen design, white marble countertops, clean lines, handle-less cabinets, natural light, modern appliances, uncluttered space, Scandinavian influence, functional beauty, architectural photography",
  },
  {
    title: "Luxury Bedroom",
    description: "Elegant bedroom with premium furnishings",
    imageSrc: "https://picsum.photos/400/400?random=40",
    style: "Luxury",
    category: "Interiors",
    prompt: "Luxury master bedroom, king size bed with premium linens, elegant furniture, soft lighting, high-end materials, sophisticated color palette, hotel-quality comfort, interior design excellence, opulent details",
  },
  {
    title: "Home Office",
    description: "Productive home office setup with natural light",
    imageSrc: "https://picsum.photos/400/400?random=41",
    style: "Professional",
    category: "Interiors",
    prompt: "Professional home office, large windows with natural light, wooden desk, built-in bookshelves, ergonomic setup, plants for air quality, productivity-focused design, work from home environment, organized workspace",
  },
  {
    title: "Rustic Cabin",
    description: "Cozy rustic cabin interior with wood beams",
    imageSrc: "https://picsum.photos/400/400?random=42",
    style: "Rustic",
    category: "Interiors",
    prompt: "Rustic log cabin interior, exposed wooden beams, stone fireplace, vintage furniture, warm lighting, cozy textiles, mountain retreat atmosphere, natural materials, traditional craftsmanship, wilderness escape",
  },
  {
    title: "Modern Bathroom",
    description: "Sleek modern bathroom with spa-like features",
    imageSrc: "https://picsum.photos/400/400?random=43",
    style: "Modern",
    category: "Interiors",
    prompt: "Modern spa bathroom, freestanding bathtub, rain shower, natural stone tiles, ambient lighting, luxury fixtures, minimal design, zen atmosphere, high-end finishes, relaxation sanctuary",
  },
  {
    title: "Art Gallery",
    description: "Contemporary art gallery with white walls",
    imageSrc: "https://picsum.photos/400/400?random=44",
    style: "Gallery",
    category: "Interiors",
    prompt: "Contemporary art gallery space, white walls, polished concrete floors, track lighting, curated artwork, minimal design, professional exhibition space, cultural institution, artistic environment, museum quality",
  },
  {
    title: "Industrial Loft",
    description: "Converted industrial loft with exposed brick",
    imageSrc: "https://picsum.photos/400/400?random=45",
    style: "Industrial",
    category: "Interiors",
    prompt: "Industrial loft conversion, exposed brick walls, steel beams, concrete floors, large windows, urban living, raw materials, contemporary furniture, open floor plan, city apartment, architectural character",
  },
  {
    title: "Vintage Library",
    description: "Classic library with floor-to-ceiling bookshelves",
    imageSrc: "https://picsum.photos/400/400?random=46",
    style: "Vintage",
    category: "Interiors",
    prompt: "Classic library with floor-to-ceiling bookshelves, leather-bound books, reading chair with lamp, wooden ladder, vintage atmosphere, scholarly environment, warm lighting, traditional design, literary sanctuary",
  },
  {
    title: "Greenhouse Studio",
    description: "Glass greenhouse converted to art studio",
    imageSrc: "https://picsum.photos/400/400?random=47",
    style: "Natural",
    category: "Interiors",
    prompt: "Artist studio in glass greenhouse, natural light flooding space, plants everywhere, easels and art supplies, creative workspace, botanical environment, inspiring atmosphere, artistic retreat, nature integration",
  },
  {
    title: "Smart Home",
    description: "Futuristic smart home with automated systems",
    imageSrc: "https://picsum.photos/400/400?random=48",
    style: "Futuristic",
    category: "Interiors",
    prompt: "Futuristic smart home interior, automated systems, voice control, LED strip lighting, high-tech appliances, sleek modern design, connected devices, home automation, innovative technology, digital lifestyle",
  },
];
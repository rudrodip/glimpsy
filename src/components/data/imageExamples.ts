// Image examples for the application

// Gallery examples with categories
export const imageExamples = [
  {
    title: "Futuristic City",
    description: "A futuristic city with flying cars and neon lights",
    imageSrc:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000",
    style: "Futuristic",
    category: "Cityscapes",
  },
  {
    title: "Serene Nature",
    description: "Peaceful mountain landscape with a lake reflection",
    imageSrc:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
    style: "Photography",
    category: "Landscapes",
  },
  {
    title: "Abstract Art",
    description: "Colorful abstract art with flowing shapes and patterns",
    imageSrc:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000",
    style: "Abstract",
    category: "Art",
  },
  {
    title: "Tech Workspace",
    description: "Modern technology workspace with devices and accessories",
    imageSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
    style: "Workspace",
    category: "Interiors",
  },
  {
    title: "Ocean Sunset",
    description: "Vibrant sunset over calm ocean waters",
    imageSrc:
      "https://images.unsplash.com/photo-1566024287286-457247b70310?q=80&w=1000",
    style: "Photography",
    category: "Landscapes",
  },
  {
    title: "Digital Portrait",
    description: "Detailed digital art portrait with vibrant colors",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000",
    style: "Portrait",
    category: "Art",
  },
];

// Creative examples with more artistic images
export const creativeExamples = [
  {
    title: "Surreal Fantasy",
    description:
      "A dreamlike landscape with floating islands and magical elements",
    imageSrc:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1000",
    style: "Fantasy",
  },
  {
    title: "Portrait Art",
    description: "Artistic portrait with vibrant colors and lighting effects",
    imageSrc:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000",
    style: "Portrait",
  },
  {
    title: "Food Photography",
    description: "Mouthwatering food arrangement with professional styling",
    imageSrc:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
    style: "Food",
  },
];

// Professional use case examples
export const professionalExamples = [
  {
    title: "Product Mockup",
    description: "Product packaging design mockup for a premium skincare line",
    imageSrc:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000",
    industry: "Design",
  },
  {
    title: "Marketing Campaign",
    description:
      "Social media marketing campaign imagery for a lifestyle brand",
    imageSrc:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000",
    industry: "Marketing",
  },
  {
    title: "Educational Content",
    description: "Visual learning materials for science education",
    imageSrc:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000",
    industry: "Education",
  },
  {
    title: "Real Estate Visualization",
    description: "Interior design visualization for real estate listings",
    imageSrc:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000",
    industry: "Real Estate",
  },
];

// Additional high-quality examples to expand the collection
export const additionalExamples = [
  {
    title: "Urban Architecture",
    description: "Modern skyscrapers with innovative architectural design",
    imageSrc: 
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1000",
    style: "Architecture",
    category: "Cityscapes",
  },
  {
    title: "Desert Landscape",
    description: "Stunning sand dunes with dramatic lighting at sunset",
    imageSrc:
      "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1000",
    style: "Photography",
    category: "Landscapes",
  },
  {
    title: "Minimalist Design",
    description: "Clean minimalist interior with carefully curated elements",
    imageSrc:
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1000",
    style: "Minimal",
    category: "Interiors",
  },
  {
    title: "Watercolor Portrait",
    description: "Artistic portrait with watercolor painting effects",
    imageSrc:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=1000",
    style: "Watercolor",
    category: "Art",
  },
];

// Type definition for image examples
export interface ImageExample {
  title: string;
  description: string;
  imageSrc: string;
  style: string;
  category?: string;
  industry?: string;
}

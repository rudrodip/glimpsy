// Text examples for the application

// Sample prompts for the text generation examples
export const textPrompts = [
  {
    title: "Blog Post",
    prompt: "Write a blog post about sustainable fashion trends in 2025",
    category: "Content Writing",
    output:
      "# Sustainable Fashion in 2025: Where Ethics Meets Innovation\n\nThe fashion industry is undergoing a revolutionary transformation as we step into 2025, with sustainability no longer just a trend but the new standard. Consumers are increasingly making conscious choices, demanding transparency and ethical practices from brands they support.\n\n## Regenerative Materials Leading the Way\n\nIn 2025, we're seeing a significant shift from merely 'less harmful' materials to truly regenerative options. Fabrics made from algae, mycelium (mushroom roots), and agricultural waste are not only biodegradable but actively contribute to carbon sequestration during their production phase...",
  },
  {
    title: "Product Description",
    prompt: "Create a product description for a smart home security system",
    category: "Marketing",
    output:
      "**Introducing the GuardianHub Pro: Intelligent Security for the Modern Home**\n\nTransform your home security with the GuardianHub Pro—a comprehensive, AI-powered security system designed for seamless protection and peace of mind in today's connected world.\n\n🔹 **Adaptive Intelligence**: Our proprietary machine learning algorithms distinguish between normal activity and potential threats, reducing false alarms by 97%.\n\n🔹 **360° Protection**: The system includes 4K Ultra HD cameras with 180° field of view, motion sensors with 30ft range, and advanced door/window sensors—all wirelessly connected to your central hub...",
  },
  {
    title: "Story",
    prompt: "Write a short story about a time traveler in ancient Rome",
    category: "Creative Writing",
    output:
      '# The Historian\'s Watch\n\nDr. Eleanor Reed adjusted her temporal displacement band, the soft blue glow illuminating her face in the pre-dawn darkness. Rome, 79 CE—exactly where and when she needed to be. This wasn\'t like the simulations; the smell of woodsmoke and the distant calls of street vendors were overwhelming after years of sterile laboratory preparations.\n\n"Remember, observe only," her director\'s voice echoed in her memory. "No interaction, no disruption, no traces."\n\nShe pulled her woolen palla tighter around her shoulders and moved toward the forum. As a historian specializing in everyday Roman economics, this field study was the opportunity of a lifetime...',
  },
  {
    title: "Email Campaign",
    prompt: "Write an email announcing a new product launch for a tech company",
    category: "Marketing",
    output:
      "Subject: Introducing Quantum X: The Future of Computing Has Arrived\n\nDear [Name],\n\nToday marks a pivotal moment in tech innovation. We're thrilled to announce the launch of Quantum X, our revolutionary new computing platform that's about to transform how you work, create, and connect.\n\nQuantum X isn't just an incremental improvement—it's a fundamental leap forward. Powered by our proprietary neural processing architecture, it delivers:\n\n• Processing speeds up to 300% faster than conventional systems\n• AI-enhanced workflow optimization that adapts to your unique usage patterns\n• Revolutionary energy efficiency with 70% less power consumption\n• Military-grade security protocols protecting your data at every level\n\nBe among the first to experience the future of computing. For a limited time, early adopters will receive exclusive access to our premium software suite and dedicated support program valued at $499—completely free.\n\nDiscover the Quantum difference today.\n\n[CTA Button: Reserve Your Quantum X]\n\nInnovation never stops,\n\nThe Quantum Team",
  },
  {
    title: "Technical Documentation",
    prompt: "Write API documentation for a user authentication endpoint",
    category: "Technical Writing",
    output:
      "# User Authentication API\n\n## POST /api/auth/login\n\nAuthenticates a user and returns a JWT token for authorized API access.\n\n### Request\n\n```http\nPOST /api/auth/login\nContent-Type: application/json\n\n{\n  \"email\": \"user@example.com\",\n  \"password\": \"password123\"\n}\n```\n\n#### Request Parameters\n\n| Parameter | Type | Required | Description |\n|-----------|------|----------|-------------|\n| email | string | Yes | The user's email address |\n| password | string | Yes | The user's password |\n\n### Response\n\n#### Success (200 OK)\n\n```json\n{\n  \"success\": true,\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\n  \"user\": {\n    \"id\": \"u_12345\",\n    \"email\": \"user@example.com\",\n    \"name\": \"John Doe\"\n  }\n}\n```\n\n#### Error (401 Unauthorized)\n\n```json\n{\n  \"success\": false,\n  \"error\": \"Invalid credentials\"\n}\n```\n\n### Error Codes\n\n| Status Code | Description |\n|-------------|-------------|\n| 400 | Bad Request - Missing required fields |\n| 401 | Unauthorized - Invalid credentials |\n| 429 | Too Many Requests - Rate limit exceeded |",
  },
];

// Type definition for text examples
export interface TextPrompt {
  title: string;
  prompt: string;
  category: string;
  output: string;
}

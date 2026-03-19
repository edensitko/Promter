/**
 * Question Engine
 *
 * Analyzes user input, determines what information is missing,
 * and generates smart follow-up questions with clickable options.
 * After enough data is gathered, triggers prompt generation.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GatheredData {
  /** Raw initial description from the user */
  initialDescription: string;
  /** Website type: landing, dashboard, portfolio, ecommerce, blog, specialized */
  websiteType?: string;
  /** Industry or niche: saas, crypto, restaurant, photography, etc. */
  industry?: string;
  /** Visual style preferences (multiple) */
  visualStyles?: string[];
  /** Color mood: vibrant, muted, monochrome, warm, cool, neon */
  colorMood?: string;
  /** Key sections the user wants */
  sections?: string[];
  /** Animation level: none, subtle, moderate, heavy */
  animationLevel?: string;
  /** Specific animation styles chosen by user */
  animationStyles?: string[];
  /** 3D effects the user wants (multiple) */
  effects3D?: string[];
  /** Special features requested */
  features?: string[];
  /** Target audience description */
  audience?: string;
  /** Any additional context */
  additionalContext?: string;
}

export interface QuestionOption {
  label: string;
  value: string;
  icon?: string;
  description?: string;
}

export interface Question {
  id: string;
  text: string;
  subtext?: string;
  options: QuestionOption[];
  allowMultiple?: boolean;
  allowFreeText?: boolean;
  field: keyof GatheredData;
}

export interface EngineResult {
  /** Whether we have enough data to generate */
  readyToGenerate: boolean;
  /** The next question to ask (if not ready) */
  nextQuestion?: Question;
  /** What fields are already filled */
  filledFields: string[];
  /** Progress 0-100 */
  progress: number;
  /** Best matching preset based on current data */
  suggestedPreset?: string;
}

// ─── Detection helpers ───────────────────────────────────────────────────────

const typeKeywords: Record<string, string[]> = {
  landing: ["landing", "landing page", "homepage", "hero", "marketing", "launch", "product page"],
  dashboard: ["dashboard", "admin", "analytics", "panel", "metrics", "charts", "data", "monitoring", "trading"],
  portfolio: ["portfolio", "showcase", "projects", "personal site", "my work", "cv", "resume"],
  ecommerce: ["ecommerce", "e-commerce", "store", "shop", "sell", "products", "buy", "cart", "checkout", "marketplace"],
  blog: ["blog", "articles", "posts", "writing", "magazine", "news", "content site"],
  specialized: ["restaurant", "gaming", "game", "food", "menu", "esports"],
};

const industryKeywords: Record<string, string[]> = {
  saas: ["saas", "software", "app", "tool", "platform", "b2b", "subscription"],
  crypto: ["crypto", "bitcoin", "trading", "defi", "blockchain", "web3", "ethereum", "token", "coin"],
  ai: ["ai", "artificial intelligence", "machine learning", "ml", "gpt", "neural", "automation"],
  restaurant: ["restaurant", "food", "dining", "cafe", "bar", "bistro", "menu", "reservation"],
  photography: ["photography", "photographer", "photos", "images", "gallery", "visual"],
  gaming: ["gaming", "game", "esports", "play", "gamer", "stream"],
  agency: ["agency", "studio", "creative", "design agency", "marketing agency"],
  developer: ["developer", "programmer", "engineer", "coder", "dev", "code", "github"],
  startup: ["startup", "tech company", "new venture", "mvp"],
  nft: ["nft", "collectible", "digital art", "mint", "opensea"],
  consulting: ["consultant", "freelance", "freelancer", "advisory", "coaching"],
  fitness: ["fitness", "gym", "workout", "health", "wellness", "training"],
  education: ["education", "course", "learn", "tutorial", "school", "academy"],
  finance: ["finance", "fintech", "banking", "investment", "money", "payment"],
  travel: ["travel", "tourism", "hotel", "booking", "destination"],
  music: ["music", "band", "artist", "album", "songs", "dj"],
  realestate: ["real estate", "property", "housing", "apartment", "rental"],
};

const styleKeywords: Record<string, string[]> = {
  dark: ["dark", "dark mode", "dark theme", "night", "black"],
  modern: ["modern", "clean", "sleek", "contemporary", "fresh"],
  minimal: ["minimal", "minimalist", "simple", "stripped", "bare"],
  futuristic: ["futuristic", "sci-fi", "cyberpunk", "neon", "tech"],
  glassmorphism: ["glass", "glassmorphism", "frosted", "translucent", "blur"],
  gradient: ["gradient", "colorful", "vibrant colors", "mesh gradient"],
  brutalist: ["brutalist", "raw", "unconventional", "experimental", "bold"],
  retro: ["retro", "vintage", "nostalgic", "80s", "90s", "old school"],
  neumorphism: ["neumorphism", "soft", "extruded", "3d buttons"],
};

const colorKeywords: Record<string, string[]> = {
  vibrant: ["vibrant", "bright", "bold colors", "vivid", "electric", "neon"],
  muted: ["muted", "pastel", "soft colors", "subtle", "gentle"],
  monochrome: ["monochrome", "black and white", "greyscale", "one color"],
  warm: ["warm", "orange", "red", "golden", "amber", "sunset"],
  cool: ["cool", "blue", "teal", "cyan", "ice", "ocean"],
  neon: ["neon", "glow", "fluorescent", "electric"],
  earthy: ["earthy", "natural", "green", "brown", "organic"],
  professional: ["professional", "corporate", "blue", "navy", "grey"],
};

const featureKeywords: Record<string, string[]> = {
  authentication: ["auth", "login", "signup", "register", "sign in", "account"],
  search: ["search", "filter", "find", "query"],
  charts: ["charts", "graphs", "visualizations", "data viz", "analytics"],
  forms: ["form", "contact", "input", "submission"],
  gallery: ["gallery", "images", "photos", "lightbox", "masonry"],
  pricing: ["pricing", "plans", "subscription", "tiers"],
  cart: ["cart", "checkout", "payment", "buy", "purchase"],
  realtime: ["real-time", "realtime", "live", "streaming", "websocket"],
  map: ["map", "location", "geolocation", "globe"],
  chat: ["chat", "messaging", "communication"],
  notifications: ["notifications", "alerts", "toast", "badge"],
  darkmode: ["dark mode", "theme toggle", "light/dark", "theme switch"],
};

function detectFromInput(input: string, keywords: Record<string, string[]>): string | undefined {
  const lower = input.toLowerCase();
  let bestMatch: string | undefined;
  let bestScore = 0;

  for (const [key, words] of Object.entries(keywords)) {
    let score = 0;
    for (const word of words) {
      if (lower.includes(word)) {
        score += word.split(" ").length; // multi-word matches score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = key;
    }
  }

  return bestScore > 0 ? bestMatch : undefined;
}

function detectMultipleFromInput(input: string, keywords: Record<string, string[]>): string[] {
  const lower = input.toLowerCase();
  const matches: string[] = [];

  for (const [key, words] of Object.entries(keywords)) {
    for (const word of words) {
      if (lower.includes(word)) {
        matches.push(key);
        break;
      }
    }
  }

  return matches;
}

// ─── Initial analysis ────────────────────────────────────────────────────────

export function analyzeInitialInput(input: string): GatheredData {
  const data: GatheredData = { initialDescription: input };

  data.websiteType = detectFromInput(input, typeKeywords);
  data.industry = detectFromInput(input, industryKeywords);

  // Detect multiple visual styles
  const detectedStyles = detectMultipleFromInput(input, styleKeywords);
  if (detectedStyles.length > 0) data.visualStyles = detectedStyles;

  data.colorMood = detectFromInput(input, colorKeywords);

  const detectedFeatures = detectMultipleFromInput(input, featureKeywords);
  if (detectedFeatures.length > 0) data.features = detectedFeatures;

  // Detect animation desires
  const lower = input.toLowerCase();
  if (lower.includes("no animation") || lower.includes("static") || lower.includes("no motion")) {
    data.animationLevel = "none";
  } else if (lower.includes("heavy animation") || lower.includes("lots of animation") || lower.includes("very animated")) {
    data.animationLevel = "heavy";
  } else if (lower.includes("animation") || lower.includes("animated") || lower.includes("motion")) {
    data.animationLevel = "moderate";
  }

  // Detect 3D
  if (lower.includes("no 3d") || lower.includes("flat") || lower.includes("2d only")) {
    // No 3D
  } else if (lower.includes("3d") || lower.includes("three-dimensional") || lower.includes("immersive") || lower.includes("globe") || lower.includes("webgl")) {
    data.effects3D = ["3d-hero"]; // default 3D, will refine in question
  }

  return data;
}

// ─── Questions ───────────────────────────────────────────────────────────────

const questions: Question[] = [
  {
    id: "websiteType",
    text: "What type of website are you building?",
    subtext: "This determines the overall layout and structure.",
    field: "websiteType",
    options: [
      { label: "Landing Page", value: "landing", icon: "🚀", description: "Marketing or product page" },
      { label: "Dashboard", value: "dashboard", icon: "📊", description: "Analytics, admin panel" },
      { label: "Portfolio", value: "portfolio", icon: "🎨", description: "Showcase your work" },
      { label: "E-Commerce", value: "ecommerce", icon: "🛒", description: "Online store" },
      { label: "Blog", value: "blog", icon: "📝", description: "Articles and content" },
      { label: "Other", value: "specialized", icon: "⚡", description: "Restaurant, gaming, etc." },
    ],
  },
  {
    id: "industry",
    text: "What industry or niche is this for?",
    subtext: "Helps me pick the perfect preset and tailor the content structure.",
    field: "industry",
    allowFreeText: true,
    options: [
      { label: "SaaS / Software", value: "saas", icon: "💻" },
      { label: "Crypto / Web3", value: "crypto", icon: "₿" },
      { label: "AI / Tech", value: "ai", icon: "🤖" },
      { label: "Agency / Studio", value: "agency", icon: "🎯" },
      { label: "Photography", value: "photography", icon: "📷" },
      { label: "Restaurant / Food", value: "restaurant", icon: "🍽️" },
      { label: "Developer / Engineer", value: "developer", icon: "👨‍💻" },
      { label: "Gaming", value: "gaming", icon: "🎮" },
      { label: "Finance / Fintech", value: "finance", icon: "💰" },
      { label: "Education", value: "education", icon: "📚" },
      { label: "Startup", value: "startup", icon: "🚀" },
      { label: "NFT / Digital Art", value: "nft", icon: "🖼️" },
    ],
  },
  {
    id: "visualStyles",
    text: "What visual styles do you like? Pick multiple!",
    subtext: "Select 2-3 styles to blend together for a unique look.",
    field: "visualStyles",
    allowMultiple: true,
    options: [
      { label: "Dark & Sleek", value: "dark", icon: "🌙", description: "Dark backgrounds, vibrant accents" },
      { label: "Modern & Clean", value: "modern", icon: "✨", description: "Contemporary, professional" },
      { label: "Minimal", value: "minimal", icon: "◻️", description: "Less is more, whitespace-heavy" },
      { label: "Glassmorphism", value: "glassmorphism", icon: "🪟", description: "Frosted glass, blur effects" },
      { label: "Futuristic", value: "futuristic", icon: "🔮", description: "Sci-fi, neon, techy" },
      { label: "Gradient & Colorful", value: "gradient", icon: "🌈", description: "Bold gradients, vibrant" },
      { label: "Aurora", value: "aurora", icon: "🌌", description: "Northern lights, ethereal" },
      { label: "Cyberpunk", value: "cyberpunk", icon: "⚡", description: "Neon, glitch, scanlines" },
      { label: "Claymorphism", value: "claymorphism", icon: "🧸", description: "Soft 3D, pastel, playful" },
      { label: "Brutalist", value: "brutalist", icon: "🔲", description: "Raw, experimental, bold" },
      { label: "Retro / Vintage", value: "retro", icon: "📺", description: "Nostalgic, classic feel" },
      { label: "Art Deco", value: "art-deco", icon: "🏛️", description: "1920s luxury, gold accents" },
    ],
  },
  {
    id: "colorMood",
    text: "What color mood fits your brand?",
    subtext: "Defines the palette and emotional tone.",
    field: "colorMood",
    options: [
      { label: "Vibrant & Electric", value: "vibrant", icon: "⚡", description: "Bold, energetic, attention-grabbing" },
      { label: "Muted & Soft", value: "muted", icon: "🌸", description: "Pastel, gentle, calming" },
      { label: "Monochrome", value: "monochrome", icon: "⬛", description: "Black/white, single accent" },
      { label: "Warm Tones", value: "warm", icon: "🔥", description: "Orange, red, amber, golden" },
      { label: "Cool Tones", value: "cool", icon: "🧊", description: "Blue, teal, cyan" },
      { label: "Neon Glow", value: "neon", icon: "💜", description: "Fluorescent, glowing, electric" },
      { label: "Earthy & Natural", value: "earthy", icon: "🌿", description: "Green, brown, organic" },
      { label: "Professional", value: "professional", icon: "👔", description: "Corporate blue, navy, grey" },
    ],
  },
  {
    id: "sections",
    text: "What key sections should the site include?",
    subtext: "Select all that apply — I'll structure the layout around these.",
    field: "sections",
    allowMultiple: true,
    options: [
      { label: "Hero / Banner", value: "hero" },
      { label: "Features Grid", value: "features" },
      { label: "Pricing Table", value: "pricing" },
      { label: "Testimonials", value: "testimonials" },
      { label: "Image Gallery", value: "gallery" },
      { label: "Contact Form", value: "contact" },
      { label: "Charts / Data Viz", value: "charts" },
      { label: "Data Table", value: "table" },
      { label: "Blog / Articles", value: "blog" },
      { label: "Product Cards", value: "products" },
      { label: "Team Section", value: "team" },
      { label: "FAQ", value: "faq" },
      { label: "Stats / Metrics", value: "stats" },
      { label: "CTA Banner", value: "cta" },
      { label: "Navigation Sidebar", value: "sidebar" },
      { label: "Footer", value: "footer" },
    ],
  },
  {
    id: "animationLevel",
    text: "How much animation do you want?",
    subtext: "Controls motion and micro-interactions throughout the site.",
    field: "animationLevel",
    options: [
      { label: "None / Static", value: "none", icon: "⏸️", description: "Clean and simple, no motion" },
      { label: "Subtle", value: "subtle", icon: "🌊", description: "Gentle fades, soft hover effects" },
      { label: "Moderate", value: "moderate", icon: "✨", description: "Scroll reveals, hover lifts, transitions" },
      { label: "Heavy / Immersive", value: "heavy", icon: "🎆", description: "Page transitions, animated cards, text effects" },
    ],
  },
  {
    id: "animationStyles",
    text: "Which animation types do you want? Pick multiple!",
    subtext: "Select the specific animations to include in your site.",
    field: "animationStyles",
    allowMultiple: true,
    options: [
      { label: "Scroll Animations", value: "scroll-animations", icon: "📜", description: "Reveal on scroll" },
      { label: "Hover Effects", value: "hover-effects", icon: "👆", description: "Interactive hover states" },
      { label: "Text Animations", value: "text-animations", icon: "✍️", description: "Typing, splitting, morphing" },
      { label: "Page Transitions", value: "page-transitions", icon: "🔄", description: "Smooth page-to-page" },
      { label: "Animated Cards", value: "animated-cards", icon: "🃏", description: "Flip, tilt, depth effects" },
      { label: "Micro-interactions", value: "microinteractions", icon: "💫", description: "Toggle, like, toast, ripple" },
      { label: "Stagger Animations", value: "stagger-animations", icon: "📊", description: "Cascading grid/list reveals" },
      { label: "Cursor Effects", value: "cursor-effects", icon: "🎯", description: "Custom cursor, spotlight" },
      { label: "Particle Effects", value: "particle-effects", icon: "✨", description: "Confetti, floating, connections" },
      { label: "Liquid Animations", value: "liquid-animations", icon: "💧", description: "Wave fills, blob morphing" },
      { label: "Morphing Animations", value: "morphing-animations", icon: "🔀", description: "SVG morph, shape shifting" },
      { label: "Animated Buttons", value: "animated-buttons", icon: "🔘", description: "Magnetic, ripple, morph" },
      { label: "Loading Animations", value: "loading-animations", icon: "⏳", description: "Skeletons, spinners, progress" },
    ],
  },
  {
    id: "effects3D",
    text: "Want 3D effects? Pick multiple!",
    subtext: "Add depth and immersion — select all that fit your vision.",
    field: "effects3D",
    allowMultiple: true,
    options: [
      { label: "No 3D", value: "none", icon: "📄", description: "Keep it flat and fast" },
      { label: "3D Cards", value: "3d-card", icon: "🃏", description: "Cards with depth and tilt" },
      { label: "3D Background", value: "3d-background", icon: "🌌", description: "Immersive particle/mesh" },
      { label: "3D Globe", value: "3d-globe", icon: "🌐", description: "Interactive globe with arcs" },
      { label: "3D Particles", value: "3d-particles", icon: "⚛️", description: "Galaxy, DNA helix, neural net" },
      { label: "3D Morphing", value: "3d-morphing", icon: "🫧", description: "Shape morphing, liquid metal" },
      { label: "3D Room", value: "3d-room", icon: "🏠", description: "Interactive 3D space" },
    ],
  },
  {
    id: "features",
    text: "Any special features you need?",
    subtext: "Select all that apply — these will be included in the prompt.",
    field: "features",
    allowMultiple: true,
    allowFreeText: true,
    options: [
      { label: "Authentication", value: "authentication" },
      { label: "Search & Filter", value: "search" },
      { label: "Charts & Graphs", value: "charts" },
      { label: "Real-time Data", value: "realtime" },
      { label: "Dark Mode Toggle", value: "darkmode" },
      { label: "Shopping Cart", value: "cart" },
      { label: "Map / Globe", value: "map" },
      { label: "Notifications", value: "notifications" },
      { label: "Forms / Contact", value: "forms" },
      { label: "Image Gallery", value: "gallery" },
      { label: "Chat / Messaging", value: "chat" },
      { label: "Responsive / Mobile", value: "responsive" },
    ],
  },
  {
    id: "audience",
    text: "Who is the target audience?",
    subtext: "Helps tailor the tone, complexity, and content focus.",
    field: "audience",
    allowFreeText: true,
    options: [
      { label: "Developers", value: "developers", icon: "👨‍💻" },
      { label: "Business / Enterprise", value: "business", icon: "🏢" },
      { label: "Consumers / General", value: "consumers", icon: "👥" },
      { label: "Designers / Creatives", value: "creatives", icon: "🎨" },
      { label: "Traders / Finance", value: "traders", icon: "📈" },
      { label: "Students / Learners", value: "students", icon: "🎓" },
    ],
  },
];

// ─── Determine next question ─────────────────────────────────────────────────

/** Priority order of fields to fill. We skip questions already answered. */
const questionPriority = [
  "websiteType",
  "industry",
  "visualStyles",
  "colorMood",
  "animationLevel",
  "animationStyles",
  "effects3D",
  "sections",
  "features",
  "audience",
];

/** Required fields — once these are filled we can generate */
const requiredFields = ["websiteType", "industry", "visualStyles", "animationLevel"];

/** Fields that are nice to have but not required */
const optionalFields = ["colorMood", "animationStyles", "effects3D", "sections", "features", "audience"];

function isFieldFilled(data: GatheredData, field: string): boolean {
  const val = data[field as keyof GatheredData];
  if (val === undefined || val === null) return false;
  if (typeof val === "string" && val.trim() === "") return false;
  // Empty arrays count as filled for effects3D (means user chose "no 3D")
  if (Array.isArray(val) && val.length === 0 && field !== "effects3D") return false;
  return true;
}

export function getNextQuestion(data: GatheredData): EngineResult {
  const filledFields = questionPriority.filter((f) => isFieldFilled(data, f));
  const requiredFilled = requiredFields.filter((f) => isFieldFilled(data, f));
  const totalFields = requiredFields.length + optionalFields.length;
  const progress = Math.min(100, Math.round((filledFields.length / totalFields) * 100));

  // We're ready if all required fields are filled and at least 1 optional
  const optionalFilled = optionalFields.filter((f) => isFieldFilled(data, f));
  const readyToGenerate = requiredFilled.length >= requiredFields.length && optionalFilled.length >= 1;

  // Find suggested preset
  const suggestedPreset = suggestPreset(data);

  if (readyToGenerate) {
    return { readyToGenerate: true, filledFields, progress: 100, suggestedPreset };
  }

  // Find the next unfilled question in priority order
  for (const fieldId of questionPriority) {
    // Skip animationStyles if user said no animations
    if (fieldId === "animationStyles" && data.animationLevel === "none") continue;

    if (!isFieldFilled(data, fieldId)) {
      const question = questions.find((q) => q.id === fieldId);
      if (question) {
        // Filter options contextually
        const filteredQuestion = filterQuestionOptions(question, data);
        return {
          readyToGenerate: false,
          nextQuestion: filteredQuestion,
          filledFields,
          progress,
          suggestedPreset,
        };
      }
    }
  }

  // All fields filled
  return { readyToGenerate: true, filledFields, progress: 100, suggestedPreset };
}

// ─── Context-aware option filtering ──────────────────────────────────────────

function filterQuestionOptions(question: Question, data: GatheredData): Question {
  let filtered = { ...question, options: [...question.options] };

  // If industry is restaurant and asking about type, highlight specialized
  if (question.id === "sections") {
    // Show relevant sections based on website type
    if (data.websiteType === "dashboard") {
      filtered.options = filtered.options.filter((o) =>
        ["charts", "table", "stats", "sidebar", "footer", "cta", "hero"].includes(o.value)
      );
    } else if (data.websiteType === "ecommerce") {
      filtered.options = filtered.options.filter((o) =>
        ["hero", "products", "gallery", "pricing", "testimonials", "faq", "contact", "footer", "cta"].includes(o.value)
      );
    } else if (data.websiteType === "blog") {
      filtered.options = filtered.options.filter((o) =>
        ["hero", "blog", "features", "contact", "faq", "footer", "cta", "sidebar"].includes(o.value)
      );
    }
  }

  // If website is dashboard, suggest 3D globe more prominently
  if (question.id === "effects3D" && data.websiteType === "dashboard") {
    const reordered = filtered.options.filter((o) => o.value === "none" || o.value === "3d-globe");
    const rest = filtered.options.filter((o) => o.value !== "none" && o.value !== "3d-globe");
    filtered.options = [...reordered, ...rest];
  }

  // If animation level is "none", skip the animation styles question
  if (question.id === "animationStyles" && data.animationLevel === "none") {
    return { ...filtered, options: [] };
  }

  return filtered;
}

// ─── Preset suggestion ───────────────────────────────────────────────────────

const presetMapping: Record<string, Record<string, string>> = {
  landing: {
    saas: "saas-landing",
    startup: "startup-landing",
    agency: "agency-website",
    consulting: "consultant-website",
    default: "startup-landing",
  },
  dashboard: {
    crypto: "crypto-dashboard",
    ai: "ai-dashboard",
    finance: "crypto-dashboard",
    default: "ai-dashboard",
  },
  portfolio: {
    photography: "photography-portfolio",
    developer: "developer-portfolio",
    default: "developer-portfolio",
  },
  ecommerce: {
    nft: "nft-marketplace",
    crypto: "nft-marketplace",
    default: "ecommerce-modern",
  },
  blog: {
    default: "tech-blog",
  },
  specialized: {
    restaurant: "restaurant-website",
    gaming: "gaming-website",
    default: "gaming-website",
  },
};

function suggestPreset(data: GatheredData): string | undefined {
  const type = data.websiteType;
  if (!type) return undefined;

  const typeMap = presetMapping[type];
  if (!typeMap) return undefined;

  if (data.industry && typeMap[data.industry]) {
    return typeMap[data.industry];
  }

  // Try to cross-match industry to another type's preset
  for (const [, map] of Object.entries(presetMapping)) {
    if (data.industry && map[data.industry]) {
      return map[data.industry];
    }
  }

  return typeMap.default;
}

// ─── Process user answer ─────────────────────────────────────────────────────

export function processAnswer(
  data: GatheredData,
  questionId: string,
  answer: string | string[]
): GatheredData {
  const updated = { ...data };

  switch (questionId) {
    case "websiteType":
      updated.websiteType = answer as string;
      break;
    case "industry":
      updated.industry = answer as string;
      break;
    case "visualStyles":
      updated.visualStyles = Array.isArray(answer) ? answer : [answer];
      break;
    case "colorMood":
      updated.colorMood = answer as string;
      break;
    case "sections":
      updated.sections = Array.isArray(answer) ? answer : [answer];
      break;
    case "animationLevel":
      updated.animationLevel = answer as string;
      break;
    case "animationStyles":
      updated.animationStyles = Array.isArray(answer) ? answer : [answer];
      break;
    case "effects3D": {
      const vals = Array.isArray(answer) ? answer : [answer];
      if (vals.length === 1 && vals[0] === "none") {
        updated.effects3D = [];
      } else {
        updated.effects3D = vals.filter((v) => v !== "none");
      }
      break;
    }
    case "features":
      updated.features = Array.isArray(answer) ? answer : [answer];
      break;
    case "audience":
      updated.audience = answer as string;
      break;
    default:
      break;
  }

  return updated;
}

// ─── Build summary of gathered data ──────────────────────────────────────────

export function buildGatheringSummary(data: GatheredData): string {
  const parts: string[] = [];

  if (data.websiteType) parts.push(`**Type:** ${capitalize(data.websiteType)}`);
  if (data.industry) parts.push(`**Industry:** ${capitalize(data.industry)}`);
  if (data.visualStyles?.length) parts.push(`**Styles:** ${data.visualStyles.map(capitalize).join(", ")}`);
  if (data.colorMood) parts.push(`**Colors:** ${capitalize(data.colorMood)}`);
  if (data.animationLevel) parts.push(`**Animation Level:** ${capitalize(data.animationLevel)}`);
  if (data.animationStyles?.length) parts.push(`**Animations:** ${data.animationStyles.map(capitalize).join(", ")}`);
  if (data.effects3D !== undefined) parts.push(`**3D Effects:** ${data.effects3D.length > 0 ? data.effects3D.map(capitalize).join(", ") : "None"}`);
  if (data.sections?.length) parts.push(`**Sections:** ${data.sections.map(capitalize).join(", ")}`);
  if (data.features?.length) parts.push(`**Features:** ${data.features.map(capitalize).join(", ")}`);
  if (data.audience) parts.push(`**Audience:** ${capitalize(data.audience)}`);

  return parts.join("\n");
}

function capitalize(s: string): string {
  return s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Build customization context for prompt generator ────────────────────────

export interface PromptCustomization {
  presetId: string;
  preferredUiStyles?: string[];
  preferredAnimations?: string[];
  preferred3DEffects?: string[];
  extraContext: string;
}

export function buildPromptCustomization(data: GatheredData): PromptCustomization {
  const presetId = suggestPreset(data) || "startup-landing";

  // Map visual styles (multiple)
  const preferredUiStyles = data.visualStyles;

  // Combine animation level defaults with specific animation picks
  let preferredAnimations: string[] | undefined;
  if (data.animationStyles?.length) {
    // User picked specific animations
    preferredAnimations = data.animationStyles;
  } else {
    // Fall back to level-based defaults
    switch (data.animationLevel) {
      case "none":
        preferredAnimations = [];
        break;
      case "subtle":
        preferredAnimations = ["hover-effects"];
        break;
      case "moderate":
        preferredAnimations = ["scroll-animations", "hover-effects"];
        break;
      case "heavy":
        preferredAnimations = ["scroll-animations", "hover-effects", "animated-cards", "text-animations", "page-transitions"];
        break;
    }
  }

  // 3D effects (multiple)
  const preferred3DEffects = data.effects3D?.length ? data.effects3D : undefined;

  // Build extra context string from gathered data
  const contextParts: string[] = [];

  if (data.initialDescription) {
    contextParts.push(`User's original request: "${data.initialDescription}"`);
  }
  if (data.industry) {
    contextParts.push(`Industry/Niche: ${capitalize(data.industry)}`);
  }
  if (data.visualStyles?.length) {
    contextParts.push(`Visual styles: ${data.visualStyles.map(capitalize).join(", ")} — blend these styles together`);
  }
  if (data.colorMood) {
    contextParts.push(`Color mood: ${capitalize(data.colorMood)} — design the palette around this mood`);
  }
  if (data.animationStyles?.length) {
    contextParts.push(`Animation types: ${data.animationStyles.map(capitalize).join(", ")}`);
  }
  if (data.effects3D?.length) {
    contextParts.push(`3D effects: ${data.effects3D.map(capitalize).join(", ")}`);
  }
  if (data.sections?.length) {
    contextParts.push(`Required sections: ${data.sections.map(capitalize).join(", ")}`);
  }
  if (data.features?.length) {
    contextParts.push(`Special features to include: ${data.features.map(capitalize).join(", ")}`);
  }
  if (data.audience) {
    contextParts.push(`Target audience: ${capitalize(data.audience)} — tailor complexity, tone, and content for this audience`);
  }
  if (data.additionalContext) {
    contextParts.push(`Additional notes: ${data.additionalContext}`);
  }

  return {
    presetId,
    preferredUiStyles,
    preferredAnimations,
    preferred3DEffects,
    extraContext: contextParts.join("\n"),
  };
}

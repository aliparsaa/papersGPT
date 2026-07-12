// ─── Types ───────────────────────────────────────────────────────────────────

export type BrandTone = 'formal' | 'clinical' | 'premium' | 'minimal' | 'friendly';
export type KeywordIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';

export interface InternalLinkTarget {
  title: string;
  url: string;
  type: 'product' | 'category' | 'guide' | 'landing';
}

export interface KeywordConfig {
  keyword: string;
  intent: KeywordIntent;
  priority: 'high' | 'medium' | 'low';
  cluster: string;
  productRef?: string;
}

export interface GenerationConfig {
  postsPerBuild: number;
  freshnessDays: number;
  allowOverwrite: boolean;
  minWords: number;
}

export interface ProjectConfig {
  projectId: string;
  siteUrl: string;
  brandName: string;
  brandTone: BrandTone;
  primaryCategory: string;
  authorName: string;
  authorUrl?: string;
  internalLinkTargets: InternalLinkTarget[];
  keywords: KeywordConfig[];
  generation: GenerationConfig;
}

// ─── Project: lift-thread-store ──────────────────────────────────────────────

const DoctoraramisStore: ProjectConfig = {
  projectId: 'lift-thread-store',
  siteUrl: 'https://Doctoraramis.ir',
  brandName: 'استایژن',
  brandTone: 'clinical',
  primaryCategory: 'نخ لیفت صورت و بدن',
  authorName: 'تیم محتوای لیفت‌ترد',
  authorUrl: 'https://Doctoraramis.ir/about',
  internalLinkTargets: [
    { title: 'فروشگاه نخ لیفت', url: 'https://Doctoraramis.ir/products', type: 'product' },
    { title: 'درباره لیفت استایژن', url: 'https://Doctoraramis.ir/contactus', type: 'landing' },
    { title: 'تماس با ما', url: 'https://Doctoraramis.ir/contact', type: 'landing' },
    { title: 'مقالات نخ لیفت', url: 'https://Doctoraramis.ir/blog/', type: 'category' },
    { title: 'راهنمای خرید نخ لیفت', url: 'https://Doctoraramis.ir/blog/', type: 'guide' },
    { title: 'نخ لیفت صورت', url: 'https://Doctoraramis.ir/products/', type: 'category' },
    { title: 'نخ لیفت بدن', url: 'https://Doctoraramis.ir/products/', type: 'category' },
  ],
  keywords: [
    // PDO Threads cluster
    { keyword: 'نخ پی‌دی‌او', intent: 'informational', priority: 'high', cluster: 'pdo' },
    { keyword: 'نخ PDO', intent: 'informational', priority: 'high', cluster: 'pdo' },
    { keyword: 'قیمت نخ پی‌دی‌او', intent: 'commercial', priority: 'high', cluster: 'pdo' },
    { keyword: 'نخ پی‌دی‌او اصل', intent: 'transactional', priority: 'high', cluster: 'pdo' },
    { keyword: 'نحوه استفاده از نخ پی‌دی‌او', intent: 'informational', priority: 'medium', cluster: 'pdo' },

    // COG Threads cluster
    { keyword: 'نخ کاگ', intent: 'informational', priority: 'high', cluster: 'cog' },
    { keyword: 'نخ COG', intent: 'informational', priority: 'high', cluster: 'cog' },
    { keyword: 'قیمت نخ کاگ', intent: 'commercial', priority: 'high', cluster: 'cog' },
    { keyword: 'تفاوت نخ کاگ و پی‌دی‌او', intent: 'informational', priority: 'high', cluster: 'comparison' },

    // Mono Threads cluster
    { keyword: 'نخ مونو', intent: 'informational', priority: 'medium', cluster: 'mono' },
    { keyword: 'نخ مونو صورت', intent: 'informational', priority: 'medium', cluster: 'mono' },
    { keyword: 'قیمت نخ مونو', intent: 'commercial', priority: 'medium', cluster: 'mono' },

    // Before/After cluster
    { keyword: 'نخ لیفت قبل و بعد', intent: 'informational', priority: 'high', cluster: 'results' },
    { keyword: 'عکس قبل و بعد نخ لیفت صورت', intent: 'informational', priority: 'high', cluster: 'results' },
    { keyword: 'نتیجه نخ لیفت', intent: 'informational', priority: 'medium', cluster: 'results' },

    // Safety & Side Effects cluster
    { keyword: 'عوارض نخ لیفت', intent: 'informational', priority: 'high', cluster: 'safety' },
    { keyword: 'خطرات نخ لیفت صورت', intent: 'informational', priority: 'high', cluster: 'safety' },
    { keyword: 'آیا نخ لیفت خطرناک است', intent: 'informational', priority: 'medium', cluster: 'safety' },

    // Training & Education
    { keyword: 'آموزش نخ لیفت', intent: 'informational', priority: 'medium', cluster: 'training' },
    { keyword: 'دوره آموزش نخ لیفت صورت', intent: 'commercial', priority: 'medium', cluster: 'training' },

    // Body Areas
    { keyword: 'نخ لیفت بینی', intent: 'informational', priority: 'high', cluster: 'body-areas' },
    { keyword: 'نخ لیفت ابرو', intent: 'informational', priority: 'high', cluster: 'body-areas' },
    { keyword: 'نخ لیفت فک', intent: 'informational', priority: 'high', cluster: 'body-areas' },
    { keyword: 'نخ لیفت گردن', intent: 'informational', priority: 'medium', cluster: 'body-areas' },
    { keyword: 'نخ لیفت سینه', intent: 'informational', priority: 'low', cluster: 'body-areas' },
    { keyword: 'نخ لیفت شکم', intent: 'informational', priority: 'low', cluster: 'body-areas' },

    // Pricing & Buying
    { keyword: 'قیمت نخ لیفت صورت', intent: 'commercial', priority: 'high', cluster: 'pricing' },
    { keyword: 'خرید نخ لیفت', intent: 'transactional', priority: 'high', cluster: 'pricing' },
    { keyword: 'ارزان‌ترین نخ لیفت', intent: 'commercial', priority: 'medium', cluster: 'pricing' },

    // Aftercare cluster
    { keyword: 'مراقبت بعد از نخ لیفت', intent: 'informational', priority: 'high', cluster: 'aftercare' },
    { keyword: 'عوارض بعد از نخ لیفت', intent: 'informational', priority: 'high', cluster: 'aftercare' },
    { keyword: 'شستن صورت بعد از نخ لیفت', intent: 'informational', priority: 'medium', cluster: 'aftercare' },

    // Duration & Results
    { keyword: 'ماندگاری نخ لیفت', intent: 'informational', priority: 'high', cluster: 'duration' },
    { keyword: 'نخ لیفت چند روز جواب می‌دهد', intent: 'informational', priority: 'medium', cluster: 'duration' },

    // Pain cluster
    { keyword: 'درد نخ لیفت', intent: 'informational', priority: 'medium', cluster: 'pain' },
    { keyword: 'آیا نخ لیفت درد دارد', intent: 'informational', priority: 'medium', cluster: 'pain' },

    // Brands Comparison
    { keyword: 'بهترین مارک نخ لیفت', intent: 'commercial', priority: 'high', cluster: 'brands' },
    { keyword: 'مقایسه برندهای نخ لیفت', intent: 'informational', priority: 'high', cluster: 'brands' },
    { keyword: 'نخ لیفت کره‌ای', intent: 'commercial', priority: 'medium', cluster: 'brands' },

    // Clinic
    { keyword: 'بهترین کلینیک نخ لیفت', intent: 'navigational', priority: 'medium', cluster: 'clinic' },
    { keyword: 'نخ لیفت در تهران', intent: 'navigational', priority: 'medium', cluster: 'clinic' },
  ],
  generation: {
    postsPerBuild: 20,
    freshnessDays: 30,
    allowOverwrite: false,
    minWords: 1200,
  },
};

// ─── Project: steigen-brand ──────────────────────────────────────────────────

const steigenBrand: ProjectConfig = {
  projectId: 'steigen-brand',
  siteUrl: 'https://steigen.ir',
  brandName: 'استایژن',
  brandTone: 'premium',
  primaryCategory: 'محصولات مراقبت از پوست و مو',
  authorName: 'تیم تحریریه استایژن',
  authorUrl: 'https://steigen.ir/about',
  internalLinkTargets: [
    { title: 'فروشگاه استایژن', url: 'https://steigen.ir/products', type: 'product' },
    { title: 'درباره استایژن', url: 'https://steigen.ir/about', type: 'landing' },
    { title: 'تماس با ما', url: 'https://steigen.ir/contactus', type: 'landing' },
    { title: 'مقالات مراقبت پوست', url: 'https://steigen.ir/blog/', type: 'category' },
    { title: 'راهنمای روتین پوست', url: 'https://steigen.ir/articles', type: 'guide' },
    { title: 'محصولات پوستی', url: 'https://steigen.ir/products/', type: 'category' },
    { title: 'محصولات مو', url: 'https://steigen.ir/products/', type: 'category' },
  ],
  keywords: [
    // Brand & Product Education
    { keyword: 'محصولات استایژن', intent: 'navigational', priority: 'high', cluster: 'brand' },
    { keyword: 'معرفی برند استایژن', intent: 'informational', priority: 'high', cluster: 'brand' },
    { keyword: 'آیا محصولات استایژن خوب است', intent: 'commercial', priority: 'high', cluster: 'brand' },

    // Skincare Routine
    { keyword: 'روتین مراقبت از پوست', intent: 'informational', priority: 'high', cluster: 'routine' },
    { keyword: 'مراحل روتین پوست', intent: 'informational', priority: 'high', cluster: 'routine' },
    { keyword: 'روتین صبحگاهی پوست', intent: 'informational', priority: 'high', cluster: 'routine' },
    { keyword: 'روتین شبانه پوست', intent: 'informational', priority: 'high', cluster: 'routine' },
    { keyword: 'روتین پوست چرب', intent: 'informational', priority: 'medium', cluster: 'routine' },
    { keyword: 'روتین پوست خشک', intent: 'informational', priority: 'medium', cluster: 'routine' },
    { keyword: 'روتین پوست حساس', intent: 'informational', priority: 'medium', cluster: 'routine' },

    // Anti-aging
    { keyword: 'ضد چروک', intent: 'commercial', priority: 'high', cluster: 'anti-aging' },
    { keyword: 'رفع خطوط ریز صورت', intent: 'informational', priority: 'high', cluster: 'anti-aging' },
    { keyword: 'جوان‌سازی پوست', intent: 'informational', priority: 'high', cluster: 'anti-aging' },
    { keyword: 'رتینول برای چروک', intent: 'informational', priority: 'high', cluster: 'anti-aging' },
    { keyword: 'کرم ضد چروک قوی', intent: 'commercial', priority: 'high', cluster: 'anti-aging' },

    // Moisturizer
    { keyword: 'مرطوب‌کننده پوست', intent: 'commercial', priority: 'high', cluster: 'moisturizer' },
    { keyword: 'بهترین مرطوب‌کننده', intent: 'commercial', priority: 'high', cluster: 'moisturizer' },
    { keyword: 'آبرسان قوی پوست', intent: 'commercial', priority: 'medium', cluster: 'moisturizer' },
    { keyword: 'کرم مرطوب‌کننده برای پوست خشک', intent: 'commercial', priority: 'medium', cluster: 'moisturizer' },

    // Serum
    { keyword: 'سرم ویتامین سی', intent: 'commercial', priority: 'high', cluster: 'serum' },
    { keyword: 'بهترین سرم پوست', intent: 'commercial', priority: 'high', cluster: 'serum' },
    { keyword: 'سرم هیالورونیک اسید', intent: 'commercial', priority: 'medium', cluster: 'serum' },
    { keyword: 'سرم نیاسینامید', intent: 'commercial', priority: 'high', cluster: 'serum' },
    { keyword: 'سرم رتینول', intent: 'commercial', priority: 'high', cluster: 'serum' },

    // Sunscreen
    { keyword: 'ضد آفتاب', intent: 'commercial', priority: 'high', cluster: 'sunscreen' },
    { keyword: 'بهترین ضد آفتاب', intent: 'commercial', priority: 'high', cluster: 'sunscreen' },
    { keyword: 'ضد آفتاب مناسب پوست چرب', intent: 'commercial', priority: 'medium', cluster: 'sunscreen' },

    // Active Ingredients
    { keyword: 'نیاسینامید چیست', intent: 'informational', priority: 'high', cluster: 'ingredients' },
    { keyword: 'ویتامین سی برای پوست', intent: 'informational', priority: 'high', cluster: 'ingredients' },
    { keyword: 'رتینول چیست', intent: 'informational', priority: 'high', cluster: 'ingredients' },
    { keyword: 'هیالورونیک اسید', intent: 'informational', priority: 'medium', cluster: 'ingredients' },
    { keyword: 'سالسیلیک اسید برای جوش', intent: 'informational', priority: 'medium', cluster: 'ingredients' },

    // Hair Care
    { keyword: 'مراقبت از مو', intent: 'informational', priority: 'high', cluster: 'haircare' },
    { keyword: 'شامپو مناسب موی چرب', intent: 'commercial', priority: 'medium', cluster: 'haircare' },
    { keyword: 'ماسک موی تقویتی', intent: 'commercial', priority: 'medium', cluster: 'haircare' },
    { keyword: 'ریزش مو درمان', intent: 'informational', priority: 'high', cluster: 'haircare' },

    // Comparisons & Guides
    { keyword: 'تفاوت سرم و کرم', intent: 'informational', priority: 'medium', cluster: 'comparison' },
    { keyword: 'خرید محصولات پوستی اصل', intent: 'transactional', priority: 'medium', cluster: 'buying' },
    { keyword: 'قیمت محصولات استایژن', intent: 'commercial', priority: 'medium', cluster: 'buying' },
  ],
  generation: {
    postsPerBuild: 20,
    freshnessDays: 30,
    allowOverwrite: false,
    minWords: 1200,
  },
};

// ─── Registry ────────────────────────────────────────────────────────────────

export const projects: Record<string, ProjectConfig> = {
  'lift-thread-store': DoctoraramisStore,
  'steigen-brand': steigenBrand,
};

export function getProject(id: string): ProjectConfig {
  const project = projects[id];
  if (!project) {
    throw new Error(`Project "${id}" not found. Available projects: ${Object.keys(projects).join(', ')}`);
  }
  return project;
}
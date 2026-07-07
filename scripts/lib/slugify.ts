// ─── Persian → English term mapping ──────────────────────────────────────────

const PERSIAN_TO_ENGLISH: Record<string, string> = {
  // Thread lifting terms
  'نخ لیفت': 'lift-thread',
  'نخ': 'thread',
  'لیفت': 'lift',
  'صورت': 'face',
  'بدن': 'body',
  'بینی': 'nose',
  'ابرو': 'eyebrow',
  'فک': 'jawline',
  'گردن': 'neck',
  'سینه': 'breast',
  'شکم': 'abdomen',
  'پی‌دی‌او': 'pdo',
  'کاگ': 'cog',
  'مونو': 'mono',
  'قبل و بعد': 'before-after',
  'قبل': 'before',
  'بعد': 'after',
  'عوارض': 'side-effects',
  'قیمت': 'price',
  'خرید': 'buy',
  'فروشگاه': 'store',
  'بهترین': 'best',
  'مراقبت': 'aftercare',
  'آموزش': 'training',
  'دوره': 'course',
  'ماندگاری': 'duration',
  'درد': 'pain',
  'خطرات': 'risks',
  'خطرناک': 'dangerous',
  'درمان': 'treatment',
  'جراحی': 'surgery',
  'کلینیک': 'clinic',
  'تهران': 'tehran',
  'اصلی': 'original',
  'ارزان': 'cheap',
  'آرزان‌ترین': 'cheapest',
  'استفاده': 'usage',
  'نحوه': 'how-to',
  'چگونه': 'how-to',
  'راهنما': 'guide',
  'راهنمای خرید': 'buying-guide',
  'کره‌ای': 'korean',
  'مارک': 'brand',
  'برند': 'brand',
  'مقایسه': 'comparison',
  'تفاوت': 'difference',
  'جواب می‌دهد': 'results',
  'نتیجه': 'result',
  'شستن': 'washing',
  'روزیانه': 'daily',
  'چند روز': 'how-many-days',
  'آیا': 'is',
  'دارد': 'has',
  'عکس': 'photo',
  'محصولات': 'products',
  'نحوه استفاده': 'how-to-use',
  'شستن صورت': 'face-washing',
  'جواب می‌دهد': 'results-timeline',
  'درد دارد': 'pain-level',
  'خطرناک است': 'is-dangerous',
  'ریز': 'fine',
  'خطوط': 'lines',
  'رفع': 'removal',

  // Skincare terms
  'استایژن': 'steigen',
  'پوست': 'skin',
  'مو': 'hair',
  'مراقبت از پوست': 'skincare',
  'مراقبت از مو': 'haircare',
  'روتین': 'routine',
  'مراحل': 'steps',
  'صبحگاهی': 'morning',
  'شبانه': 'night',
  'چرب': 'oily',
  'خشک': 'dry',
  'حساس': 'sensitive',
  'ضد چروک': 'anti-wrinkle',
  'چروک': 'wrinkle',
  'جوان‌سازی': 'rejuvenation',
  'رتینول': 'retinol',
  'مرطوب‌کننده': 'moisturizer',
  'آبرسان': 'hydrating',
  'سرم': 'serum',
  'ویتامین': 'vitamin',
  'سی': 'c',
  'ویتامین سی': 'vitamin-c',
  'نیاسینامید': 'niacinamide',
  'هیالورونیک': 'hyaluronic',
  'هیالورونیک اسید': 'hyaluronic-acid',
  'ضد آفتاب': 'sunscreen',
  'آفتاب': 'sun',
  'کرم': 'cream',
  'شامپو': 'shampoo',
  'ماسک': 'mask',
  'تقویتی': 'strengthening',
  'ریزش': 'hair-loss',
  'جوش': 'acne',
  'سالسیلیک': 'salicylic',
  'سالسیلیک اسید': 'salicylic-acid',
  'قوی': 'strong',
  'مناسب': 'suitable',
  'خوب': 'good',
  'درباره': 'about',
  'معرفی': 'introduction',
  'تماس': 'contact',
  'ما': 'us',
  'بلاگ': 'blog',
  'مقالات': 'articles',
  'کرم ضد چروک': 'anti-wrinkle-cream',
  'رفع خطوط': 'line-removal',
  'ضد چروک قوی': 'strong-anti-wrinkle',
  'مرطوب‌کننده برای پوست خشک': 'moisturizer-dry-skin',
  'آبرسان قوی': 'strong-hydrator',
  'سرم ویتامین سی': 'vitamin-c-serum',
  'سرم هیالورونیک اسید': 'hyaluronic-acid-serum',
  'سرم نیاسینامید': 'niacinamide-serum',
  'سرم رتینول': 'retinol-serum',
  'سرم پوست': 'skin-serum',
  'ضد آفتاب مناسب': 'suitable-sunscreen',
  'شامپو مناسب': 'suitable-shampoo',
  'ماسک موی': 'hair-mask',
  'ریزش مو': 'hair-loss-treatment',
  'محصولات پوستی': 'skincare-products',
  'محصولات پوستی اصل': 'original-skincare-products',
  'محصولات استایژن': 'steigen-products',
  'قیمت محصولات': 'products-price',
  'تفاوت سرم و کرم': 'serum-vs-cream',
  'چروک صورت': 'face-wrinkle',
  'چروک گردن': 'neck-wrinkle',
};

// Persian character to Latin transliteration
const PERSIAN_CHAR_MAP: Record<string, string> = {
  'ا': 'a', 'آ': 'a', 'أ': 'a', 'إ': 'e',
  'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 's',
  'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh',
  'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z',
  'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's',
  'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a',
  'غ': 'gh', 'ف': 'f', 'ق': 'gh', 'ک': 'k',
  'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n',
  'و': 'v', 'ؤ': 'v', 'ه': 'h', 'ی': 'y',
  'ئ': 'y', 'ي': 'y', 'ک': 'k', 'گ': 'g',
};

// Common Persian stop words to strip from slugs
const STOP_WORDS = new Set([
  'و', 'در', 'به', 'از', 'برای', 'با', 'که', 'این', 'آن',
  'را', 'هم', 'کرد', 'شد', 'است', 'می', 'باید', 'هر',
  'یک', 'چه', 'چگونه', 'چون', 'ولی', 'اما', 'یا', 'تا',
  'روی', 'زیر', 'پس', 'همچنین', 'بسیار', 'مختلف', 'مثل',
  'بین', 'همه', 'درباره', 'پیش', 'بعد', 'همین', 'نیز',
  'بخش', 'حالت', 'اول', 'دوم', 'سوم',
]);

/**
 * Transliterate a single Persian word to Latin characters.
 */
function transliterateWord(word: string): string {
  let result = '';
  for (const char of word) {
    result += PERSIAN_CHAR_MAP[char] || char;
  }
  return result;
}

/**
 * Convert Persian (or mixed) text to a stable, URL-safe kebab-case slug.
 *
 * Strategy:
 *  1. Look up longest matching phrase in PERSIAN_TO_ENGLISH dictionary
 *  2. For remaining unmatched tokens, transliterate character-by-character
 *  3. Strip stop words
 *  4. Join with hyphens, collapse multiples, trim
 */
export function slugify(text: string): string {
  if (!text) return '';

  let normalized = text.trim();

  // Replace ZWNJ (half-space) with regular space for easier splitting
  normalized = normalized.replace(/\u200c/g, ' ');

  // 1. Longest-match dictionary replacement
  // Sort dictionary keys by length descending for greedy matching
  const sortedKeys = Object.keys(PERSIAN_TO_ENGLISH).sort(
    (a, b) => b.length - a.length
  );

  for (const key of sortedKeys) {
    const normalizedKey = key.replace(/\u200c/g, ' ');
    if (normalized.includes(normalizedKey)) {
      normalized = normalized.replace(new RegExp(escapeRegex(normalizedKey), 'g'), PERSIAN_TO_ENGLISH[key]);
    }
  }

  // 2. Split remaining into tokens, transliterate, filter
  const tokens = normalized.split(/[\s]+/).filter(Boolean);
  const slugParts: string[] = [];

  for (const token of tokens) {
    // Skip if already a pure English/number token
    if (/^[a-zA-Z0-9\-]+$/.test(token)) {
      const lower = token.toLowerCase();
      if (!STOP_WORDS.has(lower) && lower.length > 1) {
        slugParts.push(lower);
      }
      continue;
    }

    // Transliterate any remaining Persian characters
    const transliterated = transliterateWord(token)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .trim();

    if (transliterated.length > 1 && !STOP_WORDS.has(transliterated)) {
      slugParts.push(transliterated);
    }
  }

  // 3. Join and clean
  let slug = slugParts.join('-');

  // Collapse multiple hyphens
  slug = slug.replace(/-+/g, '-');
  // Remove leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');
  // Limit length
  if (slug.length > 80) {
    slug = slug.slice(0, 80).replace(/-+$/, '');
  }

  return slug || 'post';
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
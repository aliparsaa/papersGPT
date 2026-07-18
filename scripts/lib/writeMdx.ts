import * as fs from 'node:fs/promises';
import * as path from 'node:path';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PostData {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  keywords: string[];
  canonicalUrl: string;
  readingTime: number;
  faqs: FaqItem[];
  body: string;
}

export interface PostMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  keywords: string[];
  canonicalUrl: string;
  readingTime: number;
  wordCount: number;
}

// ─── Paths ───────────────────────────────────────────────────────────────────

const POSTS_DIR = path.resolve('content/posts');
const INDEX_PATH = path.join(POSTS_DIR, 'index.json');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function yamlStr(value: string): string {
  // Always quote strings for safety
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
}

function yamlSafe(value: unknown, indent: string = ''): string {
  if (value === null || value === undefined) return '""';
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'string') {
    return yamlStr(value);
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    // Check if it's an array of primitive strings
    if (value.every(item => typeof item === 'string')) {
      const items = value.map(item => `${indent}  - ${yamlStr(item)}`).join('\n');
      return `\n${items}`;
    }
    // Array of objects
    const items = value.map(item => {
      const obj = item as Record<string, unknown>;
      const entries = Object.entries(obj)
        .map(([k, v]) => {
          const val = typeof v === 'string' ? yamlStr(v) : String(v);
          return `${indent}    ${k}: ${val}`;
        })
        .join('\n');
      return `${indent}  - ${entries.trimStart()}`;
    });
    return '\n' + items.join('\n');
  }
  // Object (fallback)
  const entries = Object.entries(value as Record<string, unknown>)
    .map(([k, v]) => `${indent}  ${k}: ${yamlSafe(v, indent + '  ')}`)
    .join('\n');
  return `\n${entries}`;
}

// ─── Write MDX ───────────────────────────────────────────────────────────────

export async function writeMdx(post: PostData): Promise<void> {
  // Ensure the posts directory exists
  await fs.mkdir(POSTS_DIR, { recursive: true });

  // Count words in body for metadata
  const wordCount = post.body.split(/\s+/).filter(Boolean).length;

  // Build frontmatter
  const frontmatter = [
    '---',
    `title: ${yamlSafe(post.title)}`,
    `slug: ${yamlSafe(post.slug)}`,
    `description: ${yamlSafe(post.description)}`,
    `date: ${yamlSafe(post.date)}`,
    `author: ${yamlSafe(post.author)}`,
    `tags: ${yamlSafe(post.tags)}`,
    `keywords: ${yamlSafe(post.keywords)}`,
    `canonicalUrl: ${yamlSafe(post.canonicalUrl)}`,
    `readingTime: ${post.readingTime}`,
    `wordCount: ${wordCount}`,
    `faqs: ${yamlSafe(post.faqs as unknown)}`,
    '---',
  ].join('\n');

  // Full file content
  const content = `${frontmatter}\n\n${post.body}\n`;

  // Write MDX file
  const mdxPath = path.join(POSTS_DIR, `${post.slug}.mdx`);
  await fs.writeFile(mdxPath, content, 'utf-8');

  // Update index.json
  await updateIndex({
    title: post.title,
    slug: post.slug,
    description: post.description,
    date: post.date,
    author: post.author,
    tags: post.tags,
    keywords: post.keywords,
    canonicalUrl: post.canonicalUrl,
    readingTime: post.readingTime,
    wordCount,
  });
}

// ─── Index management ────────────────────────────────────────────────────────

async function readIndex(): Promise<PostMeta[]> {
  try {
    const raw = await fs.readFile(INDEX_PATH, 'utf-8');
    return JSON.parse(raw) as PostMeta[];
  } catch {
    return [];
  }
}

async function updateIndex(entry: PostMeta): Promise<void> {
  const index = await readIndex();

  const existingIdx = index.findIndex(p => p.slug === entry.slug);
  if (existingIdx >= 0) {
    index[existingIdx] = entry;
  } else {
    index.push(entry);
  }

  // Sort by date descending
  index.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  await fs.writeFile(INDEX_PATH, JSON.stringify(index, null, 2), 'utf-8');
}
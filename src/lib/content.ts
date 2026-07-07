import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ─── Types ───────────────────────────────────────────────────────────────────

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

export interface PostFrontmatter extends PostMeta {
  faqs?: { question: string; answer: string }[];
}

export interface PostData extends PostFrontmatter {
  content: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "posts");

function readIndex(): PostMeta[] {
  const indexPath = path.join(CONTENT_DIR, "index.json");
  try {
    const raw = fs.readFileSync(indexPath, "utf-8");
    return JSON.parse(raw) as PostMeta[];
  } catch {
    return [];
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Reads all posts from `content/posts/index.json`.
 * Returns posts sorted by date (newest first).
 */
export function getAllPosts(): PostMeta[] {
  const posts = readIndex();
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Returns all unique slugs from the index.
 */
export function getPostSlugs(): string[] {
  return readIndex().map((p) => p.slug);
}

/**
 * Reads a single MDX file by slug, parses frontmatter with gray-matter,
 * and returns the frontmatter merged with the raw markdown body.
 */
export function getPostBySlug(slug: string): PostData | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return {
      title: data.title ?? "",
      slug: data.slug ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      author: data.author ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      canonicalUrl: data.canonicalUrl ?? "",
      readingTime: data.readingTime ?? 0,
      wordCount: data.wordCount ?? 0,
      faqs: Array.isArray(data.faqs)
        ? data.faqs.map((f: { question: string; answer: string }) => ({
            question: f.question,
            answer: f.answer,
          }))
        : undefined,
      content,
    };
  } catch {
    return null;
  }
}

/**
 * Filters posts that contain a given tag.
 */
export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => p.tags.includes(tag)
  );
}

/**
 * Finds posts related to the current one by shared tags.
 * Excludes the current post from results.
 */
export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): PostMeta[] {
  const allPosts = getAllPosts();

  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.post);
}

/**
 * Site-wide URL used for canonical / OG / sitemap generation.
 */
export const SITE_URL = "https://liftthread.ir";
export const BRAND_NAME = "لیفت‌ترد";
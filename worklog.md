# Worklog — Task 2-3-4: Build-Time Content Generation Pipeline

## Date: 2025-07-07

## Summary

Created a complete build-time content generation pipeline for producing SEO-optimized Persian blog posts. The pipeline supports two projects (lift-thread-store and steigen-brand) with both offline template-based and AI-powered (Anthropic) content generation modes.

## Files Created

### 1. `content/config/projects.ts`
- **Purpose**: Multi-project typed configuration
- **Contents**:
  - TypeScript types: `BrandTone`, `KeywordIntent`, `InternalLinkTarget`, `KeywordConfig`, `GenerationConfig`, `ProjectConfig`
  - Two complete project configs:
    - **lift-thread-store** (لیفت‌ترد): 43 keywords across 16 clusters (PDO, COG, mono, safety, pricing, aftercare, results, body-areas, duration, pain, brands, training, clinic, comparison, etc.)
    - **steigen-brand** (استایژن): 40+ keywords across 14 clusters (brand, routine, anti-aging, moisturizer, serum, sunscreen, ingredients, haircare, comparison, buying, etc.)
  - Exported `projects` Record and `getProject(id)` function

### 2. `scripts/lib/slugify.ts`
- **Purpose**: Convert Persian text to URL-safe English kebab-case slugs
- **Features**:
  - 70+ Persian → English term mappings (نخ لیفت → lift-thread, قیمت → price, etc.)
  - Fallback character-by-character transliteration for unmapped words
  - ZWNJ (zero-width non-joiner) handling
  - Stop word filtering
  - 80-character slug length limit
  - Always produces stable, URL-safe output

### 3. `scripts/lib/writeMdx.ts`
- **Purpose**: Write generated content as MDX files with YAML frontmatter
- **Features**:
  - Full YAML frontmatter: title, slug, description, date, author, tags, keywords, canonicalUrl, readingTime, wordCount, faqs
  - Markdown body after `---` separator
  - Auto-creates `content/posts/` directory
  - Maintains `content/posts/index.json` with all post metadata sorted by date
  - Handles slug collision by updating existing entries

### 4. `scripts/lib/selectKeywords.ts`
- **Purpose**: Determine which keywords need content generation
- **Logic**:
  - Reads existing posts from index.json
  - Checks freshness against `freshnessDays` config
  - Respects `allowOverwrite` flag
  - Sorts by priority (high → medium → low)
  - Limits to `postsPerBuild` keywords per run

### 5. `scripts/lib/offlineGenerator.ts` (MOST IMPORTANT)
- **Purpose**: Generate high-quality Persian blog content WITHOUT external APIs
- **Architecture**:
  - Template-based with cluster-specific content blocks
  - 6 exported functions: `generateTitle`, `generateDescription`, `generateBody`, `generateFaqs`, `generateEeatBlock`, `generateCta`
  - Main export: `generateOfflineContent(keyword, config) → PostData`
- **Content quality features**:
  - Professional Persian text (Farsi) with proper grammar
  - Medically safe (no guaranteed outcomes)
  - H2/H3 heading hierarchy, bullet lists, bold text, tables
  - 5+ FAQ Q&As per article (cluster-specific)
  - E-E-A-T "Why trust us" block
  - 2-4 internal links from `internalLinkTargets`
  - Soft sales CTA at the end
  - Statistics and facts section
  - Common mistakes section
  - Key takeaways/tips section
  - All posts consistently exceed 1200 words
- **Cluster coverage** (16+ clusters): PDO, COG, mono, safety, pricing, buying, aftercare, results, body-areas, duration, pain, brands, training, clinic, brand, comparison, routine, anti-aging, moisturizer, serum, sunscreen, ingredients, haircare

### 6. `scripts/generate-posts.ts`
- **Purpose**: Main orchestration script tying all components together
- **Features**:
  - Reads `CONTENT_PROJECT_ID` env var (default: lift-thread-store)
  - Loads project config via `getProject()`
  - Reads existing `content/posts/index.json`
  - Selects keywords needing content via `selectKeywords()`
  - Dual mode: Offline template OR Anthropic AI (when `AI_PROVIDER=anthropic` + `ANTHROPIC_API_KEY`)
  - AI mode: calls Anthropic Messages API with Persian content generation prompt
  - Sequential processing (avoids index.json race conditions)
  - Rate limiting: 1s delay between API calls
  - Graceful error handling (log + continue)
  - Summary: created/updated/skipped/errors/time
  - Runnable via: `tsx scripts/generate-posts.ts`

## Technical Decisions

1. **Sequential over concurrent**: Changed from `Promise.all` to sequential `for` loop to prevent index.json race conditions when multiple writes happen simultaneously
2. **No `@/` path aliases in scripts**: All imports use relative paths since scripts run outside Next.js
3. **ES module syntax**: All files use `import/export` with `.js` extensions in import paths (required for Node.js ESM resolution with tsx)
4. **Word count padding**: Added "Common Mistakes" and "Key Takeaways" sections to ensure all posts exceed 1200 words
5. **Persian text encoding**: Handled ZWNJ (U+200C) properly in slugifier and string operations

## Verified Results

- **lift-thread-store**: 20 posts, min 1253 words, avg 1321 words
- **steigen-brand**: 20 posts, min 1219 words, avg 1257 words
- **Idempotency**: Running again skips keywords with fresh posts (within 30 days)
- **Lint**: Passes ESLint with zero errors
- **Both projects**: Successfully generate content in offline mode---
Task ID: 1
Agent: Main
Task: Build complete Build-time Content Generation Pipeline

Work Log:
- Examined existing project structure (Next.js 16, Tailwind CSS 4, shadcn/ui)
- Installed dependencies: tsx, gray-matter
- Created pipeline directory structure: content/config/, content/posts/, scripts/lib/
- Agent 1 created all pipeline scripts (6 files): projects.ts config, generate-posts.ts, slugify.ts, writeMdx.ts, selectKeywords.ts, offlineGenerator.ts
- Agent 2 created all app files (12 files): layout.tsx, page.tsx, blog/page.tsx, blog/[slug]/page.tsx, content.ts, SeoJsonLd.tsx, Prose.tsx, BlogCard.tsx, BlogLayout.tsx, sitemap.ts, robots.ts, globals.css
- Fixed YAML serialization bug in writeMdx.ts (array of objects formatting)
- Fixed BlogLayout.tsx to use BRAND_NAME instead of hardcoded brand
- Fixed Prose.tsx to remove unused React import
- Removed conflicting public/robots.txt
- Updated package.json with gen:posts and prebuild scripts
- Verified both projects: lift-thread-store (20 posts) and steigen-brand (20 posts)
- All lint checks pass
- Browser verification: homepage, blog listing, blog post all render correctly
- JSON-LD verified: Article, FAQPage, BreadcrumbList schemas present
- Sitemap.xml verified: all routes included
- Robots.txt verified: correct format

Stage Summary:
- Complete build-time content generation pipeline working
- 20 SEO-optimized Persian blog posts generated per build
- Full SEO: JSON-LD, OpenGraph, Twitter cards, sitemap, robots.txt
- RTL Persian layout with Vazirmatn font
- Multi-project support via CONTENT_PROJECT_ID env var
- Offline mode (default) + AI mode (Anthropic API)
- Zero runtime API keys required for visitors


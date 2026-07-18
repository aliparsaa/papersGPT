#!/usr/bin/env npx tsx
/**
 * Content Generation Pipeline
 * ─────────────────────────────
 * Generates SEO blog posts for configured projects.
 *
 * Usage:
 *   CONTENT_PROJECT_ID=lift-thread-store tsx scripts/generate-posts.ts
 *   AI_PROVIDER=anthropic ANTHROPIC_API_KEY=sk-xxx tsx scripts/generate-posts.ts
 *
 * Environment:
 *   CONTENT_PROJECT_ID  — which project config to use (default: lift-thread-store)
 *   AI_PROVIDER         — "anthropic" to use AI generation (default: offline)
 *   ANTHROPIC_API_KEY   — required when AI_PROVIDER=anthropic
 *   ANTHROPIC_MODEL     — model name (default: claude-sonnet-4-20250514)
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getProject } from '../content/config/projects.js';
import type { KeywordConfig, ProjectConfig } from '../content/config/projects.js';
import { writeMdx, type PostData } from './lib/writeMdx.js';
import type { PostMeta } from './lib/writeMdx.js';
import { selectKeywords } from './lib/selectKeywords.js';
import { generateOfflineContent } from './lib/offlineGenerator.js';

// ─── Constants ───────────────────────────────────────────────────────────────

const INDEX_PATH = path.resolve('content/posts/index.json');
const MAX_CONCURRENT = 2;
const API_DELAY_MS = 1000;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function readExistingPosts(): Promise<PostMeta[]> {
  try {
    const raw = await fs.readFile(INDEX_PATH, 'utf-8');
    return JSON.parse(raw) as PostMeta[];
  } catch {
    return [];
  }
}

// ─── Anthropic AI Generation ─────────────────────────────────────────────────

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AnthropicResponse {
  content: Array<{ type: string; text: string }>;
  stop_reason: string | null;
}

async function aiGenerateContent(
  keyword: KeywordConfig,
  config: ProjectConfig
): Promise<PostData> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is required for AI generation');
  }

  const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';
  const url = 'https://api.anthropic.com/v1/messages';

  const systemPrompt = `تو یک نویسنده حرفه‌ای محتوای فارسی (فارسی/پارسی) برای وبلاگ هستی. 
تو مقالات SEO-محور با کیفیت بالا می‌نویسی.

قوانین مهم:
- فقط به فارسی بنویس (عناوین، متن، همه چیز)
- پزشکی امن باش: هیچ نتیجه‌ای را تضمین نکن، مخصوصاً برای موضوعات پزشکی و زیبایی
- ساختار H2/H3 مناسب با مارکداون
- حداقل ۱۲۰۰ کلمه تولید کن
- حداقل ۵ سوال متداول شامل پرسش و پاسخ
- بلوک E-E-A-T "چرا به ما اعتماد کنید" اضافه کن
- یک CTA (Call to Action) ملایم در پایان اضافه کن
- از بولت‌لیست و جدول و بولد برای خوانایی بهتر استفاده کن
- آمار و حقایق واقعی و مرتبط اضافه کن`;

  const userPrompt = `برای پروژه "${config.brandName}" (سایت: ${config.siteUrl}) یک مقاله کامل درباره "${keyword.keyword}" بنویس.

اطلاعات پروژه:
- نام برند: ${config.brandName}
- لحن: ${config.brandTone}
- دسته اصلی: ${config.primaryCategory}
- نویسنده: ${config.authorName}
- قصد کلیدی‌واژه: ${keyword.intent}
- اولویت: ${keyword.priority}
- کلاستر: ${keyword.cluster}

لینک‌های داخلی موجود:
${config.internalLinkTargets.map(t => `- ${t.title}: ${t.url} (نوع: ${t.type})`).join('\n')}

خروجی باید به فرمت JSON با ساختار زیر باشد (فقط JSON خالص، بدون مارکداون):

{
  "title": "عنوان مقاله به فارسی",
  "description": "توضیحات متا (حداکثر ۱۶۰ کاراکتر)",
  "tags": ["تگ ۱", "تگ ۲"],
  "faqs": [
    { "question": "سوال؟", "answer": "پاسخ" }
  ],
  "body": "بدنه مقاله به مارکداون (فارسی)"
}

توجه: بدنه مقاله (body) باید شامل ساختار H2/H3 با ## و ### باشد، بولت‌لیست با -، و متن بولد با **. بدنه نباید شامل عنوان اصلی باشد (آن در title آمده). بلوک E-E-A-T و CTA را در انتهای بدنه قرار بده.`;

  const messages: AnthropicMessage[] = [
    { role: 'user', content: userPrompt },
  ];

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model,
      max_tokens: 8192,
      system: systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as AnthropicResponse;

  // Extract text content
  const textBlock = data.content.find(b => b.type === 'text');
  if (!textBlock) {
    throw new Error('No text content in Anthropic response');
  }

  // Parse JSON from response (handle potential markdown code block wrapping)
  let jsonStr = textBlock.text.trim();
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  const parsed = JSON.parse(jsonStr);

  // Build PostData
  const slug = `ai-${keyword.keyword.replace(/\s+/g, '-').slice(0, 60)}`;
  const body = parsed.body || '';
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    title: parsed.title || keyword.keyword,
    slug,
    description: parsed.description || '',
    date: new Date().toISOString().split('T')[0],
    author: config.authorName,
    tags: parsed.tags || [keyword.cluster, config.primaryCategory],
    keywords: [keyword.keyword],
    canonicalUrl: `${config.siteUrl}/blog/${slug}`,
    readingTime,
    faqs: parsed.faqs || [],
    body,
  };
}

// ─── Main Pipeline ───────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const startTime = Date.now();

  // 1. Determine project
  const projectId = process.env.CONTENT_PROJECT_ID || 'lift-thread-store';
  console.log(`\n📋 Project: ${projectId}`);

  let config: ProjectConfig;
  try {
    config = getProject(projectId);
    console.log(`   Brand: ${config.brandName}`);
    console.log(`   Site:  ${config.siteUrl}`);
    console.log(`   Tone:  ${config.brandTone}`);
  } catch (err) {
    console.error(`❌ Failed to load project: ${(err as Error).message}`);
    process.exit(1);
  }

  // 2. Read existing posts
  const existingPosts = await readExistingPosts();
  console.log(`   Existing posts: ${existingPosts.length}`);

  // 3. Select keywords
  const keywords = selectKeywords(config, existingPosts);
  console.log(`   Keywords to generate: ${keywords.length}`);

  if (keywords.length === 0) {
    console.log('\n✅ All keywords have fresh content. Nothing to generate.');
    return;
  }

  // 4. Determine generation mode
  const aiProvider = process.env.AI_PROVIDER;
  const useAi = aiProvider === 'anthropic' && !!process.env.ANTHROPIC_API_KEY;
  console.log(`   Mode: ${useAi ? '🤖 AI (Anthropic)' : '📝 Offline template'}`);
  console.log('');

  // 5. Generate posts with rate limiting
  let created = 0;
  let updated = 0;
  let skipped = 0;
  const errors: string[] = [];

  // Process sequentially to avoid index.json race conditions
  for (let i = 0; i < keywords.length; i++) {
    const kw = keywords[i];
    const idx = i + 1;
    try {
      console.log(`[${idx}/${keywords.length}] Generating: ${kw.keyword} (${kw.cluster})...`);

      let postData: PostData;

      if (useAi) {
        postData = await aiGenerateContent(kw, config);
      } else {
        postData = generateOfflineContent(kw, config);
      }

      // Check if this is an update or new post
      const exists = existingPosts.some(p =>
        p.keywords.includes(kw.keyword) || p.slug === postData.slug
      );

      await writeMdx(postData);

      if (exists) {
        updated++;
        console.log(`   ✅ Updated: ${postData.slug}`);
      } else {
        created++;
        console.log(`   ✅ Created: ${postData.slug}`);
      }

      // Rate limiting for API calls
      if (useAi) {
        await delay(API_DELAY_MS);
      }
    } catch (err) {
      const msg = `${kw.keyword}: ${(err as Error).message}`;
      errors.push(msg);
      skipped++;
      console.error(`   ❌ Error: ${msg}`);
    }
  }

  // 6. Print summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n' + '─'.repeat(50));
  console.log('📊 Generation Summary');
  console.log('─'.repeat(50));
  console.log(`   Created:  ${created}`);
  console.log(`   Updated:  ${updated}`);
  console.log(`   Skipped:  ${skipped}`);
  console.log(`   Errors:   ${errors.length}`);
  console.log(`   Time:     ${elapsed}s`);
  console.log(`   Project:  ${config.brandName} (${projectId})`);
  console.log(`   Mode:     ${useAi ? 'AI (Anthropic)' : 'Offline Template'}`);
  console.log('─'.repeat(50));

  if (errors.length > 0) {
    console.log('\n⚠️ Errors:');
    for (const err of errors) {
      console.log(`   - ${err}`);
    }
  }

  console.log('\n✨ Done!');
}

// ─── Run ─────────────────────────────────────────────────────────────────────

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
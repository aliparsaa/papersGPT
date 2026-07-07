import type { ProjectConfig, KeywordConfig } from '../../content/config/projects.js';
import type { PostMeta } from './writeMdx.js';

// ─── Priority weight map for sorting ────────────────────────────────────────

const PRIORITY_WEIGHT: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

/**
 * Select keywords that need content generation.
 *
 * A keyword is "needed" when:
 *  - No existing post covers it (no matching slug / keywords overlap)
 *  - Or the existing post is older than `freshnessDays`
 *  - And `allowOverwrite` is not set (in which case we always regenerate)
 *
 * Returns at most `config.generation.postsPerBuild` keywords, sorted by
 * priority descending (high → medium → low).
 */
export function selectKeywords(
  config: ProjectConfig,
  existingPosts: PostMeta[]
): KeywordConfig[] {
  const { freshnessDays, allowOverwrite, postsPerBuild } = config.generation;
  const now = Date.now();
  const freshnessMs = freshnessDays * 24 * 60 * 60 * 1000;

  // Build a map: keyword string → { exists, isFresh }
  const keywordStatus = new Map<string, { exists: boolean; isFresh: boolean }>();

  for (const kw of config.keywords) {
    keywordStatus.set(kw.keyword, { exists: false, isFresh: false });
  }

  // Check existing posts against keywords
  for (const post of existingPosts) {
    const postDate = new Date(post.date).getTime();
    const postAge = now - postDate;
    const postIsFresh = postAge < freshnessMs;

    // Check if any of the post's keywords match our config keywords
    for (const postKw of post.keywords) {
      if (keywordStatus.has(postKw)) {
        const status = keywordStatus.get(postKw)!;
        status.exists = true;
        if (postIsFresh) {
          status.isFresh = true;
        }
      }
    }
  }

  // Filter keywords that need generation
  const needed: KeywordConfig[] = [];

  for (const kw of config.keywords) {
    const status = keywordStatus.get(kw.keyword);

    if (!status) {
      // Keyword not in our map – shouldn't happen, but include it
      needed.push(kw);
      continue;
    }

    if (allowOverwrite) {
      // Always include – we'll regenerate everything
      needed.push(kw);
      continue;
    }

    if (!status.exists || !status.isFresh) {
      needed.push(kw);
    }
  }

  // Sort by priority (high first), then by original order as tiebreaker
  needed.sort((a, b) => {
    const wA = PRIORITY_WEIGHT[a.priority] ?? 0;
    const wB = PRIORITY_WEIGHT[b.priority] ?? 0;
    if (wB !== wA) return wB - wA;
    return 0;
  });

  // Limit to postsPerBuild
  return needed.slice(0, postsPerBuild);
}
import type { PostFrontmatter } from "@/lib/content";

// ─── JSON-LD Schema Helpers ──────────────────────────────────────────────────

export function generateArticleJsonLd(
  post: PostFrontmatter,
  siteUrl: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "لیفت‌ترد",
      url: siteUrl,
    },
    datePublished: post.date,
    dateModified: post.date,
    url: post.canonicalUrl,
    keywords: post.keywords.join(", "),
    wordCount: post.wordCount,
    inLanguage: "fa-IR",
  };
}

export function generateFaqJsonLd(
  faqs: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

interface SeoJsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Server component that renders one or more JSON-LD <script> tags.
 * No visible UI — purely for structured data / SEO.
 */
export function SeoJsonLd({ data }: SeoJsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
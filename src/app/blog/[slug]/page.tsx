import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Calendar, Clock, User } from "lucide-react";
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
  BRAND_NAME,
  SITE_URL,
} from "@/lib/content";
import {
  SeoJsonLd,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/components/SeoJsonLd";
import { Prose } from "@/components/Prose";
import { BlogCard } from "@/components/BlogCard";
import { BlogLayout } from "@/components/BlogLayout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// ─── Static Generation ──────────────────────────────────────────────────────

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "مقاله یافت نشد" };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: post.canonicalUrl,
      siteName: BRAND_NAME,
      type: "article",
      locale: "fa_IR",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: post.canonicalUrl,
    },
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toJalali(dateStr: string): string {
  const months = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
  ];
  const d = new Date(dateStr);
  const gy = d.getFullYear();
  const gm = d.getMonth() + 1;
  const gd = d.getDate();
  const gdm = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd +
    gdm[gm - 1];

  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let jm: number;
  let jd: number;
  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }

  return `${jd} ${months[jm - 1]} ${jy}`;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags, 3);
  const jalaliDate = toJalali(post.date);

  // JSON-LD data
  const articleLd = generateArticleJsonLd(post, SITE_URL);
  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "خانه", url: SITE_URL },
    { name: "وبلاگ", url: `${SITE_URL}/blog` },
    { name: post.title, url: post.canonicalUrl },
  ]);
  const faqLd = post.faqs ? generateFaqJsonLd(post.faqs) : null;

  const jsonLdData = faqLd
    ? [articleLd, faqLd, breadcrumbLd]
    : [articleLd, breadcrumbLd];

  return (
    <BlogLayout
      breadcrumbs={[
        { label: "وبلاگ", href: "/blog" },
        { label: post.title },
      ]}
      showBackLink
    >
      <SeoJsonLd data={jsonLdData} />

      <article className="max-w-3xl mx-auto">
        {/* ── Title ─────────────────────────────────────────────── */}
        <header className="mb-8">
          <h1 className="text-2xl font-extrabold leading-10 md:text-3xl lg:text-4xl mb-4">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-4" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" />
              {jalaliDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" />
              {post.readingTime} دقیقه مطالعه
            </span>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <Separator className="mb-8" />

        {/* ── Body ──────────────────────────────────────────────── */}
        <div className="mb-12">
          <Prose>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </Prose>
        </div>

        <Separator className="mb-10" />

        {/* ── FAQ Section ──────────────────────────────────────── */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6">سوالات متداول</h2>
            <Accordion type="single" collapsible className="w-full">
              {post.faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-right leading-8">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        <Separator className="mb-10" />

        {/* ── Related Posts ────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6">مقالات مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <BlogCard key={rp.slug} post={rp} />
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="rounded-xl border bg-muted/40 p-6 md:p-8 text-center mb-8">
          <h3 className="text-lg font-bold mb-2">
            نیاز به مشاوره تخصصی دارید؟
          </h3>
          <p className="text-muted-foreground mb-5 leading-8">
            تیم متخصصان ما آماده پاسخگویی به سوالات شما هستند. همین حالا
            تماس بگیرید.
          </p>
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="size-4" />
              تماس با ما
            </Link>
          </Button>
        </section>
      </article>
    </BlogLayout>
  );
}
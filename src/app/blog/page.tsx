import type { Metadata } from "next";
import { getAllPosts, BRAND_NAME, SITE_URL } from "@/lib/content";
import { BlogCard } from "@/components/BlogCard";
import { BlogLayout } from "@/components/BlogLayout";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";

// ─── SEO ─────────────────────────────────────────────────────────────────────

export function generateMetadata(): Metadata {
  return {
    title: `${BRAND_NAME} | وبلاگ`,
    description:
      "مقالات آموزشی و کاربردی درباره جوانسازی پوست، نخ لیفت، بوتاکس، فیلر، کاشت مو و مراقبت از پوست در وبلاگ لیفت‌ترد.",
    openGraph: {
      title: `${BRAND_NAME} | وبلاگ`,
      description:
        "مقالات آموزشی و کاربردی درباره جوانسازی پوست، نخ لیفت، بوتاکس، فیلر، کاشت مو و مراقبت از پوست",
      url: `${SITE_URL}/blog`,
      siteName: BRAND_NAME,
      type: "website",
      locale: "fa_IR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${BRAND_NAME} | وبلاگ`,
      description:
        "مقالات آموزشی و کاربردی درباره جوانسازی پوست و زیبایی",
    },
    alternates: {
      canonical: `${SITE_URL}/blog`,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BlogListingPage() {
  const posts = getAllPosts();

  return (
    <BlogLayout breadcrumbs={[{ label: "وبلاگ" }]} title="وبلاگ">
      {/* Hero Description */}
      <section className="mb-10">
        <div className="flex items-start gap-3 mb-3">
          <BookOpen className="size-7 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-muted-foreground leading-8 text-base">
              آخرین مقالات آموزشی و کاربردی درباره جوانسازی پوست، زیبایی و
              سلامت. با مطالعه مقالات ما، اطلاعات به‌روز و تخصصی در زمینه
              خدمات زیبایی کسب کنید.
            </p>
          </div>
        </div>
        <Separator className="mt-6" />
      </section>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </section>
      ) : (
        <p className="text-center text-muted-foreground py-20">
          هنوز مقاله‌ای منتشر نشده است.
        </p>
      )}
    </BlogLayout>
  );
}
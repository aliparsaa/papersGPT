import Link from "next/link";
import {
  BookOpen,
  Search,
  Sparkles,
  FileText,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BlogCard } from "@/components/BlogCard";
import { getAllPosts, BRAND_NAME, SITE_URL } from "@/lib/content";
import { SeoJsonLd, generateBreadcrumbJsonLd } from "@/components/SeoJsonLd";
import type { Metadata } from "next";

// ─── SEO ─────────────────────────────────────────────────────────────────────

export function generateMetadata(): Metadata {
  return {
    title: `${BRAND_NAME} | تولید محتوای هوشمند`,
    description:
      "پلتفرم تولید محتوای هوشمند فارسی با قابلیت‌های سئو پیشرفته، مدیریت وبلاگ و بهینه‌سازی برای موتورهای جستجو.",
    openGraph: {
      title: BRAND_NAME,
      description: "پلتفرم تولید محتوای هوشمند فارسی",
      url: SITE_URL,
      siteName: BRAND_NAME,
      type: "website",
      locale: "fa_IR",
    },
    twitter: {
      card: "summary_large_image",
      title: BRAND_NAME,
      description: "پلتفرم تولید محتوای هوشمند فارسی",
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 6);

  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "خانه", url: SITE_URL },
  ]);

  const features = [
    {
      icon: Sparkles,
      title: "تولید محتوای هوشمند",
      description:
        "مقالات با کیفیت و سئو شده به صورت خودکار تولید و منتشر می‌شوند.",
    },
    {
      icon: Search,
      title: "بهینه‌سازی سئو",
      description:
        "ساختار داده JSON-LD، نقشه سایت و متاتگ‌های کامل برای رتبه‌بندی بهتر.",
    },
    {
      icon: FileText,
      title: "فرمت MDX حرفه‌ای",
      description:
        "محتوا با فرانت‌متر YAML، بخش FAQ و ساختار منظم ذخیره می‌شود.",
    },
    {
      icon: Globe,
      title: "پشتیبانی کامل فارسی",
      description:
        "فونت وزیرمتن، تقویم شمسی و چیدمان RTL برای بهترین تجربه کاربری.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-5xl flex items-center justify-between h-14 px-4">
          <Link
            href="/"
            className="text-lg font-bold text-foreground hover:text-primary transition-colors"
          >
            {BRAND_NAME}
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-sm">
                وبلاگ
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <SeoJsonLd data={breadcrumbLd} />

        {/* ── Hero Section ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24 relative">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4">
                <BookOpen className="size-3.5 ml-1.5" />
                وبلاگ تخصصی زیبایی و سلامت
              </Badge>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl leading-tight mb-5">
                تولید محتوای هوشمند
                <br />
                <span className="text-muted-foreground">به زبان فارسی</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-9 mb-8 max-w-xl">
                پلتفرمی مدرن برای تولید، مدیریت و انتشار مقالات آموزشی با
                بالاترین استانداردهای سئو و تجربه کاربری.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/blog">
                    <BookOpen className="size-4 ml-2" />
                    مشاهده مقالات
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#features">
                    <Sparkles className="size-4 ml-2" />
                    ویژگی‌ها
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Latest Posts ─────────────────────────────────────────────── */}
        <section className="container mx-auto max-w-5xl px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">آخرین مقالات</h2>
              <p className="text-muted-foreground text-sm">
                جدیدترین محتواهای آموزشی ما
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="gap-1.5">
                مشاهده همه مقالات
                <ArrowLeft className="size-4" />
              </Button>
            </Link>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">
              هنوز مقاله‌ای منتشر نشده است.
            </p>
          )}
        </section>

        <Separator />

        {/* ── Features Section ─────────────────────────────────────────── */}
        <section id="features" className="container mx-auto max-w-5xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">ویژگی‌های پلتفرم</h2>
            <p className="text-muted-foreground">
              زیرساخت حرفه‌ای برای مدیریت محتوای فارسی
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="py-0 gap-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2.5 text-lg">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="size-5 text-primary" />
                      </div>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-7 text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="mt-auto border-t">
        <div className="container mx-auto max-w-5xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} {BRAND_NAME} — تمامی حقوق محفوظ است.</span>
          <nav className="flex items-center gap-4">
            <Link href="/blog" className="hover:text-foreground transition-colors">
              وبلاگ
            </Link>
            <Link href="/" className="hover:text-foreground transition-colors">
              خانه
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
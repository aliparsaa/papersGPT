import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/content";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BreadcrumbItemData {
  label: string;
  href?: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItemData[];
  title?: string;
  showBackLink?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function BlogLayout({
  children,
  breadcrumbs = [],
  title,
  showBackLink = false,
}: BlogLayoutProps) {
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

          <nav className="flex items-center gap-3">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-sm">
                وبلاگ
              </Button>
            </Link>
            {showBackLink && (
              <Link href="/blog">
                <Button variant="outline" size="sm" className="text-sm gap-1.5">
                  <ChevronLeft className="size-4" />
                  بازگشت به وبلاگ
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* ── Breadcrumbs ────────────────────────────────────────────────── */}
      {breadcrumbs.length > 0 && (
        <div className="border-b">
          <div className="container mx-auto max-w-5xl px-4 py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="inline-flex items-center gap-1">
                      <Home className="size-3.5" />
                      خانه
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {breadcrumbs.map((crumb, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <span key={crumb.label} className="contents">
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast || !crumb.href ? (
                          <BreadcrumbPage className="text-sm">
                            {crumb.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={crumb.href}>{crumb.label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </span>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      )}

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <main className="flex-1">
        {title && (
          <div className="container mx-auto max-w-5xl px-4 pt-8 pb-4">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {title}
            </h1>
          </div>
        )}
        <div className="container mx-auto max-w-5xl px-4 pb-16">
          {children}
        </div>
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
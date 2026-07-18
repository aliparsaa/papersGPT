import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PostMeta } from "@/lib/content";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Converts a Gregorian date string (YYYY-MM-DD) to a simple Jalali display.
 * This is a lightweight converter — for production you'd use a library like
 * `jalaali-js` or `date-fns-jalali`, but we keep the dependency footprint
 * minimal here.
 */
function toJalali(dateStr: string): string {
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const d = new Date(dateStr);
  const gy = d.getFullYear();
  const gm = d.getMonth() + 1;
  const gd = d.getDate();

  // Simple Gregorian → Jalali conversion (Khayyam algorithm)
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

function formatReadingTime(minutes: number): string {
  return `${minutes} دقیقه مطالعه`;
}

// ─── Component ───────────────────────────────────────────────────────────────

interface BlogCardProps {
  post: PostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  const jalaliDate = toJalali(post.date);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="h-full transition-shadow duration-300 hover:shadow-lg py-0 gap-0 overflow-hidden">
        {/* Accent bar */}
        <div className="h-1 bg-primary/80 group-hover:bg-primary transition-colors" />

        <CardHeader className="pb-2 pt-4">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-lg font-bold leading-8 line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-2">
          <CardDescription className="line-clamp-2 leading-7 text-sm">
            {post.description}
          </CardDescription>
        </CardContent>

        <CardFooter className="pt-2 pb-4 text-xs text-muted-foreground flex items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5" />
            {jalaliDate}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {formatReadingTime(post.readingTime)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
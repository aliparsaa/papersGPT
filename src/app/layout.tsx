import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { BRAND_NAME, SITE_URL } from "@/lib/content";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} | تولید محتوای هوشمند`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "پلتفرم تولید محتوای هوشمند فارسی با قابلیت‌های سئو پیشرفته و مدیریت وبلاگ.",
  keywords: [
    "تولید محتوا",
    "سئو",
    "وبلاگ فارسی",
    "جوانسازی پوست",
    "نخ لیفت",
    "بوتاکس",
  ],
  authors: [{ name: BRAND_NAME }],
  icons: {
    icon: "/logo.svg",
  },
  metadataBase: new URL(SITE_URL),
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
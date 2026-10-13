import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { generateSchoolMetadata, generateSchoolJsonLd } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = generateSchoolMetadata({
  title: "SPS Global School, Jaswantnagar, Etawah | Official Website",
  description:
    "Explore SPS Global School, Jaswantnagar, Etawah. Discover our CBSE curriculum, modern smart classrooms, science & computer labs, sports facilities, and admission enquiries for Session 2026–27."
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateSchoolJsonLd();

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/images/branding/sps-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/branding/sps-logo.png" />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-white text-[#242424]">
        <AnnouncementBar />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

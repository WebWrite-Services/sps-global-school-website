import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

export const metadata = generateSchoolMetadata({
  title: "School Blogs & Updates",
  description:
    "Read the latest official blogs, academic insights, and admission announcements from SPS Global School, Jaswantnagar, Etawah.",
  path: "/blogs"
});

interface BlogRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  created_at: string | null;
  blog_categories?: { name: string }[] | { name: string } | null;
}

interface BlogCard {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string | null;
}

function stripHtml(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shorten(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trimEnd()}…`;
}

function formatDate(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function estimateReadTime(content: string | null): string {
  const words = stripHtml(content).split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function categoryName(row: BlogRow): string {
  const embedded = row.blog_categories;
  const name = Array.isArray(embedded)
    ? embedded[0]?.name
    : embedded?.name;
  return name || "Article";
}

async function getPublishedBlogs(): Promise<BlogCard[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("blogs")
      .select(
        "id, title, slug, excerpt, content, featured_image_url, published_at, created_at, blog_categories(name)"
      )
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error) {
      console.error("[blogs] failed to load published posts:", error.message);
      return [];
    }

    const rows: BlogRow[] = data ?? [];

    return rows.map((row) => ({
      slug: row.slug,
      title: stripHtml(row.title) || "Untitled",
      excerpt: shorten(stripHtml(row.excerpt), 220),
      category: categoryName(row),
      date: formatDate(row.published_at ?? row.created_at),
      readTime: estimateReadTime(row.content),
      image: row.featured_image_url?.trim() || null
    }));
  } catch (error) {
    console.error("[blogs] unexpected error while loading posts:", error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();

  return (
    <>
      <PageHero
        badge="News &amp; Articles"
        title="School Blogs &amp; Insights"
        subtitle="Explore official announcements, pedagogical articles, and educational insights from SPS educators."
        breadcrumbs={[{ label: "Blogs" }]}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block bg-[#FCE5E9] text-[#A50026] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                From the Desk of SPS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#242424] leading-tight">
                Latest Articles &amp; <span className="text-[#A50026]">Updates</span>
              </h2>
              <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
                Verified announcements, admission bulletins, and pedagogical insights published by
                SPS Global School, Jaswantnagar, Etawah.
              </p>
            </div>

            <div className="shrink-0 mb-6">
              <Link
                href="/admission-form-2026-27"
                className="inline-flex items-center gap-1.5 bg-[#A50026] hover:bg-[#85001F] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4 text-[#FFC52E]" />
              </Link>
            </div>
          </div>

          {blogs.length === 0 ? (
            <div className="border border-dashed border-[#E5E5E5] bg-[#FFF7F8] rounded-3xl py-16 px-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#FCE5E9] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#A50026]" />
              </div>
              <h3 className="text-lg font-extrabold text-[#242424] mb-1">
                No articles published yet
              </h3>
              <p className="text-sm text-[#626262] max-w-md mx-auto">
                New blog posts, admission notices, and academic insights will appear here as soon as
                they are published.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                >
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A50026]"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#A50026] to-[#7A001C]">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-white/40" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-[#A50026] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-[#626262] mb-2.5">
                          <Calendar className="w-3.5 h-3.5 text-[#A50026]" />
                          {post.date && <span>{post.date}</span>}
                          {post.date && <span>•</span>}
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="font-extrabold text-base text-[#242424] mb-2 leading-snug group-hover:text-[#A50026] transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#626262] leading-relaxed line-clamp-3">
                          {post.excerpt ||
                            "Click to read the full article published by SPS Global School."}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 mt-5">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A50026] group-hover:text-[#85001F] transition-colors">
                          <span>Read Full Article</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#FFC52E] group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <AdmissionCTASection />
    </>
  );
}

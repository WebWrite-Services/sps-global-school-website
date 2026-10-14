import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

interface RelatedCard {
  slug: string;
  title: string;
  category: string | null;
  excerptHtml: string | null;
  image: string | null;
}

interface CategoryCarrier {
  blog_categories?: { name: string }[] | { name: string } | null;
}

interface SupabaseRelatedRow {
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image_url: string | null;
  blog_categories?: { name: string }[] | { name: string } | null;
}

interface PostView {
  title: string;
  category: string | null;
  date: string;
  author: string | null;
  image: string | null;
  excerptHtml: string | null;
  contentHtml: string | null;
  related: RelatedCard[];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

async function getSupabaseView(slug: string): Promise<PostView | null> {
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blogs")
    .select("*, blog_categories(name), profiles(full_name)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) return null;

  const { data: related } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, featured_image_url, blog_categories(name)")
    .eq("status", "published")
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(2);

  const categoryName = (item: CategoryCarrier) =>
    Array.isArray(item.blog_categories)
      ? item.blog_categories[0]?.name ?? null
      : item.blog_categories?.name ?? null;

  const relatedRows: SupabaseRelatedRow[] = related ?? [];

  return {
    title: escapeHtml(post.title),
    category: categoryName(post) ?? null,
    date: post.published_at ? formatDate(post.published_at) : "",
    author: Array.isArray(post.profiles)
      ? post.profiles[0]?.full_name
      : post.profiles?.full_name,
    image: post.featured_image_url ?? null,
    excerptHtml: post.excerpt ? escapeHtml(post.excerpt) : null,
    contentHtml: post.content ?? null,
    related: relatedRows.map((item) => ({
      slug: item.slug,
      title: escapeHtml(item.title),
      category: categoryName(item) ?? null,
      excerptHtml: item.excerpt ? escapeHtml(item.excerpt) : null,
      image: item.featured_image_url ?? null
    }))
  };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blogs")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) return { title: "Blog Not Found" };

  return generateSchoolMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blogs/${slug}`
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const view = await getSupabaseView(slug);

  if (!view) {
    notFound();
  }

  return (
    <>
      <PageHero
        badge={view.category || "Blog"}
        title={stripHtml(view.title)}
        subtitle={view.date ? `Published on ${view.date}${view.author ? ` by ${view.author}` : ""}` : ""}
        breadcrumbs={[
          { label: "Blogs", href: "/blogs" },
          { label: stripHtml(view.title) }
        ]}
        backgroundImage={view.image || undefined}
      />

      <article className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {view.image && (
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border-4 border-[#FCE5E9]">
              <Image
                src={view.image}
                alt={stripHtml(view.title)}
                fill
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-4 py-4 border-y border-gray-100 text-xs text-[#626262]">
            <div className="flex items-center gap-3 flex-wrap">
              {view.category && (
                <span className="bg-[#A50026] text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-[10px]">
                  {view.category}
                </span>
              )}
              {view.date && <span>Published on {view.date}</span>}
              {view.author && <span>by {view.author}</span>}
            </div>
          </div>

          {view.excerptHtml && (
            <div
              className="text-base sm:text-lg text-[#626262] leading-relaxed font-medium border-l-4 border-[#A50026] pl-4 [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: view.excerptHtml }}
            />
          )}

          {view.contentHtml && (
            <div
              className="prose prose-sm sm:prose-base max-w-none text-[#242424] leading-relaxed
                [&_h1]:font-extrabold [&_h1]:text-[#242424] [&_h1]:text-2xl [&_h1]:mt-8 [&_h1]:mb-4
                [&_h2]:font-extrabold [&_h2]:text-[#242424] [&_h2]:text-xl [&_h2]:mt-6 [&_h2]:mb-3
                [&_h3]:font-bold [&_h3]:text-[#242424] [&_h3]:text-lg [&_h3]:mt-4 [&_h3]:mb-2
                [&_p]:leading-relaxed [&_p]:mb-4
                [&_a]:text-[#A50026] [&_a]:underline
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                [&_blockquote]:border-l-4 [&_blockquote]:border-[#A50026] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#626262]
                [&_img]:rounded-xl [&_img]:shadow-md"
              dangerouslySetInnerHTML={{ __html: view.contentHtml }}
            />
          )}

          <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#A50026] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all blog updates</span>
            </Link>

            <Link
              href="/admission-form-2026-27"
              className="inline-flex items-center gap-2 bg-[#A50026] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#85001F] transition-colors"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFC52E]" />
            </Link>
          </div>

          {view.related.length > 0 && (
            <div className="pt-12 border-t border-gray-100 space-y-6">
              <h3 className="text-xl font-extrabold text-[#242424]">
                Related Updates &amp; Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {view.related.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/blogs/${other.slug}`}
                    className="p-5 rounded-2xl border border-gray-200 hover:border-[#A50026] bg-[#FFF7F8] space-y-2 block transition-all group"
                  >
                    {other.image && (
                      <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                        <Image
                          src={other.image}
                          alt={stripHtml(other.title)}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    {other.category && (
                      <span className="text-[10px] font-bold text-[#A50026] uppercase tracking-wider">
                        {other.category}
                      </span>
                    )}
                    <h4
                      className="font-extrabold text-sm sm:text-base text-[#242424] group-hover:text-[#A50026] transition-colors line-clamp-2 [&_a]:text-inherit [&_a]:no-underline"
                      dangerouslySetInnerHTML={{ __html: other.title }}
                    />
                    {other.excerptHtml && (
                      <div
                        className="text-xs text-[#626262] line-clamp-2 [&_p]:m-0"
                        dangerouslySetInnerHTML={{ __html: other.excerptHtml }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <AdmissionCTASection />
    </>
  );
}

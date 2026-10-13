import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";


interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
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
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blogs")
    .select("*, blog_categories(name), profiles(full_name)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
    notFound();
  }

  // Fetch related articles (other published blogs)
  const { data: related } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, featured_image_url, blog_categories(name)")
    .eq("status", "published")
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(2);

  const category = Array.isArray(post.blog_categories)
    ? post.blog_categories[0]?.name
    : (post.blog_categories as { name: string } | null)?.name;

  const author = Array.isArray(post.profiles)
    ? post.profiles[0]?.full_name
    : (post.profiles as { full_name: string } | null)?.full_name;

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-IN", {
        day: "2-digit", month: "long", year: "numeric"
      })
    : "";

  return (
    <>
      <PageHero
        badge={category || "Blog"}
        title={post.title}
        subtitle={publishedDate ? `Published on ${publishedDate}${author ? ` by ${author}` : ""}` : ""}
        breadcrumbs={[
          { label: "Blogs", href: "/blogs" },
          { label: post.title }
        ]}
        backgroundImage={post.featured_image_url || undefined}
      />

      <article className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border-4 border-[#FCE5E9]">
              <Image
                src={post.featured_image_url}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          )}

          {/* Article Metadata Bar */}
          <div className="flex items-center justify-between gap-4 py-4 border-y border-gray-100 text-xs text-[#626262]">
            <div className="flex items-center gap-3">
              {category && (
                <span className="bg-[#A50026] text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-[10px]">
                  {category}
                </span>
              )}
              {publishedDate && <span>Published on {publishedDate}</span>}
              {author && <span>by {author}</span>}
            </div>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-base sm:text-lg text-[#626262] leading-relaxed font-medium border-l-4 border-[#A50026] pl-4">
              {post.excerpt}
            </p>
          )}

          {/* Article Body */}
          {post.content && (
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
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* Navigation Back */}
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

          {/* Related Articles */}
          {related && related.length > 0 && (
            <div className="pt-12 border-t border-gray-100 space-y-6">
              <h3 className="text-xl font-extrabold text-[#242424]">
                Related Updates &amp; Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((other: any) => {
                  const otherCategory = Array.isArray(other.blog_categories)
                    ? other.blog_categories[0]?.name
                    : (other.blog_categories as { name: string } | null)?.name;
                  return (
                    <Link
                      key={other.id}
                      href={`/blogs/${other.slug}`}
                      className="p-5 rounded-2xl border border-gray-200 hover:border-[#A50026] bg-[#FFF7F8] space-y-2 block transition-all group"
                    >
                      {other.featured_image_url && (
                        <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                          <Image
                            src={other.featured_image_url}
                            alt={other.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      {otherCategory && (
                        <span className="text-[10px] font-bold text-[#A50026] uppercase tracking-wider">
                          {otherCategory}
                        </span>
                      )}
                      <h4 className="font-extrabold text-sm sm:text-base text-[#242424] group-hover:text-[#A50026] transition-colors line-clamp-2">
                        {other.title}
                      </h4>
                      {other.excerpt && (
                        <p className="text-xs text-[#626262] line-clamp-2">
                          {other.excerpt}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>

      <AdmissionCTASection />
    </>
  );
}

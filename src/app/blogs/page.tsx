import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
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

export default async function BlogsPage() {
  const supabase = await createClient();

  const { data: blogs } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, featured_image_url, published_at, blog_categories(name), profiles(full_name)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const posts = blogs ?? [];

  return (
    <>
      <PageHero
        badge="News &amp; Articles"
        title="School Blogs &amp; Insights"
        subtitle="Explore official announcements, pedagogical articles, and educational insights from SPS educators."
        breadcrumbs={[{ label: "Blogs" }]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-[#9CA3AF]">
              <BookOpen className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-xl font-semibold text-[#626262]">No blogs published yet</p>
              <p className="text-sm mt-2">Check back soon for updates from SPS Global School.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => {
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
                  <article
                    key={post.id}
                    className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                  >
                    {/* Featured Image */}
                    <div className="relative h-52 w-full overflow-hidden bg-[#F5F5F5]">
                      {post.featured_image_url ? (
                        <Image
                          src={post.featured_image_url}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 380px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-[#E5E5E5]" />
                        </div>
                      )}
                      {category && (
                        <div className="absolute top-3 left-3 bg-[#A50026] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                          {category}
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-[#626262] mb-3">
                          <Calendar className="w-3.5 h-3.5 text-[#A50026]" />
                          <span>{publishedDate}</span>
                          {author && (
                            <>
                              <span>•</span>
                              <span>{author}</span>
                            </>
                          )}
                        </div>

                        <h2 className="font-extrabold text-base sm:text-lg text-[#242424] mb-2 leading-snug group-hover:text-[#A50026] transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        {post.excerpt && (
                          <p className="text-xs sm:text-sm text-[#626262] leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="pt-5 border-t border-gray-100 mt-5">
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A50026] group-hover:text-[#85001F] transition-colors"
                        >
                          <span>Read Full Article</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#FFC52E] group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

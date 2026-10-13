import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { BLOG_POSTS } from "@/data/blogs";

export const metadata = generateSchoolMetadata({
  title: "School Blogs & Updates",
  description:
    "Read the latest official blogs, academic insights, and admission announcements from SPS Global School, Jaswantnagar, Etawah.",
  path: "/blogs"
});

export default function BlogsPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
              >
                {/* Featured Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#A50026] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {post.category}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#626262] mb-3">
                      <Calendar className="w-3.5 h-3.5 text-[#A50026]" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="font-extrabold text-base sm:text-lg text-[#242424] mb-2 leading-snug group-hover:text-[#A50026] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#626262] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
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
            ))}
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

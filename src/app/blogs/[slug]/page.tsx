import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Sparkles } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { BLOG_POSTS, BlogPost } from "@/data/blogs";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Blog Not Found" };

  return generateSchoolMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blogs/${post.slug}`
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug);

  return (
    <>
      <PageHero
        badge={post.category}
        title={post.title}
        subtitle={`${post.date} • ${post.readTime}`}
        breadcrumbs={[
          { label: "Blogs", href: "/blogs" },
          { label: post.title }
        ]}
        backgroundImage={post.featuredImage}
      />

      <article className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Featured Image */}
          <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border-4 border-[#FCE5E9]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
              priority
            />
          </div>

          {/* Article Metadata Bar */}
          <div className="flex items-center justify-between gap-4 py-4 border-y border-gray-100 text-xs text-[#626262]">
            <div className="flex items-center gap-3">
              <span className="bg-[#A50026] text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-[10px]">
                {post.category}
              </span>
              <span>Published on {post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-[#A50026]">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="space-y-6 text-sm sm:text-base text-[#242424] leading-relaxed">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

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
          {otherPosts.length > 0 && (
            <div className="pt-12 border-t border-gray-100 space-y-6">
              <h3 className="text-xl font-extrabold text-[#242424]">
                Related Updates &amp; Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherPosts.slice(0, 2).map((other) => (
                  <Link
                    key={other.slug}
                    href={`/blogs/${other.slug}`}
                    className="p-5 rounded-2xl border border-gray-200 hover:border-[#A50026] bg-[#FFF7F8] space-y-2 block transition-all group"
                  >
                    <span className="text-[10px] font-bold text-[#A50026] uppercase tracking-wider">
                      {other.category}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-[#242424] group-hover:text-[#A50026] transition-colors line-clamp-2">
                      {other.title}
                    </h4>
                    <p className="text-xs text-[#626262] line-clamp-2">
                      {other.excerpt}
                    </p>
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

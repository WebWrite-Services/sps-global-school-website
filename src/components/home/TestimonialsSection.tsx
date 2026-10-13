import React from "react";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/data/school";

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#FFF7F8] border-b border-[#FCE5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Community Voices"
          title="What Parents &amp;"
          highlightedText="Teachers Say"
          subtitle="Real reflections from families and educators who experience SPS Global School every day."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current text-[#FFC52E]"
                    />
                  ))}
                </div>

                <div className="relative pl-4 mb-4">
                  <Quote className="w-3.5 h-3.5 text-[#A50026]/40 absolute left-0 top-0 rotate-180" />
                  <p className="text-xs sm:text-sm text-[#626262] italic leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#A50026] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#242424]">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-[#A50026] font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

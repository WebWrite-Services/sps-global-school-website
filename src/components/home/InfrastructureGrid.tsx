import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { FACILITIES } from "@/data/facilities";

export default function InfrastructureGrid() {
  return (
    <section className="py-16 lg:py-24 bg-[#FFF7F8] border-b border-[#FCE5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="World-Class Facilities"
          title="Explore Our State-of-the-Art"
          highlightedText="Campus &amp; Laboratories"
          subtitle="Designed to provide hands-on experimentation, creative expression, and safe, vibrant learning environments."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-3xl overflow-hidden border-2 border-[#A50026]/20 shadow-md hover:shadow-xl hover:border-[#A50026] transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Photo with Orchids-style diamond badge and overlay */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={facility.image}
                  alt={facility.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Golden diamond badge + Burgundy pill banner on image bottom-left */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#FFC52E] rotate-45 flex items-center justify-center shrink-0 shadow-xs border border-white">
                    <Sparkles className="w-2.5 h-2.5 text-[#A50026] -rotate-45" />
                  </div>
                  <div className="bg-[#A50026]/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider truncate border border-[#FFC52E]/30">
                    {facility.title}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#A50026] uppercase tracking-wider block mb-1">
                    {facility.category}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#242424] mb-2 group-hover:text-[#A50026] transition-colors leading-snug">
                    {facility.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#626262] leading-relaxed line-clamp-3">
                    {facility.shortDesc}
                  </p>
                </div>

                <div className="pt-5 border-t border-gray-100 mt-5 flex items-center justify-between">
                  <Link
                    href={facility.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A50026] group-hover:text-[#85001F] transition-colors"
                  >
                    <span>Explore Facility</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FFC52E] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[10px] bg-[#FCE5E9] text-[#A50026] px-2 py-0.5 rounded-md font-semibold">
                    CBSE Standard
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

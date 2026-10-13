import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { LEADERSHIP } from "@/data/school";

export default function LeadershipSection() {
  const leaders = [
    {
      key: "director",
      data: LEADERSHIP.director,
      href: "/directors-message"
    },
    {
      key: "manager",
      data: LEADERSHIP.manager,
      href: "/managers-message"
    },
    {
      key: "principal",
      data: LEADERSHIP.principal,
      href: "/principals-message"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Guiding Minds &amp; Vision"
          title="Messages from School"
          highlightedText="Leadership"
          subtitle="Inspiring addresses from the directors and administrators dedicated to your child's holistic growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map(({ key, data, href }) => (
            <div
              key={key}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Leader Photo with Burgundy Accent Top */}
              <div className="relative h-64 w-full bg-[#FFF7F8] overflow-hidden border-b-2 border-[#A50026]/10">
                <Image
                  src={data.image}
                  alt={data.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#A50026] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {data.role}
                </div>
              </div>

              {/* Leader Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#242424] leading-snug">
                    {data.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#A50026] mt-0.5 mb-3">
                    {data.designationSubtitle}
                  </p>

                  <div className="relative pl-6 pt-1">
                    <Quote className="w-4 h-4 text-[#FFC52E] absolute left-0 top-0 rotate-180" />
                    <p className="text-xs sm:text-sm text-[#626262] italic leading-relaxed">
                      &ldquo;{data.shortQuote}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100 mt-6">
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A50026] group-hover:text-[#85001F] transition-colors"
                  >
                    <span>Read Full Address</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FFC52E] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

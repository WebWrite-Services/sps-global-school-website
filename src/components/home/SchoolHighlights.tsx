import React from "react";
import { GraduationCap, ShieldCheck, Building2, Users2, Sparkles, LucideIcon } from "lucide-react";
import { SCHOOL_HIGHLIGHTS } from "@/data/school";

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  ShieldCheck,
  Building2,
  Users2
};

export default function SchoolHighlights() {
  return (
    <section className="py-12 bg-[#FFF7F8] border-b border-[#FCE5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCHOOL_HIGHLIGHTS.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || Sparkles;

            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden animate-fadeInUp card-hover cursor-default"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Gold corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#FFC52E]/30 to-transparent rounded-bl-2xl" />

                {/* Icon container: background turns burgundy and icon turns white on hover */}
                <div className="w-12 h-12 rounded-xl bg-[#FCE5E9] text-[#A50026] group-hover:bg-[#A50026] group-hover:text-white icon-box flex items-center justify-center mb-4 transition-all duration-300 shrink-0">
                  <Icon className="w-6 h-6 transition-colors duration-300 text-inherit" />
                </div>

                <h3 className="font-extrabold text-base text-[#242424] mb-2 group-hover:text-[#A50026] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#626262] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

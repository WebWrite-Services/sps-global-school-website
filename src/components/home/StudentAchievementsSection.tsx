import React from "react";
import Image from "next/image";
import { Award, Trophy, Star, Medal } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { STUDENT_ACHIEVEMENTS } from "@/data/school";

export default function StudentAchievementsSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#E4D7A5]/40 border-b border-[#E4D7A5] relative overflow-hidden">
      {/* Decorative Golden Ambient Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFC52E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A50026]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Champions of SPS"
          title="Celebrating Outstanding"
          highlightedText="Student Achievements"
          subtitle="Honoring exceptional performance across CBSE board examinations, Olympiads, and inter-school championships."
        />

        {/* 4 Champion Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDENT_ACHIEVEMENTS.map((achiever) => (
            <div
              key={achiever.name}
              className="bg-white rounded-3xl overflow-hidden border-2 border-[#A50026]/20 shadow-md hover:shadow-xl hover:border-[#A50026] transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Photo */}
              <div className="relative h-60 w-full overflow-hidden bg-[#FFF7F8]">
                <Image
                  src={achiever.image}
                  alt={achiever.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#A50026] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <Medal className="w-3 h-3 text-[#FFC52E]" />
                  <span>{achiever.tag}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between text-center bg-gradient-to-b from-white to-[#FFFDF9]">
                <div>
                  <h3 className="font-extrabold text-base text-[#242424] mb-0.5">
                    {achiever.name}
                  </h3>
                  <p className="text-xs text-[#626262] font-medium mb-3">
                    {achiever.class}
                  </p>

                  <div className="inline-block bg-[#FCE5E9] border border-[#A50026]/30 px-3 py-1.5 rounded-2xl mb-1">
                    <span className="text-sm font-extrabold text-[#A50026] block">
                      {achiever.score}
                    </span>
                    <span className="text-[10px] font-semibold text-[#85001F] uppercase tracking-wider">
                      {achiever.category}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 mt-4 flex items-center justify-center gap-1 text-[11px] text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current text-[#FFC52E]" />
                  <span>Excellence Honor Roll</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Board Highlights Stat Strip */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-[#E4D7A5] shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#A50026] text-white flex items-center justify-center font-bold">
              <Trophy className="w-6 h-6 text-[#FFC52E]" />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-[#A50026]">100%</div>
              <div className="text-xs text-[#626262]">CBSE Board Pass Percentage</div>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FFC52E] text-[#242424] flex items-center justify-center font-bold">
              <Award className="w-6 h-6 text-[#A50026]" />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-[#242424]">Merit First</div>
              <div className="text-xs text-[#626262]">Individual Subject Distinctions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Image from "next/image";
import { Flag, Sparkles, BookOpen, Globe2, Trophy, Heart } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";

export const metadata = generateSchoolMetadata({
  title: "School Assembly",
  description:
    "Morning assembly routine at SPS Global School, Jaswantnagar, Etawah. Learn about our daily prayer, thought for the day, news reading, and student-led character development.",
  path: "/school-assembly"
});

export default function SchoolAssemblyPage() {
  const steps = [
    {
      title: "1. Solemn Welcome & Gathering",
      desc: "Students line up by class and height in orderly squads under the supervision of house captains and class teachers.",
      icon: <Flag className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "2. Devotional Prayer & School Anthem",
      desc: "All students and teachers stand in unified silence to recite the school prayer, invoking gratitude, clarity of mind, and moral strength.",
      icon: <Heart className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "3. Thought of the Day",
      desc: "A designated student recites a carefully chosen philosophical or motivational quotation followed by a one-line reflection on its practical relevance.",
      icon: <Sparkles className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "4. Four-Pillar Daily News Briefing",
      desc: "Four student anchors deliver concise, fact-checked news updates covering: National Affairs, International Developments, Sports Triumphs, and School Events.",
      icon: <Globe2 className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "5. Faculty Discourse & Special Commendations",
      desc: "Teachers share brief moral reflections, announce competition winners, distribute medals, and celebrate student birthdays.",
      icon: <Trophy className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "6. National Anthem & Orderly March",
      desc: "The assembly concludes with the resonant singing of 'Jana Gana Mana', after which students march to their respective classrooms in rhythmic formation.",
      icon: <BookOpen className="w-5 h-5 text-[#A50026]" />
    }
  ];

  return (
    <>
      <PageHero
        badge="Daily Morning Routine"
        title="School Assembly"
        subtitle="Where each day at SPS Global School begins with solemn prayer, public speaking, and collective inspiration."
        breadcrumbs={[
          { label: "Information", href: "/fee-structure" },
          { label: "School Assembly" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Top Editorial Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                The Morning Spark
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424] leading-snug">
                More Than a Gathering—A Daily Platform for Character &amp; Poise
              </h2>
              <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
                At SPS Global School, the morning assembly is a sacred start to every educational day. Designed to foster poise, public speaking confidence, and civic awareness, our assemblies are led entirely by student houses on weekly rotation.
              </p>
              <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
                By facing an audience of hundreds of peers every morning, children learn to overcome natural stage fright, articulate ideas clearly, and build mutual respect across grades.
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-[#FCE5E9]">
                <Image
                  src="/images/activities/school-assembly.jpeg"
                  alt="SPS Global School Morning Assembly"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Assembly Flow Grid */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-extrabold text-[#242424]">
                The Daily 20-Minute Assembly Sequence
              </h3>
              <p className="text-xs sm:text-sm text-[#626262]">
                Conducted every morning promptly from 8:35 AM to 8:55 AM on the central campus grounds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((st) => (
                <div
                  key={st.title}
                  className="bg-[#FFF7F8] p-6 rounded-2xl border border-[#FCE5E9] space-y-3 hover:border-[#A50026] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs">
                    {st.icon}
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-[#242424]">
                    {st.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

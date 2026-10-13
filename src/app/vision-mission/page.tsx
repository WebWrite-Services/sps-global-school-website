import React from "react";
import Image from "next/image";
import { Eye, Target, Compass, Heart, Shield, Sparkles } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";

export const metadata = generateSchoolMetadata({
  title: "Vision & Mission",
  description:
    "Discover the official vision and mission of SPS Global School, Jaswantnagar, Etawah. Learn about our commitment to blending modern technology with timeless cultural values.",
  path: "/vision-mission"
});

export default function VisionMissionPage() {
  const values = [
    {
      title: "Academic Integrity & Rigor",
      desc: "Promoting genuine intellectual honesty, continuous effort, and authentic conceptual mastery over shortcuts."
    },
    {
      title: "Blend of Technology & Culture",
      desc: "Harnessing 21st-century digital tools, smart classrooms, and coding while honoring time-tested cultural and ethical foundations."
    },
    {
      title: "Respect & Inclusivity",
      desc: "Cultivating an open community where every student, teacher, and parent feels heard, valued, and encouraged."
    },
    {
      title: "Discipline & Responsibility",
      desc: "Instilling punctuality, self-regulation, accountability for school property, and dedication to personal duty."
    },
    {
      title: "Lifelong Love of Learning",
      desc: "Igniting curiosity so education remains a joyful, self-driven adventure that continues throughout life."
    },
    {
      title: "Compassionate Leadership",
      desc: "Inspiring students to use their knowledge and talents in service to community, society, and nation."
    }
  ];

  return (
    <>
      <PageHero
        badge="Strategic Direction"
        title="Vision &amp; Mission"
        subtitle="The philosophical blueprint guiding our academic standards, daily conduct, and long-term institutional goals."
        breadcrumbs={[{ label: "About Us", href: "/about-us" }, { label: "Vision & Mission" }]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Vision & Mission Two-Card Feature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-[#FFF7F8] rounded-3xl p-8 sm:p-10 border-2 border-[#A50026]/20 shadow-md flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFC52E]/20 rounded-bl-full" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#A50026] text-white flex items-center justify-center mb-6 shadow-xs">
                  <Eye className="w-7 h-7 text-[#FFC52E]" />
                </div>
                <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider block mb-2">
                  Our Official Vision
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424] mb-4">
                  The Vision Statement
                </h2>
                <blockquote className="text-base sm:text-lg text-[#626262] italic leading-relaxed border-l-4 border-[#A50026] pl-4">
                  &ldquo;We, at SPS, are led by our vision of providing valuable learning experiences and quality education to our students with the blend of technology and culture.&rdquo;
                </blockquote>
              </div>
              <div className="mt-8 pt-4 border-t border-[#FCE5E9] text-xs text-[#85001F] font-semibold">
                SPS Global School • Jaswantnagar, Etawah
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-[#FAF7EE] rounded-3xl p-8 sm:p-10 border-2 border-[#E4D7A5] shadow-md flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#A50026]/10 rounded-bl-full" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFC52E] text-[#242424] flex items-center justify-center mb-6 shadow-xs">
                  <Target className="w-7 h-7 text-[#A50026]" />
                </div>
                <span className="text-xs font-bold text-[#85001F] uppercase tracking-wider block mb-2">
                  Our Sacred Mission
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424] mb-4">
                  The Mission Statement
                </h2>
                <blockquote className="text-base sm:text-lg text-[#626262] italic leading-relaxed border-l-4 border-[#FFC52E] pl-4">
                  &ldquo;Our Mission is to strive for the discovery of true knowledge and learning. With each passing year, our endeavor continues.&rdquo;
                </blockquote>
              </div>
              <div className="mt-8 pt-4 border-t border-[#E4D7A5] text-xs text-[#85001F] font-semibold">
                SPS Global School • Committed to Excellence
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="space-y-8 pt-8 border-t border-gray-100">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                Ethical Pillars
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">
                Values That Define Everyday Life at SPS
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((val) => (
                <div
                  key={val.title}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:border-[#A50026] hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FCE5E9] text-[#A50026] flex items-center justify-center font-bold text-xs mb-3">
                    <Sparkles className="w-4 h-4 text-[#A50026]" />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-[#242424] mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                    {val.desc}
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

import React from "react";
import Image from "next/image";
import { Heart, Sparkles, Award } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { INSPIRATION } from "@/data/school";

export const metadata = generateSchoolMetadata({
  title: "Our Inspiration",
  description:
    "Honor the visionary founders and guiding spirits of SPS Global School: Late Shri Mahaveer Singh Yadav and Late Shri Shivpal Singh Yadav.",
  path: "/our-inspiration"
});

export default function OurInspirationPage() {
  return (
    <>
      <PageHero
        badge="Foundational Roots"
        title="Our Eternal Inspiration"
        subtitle="Paying homage to the visionaries whose timeless ideals of public service and education continue to illuminate our path."
        breadcrumbs={[{ label: "Our Inspiration" }]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
              Sacred Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">
              The Guiding Lights of SPS Educational Group
            </h2>
            <p className="text-sm text-[#626262]">
              The SPS Global School stands as a living tribute to the selflessness, moral conviction, and educational vision of our founding inspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INSPIRATION.map((figure) => (
              <div
                key={figure.name}
                className="bg-[#FFF7F8] rounded-3xl p-8 border-2 border-[#A50026]/20 shadow-md flex flex-col items-center text-center space-y-5 relative overflow-hidden group hover:border-[#A50026] transition-all"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFC52E]/20 rounded-bl-full" />

                <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                  <Image
                    src={figure.image}
                    alt={figure.name}
                    fill
                    sizes="176px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-[#A50026] uppercase tracking-wider bg-white px-3 py-1 rounded-full shadow-2xs">
                    {figure.role}
                  </span>
                  <h3 className="font-extrabold text-xl text-[#242424] pt-2">
                    {figure.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                  {figure.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF7EE] p-8 sm:p-10 rounded-3xl border border-[#E4D7A5] space-y-4 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#85001F] uppercase tracking-wider">
              The Continuing Legacy
            </span>
            <h3 className="text-xl font-extrabold text-[#242424]">
              Transforming Lives in Jaswantnagar, Etawah
            </h3>
            <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
              Every facility, every smart classroom, and every laboratory at SPS Global School is engineered to carry forward this eternal commitment: making premier, value-based CBSE English Medium education accessible to every deserving child in our region.
            </p>
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

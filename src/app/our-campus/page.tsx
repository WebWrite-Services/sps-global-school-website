import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TreePine, ShieldCheck, Bus, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { SCHOOL_INFO } from "@/data/school";

export const metadata = generateSchoolMetadata({
  title: "Our Campus",
  description:
    "Explore the 20+ acre green campus of SPS Global School on NH-19, Jaswantnagar, Etawah. Featuring modern infrastructure, sports playfields, 24/7 CCTV, and safe transport.",
  path: "/our-campus"
});

export default function OurCampusPage() {
  const highlights = [
    "20+ Acres of lush landscaped green grounds along NH-19",
    "24/7 CCTV surveillance across all entry points, corridors, and play zones",
    "Certified Fire Safety infrastructure and wide emergency exit corridors",
    "Centralized clean RO drinking water plants with continuous testing",
    "Spacious outdoor playfields for Cricket, Football, Volleyball, and Athletics",
    "GPS-tracked bus fleet providing safe, monitored transport across Etawah"
  ];

  return (
    <>
      <PageHero
        badge="Campus Infrastructure"
        title="Our Campus"
        subtitle="A secure, expansive 20+ acre haven of learning located directly on NH-19, Jaswantnagar, Etawah."
        breadcrumbs={[
          { label: "Infrastructure", href: "/our-campus" },
          { label: "Our Campus" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Main Hero Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                Environment for Growth
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424] leading-snug">
                An Idyllic Learning Environment Away from City Congestion
              </h2>
              <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
                The campus of SPS Global School is deliberately planned to combine modern architectural elegance with open natural spaces. Situated on NH-19, Kaist, Jaswantnagar, it provides an unpolluted, quiet atmosphere where children can concentrate deeply and play freely.
              </p>
              <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
                With ample daylight, natural breezes, tree-lined walking pathways, and sprawling athletic grounds, our campus is designed to keep students energized and inspired through every hour of the school day.
              </p>

              <div className="space-y-2 pt-2">
                {highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#242424]">
                    <CheckCircle2 className="w-4 h-4 text-[#A50026] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-[#FCE5E9]">
                <Image
                  src="/images/campus/main-building.jpg"
                  alt="SPS Global School Main Campus Building"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-56 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/campus/campus-event.jpg"
                  alt="Students gathering on campus grounds"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

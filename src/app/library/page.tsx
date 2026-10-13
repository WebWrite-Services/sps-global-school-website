import React from "react";
import Image from "next/image";
import { BookOpen, Sparkles, CheckCircle2, Bookmark, Compass, Library as LibraryIcon } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";

export const metadata = generateSchoolMetadata({
  title: "School Library",
  description:
    "Explore the comprehensive library and reading resource center at SPS Global School, Jaswantnagar, Etawah. Featuring thousands of volumes, encyclopedias, and periodicals.",
  path: "/library"
});

export default function LibraryPage() {
  const sections = [
    {
      title: "Extensive Book Collection",
      desc: "Carefully curated across English and Hindi classical literature, science encyclopedias, historical chronicles, and CBSE reference guides."
    },
    {
      title: "Early Reader Corner",
      desc: "Specially dedicated illustrated picture books, phonics readers, and folk tales designed to cultivate early childhood reading habits."
    },
    {
      title: "Quiet Study & Research Enclave",
      desc: "Equipped with wide wooden reading tables, natural reading lamps, and reference stacks supporting independent project preparation."
    },
    {
      title: "Periodicals & Educational Dailies",
      desc: "Daily subscriptions to prominent national newspapers, scientific digests, and current affairs magazines keeping students informed."
    }
  ];

  return (
    <>
      <PageHero
        badge="Resource &amp; Knowledge Center"
        title="School Library"
        subtitle="A tranquil sanctuary dedicated to igniting the imagination and fostering lifelong reading passion."
        breadcrumbs={[
          { label: "Infrastructure", href: "/our-campus" },
          { label: "Library" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                Gateway to Knowledge
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424] leading-snug">
                Where Young Minds Travel Worlds Through Words
              </h2>
              <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
                The library at SPS Global School is more than a book repository; it is an active center of intellectual exploration. Guided by qualified librarians, students are introduced to diverse genres, critical reading techniques, and research methodology.
              </p>
              <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
                Regular library periods are built into the weekly academic timetable for all classes from Grade 1 to 12, ensuring reading becomes second nature to every student.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-[#FCE5E9]">
                <Image
                  src="/images/facilities/library.jpg"
                  alt="SPS Global School Library"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
            {sections.map((s) => (
              <div
                key={s.title}
                className="bg-[#FFF7F8] p-6 rounded-2xl border border-[#FCE5E9] space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs">
                  <Bookmark className="w-5 h-5 text-[#A50026]" />
                </div>
                <h3 className="font-extrabold text-base text-[#242424]">{s.title}</h3>
                <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Palette, Music, Flag, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";

export const metadata = generateSchoolMetadata({
  title: "Co-Curricular Activities",
  description:
    "Explore sports, cultural arts, music, dance, morning assemblies, and clubs at SPS Global School, Jaswantnagar, Etawah. Fostering holistic student leadership and creative expression.",
  path: "/co-curricular-activities"
});

export default function CoCurricularActivitiesPage() {
  const domains = [
    {
      title: "Outdoor & Indoor Sports",
      icon: <Trophy className="w-6 h-6 text-[#A50026]" />,
      image: "/images/activities/sports-day.jpg",
      items: [
        "Track & Field Athletics (Sprints, Relays, Long Jump)",
        "Cricket, Football, and Volleyball on dedicated turf",
        "Martial Arts & Taekwondo for self-defense and discipline",
        "Indoor Chess and Table Tennis for strategic calculation"
      ]
    },
    {
      title: "Performing Arts & Music",
      icon: <Music className="w-6 h-6 text-[#A50026]" />,
      image: "/images/activities/cultural-fest.jpg",
      items: [
        "Indian Classical & Contemporary Dance coaching",
        "Vocal Music (Devotional, Patriotic, and Classical)",
        "Stage Drama, Skits, and Public Speaking workshops",
        "Annual Cultural Fest celebrations and folk dance"
      ]
    },
    {
      title: "Visual Arts, Craft & Pottery",
      icon: <Palette className="w-6 h-6 text-[#A50026]" />,
      image: "/images/activities/co-curricular.webp",
      items: [
        "Painting, Sketching, and Water Color techniques",
        "Clay modeling, Pottery, and origami crafts",
        "Calligraphy and poster making competitions",
        "Exhibitions showcasing student-created masterpieces"
      ]
    },
    {
      title: "Clubs & Literary Pursuits",
      icon: <Flag className="w-6 h-6 text-[#A50026]" />,
      image: "/images/activities/school-assembly.jpeg",
      items: [
        "Daily student-led Morning Assemblies and news anchors",
        "Debating and Elocution competitions in Hindi and English",
        "Science & Mathematics Olympiad training cells",
        "Eco Club initiatives for campus greening and tree planting"
      ]
    }
  ];

  return (
    <>
      <PageHero
        badge="Holistic Development"
        title="Co-Curricular Activities"
        subtitle="Where students discover their unique creative voices, athletic stamina, and leadership potential beyond the textbook."
        breadcrumbs={[
          { label: "Information", href: "/fee-structure" },
          { label: "Co-curricular Activities" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Philosophy Statement */}
          <div className="bg-[#FFF7F8] p-8 sm:p-12 rounded-3xl border border-[#FCE5E9] max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
              Educational Ethos
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">
              &ldquo;At SPS Global School, education goes far beyond textbooks.&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
              Co-curricular activities ignite curiosity and stimulate deep engagement by offering equal opportunities for participation. They support holistic growth by fostering critical soft skills such as leadership, emotional balance, adaptability, and lifelong collaboration.
            </p>
          </div>

          {/* 4 Activity Domains */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {domains.map((dom) => (
              <div
                key={dom.title}
                className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#A50026] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={dom.image}
                    alt={dom.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 p-2.5 rounded-2xl shadow-xs">
                    {dom.icon}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-xl text-[#242424] mb-3 group-hover:text-[#A50026] transition-colors">
                      {dom.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {dom.items.map((it, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#626262]">
                          <CheckCircle2 className="w-4 h-4 text-[#A50026] shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      href="/gallery"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A50026] hover:underline"
                    >
                      <span>View Gallery Photographs</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FFC52E]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, Palette, Music, Flag } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function CoCurricularSection() {
  const activities = [
    {
      title: "Track, Field & Outdoor Sports",
      category: "Athletics & Physical Fitness",
      image: "/images/activities/sports-day.jpg",
      icon: <Trophy className="w-5 h-5 text-[#A50026]" />,
      desc: "Spacious playfields for athletics, volleyball, cricket, and taekwondo, instilling teamwork and resilience."
    },
    {
      title: "Cultural Dramatics & Dance",
      category: "Performing Arts",
      image: "/images/activities/cultural-fest.jpg",
      icon: <Music className="w-5 h-5 text-[#A50026]" />,
      desc: "Annual cultural extravaganzas, classical dance, music, and stage drama celebrating regional and national heritage."
    },
    {
      title: "Daily Morning Assemblies",
      category: "Public Speaking & Values",
      image: "/images/activities/school-assembly.jpeg",
      icon: <Flag className="w-5 h-5 text-[#A50026]" />,
      desc: "Student-led prayer, thought of the day, and national news broadcasts cultivating poise and stage presence."
    },
    {
      title: "Art, Craft & Creative STEM",
      category: "Creativity & Hands-On Science",
      image: "/images/activities/co-curricular.webp",
      icon: <Palette className="w-5 h-5 text-[#A50026]" />,
      desc: "Pottery, painting, science exhibitions, and Olympiad clubs encouraging unbounded creative exploration."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            align="left"
            badge="Holistic Life at SPS"
            title="Co-Curricular &amp; Sporting"
            highlightedText="Activities"
            subtitle="Encouraging students to step beyond textbooks, ignite creative passion, and build teamwork."
          />
          <div className="shrink-0 mb-6">
            <Button href="/co-curricular-activities" variant="primary" size="md">
              <span>View All Activities</span>
              <ArrowRight className="w-4 h-4 text-[#FFC52E]" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((act) => (
            <div
              key={act.title}
              className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#A50026] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 p-2 rounded-xl shadow-xs">
                  {act.icon}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#A50026] uppercase tracking-wider block mb-1">
                    {act.category}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#242424] mb-2 leading-snug group-hover:text-[#A50026] transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-xs text-[#626262] leading-relaxed line-clamp-3">
                    {act.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4">
                  <Link
                    href="/co-curricular-activities"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A50026] hover:underline"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3 h-3 text-[#FFC52E]" />
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

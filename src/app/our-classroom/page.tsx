import React from "react";
import Image from "next/image";
import { BookOpen, Sparkles, CheckCircle2, Monitor, Users, Lightbulb } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";

export const metadata = generateSchoolMetadata({
  title: "Our Classrooms",
  description:
    "Explore the digitally enabled smart classrooms at SPS Global School, Jaswantnagar, Etawah. Featuring interactive smart boards, ergonomic seating, and low teacher-student ratios.",
  path: "/our-classroom"
});

export default function OurClassroomPage() {
  const features = [
    {
      title: "Interactive Smart Boards",
      desc: "Equipped with multimedia display boards, bringing lessons alive through 3D simulations, educational clips, and interactive quizzes.",
      icon: <Monitor className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "Ergonomic & Child-Safe Furnishings",
      desc: "Dual-seater desks specifically scaled to the age and posture requirements of each grade level for maximum sitting comfort.",
      icon: <CheckCircle2 className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "Natural Light & Ample Ventilation",
      desc: "Designed with large open windows and high ceilings to ensure continuous fresh air circulation and cheerful natural sunlight.",
      icon: <Lightbulb className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "Low Student-Teacher Ratio",
      desc: "Class strengths are strictly controlled to ensure every child receives personal attention, mentoring, and timely clarification of doubts.",
      icon: <Users className="w-5 h-5 text-[#A50026]" />
    }
  ];

  return (
    <>
      <PageHero
        badge="Academic Spaces"
        title="Our Classrooms"
        subtitle="Digitally enriched, cheerful, and ergonomic learning environments where young minds flourish."
        breadcrumbs={[
          { label: "Infrastructure", href: "/our-campus" },
          { label: "Our Classrooms" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                Smart Learning Spaces
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424] leading-snug">
                Where Active Learning &amp; Modern Technology Converge
              </h2>
              <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
                At SPS Global School, our classrooms are dynamic laboratories of thought rather than rigid lecture halls. Our teachers utilize audio-visual media, structured group work, and hands-on teaching aids to make complex CBSE concepts intuitive and exciting.
              </p>
              <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
                Display boards in every classroom proudly exhibit student paintings, science charts, poems, and project accomplishments, fostering immense pride in personal work.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl border-4 border-[#FCE5E9]">
                <Image
                  src="/images/classrooms/smart-classroom.png"
                  alt="SPS Global School Smart Classroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-56 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/classrooms/classroom-learning.png"
                  alt="Interactive teaching in classroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-[#FFF7F8] p-6 rounded-2xl border border-[#FCE5E9] space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs">
                  {f.icon}
                </div>
                <h3 className="font-extrabold text-base text-[#242424]">{f.title}</h3>
                <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

import React from "react";
import { ShieldCheck, BookOpen, Clock, Heart, Users, Sparkles } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";

export const metadata = generateSchoolMetadata({
  title: "Student Responsibility",
  description:
    "Student code of conduct and responsibilities at SPS Global School, Jaswantnagar, Etawah. Learn about academic honesty, discipline, attendance, and respect for school property.",
  path: "/student-responsibility"
});

export default function StudentResponsibilityPage() {
  const responsibilities = [
    {
      title: "Punctuality & Regular Attendance",
      desc: "Arrive at least 10 minutes before the morning assembly bell. Maintain at least 75% compulsory attendance as mandated by CBSE regulations.",
      icon: <Clock className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "Academic Diligence & Honesty",
      desc: "Complete homework, lab journals, and assignments conscientiously. Practice complete honesty during assessments, periodic tests, and exams.",
      icon: <BookOpen className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "Respect for Faculty & Fellow Students",
      desc: "Address teachers, administrative staff, and peers with courtesy and kindness. Refrain from bullying, harsh words, or exclusionary behavior.",
      icon: <Heart className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "Care for School Property",
      desc: "Treat smart classrooms, laboratory instruments, computers, library books, and campus flora with utmost care and respect.",
      icon: <ShieldCheck className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "Cleanliness & Proper Uniform",
      desc: "Wear the prescribed neat, ironed seasonal uniform with polished shoes and school badge daily. Keep classrooms and campus grounds clean.",
      icon: <Sparkles className="w-5 h-5 text-[#A50026]" />
    },
    {
      title: "Peer Collaboration & Team Spirit",
      desc: "Actively participate in house activities, sports tournaments, morning assemblies, and cooperative group projects.",
      icon: <Users className="w-5 h-5 text-[#A50026]" />
    }
  ];

  return (
    <>
      <PageHero
        badge="Code of Conduct"
        title="Student Responsibility"
        subtitle="Empowering students to take ownership of their learning, character, and conduct."
        breadcrumbs={[
          { label: "Information", href: "/fee-structure" },
          { label: "Student Responsibility" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
              Character &amp; Ethics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">
              Living the Values of SPS Global School
            </h2>
            <p className="text-sm text-[#626262]">
              At SPS, discipline is not imposed through fear; it is cultivated through self-respect, empathy, and personal responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {responsibilities.map((r) => (
              <div
                key={r.title}
                className="bg-[#FFF7F8] p-6 rounded-2xl border border-[#FCE5E9] hover:border-[#A50026] transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs border border-gray-100">
                  {r.icon}
                </div>
                <h3 className="font-extrabold text-base text-[#242424]">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF7EE] p-6 sm:p-8 rounded-3xl border border-[#E4D7A5] space-y-3">
            <h3 className="font-extrabold text-base text-[#242424]">
              A Note on Digital &amp; Mobile Device Policy
            </h3>
            <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
              Mobile phones and unauthorized electronic entertainment gadgets are strictly prohibited on campus. Students requiring communication with parents in emergencies may use the school office telephone system with teacher approval.
            </p>
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

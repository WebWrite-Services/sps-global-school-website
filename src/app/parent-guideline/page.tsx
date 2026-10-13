import React from "react";
import { Users2, CheckCircle2, MessageSquare, BookOpen, Clock, HeartHandshake, ShieldAlert } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";

export const metadata = generateSchoolMetadata({
  title: "Parent Guidelines",
  description:
    "Official parent guidelines at SPS Global School, Jaswantnagar, Etawah. Learn how parents and teachers collaborate to foster child independence, discipline, and academic success.",
  path: "/parent-guideline"
});

export default function ParentGuidelinePage() {
  const guidelines = [
    {
      title: "Shared Foundation in Early Childhood",
      desc: "Early childhood years are crucial and require joint efforts from both teachers and parents to develop good habits, emotional security, and discipline."
    },
    {
      title: "Encourage Independence at Home",
      desc: "Encourage children to do small age-appropriate tasks at home—such as organizing their school bag, tying shoes, and keeping their room tidy—to build self-reliance."
    },
    {
      title: "Daily Book Care & Labeling",
      desc: "Ensure children bring the required books and notebooks daily according to the class timetable, neatly covered and legibly labeled with name, class, and subject."
    },
    {
      title: "Check School Diary Daily",
      desc: "Check the school diary every evening without fail. Read teachers' remarks seriously, sign each note, and respond promptly where necessary."
    },
    {
      title: "Encourage English Communication",
      desc: "Encourage children to practice conversing in English at home to enhance their vocabulary, fluency, and conversational ease."
    },
    {
      title: "Impeccable Uniform & Hygiene",
      desc: "Ensure your ward arrives at school dressed in clean, properly ironed uniform with neatly polished shoes, trimmed nails, and neat haircut."
    },
    {
      title: "Advance Leave Applications",
      desc: "Send a written leave application in advance through the school diary or email if your child needs to be absent for medical or urgent family reasons."
    },
    {
      title: "Open Dialogue with School",
      desc: "Approach class teachers or the Principal if you observe serious emotional or behavioral changes in your child; we are here as partners in their upbringing."
    }
  ];

  return (
    <>
      <PageHero
        badge="Parent-School Partnership"
        title="Parent Guidelines"
        subtitle="Collaborative principles that help parents and educators nurture happy, disciplined, and flourishing children."
        breadcrumbs={[
          { label: "Information", href: "/fee-structure" },
          { label: "Parent Guideline" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
              Stronger Together
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">
              Partnering for Your Child&apos;s Success
            </h2>
            <p className="text-sm text-[#626262]">
              The growth of a child is most fruitful when home and school share the same values, discipline, and encouragement.
            </p>
          </div>

          <div className="space-y-4">
            {guidelines.map((g, idx) => (
              <div
                key={g.title}
                className="bg-[#FFF7F8] p-6 rounded-2xl border border-[#FCE5E9] flex items-start gap-4 hover:border-[#A50026] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#A50026] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#242424] mb-1">
                    {g.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF7EE] p-6 sm:p-8 rounded-3xl border border-[#E4D7A5] space-y-2 text-xs sm:text-sm text-[#626262]">
            <h4 className="font-bold text-sm text-[#242424] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#A50026]" />
              Parent-Teacher Meetings (PTMs)
            </h4>
            <p>
              PTMs are held regularly after term and unit assessments. Attendance of both parents is strongly advised to review subject-specific performance and personal growth trajectories.
            </p>
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

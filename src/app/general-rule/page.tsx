import React from "react";
import { ShieldCheck, AlertCircle, FileCheck, Calendar, HeartPulse, UserCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";

export const metadata = generateSchoolMetadata({
  title: "General Rules & Regulations",
  description:
    "Official school rules and institutional regulations at SPS Global School, Jaswantnagar, Etawah. Learn about communication protocols, attendance, medical policies, and visitor guidelines.",
  path: "/general-rule"
});

export default function GeneralRulePage() {
  const sections = [
    {
      title: "1. Communication & Administrative Protocols",
      icon: <FileCheck className="w-5 h-5 text-[#A50026]" />,
      rules: [
        "Any change in residential address, phone numbers, or emergency contact info must be promptly notified to the administrative office in writing.",
        "Parents can meet the Principal or class teachers on designated visiting days with a prior appointment booked through the reception desk.",
        "All official written communication should be addressed to the Class Teacher, clearly indicating student's full name, admission number, and section.",
        "Criticism of the school or teachers in the presence of children must be avoided as it can adversely affect the child's psychological balance and respect for educators."
      ]
    },
    {
      title: "2. Health, Safety & Medical Policies",
      icon: <HeartPulse className="w-5 h-5 text-[#A50026]" />,
      rules: [
        "Students suffering from contagious illnesses (such as chickenpox, measles, conjunctivitis, viral fever) must not attend school until a registered doctor issues a medical fitness certificate.",
        "First aid is administered immediately on campus in case of minor injuries. For emergencies, parents are immediately notified while the student is attended to at the nearest medical facility.",
        "Prescribed medicines required during school hours must be handed over directly to the school infirmary with written parental instructions."
      ]
    },
    {
      title: "3. Attendance & Examination Norms",
      icon: <Calendar className="w-5 h-5 text-[#A50026]" />,
      rules: [
        "It is compulsory for all students to attend school on the reopening and closing days of each term, vacation, and special celebration.",
        "Students must appear for all scheduled internal assessments and unit tests. Unexcused absence will not be accommodated with re-examinations.",
        "Minimum 75% aggregate attendance is mandatory for appearing in CBSE annual board and term promotional examinations."
      ]
    },
    {
      title: "4. Campus Discipline & Uniform Standards",
      icon: <ShieldCheck className="w-5 h-5 text-[#A50026]" />,
      rules: [
        "Wearing the prescribed seasonal uniform, identity badge, and polished shoes is compulsory on all school working days.",
        "Students must refrain from wearing precious gold jewelry, smartwatches, or carrying large sums of money to school.",
        "Any damage to laboratory apparatus, computers, library volumes, or school furniture will be subject to compensatory replacement by the student's parents."
      ]
    }
  ];

  return (
    <>
      <PageHero
        badge="Institutional Regulations"
        title="General Rules &amp; Regulations"
        subtitle="Clear, organized institutional standards ensuring a secure, orderly, and harmonious learning atmosphere."
        breadcrumbs={[
          { label: "Information", href: "/fee-structure" },
          { label: "General Rules" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
              Disciplinary Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">
              Standards for an Orderly Campus
            </h2>
            <p className="text-sm text-[#626262]">
              All students admitted to SPS Global School, along with their parents and guardians, are expected to uphold these regulations.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((sec) => (
              <div
                key={sec.title}
                className="bg-[#FFF7F8] rounded-3xl p-6 sm:p-8 border border-[#FCE5E9] space-y-4"
              >
                <div className="flex items-center gap-3 border-b border-[#FCE5E9] pb-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs">
                    {sec.icon}
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#242424]">
                    {sec.title}
                  </h3>
                </div>

                <ul className="space-y-3 pt-1">
                  {sec.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#242424]">
                      <span className="w-2 h-2 rounded-full bg-[#A50026] mt-2 shrink-0" />
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF7EE] p-6 rounded-2xl border border-[#E4D7A5] text-center max-w-2xl mx-auto text-xs text-[#626262]">
            For further queries regarding disciplinary bylaws or exemptions, please write to{" "}
            <a href="mailto:sps.globalschool@gmail.com" className="font-bold text-[#A50026] underline">
              sps.globalschool@gmail.com
            </a>
            .
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

import React from "react";
import { CheckCircle2, Shield, Bus, Award, UserCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function WhyChooseUsSection() {
  const reasons = [
    {
      icon: Award,
      title: "Recognized CBSE Affiliation",
      description:
        "Affiliated to Central Board of Secondary Education, New Delhi (Affiliation No. 2134255, School Code 72221) ensuring nationwide academic equivalence."
    },
    {
      icon: Bus,
      title: "Prime NH-19 Connectivity & Safe Buses",
      description:
        "Easily accessible campus directly located on NH-19, Kaist, Jaswantnagar with dedicated, GPS-tracked bus transport covering Etawah and nearby sectors."
    },
    {
      icon: Shield,
      title: "20+ Acres Secure Green Campus",
      description:
        "Pollution-free learning environment protected by boundary walls, round-the-clock CCTV surveillance, fire safety certificates, and clean RO drinking water."
    },
    {
      icon: UserCheck,
      title: "Individualized Mentoring & Care",
      description:
        "Low student-to-teacher ratio enabling educators to identify individual aptitudes, support struggling topics, and provide personal guidance."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FFF7F8] border-b border-[#FCE5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The SPS Advantage"
          title="Why Families in Etawah Choose"
          highlightedText="SPS Global School"
          subtitle="Four verifiable pillars that make our institution the trusted choice for hundreds of parents."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div>
                  {/* Icon — turns white on hover */}
                  <div className="w-12 h-12 rounded-2xl bg-[#FCE5E9] text-[#A50026] group-hover:bg-[#A50026] group-hover:text-white icon-box flex items-center justify-center mb-5 transition-all duration-300">
                    <Icon className="w-6 h-6 transition-colors duration-300 text-inherit" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#242424] mb-2 group-hover:text-[#A50026] transition-colors leading-snug">
                    {r.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                    {r.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-6 flex items-center gap-1.5 text-[11px] font-bold text-[#A50026]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC52E]" />
                  <span>Verified School Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

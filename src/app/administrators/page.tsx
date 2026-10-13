import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone, Shield } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { LEADERSHIP, SCHOOL_INFO } from "@/data/school";

export const metadata = generateSchoolMetadata({
  title: "Administrators",
  description:
    "Meet the administrators of SPS Global School, Jaswantnagar, Etawah. Learn about our leadership team steering academic vision and institutional excellence.",
  path: "/administrators"
});

export default function AdministratorsPage() {
  const admins = [
    {
      name: LEADERSHIP.director.name,
      role: "Director",
      image: LEADERSHIP.director.image,
      desc: "Providing strategic direction, campus development, and administrative governance to ensure world-class infrastructure and pedagogical standards.",
      messageLink: "/directors-message"
    },
    {
      name: LEADERSHIP.manager.name,
      role: "Manager",
      image: LEADERSHIP.manager.image,
      desc: "Overseeing day-to-day institutional operations, faculty enablement, community partnerships, and student welfare initiatives.",
      messageLink: "/managers-message"
    },
    {
      name: LEADERSHIP.principal.name,
      role: "Principal",
      image: LEADERSHIP.principal.image,
      desc: "Guiding the academic faculty, CBSE curriculum adherence, disciplinary standards, and individualized student enrichment programs.",
      messageLink: "/principals-message"
    }
  ];

  return (
    <>
      <PageHero
        badge="Executive Leadership"
        title="School Administrators"
        subtitle="The dedicated leadership council guiding academic standards, staff mentorship, and institutional growth."
        breadcrumbs={[{ label: "About Us", href: "/about-us" }, { label: "Administrators" }]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
              Leadership Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">
              Committed to Visionary Governance
            </h2>
            <p className="text-sm text-[#626262]">
              Our administrators bring decades of collective educational commitment under the banner of the SPS Educational Group.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {admins.map((adm) => (
              <div
                key={adm.name}
                className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#A50026] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative h-72 w-full bg-[#FFF7F8] overflow-hidden">
                    <Image
                      src={adm.image}
                      alt={adm.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#A50026] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {adm.role}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    <h3 className="font-extrabold text-lg text-[#242424] leading-snug">
                      {adm.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#A50026]">
                      {adm.role} – SPS Global School
                    </p>
                    <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                      {adm.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      href={adm.messageLink}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A50026] hover:text-[#85001F] transition-colors"
                    >
                      <span>Read Official Message</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FFC52E]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact note */}
          <div className="bg-[#FFF7F8] p-6 rounded-2xl border border-[#FCE5E9] text-center max-w-2xl mx-auto space-y-2">
            <h4 className="font-bold text-sm text-[#242424]">
              Need to Schedule an Administrative Appointment?
            </h4>
            <p className="text-xs text-[#626262]">
              Parents can book meetings with the Principal or Directors through our main office line at{" "}
              <a href={`tel:${SCHOOL_INFO.primaryPhone}`} className="text-[#A50026] font-bold">
                {SCHOOL_INFO.primaryPhone}
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

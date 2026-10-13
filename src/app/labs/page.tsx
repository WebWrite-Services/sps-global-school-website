import React from "react";
import Image from "next/image";
import { FlaskConical, Monitor, Calculator, ShieldCheck, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";

export const metadata = generateSchoolMetadata({
  title: "Laboratories (Science, Computer & Maths)",
  description:
    "Explore the high-tech computer lab, composite science laboratories, and mathematics activity room at SPS Global School, Jaswantnagar, Etawah. CBSE practical learning with certified safety.",
  path: "/labs"
});

export default function LabsPage() {
  const labs = [
    {
      title: "Composite & Advanced Science Laboratories",
      subtitle: "Physics • Chemistry • Biology",
      icon: <FlaskConical className="w-6 h-6 text-[#A50026]" />,
      image: "/images/facilities/composite-science-lab.jpg",
      secondaryImage: "/images/facilities/science-lab-1.webp",
      desc: "Equipped with high-precision optical microscopes, chemical apparatus, glass titration units, biological models, and electronic circuit boards meeting full CBSE secondary & senior secondary specifications.",
      features: [
        "Individual experimental stations with gas burners and sink taps",
        "Eye-wash units, first aid kits, and dry chemical fire extinguishers installed",
        "Supervised strictly by qualified lab instructors and science mentors",
        "Weekly practical sessions integrated into the core class timetable"
      ]
    },
    {
      title: "High-Tech Computer & ICT Laboratory",
      subtitle: "Digital Literacy • Coding • AI Awareness",
      icon: <Monitor className="w-6 h-6 text-[#A50026]" />,
      image: "/images/facilities/computer-lab.jpg",
      secondaryImage: "/images/classrooms/smart-classroom.png",
      desc: "Designed with modern desktop systems connected to high-speed broadband and an uninterrupted power backup system. Enables hands-on coding, logic building, multimedia creation, and cyber security education.",
      features: [
        "Individual computer terminal per student during practical periods",
        "Curriculum covering Python, Scratch, Web Fundamentals & Office suites",
        "Strict firewall filters ensuring safe, protected internet access",
        "Air-conditioned and dust-free environment with ergonomic seating"
      ]
    },
    {
      title: "Mathematics Activity Laboratory",
      subtitle: "Tactile Math • Geometry • Logic Puzzles",
      icon: <Calculator className="w-6 h-6 text-[#A50026]" />,
      image: "/images/facilities/maths-lab.jpg",
      secondaryImage: "/images/facilities/composite-science-lab.jpg",
      desc: "Transforms abstract numbers, coordinate geometry, and algebraic theorems into hands-on physical models. Eliminates mathematics apprehension by demonstrating real-life applications through measurement and puzzles.",
      features: [
        "Wooden 3D geometric polyhedrons, conic sections & trigonometry kits",
        "Abacus, algebraic tiles, and tangram calculation boards",
        "Math Olympiad problem-solving practice cells",
        "Concept verification through visual measurement and geometry"
      ]
    }
  ];

  return (
    <>
      <PageHero
        badge="Experimental STEM Infrastructure"
        title="Laboratories &amp; Practical Learning"
        subtitle="Where hypotheses are tested, code is compiled, and mathematical insights come to life through hands-on practice."
        breadcrumbs={[
          { label: "Infrastructure", href: "/our-campus" },
          { label: "Laboratories" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
              Learning by Doing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">
              State-of-the-Art Practical Learning Facilities
            </h2>
            <p className="text-sm text-[#626262]">
              SPS Global School maintains fully equipped, CBSE-compliant laboratory facilities across all scientific disciplines to ensure every student gains real practical fluency.
            </p>
          </div>

          <div className="space-y-16">
            {labs.map((lab, idx) => (
              <div
                key={lab.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual */}
                <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-[#FCE5E9]">
                    <Image
                      src={lab.image}
                      alt={lab.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 p-2.5 rounded-2xl shadow-xs">
                      {lab.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 space-y-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                    {lab.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#242424]">
                    {lab.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                    {lab.desc}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {lab.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#242424]">
                        <CheckCircle2 className="w-4 h-4 text-[#A50026] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
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

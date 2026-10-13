import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Lightbulb, Compass, Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AcademicLearningSection() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Curricular Philosophy"
          title="Fostering Deep Conceptual Mastery"
          highlightedText="&amp; Critical Thinking"
          subtitle="How our pedagogy transforms passive classroom listening into active intellectual discovery."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Photographic Editorial Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FCE5E9]">
              <div className="relative h-96 w-full">
                <Image
                  src="/images/classrooms/classroom-learning.png"
                  alt="Students engaged in interactive conceptual learning"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Overlapping Info Pill */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A50026] text-white flex items-center justify-center">
                <Award className="w-5 h-5 text-[#FFC52E]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#242424]">CBSE Board Standards</div>
                <div className="text-[11px] text-[#626262]">Experiential STEM Curriculum</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text & Pedagogical Features */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#242424] leading-snug">
                Learning that connects textbooks to the real world.
              </h3>
              <p className="text-sm text-[#626262] leading-relaxed">
                At SPS Global School, education is not a race to memorize facts for an exam. We prioritize conceptual clarity, scientific reasoning, and verbal expression. Our teachers act as mentors, guiding students to question assumptions, experiment in laboratories, and collaborate on group investigations.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 bg-[#FFF7F8] p-4 rounded-2xl border border-[#FCE5E9]">
                <div className="w-9 h-9 rounded-xl bg-[#A50026] text-white flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-[#FFC52E]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#242424]">
                    Inquiry-Driven &amp; Activity-Based Pedagogy
                  </h4>
                  <p className="text-xs text-[#626262] mt-0.5 leading-relaxed">
                    Students explore mathematical models, science kits, and literary themes through structured projects that stimulate natural curiosity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-[#FFF7F8] p-4 rounded-2xl border border-[#FCE5E9]">
                <div className="w-9 h-9 rounded-xl bg-[#A50026] text-white flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-[#FFC52E]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#242424]">
                    Continuous Mentoring &amp; Regular Diagnostic Reviews
                  </h4>
                  <p className="text-xs text-[#626262] mt-0.5 leading-relaxed">
                    Periodic formative assessments and constructive feedback help identify learning gaps early, ensuring no student is left behind.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/admission-form-2026-27"
                className="inline-flex items-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
              >
                <span>Enroll for Session 2026–27</span>
                <ArrowRight className="w-4 h-4 text-[#FFC52E]" />
              </Link>
              <Link
                href="/fee-structure"
                className="text-xs sm:text-sm font-bold text-[#A50026] hover:underline"
              >
                View Fee Structure →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

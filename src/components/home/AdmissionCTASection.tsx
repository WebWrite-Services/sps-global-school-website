import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, Sparkles, GraduationCap } from "lucide-react";
import Button from "@/components/ui/Button";
import { SCHOOL_INFO } from "@/data/school";

export default function AdmissionCTASection() {
  return (
    <section className="py-16 lg:py-20 bg-[#FCE5E9] border-y border-[#A50026]/10 relative overflow-hidden">
      {/* Decorative Gold Circles */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#FFC52E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-60 h-60 bg-[#A50026]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#A50026] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FFC52E]" />
          <span>New Session 2026–2027</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#242424] tracking-tight leading-tight">
          Give Your Child the <span className="text-[#A50026]">Right Start.</span>
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#626262] max-w-2xl mx-auto leading-relaxed">
          &ldquo;Discover a learning environment where students are encouraged to grow, explore, and achieve their potential.&rdquo;
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button href="/admission-form-2026-27" variant="primary" size="lg">
            <GraduationCap className="w-5 h-5 text-[#FFC52E]" />
            <span>Apply for Admission</span>
          </Button>

          <Button href="/contact-us" variant="secondary" size="lg">
            <PhoneCall className="w-4 h-4" />
            <span>Enquire Now</span>
          </Button>
        </div>

        <div className="pt-4 text-xs text-[#626262]">
          Admissions Helpdesk:{" "}
          <a
            href={`tel:${SCHOOL_INFO.primaryPhone}`}
            className="font-bold text-[#A50026] hover:underline"
          >
            {SCHOOL_INFO.primaryPhone}
          </a>{" "}
          |{" "}
          <a
            href={`tel:${SCHOOL_INFO.secondaryPhone}`}
            className="font-bold text-[#A50026] hover:underline"
          >
            {SCHOOL_INFO.secondaryPhone}
          </a>
        </div>
      </div>
    </section>
  );
}

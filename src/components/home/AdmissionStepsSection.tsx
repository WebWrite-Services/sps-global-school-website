import React from "react";
import { ADMISSION_STEPS } from "@/data/school";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AdmissionStepsSection() {
  return (
    <section className="py-14 lg:py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Smooth &amp; Transparent Enrollment"
          title="From Application to Admission,"
          highlightedText="in Just 6 Steps"
          subtitle="A simple, welcoming, and parent-friendly admission process designed for peace of mind."
        />

        {/* 6 Steps Grid / Timeline */}
        <div className="relative mt-8">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-10 left-12 right-12 h-0.5 border-t-2 border-dashed border-[#A50026]/30 z-0" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {ADMISSION_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="flex flex-col items-center text-center group"
              >
                {/* Step Circle */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md ${
                    idx === 5
                      ? "bg-[#FFC52E] text-[#242424] border-4 border-[#A50026]"
                      : "bg-[#FFF7F8] text-[#A50026] border-2 border-[#A50026] group-hover:bg-[#A50026] group-hover:text-white"
                  }`}
                >
                  <span className="text-[11px] font-bold tracking-wider opacity-80">STEP</span>
                  <span className="text-lg sm:text-xl font-extrabold leading-none">{step.step}</span>
                </div>

                {/* Title */}
                <h4 className="mt-4 font-bold text-xs sm:text-sm text-[#242424] group-hover:text-[#A50026] transition-colors">
                  {step.title}
                </h4>

                {/* Description */}
                <p className="mt-1.5 text-[11px] sm:text-xs text-[#626262] leading-snug">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

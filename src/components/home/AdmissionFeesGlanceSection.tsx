"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building,
  Sparkles,
  ShieldCheck,
  BookOpen,
  FlaskConical,
  Trophy,
  Music,
  Lock
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { FEE_STRUCTURE_DATA, REQUIRED_DOCUMENTS } from "@/data/school";

export default function AdmissionFeesGlanceSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const activeRow = FEE_STRUCTURE_DATA[activeTab];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Affordable Excellence"
          title="Annual Fees at a"
          highlightedText="Glance"
          subtitle="Transparent, value-driven CBSE education fees with sibling discounts and installment plans for Session 2026–27."
        />

        {/* Tab Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {FEE_STRUCTURE_DATA.map((row, index) => (
            <button
              key={row.classGroup}
              onClick={() => setActiveTab(index)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === index
                  ? "bg-[#A50026] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-[#FCE5E9] hover:text-[#A50026]"
              }`}
            >
              {row.classGroup}
            </button>
          ))}
        </div>

        {/* Warm Cream / Beige Featured Fee Card (Orchids Style) */}
        <div className="bg-[#FAF7EE] border-2 border-[#E4D7A5] rounded-3xl p-6 sm:p-10 mb-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Graphic */}
            <div className="lg:col-span-4 relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#E4D7A5]">
              <Image
                src="/images/campus/main-building.jpg"
                alt="SPS Global School Campus"
                fill
                sizes="(max-width: 1024px) 100vw, 350px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold">
                  SPS Global School • Jaswantnagar
                </span>
              </div>
            </div>

            {/* Center: Details */}
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-block bg-[#A50026] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {activeRow.classGroup}
              </div>
              <div className="text-2xl sm:text-4xl font-extrabold text-[#A50026]">
                ₹{activeRow.yearlyTotal.toLocaleString("en-IN")}
                <span className="text-xs sm:text-sm font-normal text-gray-600 ml-1">
                  / academic year
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                Includes Tuition Fee (₹{activeRow.tuitionFeePerMonth.toLocaleString("en-IN")}/mo), Exam Fee, Activity Fee, and Annual charges. Payable in 4 flexible quarterly installments.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl w-fit">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>10% concession on upfront full annual fee deposit!</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <a
                href="/documents/fee-structure-2026-27.pdf"
                download
                className="w-full inline-flex items-center justify-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 text-[#FFC52E]" />
                <span>Download Fee PDF</span>
              </a>

              <Link
                href="/fee-structure"
                className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FCE5E9] border-2 border-[#A50026] text-[#A50026] font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors"
              >
                <span>Full Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3-Column Experience Strips (Exact Match to Orchids Reference Screenshot 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Documents Checklist */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-base text-[#242424] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A50026]" />
                Keep These Documents Ready
              </h3>
              <ul className="space-y-2.5">
                {REQUIRED_DOCUMENTS.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#626262]">
                    <CheckCircle2 className="w-4 h-4 text-[#A50026] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-100 mt-6">
              <Link
                href="/admission-form-2026-27"
                className="text-xs font-bold text-[#A50026] hover:underline flex items-center gap-1"
              >
                <span>Upload in Online Form</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFC52E]" />
              </Link>
            </div>
          </div>

          {/* Card 2: Come, Experience SPS */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-base text-[#242424] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFC52E]" />
                Come, Experience SPS
              </h3>

              <div className="grid grid-cols-2 gap-2.5 mb-6">
                <div className="bg-[#FFF7F8] p-2.5 rounded-xl text-center border border-[#FCE5E9]">
                  <BookOpen className="w-4 h-4 text-[#A50026] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#242424] block">Modern Classrooms</span>
                </div>
                <div className="bg-[#FFF7F8] p-2.5 rounded-xl text-center border border-[#FCE5E9]">
                  <FlaskConical className="w-4 h-4 text-[#A50026] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#242424] block">STEM Science Labs</span>
                </div>
                <div className="bg-[#FFF7F8] p-2.5 rounded-xl text-center border border-[#FCE5E9]">
                  <Trophy className="w-4 h-4 text-[#A50026] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#242424] block">Sports Facilities</span>
                </div>
                <div className="bg-[#FFF7F8] p-2.5 rounded-xl text-center border border-[#FCE5E9]">
                  <Music className="w-4 h-4 text-[#A50026] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#242424] block">Music &amp; Dance</span>
                </div>
                <div className="bg-[#FFF7F8] p-2.5 rounded-xl text-center border border-[#FCE5E9]">
                  <Building className="w-4 h-4 text-[#A50026] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#242424] block">Rich Library</span>
                </div>
                <div className="bg-[#FFF7F8] p-2.5 rounded-xl text-center border border-[#FCE5E9]">
                  <ShieldCheck className="w-4 h-4 text-[#A50026] mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-[#242424] block">Safe Environment</span>
                </div>
              </div>
            </div>

            <Link
              href="/contact-us"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#FFC52E]" />
              <span>Schedule a Campus Walk-In</span>
            </Link>
          </div>

          {/* Card 3: Photo Card with Gold CTA */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="relative h-48 w-full">
              <Image
                src="/images/activities/co-curricular.webp"
                alt="Student engaged in hands-on learning at SPS"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                World-class infrastructure, a nurturing environment, and confident learners on every campus. Experience holistic education at SPS Global School.
              </p>
              <Link
                href="/our-campus"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FFC52E] hover:bg-[#E5AD1F] text-[#242424] font-extrabold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-xs"
              >
                <span>Explore Campus →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

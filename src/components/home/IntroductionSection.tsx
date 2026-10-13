import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SCHOOL_INFO } from "@/data/school";

export default function IntroductionSection() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              align="left"
              badge="Discover SPS Global School"
              title="A Nurturing Sanctuary for"
              highlightedText="Tomorrow's Leaders"
              subtitle="Where intellectual rigor meets compassionate character on NH-19, Jaswantnagar, Etawah."
            />

            <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
              Established under the esteemed aegis of <span className="font-semibold text-[#242424]">{SCHOOL_INFO.parentTrust}</span>, SPS Global School is an English Medium Senior Secondary Institution affiliated to CBSE, New Delhi (Affiliation No. 2134255).
            </p>

            <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
              We are dedicated to providing a transformative educational journey that balances academic brilliance with sporting vigor, cultural sensitivity, and ethical grounding. Our pollution-free 20+ acre campus offers children the freedom and state-of-the-art facilities to explore their interests fearlessly.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#A50026] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#242424]">
                  CBSE Affiliated Curricular Excellence
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#A50026] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#242424]">
                  Modern Smart Digital Classrooms
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#A50026] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#242424]">
                  Full-fledged Science &amp; Computer Labs
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#A50026] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#242424]">
                  Safe, Reliable Transport Across Etawah
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button href="/about-us" variant="primary" size="md">
                <span>Read More About Us</span>
                <ArrowRight className="w-4 h-4 text-[#FFC52E]" />
              </Button>
              <Link
                href="/vision-mission"
                className="text-xs sm:text-sm font-bold text-[#A50026] hover:underline"
              >
                Our Vision &amp; Mission →
              </Link>
            </div>
          </div>

          {/* Right Column: Photographic Imagery & Gold Accent */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Campus Image */}
              <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-[#FCE5E9]">
                <Image
                  src="/images/campus/main-building.jpg"
                  alt="SPS Global School Main Campus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-8 -left-6 sm:-left-10 w-44 sm:w-60 h-36 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
                <Image
                  src="/images/classrooms/smart-classroom.png"
                  alt="SPS Global School Smart Classroom"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-[#FFC52E] text-[#242424] p-4 rounded-2xl shadow-lg border-2 border-white flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#A50026]" />
                <div>
                  <div className="font-extrabold text-xs uppercase tracking-wider">
                    CBSE Affiliated
                  </div>
                  <div className="text-[11px] font-semibold text-[#242424]/80">
                    Affiliation No. 2134255
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

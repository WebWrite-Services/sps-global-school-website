import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Award, Users, BookOpen, ArrowRight, ShieldCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { SCHOOL_INFO, LEADERSHIP } from "@/data/school";

export const metadata = generateSchoolMetadata({
  title: "About Us",
  description:
    "Learn about SPS Global School, Jaswantnagar, Etawah. Discover our CBSE curriculum, educational legacy, campus infrastructure, and commitment to holistic student growth.",
  path: "/about-us"
});

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        badge="Institutional Heritage"
        title="About SPS Global School"
        subtitle="An English Medium Senior Secondary Institution Affiliated to CBSE, New Delhi (Affiliation No: 2134255)."
        breadcrumbs={[{ label: "About Us" }]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Section 1: Introduction & Legacy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block bg-[#FCE5E9] text-[#A50026] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Our Foundation
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424] leading-snug">
                Nurturing Potential. Inspiring Excellence. Transforming Futures.
              </h2>
              <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
                Founded with a resolute commitment to bringing world-class educational opportunities to Jaswantnagar and the greater Etawah region, SPS Global School functions under the visionary umbrella of <span className="font-semibold text-[#242424]">{SCHOOL_INFO.parentTrust}</span>.
              </p>
              <p className="text-sm sm:text-base text-[#626262] leading-relaxed">
                Affiliated with the Central Board of Secondary Education (CBSE), New Delhi, the institution offers a continuum of education spanning foundational pre-primary grades (Play Group / Nursery) through Senior Secondary graduation (Class XII).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#242424]">
                  <CheckCircle2 className="w-4 h-4 text-[#A50026]" />
                  <span>CBSE Affiliation No: 2134255</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#242424]">
                  <CheckCircle2 className="w-4 h-4 text-[#A50026]" />
                  <span>School Code: 72221</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#242424]">
                  <CheckCircle2 className="w-4 h-4 text-[#A50026]" />
                  <span>20+ Acre Pollution-Free Campus</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#242424]">
                  <CheckCircle2 className="w-4 h-4 text-[#A50026]" />
                  <span>Complete STEM &amp; Digital Labs</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-[#FCE5E9]">
                <Image
                  src="/images/campus/main-building.jpg"
                  alt="SPS Global School campus front view"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Educational Philosophy */}
          <div className="bg-[#FFF7F8] rounded-3xl p-8 sm:p-12 border border-[#FCE5E9]">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                Guiding Philosophy
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#242424]">
                A Harmonious Blend of Culture and Technology
              </h3>
              <p className="text-sm text-[#626262] leading-relaxed">
                &ldquo;We, at SPS, are led by our vision of providing valuable learning experiences and quality education to our students with the blend of technology and culture.&rdquo;
              </p>
              <p className="text-sm text-[#626262] leading-relaxed">
                While digital smart boards and coding curriculum ensure our students remain at the forefront of contemporary technological developments, our daily morning assemblies, community values, and ethical mentoring ensure they remain grounded in empathy, respect, and Indian cultural virtues.
              </p>
            </div>
          </div>

          {/* Section 3: Leadership Snapshot */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                Administrative Council
              </span>
              <h3 className="text-2xl font-extrabold text-[#242424]">
                Steered by Committed Educational Leaders
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center space-y-3">
                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#A50026]">
                  <Image
                    src={LEADERSHIP.director.image}
                    alt={LEADERSHIP.director.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-extrabold text-sm text-[#242424]">{LEADERSHIP.director.name}</h4>
                <p className="text-xs text-[#A50026] font-semibold">Director</p>
                <Link
                  href="/directors-message"
                  className="inline-block text-xs font-bold text-[#85001F] hover:underline"
                >
                  Director&apos;s Message →
                </Link>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center space-y-3">
                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#A50026]">
                  <Image
                    src={LEADERSHIP.manager.image}
                    alt={LEADERSHIP.manager.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-extrabold text-sm text-[#242424]">{LEADERSHIP.manager.name}</h4>
                <p className="text-xs text-[#A50026] font-semibold">Manager</p>
                <Link
                  href="/managers-message"
                  className="inline-block text-xs font-bold text-[#85001F] hover:underline"
                >
                  Manager&apos;s Message →
                </Link>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center space-y-3">
                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#A50026]">
                  <Image
                    src={LEADERSHIP.principal.image}
                    alt={LEADERSHIP.principal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-extrabold text-sm text-[#242424]">{LEADERSHIP.principal.name}</h4>
                <p className="text-xs text-[#A50026] font-semibold">Principal</p>
                <Link
                  href="/principals-message"
                  className="inline-block text-xs font-bold text-[#85001F] hover:underline"
                >
                  Principal&apos;s Message →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

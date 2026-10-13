import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { LEADERSHIP } from "@/data/school";

export const metadata = generateSchoolMetadata({
  title: "Director's Message",
  description:
    "Read the official address from Shri Vishwanath Pratap Singh Yadav (Sonu Yadav), Director of SPS Global School, Jaswantnagar, Etawah.",
  path: "/directors-message"
});

export default function DirectorsMessagePage() {
  const director = LEADERSHIP.director;

  return (
    <>
      <PageHero
        badge="Executive Vision"
        title="Director's Message"
        subtitle="Address by Shri Vishwanath Pratap Singh Yadav (Sonu Yadav), Director, SPS Global School."
        breadcrumbs={[
          { label: "About Us", href: "/about-us" },
          { label: "Director's Message" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Director Portrait Card */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-[#FFF7F8] p-4 rounded-3xl border-2 border-[#A50026]/20 shadow-lg text-center">
                <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={director.image}
                    alt={director.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <h3 className="font-extrabold text-lg text-[#242424] leading-snug">
                  {director.name}
                </h3>
                <p className="text-xs font-bold text-[#A50026] mt-1">
                  Director – SPS Global School
                </p>
                <div className="mt-3 pt-3 border-t border-[#FCE5E9] text-[11px] text-[#626262]">
                  SPS Educational Group • Jaswantnagar, Etawah
                </div>
              </div>

              {/* Quick links to other messages */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-2 text-xs">
                <span className="font-bold text-[#242424] block uppercase tracking-wider text-[10px]">
                  Other Leadership Messages:
                </span>
                <Link
                  href="/managers-message"
                  className="block text-[#A50026] hover:underline font-semibold"
                >
                  → Read Manager&apos;s Message
                </Link>
                <Link
                  href="/principals-message"
                  className="block text-[#A50026] hover:underline font-semibold"
                >
                  → Read Principal&apos;s Message
                </Link>
              </div>
            </div>

            {/* Message Content */}
            <div className="md:col-span-7 space-y-6">
              <div className="relative pl-6">
                <Quote className="w-8 h-8 text-[#FFC52E] absolute left-0 top-0" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#242424] leading-snug">
                  &ldquo;Nurturing curious, confident, and values-driven future leaders.&rdquo;
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#626262] leading-relaxed border-t border-gray-100 pt-6">
                {director.fullMessage.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Signature block */}
              <div className="pt-6 border-t border-gray-100">
                <p className="font-extrabold text-base text-[#242424]">
                  Vishwanath Pratap Singh Yadav (Sonu Yadav)
                </p>
                <p className="text-xs font-semibold text-[#A50026]">
                  Director, SPS Global School, Jaswantnagar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

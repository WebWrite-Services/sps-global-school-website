import React from "react";
import { Clock, AlertCircle, Sun, CloudSnow, CheckCircle2, Calendar } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { TIMINGS } from "@/data/school";

export const metadata = generateSchoolMetadata({
  title: "School Timing",
  description:
    "Official school opening and closing timings at SPS Global School, Jaswantnagar, Etawah. Check summer and winter bell schedules, arrival rules, and gate policies.",
  path: "/school-timing"
});

export default function SchoolTimingPage() {
  return (
    <>
      <PageHero
        badge="Daily Schedule"
        title="School Timings"
        subtitle="Official bell schedules and operational timings for students across academic sessions."
        breadcrumbs={[
          { label: "Information", href: "/fee-structure" },
          { label: "School Timing" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Active Schedule Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Winter Schedule */}
            <div className="bg-[#FFF7F8] rounded-3xl p-8 border-2 border-[#A50026] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#A50026] text-white flex items-center justify-center">
                  <CloudSnow className="w-6 h-6 text-[#FFC52E]" />
                </div>
                <span className="bg-[#A50026] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Current Active Schedule
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                  Winter Timings
                </span>
                <h3 className="text-2xl font-extrabold text-[#242424] mt-1">
                  8:30 AM – 2:00 PM
                </h3>
                <p className="text-xs text-[#626262] mt-1">
                  Monday to Saturday (Nursery to Class XII)
                </p>
              </div>

              <div className="pt-4 border-t border-[#FCE5E9] space-y-2 text-xs text-[#242424]">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A50026]" />
                  <span>Morning Assembly starts at 8:35 AM sharp</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A50026]" />
                  <span>Lunch Recess: 11:30 AM – 12:00 PM</span>
                </p>
              </div>
            </div>

            {/* Summer Schedule */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-amber-600" />
                </div>
                <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Summer Session
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Summer Timings
                </span>
                <h3 className="text-2xl font-extrabold text-[#242424] mt-1">
                  7:30 AM – 1:30 PM
                </h3>
                <p className="text-xs text-[#626262] mt-1">
                  Monday to Saturday (As notified by District Administration)
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-600">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400" />
                  <span>Morning Assembly starts at 7:35 AM</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400" />
                  <span>Lunch Recess: 10:45 AM – 11:15 AM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Important Timing Guidelines */}
          <div className="bg-[#FAF7EE] border-2 border-[#E4D7A5] rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-extrabold text-base sm:text-lg text-[#242424] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#A50026]" />
              Important Arrival &amp; Departure Rules
            </h3>

            <ul className="space-y-3">
              {TIMINGS.importantNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-[#242424]">
                  <span className="w-5 h-5 rounded-full bg-[#A50026] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

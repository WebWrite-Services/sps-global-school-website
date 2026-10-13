import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, AlertCircle, Sparkles, CheckCircle2, Phone, FileText } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { FEE_STRUCTURE_DATA, FEE_NOTES, SCHOOL_INFO } from "@/data/school";

export const metadata = generateSchoolMetadata({
  title: "Fee Structure (Session 2026-27)",
  description:
    "Official CBSE school fee structure for Academic Session 2026-27 at SPS Global School, Jaswantnagar, Etawah. View class-wise tuition, admission fees, installments, and sibling concessions.",
  path: "/fee-structure"
});

export default function FeeStructurePage() {
  return (
    <>
      <PageHero
        badge="Session 2026–27"
        title="School Fee Structure"
        subtitle="Transparent, affordable, and approved fee schedules for English Medium Senior Secondary Classes (Play to XII)."
        breadcrumbs={[
          { label: "Information", href: "/fee-structure" },
          { label: "Fee Structure" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Banner with Download Button */}
          <div className="bg-[#FFF7F8] p-6 sm:p-8 rounded-3xl border-2 border-[#A50026]/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                Approved by Management Committee
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#242424]">
                Official Fee Schedule for Academic Session 2026–2027
              </h2>
              <p className="text-xs sm:text-sm text-[#626262]">
                SPS Global School • Affiliated to CBSE New Delhi • NH-2 / NH-19 Kaist, Jaswantnagar, Etawah
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/documents/fee-structure-2026-27.pdf"
                download
                className="inline-flex items-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white font-extrabold px-5 py-3 rounded-full text-xs sm:text-sm transition-colors shadow-md"
              >
                <Download className="w-4 h-4 text-[#FFC52E]" />
                <span>Download Signed Fee PDF</span>
              </a>
            </div>
          </div>

          {/* Full Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-[#242424]">
                Class-wise Fee Breakdown
              </h3>
              <span className="text-xs text-gray-500 hidden sm:inline">
                * All amounts displayed in Indian Rupees (₹)
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#A50026] text-white">
                    <th className="p-3 font-bold border-r border-[#85001F]">Sr.</th>
                    <th className="p-3 font-bold border-r border-[#85001F]">Class Group</th>
                    <th className="p-3 font-bold border-r border-[#85001F]">Reg. Fee</th>
                    <th className="p-3 font-bold border-r border-[#85001F]">Adm. Fee</th>
                    <th className="p-3 font-bold border-r border-[#85001F]">Activity</th>
                    <th className="p-3 font-bold border-r border-[#85001F]">Annual</th>
                    <th className="p-3 font-bold border-r border-[#85001F]">Exam</th>
                    <th className="p-3 font-bold border-r border-[#85001F]">Tuition (Apr–Jun)</th>
                    <th className="p-3 font-bold border-r border-[#85001F] bg-[#85001F]">1st Inst.</th>
                    <th className="p-3 font-bold border-r border-[#85001F]">2nd Inst.</th>
                    <th className="p-3 font-bold border-r border-[#85001F]">3rd Inst.</th>
                    <th className="p-3 font-bold border-r border-[#85001F]">4th Inst.</th>
                    <th className="p-3 font-bold bg-[#FFC52E] text-[#242424]">Yearly Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {FEE_STRUCTURE_DATA.map((row, idx) => (
                    <tr
                      key={row.classGroup}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                    >
                      <td className="p-3 font-bold text-gray-500 border-r border-gray-100">
                        {row.srNo}
                      </td>
                      <td className="p-3 font-extrabold text-[#A50026] border-r border-gray-100">
                        {row.classGroup}
                      </td>
                      <td className="p-3 border-r border-gray-100">₹{row.registrationFee}</td>
                      <td className="p-3 border-r border-gray-100">₹{row.admissionFee}</td>
                      <td className="p-3 border-r border-gray-100">₹{row.activityFee}</td>
                      <td className="p-3 border-r border-gray-100">₹{row.annualFee}</td>
                      <td className="p-3 border-r border-gray-100">₹{row.examFee}</td>
                      <td className="p-3 border-r border-gray-100 text-gray-600">
                        ₹{row.tuitionFeePerMonth} × 3 = ₹{row.tuitionFeeQuarterly}
                      </td>
                      <td className="p-3 font-bold text-[#85001F] bg-[#FFF7F8] border-r border-gray-100">
                        ₹{row.installment1.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3 border-r border-gray-100">
                        ₹{row.installment2.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3 border-r border-gray-100">
                        ₹{row.installment3.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3 border-r border-gray-100">
                        ₹{row.installment4.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3 font-extrabold text-[#A50026] bg-[#FAF7EE]">
                        ₹{row.yearlyTotal.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fee Policy & Notes */}
          <div className="bg-[#FAF7EE] border-2 border-[#E4D7A5] rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-extrabold text-base sm:text-lg text-[#242424] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#A50026]" />
              Important Fee Guidelines &amp; Sibling Concessions
            </h3>

            <ul className="space-y-3">
              {FEE_NOTES.map((note, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-[#242424]">
                  <span className="w-5 h-5 rounded-full bg-[#A50026] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[#E4D7A5] text-[11px] text-gray-500 italic">
              * Fee once paid will not be refunded or transferred under any condition. Cheque or online bank transfer receipts should be preserved for record.
            </div>
          </div>

          {/* Official Signatories & Campus Verification */}
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs text-gray-600">
            <div>
              <p className="font-extrabold text-[#242424] text-sm">Mr. Bhaskar Sharma</p>
              <p className="text-[#A50026] font-semibold">Principal</p>
            </div>
            <div>
              <p className="font-extrabold text-[#242424] text-sm">Ashutosh Yadav</p>
              <p className="text-[#A50026] font-semibold">Manager</p>
            </div>
            <div>
              <p className="font-extrabold text-[#242424] text-sm">Lt. Mahaveer Singh Yadav</p>
              <p className="text-[#A50026] font-semibold">Founder &amp; Inspiration</p>
            </div>
          </div>

          {/* Fee Enquiry Banner */}
          <div className="bg-[#FFF7F8] p-6 rounded-2xl border border-[#FCE5E9] text-center space-y-3 max-w-xl mx-auto">
            <h4 className="font-bold text-sm text-[#242424]">
              Have questions regarding installments or transport fee?
            </h4>
            <div className="flex items-center justify-center gap-4 text-xs font-semibold text-[#A50026]">
              <a href={`tel:${SCHOOL_INFO.primaryPhone}`} className="hover:underline flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {SCHOOL_INFO.primaryPhone}
              </a>
              <span>•</span>
              <a href={`tel:${SCHOOL_INFO.secondaryPhone}`} className="hover:underline flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {SCHOOL_INFO.secondaryPhone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

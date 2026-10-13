import React from "react";
import Link from "next/link";
import { Download, FileText, CheckCircle2, ShieldCheck, ExternalLink } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { generateSchoolMetadata } from "@/lib/seo";
import { MANDATORY_PUBLIC_DISCLOSURE } from "@/data/publicDisclosure";
import { SCHOOL_INFO } from "@/data/school";

export const metadata = generateSchoolMetadata({
  title: "Mandatory Public Disclosure (Appendix-IX)",
  description:
    "Official CBSE Mandatory Public Disclosure (Appendix-IX Circular No: 09/2021) for SPS Global School, Jaswantnagar, Etawah. Affiliation No. 2134255, School Code 72221.",
  path: "/public-disclosure"
});

export default function PublicDisclosurePage() {
  const { circular, generalInfo, documents, staffDetails } = MANDATORY_PUBLIC_DISCLOSURE;

  return (
    <>
      <PageHero
        badge="Regulatory Compliance"
        title="Mandatory Public Disclosure"
        subtitle="Statutory institutional information and document archives published as per CBSE Circular No. 09/2021."
        breadcrumbs={[{ label: "Public Disclosure" }]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Circular Notice Header */}
          <div className="bg-[#FFF7F8] p-6 sm:p-8 rounded-3xl border-2 border-[#A50026]/20 shadow-sm text-center md:text-left space-y-2">
            <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider block">
              Official Disclosure Notice
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#242424]">
              {circular}
            </h2>
            <p className="text-xs sm:text-sm text-[#626262]">
              SPS Global School, NH-19 Agra Road, Jaswantnagar, Etawah (U.P.) – 206245 | CBSE Affiliation No: 2134255
            </p>
          </div>

          {/* Table A: General Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-[#A50026] pb-2">
              <span className="w-3 h-3 rounded-full bg-[#A50026]" />
              <h3 className="font-extrabold text-base sm:text-lg text-[#242424]">
                A. GENERAL INFORMATION
              </h3>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#A50026] text-white">
                    <th className="p-3.5 font-bold w-16 border-r border-[#85001F]">S.No.</th>
                    <th className="p-3.5 font-bold w-1/3 border-r border-[#85001F]">Information</th>
                    <th className="p-3.5 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {generalInfo.map((row, idx) => (
                    <tr key={row.sNo} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                      <td className="p-3.5 font-bold text-gray-500 border-r border-gray-100">
                        {row.sNo}
                      </td>
                      <td className="p-3.5 font-semibold text-[#242424] border-r border-gray-100">
                        {row.item}
                      </td>
                      <td className="p-3.5 font-medium text-[#626262]">
                        {row.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table B: Documents & Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-[#A50026] pb-2">
              <span className="w-3 h-3 rounded-full bg-[#A50026]" />
              <h3 className="font-extrabold text-base sm:text-lg text-[#242424]">
                B. DOCUMENTS AND INFORMATION
              </h3>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#A50026] text-white">
                    <th className="p-3.5 font-bold w-16 border-r border-[#85001F]">S.No.</th>
                    <th className="p-3.5 font-bold border-r border-[#85001F]">Documents / Certificates</th>
                    <th className="p-3.5 font-bold w-48 text-center">Verified Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {documents.map((doc, idx) => (
                    <tr key={doc.sNo} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                      <td className="p-3.5 font-bold text-gray-500 border-r border-gray-100">
                        {doc.sNo}
                      </td>
                      <td className="p-3.5 font-medium text-[#242424] border-r border-gray-100">
                        {doc.title}
                      </td>
                      <td className="p-3.5 text-center">
                        <a
                          href={doc.fileUrl}
                          download
                          className="inline-flex items-center gap-1.5 bg-[#FFF7F8] hover:bg-[#A50026] text-[#A50026] hover:text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors border border-[#A50026]/30 shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>View PDF</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table C: Staff Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-[#A50026] pb-2">
              <span className="w-3 h-3 rounded-full bg-[#A50026]" />
              <h3 className="font-extrabold text-base sm:text-lg text-[#242424]">
                C. STAFF (TEACHING) DETAILS
              </h3>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#A50026] text-white">
                    <th className="p-3.5 font-bold w-16 border-r border-[#85001F]">S.No.</th>
                    <th className="p-3.5 font-bold w-1/3 border-r border-[#85001F]">Parameter</th>
                    <th className="p-3.5 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {staffDetails.map((staff, idx) => (
                    <tr key={staff.sNo} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                      <td className="p-3.5 font-bold text-gray-500 border-r border-gray-100">
                        {staff.sNo}
                      </td>
                      <td className="p-3.5 font-semibold text-[#242424] border-r border-gray-100">
                        {staff.item}
                      </td>
                      <td className="p-3.5 font-medium text-[#626262]">
                        {staff.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF7EE] border border-[#E4D7A5] text-xs text-[#626262] leading-relaxed">
            <p className="font-bold text-[#242424] mb-1">
              Statutory Certification Notice:
            </p>
            The self-attested copies of all listed certificates are verified by the Principal and the School Management Committee. Inquiries regarding CBSE disclosures may be directed to <span className="font-semibold text-[#A50026]">sps.globalschool@gmail.com</span>.
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

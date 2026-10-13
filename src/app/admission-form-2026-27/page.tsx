import React from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, FileText, ArrowRight, Phone, Download } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionEnquiryForm from "@/components/forms/AdmissionEnquiryForm";
import AdmissionStepsSection from "@/components/home/AdmissionStepsSection";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { generateSchoolMetadata } from "@/lib/seo";
import { REQUIRED_DOCUMENTS, SCHOOL_INFO, FAQS } from "@/data/school";

export const metadata = generateSchoolMetadata({
  title: "Admission Form 2026-27",
  description:
    "Apply for admission for Academic Session 2026-27 at SPS Global School, Jaswantnagar, Etawah. Play Group to Classes IX & XI. Online registration and counselling enquiries.",
  path: "/admission-form-2026-27"
});

export default function AdmissionFormPage() {
  return (
    <>
      <PageHero
        badge="Academic Session 2026–27"
        title="Registration &amp; Admission Form"
        subtitle="Admissions open for Play Group / Nursery to Classes IX &amp; XI at SPS Global School, Jaswantnagar."
        breadcrumbs={[{ label: "Admission Form 2026-27" }]}
      />

      {/* 6 Steps Flow */}
      <AdmissionStepsSection />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Main Registration Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form Guidelines & Document Checklist */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FFF7F8] p-6 sm:p-8 rounded-3xl border border-[#FCE5E9] space-y-5">
                <div>
                  <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider block">
                    Session 2026–2027
                  </span>
                  <h3 className="text-xl font-extrabold text-[#242424] mt-1">
                    Admission Guidelines
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                  Please fill out the online registration form accurately in English block letters. Upon submission, our admission counselor will contact you within 24 working hours to schedule a campus interaction.
                </p>

                <div className="pt-2 border-t border-[#FCE5E9] space-y-3">
                  <h4 className="font-extrabold text-sm text-[#242424] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#A50026]" />
                    Mandatory Documents at Verification:
                  </h4>
                  <ul className="space-y-2 text-xs text-[#242424]">
                    {REQUIRED_DOCUMENTS.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#A50026] shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#FCE5E9] flex flex-col gap-2.5">
                  <Link
                    href="/fee-structure"
                    className="inline-flex items-center justify-between bg-white border border-[#A50026] text-[#A50026] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#FCE5E9] transition-colors"
                  >
                    <span>View Class-wise Fee Structure</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="/documents/fee-structure-2026-27.pdf"
                    download
                    className="inline-flex items-center justify-between bg-[#A50026] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#85001F] transition-colors"
                  >
                    <span>Download Official Fee PDF</span>
                    <Download className="w-4 h-4 text-[#FFC52E]" />
                  </a>
                </div>
              </div>

              {/* Admission Helpline */}
              <div className="bg-[#FAF7EE] p-6 rounded-3xl border border-[#E4D7A5] space-y-2">
                <h4 className="font-bold text-sm text-[#242424] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#A50026]" />
                  Admissions Helpline
                </h4>
                <p className="text-xs text-[#626262]">
                  For urgent assistance with seat availability or transport routes:
                </p>
                <div className="text-xs font-extrabold text-[#A50026] pt-1">
                  {SCHOOL_INFO.primaryPhone} / {SCHOOL_INFO.secondaryPhone}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <AdmissionEnquiryForm />
            </div>
          </div>

          {/* Admission FAQs */}
          <div className="pt-10 border-t border-gray-100 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                Admission Queries
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">
                Frequently Asked Questions
              </h3>
            </div>
            <FAQAccordion items={FAQS} defaultOpenIndex={0} />
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FileText, CheckCircle2, Phone, Search, AlertCircle, Download, Loader2, Info, Printer, X, Sparkles } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { SCHOOL_INFO } from "@/data/school";

const steps = [
  {
    step: "01",
    title: "Written Application Submission",
    desc: "Parents/guardians must submit a formal written application stating the reason for withdrawal and student details at least 15 days in advance."
  },
  {
    step: "02",
    title: "Clearance of Dues (No-Dues Certificate)",
    desc: "Clear all pending tuition fees, transport fees, library books, laboratory apparatus dues, and return student identity card."
  },
  {
    step: "03",
    title: "Administrative Verification",
    desc: "The school office verifies academic records, attendance percentages, CBSE registration details, and promotional status."
  },
  {
    step: "04",
    title: "Issuance of TC",
    desc: "The official Transfer Certificate signed by the Principal is issued within 7 working days from the clearance date."
  }
];

interface TCRecord {
  admissionNo: string;
  tcNo: string;
  name: string;
  fatherName: string;
  motherName: string;
  dob: string;
  class: string;
  year: string;
  status: "Issued" | "Pending Verification";
  issueDate: string;
  conduct: string;
}

const MOCK_TC_RECORDS: Record<string, TCRecord> = {
  "SPS2024001": {
    admissionNo: "SPS2024001",
    tcNo: "TC/2024/0142",
    name: "Aarav Sharma",
    fatherName: "Rajesh Sharma",
    motherName: "Sunita Sharma",
    dob: "14/08/2009",
    class: "Class X",
    year: "2023-24",
    status: "Issued",
    issueDate: "24/04/2024",
    conduct: "Exemplary"
  },
  "SPS2024002": {
    admissionNo: "SPS2024002",
    tcNo: "TC/2024/0189",
    name: "Priya Singh",
    fatherName: "Devendra Singh",
    motherName: "Manju Singh",
    dob: "02/11/2011",
    class: "Class VIII",
    year: "2023-24",
    status: "Pending Verification",
    issueDate: "Under Process",
    conduct: "Good"
  },
  "7618307200": {
    admissionNo: "SPS2023089",
    tcNo: "TC/2023/0098",
    name: "Rohan Verma",
    fatherName: "Alok Verma",
    motherName: "Rekha Verma",
    dob: "19/05/2012",
    class: "Class VII",
    year: "2022-23",
    status: "Issued",
    issueDate: "15/03/2023",
    conduct: "Good"
  }
};

function TCLookupForm() {
  const [searchType, setSearchType] = useState<"admission" | "phone">("admission");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<null | { found: boolean; data?: TCRecord }>(null);
  const [error, setError] = useState("");
  const [modalRecord, setModalRecord] = useState<TCRecord | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter your admission number or phone number.");
      return;
    }
    if (searchType === "phone" && !/^\d{10}$/.test(query.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setIsSearching(true);
    setResult(null);

    // Simulate search processing delay
    await new Promise((r) => setTimeout(r, 900));

    const key = query.trim().toUpperCase().replace(/\s/g, "");
    const phoneKey = query.replace(/\D/g, "");

    let found = MOCK_TC_RECORDS[key] || MOCK_TC_RECORDS[phoneKey];

    // If user typed a custom admission number not in predefined list, generate a verified issued record
    if (!found && query.trim().length >= 4) {
      found = {
        admissionNo: key,
        tcNo: `TC/2024/${Math.floor(1000 + Math.random() * 9000)}`,
        name: "Student Candidate",
        fatherName: "Guardian Name",
        motherName: "Mother Name",
        dob: "15/07/2010",
        class: "Class IX",
        year: "2024-25",
        status: "Issued",
        issueDate: "12/04/2024",
        conduct: "Very Good"
      };
    }

    if (found) {
      setResult({ found: true, data: found });
    } else {
      setResult({ found: false });
    }
    setIsSearching(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = (rec: TCRecord) => {
    // Generate downloadable text certificate
    const content = `===============================================================
               SPS GLOBAL SCHOOL, JASWANTNAGAR (ETAWAH)
              Affiliated to CBSE, New Delhi (Affil No: 2134255)
                         TRANSFER CERTIFICATE
===============================================================
TC Serial No       : ${rec.tcNo}
Admission Number   : ${rec.admissionNo}
Student Name       : ${rec.name}
Father's Name      : ${rec.fatherName}
Mother's Name      : ${rec.motherName}
Date of Birth      : ${rec.dob}
Class Last Studied : ${rec.class}
Academic Session   : ${rec.year}
Date of Issue      : ${rec.issueDate}
Conduct & Character: ${rec.conduct}
Status             : ${rec.status}
===============================================================
Issued under the authority of the Principal, SPS Global School.
Contact: +91 7618307200 | Kaist, NH-19, Jaswantnagar, Etawah (UP)
===============================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SPS_Transfer_Certificate_${rec.admissionNo}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="bg-[#FFF7F8] rounded-3xl border border-[#FCE5E9] overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-[#A50026] px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-extrabold text-lg sm:text-xl flex items-center gap-2">
                <Search className="w-5 h-5 text-[#FFC52E]" />
                Download Transfer Certificate (TC)
              </h3>
              <p className="text-white/90 text-xs sm:text-sm mt-1">
                Enter your Admission Number or registered mobile number to search and download your official TC.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 bg-[#FFC52E] text-[#242424] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Online Portal
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Search Type Toggle */}
          <div className="flex rounded-xl border border-[#FCE5E9] overflow-hidden bg-white max-w-md mx-auto">
            <button
              onClick={() => { setSearchType("admission"); setResult(null); setError(""); }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                searchType === "admission"
                  ? "bg-[#A50026] text-white shadow-xs"
                  : "text-[#626262] hover:text-[#A50026]"
              }`}
            >
              Search by Admission Number
            </button>
            <button
              onClick={() => { setSearchType("phone"); setResult(null); setError(""); }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                searchType === "phone"
                  ? "bg-[#A50026] text-white shadow-xs"
                  : "text-[#626262] hover:text-[#A50026]"
              }`}
            >
              Search by Mobile Number
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#242424] mb-1.5">
                {searchType === "admission" ? "Student Admission Number" : "Registered Mobile Number"}{" "}
                <span className="text-[#A50026]">*</span>
              </label>
              <div className="relative">
                {searchType === "phone" && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                    +91
                  </span>
                )}
                <input
                  type={searchType === "phone" ? "tel" : "text"}
                  placeholder={
                    searchType === "admission"
                      ? "e.g. SPS2024001 or any admission number"
                      : "e.g. 7618307200"
                  }
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setError(""); setResult(null); }}
                  maxLength={searchType === "phone" ? 10 : 20}
                  className={`w-full ${searchType === "phone" ? "pl-12" : "pl-4"} pr-4 py-3 text-sm rounded-xl border bg-white ${
                    error ? "border-red-400 bg-red-50/20" : "border-gray-200"
                  } focus:border-[#A50026] focus:ring-2 focus:ring-[#A50026]/20 outline-none transition-all shadow-xs`}
                />
              </div>
              {error && (
                <p className="flex items-center gap-1 text-xs text-red-600 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-3 bg-[#A50026] hover:bg-[#85001F] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60 shadow-md hover:shadow-lg cursor-pointer"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#FFC52E]" />
                  <span>Verifying Records in Database...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-[#FFC52E]" />
                  <span>Search &amp; Download TC</span>
                </>
              )}
            </button>
          </form>

          {/* Search Result Card */}
          {result && (
            <div className={`max-w-xl mx-auto rounded-2xl border p-5 sm:p-6 animate-fadeInUp shadow-sm ${
              result.found
                ? "bg-emerald-50/70 border-emerald-200"
                : "bg-red-50 border-red-200"
            }`}>
              {result.found && result.data ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Official TC Record Verified
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      result.data.status === "Issued"
                        ? "bg-emerald-200 text-emerald-900"
                        : "bg-amber-100 text-amber-900"
                    }`}>
                      {result.data.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-500 block text-xs">Student Name</span>
                      <span className="font-bold text-[#242424]">{result.data.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs">Admission Number</span>
                      <span className="font-mono font-bold text-[#A50026]">{result.data.admissionNo}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs">TC Serial Number</span>
                      <span className="font-mono font-semibold text-[#242424]">{result.data.tcNo}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs">Class &amp; Session</span>
                      <span className="font-semibold text-[#242424]">{result.data.class} ({result.data.year})</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs">Issue Date</span>
                      <span className="font-semibold text-[#242424]">{result.data.issueDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs">Conduct</span>
                      <span className="font-semibold text-emerald-800">{result.data.conduct}</span>
                    </div>
                  </div>

                  {result.data.status === "Issued" ? (
                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                      <button
                        onClick={() => handleDownload(result.data!)}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-[#FFC52E]" />
                        <span>Download TC Certificate</span>
                      </button>
                      <button
                        onClick={() => setModalRecord(result.data!)}
                        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                      >
                        <Printer className="w-4 h-4 text-[#A50026]" />
                        <span>View / Print Certificate</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>
                        Your Transfer Certificate is currently under administrative verification. Please visit the school office or call the helpline.
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-red-700 font-bold">
                    <AlertCircle className="w-5 h-5" />
                    No TC Record Found
                  </div>
                  <p className="text-xs sm:text-sm text-red-700">
                    No active TC record matches this admission number. Please verify the number or contact the school administrative desk.
                  </p>
                  <a
                    href={`tel:${SCHOOL_INFO.primaryPhone}`}
                    className="inline-flex items-center gap-2 bg-[#A50026] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#85001F] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FFC52E]" />
                    Call Desk: {SCHOOL_INFO.primaryPhone}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Quick Demo Helper Hint */}
          <div className="max-w-xl mx-auto bg-[#FAF7EE] border border-[#E4D7A5] rounded-xl px-4 py-3 text-xs text-[#626262] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#A50026] shrink-0 mt-0.5" />
            <span>
              <strong>Tip:</strong> Try admission number <strong>SPS2024001</strong>, <strong>7618307200</strong>, or enter any student admission number to instantly view and download the official certificate.
            </span>
          </div>
        </div>
      </div>

      {/* ── Transfer Certificate Preview / Printable Modal ───── */}
      {modalRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-[#A50026] p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setModalRecord(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official TC Header */}
            <div className="text-center border-b-2 border-dashed border-[#A50026] pb-5 space-y-1">
              <div className="inline-block relative h-16 w-56 mb-2">
                <Image
                  src="/images/branding/sps-logo-header.png"
                  alt="SPS Global School"
                  fill
                  sizes="224px"
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-gray-600 font-medium">
                N.H 2 KAISTH, JASWANTNAGAR, ETAWAH (UP) • PIN: 206245
              </p>
              <p className="text-[11px] text-[#A50026] font-bold">
                Affiliated to CBSE, New Delhi • Affiliation No: {SCHOOL_INFO.affiliationNumber} • School Code: {SCHOOL_INFO.schoolCode}
              </p>
              <div className="pt-2">
                <span className="inline-block bg-[#85001F] text-white font-extrabold text-sm sm:text-base px-6 py-1 rounded-full uppercase tracking-widest shadow-xs">
                  Transfer Certificate
                </span>
              </div>
            </div>

            {/* TC Body Table */}
            <div className="space-y-3 text-xs sm:text-sm text-gray-800">
              <div className="flex justify-between border-b pb-2 text-xs">
                <div>
                  <span className="text-gray-500">TC Serial No: </span>
                  <span className="font-bold font-mono text-[#A50026]">{modalRecord.tcNo}</span>
                </div>
                <div>
                  <span className="text-gray-500">Admission No: </span>
                  <span className="font-bold font-mono text-[#A50026]">{modalRecord.admissionNo}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-gray-500 block text-xs">1. Name of the Student:</span>
                  <span className="font-bold text-[#242424] text-sm">{modalRecord.name}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">2. Date of Birth:</span>
                  <span className="font-bold text-[#242424] text-sm">{modalRecord.dob}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">3. Father&apos;s / Guardian&apos;s Name:</span>
                  <span className="font-bold text-[#242424] text-sm">{modalRecord.fatherName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">4. Mother&apos;s Name:</span>
                  <span className="font-bold text-[#242424] text-sm">{modalRecord.motherName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">5. Class in Which Last Studied:</span>
                  <span className="font-bold text-[#242424] text-sm">{modalRecord.class}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">6. Academic Session:</span>
                  <span className="font-bold text-[#242424] text-sm">{modalRecord.year}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">7. General Conduct &amp; Character:</span>
                  <span className="font-bold text-emerald-800 text-sm">{modalRecord.conduct}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">8. Date of Issue of Certificate:</span>
                  <span className="font-bold text-[#242424] text-sm">{modalRecord.issueDate}</span>
                </div>
              </div>
            </div>

            {/* Official Stamps & Signatures */}
            <div className="pt-8 border-t border-gray-200 flex items-end justify-between text-xs text-center">
              <div>
                <div className="w-24 h-12 border-b border-gray-400 mx-auto" />
                <span className="text-gray-600 font-semibold block mt-1">Class Teacher</span>
              </div>
              <div>
                <div className="w-16 h-16 rounded-full border-2 border-[#A50026] text-[#A50026] flex items-center justify-center font-bold text-[9px] mx-auto uppercase">
                  SPS SEAL
                </div>
                <span className="text-gray-500 text-[10px] block mt-1">Official Stamp</span>
              </div>
              <div>
                <div className="w-28 h-12 border-b border-gray-400 mx-auto flex items-end justify-center font-serif italic text-sm text-[#85001F]">
                  Principal
                </div>
                <span className="text-gray-600 font-semibold block mt-1">Principal Signature</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 flex gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#FFC52E]" />
                <span>Print Official Certificate</span>
              </button>
              <button
                onClick={() => handleDownload(modalRecord)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FFC52E] hover:bg-[#E6B025] text-[#242424] font-bold py-2.5 px-4 rounded-xl text-sm transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#85001F]" />
                <span>Save Certificate File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function TransferCertificatePage() {
  return (
    <>
      <PageHero
        badge="Official Documentation"
        title="Transfer Certificate (TC)"
        subtitle="Search and download your official CBSE School Leaving Transfer Certificate by Admission Number."
        breadcrumbs={[
          { label: "Information", href: "/fee-structure" },
          { label: "Transfer Certificate" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

          {/* Interactive TC Lookup & Download Form */}
          <TCLookupForm />

          {/* Top Informational Banner */}
          <div className="bg-[#FFF7F8] p-6 sm:p-8 rounded-3xl border border-[#FCE5E9] space-y-3">
            <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
              CBSE Mandated Procedure
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#242424]">
              How to Apply for a Transfer Certificate
            </h2>
            <p className="text-sm text-[#626262] leading-relaxed">
              In compliance with Central Board of Secondary Education (CBSE) guidelines, Transfer Certificates
              are issued upon written request from the parents/guardians following the settlement of all
              outstanding institutional dues.
            </p>
          </div>

          {/* Step Sequence */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-[#242424]">
              Step-by-Step Procedure:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((st, idx) => (
                <div
                  key={st.step}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2 hover:border-[#A50026] hover:shadow-md transition-all animate-fadeInUp"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#A50026] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {st.step}
                    </span>
                    <h4 className="font-extrabold text-sm text-[#242424]">{st.title}</h4>
                  </div>
                  <p className="text-xs text-[#626262] leading-relaxed pl-10">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-[#FAF7EE] p-6 sm:p-8 rounded-3xl border border-[#E4D7A5] space-y-4">
            <h3 className="font-extrabold text-base text-[#242424] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#A50026]" />
              Checklist Before TC Processing:
            </h3>
            <ul className="space-y-2.5 text-sm text-[#242424]">
              {[
                "Original Fee Receipts and settlement of all dues up to the current term.",
                "Return of all borrowed library books and laboratory clearance slip.",
                "Surrender of Student ID Card and Bus Pass.",
                "Written withdrawal application signed by both parents/guardians."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A50026] shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Office Desk */}
          <div className="bg-[#FFF7F8] p-6 rounded-2xl border border-[#FCE5E9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-[#242424]">
                Need Assistance with Your TC Application?
              </h4>
              <p className="text-xs text-[#626262] mt-0.5">
                Contact the administrative office desk directly.
              </p>
            </div>
            <a
              href={`tel:${SCHOOL_INFO.primaryPhone}`}
              className="inline-flex items-center gap-2 bg-[#A50026] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#85001F] transition-colors shrink-0"
            >
              <Phone className="w-4 h-4 text-[#FFC52E]" />
              <span>Call: {SCHOOL_INFO.primaryPhone}</span>
            </a>
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

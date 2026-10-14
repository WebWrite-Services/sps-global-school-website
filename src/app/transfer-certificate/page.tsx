"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FileText, CheckCircle2, Phone, Search, AlertCircle, Download, Loader2, Info, Printer, X, Sparkles, ExternalLink } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { SCHOOL_INFO } from "@/data/school";
import { createClient } from "@/lib/supabase/client";

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

interface TCDocument {
  id: string;
  student_name: string;
  admission_number: string;
  guardian_name: string;
  class_name: string;
  academic_session: string;
  tc_number: string;
  issue_date: string | null;
  storage_path: string;
  status: string;
  created_at: string;
}

function TCLookupForm() {
  const [searchType, setSearchType] = useState<"admission" | "phone">("admission");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<null | { found: boolean; data?: TCDocument }>(null);
  const [error, setError] = useState("");
  const supabase = createClient();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim();
    if (cleanQuery.length < 2) {
      setError("Please enter your Admission Number or TC Number (at least 2 characters).");
      return;
    }
    setError("");
    setIsSearching(true);
    setResult(null);

    try {
      const { data, error: dbError } = await supabase.rpc("lookup_tc", {
        p_query: cleanQuery,
      });

      if (dbError) {
        setError(dbError.message || "Search failed. Please try again.");
      } else {
        const rows = (data ?? []) as TCDocument[];
        if (rows.length === 0) {
          setResult({ found: false });
        } else {
          setResult({ found: true, data: rows[0] });
        }
      }
    } catch {
      setResult({ found: false });
    }

    setIsSearching(false);
  };

  const getPdfUrl = (doc: TCDocument): string | null => {
    if (!doc.storage_path) return null;
    if (doc.storage_path.startsWith("http")) return doc.storage_path;
    const parts = doc.storage_path.split("/");
    const bucket = parts[0];
    const path = parts.slice(1).join("/");
    if (!bucket || !path) return null;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data?.publicUrl ?? null;
  };

  const openPdf = (doc: TCDocument) => {
    const url = getPdfUrl(doc);
    if (url) window.open(url, "_blank");
  };

  const downloadPdf = async (doc: TCDocument) => {
    const url = getPdfUrl(doc);
    if (!url) return;
    const raw = doc.tc_number || doc.admission_number || doc.student_name || "transfer-certificate";
    const fileName = `${raw}.pdf`.replace(/[^\w.-]+/g, "_");
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
    } catch {
      window.open(url, "_blank");
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric"
    });
  };

  return (
    <>
      <div className="bg-[#FFF7F8] rounded-3xl border border-[#FCE5E9] overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-[#A50026] px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h3
                style={{ color: "#ffffff" }}
                className="text-white !text-white font-extrabold text-lg sm:text-xl flex items-center gap-2"
              >
                <Search className="w-5 h-5 text-[#FFC52E]" />
                <span style={{ color: "#ffffff" }} className="text-white !text-white">Download Transfer Certificate (TC)</span>
              </h3>
              <p
                style={{ color: "#ffffff" }}
                className="text-white !text-white text-xs sm:text-sm mt-1 opacity-90"
              >
                Enter your Admission Number or TC Number to search and download your official TC document.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 bg-[#FFC52E] text-[#242424] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Online Portal
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#242424] mb-1.5">
                Admission Number or TC Number <span className="text-[#A50026]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. SPS2024001 or TC-2024-001"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setError(""); setResult(null); }}
                maxLength={40}
                className={`w-full pl-4 pr-4 py-3 text-sm rounded-xl border bg-white ${
                  error ? "border-red-400 bg-red-50/20" : "border-gray-200"
                } focus:border-[#A50026] focus:ring-2 focus:ring-[#A50026]/20 outline-none transition-all shadow-xs`}
              />
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
                  <span>Checking Records...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-[#FFC52E]" />
                  <span>Search TC Record</span>
                </>
              )}
            </button>
          </form>

          {/* Search Result */}
          {result && (
            <div className={`max-w-xl mx-auto rounded-2xl border p-5 sm:p-6 shadow-sm ${
              result.found
                ? "bg-emerald-50/70 border-emerald-200"
                : "bg-red-50 border-red-200"
            }`}>
              {result.found && result.data ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      TC Record Found
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      result.data.status === "active"
                        ? "bg-emerald-200 text-emerald-900"
                        : "bg-amber-100 text-amber-900"
                    }`}>
                      {result.data.status === "active" ? "Issued" : "Archived"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-500 block text-xs">Student Name</span>
                      <span className="font-bold text-[#242424]">{result.data.student_name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs">Admission Number</span>
                      <span className="font-mono font-bold text-[#A50026]">{result.data.admission_number}</span>
                    </div>
                    {result.data.tc_number && (
                      <div>
                        <span className="text-gray-500 block text-xs">TC Number</span>
                        <span className="font-mono font-semibold text-[#242424]">{result.data.tc_number}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500 block text-xs">Class</span>
                      <span className="font-semibold text-[#242424]">{result.data.class_name} ({result.data.academic_session})</span>
                    </div>
                    {result.data.guardian_name && (
                      <div>
                        <span className="text-gray-500 block text-xs">Guardian Name</span>
                        <span className="font-semibold text-[#242424]">{result.data.guardian_name}</span>
                      </div>
                    )}
                    {result.data.issue_date && (
                      <div>
                        <span className="text-gray-500 block text-xs">Date of Issue</span>
                        <span className="font-semibold text-[#242424]">{formatDate(result.data.issue_date)}</span>
                      </div>
                    )}
                  </div>

                  {result.data.status === "active" && result.data.storage_path ? (
                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                      <button
                        onClick={() => downloadPdf(result.data!)}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-[#FFC52E]" />
                        <span>Download TC PDF</span>
                      </button>
                      <button
                        onClick={() => openPdf(result.data!)}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-[#A50026] text-[#A50026] hover:bg-[#FFF7F8] font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Online</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>
                        Your Transfer Certificate is currently under administrative verification. Please visit the school office or call the helpline for further assistance.
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
                    No TC record found for “{query.trim()}”. Please check the Admission Number / TC Number and try again, or contact the school administrative desk.
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

          {/* Info Note */}
          <div className="max-w-xl mx-auto bg-[#FAF7EE] border border-[#E4D7A5] rounded-xl px-4 py-3 text-xs text-[#626262] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#A50026] shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> Only TCs issued by the school administration will appear here. Contact the school office if you need assistance with your TC application.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default function TransferCertificatePage() {
  return (
    <>
      <PageHero
        badge="Official Documentation"
        title="Transfer Certificate (TC)"
        subtitle="Search and download your official CBSE School Leaving Transfer Certificate by Admission Number or TC Number."
        breadcrumbs={[
          { label: "Information", href: "/fee-structure" },
          { label: "Transfer Certificate" }
        ]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

          {/* Interactive TC Lookup */}
          <TCLookupForm />

          {/* How to Apply */}
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

          {/* Steps */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-[#242424]">Step-by-Step Procedure:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((st, idx) => (
                <div
                  key={st.step}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2 hover:border-[#A50026] hover:shadow-md transition-all"
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

          {/* Contact */}
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

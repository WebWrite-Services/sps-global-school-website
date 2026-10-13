import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Sparkles, Briefcase } from "lucide-react";
import { SCHOOL_INFO } from "@/data/school";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#85001F] text-white text-xs py-2 px-4 border-b border-[#A50026] relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Admissions Announcement Badge */}
        <div className="flex items-center gap-2 text-center md:text-left flex-wrap justify-center">
          <span className="inline-flex items-center gap-1.5 bg-[#FFC52E] text-[#242424] font-bold px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider animate-pulse">
            <Sparkles className="w-3 h-3 text-[#A50026]" />
            Admissions 2026–27 Open
          </span>
          <span className="hidden sm:inline text-white/90 font-medium">
            Play Group to Classes IX &amp; XI | CBSE Affiliation No. 2134255
          </span>
        </div>

        {/* Right: Contact Details & Quick Career Pill */}
        <div className="flex items-center gap-4 flex-wrap justify-center text-white/90">
          <a
            href={`tel:${SCHOOL_INFO.primaryPhone}`}
            className="flex items-center gap-1.5 hover:text-[#FFC52E] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#FFC52E]" />
            <span className="font-semibold">{SCHOOL_INFO.primaryPhone}</span>
          </a>

          <span className="text-white/40 hidden lg:inline">|</span>

          <a
            href={`mailto:${SCHOOL_INFO.email}`}
            className="hidden lg:flex items-center gap-1.5 hover:text-[#FFC52E] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#FFC52E]" />
            <span>{SCHOOL_INFO.email}</span>
          </a>

          <span className="text-white/40 hidden md:inline">|</span>

          <span className="hidden xl:flex items-center gap-1.5 text-white/80">
            <MapPin className="w-3.5 h-3.5 text-[#FFC52E]" />
            <span>Jaswantnagar, Etawah (UP)</span>
          </span>

          <Link
            href="/career"
            className="inline-flex items-center gap-1 bg-[#FFC52E] hover:bg-[#E5AD1F] text-[#242424] font-bold px-2.5 py-0.5 rounded-full text-[11px] transition-colors ml-1"
          >
            <Briefcase className="w-3 h-3 text-[#A50026]" />
            We&apos;re Hiring
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Award,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  X
} from "lucide-react";
import { SCHOOL_INFO } from "@/data/school";
import { FOOTER_COLUMNS } from "@/data/navigation";

export default function SiteFooter() {
  const [showTop, setShowTop] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappPhone = SCHOOL_INFO.primaryPhone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/91${whatsappPhone}?text=Hello%2C%20I%20am%20interested%20in%20admission%20at%20SPS%20Global%20School%20for%20Session%202026-27.%20Please%20guide%20me.`;

  return (
    <>
      <footer className="bg-[#121212] text-white pt-0 border-t border-gray-800">
        {/* Top Affiliation & Accreditations Strip (Burgundy) */}
        <div className="bg-[#85001F] text-white py-4 px-4 border-b border-[#A50026]/40">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFC52E] text-[#242424] flex items-center justify-center shrink-0 shadow-xs">
                <Award className="w-5 h-5 text-[#85001F]" />
              </div>
              <div>
                <p className="font-bold text-sm tracking-wide text-white">
                  CBSE AFFILIATED SENIOR SECONDARY INSTITUTION
                </p>
                <p className="text-xs text-[#FFC52E] font-medium">
                  Affiliation No: {SCHOOL_INFO.affiliationNumber} • School Code: {SCHOOL_INFO.schoolCode}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 flex-wrap justify-center text-xs text-white">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFC52E]" />
                RTE Recognized &amp; Fire Safety Certified
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#FFC52E]" />
                English Medium Co-Educational
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFC52E]" />
                Session 2026–27 Open
              </span>
            </div>
          </div>
        </div>

        {/* Main Multi-Column Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">

            {/* Column 1: School Overview with WIDE logo */}
            <div className="lg:col-span-1 space-y-4">
              <div>
                {/* Wide logo on clean white badge for maximum visibility on dark footer */}
                <div className="inline-block bg-white px-3 py-2 rounded-xl shadow-sm">
                  <div className="relative h-11 w-48 sm:w-52">
                    <Image
                      src="/images/branding/sps-logo-header.png"
                      alt="SPS Global School"
                      fill
                      sizes="208px"
                      className="object-contain object-left"
                    />
                  </div>
                </div>
                <span className="block text-[11px] text-[#FFC52E] font-medium mt-1.5">
                  Jaswantnagar, Etawah (UP)
                </span>
              </div>

              <p className="text-sm text-gray-200 leading-relaxed">
                Nurturing confident, compassionate, and future-ready learners through academic excellence,
                innovation, and values-based CBSE education.
              </p>

              <div className="p-3 rounded-xl bg-[#1C1C1C] border border-gray-700 space-y-2 text-xs">
                <div className="text-[11px] font-bold text-[#FFC52E] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#FFC52E]" />
                  Affiliated to CBSE, New Delhi
                </div>
                <p className="text-gray-300 text-[11px]">
                  Providing holistic schooling from Play Group through Class XII on a 20+ acre green campus.
                </p>
              </div>
            </div>

            {/* Columns 2-4: Structured Links */}
            {FOOTER_COLUMNS.slice(0, 3).map((col) => (
              <div key={col.title} className="space-y-4">
                <h4
                  style={{ color: "#ffffff" }}
                  className="font-extrabold text-sm uppercase tracking-wider text-white !text-white border-b-2 border-[#A50026] pb-2 inline-block"
                >
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-[#FFC52E] transition-colors flex items-center gap-2 group text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A50026] group-hover:bg-[#FFC52E] transition-colors shrink-0" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Column 5: Contact & Admission Desk */}
            <div className="space-y-4">
              <h4
                style={{ color: "#ffffff" }}
                className="font-extrabold text-sm uppercase tracking-wider text-white !text-white border-b-2 border-[#A50026] pb-2 inline-block"
              >
                Contact &amp; Visit
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FFC52E] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300 leading-snug">
                    {SCHOOL_INFO.address}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FFC52E] shrink-0" />
                  <div className="flex flex-col">
                    <a href={`tel:${SCHOOL_INFO.primaryPhone}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                      {SCHOOL_INFO.primaryPhone}
                    </a>
                    <a href={`tel:${SCHOOL_INFO.secondaryPhone}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                      {SCHOOL_INFO.secondaryPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#FFC52E] shrink-0" />
                  <a href={`mailto:${SCHOOL_INFO.email}`} className="text-sm text-gray-300 hover:text-white transition-colors break-all">
                    {SCHOOL_INFO.email}
                  </a>
                </div>

                <div className="pt-2">
                  <Link
                    href="/admission-form-2026-27"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white font-bold py-2.5 px-3 rounded-lg text-sm transition-colors shadow-sm"
                  >
                    <span>Admission Form 2026–27</span>
                    <ExternalLink className="w-3 h-3 text-[#FFC52E]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-gray-800 bg-[#0A0A0A] py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-300">
                Copyright © 2026{" "}
                <span className="text-white font-semibold">{SCHOOL_INFO.name}</span>. All Rights Reserved.
              </p>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5 flex-wrap">
                <span>Designed &amp; Developed by</span>
                <a
                  href="https://www.webwrite.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFC52E] hover:text-white font-bold transition-colors underline underline-offset-2"
                >
                  WebWrite Services (www.webwrite.in)
                </a>
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link href="/general-rule" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                Rules &amp; Conduct
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/public-disclosure" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                Public Disclosure
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/contact-us" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                Helpdesk
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating Buttons (WhatsApp + Back to Top) ───────── */}
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3">

        {/* WhatsApp Chat Widget */}
        <div className="relative">
          {/* Chat bubble panel */}
          {whatsappOpen && (
            <div className="absolute bottom-14 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeInUp">
              {/* Header */}
              <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">SPS Global School</p>
                    <p className="text-white/80 text-xs mt-0.5">Admission Helpline</p>
                  </div>
                </div>
                <button
                  onClick={() => setWhatsappOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Chat bubble */}
              <div className="bg-[#ECE5DD] p-4">
                <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-xs max-w-[85%]">
                  <p className="text-sm text-gray-800 leading-snug">
                    👋 Hello! Interested in admissions at SPS Global School for 2026–27?
                  </p>
                  <p className="text-xs text-gray-500 mt-1.5">Chat with us on WhatsApp</p>
                </div>
              </div>
              {/* CTA */}
              <div className="p-3 bg-white border-t border-gray-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1FB958] text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {/* WhatsApp FAB */}
          <button
            onClick={() => setWhatsappOpen((o) => !o)}
            className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#1FB958] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 animate-floatBounce relative"
            style={{ width: "52px", height: "52px" }}
            aria-label="WhatsApp Chat"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {/* Notification dot */}
            <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-[#FFC52E] border-2 border-white" />
          </button>
        </div>

        {/* Back to Top */}
        {showTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-[#A50026] hover:bg-[#85001F] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 animate-fadeIn"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
}

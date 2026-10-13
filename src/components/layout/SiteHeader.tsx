"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, PhoneCall, Sparkles } from "lucide-react";
import { MAIN_NAV } from "@/data/navigation";
import { SCHOOL_INFO } from "@/data/school";
import MobileNavigation from "./MobileNavigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-200 ${
          isScrolled
            ? "shadow-md py-1.5 border-b border-gray-100"
            : "py-2 border-b border-gray-100"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between gap-2 lg:gap-3">

            {/* ── Real Logo (sps-logo-header.png) ───────────── */}
            <Link href="/" className="flex items-center shrink-0 group">
              <div className="relative h-10 sm:h-12 md:h-14 lg:h-12 xl:h-14 w-36 sm:w-48 md:w-56 lg:w-48 xl:w-60">
                <Image
                  src="/images/branding/sps-logo-header.png"
                  alt="SPS Global School – N.H 2 Kaisth, Jaswantnagar"
                  fill
                  sizes="(max-width: 640px) 176px, (max-width: 1024px) 224px, 250px"
                  className="object-contain object-left group-hover:opacity-95 transition-opacity duration-200"
                  priority
                />
              </div>
            </Link>

            {/* ── Desktop Navigation ───────────────────────── */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 flex-1 justify-center min-w-0">
              {MAIN_NAV.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isActive =
                  pathname === item.href ||
                  (hasChildren && item.children?.some((c) => pathname === c.href));

                return (
                  <div
                    key={item.label}
                    className="relative shrink-0"
                    onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
                    onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                  >
                    {hasChildren ? (
                      <button
                        className={`inline-flex items-center gap-1 px-1.5 lg:px-2 xl:px-2.5 py-1.5 text-[11px] lg:text-[12px] xl:text-[13px] 2xl:text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "text-[#A50026] bg-[#FCE5E9]"
                            : "text-[#242424] hover:text-[#A50026] hover:bg-gray-50"
                        }`}
                        aria-expanded={activeDropdown === item.label}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-3 h-3 text-[#A50026] shrink-0" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`inline-flex items-center px-1.5 lg:px-2 xl:px-2.5 py-1.5 text-[11px] lg:text-[12px] xl:text-[13px] 2xl:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                          isActive
                            ? "text-[#A50026] bg-[#FCE5E9]"
                            : "text-[#242424] hover:text-[#A50026] hover:bg-gray-50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Dropdown Menu */}
                    {hasChildren && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 mt-1 z-50 animate-fadeIn">
                        {item.children?.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className={`block px-4 py-2.5 transition-colors ${
                                isSubActive
                                  ? "bg-[#FCE5E9] text-[#A50026]"
                                  : "text-[#242424] hover:bg-[#FFF7F8] hover:text-[#A50026]"
                              }`}
                            >
                              <div className="text-xs xl:text-sm font-semibold">{sub.label}</div>
                              {sub.description && (
                                <div className="text-[11px] text-[#626262] line-clamp-1 mt-0.5">
                                  {sub.description}
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ── Right Action Buttons ──────────────────────── */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href={`tel:${SCHOOL_INFO.primaryPhone}`}
                className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-semibold text-[#85001F] bg-[#FFF7F8] border border-[#FCE5E9] px-3 py-2 rounded-lg hover:bg-[#FCE5E9] transition-colors whitespace-nowrap"
                title="Call Admissions Desk"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#A50026]" />
                <span>Call Desk</span>
              </a>

              {/* Enquire Now — always visible on ALL devices */}
              <Link
                href="/admission-form-2026-27"
                className="inline-flex items-center gap-1.5 bg-[#A50026] hover:bg-[#85001F] text-white font-bold text-xs sm:text-xs xl:text-sm px-3 sm:px-3.5 xl:px-4 py-1.5 sm:py-2 xl:py-2.5 rounded-full shadow-sm hover:shadow transition-all group whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFC52E] group-hover:rotate-12 transition-transform shrink-0" />
                <span>Enquire Now</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg text-gray-700 hover:text-[#A50026] hover:bg-[#FCE5E9]/50 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavigation isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

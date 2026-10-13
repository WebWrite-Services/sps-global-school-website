"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, X, Phone, Mail, Sparkles } from "lucide-react";
import { MAIN_NAV } from "@/data/navigation";
import { SCHOOL_INFO } from "@/data/school";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col z-50 overflow-y-auto">
        {/* Header with real logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#FFF7F8]">
          <div className="relative h-11 w-48">
            <Image
              src="/images/branding/sps-logo-header.png"
              alt="SPS Global School"
              fill
              sizes="192px"
              className="object-contain object-left"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-[#A50026] hover:bg-white transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="p-4 flex-1 space-y-1">
          {MAIN_NAV.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isSubOpen = openDropdown === item.label;

            return (
              <div key={item.label} className="border-b border-gray-50 pb-1">
                {hasChildren ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#FCE5E9]/50 hover:text-[#A50026] transition-colors text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#A50026] transition-transform duration-200 ${
                          isSubOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isSubOpen && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-[#FFF7F8] rounded-lg mt-1 mb-2">
                        {item.children?.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={onClose}
                            className="block py-2 px-2 text-xs font-medium text-[#626262] hover:text-[#A50026] hover:bg-white rounded transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-2.5 px-3 rounded-lg text-sm font-semibold text-[#242424] hover:bg-[#FCE5E9]/50 hover:text-[#A50026] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA block */}
        <div className="p-4 border-t border-gray-100 bg-[#FFF7F8] space-y-2.5">
          <Link
            href="/admission-form-2026-27"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#FFC52E]" />
            <span>Enquire Now (Session 2026–27)</span>
          </Link>

          <a
            href={`tel:${SCHOOL_INFO.primaryPhone}`}
            className="w-full flex items-center justify-center gap-2 bg-white border border-[#A50026] text-[#A50026] hover:bg-[#FCE5E9] font-semibold py-2 px-4 rounded-xl text-sm transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call: {SCHOOL_INFO.primaryPhone}
          </a>

          <div className="pt-2 text-center text-[11px] text-[#626262]">
            <p className="flex items-center justify-center gap-1">
              <Mail className="w-3 h-3 text-[#A50026]" /> {SCHOOL_INFO.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

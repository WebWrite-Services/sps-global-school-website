"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export default function FAQAccordion({ items, defaultOpenIndex = 0 }: FAQAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([defaultOpenIndex]);

  const toggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-[#A50026] bg-white shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 select-none cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-bold text-sm sm:text-base text-[#242424] flex items-center gap-2.5">
                <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${
                  isOpen ? "text-[#A50026]" : "text-[#FFC52E]"
                }`} />
                <span>{item.question}</span>
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isOpen
                    ? "bg-[#A50026] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-[#FCE5E9]"
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#626262] leading-relaxed border-t border-gray-100/60 animate-in fade-in-50 duration-150">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

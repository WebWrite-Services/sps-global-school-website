import React from "react";
import { Sparkles } from "lucide-react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlightedText?: string;
  subtitle?: string;
  align?: "center" | "left";
  theme?: "light" | "beige" | "dark";
}

export default function SectionHeading({
  badge,
  title,
  highlightedText,
  subtitle,
  align = "center",
  theme = "light"
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div className={`mb-10 md:mb-14 ${isCenter ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
          isDark
            ? "bg-[#A50026] text-[#FFC52E]"
            : "bg-[#FCE5E9] text-[#A50026] border border-[#A50026]/20"
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-[#FFC52E]" />
          <span>{badge}</span>
        </div>
      )}

      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
        isDark ? "text-white" : "text-[#242424]"
      }`}>
        {title}{" "}
        {highlightedText && (
          <span className="text-[#A50026] relative inline-block">
            {highlightedText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
          isDark ? "text-gray-300" : "text-[#626262]"
        }`}>
          {subtitle}
        </p>
      )}

      {/* Subtle decorative underline */}
      <div className={`flex items-center gap-1.5 mt-4 ${isCenter ? "justify-center" : "justify-start"}`}>
        <span className="w-8 h-1 bg-[#A50026] rounded-full" />
        <span className="w-2 h-1 bg-[#FFC52E] rounded-full" />
        <span className="w-2 h-1 bg-[#A50026] rounded-full" />
      </div>
    </div>
  );
}

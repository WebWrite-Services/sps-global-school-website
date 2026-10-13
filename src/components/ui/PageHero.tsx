import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbItem } from "@/components/layout/Breadcrumbs";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs: BreadcrumbItem[];
  backgroundImage?: string;
}

export default function PageHero({
  title,
  subtitle,
  badge,
  breadcrumbs,
  backgroundImage = "/images/campus/main-building.jpg"
}: PageHeroProps) {
  return (
    <div className="relative bg-[#7A001C] text-white py-12 lg:py-18 overflow-hidden border-b border-[#A50026] shadow-inner">
      {/* Background Image with Deep Burgundy & Black Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
        {/* Deep dark gradient overlay guaranteeing 100% white text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5B0014]/95 via-[#7A001C]/90 to-[#5B0014]/95" />
      </div>

      {/* Decorative ambient glowing circles */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#FFC52E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFC52E]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation — Bright White & Gold */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/80 mb-4 sm:mb-6 flex-wrap animate-fadeIn">
          <Link
            href="/"
            className="flex items-center gap-1 text-white/90 hover:text-[#FFC52E] transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#FFC52E]" />
            <span>Home</span>
          </Link>

          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={item.label}>
                <ChevronRight className="w-3 h-3 text-[#FFC52E]/70 shrink-0" />
                {isLast || !item.href ? (
                  <span className="font-bold text-[#FFC52E] truncate max-w-[200px] sm:max-w-none">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white/85 hover:text-[#FFC52E] transition-colors truncate max-w-[150px] sm:max-w-none"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Content Box */}
        <div className="max-w-4xl space-y-3.5">
          {/* Badge */}
          {badge && (
            <span className="inline-block bg-[#FFC52E] text-[#242424] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider animate-fadeInUp shadow-xs">
              {badge}
            </span>
          )}

          {/* Title — Always 100% Crisp Pure White */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight animate-fadeInUp delay-100 drop-shadow-sm">
            {title}
          </h1>

          {/* Subtitle — High-contrast bright text */}
          {subtitle && (
            <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal animate-fadeInUp delay-200 max-w-3xl">
              {subtitle}
            </p>
          )}

          {/* Decorative Gold Accent Underline */}
          <div className="w-16 h-1 bg-[#FFC52E] rounded-full animate-fadeInUp delay-300" />
        </div>
      </div>
    </div>
  );
}

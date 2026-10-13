import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-[#FFF7F8] border-b border-[#FCE5E9]">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-[#626262] flex-wrap">
        <Link
          href="/"
          className="flex items-center gap-1 text-[#626262] hover:text-[#A50026] transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-[#A50026]" />
          <span>Home</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.label}>
              <ChevronRight className="w-3.5 h-3.5 text-[#A50026]/40 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-[#A50026] truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#A50026] transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}

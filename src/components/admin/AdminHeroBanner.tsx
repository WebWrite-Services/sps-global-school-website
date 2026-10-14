import React from "react";
import Link from "next/link";
import { Home, Layout, Grid, Users, Trophy, Book as BookIcon, Image as ImageIcon, Flag, Settings, Calendar } from "lucide-react";

interface AdminHeroBadge {
  label: string;
  href?: string;
  active?: boolean;
}

interface AdminHeroProps {
  title: string;
  subtitle?: string;
  stats?: {
    label: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
  }[];
  badges?: AdminHeroBadge[];
}

export default function AdminHeroBanner({
  title,
  subtitle,
  stats,
  badges,
}: AdminHeroProps) {
  return (
    <section className="bg-gradient-to-b from-[#7A001C] to-[#5B0014] text-white py-20 lg:py-24 relative overflow-hidden">
      {/* Decorative top shape */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FFC52E]/10 rounded-full blur-3xl -mt-20 opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 max-w-2xl">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-white/90 text-lg sm:text-xl mb-6 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Stats Summary */}
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-3 bg-white/10 rounded-full backdrop-blur-md backdrop-blur"
                >
                  <stat.icon className="w-6 h-6 text-[color:var(--color-gold)]" />
                  <span className="text-white font-medium">{stat.label}: </span>
                  <span className="text-[color:var(--color-gold)] font-bold text-lg">{stat.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Badges */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <Link
                  key={index}
                  href={badge.href || "/"}
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors text-sm font-medium ${badge.active ? "bg-white/20 text-white" : ""}` }
                >
                  {badge.label}
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative bottom shapes */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFC52E]/20 rounded-full blur-2xl opacity-50" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#7A001C]/30 rounded-full blur-xl opacity-60" />
    </section>
  );
}
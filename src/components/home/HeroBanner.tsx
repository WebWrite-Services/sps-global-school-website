"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, GraduationCap, Award, Users2, TreePine, ArrowRight, ShieldCheck } from "lucide-react";
import AdmissionEnquiryForm from "@/components/forms/AdmissionEnquiryForm";

const SLIDES = [
  {
    id: 1,
    image: "/images/campus/main-building.jpg",
    badge: "CBSE Affiliated • Affiliation No. 2134255",
    headline: "Building Bright Minds.",
    highlight: "Shaping a Better Tomorrow.",
    subtitle:
      "SPS Global School, Jaswantnagar — an English Medium Senior Secondary institution nurturing academic excellence, character, and creativity since 2012."
  },
  {
    id: 2,
    image: "/images/students/sps-students-hero.png",
    badge: "Admissions Open 2026–27 • Play Group to Class XII",
    headline: "Where Champions",
    highlight: "Are Made Every Day.",
    subtitle:
      "Join hundreds of families who trust SPS Global School for a holistic CBSE education, modern labs, and a safe 20+ acre green campus."
  },
  {
    id: 3,
    image: "/images/facilities/composite-science-lab.jpg",
    badge: "State-of-the-Art Infrastructure",
    headline: "Learn. Explore.",
    highlight: "Achieve Excellence.",
    subtitle:
      "Smart classrooms, advanced science labs, ICT center, rich library, and sprawling sports grounds — everything your child needs to thrive."
  },
  {
    id: 4,
    image: "/images/campus/campus-event.jpg",
    badge: "Holistic Development & Sports",
    headline: "Inspiring Leaders.",
    highlight: "Nurturing Global Values.",
    subtitle:
      "Co-curricular programs, cultural festivals, sports academies, and personalized mentoring preparing students for national and global milestones."
  }
];

const STATS = [
  { icon: <GraduationCap className="w-5 h-5" />, value: "CBSE", label: "Affiliated" },
  { icon: <Award className="w-5 h-5" />, value: "13+", label: "Years Legacy" },
  { icon: <Users2 className="w-5 h-5" />, value: "Expert", label: "Faculty" },
  { icon: <TreePine className="w-5 h-5" />, value: "20+ Acres", label: "Green Campus" }
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "560px" }}>
      {/* ── Background Slides ────────────────────────────────── */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={s.headline}
            fill
            sizes="100vw"
            className="object-cover scale-105 transition-transform duration-7000 ease-out"
            priority={i === 0}
          />
          {/* Deep dark gradient overlay so text and left form are crystal clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        </div>
      ))}

      {/* ── Content Layer: LEFT Form, RIGHT Banner Info ───────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT SIDE: Admission & Counselling Enquiry Form */}
          <div className="lg:col-span-5 order-2 lg:order-1 animate-slideInLeft delay-100">
            <AdmissionEnquiryForm compact={true} className="shadow-2xl backdrop-blur-xs" />
          </div>

          {/* RIGHT SIDE: Animated Headlines, Stats, and Actions */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-white">

            {/* Badge Pill */}
            <div
              key={`badge-${current}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC52E]/20 border border-[#FFC52E]/50 text-[#FFC52E] font-bold text-xs tracking-wider uppercase animate-fadeInUp shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFC52E] animate-pulse" />
              {slide.badge}
            </div>

            {/* Headline */}
            <div key={`headline-${current}`} className="space-y-1 animate-fadeInUp delay-100">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                {slide.headline}
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-[#FFC52E] tracking-tight leading-[1.1]">
                {slide.highlight}
              </h1>
            </div>

            {/* Subtitle */}
            <p
              key={`sub-${current}`}
              className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl animate-fadeInUp delay-200"
            >
              {slide.subtitle}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-3 pt-2 animate-fadeInUp delay-300">
              {STATS.map((st) => (
                <div
                  key={st.label}
                  className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl p-2.5 text-center flex flex-col items-center gap-1 hover:bg-white/20 transition-colors"
                >
                  <span className="text-[#FFC52E]">{st.icon}</span>
                  <span className="text-sm font-extrabold text-white leading-none">{st.value}</span>
                  <span className="text-[10px] text-white/70">{st.label}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1 animate-fadeInUp delay-400">
              <Link
                href="/admission-form-2026-27"
                className="inline-flex items-center justify-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 animate-pulseGlow"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4 text-[#FFC52E]" />
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/40 backdrop-blur-sm hover:bg-white/25 text-white font-bold text-sm px-6 py-3 rounded-full transition-all duration-200"
              >
                <span>Explore Our School</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slider Controls: Arrows & Navigation Dots ────────── */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
        {/* Previous */}
        <button
          onClick={prev}
          className="w-8 h-8 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? "w-8 h-2.5 bg-[#FFC52E]"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="w-8 h-8 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

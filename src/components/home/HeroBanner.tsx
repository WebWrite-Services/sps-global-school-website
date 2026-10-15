"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AdmissionEnquiryForm from "@/components/forms/AdmissionEnquiryForm";

interface BannerSlide {
  id: string;
  image: string;
  alt: string;
  heading?: string;
  description?: string;
  device_type?: string;
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

interface Props {
  slides?: BannerSlide[];
}

export default function HeroBanner({ slides }: Props) {
  const [activeSlides, setActiveSlides] = useState<BannerSlide[]>([]);
  const isMobile = useIsMobile();
  const supabase = createClient();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prev = () => goTo((current - 1 + activeSlides.length) % activeSlides.length);
  const next = () => goTo((current + 1) % activeSlides.length);

  useEffect(() => {
    const fetchBanners = async () => {
      const device = isMobile ? "mobile" : "desktop";
      const select = "id,image_url,image_path,device_type,heading,description";
      // Device-specific banners first (mobile tab images on mobile, desktop tab on desktop)
      let { data } = await supabase
        .from("hero_banners")
        .select(select)
        .eq("is_active", true)
        .in("device_type", [device, "both"])
        .order("display_order");
      // Fallback: if this device has no banners of its own, show all active ones
      if (!data || data.length === 0) {
        ({ data } = await supabase
          .from("hero_banners")
          .select(select)
          .eq("is_active", true)
          .order("display_order"));
      }
      if (!data || data.length === 0) return;
      setActiveSlides(
        data.map((b: { id: string; image_url: string; image_path: string; device_type?: string; heading?: string; description?: string }) => ({
          id: b.id,
          image: b.image_url || b.image_path,
          alt: b.heading || "Hero Image",
          heading: b.heading,
          description: b.description,
          device_type: b.device_type,
        }))
      );
      setCurrent(0);
    };
    fetchBanners();
  }, [supabase, isMobile]);

  // Auto-advance banner every 5.5 seconds
  useEffect(() => {
    if (activeSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % activeSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  return (
    <section className="relative w-full overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex items-center">
      {/* ── Background Slides ───────── */}
      {activeSlides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={i === 0}
            unoptimized={s.image.startsWith("http")}
          />
          {/* Subtle soft gradient on the right side for form contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/40 lg:to-black/50" />
        </div>
      ))}

      {/* Overlay text if heading exists */}
      {activeSlides[current]?.heading && (
        <div className="absolute bottom-20 left-8 z-10 max-w-lg">
          <h2 className="text-white text-2xl sm:text-3xl font-extrabold leading-tight drop-shadow-lg">
            {activeSlides[current].heading}
          </h2>
          {activeSlides[current].description && (
            <p className="text-white/80 text-sm mt-2 drop-shadow">
              {activeSlides[current].description}
            </p>
          )}
        </div>
      )}

      {/* ── Content: Admission Form in Right Corner (desktop only) ───────── */}
      <div className="hidden lg:block relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        <div className="flex justify-end">
          <div className="w-full max-w-md lg:max-w-md animate-fadeInUp">
            <AdmissionEnquiryForm compact={true} className="shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl" />
          </div>
        </div>
      </div>

      {/* ── Slider Controls (Dots & Arrows) ──────────────────── */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
        <button
          onClick={prev}
          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {activeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? "w-7 h-2 bg-[#FFC52E]"
                  : "w-2 h-2 bg-white/60 hover:bg-white/90"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

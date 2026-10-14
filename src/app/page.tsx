import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import SchoolHighlights from "@/components/home/SchoolHighlights";
import AdmissionStepsSection from "@/components/home/AdmissionStepsSection";
import ChampionsBannerSection from "@/components/home/ChampionsBannerSection";
import IntroductionSection from "@/components/home/IntroductionSection";
import InfrastructureGrid from "@/components/home/InfrastructureGrid";
import AdmissionFeesGlanceSection from "@/components/home/AdmissionFeesGlanceSection";
import ShaperMethodologySection from "@/components/home/ShaperMethodologySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AdmissionFAQSection from "@/components/home/AdmissionFAQSection";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import ContactMapSection from "@/components/home/ContactMapSection";
import AdmissionEnquiryForm from "@/components/forms/AdmissionEnquiryForm";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

export default async function HomePage() {
  // Fetch active hero banners from Supabase (hero_banners module)
  let bannerSlides: {
    id: string;
    image: string;
    alt: string;
    heading?: string;
    description?: string;
  }[] = [];

  try {
    const supabase = await createClient();
    const { data: heroBanners } = await supabase
      .from("hero_banners")
      .select("id, internal_name, heading, description, alt_text, image_url")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    type HeroBannerRow = {
      id: string;
      internal_name: string;
      heading: string;
      description: string | null;
      alt_text: string | null;
      image_url: string;
    };

    if (heroBanners && heroBanners.length > 0) {
      bannerSlides = heroBanners
        .map((b: HeroBannerRow) => ({
          id: b.id,
          image: b.image_url || "",
          alt: b.alt_text || b.heading || b.internal_name || "SPS Global School Banner",
          heading: b.heading,
          description: b.description ?? undefined,
        }))
        .filter((b: { image: string }) => b.image); // only include banners with images
    }
  } catch {
    // Gracefully fallback to default slides on error
  }

  return (
    <>
      {/* 1. Hero Banner with visible background photo slider & Right Corner Admission Form */}
      <HeroBanner slides={bannerSlides.length > 0 ? bannerSlides : undefined} />

      {/* 1b. Mobile-only: Admission Enquiry section below hero slider */}
      <section className="lg:hidden bg-gradient-to-b from-[#FFF7F8] to-white py-8 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <AdmissionEnquiryForm compact={true} />
        </div>
      </section>

      {/* 2. School Highlights */}
      <SchoolHighlights />

      {/* 3. Admission in 6 Simple Steps */}
      <AdmissionStepsSection />

      {/* 4. Champions Banner */}
      <ChampionsBannerSection />

      {/* 5. Introduction to SPS Global School */}
      <IntroductionSection />

      {/* 6. World-Class Infrastructure */}
      <InfrastructureGrid />

      {/* 7. Fee Structure at a Glance */}
      <AdmissionFeesGlanceSection />

      {/* 8. SHAPER Methodology Banner */}
      <ShaperMethodologySection />

      {/* 9. Testimonials (What Parents Say) */}
      <TestimonialsSection />

      {/* 9. Admission FAQ Accordion */}
      <AdmissionFAQSection />

      {/* 10. Admission Call-to-Action Strip */}
      <AdmissionCTASection />

      {/* 11. Location & Interactive Campus Map */}
      <ContactMapSection />
    </>
  );
}

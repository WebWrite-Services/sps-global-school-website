import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import SchoolHighlights from "@/components/home/SchoolHighlights";
import AdmissionStepsSection from "@/components/home/AdmissionStepsSection";
import IntroductionSection from "@/components/home/IntroductionSection";
import InfrastructureGrid from "@/components/home/InfrastructureGrid";
import AdmissionFeesGlanceSection from "@/components/home/AdmissionFeesGlanceSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AdmissionFAQSection from "@/components/home/AdmissionFAQSection";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import ContactMapSection from "@/components/home/ContactMapSection";
import { createClient } from "@/lib/supabase/server";


export default async function HomePage() {
  // Fetch active banners from Supabase
  let bannerSlides: {
    id: string;
    image: string;
    alt: string;
    heading?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonUrl?: string;
  }[] = [];

  try {
    const supabase = await createClient();
    const { data: banners } = await supabase
      .from("homepage_banners")
      .select("id, internal_name, heading, description, desktop_image_url, primary_button_text, primary_button_url, secondary_button_text, secondary_button_url")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (banners && banners.length > 0) {
      bannerSlides = banners.map((b: any) => ({
        id: b.id,
        image: b.desktop_image_url || "",
        alt: b.heading || b.internal_name || "SPS Global School Banner",
        heading: b.heading,
        description: b.description,
        primaryButtonText: b.primary_button_text,
        primaryButtonUrl: b.primary_button_url,
      })).filter((b: any) => b.image); // only include banners with images
    }
  } catch {
    // Gracefully fallback to default slides on error
  }

  return (
    <>
      {/* 1. Hero Banner with visible background photo slider & Right Corner Admission Form */}
      <HeroBanner slides={bannerSlides.length > 0 ? bannerSlides : undefined} />

      {/* 2. School Highlights */}
      <SchoolHighlights />

      {/* 3. Admission in 6 Simple Steps */}
      <AdmissionStepsSection />

      {/* 4. Introduction to SPS Global School */}
      <IntroductionSection />

      {/* 5. World-Class Infrastructure */}
      <InfrastructureGrid />

      {/* 6. Fee Structure at a Glance */}
      <AdmissionFeesGlanceSection />

      {/* 7. Testimonials (What Parents Say) */}
      <TestimonialsSection />

      {/* 8. Admission FAQ Accordion */}
      <AdmissionFAQSection />

      {/* 9. Admission Call-to-Action Strip */}
      <AdmissionCTASection />

      {/* 10. Location & Interactive Campus Map */}
      <ContactMapSection />
    </>
  );
}

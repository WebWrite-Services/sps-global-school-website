import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import SchoolHighlights from "@/components/home/SchoolHighlights";
import AdmissionStepsSection from "@/components/home/AdmissionStepsSection";
import IntroductionSection from "@/components/home/IntroductionSection";
import InfrastructureGrid from "@/components/home/InfrastructureGrid";
import StudentAchievementsSection from "@/components/home/StudentAchievementsSection";
import AdmissionFeesGlanceSection from "@/components/home/AdmissionFeesGlanceSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AdmissionFAQSection from "@/components/home/AdmissionFAQSection";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import ContactMapSection from "@/components/home/ContactMapSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Banner with visible background photo slider & Right Corner Admission Form */}
      <HeroBanner />

      {/* 2. School Highlights */}
      <SchoolHighlights />

      {/* 3. Admission in 6 Simple Steps */}
      <AdmissionStepsSection />

      {/* 4. Introduction to SPS Global School */}
      <IntroductionSection />

      {/* 5. World-Class Infrastructure */}
      <InfrastructureGrid />

      {/* 6. Student Achievements & Board Results */}
      <StudentAchievementsSection />

      {/* 7. Fee Structure at a Glance */}
      <AdmissionFeesGlanceSection />

      {/* 8. Testimonials (What Parents Say) */}
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

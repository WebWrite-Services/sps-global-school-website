import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import SchoolHighlights from "@/components/home/SchoolHighlights";
import AdmissionStepsSection from "@/components/home/AdmissionStepsSection";
import IntroductionSection from "@/components/home/IntroductionSection";
import AboutCardsSection from "@/components/home/AboutCardsSection";
import LeadershipSection from "@/components/home/LeadershipSection";
import InfrastructureGrid from "@/components/home/InfrastructureGrid";
import AcademicLearningSection from "@/components/home/AcademicLearningSection";
import CoCurricularSection from "@/components/home/CoCurricularSection";
import StudentAchievementsSection from "@/components/home/StudentAchievementsSection";
import AdmissionFeesGlanceSection from "@/components/home/AdmissionFeesGlanceSection";
import GalleryPreviewSection from "@/components/home/GalleryPreviewSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import AdmissionFAQSection from "@/components/home/AdmissionFAQSection";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import LatestBlogsSection from "@/components/home/LatestBlogsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactMapSection from "@/components/home/ContactMapSection";

export default function HomePage() {
  return (
    <>
      {/* Section 3: Hero Banner */}
      <HeroBanner />

      {/* Section 4: School Highlights */}
      <SchoolHighlights />

      {/* From Application to Admission in 6 Steps (Orchids Reference) */}
      <AdmissionStepsSection />

      {/* Section 5: Introduction to SPS Global School */}
      <IntroductionSection />

      {/* Section 6: About Our School Pillars */}
      <AboutCardsSection />

      {/* Section 7: Leadership Messages */}
      <LeadershipSection />

      {/* Section 8: Infrastructure */}
      <InfrastructureGrid />

      {/* Section 9: Academic Learning */}
      <AcademicLearningSection />

      {/* Section 10: Co-curricular Activities */}
      <CoCurricularSection />

      {/* Section 11: Student Achievements */}
      <StudentAchievementsSection />

      {/* Annual Fees at a Glance (Orchids Reference) */}
      <AdmissionFeesGlanceSection />

      {/* Section 12: Gallery Preview */}
      <GalleryPreviewSection />

      {/* Section 13: Why Choose SPS Global School */}
      <WhyChooseUsSection />

      {/* Testimonials (What Parents Say) */}
      <TestimonialsSection />

      {/* Everything About the Admission Process (FAQ) */}
      <AdmissionFAQSection />

      {/* Section 14: Admission CTA */}
      <AdmissionCTASection />

      {/* Section 15: Latest Blogs */}
      <LatestBlogsSection />

      {/* Section 16: Contact Section */}
      <ContactMapSection />
    </>
  );
}

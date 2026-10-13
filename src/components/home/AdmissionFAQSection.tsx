import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { FAQS } from "@/data/school";

export default function AdmissionFAQSection() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Answers to Common Questions"
          title="Everything About the"
          highlightedText="Admission Process"
          subtitle="Clear answers to help you navigate registration, documentation, fees, and school policies."
        />

        <FAQAccordion items={FAQS} defaultOpenIndex={0} />
      </div>
    </section>
  );
}

import React from "react";
import { Phone, Mail, MapPin, Clock, ExternalLink, HelpCircle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { generateSchoolMetadata } from "@/lib/seo";
import { SCHOOL_INFO, TIMINGS, FAQS } from "@/data/school";

export const metadata = generateSchoolMetadata({
  title: "Contact Us & Help Center",
  description:
    "Contact SPS Global School, Jaswantnagar, Etawah. Official phone numbers, email, address on NH-19, office hours, and enquiry form.",
  path: "/contact-us"
});

export default function ContactUsPage() {
  return (
    <>
      <PageHero
        badge="Get In Touch"
        title="Contact Us &amp; Helpdesk"
        subtitle="We welcome parents, prospective students, and community members to reach out or visit our campus."
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Main Form & Contact Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Direct Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FFF7F8] p-6 sm:p-8 rounded-3xl border border-[#FCE5E9] space-y-5">
                <h3 className="font-extrabold text-xl text-[#242424] border-b border-[#FCE5E9] pb-3">
                  SPS Global School
                </h3>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#A50026] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#FFC52E]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#A50026]">
                      Campus Location
                    </h4>
                    <p className="text-xs sm:text-sm text-[#242424] font-medium mt-0.5 leading-snug">
                      {SCHOOL_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#A50026] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#FFC52E]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#A50026]">
                      Phone Lines
                    </h4>
                    <div className="mt-0.5 space-y-0.5 text-xs sm:text-sm font-semibold text-[#242424]">
                      <a href={`tel:${SCHOOL_INFO.primaryPhone}`} className="block hover:text-[#A50026]">
                        {SCHOOL_INFO.primaryPhone} (Admissions)
                      </a>
                      <a href={`tel:${SCHOOL_INFO.secondaryPhone}`} className="block hover:text-[#A50026]">
                        {SCHOOL_INFO.secondaryPhone} (Reception)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#A50026] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#FFC52E]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#A50026]">
                      Official Email
                    </h4>
                    <a
                      href={`mailto:${SCHOOL_INFO.email}`}
                      className="block text-xs sm:text-sm font-semibold text-[#242424] hover:text-[#A50026] break-all mt-0.5"
                    >
                      {SCHOOL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#A50026] text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#FFC52E]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#A50026]">
                      Office Hours
                    </h4>
                    <p className="text-xs sm:text-sm text-[#242424] font-medium mt-0.5">
                      {TIMINGS.schedule}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Closed on Sundays &amp; Gazetted Holidays
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={SCHOOL_INFO.mapCoordinates.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#A50026] hover:bg-[#85001F] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors shadow-xs"
                  >
                    <MapPin className="w-4 h-4 text-[#FFC52E]" />
                    <span>View Campus on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Shivpal Singh Mahavidyalaya Collegiate Desk */}
              <div className="bg-[#FAF7EE] p-6 rounded-3xl border border-[#E4D7A5] space-y-3">
                <h4 className="font-extrabold text-sm text-[#242424]">
                  Shivpal Singh Mahavidyalaya (Higher Education Wing)
                </h4>
                <p className="text-xs text-[#626262]">
                  N.H. 19, Agra Road, Kaist, Jaswantnagar, Etawah (UP) 206245
                </p>
                <div className="text-xs space-y-1 font-semibold text-[#242424]">
                  <p>Phones: +91 7895207777 / +91 7500720914</p>
                  <p>Email: spsdcinfo@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="pt-10 border-t border-gray-100 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
                Frequently Asked Questions
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">
                Common Enquiries &amp; Answers
              </h3>
            </div>
            <FAQAccordion items={FAQS} defaultOpenIndex={0} />
          </div>
        </div>
      </div>
    </>
  );
}

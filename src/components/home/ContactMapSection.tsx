import React from "react";
import { Phone, Mail, MapPin, Clock, ExternalLink, MessageSquare } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/forms/ContactForm";
import { SCHOOL_INFO, TIMINGS } from "@/data/school";

export default function ContactMapSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#FFF7F8] border-b border-[#FCE5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Reach Our Campus"
          title="Connect with Our"
          highlightedText="Admissions &amp; Admin Office"
          subtitle="Located conveniently on National Highway 19, Jaswantnagar. We welcome families for campus walkthroughs."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards & Campus Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-md space-y-5">
              <h3 className="font-extrabold text-lg text-[#242424] border-b border-gray-100 pb-3">
                Official Campus Address
              </h3>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FCE5E9] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#A50026]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#A50026]">
                    Campus Location
                  </h4>
                  <p className="text-xs sm:text-sm text-[#242424] font-medium mt-0.5 leading-snug">
                    {SCHOOL_INFO.address}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Directly accessible via NH-19 Agra Road, Kaist, Jaswantnagar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FCE5E9] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#A50026]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#A50026]">
                    Direct Phone Lines
                  </h4>
                  <div className="mt-0.5 space-y-0.5">
                    <a
                      href={`tel:${SCHOOL_INFO.primaryPhone}`}
                      className="block text-xs sm:text-sm font-semibold text-[#242424] hover:text-[#A50026]"
                    >
                      {SCHOOL_INFO.primaryPhone} (Primary Desk)
                    </a>
                    <a
                      href={`tel:${SCHOOL_INFO.secondaryPhone}`}
                      className="block text-xs sm:text-sm font-semibold text-[#242424] hover:text-[#A50026]"
                    >
                      {SCHOOL_INFO.secondaryPhone} (Admissions)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FCE5E9] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#A50026]" />
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
                <div className="w-10 h-10 rounded-xl bg-[#FCE5E9] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#A50026]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#A50026]">
                    Visiting &amp; Office Hours
                  </h4>
                  <p className="text-xs sm:text-sm text-[#242424] mt-0.5 font-medium">
                    {TIMINGS.schedule}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Parents can meet Principal with prior appointment.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={SCHOOL_INFO.mapCoordinates.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FFF7F8] hover:bg-[#FCE5E9] border border-[#A50026] text-[#A50026] font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Shivpal Singh Mahavidyalaya Group Note */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E4D7A5] text-xs text-[#626262]">
              <span className="font-bold text-[#242424] block mb-1">
                SPS Educational Group Campus:
              </span>
              Also housing Shivpal Singh Mahavidyalaya on NH-19, providing seamless K-12 schooling up to higher degree collegiate education.
            </div>
          </div>

          {/* Right Column: Contact Enquiry Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

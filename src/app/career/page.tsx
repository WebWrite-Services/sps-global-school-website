"use client";

import React, { useState } from "react";
import { Briefcase, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, MapPin } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdmissionCTASection from "@/components/home/AdmissionCTASection";
import { SCHOOL_INFO } from "@/data/school";

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "TGT Mathematics",
    qualification: "M.Sc. B.Ed.",
    experience: "2-5 Years",
    resumeNote: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const openings = [
    {
      title: "PGT & TGT Science & Mathematics",
      dept: "Secondary & Sr. Secondary Division",
      type: "Full-Time • On-Campus",
      qualification: "Post Graduate with B.Ed. & minimum 2 years CBSE teaching experience."
    },
    {
      title: "PRT & Primary All Subjects Teacher",
      dept: "Primary Division (Classes 1–5)",
      type: "Full-Time • On-Campus",
      qualification: "Graduate with D.El.Ed / B.Ed. & fluency in spoken English."
    },
    {
      title: "Computer Science & ICT Instructor",
      dept: "Technology & Coding Lab",
      type: "Full-Time • On-Campus",
      qualification: "BCA / MCA / B.Tech (CS) with proficiency in Python, Scratch & Web basics."
    },
    {
      title: "Physical Education & Sports Coach",
      dept: "Sports & Athletics Department",
      type: "Full-Time • On-Campus",
      qualification: "B.P.Ed / M.P.Ed with specialization in Athletics, Cricket, or Martial Arts."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <>
      <PageHero
        badge="Careers at SPS"
        title="Join Our Educator Community"
        subtitle="We invite passionate, dedicated educators to inspire and guide the next generation in Jaswantnagar."
        breadcrumbs={[{ label: "Career" }]}
      />

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Top Intro */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#A50026] uppercase tracking-wider">
              Work With Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424]">
              Current Academic Openings (Session 2026–27)
            </h2>
            <p className="text-sm text-[#626262]">
              SPS Global School offers a supportive professional atmosphere, competitive compensation, teacher training workshops, and an inspiring community.
            </p>
          </div>

          {/* Job Openings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {openings.map((job) => (
              <div
                key={job.title}
                className="bg-[#FFF7F8] p-6 sm:p-7 rounded-3xl border border-[#FCE5E9] space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#A50026] uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-[#FCE5E9]">
                      {job.dept}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">{job.type}</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#242424]">
                    {job.title}
                  </h3>
                  <p className="text-xs text-[#626262] mt-2 leading-relaxed">
                    <span className="font-semibold text-[#242424]">Eligibility:</span> {job.qualification}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#FCE5E9] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#A50026]">
                    Apply via form below
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#A50026]" /> Jaswantnagar
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#A50026] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#FFC52E]" />
                Direct Application
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#242424] mt-1">
                Faculty Application Form
              </h3>
              <p className="text-xs text-[#626262]">
                Submit your details or email your resume directly to{" "}
                <a href={`mailto:${SCHOOL_INFO.email}`} className="text-[#A50026] font-bold">
                  {SCHOOL_INFO.email}
                </a>
                .
              </p>
            </div>

            {isSuccess ? (
              <div className="p-8 text-center bg-[#FFF7F8] rounded-2xl border border-[#FCE5E9] space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#A50026] mx-auto" />
                <h4 className="font-extrabold text-lg text-[#242424]">
                  Application Received!
                </h4>
                <p className="text-xs text-[#626262]">
                  Thank you, {formData.name}. Our academic recruitment coordinator will review your profile and contact you regarding demo schedules.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#242424] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Candidate Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#A50026] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#242424] mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit Mobile"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#A50026] outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#242424] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#A50026] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#242424] mb-1">
                      Position Applied For
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#A50026] outline-hidden bg-white"
                    >
                      <option value="PGT/TGT Science">PGT / TGT Science</option>
                      <option value="PGT/TGT Mathematics">PGT / TGT Mathematics</option>
                      <option value="TGT English/Social Studies">TGT English / Social Studies</option>
                      <option value="PRT Primary Teacher">PRT Primary Teacher</option>
                      <option value="Pre-Primary / Nursery Teacher">Pre-Primary / Nursery Teacher</option>
                      <option value="Computer & ICT Instructor">Computer &amp; ICT Instructor</option>
                      <option value="Physical Education Coach">Physical Education Coach</option>
                      <option value="Administrative Staff">Administrative / Front Desk Staff</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#242424] mb-1">
                      Highest Qualification
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. M.Sc., B.Ed."
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#A50026] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#242424] mb-1">
                      Teaching Experience
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#A50026] outline-hidden bg-white"
                    >
                      <option value="Fresher">Fresher</option>
                      <option value="1-2 Years">1–2 Years</option>
                      <option value="2-5 Years">2–5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#242424] mb-1">
                    Brief Statement of Teaching Philosophy
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your subject interests, teaching style, and passion for mentoring students..."
                    value={formData.resumeNote}
                    onChange={(e) => setFormData({ ...formData, resumeNote: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#A50026] outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-[#A50026] hover:bg-[#85001F] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#FFC52E]" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#FFC52E]" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <AdmissionCTASection />
    </>
  );
}

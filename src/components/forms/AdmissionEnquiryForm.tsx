"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Sparkles, Send } from "lucide-react";
import { SCHOOL_INFO } from "@/data/school";

interface AdmissionEnquiryFormProps {
  compact?: boolean;
  className?: string;
}

export default function AdmissionEnquiryForm({
  compact = false,
  className = ""
}: AdmissionEnquiryFormProps) {
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    mobile: "",
    email: "",
    city: "Jaswantnagar",
    grade: "NURSERY",
    session: "2026-27",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.parentName.trim()) err.parentName = "Parent name is required";
    if (!formData.studentName.trim()) err.studentName = "Student name is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
      err.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = "Please enter a valid email address";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parent_name: formData.parentName.trim(),
          student_name: formData.studentName.trim(),
          phone: formData.mobile.trim(),
          email: formData.email.trim(),
          city: formData.city,
          class_applying_for: formData.grade,
          academic_session: formData.session,
          message: formData.message.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit admission enquiry');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrors({ form: err.message || 'Submission failed. Please try again or call the helpline.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`bg-white rounded-2xl p-6 sm:p-8 text-center border-2 border-[#A50026] shadow-xl ${className}`}>
        <div className="w-14 h-14 bg-[#FCE5E9] text-[#A50026] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-[#A50026]">
          Enquiry Received!
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#626262] leading-relaxed">
          Thank you, <span className="font-semibold text-[#242424]">{formData.parentName}</span>. Your admission enquiry for <span className="font-semibold text-[#242424]">{formData.studentName}</span> ({formData.grade}) for Session {formData.session} has been registered.
        </p>
        <div className="mt-4 p-3 bg-[#FFF7F8] rounded-xl border border-[#FCE5E9] text-xs text-[#242424]">
          Our admission counselor will reach you at <span className="font-bold text-[#A50026]">{formData.mobile}</span> within 24 working hours.
        </div>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              parentName: "",
              studentName: "",
              mobile: "",
              email: "",
              city: "Jaswantnagar",
              grade: "NURSERY",
              session: "2026-27",
              message: ""
            });
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#A50026] hover:underline cursor-pointer"
        >
          Submit another admission enquiry
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl p-5 sm:p-7 shadow-xl border border-gray-100 relative overflow-hidden ${className}`}
    >
      {/* Top Burgundy Accent Strip */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#85001F] via-[#A50026] to-[#FFC52E]" />

      <div className="mb-5 flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#A50026] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC52E]" />
            Admissions Open 2026–27
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#242424] mt-0.5">
            Admission &amp; Counselling Enquiry
          </h3>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] text-gray-400 block">Class Range</span>
          <span className="text-xs font-bold text-[#A50026]">Play to XII</span>
        </div>
      </div>

      {errors.form && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#242424] mb-1">
              Parent / Guardian Name <span className="text-[#A50026]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Rajesh Kumar"
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border ${
                errors.parentName ? "border-red-500 bg-red-50/20" : "border-gray-200"
              } focus:border-[#A50026] focus:ring-1 focus:ring-[#A50026] outline-hidden transition-all`}
            />
            {errors.parentName && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.parentName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#242424] mb-1">
              Student / Child Name <span className="text-[#A50026]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Aarav Kumar"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border ${
                errors.studentName ? "border-red-500 bg-red-50/20" : "border-gray-200"
              } focus:border-[#A50026] focus:ring-1 focus:ring-[#A50026] outline-hidden transition-all`}
            />
            {errors.studentName && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.studentName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#242424] mb-1">
              Mobile Number <span className="text-[#A50026]">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs font-semibold text-gray-500">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                placeholder="7618307200"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className={`w-full pl-10 pr-3 py-2 text-xs sm:text-sm rounded-xl border ${
                  errors.mobile ? "border-red-500 bg-red-50/20" : "border-gray-200"
                } focus:border-[#A50026] focus:ring-1 focus:ring-[#A50026] outline-hidden transition-all`}
              />
            </div>
            {errors.mobile && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.mobile}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#242424] mb-1">
              Email Address <span className="text-[#A50026]">*</span>
            </label>
            <input
              type="email"
              placeholder="parent@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border ${
                errors.email ? "border-red-500 bg-red-50/20" : "border-gray-200"
              } focus:border-[#A50026] focus:ring-1 focus:ring-[#A50026] outline-hidden transition-all`}
            />
            {errors.email && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#242424] mb-1">
              Applying for Class / Grade <span className="text-[#A50026]">*</span>
            </label>
            <select
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#A50026] focus:ring-1 focus:ring-[#A50026] outline-hidden bg-white text-[#242424]"
            >
              <option value="PLAY GROUP">Play Group / Pre-Nursery</option>
              <option value="NURSERY">Nursery</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="CLASS 1">Class 1</option>
              <option value="CLASS 2">Class 2</option>
              <option value="CLASS 3">Class 3</option>
              <option value="CLASS 4">Class 4</option>
              <option value="CLASS 5">Class 5</option>
              <option value="CLASS 6">Class 6</option>
              <option value="CLASS 7">Class 7</option>
              <option value="CLASS 8">Class 8</option>
              <option value="CLASS 9">Class 9</option>
              <option value="CLASS 10">Class 10</option>
              <option value="CLASS 11">Class 11 (Science / Commerce)</option>
              <option value="CLASS 12">Class 12</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#242424] mb-1">
              Location / Area
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#A50026] focus:ring-1 focus:ring-[#A50026] outline-hidden bg-white text-[#242424]"
            >
              <option value="Jaswantnagar">Jaswantnagar (NH-19 / Local)</option>
              <option value="Kaist">Kaist (Campus vicinity)</option>
              <option value="Etawah City">Etawah City</option>
              <option value="Saifai">Saifai</option>
              <option value="Shikohabad">Shikohabad</option>
              <option value="Mainpuri">Mainpuri</option>
              <option value="Other">Other Region (Etawah Dist.)</option>
            </select>
          </div>
        </div>

        {!compact && (
          <div>
            <label className="block text-xs font-semibold text-[#242424] mb-1">
              Any Specific Query or Note (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Inquiring about transport pickup, fee concession, or campus tour..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#A50026] focus:ring-1 focus:ring-[#A50026] outline-hidden"
            />
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-[#A50026] hover:bg-[#85001F] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#FFC52E]" />
                <span>Processing Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#FFC52E]" />
                <span>Submit Admission Enquiry</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-center text-gray-500 pt-1">
          🔒 Your contact details are secure. Official SPS Global School admission office: {SCHOOL_INFO.primaryPhone}.
        </p>
      </form>
    </div>
  );
}

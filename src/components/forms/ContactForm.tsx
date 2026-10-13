"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { SCHOOL_INFO } from "@/data/school";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Information",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = "Full name is required";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      err.phone = "Valid 10-digit phone number is required";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = "Valid email address is required";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      err.message = "Please write a message with at least 10 characters";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border-2 border-[#A50026] shadow-lg">
        <div className="w-14 h-14 bg-[#FCE5E9] text-[#A50026] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-[#A50026]">Message Delivered</h3>
        <p className="mt-2 text-sm text-[#626262]">
          Thank you, <span className="font-semibold text-[#242424]">{formData.name}</span>. Our administration desk will respond to your query shortly.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              subject: "General Information",
              message: ""
            });
          }}
          className="mt-6 text-xs font-bold text-[#A50026] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 space-y-4">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-lg font-bold text-[#242424]">Send a Direct Message</h3>
        <p className="text-xs text-[#626262]">
          Reach the Principal, Admission Desk, or Administrative Office.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#242424] mb-1">
            Your Full Name <span className="text-[#A50026]">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Ramesh Chandra"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border ${
              errors.name ? "border-red-500 bg-red-50/20" : "border-gray-200"
            } focus:border-[#A50026] outline-hidden`}
          />
          {errors.name && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#242424] mb-1">
            Phone Number <span className="text-[#A50026]">*</span>
          </label>
          <input
            type="tel"
            maxLength={10}
            placeholder="7618307200"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border ${
              errors.phone ? "border-red-500 bg-red-50/20" : "border-gray-200"
            } focus:border-[#A50026] outline-hidden`}
          />
          {errors.phone && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#242424] mb-1">
            Email Address <span className="text-[#A50026]">*</span>
          </label>
          <input
            type="email"
            placeholder="yourname@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border ${
              errors.email ? "border-red-500 bg-red-50/20" : "border-gray-200"
            } focus:border-[#A50026] outline-hidden`}
          />
          {errors.email && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#242424] mb-1">
            Subject
          </label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#A50026] outline-hidden bg-white text-[#242424]"
          >
            <option value="General Information">General Information</option>
            <option value="Admission Enquiry">Admission Enquiry (2026–27)</option>
            <option value="Fee Structure Query">Fee Structure Query</option>
            <option value="Transfer Certificate (TC)">Transfer Certificate (TC)</option>
            <option value="Transport Route Enquiry">Transport Route Enquiry</option>
            <option value="Meeting the Principal">Meeting the Principal / Appointment</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#242424] mb-1">
          Your Message <span className="text-[#A50026]">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Please describe your enquiry in detail..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border ${
            errors.message ? "border-red-500 bg-red-50/20" : "border-gray-200"
          } focus:border-[#A50026] outline-hidden`}
        />
        {errors.message && (
          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 rounded-xl bg-[#A50026] hover:bg-[#85001F] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#FFC52E]" />
            <span>Submitting Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-[#FFC52E]" />
            <span>Send Message</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-gray-500">
        You may also call our direct line at {SCHOOL_INFO.primaryPhone} (Mon–Sat 8:30 AM – 2:00 PM).
      </p>
    </form>
  );
}

import React, { useState } from "react";
import { Sparkles, Building2, Globe, MessageSquare } from "lucide-react";
import { EnquiryFormData, EnquiryValidationErrors } from "@/lib/enquiry/types";
import { processWebsiteEnquiry } from "@/lib/enquiry/trackEnquiry";

const BUSINESS_CATEGORIES = [
  "Dental Clinic",
  "Salon",
  "Gym",
  "Restaurant",
  "Cafe",
  "Hospital",
  "Startup",
  "Coaching Institute",
  "Retail Shop",
  "Real Estate",
  "Portfolio",
  "Other",
];

const WEBSITE_TYPES = [
  "Business Website",
  "Landing Page",
  "Appointment Booking",
  "E-Commerce",
  "Portfolio",
  "Custom Website",
  "Not Sure Yet",
];

const BUDGET_OPTIONS = [
  "Under ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000+",
];

const CONTACT_TIMES = ["Morning", "Afternoon", "Evening", "Anytime"];

const LEAD_SOURCES = [
  "Flyer",
  "Google",
  "Instagram",
  "WhatsApp",
  "Referral",
  "LinkedIn",
  "Other",
];

export function EnquiryForm() {
  const [formData, setFormData] = useState<EnquiryFormData>({
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    businessCategory: "Dental Clinic",
    state: "",
    city: "",
    websiteType: "Business Website",
    projectDescription: "",
    budget: "₹10,000 – ₹25,000",
    preferredContactMethod: "WhatsApp",
    bestTimeToContact: "Anytime",
    leadSource: "Flyer",
  });

  const [errors, setErrors] = useState<EnquiryValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: EnquiryValidationErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business Name is required";
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else {
      const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, "");
      if (cleanPhone.length < 8 || !/^\d+$/.test(cleanPhone)) {
        newErrors.phone = "Please enter a valid phone number (at least 8-10 digits)";
      }
    }

    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.businessCategory.trim()) {
      newErrors.businessCategory = "Please select a Business Category";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = "Please tell us about your business and website needs";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErrorMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await processWebsiteEnquiry(formData);

      if (result.success) {
        setIsSuccess(true);
      } else {
        if (result.errors) {
          setErrors(result.errors as EnquiryValidationErrors);
        }
        setSubmitErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("[EnquiryForm] Submit error:", err);
      setSubmitErrorMessage("An error occurred while processing your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrors({});
    setSubmitErrorMessage(null);
    setFormData({
      businessName: "",
      ownerName: "",
      phone: "",
      email: "",
      businessCategory: "Dental Clinic",
      state: "",
      city: "",
      websiteType: "Business Website",
      projectDescription: "",
      budget: "₹10,000 – ₹25,000",
      preferredContactMethod: "WhatsApp",
      bestTimeToContact: "Anytime",
      leadSource: "Flyer",
    });
  };

  return (
    <div id="enquiry-form" className="w-full max-w-4xl mx-auto my-12 px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[28px] bg-white border border-[#e5dfd5] p-6 sm:p-10 shadow-xl">
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#7c5cff] via-[#4a2fd6] to-[#ff4d6d]" />

        {isSuccess ? (
          /* SUCCESS STATE CARD */
          <div className="py-12 text-center animate-fadeIn">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] mb-6">
              <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="text-3xl font-extrabold text-[#0f0f10]">✅ Thank you!</h3>
            <p className="mt-3 text-lg font-semibold text-[#4a2fd6]">We've received your enquiry.</p>
            <p className="mt-2 max-w-md mx-auto text-sm text-[#0f0f10]/75 leading-relaxed">
              I'll personally review your request and get back to you within <strong>24 hours</strong>.
            </p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full bg-[#7c5cff] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#4a2fd6] transition"
              >
                <Sparkles className="h-4 w-4" /> Send Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* FORM STATE */
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c5cff]/10 text-[#7c5cff] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="h-3.5 w-3.5" /> Start Your Project
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f0f10] tracking-tight">
                🚀 Let's Build Your Website
              </h2>
              <p className="mt-2 max-w-lg mx-auto text-sm text-[#0f0f10]/70 leading-relaxed">
                Need a modern website for your business?
                <br />
                Fill out the form below and I'll contact you within <strong>24 hours</strong>.
              </p>
            </div>

            {submitErrorMessage && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-medium text-red-600 text-center">
                ⚠️ {submitErrorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* SECTION 1: BUSINESS & OWNER DETAILS */}
              <div className="bg-[#fcfbf9] rounded-2xl border border-[#ede8df] p-5 sm:p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7c5cff] flex items-center gap-2">
                  <Building2 className="h-4 w-4" /> 1. Business & Contact Info
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Business Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. SmileCare Dental Studio"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className={`w-full rounded-xl border ${
                          errors.businessName ? "border-red-500 bg-red-50/20" : "border-[#d8d2c6] bg-white"
                        } px-3.5 py-2.5 text-sm text-[#0f0f10] placeholder-[#0f0f10]/40 focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/20 outline-none transition`}
                      />
                    </div>
                    {errors.businessName && <p className="mt-1 text-xs text-red-500">{errors.businessName}</p>}
                  </div>

                  {/* Owner Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                      Owner Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Dr. Rohan Sharma"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className={`w-full rounded-xl border ${
                          errors.ownerName ? "border-red-500 bg-red-50/20" : "border-[#d8d2c6] bg-white"
                        } px-3.5 py-2.5 text-sm text-[#0f0f10] placeholder-[#0f0f10]/40 focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/20 outline-none transition`}
                      />
                    </div>
                    {errors.ownerName && <p className="mt-1 text-xs text-red-500">{errors.ownerName}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="e.g. +91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full rounded-xl border ${
                          errors.phone ? "border-red-500 bg-red-50/20" : "border-[#d8d2c6] bg-white"
                        } px-3.5 py-2.5 text-sm text-[#0f0f10] placeholder-[#0f0f10]/40 focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/20 outline-none transition`}
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                      Email Address <span className="text-xs font-normal text-[#0f0f10]/50">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="e.g. rohan@smilecare.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full rounded-xl border ${
                          errors.email ? "border-red-500 bg-red-50/20" : "border-[#d8d2c6] bg-white"
                        } px-3.5 py-2.5 text-sm text-[#0f0f10] placeholder-[#0f0f10]/40 focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/20 outline-none transition`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Business Category */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                      Business Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.businessCategory}
                      onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                      className="w-full rounded-xl border border-[#d8d2c6] bg-white px-3.5 py-2.5 text-sm text-[#0f0f10] focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/20 outline-none transition cursor-pointer"
                    >
                      {BUSINESS_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location (State & City) */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Maharashtra"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className={`w-full rounded-xl border ${
                          errors.state ? "border-red-500 bg-red-50/20" : "border-[#d8d2c6] bg-white"
                        } px-3 py-2.5 text-sm text-[#0f0f10] placeholder-[#0f0f10]/40 focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/20 outline-none transition`}
                      />
                      {errors.state && <p className="mt-1 text-[11px] text-red-500">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full rounded-xl border ${
                          errors.city ? "border-red-500 bg-red-50/20" : "border-[#d8d2c6] bg-white"
                        } px-3 py-2.5 text-sm text-[#0f0f10] placeholder-[#0f0f10]/40 focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/20 outline-none transition`}
                      />
                      {errors.city && <p className="mt-1 text-[11px] text-red-500">{errors.city}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: PROJECT & BUDGET DETAILS */}
              <div className="bg-[#fcfbf9] rounded-2xl border border-[#ede8df] p-5 sm:p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7c5cff] flex items-center gap-2">
                  <Globe className="h-4 w-4" /> 2. Website & Budget Requirements
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Website Type */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                      Website Type
                    </label>
                    <select
                      value={formData.websiteType}
                      onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                      className="w-full rounded-xl border border-[#d8d2c6] bg-white px-3.5 py-2.5 text-sm text-[#0f0f10] focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/20 outline-none transition cursor-pointer"
                    >
                      {WEBSITE_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                      Your Budget / Target Price
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹15,000 or ₹25,000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full rounded-xl border border-[#d8d2c6] bg-white px-3.5 py-2.5 text-sm text-[#0f0f10] placeholder-[#0f0f10]/40 focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/20 outline-none transition font-medium"
                    />
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-medium text-[#0f0f10]/50">Quick select:</span>
                      {["₹5,000", "₹10,000", "₹25,000", "₹50,000+", "Flexible"].map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: chip })}
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border transition ${
                            formData.budget === chip
                              ? "bg-[#7c5cff] text-white border-[#7c5cff]"
                              : "bg-white text-[#0f0f10]/70 border-[#d8d2c6] hover:border-[#7c5cff]"
                          }`}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder={`Tell me about your business and what kind of website you need.\n\nExample:\n"We own a dental clinic in Noida and want a professional website where patients can book appointments online, view our services, contact us easily, and improve our Google presence."`}
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    className={`w-full rounded-xl border ${
                      errors.projectDescription ? "border-red-500 bg-red-50/20" : "border-[#d8d2c6] bg-white"
                    } px-3.5 py-2.5 text-sm text-[#0f0f10] placeholder-[#0f0f10]/40 focus:border-[#7c5cff] focus:ring-2 focus:ring-[#7c5cff]/20 outline-none transition resize-y`}
                  />
                  {errors.projectDescription && (
                    <p className="mt-1 text-xs text-red-500">{errors.projectDescription}</p>
                  )}
                </div>
              </div>

              {/* SECTION 3: PREFERENCES & LEAD SOURCE */}
              <div className="bg-[#fcfbf9] rounded-2xl border border-[#ede8df] p-5 sm:p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7c5cff] flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> 3. Contact Preferences
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f10] mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["WhatsApp", "Phone Call", "Email"].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredContactMethod: method })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                            formData.preferredContactMethod === method
                              ? "bg-[#7c5cff] text-white border-[#7c5cff]"
                              : "bg-white text-[#0f0f10]/80 border-[#d8d2c6] hover:border-[#7c5cff]"
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Best Time to Contact */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                      Best Time to Contact
                    </label>
                    <select
                      value={formData.bestTimeToContact}
                      onChange={(e) => setFormData({ ...formData, bestTimeToContact: e.target.value })}
                      className="w-full rounded-xl border border-[#d8d2c6] bg-white px-3 py-2 text-xs font-semibold text-[#0f0f10] focus:border-[#7c5cff] outline-none transition cursor-pointer"
                    >
                      {CONTACT_TIMES.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* How Did You Find Us? */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f0f10] mb-1">
                      How Did You Find Us?
                    </label>
                    <select
                      value={formData.leadSource}
                      onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                      className="w-full rounded-xl border border-[#d8d2c6] bg-white px-3 py-2 text-xs font-semibold text-[#0f0f10] focus:border-[#7c5cff] outline-none transition cursor-pointer"
                    >
                      {LEAD_SOURCES.map((src) => (
                        <option key={src} value={src}>
                          {src}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto mx-auto flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#4a2fd6] px-8 py-3.5 text-base font-bold text-white shadow-lg hover:shadow-xl hover:opacity-95 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      🚀 Send Enquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

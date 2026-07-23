import { EnquiryFormData } from "./types";
import { sendEnquiryDiscordNotification } from "./discordEnquiry";

export async function processWebsiteEnquiry(
  payload: Partial<EnquiryFormData>
): Promise<{ success: boolean; message: string; errors?: Record<string, string> }> {
  try {
    const errors: Record<string, string> = {};

    if (!payload.businessName || !payload.businessName.trim()) {
      errors.businessName = "Business Name is required";
    }

    if (!payload.ownerName || !payload.ownerName.trim()) {
      errors.ownerName = "Owner Name is required";
    }

    if (!payload.phone || !payload.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else {
      const cleanPhone = payload.phone.replace(/[\s\-\(\)\+]/g, "");
      if (cleanPhone.length < 8 || !/^\d+$/.test(cleanPhone)) {
        errors.phone = "Please enter a valid phone number";
      }
    }

    if (payload.email && payload.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(payload.email.trim())) {
        errors.email = "Please enter a valid email address";
      }
    }

    if (!payload.businessCategory || !payload.businessCategory.trim()) {
      errors.businessCategory = "Business Category is required";
    }

    if (!payload.state || !payload.state.trim()) {
      errors.state = "State is required";
    }

    if (!payload.city || !payload.city.trim()) {
      errors.city = "City is required";
    }

    if (!payload.projectDescription || !payload.projectDescription.trim()) {
      errors.projectDescription = "Project Description is required";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Please fill out all required fields correctly",
        errors,
      };
    }

    const cleanData: EnquiryFormData = {
      businessName: payload.businessName!.trim(),
      ownerName: payload.ownerName!.trim(),
      phone: payload.phone!.trim(),
      email: payload.email?.trim() || "",
      businessCategory: payload.businessCategory!.trim(),
      state: payload.state!.trim(),
      city: payload.city!.trim(),
      websiteType: payload.websiteType?.trim() || "Not Specified",
      projectDescription: payload.projectDescription!.trim(),
      budget: payload.budget?.trim() || "Not Specified",
      preferredContactMethod: payload.preferredContactMethod?.trim() || "WhatsApp",
      bestTimeToContact: payload.bestTimeToContact?.trim() || "Anytime",
      leadSource: payload.leadSource?.trim() || "Direct Website",
    };

    // Send notification to Discord Webhook
    await sendEnquiryDiscordNotification(cleanData);

    return {
      success: true,
      message: "Enquiry submitted successfully",
    };
  } catch (error) {
    console.error("[Enquiry API] Unexpected server error:", error);
    return {
      success: false,
      message: "An unexpected error occurred while processing your enquiry. Please try again.",
    };
  }
}

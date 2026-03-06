/**
 * Contact Inquiry Service
 * 
 * Abstracts backend calls for contact/sales form submissions.
 * Swap the implementation to migrate away from Lovable Cloud.
 */

import { supabase } from "@/integrations/supabase/client";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  companySize?: string;
  message?: string;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitContactInquiry(data: ContactFormData): Promise<SubmitResult> {
  try {
    const { error } = await supabase.from("contact_inquiries").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      company: data.company || null,
      company_size: data.companySize || null,
      message: data.message || null,
    });
    if (error) throw error;
    return { success: true };
  } catch {
    return { success: false, error: "Failed to submit. Please try again." };
  }
}

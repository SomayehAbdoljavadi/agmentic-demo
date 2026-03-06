/**
 * Demo Verification Service
 * 
 * Abstracts all backend calls for demo access verification.
 * To migrate away from Lovable Cloud / Supabase, replace the
 * implementations below with your own API calls.
 */

import { supabase } from "@/integrations/supabase/client";

export interface SendCodeResult {
  success: boolean;
  error?: string;
}

export interface VerifyCodeResult {
  verified: boolean;
  error?: string;
}

/**
 * Send a one-time verification code to the given email.
 */
export async function sendDemoCode(email: string): Promise<SendCodeResult> {
  try {
    const { data, error } = await supabase.functions.invoke("send-demo-code", {
      body: { email },
    });
    if (error) throw error;
    if (data?.error) return { success: false, error: data.error };
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send code. Please try again." };
  }
}

/**
 * Verify a one-time code for the given email.
 */
export async function verifyDemoCode(email: string, code: string): Promise<VerifyCodeResult> {
  try {
    const { data, error } = await supabase.functions.invoke("verify-demo-code", {
      body: { email, code },
    });
    if (error) throw error;
    if (data?.error) return { verified: false, error: data.error };
    return { verified: !!data?.verified };
  } catch {
    return { verified: false, error: "Verification failed. Please try again." };
  }
}

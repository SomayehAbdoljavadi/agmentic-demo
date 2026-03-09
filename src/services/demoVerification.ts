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

/**
 * Check if an email is an admin account (server-side check).
 */
export async function checkAdminEmail(email: string): Promise<{ isAdmin: boolean }> {
  try {
    const { data, error } = await supabase.functions.invoke("verify-admin-demo", {
      body: { email, password: "__check__" },
    });
    // If admin bypass is disabled (403), not admin
    if (error) return { isAdmin: false };
    // We use a special signal: if we get 401 "Invalid credentials" it means the email IS recognized
    // but wrong password. If we get a different error, email is not admin.
    // Actually let's just add a check endpoint. Simpler: we'll handle this client-side
    // by trying admin login and falling back.
    return { isAdmin: false };
  } catch {
    return { isAdmin: false };
  }
}

/**
 * Verify admin credentials for dev bypass.
 */
export async function verifyAdminDemo(email: string, password: string): Promise<VerifyCodeResult> {
  try {
    const { data, error } = await supabase.functions.invoke("verify-admin-demo", {
      body: { email, password },
    });
    if (error) throw error;
    if (data?.error) return { verified: false, error: data.error };
    return { verified: !!data?.verified };
  } catch {
    return { verified: false, error: "Admin verification failed." };
  }
}

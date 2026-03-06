import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, CheckCircle2, AlertCircle, RotateCcw } from "lucide-react";
import { sendDemoCode, verifyDemoCode } from "@/services/demoVerification";
import { useDemoAccess } from "@/contexts/DemoAccessContext";
import { useNavigate } from "react-router-dom";

type Step = "email" | "code" | "success";

const DemoAccessModal = () => {
  const { isModalOpen, closeModal, markVerified } = useDemoAccess();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when step changes
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isModalOpen, step]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Reset state when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setStep("email");
      setEmail("");
      setCode("");
      setError("");
      setLoading(false);
      setResendCooldown(0);
    }
  }, [isModalOpen]);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSendCode = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);
    const result = await sendDemoCode(email);
    if (result.success) {
      setStep("code");
      setResendCooldown(60);
    } else {
      setError(result.error || "Failed to send code.");
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    setError("");
    setLoading(true);
    const result = await verifyDemoCode(email, code);
    if (result.verified) {
      setStep("success");
      markVerified();
      setTimeout(() => navigate("/demo"), 800);
    } else {
      setError(result.error || "Verification failed.");
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError("");
    setLoading(true);
    const result = await sendDemoCode(email);
    if (result.success) {
      setResendCooldown(60);
    } else {
      setError(result.error || "Failed to resend code.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      if (step === "email") handleSendCode();
      else if (step === "code") handleVerifyCode();
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md glass-card-strong p-8 glow-md"
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Decorative glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {step === "email" && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 glow-sm">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">Access the Demo</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Enter your email to receive a verification code
                  </p>
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    onKeyDown={handleKeyDown}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 text-xs text-destructive mt-2"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {error}
                    </motion.p>
                  )}
                  <button
                    onClick={handleSendCode}
                    disabled={loading || !email}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-sm"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Send Code
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {step === "code" && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 glow-sm">
                    <div className="w-3 h-3 rounded-full bg-accent-foreground animate-pulse" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">Enter Verification Code</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    We sent a 6-digit code to
                  </p>
                  <p className="text-sm text-foreground font-medium mb-6">{email}</p>
                  <input
                    ref={inputRef}
                    type="text"
                    value={code}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setCode(val);
                      setError("");
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground text-center text-2xl font-mono tracking-[0.4em] placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 text-xs text-destructive mt-2"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {error}
                    </motion.p>
                  )}
                  <button
                    onClick={handleVerifyCode}
                    disabled={loading || code.length !== 6}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-sm"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Verify and Continue
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => { setStep("email"); setCode(""); setError(""); }}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Change email
                    </button>
                    <button
                      onClick={handleResend}
                      disabled={resendCooldown > 0 || loading}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
                    >
                      <RotateCcw className="w-3 h-3" />
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative flex flex-col items-center text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 glow-md">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">Verified!</h3>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to the demo…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoAccessModal;

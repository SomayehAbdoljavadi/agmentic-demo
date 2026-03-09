import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle, TrendingUp, Megaphone, Package, DollarSign, Target, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDemoAccess } from "@/contexts/DemoAccessContext";

const demoSteps = [
  { label: "Data Ingestion", key: "ingest" },
  { label: "Decision Report", key: "report" },
  { label: "Agent Review", key: "agents" },
  { label: "Aligned Output", key: "output" },
];

const agentReviews = [
  { icon: TrendingUp, name: "Sales Agent", verdict: "Approve", confidence: 92, note: "Strong pipeline signal — high close probability for Q2.", color: "text-accent-foreground" },
  { icon: Megaphone, name: "Marketing Agent", verdict: "Approve", confidence: 87, note: "Campaign data supports increased spend in this segment.", color: "text-accent-foreground" },
  { icon: Package, name: "Product Agent", verdict: "Flag", confidence: 74, note: "Feature gap identified — roadmap adjustment recommended.", color: "text-warning" },
  { icon: DollarSign, name: "Finance Agent", verdict: "Approve", confidence: 91, note: "Margin analysis positive. Within budget thresholds.", color: "text-accent-foreground" },
  { icon: Target, name: "Strategy Agent", verdict: "Approve", confidence: 95, note: "Fully aligned with Q2 OKRs and market expansion goals.", color: "text-accent-foreground" },
];

const Demo = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { isVerified, revokeAccess } = useDemoAccess();

  // Guard: redirect if not verified
  useEffect(() => {
    if (!isVerified) {
      navigate("/", { replace: true });
    }
  }, [isVerified, navigate]);

  // Revoke access when leaving the demo page
  useEffect(() => {
    return () => {
      revokeAccess();
    };
  }, [revokeAccess]);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">Interactive Demo</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              See Decision Intelligence in Action
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Walk through a simulated decision cycle from data ingestion to aligned recommendations.
            </p>
          </motion.div>

          {/* Step tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {demoSteps.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setStep(i)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  step === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Step content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 md:p-10"
          >
            {step === 0 && (
              <div>
                <h3 className="text-xl font-display font-semibold mb-6">Data Sources Connected</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "Salesforce CRM", records: "12,847", status: "Synced" },
                    { name: "Google Analytics", records: "1.2M events", status: "Synced" },
                    { name: "SAP ERP", records: "8,234", status: "Synced" },
                    { name: "Market Research API", records: "340 reports", status: "Synced" },
                  ].map((src) => (
                    <div key={src.name} className="p-4 rounded-xl bg-surface border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
                        <span className="text-xs text-accent-foreground font-medium">{src.status}</span>
                      </div>
                      <p className="font-medium text-sm mb-1">{src.name}</p>
                      <p className="text-xs text-muted-foreground">{src.records}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="text-xl font-display font-semibold mb-6">Decision Intelligence Report</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { metric: "Sales Opportunity Score", value: "87/100", trend: "+12 vs last quarter" },
                    { metric: "Marketing Campaign Priority", value: "High", trend: "3 campaigns flagged" },
                    { metric: "Product Roadmap Signal", value: "Moderate", trend: "2 feature gaps detected" },
                    { metric: "Financial Margin Analysis", value: "Positive", trend: "14.2% above threshold" },
                  ].map((item) => (
                    <div key={item.metric} className="p-5 rounded-xl bg-surface border border-border">
                      <p className="text-xs text-muted-foreground mb-2">{item.metric}</p>
                      <p className="text-2xl font-display font-bold mb-1">{item.value}</p>
                      <p className="text-xs text-accent-foreground">{item.trend}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-xl font-display font-semibold mb-6">Agent Review Panel</h3>
                <div className="space-y-4">
                  {agentReviews.map((agent) => (
                    <div key={agent.name} className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <agent.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium text-sm">{agent.name}</span>
                          <span className={`text-xs font-medium ${agent.color}`}>
                            {agent.verdict === "Flag" && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                            {agent.verdict}
                          </span>
                          <span className="text-xs text-muted-foreground ml-auto">{agent.confidence}% confidence</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{agent.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-xl font-display font-semibold mb-6">Aligned Recommendation</h3>
                <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    <span className="font-display font-semibold text-lg">Decision: Proceed with Expansion</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    4 of 5 agents approve. Product Agent flagged a feature gap that has been escalated to the roadmap. 
                    Overall alignment score: 91.2%. Decision approved through governance layer.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-display font-bold text-primary">91.2%</p>
                      <p className="text-xs text-muted-foreground">Alignment Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-display font-bold">4/5</p>
                      <p className="text-xs text-muted-foreground">Agents Approved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-display font-bold text-accent-foreground">Low</p>
                      <p className="text-xs text-muted-foreground">Risk Level</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
                    Download Full Report <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-5 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setStep(Math.min(demoSteps.length - 1, step + 1))}
              disabled={step === demoSteps.length - 1}
              className="px-5 py-2 text-sm bg-card border border-border rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors"
            >
              Next Step
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;

import { motion } from "framer-motion";
import { Brain, Shield, GitBranch, FileText, Search, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const features = [
  {
    icon: Brain,
    title: "Decision Intelligence Engine",
    description: "Core AI system that processes multi-source data into structured decision frameworks with scoring, confidence levels, and contextual reasoning.",
  },
  {
    icon: Shield,
    title: "AI Governance Layer",
    description: "Executive oversight system ensuring all AI-generated decisions comply with organizational policies, risk thresholds, and strategic priorities.",
  },
  {
    icon: GitBranch,
    title: "Cross-Department Validation",
    description: "Specialized agents from each department independently validate decisions, surfacing conflicts and alignment opportunities.",
  },
  {
    icon: Search,
    title: "Explainable AI Reasoning",
    description: "Every decision comes with transparent reasoning chains, data sources cited, and confidence intervals — no black boxes.",
  },
  {
    icon: FileText,
    title: "Audit Logs & Traceability",
    description: "Complete decision audit trail from data ingestion through agent validation to final governance approval.",
  },
  {
    icon: BarChart3,
    title: "Decision Analytics",
    description: "Track decision quality over time, measure alignment scores, and identify patterns in organizational decision-making.",
  },
];

const Product = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mb-20"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">Product</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Decision Intelligence, <span className="text-gradient-primary">Engineered</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A comprehensive platform that transforms how organizations make, validate, and govern strategic decisions using AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="section-padding bg-surface">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
          >
            How the Platform Works Together
          </motion.h2>

          <div className="glass-card p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Input</h4>
                {["CRM Data", "ERP Systems", "Analytics", "Market Data"].map((item) => (
                  <div key={item} className="p-3 rounded-lg bg-surface border border-border text-sm">{item}</div>
                ))}
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Process</h4>
                {["Data Normalization", "Profile Generation", "AI Reasoning", "Agent Validation"].map((item) => (
                  <div key={item} className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">{item}</div>
                ))}
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Output</h4>
                {["Decision Reports", "Alignment Scores", "Action Items", "Audit Trails"].map((item) => (
                  <div key={item} className="p-3 rounded-lg bg-surface border border-border text-sm">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Product;

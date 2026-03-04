import { motion } from "framer-motion";
import { Database, Brain, Bot, Shield, GitBranch } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const techLayers = [
  {
    icon: Database,
    title: "Data Ingestion Layer",
    description: "Connects to CRMs, ERPs, analytics platforms, market data APIs, and internal databases. Normalizes heterogeneous data into a unified schema optimized for decision analysis.",
    details: ["REST & GraphQL connectors", "Real-time streaming", "Schema normalization", "Data validation"],
  },
  {
    icon: Brain,
    title: "AI Reasoning Engine",
    description: "Core intelligence system that processes normalized data through multiple reasoning frameworks to generate structured decision intelligence reports.",
    details: ["Multi-modal reasoning", "Contextual analysis", "Confidence scoring", "Causal inference"],
  },
  {
    icon: Bot,
    title: "Multi-Agent System",
    description: "Specialized AI agents representing each business function. Each agent independently validates decisions from its domain perspective.",
    details: ["Domain-specific training", "Independent validation", "Conflict detection", "Consensus building"],
  },
  {
    icon: GitBranch,
    title: "Decision Validation Framework",
    description: "Cross-references agent outputs, identifies conflicts, and produces alignment scores with detailed reasoning chains.",
    details: ["Cross-validation", "Alignment scoring", "Reasoning chains", "Risk assessment"],
  },
  {
    icon: Shield,
    title: "Governance Layer",
    description: "Executive-level oversight ensuring decisions comply with strategic objectives, regulatory requirements, and organizational policies.",
    details: ["Policy enforcement", "Audit trails", "Compliance checks", "Escalation workflows"],
  },
];

const Technology = () => {
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
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">Technology</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Technical Architecture
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Built on a modular, enterprise-grade architecture designed for scalability, security, and explainability.
            </p>
          </motion.div>

          <div className="space-y-6">
            {techLayers.map((layer, i) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <layer.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-display font-semibold">{layer.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{layer.description}</p>
                  </div>
                  <div className="md:w-64 shrink-0">
                    <div className="grid grid-cols-2 gap-2">
                      {layer.details.map((d) => (
                        <div key={d} className="px-3 py-2 rounded-lg bg-surface border border-border text-xs text-muted-foreground">
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Technology;

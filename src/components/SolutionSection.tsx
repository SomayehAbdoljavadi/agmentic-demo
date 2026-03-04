import { motion } from "framer-motion";
import { Layers, Brain, Shield, ArrowRight } from "lucide-react";

const SolutionSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">The Solution</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-5">
            Decision Intelligence Platform
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            A unified AI system that ingests your data, reasons across departments, and delivers aligned, explainable decisions.
          </p>
        </motion.div>

        {/* Flow visualization */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-20">
          {[
            { label: "Enterprise Data", color: "bg-cyan/10 text-cyan border-cyan/20" },
            { label: "Intelligence", color: "bg-primary/10 text-primary border-primary/20" },
            { label: "Structured Decisions", color: "bg-glow-secondary/10 text-glow-secondary border-glow-secondary/20" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className={`px-6 py-3 rounded-xl border ${item.color} font-display font-semibold text-sm`}>
                {item.label}
              </div>
              {i < 2 && (
                <ArrowRight className="hidden md:block w-5 h-5 text-muted-foreground" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Layers,
              title: "Unified Data Layer",
              description: "Connect all company systems into a single intelligence fabric for comprehensive analysis.",
            },
            {
              icon: Brain,
              title: "AI Reasoning Engine",
              description: "Multi-agent system that analyzes, validates, and aligns decisions with organizational goals.",
            },
            {
              icon: Shield,
              title: "Governance Framework",
              description: "Executive oversight with full audit trails, explainable AI, and compliance tracking.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="text-center p-8 rounded-2xl glass-card hover:glow-sm transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
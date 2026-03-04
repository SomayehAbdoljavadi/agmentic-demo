import { motion } from "framer-motion";
import { Layers, Brain, Shield } from "lucide-react";

const SolutionSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">The Solution</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Introducing the Decision Intelligence Platform
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A unified AI system that ingests your data, reasons across departments, and delivers aligned, explainable decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Layers,
              title: "Unified Data Layer",
              description: "Connect all company systems into a single intelligence fabric.",
            },
            {
              icon: Brain,
              title: "AI Reasoning Engine",
              description: "Multi-agent system that analyzes, validates, and aligns decisions.",
            },
            {
              icon: Shield,
              title: "Governance Framework",
              description: "Executive oversight with full audit trails and explainable AI.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="text-center p-8 rounded-2xl bg-card border border-border"
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

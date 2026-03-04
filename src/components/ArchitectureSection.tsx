import { motion } from "framer-motion";

const layers = [
  { name: "Executive Governance Layer", description: "Strategic alignment & oversight", level: "L6", accent: true },
  { name: "Department AI Agents", description: "Sales · Marketing · Product · Finance · Strategy", level: "L5", accent: false },
  { name: "AI Reasoning Core", description: "Multi-agent decision validation", level: "L4", accent: false },
  { name: "Decision Intelligence Engine", description: "Intelligence report generation", level: "L3", accent: false },
  { name: "Profile Generation Engine", description: "Accounts · Markets · Products", level: "L2", accent: false },
  { name: "Data Ingestion Layer", description: "Unified data ingestion & connectors", level: "L1", accent: false },
];

const ArchitectureSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">Architecture</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-5">
            Platform Architecture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A layered system designed for enterprise-grade decision intelligence.
          </p>
        </motion.div>

        <div className="space-y-3">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`p-5 md:p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all duration-300 hover:glow-sm ${
                layer.accent
                  ? "glass-card border-primary/20 bg-primary/5"
                  : "glass-card"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono text-xs font-bold shrink-0">
                  {layer.level}
                </div>
                <h3 className="font-display font-semibold">{layer.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground md:text-right">{layer.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-8"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Data flows upward through each layer</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
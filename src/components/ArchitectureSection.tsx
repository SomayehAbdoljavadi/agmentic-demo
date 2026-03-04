import { motion } from "framer-motion";

const layers = [
  { name: "Executive Governance Layer", description: "Strategic alignment & oversight", position: "top" },
  { name: "Department AI Agents", description: "Sales · Marketing · Product · Finance · Strategy", position: "mid" },
  { name: "AI Reasoning Core", description: "Multi-agent decision validation", position: "mid" },
  { name: "Decision Engine", description: "Intelligence report generation", position: "mid" },
  { name: "Data Layer", description: "Unified data ingestion & profiles", position: "bottom" },
];

const ArchitectureSection = () => {
  return (
    <section className="section-padding bg-surface">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">Architecture</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Product Architecture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A layered system designed for enterprise-grade decision intelligence.
          </p>
        </motion.div>

        <div className="space-y-3">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 md:p-6 rounded-xl border border-border flex flex-col md:flex-row md:items-center justify-between gap-2 ${
                i === 0
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono text-xs font-bold shrink-0">
                  L{layers.length - i}
                </div>
                <h3 className="font-display font-semibold">{layer.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground md:text-right">{layer.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Connection arrows */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Data flows upward through each layer</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;

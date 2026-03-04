import { motion } from "framer-motion";
import { Database, Brain, TrendingUp, Megaphone, Package, DollarSign, Target, Shield, FileText } from "lucide-react";

const workflowSteps = [
  { icon: Database, label: "Company Data", sublabel: "CRM · ERP · Analytics", tier: 0 },
  { icon: Brain, label: "Decision Intelligence Engine", sublabel: "AI Reasoning Core", tier: 1 },
];

const agentNodes = [
  { icon: TrendingUp, label: "Sales" },
  { icon: Megaphone, label: "Marketing" },
  { icon: Package, label: "Product" },
  { icon: DollarSign, label: "Finance" },
];

const AgentWorkflowSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">Agent Workflow</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-5">
            How Agents <span className="text-gradient-primary">Collaborate</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A multi-layered validation process ensures every decision is reviewed from multiple perspectives.
          </p>
        </motion.div>

        {/* Workflow visualization */}
        <div className="flex flex-col items-center gap-3">
          {/* Layer 1: Data */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="px-8 py-4 rounded-xl glass-card flex items-center gap-3 glow-sm"
          >
            <Database className="w-5 h-5 text-cyan" />
            <div>
              <p className="font-display font-semibold text-sm">Company Data</p>
              <p className="text-xs text-muted-foreground">CRM · ERP · Analytics · Market Data</p>
            </div>
          </motion.div>

          {/* Connector */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-px h-10 line-glow origin-top"
          />

          {/* Layer 2: Engine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="px-8 py-4 rounded-xl glass-card flex items-center gap-3 border-primary/20 glow-md"
          >
            <Brain className="w-5 h-5 text-primary" />
            <div>
              <p className="font-display font-semibold text-sm">Decision Intelligence Engine</p>
              <p className="text-xs text-muted-foreground">AI Reasoning Core</p>
            </div>
          </motion.div>

          {/* Fan out connectors */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-end justify-center w-full max-w-lg"
          >
            <svg viewBox="0 0 400 40" className="w-full h-10" preserveAspectRatio="none">
              <line x1="200" y1="0" x2="50" y2="40" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
              <line x1="200" y1="0" x2="150" y2="40" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
              <line x1="200" y1="0" x2="250" y2="40" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
              <line x1="200" y1="0" x2="350" y2="40" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
            </svg>
          </motion.div>

          {/* Layer 3: Agent cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-lg">
            {agentNodes.map((agent, i) => (
              <motion.div
                key={agent.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                className="p-4 rounded-xl glass-card text-center hover:border-primary/20 transition-all"
              >
                <agent.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs font-display font-semibold">{agent.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Review</p>
              </motion.div>
            ))}
          </div>

          {/* Converge connectors */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="flex items-start justify-center w-full max-w-lg"
          >
            <svg viewBox="0 0 400 40" className="w-full h-10" preserveAspectRatio="none">
              <line x1="50" y1="0" x2="200" y2="40" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
              <line x1="150" y1="0" x2="200" y2="40" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
              <line x1="250" y1="0" x2="200" y2="40" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
              <line x1="350" y1="0" x2="200" y2="40" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
            </svg>
          </motion.div>

          {/* Layer 4: Strategy alignment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="px-8 py-4 rounded-xl glass-card flex items-center gap-3 border-glow-secondary/20"
          >
            <Target className="w-5 h-5 text-glow-secondary" />
            <div>
              <p className="font-display font-semibold text-sm">Strategy Agent Alignment</p>
              <p className="text-xs text-muted-foreground">Cross-department coherence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.3, duration: 0.4 }}
            className="w-px h-10 line-glow origin-top"
          />

          {/* Layer 5: Final output */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="px-8 py-5 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3 glow-primary"
          >
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <p className="font-display font-semibold text-sm">Executive Decision Report</p>
              <p className="text-xs text-muted-foreground">Aligned · Explainable · Auditable</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AgentWorkflowSection;
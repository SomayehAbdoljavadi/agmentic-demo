import { motion } from "framer-motion";
import { AlertTriangle, GitBranch, Database } from "lucide-react";

const problems = [
  {
    icon: Database,
    title: "Data Silos",
    description: "Critical information trapped in disconnected systems, preventing holistic analysis.",
  },
  {
    icon: GitBranch,
    title: "Misaligned Departments",
    description: "Teams making conflicting decisions without visibility into each other's priorities.",
  },
  {
    icon: AlertTriangle,
    title: "Decision Fragmentation",
    description: "No unified framework to evaluate, validate, and align strategic decisions.",
  },
];

const ProblemSection = () => {
  return (
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">The Problem</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Organizations Are Making Decisions in the Dark
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enterprises lose millions annually to poorly coordinated decisions scattered across departments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <p.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

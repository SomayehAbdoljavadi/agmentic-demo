import { motion } from "framer-motion";
import { AlertTriangle, GitBranch, Database, Eye } from "lucide-react";

const problems = [
  {
    icon: Database,
    title: "Data Silos",
    description: "Critical information trapped in disconnected systems, preventing holistic analysis and informed decisions.",
  },
  {
    icon: GitBranch,
    title: "Misaligned Departments",
    description: "Teams making conflicting decisions without visibility into each other's priorities or strategic context.",
  },
  {
    icon: AlertTriangle,
    title: "Decision Fragmentation",
    description: "No unified framework to evaluate, validate, and align strategic decisions across the organization.",
  },
  {
    icon: Eye,
    title: "No Explainable Logic",
    description: "Decisions made without transparent reasoning, making audit trails and accountability impossible.",
  },
];

const ProblemSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">The Problem</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-5">
            Organizations Are Making{" "}
            <span className="text-gradient-primary">Decisions in the Dark</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Enterprises lose millions annually to poorly coordinated decisions scattered across departments and disconnected systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-8 rounded-2xl glass-card hover:border-primary/20 transition-all duration-300 hover:glow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
                <p.icon className="w-5 h-5 text-primary" />
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
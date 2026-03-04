import { motion } from "framer-motion";
import { TrendingUp, Megaphone, Package, DollarSign, Target } from "lucide-react";

const agents = [
  {
    icon: TrendingUp,
    name: "Sales Agent",
    description: "Analyzes pipeline health, scores opportunities, and recommends deal prioritization.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Megaphone,
    name: "Marketing Agent",
    description: "Evaluates campaign performance, audience signals, and channel allocation strategies.",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Package,
    name: "Product Agent",
    description: "Tracks feature requests, usage patterns, and product-market fit indicators.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: DollarSign,
    name: "Finance Agent",
    description: "Monitors margin analysis, budget forecasting, and financial risk assessment.",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Target,
    name: "Strategy Agent",
    description: "Aligns cross-department decisions with OKRs and long-term strategic goals.",
    color: "bg-primary/10 text-primary",
  },
];

const AgentsSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">AI Agents</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Specialized Agents for Every Department
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each agent brings domain expertise to validate decisions from its unique perspective.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:glow-sm transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${agent.color} flex items-center justify-center mb-5`}>
                <agent.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">{agent.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{agent.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;

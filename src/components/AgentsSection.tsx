import { motion } from "framer-motion";
import { TrendingUp, Megaphone, Package, DollarSign, Target } from "lucide-react";

const agents = [
  {
    icon: TrendingUp,
    name: "Sales Agent",
    description: "Predicts deal probability and prioritizes accounts based on pipeline signals and historical patterns.",
  },
  {
    icon: Megaphone,
    name: "Marketing Agent",
    description: "Validates positioning and campaign priority by analyzing audience engagement and channel performance.",
  },
  {
    icon: Package,
    name: "Product Agent",
    description: "Detects feature demand and innovation opportunities through usage analytics and market signals.",
  },
  {
    icon: DollarSign,
    name: "Finance Agent",
    description: "Analyzes margin impact and resource constraints to ensure financial viability of decisions.",
  },
  {
    icon: Target,
    name: "Strategy Agent",
    description: "Ensures cross-department alignment and strategic coherence with company OKRs and long-term goals.",
  },
];

const AgentsSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">AI Agent Ecosystem</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-5">
            Specialized Agents for{" "}
            <span className="text-gradient-primary">Every Department</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each agent brings domain expertise to validate decisions from its unique perspective.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-7 rounded-2xl glass-card hover:border-primary/25 transition-all duration-300 hover:glow-sm cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                <agent.icon className="w-5 h-5 text-primary" />
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
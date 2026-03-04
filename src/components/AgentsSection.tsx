import { motion } from "framer-motion";
import darkBg from "@/assets/dark-bg.png";

const AgentsSection = () => {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <img src={darkBg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-accent-foreground mb-6"
        >
          Redefining the Boundaries of AI Agents
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-display leading-tight mb-8"
        >
          A Connected Network of Marketing AI Agents Working in Sync.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          Agmentic coordinates 20+ autonomous agents that collaborate across data, creative, and strategy. 
          Each agent is built for a specific marketing discipline — reporting, optimization, bidding, 
          creative analysis, and more. Together, they function as a synchronized, intelligent system.
        </motion.p>
      </div>
    </section>
  );
};

export default AgentsSection;

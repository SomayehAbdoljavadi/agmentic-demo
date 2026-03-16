import { motion } from "framer-motion";
import AgentNetworkCanvas from "./AgentNetworkCanvas";

const LabSection = () => {
  return (
    <section className="py-32 md:py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-strong" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4">
            Agmentic Lab
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            A lab that builds the{" "}
            <span className="text-gradient-glow">revolution</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
            Agmentic Lab is where ideas become products. We research, prototype, and ship 
            AI systems that transform how organizations think, decide, and act.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            From intelligent agents to decision engines, every product we build 
            is a step toward a world where AI amplifies human judgment — not replaces it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center justify-center"
        >
          <div className="w-full aspect-square max-w-[500px] rounded-3xl overflow-hidden">
            <AgentNetworkCanvas />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LabSection;

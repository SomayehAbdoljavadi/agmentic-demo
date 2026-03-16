import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AgentNetworkCanvas from "./AgentNetworkCanvas";

const HeroNarrative = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-24 pb-16">
      <div className="absolute inset-0 gradient-mesh-strong" />

      {/* Background canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[70vmin] h-[70vmin] max-w-[600px] max-h-[600px]">
          <AgentNetworkCanvas />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-8">
          A society that imagines.{" "}
          <span className="text-gradient-glow">A lab that builds.</span>
        </h1>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Agmentic is the mindshift from now to the future of AI.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 mt-auto"
      >
        <ChevronDown className="w-4 h-4 text-primary animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroNarrative;

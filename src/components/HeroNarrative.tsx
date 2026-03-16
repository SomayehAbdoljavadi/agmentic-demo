import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroNarrative = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-24 pb-16">
      <div className="absolute inset-0 gradient-mesh-strong" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-8">
          Society & Lab
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-8">
          The Mindshift from{" "}
          <span className="text-gradient-glow">Now</span> to the{" "}
          <span className="text-gradient-glow">Future of AI</span>
        </h1>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
          Agmentic is a society that imagines and inspires the future of AI — and a lab that builds it.
          We don't just predict what's next. We create it.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-1 mt-auto"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 text-primary animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroNarrative;

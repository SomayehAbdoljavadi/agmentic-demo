import { motion } from "framer-motion";
import AICoreVisualization from "./AICoreVisualization";

const VisionSection = () => {
  return (
    <section className="h-screen w-full flex items-center relative overflow-hidden">
      {/* Deep dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">
            Long-Term Vision
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-bold leading-tight mb-5">
            Building the Operating System for{" "}
            <span className="text-gradient-glow">AI-Driven Organizations</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
            We envision a world where every organizational decision is informed by structured intelligence,
            validated by specialized AI, and aligned with strategic objectives — creating a new standard
            for how enterprises think, decide, and act.
          </p>
        </motion.div>

        {/* Right — Canvas Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center justify-center h-[50vh] lg:h-[70vh]"
        >
          <div className="w-full h-full max-w-[500px] max-h-[500px]">
            <AICoreVisualization />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;

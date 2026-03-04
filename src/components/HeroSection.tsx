import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import AgentNetworkCanvas from "./AgentNetworkCanvas";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle background mesh */}
      <div className="absolute inset-0 gradient-mesh-strong" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-center">
        {/* Left side — Text content (smaller) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Decision Intelligence Platform
          </motion.div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-[1.1] mb-4 tracking-tight text-left">
            The Operating System for{" "}
            <span className="text-gradient-glow">AI-Augmented</span>{" "}
            Decision Making
          </h1>

          <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed mb-8 text-left">
            Transform fragmented company data into structured, explainable decisions powered by AI agents.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/product"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-xs rounded-xl hover:opacity-90 transition-all glow-md"
            >
              Explore Platform
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/demo"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 glass-card text-foreground font-medium text-xs rounded-xl hover:bg-card/80 transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              Watch Demo
            </Link>
          </div>
        </motion.div>

        {/* Right side — Animation canvas (bigger) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-square max-w-[700px] mx-auto hidden lg:block"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <AgentNetworkCanvas />
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
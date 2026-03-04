import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import AgentNetworkCanvas from "./AgentNetworkCanvas";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle background mesh */}
      <div className="absolute inset-0 gradient-mesh-strong" />

      {/* Animation canvas — centered, full section, behind text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[90vmin] h-[90vmin] max-w-[800px] max-h-[800px] rounded-3xl overflow-hidden">
          <AgentNetworkCanvas />
        </div>
      </motion.div>

      {/* Content layer */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-6 pt-20 pb-10">
        {/* Title — top left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start max-w-7xl"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-[1.1] mb-4 tracking-tight text-left whitespace-nowrap">
            <span className="text-gradient-glow">AI-Augmented</span> Decision Making
          </h1>

          <p className="text-xs text-muted-foreground leading-relaxed text-left italic whitespace-nowrap">
            Transform fragmented company data into structured, explainable decisions powered by AI agents.
          </p>
        </motion.div>

        {/* Buttons — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
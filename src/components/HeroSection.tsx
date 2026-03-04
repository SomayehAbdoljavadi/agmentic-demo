import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 left-1/6 w-96 h-96 rounded-full bg-glow/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-accent/50 text-accent-foreground text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Decision Intelligence Platform
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-6">
            The Operating System for{" "}
            <span className="text-gradient-primary">AI-Augmented</span>{" "}
            Decision Making
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
            Transform fragmented company data into structured, explainable decisions powered by AI agents.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-opacity"
            >
              Try Interactive Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border bg-card text-foreground font-medium text-sm rounded-lg hover:bg-secondary transition-colors"
            >
              Request Demo
            </Link>
          </div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 glass-card p-1.5 glow-md"
        >
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
              <span className="ml-3 text-xs text-muted-foreground">Decision Intelligence Dashboard</span>
            </div>
            <div className="p-6 md:p-8 grid md:grid-cols-3 gap-4">
              {[
                { label: "Decision Score", value: "94.2", change: "+12.3%", color: "text-accent-foreground" },
                { label: "Dept. Alignment", value: "87%", change: "+5.1%", color: "text-accent-foreground" },
                { label: "Strategic Fit", value: "91.8", change: "+8.7%", color: "text-accent-foreground" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-lg bg-surface border border-border">
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.color} mt-1`}>{stat.change}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

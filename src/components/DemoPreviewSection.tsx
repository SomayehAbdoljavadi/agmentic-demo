import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const DemoPreviewSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-strong" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">Interactive Experience</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-5">
            See the Platform in Action
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12 text-base">
            Walk through a live simulation of how Agmentic transforms raw data into aligned, actionable decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity text-sm glow-md"
            >
              <Play className="w-4 h-4" />
              Try Interactive Demo
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 glass-card text-foreground font-medium text-sm rounded-xl hover:bg-card/80 transition-all"
            >
              Request Live Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoPreviewSection;
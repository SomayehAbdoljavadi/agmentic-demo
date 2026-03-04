import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const DemoPreviewSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">See It In Action</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Experience Decision Intelligence
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Walk through a live simulation of how Agmentic transforms raw data into aligned, actionable decisions.
          </p>
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity text-base glow-md"
          >
            Try Interactive Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoPreviewSection;

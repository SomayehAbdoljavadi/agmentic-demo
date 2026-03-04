import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-strong" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Ready to Transform Your{" "}
            <span className="text-gradient-primary">Decision Making</span>?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-12 max-w-xl mx-auto">
            Join leading organizations using Agmentic to align strategy and execution with AI-powered intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity text-sm glow-md"
            >
              Request a Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 glass-card text-foreground font-medium text-sm rounded-xl hover:bg-card/80 transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
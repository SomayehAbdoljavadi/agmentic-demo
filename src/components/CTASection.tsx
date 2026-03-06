import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="h-screen w-full flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-strong" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* CTA content — vertically centered, takes remaining space */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
            Ready to Transform Your{" "}
            <span className="text-gradient-primary">Decision Making</span>?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-md mx-auto">
            Join leading organizations using Agmentic to align strategy and execution with AI-powered intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity text-sm glow-md"
            >
              Request a Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 glass-card text-foreground font-medium text-sm rounded-xl hover:bg-card/80 transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Compact footer pinned to bottom */}
      <footer className="relative z-10 border-t border-border/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-[10px]">A</span>
            </div>
            <span className="text-sm font-display font-semibold tracking-tight text-foreground">Agmentic</span>
            <span className="text-xs text-muted-foreground ml-2">&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link to="/product" className="hover:text-foreground transition-colors">Product</Link>
            <Link to="/technology" className="hover:text-foreground transition-colors">Technology</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default CTASection;

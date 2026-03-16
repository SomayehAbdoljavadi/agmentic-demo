import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useDemoAccess } from "@/contexts/DemoAccessContext";

const CTASection = () => {
  const { openDemoGate } = useDemoAccess();

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-strong" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
            Join the <span className="text-gradient-primary">mindshift</span>.
          </h2>
          <button
            onClick={() => openDemoGate()}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity text-sm glow-md"
          >
            Try the Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

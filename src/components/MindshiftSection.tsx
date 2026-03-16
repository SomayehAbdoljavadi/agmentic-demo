import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const shifts = [
  { from: "App", to: "Agent" },
  { from: "Data", to: "Brain" },
  { from: "Dashboard", to: "Decision" },
  { from: "Interface", to: "Browsers" },
];

const MindshiftSection = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-muted-foreground text-base md:text-lg mb-16 max-w-xl mx-auto"
        >
          We believe the future isn't about better apps — it's about a fundamental shift in how AI works with us.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {shifts.map((shift, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 glass-card px-5 py-3"
            >
              <span className="text-sm text-muted-foreground line-through">{shift.from}</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-semibold text-gradient-glow">{shift.to}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MindshiftSection;

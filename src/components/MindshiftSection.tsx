import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const shifts = [
  { from: "Apps", to: "Agents", description: "Software that acts, not just displays." },
  { from: "Data", to: "Brain", description: "Intelligence that thinks, not just stores." },
  { from: "Dashboards", to: "Decisions", description: "Outcomes that matter, not charts that don't." },
  { from: "Search", to: "Understanding", description: "Context that connects, not links that scatter." },
  { from: "Tools", to: "Partners", description: "AI that collaborates, not just assists." },
];

const MindshiftSection = () => {
  return (
    <section className="py-32 md:py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            The world is shifting.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Every assumption about how we build, decide, and operate is being rewritten.
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {shifts.map((shift, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 md:gap-8"
            >
              <div className="flex items-center gap-4 md:gap-6 shrink-0">
                <span className="text-xl md:text-2xl font-display font-bold text-muted-foreground line-through decoration-muted-foreground/40">
                  {shift.from}
                </span>
                <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                <span className="text-xl md:text-2xl font-display font-bold text-gradient-glow">
                  {shift.to}
                </span>
              </div>
              <p className="text-muted-foreground text-sm md:text-base md:ml-auto text-center md:text-right">
                {shift.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MindshiftSection;

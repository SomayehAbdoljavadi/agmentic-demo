import { motion } from "framer-motion";
import { Users, Lightbulb, Globe } from "lucide-react";

const pillars = [
  {
    icon: Lightbulb,
    title: "Imagine",
    text: "We explore the edges of what AI can become — beyond the hype, beyond the obvious.",
  },
  {
    icon: Users,
    title: "Inspire",
    text: "A community of thinkers, builders, and visionaries sharing ideas that shape what's next.",
  },
  {
    icon: Globe,
    title: "Connect",
    text: "Bridging disciplines, industries, and perspectives to build AI that truly serves humanity.",
  },
];

const SocietySection = () => {
  return (
    <section className="py-32 md:py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4">
            Agmentic Society
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            A society that imagines the{" "}
            <span className="text-gradient-primary">future of AI</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Agmentic Society is where curiosity meets conviction. We gather the minds 
            that refuse to accept the status quo — and channel their energy into what AI should become.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card p-8 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{pillar.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocietySection;

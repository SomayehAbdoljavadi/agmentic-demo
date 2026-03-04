import { motion } from "framer-motion";
import { BarChart3, Zap, RefreshCw } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Analyze",
    description: "Agmentic dives into your data, uncovers insights, and explains performance in real time.",
  },
  {
    icon: Zap,
    title: "Execute",
    description: "Agmentic takes action across every platform — adjusting budgets, optimizing ads, and launching updates.",
  },
  {
    icon: RefreshCw,
    title: "Delegate",
    description: "Agmentic runs assigned tasks and workflows on autopilot, managing them continuously in the background.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="group relative p-8 md:p-10 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-6">
              <feature.icon className="w-5 h-5 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-display mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

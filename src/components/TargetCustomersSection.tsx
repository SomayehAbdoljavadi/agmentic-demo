import { motion } from "framer-motion";
import { Building2, Rocket, Globe, TrendingUp, ShoppingBag } from "lucide-react";

const customers = [
  { icon: Building2, label: "B2B Organizations", description: "Complex multi-stakeholder decisions" },
  { icon: Rocket, label: "SaaS Companies", description: "Product-led growth optimization" },
  { icon: Globe, label: "Enterprise Organizations", description: "Cross-department strategic alignment" },
  { icon: TrendingUp, label: "Venture Capital Firms", description: "Portfolio decision intelligence" },
  { icon: ShoppingBag, label: "Marketplace Platforms", description: "Ecosystem decision coordination" },
];

const TargetCustomersSection = () => {
  return (
    <section className="section-padding bg-surface relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">Who It's For</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold">
            Built for Decision-Driven Organizations
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {customers.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-6 rounded-2xl glass-card text-center hover:border-primary/20 hover:glow-sm transition-all duration-300"
            >
              <c.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm font-display font-semibold mb-1">{c.label}</p>
              <p className="text-[10px] text-muted-foreground">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetCustomersSection;